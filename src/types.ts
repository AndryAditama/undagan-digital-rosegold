export interface RSVP {
  id: string;
  name: string;
  status: 'hadir' | 'tidak_hadir';
  guestsCount: number;
  message: string;
  createdAt: string;
  likes: number;
}

export interface WeddingConfig {
  brideName: string;
  brideFullName: string;
  brideInstagram: string;
  brideFather: string;
  brideMother: string;
  groomName: string;
  groomFullName: string;
  groomInstagram: string;
  groomFather: string;
  groomMother: string;
  eventDate: string; // ISO date
  akadTime: string; // e.g. "09:00 - 11:00 WIB"
  resepsiTime: string; // e.g. "12:00 - 16:00 WIB"
  venueName: string;
  venueAddress: string;
  mapIframeUrl: string;
  googleMapsUrl: string;
  coordinates: { lat: number; lng: number };
}
