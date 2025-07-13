import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/router";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
        router.push("/login");
      }
    };
    fetchProfile();
  }, []);

  const handleGoPremium = async () => {
    try {
      const res = await axiosInstance.post(
        "/payment/create-order",
        { amount: 49900 }, // Rs 499 in paisa
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { order } = res.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "YouTube Clone",
        description: "Premium Plan",
        order_id: order.id,
        handler: async function (response: any) {
          const verifyRes = await axiosInstance.post(
            "/payment/verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          alert("Premium activated!");
          window.location.reload();
        },
        theme: {
          color: "#3399cc",
        },
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <p>Email: {user.email}</p>
      <p>Premium: {user.isPremium ? "Yes" : "No"}</p>

      {!user.isPremium && (
        <button
          onClick={handleGoPremium}
          className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded"
        >
          Go Premium
        </button>
      )}
    </div>
  );
};

export default Profile;
