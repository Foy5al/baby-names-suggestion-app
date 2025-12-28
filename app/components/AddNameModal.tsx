"use client";

import { useState } from "react";
import { addName } from "@/app/actions/names";

export default function AddNameModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    await addName(formData);
    setIsPending(false);
    setIsOpen(false); // Close modal after success
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition"
      >
        + Suggest a Name
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Suggest a Name
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
                  disabled={isPending}
                >
                  &times;
                </button>
              </div>

              <form action={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">
                    The Name
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="e.g. Faris or Fathiha"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                {/* Gender Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option className="bg-indigo-600 text-white" value="BOY">Boy 🧸</option>
                    <option className="bg-pink-600 text-white" value="GIRL">Girl 🎀</option>
                  </select>
                </div>

                {/* Meaning Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">
                    Meaning
                  </label>
                  <textarea
                    name="meaning"
                    placeholder="What does this name mean?"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none h-24"
                  />
                </div>

                {/* Suggested By */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    name="suggestedBy"
                    required
                    placeholder="Who is suggesting this?"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className={`w-full py-3 rounded-lg font-bold text-white transition ${
                    isPending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {isPending ? "Adding..." : "Add to List"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


/* 
"use client";

import { useState } from "react";
import { addName } from "@/app/actions/names";

export default function AddNameModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    await addName(formData);
    setIsPending(false);
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition
                 dark:bg-indigo-700 dark:hover:bg-indigo-600"
      >
        + Suggest a Name
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Suggest a Name
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
                  disabled={isPending}
                >
                  &times;
                </button>
              </div>

              <form action={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    disabled={isPending}
                  />
                </div>

                <div>
                  <label
                    htmlFor="meaning"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Meaning
                  </label>
                  <textarea
                    id="meaning"
                    name="meaning"
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    disabled={isPending}
                  ></textarea>
                </div>

                <div>
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gender
                  </span>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="BOY"
                        required
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600
                                   dark:bg-gray-700 dark:checked:bg-indigo-600"
                        disabled={isPending}
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        Boy
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="GIRL"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600
                                   dark:bg-gray-700 dark:checked:bg-indigo-600"
                        disabled={isPending}
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        Girl
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700
                               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? "Submitting..." : "Submit Suggestion"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
} */