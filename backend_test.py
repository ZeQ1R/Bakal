#!/usr/bin/env python3
"""
Backend API Testing for BAKAL: CUISINES Restaurant Reservation System
Tests all reservation endpoints with realistic data
"""

import requests
import json
import sys
from datetime import datetime

# Get backend URL from environment
BACKEND_URL = "https://gourmet-fusion-1.preview.emergentagent.com/api"

def test_create_reservation():
    """Test POST /api/reservations - Create a new reservation"""
    print("\n=== Testing POST /api/reservations ===")
    
    reservation_data = {
        "name": "John Smith",
        "email": "john@example.com", 
        "phone": "+1 555-123-4567",
        "guests": "4",
        "date": "2025-08-15",
        "time": "7:00 PM",
        "requests": "Window seat if possible, celebrating anniversary"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/reservations", json=reservation_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            reservation_id = data.get('id')
            print(f"✅ Reservation created successfully with ID: {reservation_id}")
            return reservation_id
        else:
            print(f"❌ Failed to create reservation: {response.status_code}")
            return None
            
    except Exception as e:
        print(f"❌ Error creating reservation: {str(e)}")
        return None

def test_get_all_reservations():
    """Test GET /api/reservations - Get all reservations"""
    print("\n=== Testing GET /api/reservations ===")
    
    try:
        response = requests.get(f"{BACKEND_URL}/reservations")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Retrieved {len(data)} reservations")
            return data
        else:
            print(f"❌ Failed to get reservations: {response.status_code}")
            return None
            
    except Exception as e:
        print(f"❌ Error getting reservations: {str(e)}")
        return None

def test_get_reservation_by_id(reservation_id):
    """Test GET /api/reservations/{id} - Get specific reservation"""
    print(f"\n=== Testing GET /api/reservations/{reservation_id} ===")
    
    if not reservation_id:
        print("❌ No reservation ID provided")
        return None
        
    try:
        response = requests.get(f"{BACKEND_URL}/reservations/{reservation_id}")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Retrieved reservation for {data.get('name')}")
            return data
        elif response.status_code == 404:
            print(f"❌ Reservation not found: {reservation_id}")
            return None
        else:
            print(f"❌ Failed to get reservation: {response.status_code}")
            return None
            
    except Exception as e:
        print(f"❌ Error getting reservation: {str(e)}")
        return None

def test_update_reservation_status(reservation_id):
    """Test PATCH /api/reservations/{id}/status - Update reservation status"""
    print(f"\n=== Testing PATCH /api/reservations/{reservation_id}/status ===")
    
    if not reservation_id:
        print("❌ No reservation ID provided")
        return False
        
    try:
        response = requests.patch(f"{BACKEND_URL}/reservations/{reservation_id}/status?status=confirmed")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✅ Reservation status updated to confirmed")
            return True
        elif response.status_code == 404:
            print(f"❌ Reservation not found: {reservation_id}")
            return False
        else:
            print(f"❌ Failed to update status: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error updating reservation status: {str(e)}")
        return False

def test_invalid_email_validation():
    """Test validation by creating reservation with invalid email"""
    print("\n=== Testing Email Validation ===")
    
    invalid_reservation_data = {
        "name": "Jane Doe",
        "email": "invalid-email-format",  # Invalid email
        "phone": "+1 555-987-6543",
        "guests": "2",
        "date": "2025-08-20",
        "time": "6:30 PM",
        "requests": "Quiet table please"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/reservations", json=invalid_reservation_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:  # Validation error expected
            print("✅ Email validation working correctly - rejected invalid email")
            return True
        elif response.status_code == 200:
            print("❌ Email validation failed - accepted invalid email")
            return False
        else:
            print(f"❌ Unexpected response for invalid email: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing email validation: {str(e)}")
        return False

def test_backend_connectivity():
    """Test basic backend connectivity"""
    print("\n=== Testing Backend Connectivity ===")
    
    try:
        response = requests.get(f"{BACKEND_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✅ Backend is accessible")
            return True
        else:
            print(f"❌ Backend connectivity issue: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Backend connection error: {str(e)}")
        return False

def main():
    """Run all reservation API tests"""
    print("🍽️  BAKAL: CUISINES Restaurant Reservation API Tests")
    print("=" * 60)
    
    # Track test results
    test_results = {
        "backend_connectivity": False,
        "create_reservation": False,
        "get_all_reservations": False,
        "get_reservation_by_id": False,
        "update_status": False,
        "email_validation": False
    }
    
    # Test 1: Backend connectivity
    test_results["backend_connectivity"] = test_backend_connectivity()
    
    if not test_results["backend_connectivity"]:
        print("\n❌ Backend is not accessible. Stopping tests.")
        return test_results
    
    # Test 2: Create reservation
    reservation_id = test_create_reservation()
    test_results["create_reservation"] = reservation_id is not None
    
    # Test 3: Get all reservations
    all_reservations = test_get_all_reservations()
    test_results["get_all_reservations"] = all_reservations is not None
    
    # Test 4: Get specific reservation by ID
    if reservation_id:
        specific_reservation = test_get_reservation_by_id(reservation_id)
        test_results["get_reservation_by_id"] = specific_reservation is not None
        
        # Test 5: Update reservation status
        test_results["update_status"] = test_update_reservation_status(reservation_id)
    else:
        print("\n⚠️  Skipping ID-based tests due to failed reservation creation")
    
    # Test 6: Email validation
    test_results["email_validation"] = test_invalid_email_validation()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(test_results.values())
    total = len(test_results)
    
    for test_name, result in test_results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Reservation API is working correctly.")
    else:
        print("⚠️  Some tests failed. Check the details above.")
    
    return test_results

if __name__ == "__main__":
    results = main()
    
    # Exit with error code if any tests failed
    if not all(results.values()):
        sys.exit(1)