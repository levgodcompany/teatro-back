import { ReserveShiftDto } from "../../dto/request/reserveShift.dto";
import {
  ConflictError,
  CreationError,
  NotFoundError,
} from "../../utils/errors/errors";
import { sendEmail } from "../email.service";
import { ClientService } from "./Client.service";
import { RoomService } from "./Room.service";

export class ReserveShiftService {
  private findIndexById<T extends { _id?: string }>(
    id: string,
    array: T[],
    errorMessage: Error
  ): number {
    const index = array.findIndex((item) => item._id == id);

    if (index === -1) {
      throw errorMessage;
    }

    return index;
  }

  async reserveShift(reserveDto: ReserveShiftDto) {
    const clientService = new ClientService();
    const roomService = new RoomService();

    const client = await clientService.findClientById(reserveDto.idClient);
    const room = await roomService.findRoomById(reserveDto.idRoom);

    const shiftDayIndex = this.findIndexById(
      reserveDto.idShiftDay,
      room.shiftsDay,
      new NotFoundError(`No se encontro la sala`)
    );

    const shiftDay = room.shiftsDay[shiftDayIndex];

    const shiftIndex = this.findIndexById(
      reserveDto.idShift,
      shiftDay.shifts,
      new NotFoundError(`No se encontro el turno`)
    );

    const shift = shiftDay.shifts[shiftIndex];

    if (shift.reserved === true) {
      throw new CreationError(`El turno ya esta reservado`);
    }

    shiftDay.shifts[shiftIndex].rentedBy = {
      name: client.name,
      email: client.email,
      phone: client.cel,
      altPhone: "",
    };

    shiftDay.shifts[shiftIndex].reserved = true;
    shiftDay.shifts[shiftIndex].reservedOn = client;

    const currentDate = new Date();

    const dayReserve = (): string => {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      return `${year}/${month}/${day}`;
    };

    const cancelableUntil = (): string => {
      // Agregar 48 horas a la fecha actual
      const futureDate = new Date(currentDate.getTime() + 48 * 60 * 60 * 1000); // 48 horas en milisegundos

      // Obtener las partes de la fecha
      const year = futureDate.getFullYear();
      const month = futureDate.getMonth() + 1;
      const day = futureDate.getDate();

      // Crear la cadena de fecha en el formato deseado
      return `${year}/${month}/${day}`;
    };

    shiftDay.shifts[shiftIndex].bookedOn = dayReserve();

    shiftDay.shifts[shiftIndex].cancelableUntil = cancelableUntil();
    shift.cancelableUntil = cancelableUntil();

    room.shiftsDay[shiftDayIndex] = shiftDay;

    await roomService.updateRoom(reserveDto.idRoom, room);

    try {
      await sendEmail(
        client.email,
        "Reservado El Juvenil Multiespacio",
        `<html>
        <head>
        <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Reserva</title>
  <style>

  body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .container {
    max-width: 600px;
    width: 90%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 40px;
    text-align: center;
  }
  
  .container_text > p {
      margin: 0;
      text-align: justify;
      font-size: 0.8rem;
  }
  
  .container_detail {
      text-align: left;
      margin: 2rem;
  }
  
  h3 {
    color: #333;
    margin-bottom: 20px;
  }
  
  p {
    color: #666;
    text-align: justify;
    font-size: 0.8rem;
    margin: 0;
  }
  
  
  .container_btn {
    display: flex;
    margin: 2rem;
    gap: 14rem;
  }
  
  .confirmation-btn {
    background-color: #ab271b;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    transition-duration: 0.4s;
    cursor: pointer;
  }
  
  a{
      color: #fff !important;
  }
  
  .confirmation-btn:hover {
    background-color: #ab271b;
    color: #fff;
  }
  
  .cancelar-btn {
      background-color: #6b6b6b;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      transition-duration: 0.4s;
      cursor: pointer;
    }
    
    .cancelar-btn:hover {
      background-color: #333;
      color: #fff;
    }
  </style>


        </head>
            <body>
            <div class="container">
            <h1>¡Reservado con exito!</h1>
            <div class="container_text">
              <p>
                Es un placer confirmar que su reserva en El Juvenil Multiespacio se
                ha realizado con éxito.
              </p>
              <p>
                Estamos encantados de darle la bienvenida y de proporcionarle una
                experiencia excepcional durante su estancia.
              </p>
            </div>
    
            <div class="container_detail">
            <p><strong>Detalles de la reserva</strong></p>
                    <ul>
                        <li><p>Nombre: <strong>${client.name}</strong></p></li>
                        <li><p>Sala: <strong>${room.name}</strong></p></li>
                        <li><p>Fecha: <strong>${shiftDay.day}</strong></p></li>
                        <li><p>Hora de llegada: <strong>${shift.startTime}</strong></p></li>
                        <li><p>Hora de salida: <strong>${shift.endTime}</strong></p></li>
                        <li><p>Capacidad máxima de personas: <strong>${room.capacity}</strong></p></li>
                        <li><p>Fecha limite de cancelacion: <strong>${cancelableUntil()}</strong></p></li>
                    </ul>
            </div>
            <p>No dude en ponerse en contacto con nosotros si tiene alguna pregunta o solicitud especial antes de su llegada. Nuestro equipo está aquí para asegurarse de que su estancia sea lo más cómoda y placentera posible.</p>
            <br />
            <br />
            <p>
              Tambien pedimos por favor que confirma la asistencia antes de la fecha limite de cancelacion
            </p>
            
            <br />
            <br />
            <div >
            <a href="#" class="confirmation-btn">
              Confirmar
            </a>
            </div>
            
            <br />
            <div>
            <a href="#" class="cancelar-btn">
              Cancelar Reserva
            </a>
    
            </div>
            <p>Atentamente</p>
            <p><strong>El Juvenil Multiespacio</strong></p>
          </div>
            </body>
            </html>`
      );
    } catch (error) {
      throw new Error("Error al enviar el correo electrónico: " + error);
    }

    return true;
  }

  async confirmedShift(reserveDto: ReserveShiftDto) {
    const clientService = new ClientService();
    const roomService = new RoomService();

    const client = await clientService.findClientById(reserveDto.idClient);
    const room = await roomService.findRoomById(reserveDto.idRoom);

    const shiftDayIndex = this.findIndexById(
      reserveDto.idShiftDay,
      room.shiftsDay,
      new NotFoundError(`No se encontro la sala`)
    );

    const shiftDay = room.shiftsDay[shiftDayIndex];

    const shiftIndex = this.findIndexById(
      reserveDto.idShift,
      shiftDay.shifts,
      new NotFoundError(`No se encontro el turno`)
    );

    const shift = shiftDay.shifts[shiftIndex];

    if (shift.reserved === false) {
      throw new CreationError(`Este turno no esta reservado`);
    }


    shiftDay.shifts[shiftIndex].confirmed = true


    room.shiftsDay[shiftDayIndex] = shiftDay;

    await roomService.updateRoom(reserveDto.idRoom, room);

    try {
      await sendEmail(
        client.email,
        "Confirmación de reserva en El Juvenil Multiespacio",
        `<html>
        <head>
        <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Reserva</title>
  <style>

  body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .container {
    max-width: 600px;
    width: 90%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 40px;
    text-align: center;
  }
  
  .container_text > p {
      margin: 0;
      text-align: justify;
      font-size: 0.8rem;
  }
  
  .container_detail {
      text-align: left;
      margin: 2rem;
  }
  
  h3 {
    color: #333;
    margin-bottom: 20px;
  }
  
  p {
    color: #666;
    text-align: justify;
    font-size: 0.8rem;
    margin: 0;
  }
  
  
  .container_btn {
    display: flex;
    margin: 2rem;
    gap: 14rem;
  }
  
  .confirmation-btn {
    background-color: #ab271b;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    transition-duration: 0.4s;
    cursor: pointer;
  }
  
  a{
      color: #fff !important;
  }
  
  .confirmation-btn:hover {
    background-color: #ab271b;
    color: #fff;
  }
  
  .cancelar-btn {
      background-color: #6b6b6b;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      transition-duration: 0.4s;
      cursor: pointer;
    }
    
    .cancelar-btn:hover {
      background-color: #333;
      color: #fff;
    }
  </style>


        </head>
            <body>
            <div class="container">
            <h1>Confirmado con exito!</h1>
            <div class="container_text">
              <p>
                Es un placer confirmar que su reserva en El Juvenil Multiespacio se
                ha realizado con éxito.
              </p>
              <p>
                Estamos encantados de darle la bienvenida y de proporcionarle una
                experiencia excepcional durante su estancia.
              </p>
            </div>
    
            <div class="container_detail">
            <p><strong>Detalles de la reserva</strong></p>
                    <ul>
                        <li><p>Nombre: <strong>${client.name}</strong></p></li>
                        <li><p>Sala: <strong>${room.name}</strong></p></li>
                        <li><p>Fecha: <strong>${shiftDay.day}</strong></p></li>
                        <li><p>Hora de llegada: <strong>${shift.startTime}</strong></p></li>
                        <li><p>Hora de salida: <strong>${shift.endTime}</strong></p></li>
                        <li><p>Capacidad máxima de personas: <strong>${room.capacity}</strong></p></li>
                    </ul>
            </div>
            <p>No dude en ponerse en contacto con nosotros si tiene alguna pregunta o solicitud especial antes de su llegada. Nuestro equipo está aquí para asegurarse de que su estancia sea lo más cómoda y placentera posible.</p>
            <br />
            <br />
            <p>
              Tambien pedimos por favor que confirma la asistencia antes de la fecha limite de cancelacion
            </p>
            
            <br />
            <br />
            <div>
            <a href="#" class="cancelar-btn">
              Cancelar Reserva
            </a>
    
            </div>
            <p>Atentamente</p>
            <p><strong>El Juvenil Multiespacio</strong></p>
          </div>
            </body>
            </html>`
      );
    } catch (error) {
      throw new Error("Error al enviar el correo electrónico: " + error);
    }

    return true;
  }

  async CancelableUntilReserveShify(reserveDto: ReserveShiftDto) {
    const clientService = new ClientService();
    const roomService = new RoomService();

    const client = await clientService.findClientById(reserveDto.idClient);
    const room = await roomService.findRoomById(reserveDto.idRoom);

    const shiftDayIndex = this.findIndexById(
      reserveDto.idShiftDay,
      room.shiftsDay,
      new NotFoundError(`No se encontro la sala`)
    );

    const shiftDay = room.shiftsDay[shiftDayIndex];

    const shiftIndex = this.findIndexById(
      reserveDto.idShift,
      shiftDay.shifts,
      new NotFoundError(`No se encontro el turno`)
    );

    const shift = shiftDay.shifts[shiftIndex];

    const day = (date: Date) => {
      const year = date.getFullYear();
      const month = Number(String(date.getMonth() + 1).padStart(2, "0"));
      const day = Number(String(date.getDate()).padStart(2, "0"));

      return {
        year,
        month,
        day,
      };
    };

    const compareDates = (cancelableUntil: string | null): boolean => {
      if (cancelableUntil === null) {
        throw new NotFoundError(
          `No se encontro la fecha para poder cancelar la reserva`
        );
      }
      // Parsear las cadenas de fecha a objetos Date
      const today = new Date();
      const cancelableUntilDate = new Date(cancelableUntil);

      // Verificar si los objetos Date son válidos
      if (isNaN(today.getTime()) || isNaN(cancelableUntilDate.getTime())) {
        throw new Error("Formato de fecha no válido");
      }

      const todayDate = day(today);
      const cancelableDate = day(cancelableUntilDate);

      // Comparar las fechas
      if (todayDate.year > cancelableDate.year) {
        return false;
      }

      if (todayDate.month > cancelableDate.month) {
        return false;
      }

      if (todayDate.day > cancelableDate.day) {
        return false;
      }

      return true;
    };

    if (compareDates(shiftDay.shifts[shiftIndex].cancelableUntil) === false) {
        try {
            await sendEmail(
              client.email,
              "Cancelación de reserva en El Juvenil Multiespacio",
              `<html>
              <body>
                  <p>Estimado/a <strong>${client.name}</strong>,</p>
                  <p>Esperamos que este mensaje le encuentre bien.</p>
                  <p>Ya paso la fecha para poder cancelar la reserva.</p>
              </body>
              </html>`
            );
          } catch (error) {
            throw new Error("Error al enviar el correo electrónico: " + error);
          }
      throw new ConflictError(
        `Ya paso la fecha para poder cancelar la reserva`
      );
    }

    shiftDay.shifts[shiftIndex].rentedBy = null;

    shiftDay.shifts[shiftIndex].reserved = false;
    shiftDay.shifts[shiftIndex].reservedOn = null;
    shiftDay.shifts[shiftIndex].confirmed = false;

    shiftDay.shifts[shiftIndex].bookedOn = "";

    shiftDay.shifts[shiftIndex].cancelableUntil = "";

    room.shiftsDay[shiftDayIndex] = shiftDay;

    await roomService.updateRoom(reserveDto.idRoom, room);

    try {
      await sendEmail(
        client.email,
        "Cancelación de reserva en El Juvenil Multiespacio",
        `<html>
        <body>
            <p>Estimado/a <strong>${client.name}</strong>,</p>
            <p>Esperamos que este mensaje le encuentre bien.</p>
            <p>Se cancelo correctamente la reserva.</p>
        </body>
        </html>`
      );
    } catch (error) {
      throw new Error("Error al enviar el correo electrónico: " + error);
    }

    return true;
  }
}
