import Dexie, { type Table } from 'dexie';

export interface SurveyRecord {
  id?: number;
  title: string;
  category: string;    // Bổ sung: Phân loại
  condition: string;   // Bổ sung: Tình trạng
  description: string; // Bổ sung: Ghi chú
  latitude: number | null;
  longitude: number | null;
  photoBase64: string | null;
  status: 'draft' | 'synced';
  createdAt: string;
}

export class SurveyDatabase extends Dexie {
  surveys!: Table<SurveyRecord, number>;

  constructor() {
    super('ODK_FieldSurvey_DB');
    this.version(2).stores({ // Nâng version lên 2 vì cấu trúc bảng đã thay đổi
      surveys: '++id, status, createdAt' 
    });
  }
}

export const db = new SurveyDatabase();