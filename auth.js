// auth.js - manage login state across all pages
function updateNavbarAuth() {
    const loggedUser = localStorage.getItem('loggedInUser');
    const authContainers = document.querySelectorAll('#navAuth, #authNavLinks');
    const mobileAuth = document.getElementById('mobileAuthLinks');
    if(loggedUser) {
        const user = JSON.parse(loggedUser);
        const logoutHtml = `<span class="text-sm text-gray-600 mr-2">Hi, ${user.email.split('@')[0]}</span><a href="#" id="logoutBtn" class="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-300">Logout</a>`;
        authContainers.forEach(cont => { if(cont) cont.innerHTML = logoutHtml; });
        if(mobileAuth) mobileAuth.innerHTML = `<a href="#" id="mobileLogoutBtn" class="w-full py-2 text-center bg-gray-100 rounded-full">Logout</a>`;
        const logoutHandler = (e) => {
            e.preventDefault();
            localStorage.removeItem('loggedInUser');
            window.location.reload();
        };
        document.getElementById('logoutBtn')?.addEventListener('click', logoutHandler);
        document.getElementById('mobileLogoutBtn')?.addEventListener('click', logoutHandler);
    } else {
        const loginHtml = `<a href="login.html" class="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50">Log in</a><a href="signup.html" class="px-4 py-1.5 rounded-full gradient-bg text-white ml-2">Sign up</a>`;
        authContainers.forEach(cont => { if(cont) cont.innerHTML = loginHtml; });
        if(mobileAuth) mobileAuth.innerHTML = `<a href="login.html" class="w-full py-2 text-center border rounded-full">Log in</a><a href="signup.html" class="w-full py-2 text-center gradient-bg text-white rounded-full">Sign up</a>`;
    }
}
document.addEventListener('DOMContentLoaded', updateNavbarAuth);

// auth.js - Simple working version

function updateNavbarAuth() {
    const loggedUser = localStorage.getItem('loggedInUser');
    const authContainer = document.getElementById('authNavLinks');
    const mobileAuthContainer = document.getElementById('mobileAuthLinks');
    
    if (loggedUser) {
        const user = JSON.parse(loggedUser);
        const displayName = user.name ? user.name.split(' ')[0] : user.email.split('@')[0];
        
        // Create button
        const btn = document.createElement('button');
        btn.id = 'userProfileBtn';
        btn.className = 'flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition';
        btn.innerHTML = `<i class="fas fa-user-circle text-[#6A4E8F] text-lg"></i><span class="text-sm font-medium">Hi, ${displayName}</span>`;
        
        // Clear container and add button
        if (authContainer) {
            authContainer.innerHTML = '';
            authContainer.appendChild(btn);
        }
        
        // Mobile
        if (mobileAuthContainer) {
            const mobileBtn = document.createElement('button');
            mobileBtn.id = 'mobileUserProfileBtn';
            mobileBtn.className = 'w-full py-2 text-center bg-gray-100 rounded-full';
            mobileBtn.innerHTML = `<i class="fas fa-user-circle mr-2"></i>${displayName}`;
            mobileAuthContainer.innerHTML = '';
            mobileAuthContainer.appendChild(mobileBtn);
            
            mobileBtn.onclick = () => showModal(user);
        }
        
        btn.onclick = () => showModal(user);
    } else {
        // Show login/signup buttons
        if (authContainer) {
            authContainer.innerHTML = `
                <a href="login.html" class="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50">Log in</a>
                <a href="signup.html" class="px-4 py-1.5 rounded-full gradient-bg text-white ml-2">Sign up</a>
            `;
        }
        if (mobileAuthContainer) {
            mobileAuthContainer.innerHTML = `
                <a href="login.html" class="w-full py-2 text-center border rounded-full">Log in</a>
                <a href="signup.html" class="w-full py-2 text-center gradient-bg text-white rounded-full">Sign up</a>
            `;
        }
    }
}

function showModal(user) {
    // Get full user data from storage
    const users = JSON.parse(localStorage.getItem('sheDrivesUsers') || '[]');
    const fullUser = users.find(u => u.email === user.email);
    const joinDate = fullUser && fullUser.joined ? new Date(fullUser.joined).toLocaleDateString() : 'Recently';
    
    // Create modal element
    const modal = document.createElement('div');
    modal.id = 'userProfileModal';
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000;';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    
    modal.innerHTML = `
        <div style="background:white; border-radius:24px; max-width:350px; width:90%; overflow:hidden; animation:fadeIn 0.2s;">
            <div style="background:linear-gradient(135deg, #2A1E3D, #6A4E8F); padding:20px; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="width:50px; height:50px; background:rgba(255,255,255,0.2); border-radius:50%; display:flex; align-items:center; justify-content:center;">
                        <i class="fas fa-user-circle" style="font-size:28px; color:white;"></i>
                    </div>
                    <div>
                        <h3 style="color:white; font-weight:bold; margin:0;">${user.name || user.email.split('@')[0]}</h3>
                        <p style="color:rgba(255,255,255,0.8); margin:0; font-size:12px;">${user.email}</p>
                    </div>
                </div>
                <button onclick="document.getElementById('userProfileModal').remove()" style="background:none; border:none; color:white; font-size:24px; cursor:pointer;">&times;</button>
            </div>
            <div style="padding:20px;">
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
                    <i class="fas fa-calendar-alt" style="width:24px; color:#6A4E8F;"></i>
                    <span>Member since: ${joinDate}</span>
                </div>
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
                    <i class="fas fa-envelope" style="width:24px; color:#6A4E8F;"></i>
                    <span>${user.email}</span>
                </div>
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px;">
                    <i class="fas fa-shield-alt" style="width:24px; color:#6A4E8F;"></i>
                    <span>Account: Passenger</span>
                </div>
                <hr style="margin:16px 0; border-color:#eee;">
                <button id="modalLogoutBtn" style="width:100%; background:#ef4444; color:white; border:none; border-radius:12px; padding:10px; font-weight:bold; cursor:pointer;">Logout</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Attach logout
    document.getElementById('modalLogoutBtn').onclick = () => {
        localStorage.removeItem('loggedInUser');
        modal.remove();
        window.location.reload();
    };
}

// Add CSS animation dynamically (if not already in style.css)
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', updateNavbarAuth);
window.addEventListener('storage', updateNavbarAuth);