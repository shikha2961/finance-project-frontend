import s from './landingPage.module.scss';

export default function LandingPage(){
    return(
        <div className={s.landingPage}>
            <header className={s.heroSection}>
                <h1>Welcome to Your Finance Dashboard</h1>
                <p>Track your finances, set budgets, and view your spending habits.</p>
                <button>Get Started</button>
            </header>

            <section className={s.features}>
                <h2>Features</h2>
                <div className={s.featureCards}>
                    <div className={s.featureCard}>
                        <h3>Track Spending</h3>
                        <p>Track your spending habits and view your transactions.</p>
                    </div>
                    <div className={s.featureCard}>
                        <h3>Set Budgets</h3>
                        <p>Set budgets for different categories and track your spending against them.</p>
                    </div>
                    <div className={s.featureCard}>
                        <h3>View Reports</h3>
                        <p>View reports and insights on your spending habits.</p>
                    </div>
                </div>
            </section>

            <footer className={s.footer}>
                <p>Personal Finance Management</p>
                <p>© 2025</p>

            </footer>
        </div>
    )
}