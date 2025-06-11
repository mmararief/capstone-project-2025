"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Anchor,
  Palette,
  Trees,
  ShoppingCart,
  FerrisWheel,
  Landmark,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Register() {
  const [step, setStep] = useState("form");
  const [showModal, setShowModal] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [registrationResult, setRegistrationResult] = useState(null);

  const preferences = [
    { id: "Bahari", title: "Bahari", description: "Destinasi laut, pantai, dan aktivitas perairan.", icon: Anchor },
    { id: "Budaya", title: "Budaya", description: "Seni, sejarah, tradisi, dan warisan lokal.", icon: Palette },
    { id: "Cagar Alam", title: "Cagar Alam", description: "Kawasan konservasi flora, fauna, dan ekosistem.", icon: Trees },
    { id: "Pusat Perbelanjaan", title: "Pusat Perbelanjaan", description: "Mal, pasar, dan area komersial untuk berbelanja.", icon: ShoppingCart },
    { id: "Taman Hiburan", title: "Taman Hiburan", description: "Wahana permainan, atraksi, dan rekreasi keluarga.", icon: FerrisWheel },
    { id: "Tempat Ibadah", title: "Tempat Ibadah", description: "Masjid, gereja, kuil, dan situs religius lainnya.", icon: Landmark },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.age) {
      setError("Harap isi semua kolom yang wajib diisi.");
      return;
    }
    if (formData.fullName.trim().length <= 6) {
      setError("Full Name harus lebih dari 6 karakter.");
      return;
    }
    if (formData.password.length <= 6) {
      setError("Password harus lebih dari 6 karakter.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }
    const ageNumber = parseInt(formData.age, 10);
    if (isNaN(ageNumber) || ageNumber <= 0 || ageNumber > 120) {
      setError("Harap masukkan usia yang valid.");
      return;
    }

    setStep("preferences");
    setShowModal(true);
  };

  const handlePreferenceSelect = (preference) => {
    setSelectedPreference(preference);
    if (error) setError("");
  };

  const handleCompleteRegistration = async () => {
    if (!selectedPreference) {
      setError("Harap pilih preferensi Anda.");
      return;
    }
    setError("");
    setIsLoading(true);

    if (!API_BASE_URL) {
      setError("Konfigurasi API base URL tidak ditemukan.");
      setIsLoading(false);
      console.error("VITE_API_BASE_URL is not defined.");
      return;
    }

    const ageNumber = parseInt(formData.age, 10);
    const preferencesArray = [selectedPreference];

    const apiRequestBody = {
      name: formData.fullName.trim(),
      email: formData.email,
      password: formData.password,
      preferences: preferencesArray,
      age: ageNumber,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        apiRequestBody
      );
      const responseData = response.data;

      setRegistrationResult({
        name: responseData.name || formData.fullName.trim(),
        preference: selectedPreference,
      });

  

      setShowModal(false);
      setStep("complete");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
      });
      setSelectedPreference(null);
    } catch (err) {
      if (err.response) {
        setError(
          "Unable to complete registration. Make sure your email and username are not already registered."
        );
        console.error("Registration error (response):", err.response.data);
      } else if (err.request) {
        setError("Registrasi gagal. Tidak ada respons dari server.");
        console.error("Registration error (request):", err.request);
      } else {
        setError("Registrasi gagal. Terjadi kesalahan tidak terduga.");
        console.error("Registration error (message):", err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

if (step === "complete" && registrationResult) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md border border-[#D6BD98] shadow-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#D6BD98]/20">
            <CheckCircle className="h-6 w-6 text-[#1A3636]" />
          </div>
          <CardTitle className="text-2xl text-[#1A3636]">
            Selamat Datang, {registrationResult.name}!
          </CardTitle>
          <CardDescription className="text-[#40534C]">
            Akun Anda telah berhasil dibuat dengan preferensi{" "}
            <span className="font-semibold text-[#1A3636]">
              {registrationResult.preference}
            </span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full bg-[#1A3636] hover:bg-[#40534C] text-white"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Login Sekarang
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

return (
  <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
    <Card className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[#D6BD98]/30 p-8">
      <CardHeader className="text-center px-0">
        <CardTitle className="text-3xl font-bold text-[#1A3636]">Create Account</CardTitle>
        <CardDescription className="text-sm text-[#40534C]">
          Get started by filling the form below
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        {error && step === "form" && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {[
            { id: "fullName", label: "Full Name", type: "text", placeholder: "John Doe" },
            { id: "email", label: "Email Address", type: "email", placeholder: "name@company.com" },
            { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
            { id: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "••••••••" },
            { id: "age", label: "Age", type: "number", placeholder: "20" },
          ].map(({ id, label, type, placeholder }) => (
            <div key={id}>
              <label htmlFor={id} className="block mb-1 text-sm font-medium text-[#40534C]">
                {label}
              </label>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={formData[id]}
                onChange={(e) => handleInputChange(id, e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D6BD98] border-gray-300"
              />
            </div>
          ))}
          <Button
            type="submit"
            className="w-full bg-[#1A3636] hover:bg-[#40534C] text-white"
            disabled={isLoading && step === "form"}
          >
            {isLoading && step === "form" ? "Processing..." : "Next"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-[#40534C]">
          Already have an account?{" "}
          <button
            onClick={() => (window.location.href = "/login")}
            className="text-[#1A3636] hover:underline"
          >
            Sign in
          </button>
        </div>
      </CardContent>
    </Card>

    {/* Modal Preferences */}
    <Dialog
      open={showModal && step === "preferences"}
      onOpenChange={(open) => {
        if (step === "preferences") {
          setShowModal(open);
          if (!open && !isLoading) {
            setStep("form");
            setError("");
          }
        }
      }}
    >
      <DialogContent className="sm:max-w-md rounded-2xl border border-[#D6BD98]/30 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-[#1A3636] text-lg">Pilih Preferensi Anda</DialogTitle>
          <DialogDescription className="text-[#40534C]">
            Pilih satu preferensi yang paling sesuai dengan minat Anda.
          </DialogDescription>
        </DialogHeader>
        {error && step === "preferences" && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm my-2">
            {error}
          </div>
        )}
        <div className="grid grid-cols-2 gap-3 py-4">
          {preferences.map(({ id, title, description, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handlePreferenceSelect(id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedPreference === id
                  ? "border-[#D6BD98] bg-[#FAF9F7]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              disabled={isLoading}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <Icon
                  className={`h-6 w-6 ${
                    selectedPreference === id ? "text-[#1A3636]" : "text-gray-600"
                  }`}
                />
                <div>
                  <h3 className="font-medium text-sm text-[#1A3636]">{title}</h3>
                  <p className="text-xs text-[#40534C] mt-1">{description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              setShowModal(false);
              setStep("form");
              setError("");
            }}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button
            onClick={handleCompleteRegistration}
            disabled={!selectedPreference || isLoading}
            className="bg-[#1A3636] hover:bg-[#40534C] text-white"
          >
            {isLoading ? "Registering..." : "Selesai"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
);
} 