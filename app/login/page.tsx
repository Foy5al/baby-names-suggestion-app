"use client";
import { useState } from "react";
import { login } from "../actions/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md border border-pink-100 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
          👶 Baby Name Hub
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-300 mb-8">
          Enter the family passcode to enter
        </p>

        <form action={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              name="passcode"
              type="password"
              placeholder="Secret Passcode"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 dark:text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Enter
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't have access? Please contact the child's parents.
          </p>
        </div>
      </div>
    </div>
  );
}