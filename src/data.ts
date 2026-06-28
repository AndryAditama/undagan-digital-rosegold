import { WeddingConfig, RSVP } from './types';

export const weddingData: WeddingConfig = {
  brideName: "Rania",
  brideFullName: "Rania Sabrina, S.Kom.",
  brideInstagram: "raniasabrina",
  brideFather: "Bpk. H. Hermawan Baskoro",
  brideMother: "Ibu Hj. Sarah Amalia",
  groomName: "Aditya",
  groomFullName: "Aditya Pratama, S.E.",
  groomInstagram: "adityaprtm",
  groomFather: "Bpk. Ir. H. Wijaya Kusuma",
  groomMother: "Ibu Hj. Rosmala Dewi",
  eventDate: "2026-10-10T09:00:00+07:00", // Future date for fully working live countdown
  akadTime: "09:00 - 11:00 WIB",
  resepsiTime: "12:00 - 16:00 WIB",
  venueName: "The Grand Rose Ballroom",
  venueAddress: "Hotel Grand Rose Luxury Jakarta, Lt. 3. Jl. Sudirman No.Kav 21, Jakarta Selatan, DKI Jakarta 12190",
  // Standard high-quality OpenStreetMap/Google Maps embed link that is responsive and beautiful
  mapIframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.275816912388!2d106.8209868!3d-6.227282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e4b7c2b485%3A0xc3f6f1c4df2e7ad!2sSudirman%20Central%20Business%20District!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
  googleMapsUrl: "https://maps.app.goo.gl/9Zc1N6a5c17d8e2z9", // Beautiful custom marker link simulation
  coordinates: { lat: -6.227282, lng: 106.8209868 }
};

export const initialWishes: RSVP[] = [
  {
    id: "wish-1",
    name: "Ahmad Fauzi & Keluarga",
    status: "hadir",
    guestsCount: 2,
    message: "Masya Allah, selamat menempuh hidup baru Rania dan Aditya! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Lancar jaya sampai hari H ya sahabat terbaikku!",
    createdAt: "2026-06-15T10:30:00.000Z",
    likes: 12
  },
  {
    id: "wish-2",
    name: "Siti Rahmawati",
    status: "hadir",
    guestsCount: 1,
    message: "Happy Wedding Rania sayang! Cantik banget pasti di pelaminan nanti. Doa terbaik untukmu dan suami agar dikaruniai kebahagiaan dunia akhirat. Aamiin yaa mujibassailin.",
    createdAt: "2026-06-15T11:15:00.000Z",
    likes: 8
  },
  {
    id: "wish-3",
    name: "Budi Santoso (Teman Kuliah Adit)",
    status: "hadir",
    guestsCount: 2,
    message: "Selamat ya Dit! Akhirnya berlabuh juga di dermaga pelaminan. Selamat menempuh pelayaran bahtera rumah tangga baru, semoga lancar terus jalannya dan segera dianugerahi keturunan soleh/solehah.",
    createdAt: "2026-06-15T12:00:00.000Z",
    likes: 5
  },
  {
    id: "wish-4",
    name: "Andini Putri & Suami",
    status: "tidak_hadir",
    guestsCount: 0,
    message: "Selamat menempuh hidup baru untuk kedua mempelai. Maaf berhalangan hadir langsung karena luar kota, namun doa kami selalu menyertai kebahagiaan kalian berdua.",
    createdAt: "2026-06-15T14:45:00.000Z",
    likes: 3
  },
  {
    id: "wish-5",
    name: "Hendrik Wijaya",
    status: "hadir",
    guestsCount: 1,
    message: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fii khair. Turut berbahagia untuk pernikahan kalian! Semoga selalu diberkahi keberkahan rezeki dan kerukunan keluarga.",
    createdAt: "2026-06-15T16:20:00.000Z",
    likes: 9
  }
];
