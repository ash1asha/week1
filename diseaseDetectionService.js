/**
 * DiseaseDetectionService.js
 * AgriCare AI - Modular AI Disease Diagnostic Engine (MVP Demo Version)
 */

class DiseaseDetectionService {
    constructor() {
        // Supported Crops as per MVP spec
        this.supportedCrops = ['Tomato', 'Rice', 'Cotton', 'Chili', 'Maize'];

        // Preset sample leaf data for instant 1-click testing
        this.sampleLeaves = {
            'Tomato': {
                crop: 'Tomato',
                disease: 'Early Blight',
                confidence: 92,
                severity: 'Moderate',
                symptoms: [
                    'Dark brown concentric spots on older leaves',
                    'Yellowing around infected leaf areas (halo effect)',
                    'Premature leaf drying and dropping',
                    'Stem lesions near soil line'
                ],
                recommendations: [
                    'Remove and safely destroy severely infected lower leaves.',
                    'Maintain proper field spacing to improve air circulation.',
                    'Avoid overhead watering to keep leaf foliage dry.',
                    'Apply approved copper-based organic fungicide if infection spreads.',
                    'Consult local agriculture officer if symptoms worsen.'
                ],
                sampleImageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23e8f5e9"/><path d="M200,40 Q250,90 270,160 Q220,240 150,220 Q120,150 200,40 Z" fill="%234caf50" stroke="%232e7d32" stroke-width="4"/><circle cx="180" cy="110" r="18" fill="%235d4037" opacity="0.85"/><circle cx="180" cy="110" r="26" fill="none" stroke="%23fbc02d" stroke-width="3"/><circle cx="210" cy="160" r="14" fill="%235d4037" opacity="0.85"/><circle cx="210" cy="160" r="22" fill="none" stroke="%23fbc02d" stroke-width="3"/><path d="M200,40 L180,240" stroke="%231b5e20" stroke-width="4" stroke-dasharray="6,3"/><text x="20" y="280" font-family="Arial" font-size="14" font-weight="bold" fill="%232e7d32">Sample Leaf: Tomato Early Blight</text></svg>'
            },
            'Rice': {
                crop: 'Rice',
                disease: 'Leaf Blast',
                confidence: 88,
                severity: 'High',
                symptoms: [
                    'Spindle-shaped or diamond spots with gray centers',
                    'Brownish-red borders around leaf lesions',
                    'Lesions enlarging causing complete leaf wilting',
                    'Node discoloration near plant joints'
                ],
                recommendations: [
                    'Avoid excess nitrogenous fertilizer application.',
                    'Maintain optimal water level in rice field paddies.',
                    'Burn or compost crop residues after harvest.',
                    'Use blast-resistant seed varieties in future planting.'
                ],
                sampleImageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f1f8e9"/><path d="M120,270 Q180,120 280,30 Q250,150 180,270 Z" fill="%2381c784" stroke="%23388e3c" stroke-width="4"/><ellipse cx="200" cy="140" rx="35" ry="12" fill="%234e342e" transform="rotate(-35 200 140)"/><ellipse cx="200" cy="140" rx="20" ry="6" fill="%23b0bec5" transform="rotate(-35 200 140)"/><text x="20" y="280" font-family="Arial" font-size="14" font-weight="bold" fill="%23388e3c">Sample Leaf: Rice Leaf Blast</text></svg>'
            },
            'Cotton': {
                crop: 'Cotton',
                disease: 'Bacterial Blight',
                confidence: 94,
                severity: 'High',
                symptoms: [
                    'Angular, water-soaked spots bounded by leaf veins',
                    'Lesions turning dark brown to black over time',
                    'Blighted bolls with sunken dark spots',
                    'Premature leaf drop (defoliation)'
                ],
                recommendations: [
                    'Sow acid-delinted disease-free certified seeds.',
                    'Destroy infected crop residues after harvest.',
                    'Avoid sprinkler irrigation to prevent bacteria dispersal.',
                    'Rotate crops with non-host crops like maize or sorghum.'
                ],
                sampleImageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23e8f5e9"/><path d="M200,50 L270,120 L240,230 L160,230 L130,120 Z" fill="%2366bb6a" stroke="%232e7d32" stroke-width="4"/><polygon points="170,100 190,110 185,130 165,120" fill="%233e2723"/><polygon points="210,140 235,145 230,165 205,160" fill="%233e2723"/><text x="20" y="280" font-family="Arial" font-size="14" font-weight="bold" fill="%232e7d32">Sample Leaf: Cotton Bacterial Blight</text></svg>'
            },
            'Chili': {
                crop: 'Chili',
                disease: 'Leaf Curl',
                confidence: 90,
                severity: 'Moderate',
                symptoms: [
                    'Upward curling and puckering of leaves',
                    'Stunted plant growth and shortened internodes',
                    'Thickened leaf veins and pale yellowing',
                    'Reduced flowering and fruit formation'
                ],
                recommendations: [
                    'Control whitefly vector population using yellow sticky traps.',
                    'Uproot and destroy severely infected plants immediately.',
                    'Spray neem oil derivative (10,000 ppm) at early infestation stage.',
                    'Maintain weed-free field borders.'
                ],
                sampleImageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23fffde7"/><path d="M150,250 C120,180 140,100 230,70 C240,120 220,200 150,250 Z" fill="%23aed581" stroke="%23558b2f" stroke-width="4"/><path d="M160,210 Q200,160 210,110" fill="none" stroke="%23fbc02d" stroke-width="5"/><text x="20" y="280" font-family="Arial" font-size="14" font-weight="bold" fill="%23558b2f">Sample Leaf: Chili Leaf Curl</text></svg>'
            },
            'Maize': {
                crop: 'Maize',
                disease: 'Leaf Spot',
                confidence: 86,
                severity: 'Moderate',
                symptoms: [
                    'Small, rectangular grayish-brown lesions on leaves',
                    'Lesions running parallel to leaf veins',
                    'Browning and blighting of entire leaf lamina',
                    'Reduced photosynthetic area lowering yield'
                ],
                recommendations: [
                    'Incorporate crop residue deep into soil during tillage.',
                    'Follow 2-year crop rotation with legumes.',
                    'Apply recommended bio-fungicides at early leaf spot emergence.',
                    'Ensure balanced N-P-K fertilizer application.'
                ],
                sampleImageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f1f8e9"/><path d="M80,260 Q200,80 340,120 Q220,180 80,260 Z" fill="%239ccc65" stroke="%2333691e" stroke-width="4"/><rect x="180" y="140" width="30" height="12" fill="%234e342e" rx="3"/><rect x="230" y="130" width="25" height="10" fill="%234e342e" rx="3"/><text x="20" y="280" font-family="Arial" font-size="14" font-weight="bold" fill="%2333691e">Sample Leaf: Maize Leaf Spot</text></svg>'
            }
        };
    }

    /**
     * Get list of supported crops
     */
    getCrops() {
        return this.supportedCrops;
    }

    /**
     * Get preset sample leaf data by crop name
     */
    getSampleLeaf(crop) {
        return this.sampleLeaves[crop] || this.sampleLeaves['Tomato'];
    }

    /**
     * Simulate AI Crop Disease Diagnosis
     * @param {string} crop - Selected crop name
     * @param {string} imageSrc - Uploaded image data URL or preset URL
     * @returns {Promise<Object>} Diagnostic result object
     */
    async analyzeCrop(crop, imageSrc) {
        // Simulate real AI processing latency (1.8s delay for realistic UX)
        await new Promise(resolve => setTimeout(resolve, 1800));

        const baseDiagnosis = this.getSampleLeaf(crop);

        // Add slight confidence variance if custom upload
        let calculatedConfidence = baseDiagnosis.confidence;
        if (imageSrc && !imageSrc.includes('Sample Leaf')) {
            // Generate realistic confidence between 87% and 96%
            calculatedConfidence = Math.floor(87 + Math.random() * 10);
        }

        return {
            id: 'DIAG-' + Date.now().toString().slice(-6),
            crop: crop,
            disease: baseDiagnosis.disease,
            confidence: calculatedConfidence,
            severity: baseDiagnosis.severity,
            symptoms: baseDiagnosis.symptoms,
            recommendations: baseDiagnosis.recommendations,
            imageUrl: imageSrc || baseDiagnosis.sampleImageUrl,
            analyzedAt: new Date().toISOString(),
            isDemo: true,
            disclaimer: 'Preliminary AI Demo Analysis - Please consult a certified Agriculture Officer or agronomy specialist.'
        };
    }
}

// Export singleton instance
const diseaseDetectionService = new DiseaseDetectionService();
