// University Key-Value Store
export const KV_DATA: Record<string, { value: string; ttl: string; type: string }> = {
  'student:101': {
    value: '{"name": "Rahim", "dept": "CSE", "cgpa": 3.80, "status": "Active"}',
    ttl: 'No Expiry',
    type: 'HASH / STRING',
  },
  'student:102': {
    value: '{"name": "Karim", "dept": "BBA", "cgpa": 3.65, "status": "Active"}',
    ttl: 'No Expiry',
    type: 'HASH / STRING',
  },
  'course:C01': {
    value: '{"name": "Database Systems", "instructor": "Mr. Ali", "enrolled": 48}',
    ttl: 'No Expiry',
    type: 'HASH',
  },
  'session:rahim_auth': {
    value: 'Token: "jwt_991823" • Role: Student • IP: 103.205.71.2',
    ttl: '840 seconds',
    type: 'STRING (Volatile)',
  },
};

// Graph nodes properties
export const GRAPH_NODE_DETAILS: Record<
  string,
  { label: string; type: string; color: string; properties: Record<string, string>; relations: string[] }
> = {
  rahim: {
    label: 'Rahim (Student)',
    type: 'Student (Node)',
    color: 'bg-emerald-500 text-white',
    properties: {
      student_id: '101',
      name: 'Rahim',
      dept: 'CSE',
      cgpa: '3.80',
    },
    relations: [
      'enrolled_in → Database Systems (C01)',
      'enrolled_in → Discrete Mathematics (C02)',
      'study_partner → Karim',
    ],
  },
  karim: {
    label: 'Karim (Student)',
    type: 'Student (Node)',
    color: 'bg-emerald-500 text-white',
    properties: {
      student_id: '102',
      name: 'Karim',
      dept: 'BBA',
      cgpa: '3.65',
    },
    relations: [
      'enrolled_in → Database Systems (C01)',
      'study_partner → Rahim',
    ],
  },
  dbCourse: {
    label: 'Database Systems',
    type: 'Course (Node)',
    color: 'bg-cyan-500 text-slate-950 font-bold',
    properties: {
      course_id: 'C01',
      title: 'Database Systems',
      credits: '3.0',
      semester: 'Spring 2026',
    },
    relations: [
      'taught_by ← Mr. Ali',
      'enrolled_by ← Rahim',
      'enrolled_by ← Karim',
    ],
  },
  mathCourse: {
    label: 'Discrete Mathematics',
    type: 'Course (Node)',
    color: 'bg-cyan-500 text-slate-950 font-bold',
    properties: {
      course_id: 'C02',
      title: 'Discrete Mathematics',
      credits: '3.0',
      semester: 'Spring 2026',
    },
    relations: [
      'taught_by ← Ms. Sara',
      'enrolled_by ← Rahim',
    ],
  },
  mrAli: {
    label: 'Mr. Ali (Professor)',
    type: 'Professor (Node)',
    color: 'bg-purple-500 text-white',
    properties: {
      faculty_id: 'T01',
      name: 'Mr. Ali',
      designation: 'Associate Professor',
      dept: 'CSE',
    },
    relations: [
      'teaches → Database Systems (C01)',
    ],
  },
};
