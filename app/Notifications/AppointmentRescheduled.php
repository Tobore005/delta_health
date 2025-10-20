<?php

namespace App\Notifications;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\DatabaseMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AppointmentRescheduled extends Notification implements ShouldQueue
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
            ->subject('Appointment Rescheduled')
            ->line("Your appointment with {$this->appointment->clinic->name} has been rescheduled.")
            ->line("New Date: {$this->appointment->date}")
            ->line("New Time: {$this->appointment->time}")
            ->action('View Appointment', url('/dashboard/user/appointments'));
    }

    public function toDatabase($notifiable)
    {
        return [
            'appointment_id' => $this->appointment->id,
            'message' => "Appointment with {$this->appointment->clinic->name} was rescheduled to {$this->appointment->date} at {$this->appointment->time}.",
            'status' => 'rescheduled',
        ];
    }
}
