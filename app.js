document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    const postTypeFilter = urlParams.get('postTypeFilter') || 'Creatures';

    const apiUrl = `https://glatch-proxy1.up.railway.app/apis/posts-api/v1/content-posts/findFeedPosts?postTypeFilter=${postTypeFilter}&feedType=Top&limit=225`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'roblox-place-id': '82695214392018'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        populateTable(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error.message); // Improved error message
        console.error(error); // Full error object for debugging
    });

    function populateTable(data) {
        const tableBody = document.querySelector('#data-table tbody');
        data = data["posts"]
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="https://www.roblox.com/users/${item.creatorUserId}/profile">${item.creatorUsername}</a></td>
                <td><a href="${item.screenshotMetadata.fullSizeUrl}"><img src="${item.screenshotMetadata.fullSizeUrl}" alt="Screenshot" width="256" height="144"></a></td>
            `;
            tableBody.appendChild(row);
        });
    }
});
