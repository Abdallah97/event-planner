import { auth } from "@/auth";
import { GithubSignInButton } from "@/components/GithubSignInButton";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-purple-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome to EventPlanner</h1>
          <p className="text-xs text-slate-500 mt-1">
            Sign in with your GitHub account to access your event dashboard
          </p>
        </div>

        <div className="card p-8 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-6">
          <GithubSignInButton />

          <div className="pt-2 text-center border-t border-slate-100">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              By connecting your GitHub account, you agree to our Terms of Service and Event Organizer Guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
