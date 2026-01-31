import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState<{ name?: string; mobile?: string; pin?: string }>({});

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    
    if (errors.pin) setErrors({ ...errors, pin: undefined });

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; mobile?: string; pin?: string } = {};
    let isValid = true;

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
      isValid = false;
    } else if (name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
      isValid = false;
    }

    // Mobile validation
    const mobileRegex = /^\+?[0-9\s-]{10,15}$/;
    if (!mobileNumber.trim()) {
      newErrors.mobile = 'Mobile number is required';
      isValid = false;
    } else if (!mobileRegex.test(mobileNumber)) {
      newErrors.mobile = 'Please enter a valid mobile number';
      isValid = false;
    }

    // PIN validation
    if (pin.some((digit) => digit === '')) {
      newErrors.pin = 'Please enter all 6 digits of your PIN';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, send registration data to backend
      console.log('Register successful', { name, mobileNumber, pin: pin.join('') });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      {/* Back Link */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={20} strokeWidth={2.5} />
        <span className="font-medium">Back</span>
      </Link>

      {/* Logo */}
      <div className="mb-8">
        <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
          <Leaf size={32} strokeWidth={2.5} className="text-lime" />
        </div>
      </div>

      {/* Register Card */}
      <div className="lisboa-card w-full max-w-sm">
        <h1 className="text-2xl font-bold text-foreground text-center mb-2">
          Create Account
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Join the movement today
        </p>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-semibold">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={`h-14 rounded-2xl border-2 bg-cream text-foreground text-lg font-medium placeholder:text-muted-foreground focus:border-primary ${
                errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-primary/20'
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 font-medium ml-1">{errors.name}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="space-y-2">
            <Label htmlFor="mobile" className="text-foreground font-semibold">
              Mobile Number
            </Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="+351 912 345 678"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
                if (errors.mobile) setErrors({ ...errors, mobile: undefined });
              }}
              className={`h-14 rounded-2xl border-2 bg-cream text-foreground text-lg font-medium placeholder:text-muted-foreground focus:border-primary ${
                errors.mobile ? 'border-red-500 focus:ring-red-500/20' : 'border-primary/20'
              }`}
            />
            {errors.mobile && (
              <p className="text-sm text-red-500 font-medium ml-1">{errors.mobile}</p>
            )}
          </div>

          {/* 6-Digit PIN */}
          <div className="space-y-2">
            <Label className="text-foreground font-semibold">
              6-Digit PIN
            </Label>
            <div className="flex gap-2 justify-center">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  id={`pin-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 bg-cream text-foreground focus:border-primary focus:outline-none focus:ring-2 transition-all ${
                    errors.pin 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-primary/20 focus:ring-primary/20'
                  }`}
                />
              ))}
            </div>
            {errors.pin && (
              <p className="text-sm text-red-500 font-medium text-center">{errors.pin}</p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn-jungle w-full text-lg"
          >
            Sign Up
          </button>
        </form>

        {/* Help Text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-coral font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
