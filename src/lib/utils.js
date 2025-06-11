import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Decode JWT token and extract payload data
 * @param {string} token - JWT token from localStorage
 * @returns {object|null} - Decoded payload or null if invalid
 */
export function decodeJWT(token) {
  if (!token) return null;
  
  try {
    // JWT structure: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // Decode the payload (second part)
    const payload = parts[1];
    
    // Add padding if needed
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    
    // Decode from base64
    const decodedPayload = atob(paddedPayload);
    
    // Parse JSON
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

/**
 * Get user data from stored authentication token
 * @returns {object|null} - User data from JWT or null if not available
 */
export function getUserFromToken() {
  const token = localStorage.getItem('authToken');
  return decodeJWT(token);
}
