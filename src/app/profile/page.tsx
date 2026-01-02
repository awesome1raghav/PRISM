
import Header from "@/components/layout/header";

export default function ProfilePage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <main className="flex-grow container py-12">
                 <h1 className="text-4xl font-bold tracking-tight">
                    Profile
                </h1>
                <p className="text-muted-foreground mt-4">This is a placeholder page for user profiles.</p>
            </main>
        </div>
    )
}
