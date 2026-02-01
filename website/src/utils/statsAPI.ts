// Stats API utilities for public endpoints

/**
 * Fetch the total user count from the backend
 * This is a public endpoint that doesn't require authentication
 */
export const fetchUserCount = async (): Promise<number | null> => {
    try {
        const response = await fetch('/api/stats/users/count', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.count || null;
        }
        return null;
    } catch (error) {
        console.error('Error fetching user count:', error);
        return null;
    }
};
