export const uploadImgToImgbb = async(formData:FormData)=> {
    const imgbbUrl = 'https://api.imgbb.com/1/upload?key=12bce7cbd26e6938d46594532d6a3147';
    const res = await fetch(imgbbUrl, {
        method: 'POST',
        body: formData
    });
    const {data} = await res.json();
    const imageUrl = data.display_url;
    return imageUrl;
}