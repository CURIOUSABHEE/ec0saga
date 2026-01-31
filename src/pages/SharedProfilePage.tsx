import { Link, useSearchParams } from 'react-router-dom';
import { Leaf, Trophy, ArrowRight } from 'lucide-react';

const SharedProfilePage = () => {
    const [searchParams] = useSearchParams();
    
    // Read data from URL params
    const name = searchParams.get('name') || 'Eco Warrior';
    const points = searchParams.get('points') || '0';
    const co2 = searchParams.get('co2') || '0';
    const badges = searchParams.get('badges') || '0';
    const level = searchParams.get('level') || 'Eco Guardian';

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 font-sans">
            {/* Logo */}
            <div className="mb-8">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                    <Leaf size={32} strokeWidth={2.5} className="text-lime" />
                </div>
            </div>

            {/* Public Profile Card */}
            <div className="lisboa-card w-full max-w-sm text-center transform hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute top-4 right-4">
                    <Trophy className="text-coral" size={24} />
                </div>
                
                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center text-5xl mx-auto mb-4 border-4 border-white shadow-sm">
                    ⚡
                </div>
                
                <h1 className="text-2xl font-bold text-foreground mb-1">{name}</h1>
                <p className="text-muted-foreground font-medium mb-6">{level}</p>

                <div className="grid grid-cols-3 gap-2 py-6 border-y border-border/50">
                    <div>
                        <p className="text-2xl font-bold text-coral">{points}</p>
                        <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mt-1">Points</p>
                    </div>
                    <div className="border-x border-border/50">
                        <p className="text-2xl font-bold text-jungle">{co2}</p>
                        <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mt-1">kg CO₂</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">{badges}</p>
                        <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mt-1">Badges</p>
                    </div>
                </div>

                <div className="mt-8">
                    <p className="text-sm text-muted-foreground mb-4">
                        Join {name} in the fight against climate change!
                    </p>
                    <Link 
                        to="/"
                        className="btn-jungle w-full flex items-center justify-center gap-2 group"
                    >
                        Join Ec0Saga Free
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            <footer className="mt-8 text-center">
                <p className="text-xs text-muted-foreground">
                    Ec0Saga Public Profile View
                </p>
            </footer>
        </div>
    );
};

export default SharedProfilePage;
