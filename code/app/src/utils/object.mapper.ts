import { AttendeStatusEnum } from "../services/meetup/meetup.interface";

export abstract class ObjectMapper {
  protected static storage = window.sessionStorage;

  static mapToHistoryTableToService(data: any, source: any): any {
    return data.services?.map((k: any) => {
      return {
        id: k.serviceId,
        title: source?.data?.find((s: any) => s.id == k.serviceId)?.title,
        process:
          k.status == AttendeStatusEnum.Waiting
            ? "Waiting"
            : k.status == AttendeStatusEnum.Approved
            ? "Approved"
            : "Rejected",
      };
    });
  }

  static mapToHistoryTableToMeetup(data: any, source: any): any {
    return data.meetups?.map((k: any) => {
      return {
        id: k.meetupId,
        title: source?.data?.find((s: any) => s.id == k.meetupId)?.title,
        process:
          k.status == AttendeStatusEnum.Waiting
            ? "Waiting"
            : k.status == AttendeStatusEnum.Approved
            ? "Approved"
            : "Rejected",
      };
    });
  }

  static setItem(name: string, value: string): void {
    this.storage.setItem(name, value);
  }

  static clear(): void {
    this.storage.clear();
  }
}
