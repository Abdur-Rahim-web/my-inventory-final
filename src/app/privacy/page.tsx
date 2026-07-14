export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
            <div className="space-y-6 text-gray-600 leading-relaxed">
                <section>
                    <h2 className="text-xl font-semibold text-gray-700">1. Data Security</h2>
                    <p>We are committed to protecting your information. All data stored in our system is encrypted and handled with high security standards.</p>
                </section>
                <section>
                    <h2 className="text-xl font-semibold text-gray-700">2. Usage Terms</h2>
                    <p>By using this platform, you agree to use it for lawful business purposes only. Unauthorized attempts to modify or exploit the system are strictly prohibited.</p>
                </section>
                <section>
                    <h2 className="text-xl font-semibold text-gray-700">3. Information Sharing</h2>
                    <p>We do not share, sell, or rent your personal information to third parties under any circumstances.</p>
                </section>
            </div>
        </div>
    );
}