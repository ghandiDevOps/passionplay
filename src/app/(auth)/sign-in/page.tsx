import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-black text-passion-500">PassionPlay</h1>
          <p className="text-gray-500 mt-1">Connecte-toi à ton espace coach</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              card:           "shadow-none border border-gray-100 rounded-2xl",
              headerTitle:    "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "rounded-xl font-medium",
              formButtonPrimary:
                "bg-passion-500 hover:bg-passion-600 rounded-xl font-semibold",
            },
          }}
        />
      </div>
    </main>
  );
}
