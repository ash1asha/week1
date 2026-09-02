/**
 * storageService.js
 * AgriCare AI - Firebase Firestore / LocalStorage Simulation Service
 */

class StorageService {
    constructor() {
        this.STORAGE_KEYS = {
            USERS: 'agricare_users',
            DIAGNOSES: 'agricare_diagnoses',
            REPORTS: 'agricare_reports',
            CURRENT_USER: 'agricare_current_user',
            COUNTER: 'agricare_report_counter'
        };
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.STORAGE_KEYS.USERS)) {
            const initialUsers = [
                {
                    id: 'usr_farmer_1',
                    name: 'Ramesh Patel',
                    email: 'farmer@agricare.ai',
                    phone: '9876543210',
                    role: 'farmer',
                    village: 'Narasaraopet',
                    district: 'Palnadu',
                    state: 'Andhra Pradesh',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'usr_officer_1',
                    name: 'Dr. Anita Sharma',
                    email: 'officer@agricare.ai',
                    phone: '9123456789',
                    role: 'officer',
                    designation: 'Senior Agricultural Extension Officer',
                    district: 'Palnadu',
                    state: 'Andhra Pradesh',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
        }

        if (!localStorage.getItem(this.STORAGE_KEYS.COUNTER)) {
            localStorage.setItem(this.STORAGE_KEYS.COUNTER, '3'); // Start after initial 3 reports
        }

        if (!localStorage.getItem(this.STORAGE_KEYS.REPORTS)) {
            const initialReports = [
                {
                    id: 'AGR-2026-00001',
                    farmerId: 'usr_farmer_1',
                    farmerName: 'Ramesh Patel',
                    crop: 'Tomato',
                    disease: 'Early Blight',
                    confidence: 92,
                    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23e8f5e9"/><path d="M200,40 Q250,90 270,160 Q220,240 150,220 Q120,150 200,40 Z" fill="%234caf50" stroke="%232e7d32" stroke-width="4"/><circle cx="180" cy="110" r="18" fill="%235d4037" opacity="0.85"/><circle cx="180" cy="110" r="26" fill="none" stroke="%23fbc02d" stroke-width="3"/><circle cx="210" cy="160" r="14" fill="%235d4037" opacity="0.85"/><circle cx="210" cy="160" r="22" fill="none" stroke="%23fbc02d" stroke-width="3"/><text x="20" y="280" font-family="Arial" font-size="14" font-weight="bold" fill="%232e7d32">Report #AGR-2026-00001: Tomato Early Blight</text></svg>',
                    village: 'Narasaraopet',
                    district: 'Palnadu',
                    state: 'Andhra Pradesh',
                    notes: 'Spotted yellow spots spreading across lower leaves after recent rainfall.',
                    status: 'Submitted',
                    symptoms: ['Brown concentric spots on leaves', 'Yellowing around infected areas', 'Leaf drying'],
                    recommendations: ['Remove severely infected lower leaves.', 'Maintain field spacing.', 'Avoid excessive foliage moisture.'],
                    createdAt: '2026-09-02T10:30:00.000Z',
                    officerNotes: ''
                },
                {
                    id: 'AGR-2026-00002',
                    farmerId: 'usr_farmer_1',
                    farmerName: 'Ramesh Patel',
                    crop: 'Rice',
                    disease: 'Leaf Blast',
                    confidence: 88,
                    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f1f8e9"/><path d="M120,270 Q180,120 280,30 Q250,150 180,270 Z" fill="%2381c784" stroke="%23388e3c" stroke-width="4"/><ellipse cx="200" cy="140" rx="35" ry="12" fill="%234e342e" transform="rotate(-35 200 140)"/><text x="20" y="280" font-family="Arial" font-size="14" font-weight="bold" fill="%23388e3c">Report #AGR-2026-00002: Rice Leaf Blast</text></svg>',
                    village: 'Chilakaluripet',
                    district: 'Palnadu',
                    state: 'Andhra Pradesh',
                    notes: 'Spindle lesions noticed on paddy field border.',
                    status: 'Under Review',
                    symptoms: ['Spindle-shaped spots with gray centers', 'Brownish borders'],
                    recommendations: ['Control nitrogen fertilizer.', 'Maintain field water balance.'],
                    createdAt: '2026-08-28T14:15:00.000Z',
                    officerNotes: 'Field inspection scheduled for tomorrow.'
                },
                {
                    id: 'AGR-2026-00003',
                    farmerId: 'usr_farmer_1',
                    farmerName: 'Ramesh Patel',
                    crop: 'Chili',
                    disease: 'Leaf Curl',
                    confidence: 90,
                    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23fffde7"/><path d="M150,250 C120,180 140,100 230,70 C240,120 220,200 150,250 Z" fill="%23aed581" stroke="%23558b2f" stroke-width="4"/><text x="20" y="280" font-family="Arial" font-size="14" font-weight="bold" fill="%23558b2f">Report #AGR-2026-00003: Chili Leaf Curl</text></svg>',
                    village: 'Sattenapalle',
                    district: 'Palnadu',
                    state: 'Andhra Pradesh',
                    notes: 'Leaves curling upwards in young chili crop.',
                    status: 'Verified',
                    symptoms: ['Upward leaf curling', 'Stunted growth', 'Thickened leaf veins'],
                    recommendations: ['Use yellow sticky traps.', 'Apply neem oil spray.'],
                    createdAt: '2026-08-20T09:00:00.000Z',
                    officerNotes: 'Verified by Agronomy officer. Recommended organic neem treatment.'
                }
            ];
            localStorage.setItem(this.STORAGE_KEYS.REPORTS, JSON.stringify(initialReports));
        }

        // Set default logged in user if none
        if (!localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER)) {
            const users = this.getUsers();
            localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(users[0]));
        }
    }

    getUsers() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.USERS) || '[]');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER) || 'null');
    }

    setCurrentUser(user) {
        localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    }

    login(identifier, password, targetRole) {
        const users = this.getUsers();
        let user = users.find(u => (u.email === identifier || u.phone === identifier) && u.role === targetRole);
        if (!user) {
            // Default demo fallback creation
            user = {
                id: 'usr_' + Date.now(),
                name: targetRole === 'farmer' ? 'Farmer User' : 'Officer User',
                email: identifier || (targetRole === 'farmer' ? 'farmer@agricare.ai' : 'officer@agricare.ai'),
                phone: '9876543210',
                role: targetRole,
                village: 'Narasaraopet',
                district: 'Palnadu',
                state: 'Andhra Pradesh',
                createdAt: new Date().toISOString()
            };
            users.push(user);
            localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users));
        }
        this.setCurrentUser(user);
        return user;
    }

    getReports(role = 'farmer', userId = null) {
        const reports = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.REPORTS) || '[]');
        if (role === 'farmer' && userId) {
            return reports.filter(r => r.farmerId === userId);
        }
        return reports;
    }

    getReportById(id) {
        const reports = this.getReports();
        return reports.find(r => r.id === id);
    }

    generateNextReportId() {
        let counter = parseInt(localStorage.getItem(this.STORAGE_KEYS.COUNTER) || '3', 10) + 1;
        localStorage.setItem(this.STORAGE_KEYS.COUNTER, counter.toString());
        const seq = counter.toString().padStart(5, '0');
        return `AGR-2026-${seq}`;
    }

    saveReport(reportData) {
        const reports = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.REPORTS) || '[]');
        const currentUser = this.getCurrentUser();

        const newReport = {
            id: this.generateNextReportId(),
            farmerId: currentUser ? currentUser.id : 'usr_farmer_1',
            farmerName: currentUser ? currentUser.name : 'Ramesh Patel',
            crop: reportData.crop,
            disease: reportData.disease,
            confidence: reportData.confidence,
            imageUrl: reportData.imageUrl,
            village: reportData.village || 'Narasaraopet',
            district: reportData.district || 'Palnadu',
            state: reportData.state || 'Andhra Pradesh',
            notes: reportData.notes || '',
            status: 'Submitted',
            symptoms: reportData.symptoms || [],
            recommendations: reportData.recommendations || [],
            createdAt: new Date().toISOString(),
            officerNotes: ''
        };

        reports.unshift(newReport); // newest first
        localStorage.setItem(this.STORAGE_KEYS.REPORTS, JSON.stringify(reports));
        return newReport;
    }

    updateReportStatus(reportId, newStatus, officerNotes = '') {
        const reports = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.REPORTS) || '[]');
        const index = reports.findIndex(r => r.id === reportId);

        if (index !== -1) {
            reports[index].status = newStatus;
            if (officerNotes) {
                reports[index].officerNotes = officerNotes;
            }
            reports[index].updatedAt = new Date().toISOString();
            localStorage.setItem(this.STORAGE_KEYS.REPORTS, JSON.stringify(reports));
            return reports[index];
        }
        return null;
    }

    getFarmerStats(userId) {
        const reports = this.getReports('farmer', userId);
        const diseases = new Set(reports.map(r => r.disease));

        return {
            totalDiagnoses: reports.length + 2, // includes scans tried without reporting
            reportsSubmitted: reports.length,
            diseasesDetected: diseases.size
        };
    }

    getOfficerStats() {
        const reports = this.getReports('officer');
        return {
            totalReports: reports.length,
            newReports: reports.filter(r => r.status === 'Submitted').length,
            underReview: reports.filter(r => r.status === 'Under Review').length,
            verifiedReports: reports.filter(r => r.status === 'Verified' || r.status === 'Resolved').length
        };
    }

    getAnalyticsData() {
        const reports = this.getReports('officer');

        // Count by Disease
        const diseaseCounts = {};
        // Count by Crop
        const cropCounts = {};

        reports.forEach(r => {
            diseaseCounts[r.disease] = (diseaseCounts[r.disease] || 0) + 1;
            cropCounts[r.crop] = (cropCounts[r.crop] || 0) + 1;
        });

        // Ensure default minimum dataset for clean charts
        const defaultDiseases = { 'Early Blight': 4, 'Leaf Blast': 3, 'Bacterial Blight': 2, 'Leaf Curl': 3, 'Leaf Spot': 2 };
        const defaultCrops = { 'Tomato': 5, 'Rice': 4, 'Chili': 3, 'Cotton': 2, 'Maize': 2 };

        Object.keys(defaultDiseases).forEach(d => {
            if (!diseaseCounts[d]) diseaseCounts[d] = defaultDiseases[d];
        });
        Object.keys(defaultCrops).forEach(c => {
            if (!cropCounts[c]) cropCounts[c] = defaultCrops[c];
        });

        return {
            diseaseDistribution: diseaseCounts,
            cropDistribution: cropCounts
        };
    }
}

const storageService = new StorageService();
