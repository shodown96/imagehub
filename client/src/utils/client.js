import axios from "axios";
import { appConfig } from "./constants";

export const getClient = (
    multipart = false,
    extraHeaders = {}) => {
    const instance = axios.create({
        headers: {
            "Content-Type": `${multipart ? "multipart/form-data" : "application/json"}`,
            ...extraHeaders
        },
        baseURL: appConfig.API_ENDPOINTS.Base,
        timeout: 30000,
    });
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log("error from client: ", error)
            if (error.code === "ERR_NETWORK") {
                error['response'] = {
                    data: {
                        title: "Network error",
                        message: "Please try again later, thank you."
                    }
                }
            }
            return Promise.reject(error);
        }
    );
    return instance;
};


export const mainClient = getClient();

// Fetch Functions
// const fetchPosts = async () => {
//     setLoading(true);

//     try {
//       const response = await fetch(appConfig.API_ENDPOINTS.Posts, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setAllPosts(result.data.reverse());
//       }
//     } catch (err) {
//       // alert(err);
//     } finally {
//       setLoading(false);
//     }
//   };

// const generateImage = async () => {
//     if (form.prompt) {
//         try {
//             setGeneratingImg(true);
//             const response = await fetch(appConfig.API_ENDPOINTS.Dalle, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     prompt: form.prompt,
//                 }),
//             });

//             const data = await response.json();
//             setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
//         } catch (err) {
//             alert(err);
//         } finally {
//             setGeneratingImg(false);
//         }
//     } else {
//         alert('Please provide proper prompt');
//     }
// };

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (form.prompt && form.photo) {
//         setLoading(true);
//         try {
//             const response = await fetch(appConfig.API_ENDPOINTS.Posts, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ ...form }),
//             });

//             await response.json();
//             toast.success('Yayyyy, thank you for contributing to the community.')
//             navigate('/');
//         } catch (err) {
//             alert(err);
//             toast.success('Oops, something went wrong.')
//         } finally {
//             setLoading(false);
//         }
//     } else {
//         alert('Please generate an image with proper details');
//     }
// };