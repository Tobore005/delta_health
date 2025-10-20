<?php

namespace App\Notifications;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class AppointmentRestored extends Notification implements ShouldQueue
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
            ->subject('Appointment Restored')
            ->line("Your appointment with {$this->appointment->clinic->name} has been restored.")
            ->action('View Appointment', url('/dashboard/user/appointments'))
            ->line('Thank you for staying with us!');
    }

    public function toDatabase($notifiable)
    {
        return [
            'appointment_id' => $this->appointment->id,
            'message' => "Appointment with {$this->appointment->clinic->name} was restored.",
            'status' => 'restored',
        ];
    }
}
