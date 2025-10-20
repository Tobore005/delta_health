<?php

namespace App\Notifications;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class AppointmentCreated extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Appointment $appointment) {}

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('New Appointment Created')
            ->line("A new appointment has been created by {$this->appointment->user->name}.")
            ->line("Service: {$this->appointment->service}")
            ->line("Date: {$this->appointment->date}")
            ->line("Time: {$this->appointment->time}")
            ->action('View Appointment', url('/dashboard/clinic/appointments'))
            ->line('Please confirm or reschedule as needed.');
    }

    public function toDatabase($notifiable)
    {
        return [
            'appointment_id' => $this->appointment->id,
            'message' => "New appointment from {$this->appointment->user->name} for {$this->appointment->service}.",
            'date' => $this->appointment->date,
            'time' => $this->appointment->time,
            'status' => 'pending',
        ];
    }
}
