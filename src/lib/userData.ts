export const getUserData = () => {
    const stored = localStorage.getItem('user_profile');
    if (!stored) return null;
    return JSON.parse(stored);
};

export const updateUserData = (updates: Partial<ReturnType<typeof getUserData>>) => {
    const current = getUserData();
    if (!current) return;
    const updated = { ...current, ...updates };
    localStorage.setItem('user_profile', JSON.stringify(updated));

    // Dispatch custom event for real-time UI updates
    window.dispatchEvent(new Event('user-data-updated'));
    return updated;
};

export const addPoints = (amount: number) => {
    const user = getUserData();
    if (user) {
        updateUserData({ points: (user.points || 0) + amount });
    }
};

export const addCo2Saved = (amount: number) => {
    const user = getUserData();
    if (user) {
        updateUserData({ co2Saved: (user.co2Saved || 0) + amount });
    }
};
