import { Document, Model } from "mongoose";
import { IRepository } from "../crud";
import models from "../../models/Local.model";
import {
  IAccessibilityFeature,
  IAmenity,
  IAppointment,
  IAvailability,
  IServicesOffered,
  IBookingOption,
  ICeremonyDetails,
  IClient,
  IContactInfo,
  ICoordinates,
  IDaySchedule,
  IEvent,
  IFacility,
  ILegalInfo,
  ILocal,
  ILocation,
  IMedia,
  INearbyAttraction,
  IParkingInfo,
  IPaymentMethod,
  IPolicy,
  IPromotion,
  IRenovationDetails,
  IReview,
  ISchedule,
  ISocialMediaLinks,
  ISpecialHours,
  IStaffMember,
  IWorkingHours,
  ITheater,
} from "../../models/interfaces";

export abstract class BaseRepository<T extends Document> implements IRepository<T> {
    protected readonly model: Model<T>;
  
    constructor(modelName: string) {
      this.model = models[modelName];
    }
  
    async findById(id: string): Promise<T | null> {
      return await this.model.findById(id);
    }
  
    async findAll(): Promise<T[]> {
      return await this.model.find();
    }
  
    async create(data: T): Promise<T> {
      return await new this.model(data).save();
    }
  
    async updateById(id: string, data: Partial<T>): Promise<T | null> {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    }
  
    async deleteById(id: string): Promise<boolean> {
      const deleted = await this.model.findByIdAndDelete(id);
      return !!deleted; // Check if document was deleted (truthy value)
    }
  }
  
export class TheaterRepository extends BaseRepository<ITheater>{

  constructor(){
    super("TheaterModel")
  }

}

export class AccessibilityFeatureRepository extends BaseRepository<IAccessibilityFeature>{

  constructor(){
    super("AccessibilityFeatureModel")
  }

}

export class AmenityRepository extends BaseRepository<IAmenity>{

  constructor(){
    super("AmenityModel")
  }

}

export class AppointmentRepository extends BaseRepository<IAppointment>{

  constructor(){
    super("AppointmentModel")
  }

}

export class AvailabilityRepository extends BaseRepository<IAvailability>{

  constructor(){
    super("AvailabilityModel")
  }

}

export class BookingOptionRepository extends BaseRepository<IBookingOption>{

  constructor(){
    super("BookingOptionModel")
  }

}

export class CeremonyDetailsRepository extends BaseRepository<ICeremonyDetails>{

  constructor(){
    super("CeremonyDetailsModel")
  }

}

export class ClientRepository extends BaseRepository<IClient>{

  constructor(){
    super("ClientModel")
  }

}

export class ContactInfoRepository extends BaseRepository<IContactInfo>{

  constructor(){
    super("ContactInfoModel")
  }

}

export class CoordinatesRepository extends BaseRepository<ICoordinates>{

  constructor(){
    super("CoordinatesModel")
  }

}

export class DayScheduleRepository extends BaseRepository<IDaySchedule>{

  constructor(){
    super("DayScheduleModel")
  }

}

export class EventRepository extends BaseRepository<IEvent>{

  constructor(){
    super("EventModel")
  }

  findAllEvent(): Promise<string[]>{
    const strings: string[] = [];
    strings.push("Hola");
    return new Promise((resolve, reject) => {
      // Realiza alguna tarea asíncrona
      resolve(strings);

    }) ;
  }

}

export class FacilityRepository extends BaseRepository<IFacility>{

  constructor(){
    super("FacilityModel")
  }

}

export class LegalInfoRepository extends BaseRepository<ILegalInfo>{

  constructor(){
    super("LegalInfoModel")
  }

}

export class LocalRepository extends BaseRepository<ILocal>{

  constructor(){
    super("LocalModel")
  }

}

export class LocationRepository extends BaseRepository<ILocation>{

  constructor(){
    super("LocationModel")
  }

}

export class MediaRepository extends BaseRepository<IMedia>{

  constructor(){
    super("MediaModel")
  }

}

export class NearbyAttractionRepository extends BaseRepository<INearbyAttraction>{

  constructor(){
    super("NearbyAttractionModel")
  }

}

export class ParkingInfoRepository extends BaseRepository<IParkingInfo>{

  constructor(){
    super("ParkingInfoModel")
  }

}

export class PaymentMethodRepository extends BaseRepository<IPaymentMethod>{

  constructor(){
    super("PaymentMethodModel")
  }

}

export class PolicyRepository extends BaseRepository<IPolicy>{

  constructor(){
    super("PolicyModel")
  }

}

export class PromotionRepository extends BaseRepository<IPromotion>{

  constructor(){
    super("PromotionModel")
  }

}

export class RenovationDetailsRepository extends BaseRepository<IRenovationDetails>{

  constructor(){
    super("RenovationDetailsModel")
  }

}

export class ReviewRepository extends BaseRepository<IReview>{

  constructor(){
    super("ReviewModel")
  }

}

export class ScheduleRepository extends BaseRepository<ISchedule>{

  constructor(){
    super("ScheduleModel")
  }

}

export class ServicesOfferedRepository extends BaseRepository<IServicesOffered>{

  constructor(){
    super("ServiceModel")
  }

}

export class SocialMediaLinksRepository extends BaseRepository<ISocialMediaLinks>{

  constructor(){
    super("SocialMediaLinksModel")
  }

}

export class SpecialHoursRepository extends BaseRepository<ISpecialHours>{

  constructor(){
    super("SpecialHoursModel")
  }

}

export class StaffMemberRepository extends BaseRepository<IStaffMember>{

  constructor(){
    super("StaffMemberModel")
  }

}

export class WorkingHoursRepository extends BaseRepository<IWorkingHours>{

  constructor(){
    super("WorkingHoursModel")
  }

}