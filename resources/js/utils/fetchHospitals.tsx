export const  fetchHealthFacilitiesInDelta = async() => {
  const url = "https://data.humdata.org/api/3/action/package_show?id=nigeria-health-facilities";
  // That gives metadata. The actual resource (CSV/JSON) is inside the “resources” list.
  const resp = await fetch(url);
  const pkg = await resp.json();
  const resources = pkg.result.resources;

  // Define a type for resource items
  type ResourceItem = {
    format: string;
    url: string;
    [key: string]: unknown;
  };

  // Define a type for GeoJSON Feature
  type GeoJSONFeature = {
    type: string;
    geometry: {
      type: string;
      coordinates: number[] | number[][];
    };
    properties: {
      [key: string]: string | undefined;
      state?: string;
      region?: string;
      name?: string;
      facility_name?: string;
      type?: string;
      facility_type?: string;
    };
  };

  // Find a JSON or GeoJSON resource
  const resJson = resources.find((r: ResourceItem) =>
    r.format === "GeoJSON" || r.format === "JSON"
  );
  if (!resJson) {
    console.error("No JSON resource found");
    return [];
  }

  const dataResp = await fetch(resJson.url);
  const dataJson = await dataResp.json();

  // If GeoJSON features
  const features: GeoJSONFeature[] = dataJson.features || dataJson;
  const deltaFacilities = features
    .filter((f: GeoJSONFeature) => {
      const props = f.properties;
      return (
        props.state?.toLowerCase() === "delta" ||
        props.region?.toLowerCase() === "delta"
      );
    })
    .map((f: GeoJSONFeature) => {
      const coords = f.geometry.coordinates;
      let lon, lat;
      if (f.geometry.type === "Point") {
        [lon, lat] = coords;
      } else {
        // If it’s polygon or else, pick first coordinate or use centroid logic
        [lon, lat] = coords[0];
      }
      return {
        name: f.properties.name || f.properties.facility_name,
        lat,
        lon,
        type: f.properties.type || f.properties.facility_type,
        ...f.properties,
      };
    });

  return deltaFacilities;
}
