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
          err.response.data.message ||
            `Error: ${err.response.status} - ${
              err.response.statusText || "Terjadi kesalahan server"
            }`
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
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl">
              Selamat Datang, {registrationResult.name}!
            </CardTitle>
            <CardDescription>
              Akun Anda telah berhasil dibuat
              dengan preferensi {registrationResult.preference}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-teal-700 hover:bg-teal-800"
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Get started by filling out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && step === "form" && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="name@company.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                placeholder="••••••••"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                placeholder="20"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-teal-700 hover:bg-teal-800"
              disabled={isLoading && step === "form"}
            >
              {isLoading && step === "form" ? "Processing..." : "Next"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => (window.location.href = "/login")}
              className="text-teal-700 hover:underline"
            >
              Sign in
            </button>
          </div>
        </CardContent>
      </Card>

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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pilih Preferensi Anda</DialogTitle>
            <DialogDescription>
              Pilih satu preferensi yang paling sesuai dengan minat Anda.
            </DialogDescription>
          </DialogHeader>
          {error && step === "preferences" && (
            <Alert variant="destructive" className="my-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-2 gap-3 py-4">
            {preferences.map((preference) => {
              const Icon = preference.icon;
              return (
                <button
                  key={preference.id}
                  onClick={() => handlePreferenceSelect(preference.id)}
                  className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    selectedPreference === preference.id
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  disabled={isLoading}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Icon
                      className={`h-8 w-8 ${
                        selectedPreference === preference.id
                          ? "text-teal-600"
                          : "text-gray-600"
                      }`}
                    />
                    <div>
                      <h3 className="font-medium text-sm">
                        {preference.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {preference.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
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
              className="bg-teal-700 hover:bg-teal-800"
            >
              {isLoading ? "Registering..." : "Selesai"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 