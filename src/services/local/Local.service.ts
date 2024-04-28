import {
  IAccessibilityFeature,
  IAmenity,
  IAppointment,
  IAvailability,
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
  IServicesOffered,
  ISocialMediaLinks,
  ISpecialHours,
  IStaffMember,
  ITheater,
  IWorkingHours,
} from "../../models/interfaces";
import { AccessibilityFeatureRepository, AmenityRepository, AppointmentRepository, AvailabilityRepository, BookingOptionRepository, CeremonyDetailsRepository, ClientRepository, ContactInfoRepository, CoordinatesRepository, DayScheduleRepository, EventRepository, FacilityRepository, LegalInfoRepository, LocalRepository, LocationRepository, MediaRepository, NearbyAttractionRepository, ParkingInfoRepository, PaymentMethodRepository, PolicyRepository, PromotionRepository, RenovationDetailsRepository, ReviewRepository, ScheduleRepository, ServicesOfferedRepository, SocialMediaLinksRepository, SpecialHoursRepository, StaffMemberRepository, TheaterRepository, WorkingHoursRepository } from "../../repository/implements/BaseRepository";
import { GenericService } from "../BaseService.service";

export class TheaterService extends GenericService<ITheater> {
  constructor() {
    super(new TheaterRepository());
  }
}

export class AccessibilityFeatureService extends GenericService<IAccessibilityFeature> {
  constructor() {
    super(new AccessibilityFeatureRepository());
  }
}

export class AmenityService extends GenericService<IAmenity> {
  constructor() {
    super(new AmenityRepository());
  }
}

export class AppointmentService extends GenericService<IAppointment> {
  constructor() {
    super(new AppointmentRepository());
  }
}

export class AvailabilityService extends GenericService<IAvailability> {
  constructor() {
    super(new AvailabilityRepository());
  }
}

export class BookingOptionService extends GenericService<IBookingOption> {
  constructor() {
    super(new BookingOptionRepository());
  }
}

export class CeremonyDetailsService extends GenericService<ICeremonyDetails> {
  constructor() {
    super(new CeremonyDetailsRepository());
  }
}

export class ClientService extends GenericService<IClient> {
  constructor() {
    super(new ClientRepository());
  }
}

export class ContactInfoService extends GenericService<IContactInfo> {
  constructor() {
    super(new ContactInfoRepository());
  }
}

export class CoordinatesService extends GenericService<ICoordinates> {
  constructor() {
    super(new CoordinatesRepository());
  }
}

export class DayScheduleService extends GenericService<IDaySchedule> {
  constructor() {
    super(new DayScheduleRepository());
  }
}

export class EventService extends GenericService<IEvent> {
  constructor() {
    super(new EventRepository());
  }
}

export class FacilityService extends GenericService<IFacility> {
  constructor() {
    super(new FacilityRepository());
  }
}

export class LegalInfoService extends GenericService<ILegalInfo> {
  constructor() {
    super(new LegalInfoRepository());
  }
}

export class LocalService extends GenericService<ILocal> {
  constructor() {
    super(new LocalRepository());
  }
}

export class LocationService extends GenericService<ILocation> {
  constructor() {
    super(new LocationRepository());
  }
}

export class MediaService extends GenericService<IMedia> {
  constructor() {
    super(new MediaRepository());
  }
}

export class NearbyAttractionService extends GenericService<INearbyAttraction> {
  constructor() {
    super(new NearbyAttractionRepository());
  }
}

export class ParkingInfoService extends GenericService<IParkingInfo> {
  constructor() {
    super(new ParkingInfoRepository());
  }
}

export class PaymentMethodService extends GenericService<IPaymentMethod> {
  constructor() {
    super(new PaymentMethodRepository());
  }
}

export class PolicyService extends GenericService<IPolicy> {
  constructor() {
    super(new PolicyRepository());
  }
}

export class PromotionService extends GenericService<IPromotion> {
  constructor() {
    super(new PromotionRepository());
  }
}

export class RenovationDetailsService extends GenericService<IRenovationDetails> {
  constructor() {
    super(new RenovationDetailsRepository());
  }
}

export class ReviewService extends GenericService<IReview> {
  constructor() {
    super(new ReviewRepository());
  }
}

export class ScheduleService extends GenericService<ISchedule> {
  constructor() {
    super(new ScheduleRepository());
  }
}

export class ServicesOfferedService extends GenericService<IServicesOffered> {
  constructor() {
    super(new ServicesOfferedRepository());
  }
}

export class SocialMediaLinksService extends GenericService<ISocialMediaLinks> {
  constructor() {
    super(new SocialMediaLinksRepository());
  }
}

export class SpecialHoursService extends GenericService<ISpecialHours> {
  constructor() {
    super(new SpecialHoursRepository());
  }
}

export class StaffMemberService extends GenericService<IStaffMember> {
  constructor() {
    super(new StaffMemberRepository());
  }
}

export class WorkingHoursService extends GenericService<IWorkingHours> {
  constructor() {
    super(new WorkingHoursRepository());
  }
}
