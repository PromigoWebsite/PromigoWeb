import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UserProfile() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-16 sm:w-56 bg-teal-800 text-white p-4 flex flex-col gap-6">
        <div className="text-center text-2xl font-bold hidden sm:block">PROMIGO</div>
        <div className="flex flex-col gap-4 mt-8">
          <button className="flex items-center gap-2">
            <span className="material-icons">home</span>
            <span className="hidden sm:inline">Home</span>
          </button>
          <button className="flex items-center gap-2">
            <span className="material-icons">star</span>
            <span className="hidden sm:inline">Recommend</span>
          </button>
          <button className="flex items-center gap-2">
            <span className="material-icons">schedule</span>
            <span className="hidden sm:inline">Newest</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-3xl font-semibold">PROMIGO</div>
          <div className="flex items-center gap-4">
            <span className="material-icons">search</span>
            <span className="material-icons">notifications</span>
            <span className="material-icons">account_circle</span>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="flex items-center gap-6 mb-6">
              <img
                src="https://i.pinimg.com/originals/3c/5e/ba/3c5eba8cfbbcf741351d158b03c9c38e.jpg"
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
              />
              <div>
                <h2 className="text-2xl font-bold">Llyod Frontera</h2>
                <p className="text-gray-600">Kim Suho</p>
                <p className="text-sm text-gray-500">User</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Username</label>
                <Input defaultValue="Llyod Frontera" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Fullname</label>
                <Input defaultValue="Kim Suho" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
                <Input defaultValue="Llyuod@gmail.com" type="email" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
                <Input defaultValue="(+62) 82222242424" type="tel" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Role</label>
                <Input defaultValue="User" disabled />
              </div>
            </div>x`

            <div className="mt-6 text-right">
              <Button className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
