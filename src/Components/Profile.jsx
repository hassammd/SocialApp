import { useEffect, useState } from "react";
import AddPost from "./AddPosts";
import { getDatabase, ref, get, update } from "firebase/database";
import { auth } from "../firebase";
import { getStorage, ref as filestoregeRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import PostComponent from "./PostComponent";

const Profile = () => {
    const parms = useParams();
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState({});

    const profileImageUploadHandler = async (file) => {
        if (!file) return;
        try {
            const storage = getStorage();
            const imageRef = filestoregeRef(storage, `profileImages/${auth.currentUser.uid}`);
            await uploadBytes(imageRef, file);
            const downloadUrl = await getDownloadURL(imageRef);

            const db = getDatabase();
            const updateRef = ref(db, `users/${auth.currentUser.uid}`);
            await update(updateRef, {
                imageUrl: downloadUrl
            });
        } catch (err) {
            console.log("Upload failed:", err.code || err.message || err);
        }
    };

    useEffect(() => {
        const db = getDatabase();

        if (parms.id) {
            const userRef = ref(db, `users/${parms.id}`);
            get(userRef)
                .then((snapShot) => {
                    if (snapShot.exists()) {
                        setProfileData(snapShot.val());
                    } else {
                        alert("User not found.");
                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.log("Error fetching user:", error);
                    alert("Something went wrong.");
                    navigate("/");
                });
        } else {
            const user = auth.currentUser;
            if (user) {
                const useRef = ref(db, `users/${user.uid}`);
                get(useRef)
                    .then((snapShot) => {
                        if (snapShot.exists()) {
                            setProfileData(snapShot.val());
                        } else {
                            alert("User not found.");
                            navigate("/");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        alert("Something went wrong.");
                        navigate("/");
                    });
            }
        }
    }, [parms]);

    return (
        <>
            <div className="bg-white">
                <div className="bg-gray-200 h-70 flex items-center justify-center relative">
                    <h2>User Profile</h2>
                </div>
                <div className="flex flex-col items-start pl-20 -mt-16 mb-15 pb-10 relative">
                    <div className="border border-gray-300 rounded-full bg-gray-100 h-30 w-30 flex justify-center items-center">
                        <span><img src={profileData.imageUrl || ""} alt="" /></span>
                    </div>
                    <input
                        onChange={(e) => profileImageUploadHandler(e.target.files[0])}
                        type="file"
                        accept="image/*"
                    />

                    <div className="flex flex-col items-start">
                        <h2 className="font-bold">{profileData.name}</h2>
                        <span>@username</span>
                        <p>{profileData.bio}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="flex gap-2 items-center">
                            <span className="text-blue-600">{profileData.followers}</span>
                            <p className="text-sm">followers</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <span className="text-blue-600">{profileData.following}</span>
                            <p className="text-sm">following</p>
                        </div>
                    </div>
                </div>
            </div>

            {
                !parms.id &&
                <div className="lg:w-2/5 sm:w-full m-auto rounded-sm">
                    <AddPost />
                </div>
            }

            {/* <PostComponent profileData={profileData} /> */}
        </>
    );
};

export default Profile;
