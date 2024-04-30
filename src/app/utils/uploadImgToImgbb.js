export const uploadImgToImgbb = async(formData)=> {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=12bce7cbd26e6938d46594532d6a3147`, {
        method: 'POST',
        body: formData
    });
    const {data} = await res.json();
    const imageUrl = data.display_url;
    return imageUrl;
}