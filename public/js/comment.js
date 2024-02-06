console.log(window.location.href.split("/")[4])
// create new comment function
const newFormHandler = async (event) => {
    event.preventDefault();

    // get the values of the title and content from the form
    const title = document.querySelector('#comment-title').value.trim();
    const content = document.querySelector('#comment-content').value.trim();
    const blog_id = window.location.href.split("/")[4];
    //Check if the title and content are provided then make a post request to create a new comment 
    if (title && content) {
        console.log('Before fetch');
        const response = await fetch(`/api/comment/${blog_id}`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('After fetch');
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create comment');
        }
    }
};

const delButtonHandler = async (event) => {
    
        const id = event.target.id;

        const response = await fetch(`/api/comment/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to delete comment');
        }
    
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);


    const delBtns = document.querySelectorAll(".delButton")
    for (let index = 0; index < delBtns.length; index++) {
        delBtns[index].addEventListener('click', delButtonHandler);
    }
        