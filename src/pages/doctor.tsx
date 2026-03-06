import { useState, useMemo } from 'react';
import { Search, Stethoscope, Hospital, GraduationCap, Clock, Filter, Phone, Calendar, X, CheckCircle, AlertCircle } from 'lucide-react';

const DOCTORS = [
    {
        id: 1,
        name: "Dr. Anjali Sharma",
        specialization: "Cardiologist",
        qualification: "MBBS, MD (Cardiology)",
        experience: "12 Years Experience",
        hospital: "Apollo Hospitals",
        phone: "+91 98765 43210",
        description: "Specialist in heart diseases, hypertension, and cardiac emergency management.",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
        id: 2,
        name: "Dr. Rajesh Kumar",
        specialization: "Neurologist",
        qualification: "MBBS, DM (Neurology)",
        experience: "15 Years Experience",
        hospital: "Fortis Healthcare",
        phone: "+91 98765 43211",
        description: "Expert in treating stroke, epilepsy, and various neurological disorders.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
        id: 3,
        name: "Dr. Priya Patel",
        specialization: "General Physician",
        qualification: "MBBS, MD (General Medicine)",
        experience: "8 Years Experience",
        hospital: "Max Super Specialty",
        phone: "+91 98765 43212",
        description: "Comprehensive care for fevers, infections, and chronic disease management.",
        image: "https://images.unsplash.com/photo-1594824436998-058df5ad0550?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
        id: 4,
        name: "Dr. Suresh Reddy",
        specialization: "Dermatologist",
        qualification: "MBBS, MD (DVL)",
        experience: "10 Years Experience",
        hospital: "Care Hospitals",
        phone: "+91 98765 43213",
        description: "Specializing in skin conditions, allergies, and cosmetic dermatology.",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
        id: 5,
        name: "Dr. Meena Iyer",
        specialization: "Pulmonologist",
        qualification: "MBBS, MD (Pulmonary Medicine)",
        experience: "14 Years Experience",
        hospital: "Manipal Hospitals",
        phone: "+91 98765 43214",
        description: "Specialist in respiratory diseases, asthma, and post-COVID lung care.",
        image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
        id: 6,
        name: "Dr. Vikram Singh",
        specialization: "Pediatrician",
        qualification: "MBBS, MD (Pediatrics)",
        experience: "9 Years Experience",
        hospital: "Rainbow Children's Hospital",
        phone: "+91 98765 43215",
        description: "Dedicated to child healthcare, vaccinations, and pediatric nutrition.",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300"
    }
];

const SPECIALIZATIONS = ["All", ...Array.from(new Set(DOCTORS.map(d => d.specialization)))];

const Doctors = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState('All');
    const [bookingModal, setBookingModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
    const [bookingData, setBookingData] = useState({
        date: '',
        time: '',
        reason: '',
    });
    const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [bookingMessage, setBookingMessage] = useState('');

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const openBookingModal = (doctor: any) => {
        setSelectedDoctor(doctor);
        setBookingData({
            date: getTomorrowDate(),
            time: '09:00',
            reason: '',
        });
        setBookingStatus('idle');
        setBookingModal(true);
    };

    const closeBookingModal = () => {
        setBookingModal(false);
        setSelectedDoctor(null);
    };

    const handleBookingChange = (field: string, value: string) => {
        setBookingData((prev) => ({ ...prev, [field]: value }));
    };

    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!bookingData.date || !bookingData.time || !bookingData.reason.trim()) {
            setBookingStatus('error');
            setBookingMessage('Please fill in all fields');
            return;
        }

        setBookingStatus('loading');

        try {
            const userId = localStorage.getItem('user_id') || localStorage.getItem('user');
            const userName = localStorage.getItem('user') || 'User';

            const response = await fetch(
                'https://anandanaidu-aadhya-backend.hf.space/book-appointment',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                        userName: userName,
                        doctorId: selectedDoctor.id,
                        doctorName: selectedDoctor.name,
                        doctorPhone: selectedDoctor.phone,
                        specialization: selectedDoctor.specialization,
                        appointmentDate: bookingData.date,
                        appointmentTime: bookingData.time,
                        reason: bookingData.reason,
                        timestamp: new Date().toISOString(),
                    }),
                }
            );

            if (response.ok) {
                setBookingStatus('success');
                setBookingMessage(`Appointment booked successfully with ${selectedDoctor.name}!`);
                setTimeout(() => {
                    closeBookingModal();
                }, 2000);
            } else {
                setBookingStatus('error');
                setBookingMessage('Failed to book appointment. Please try again.');
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            setBookingStatus('error');
            setBookingMessage('Connection error. Please try again.');
        }
    };

    const filteredDoctors = useMemo(() => {
        return DOCTORS.filter(doctor => {
            const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSpecialization = selectedSpecialization === 'All' || doctor.specialization === selectedSpecialization;
            return matchesSearch && matchesSpecialization;
        });
    }, [searchQuery, selectedSpecialization]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            {/* Soft Gradient Background */}
            <div className="absolute inset-0 -z-10 bg-gradient-soft opacity-50" />

            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F2937] mb-4 drop-shadow-sm">
                        Meet Our <span className="text-[#2563EB]">Medical Experts</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Consult experienced doctors and healthcare professionals for guidance based on your triage results.
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="relative w-full md:max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by doctor name or specialization..."
                            className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                        <div className="flex items-center gap-2 px-2 text-gray-500 font-medium whitespace-nowrap">
                            <Filter className="w-4 h-4" /> Filter:
                        </div>
                        {SPECIALIZATIONS.map((spec) => (
                            <button
                                key={spec}
                                onClick={() => setSelectedSpecialization(spec)}
                                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${selectedSpecialization === spec
                                    ? 'bg-[#2563EB] text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]'
                                    }`}
                            >
                                {spec}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Doctors Grid */}
                {filteredDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDoctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                            >
                                {/* Top colored bar */}
                                <div className="h-1 w-full bg-gradient-to-r from-[#2563EB] to-[#14B8A6]" />

                                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                                    {/* Doctor Profile Header */}
                                    <div className="flex items-center gap-5 mb-6">
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-blue-50">
                                                <img
                                                    src={doctor.image}
                                                    alt={doctor.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 bg-[#22C55E] p-1.5 rounded-lg border-2 border-white shadow-sm">
                                                <Stethoscope className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-extrabold text-[#1F2937] leading-tight mb-1 group-hover:text-[#2563EB] transition-colors">{doctor.name}</h3>
                                            <p className="text-[#14B8A6] font-bold text-sm bg-teal-50 inline-block px-2.5 py-1 rounded-md">{doctor.specialization}</p>
                                        </div>
                                    </div>

                                    {/* Doctor Details */}
                                    <div className="space-y-3 mb-6 flex-1">
                                        <div className="flex items-start gap-3">
                                            <GraduationCap className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                            <p className="text-gray-600 text-sm font-medium">{doctor.qualification}</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                            <p className="text-gray-600 text-sm font-medium">{doctor.experience}</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Hospital className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                            <p className="text-gray-600 text-sm font-medium">{doctor.hospital}</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Phone className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                            <p className="text-gray-600 text-sm font-medium">{doctor.phone}</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="bg-blue-50/50 p-4 rounded-2xl mt-auto">
                                        <p className="text-gray-600 text-sm leading-relaxed">{doctor.description}</p>
                                    </div>

                                    {/* Book Appointment Button */}
                                    <button
                                        onClick={() => openBookingModal(doctor)}
                                        className="w-full mt-6 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                                    >
                                        <Calendar className="w-5 h-5" />
                                        Book Appointment
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No doctors found</h3>
                        <p className="text-gray-500">We couldn't find any doctors matching your current search or filters.</p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedSpecialization('All');
                            }}
                            className="mt-6 text-[#2563EB] font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>

            {/* Booking Modal */}
            {bookingModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white p-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-extrabold">Book Appointment</h2>
                                <p className="text-white/90 text-sm mt-1">{selectedDoctor?.name}</p>
                            </div>
                            <button
                                onClick={closeBookingModal}
                                className="p-2 hover:bg-white/20 rounded-xl transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {bookingStatus === 'success' ? (
                                <div className="text-center py-8">
                                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Success!</h3>
                                    <p className="text-gray-600 mb-2">{bookingMessage}</p>
                                    <p className="text-sm text-gray-500">
                                        Date: {bookingData.date} at {bookingData.time}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleBookingSubmit} className="space-y-5">
                                    {/* Doctor Info */}
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        <p className="text-sm text-gray-600">Specialization</p>
                                        <p className="font-bold text-gray-900">{selectedDoctor?.specialization}</p>
                                        <p className="text-sm text-gray-600 mt-2">Hospital</p>
                                        <p className="font-bold text-gray-900">{selectedDoctor?.hospital}</p>
                                    </div>

                                    {/* Date Selection */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            <Calendar className="w-4 h-4 inline mr-2" />
                                            Appointment Date
                                        </label>
                                        <input
                                            type="date"
                                            value={bookingData.date}
                                            onChange={(e) => handleBookingChange('date', e.target.value)}
                                            min={getTomorrowDate()}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    {/* Time Selection */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            <Clock className="w-4 h-4 inline mr-2" />
                                            Appointment Time
                                        </label>
                                        <input
                                            type="time"
                                            value={bookingData.time}
                                            onChange={(e) => handleBookingChange('time', e.target.value)}
                                            min="09:00"
                                            max="18:00"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    {/* Reason for Visit */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Reason for Visit
                                        </label>
                                        <textarea
                                            value={bookingData.reason}
                                            onChange={(e) => handleBookingChange('reason', e.target.value)}
                                            placeholder="Describe your symptoms or reason for consultation..."
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl font-semibold focus:outline-none focus:border-blue-500 resize-none"
                                            required
                                        />
                                    </div>

                                    {/* Error Message */}
                                    {bookingStatus === 'error' && (
                                        <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-red-700 text-sm font-semibold">{bookingMessage}</p>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={closeBookingModal}
                                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={bookingStatus === 'loading'}
                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-70"
                                        >
                                            {bookingStatus === 'loading' ? 'Booking...' : 'Confirm Booking'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Doctors;