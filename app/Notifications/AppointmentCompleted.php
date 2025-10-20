<?php

namespace App\Notifications;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class AppointmentCompleted extends Notification implements ShouldQueue
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
            ->subject('Appointment Completed')
            ->line("Your appointment with {$this->appointment->clinic->name} has been successfully completed.")
            ->action('View Details', url('/dashboard/user/appointments'))
            ->line('We hope your experience was great!');
    }

    public function toDatabase($notifiable)
    {
        return [
            'appointment_id' => $this->appointment->id,
            'message' => "Appointment with {$this->appointment->clinic->name} has been marked as completed.",
            'status' => 'completed',
        ];
    }
}
