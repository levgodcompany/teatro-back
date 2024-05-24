import { AppointmentModel, ClientModel, RoomModel } from "../models/schema/ISchema.schema";


class AppointmentService {
    async createAppointment(date: Date, start: Date, end: Date, roomId: string) {
        try {
            const appointment = await AppointmentModel.create({ date, start, end, client: null });
            // Agregar el turno a la lista de turnos disponibles en la sala
            await RoomModel.findByIdAndUpdate(
                roomId,
                { $push: { availableAppointments: appointment._id } }
            );
            return appointment;
        } catch (error) {
            throw new Error(`Error al crear turno: ${error}`);
        }
    }

    async getAllAppointments() {
        try {
            const appointments = await AppointmentModel.find().populate('client');
            return appointments;
        } catch (error) {
            throw new Error(`Error al obtener turnos: ${error}`);
        }
    }

    async deleteAppointment(appointmentId: string): Promise<void> {
        try {
            const appointment = await AppointmentModel.findById(appointmentId);
            if (!appointment) {
                throw new Error('Turno no encontrado');
            }
            // Eliminar el turno de la lista de turnos disponibles en la sala
            await RoomModel.updateMany(
                { availableAppointments: appointment._id },
                { $pull: { availableAppointments: appointment._id } }
            );
            // Si el turno está reservado por un cliente, eliminar la referencia al turno en los datos del cliente
            if (appointment.client) {
                await ClientModel.findByIdAndUpdate(
                    appointment.client,
                    { $pull: { bookedAppointments: appointment._id } }
                );
            }
            // Eliminar el turno de la base de datos
            await AppointmentModel.findByIdAndDelete(appointment._id)
        } catch (error) {
            throw new Error(`Error al eliminar turno: ${error}`);
        }
    }
}

export default new AppointmentService();
