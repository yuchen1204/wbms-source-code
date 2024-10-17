class AnnouncementManager {
    constructor() {
        this.announcements = [];
        this.currentAnnouncement = null;
    }

    addAnnouncement(title, content, publishTime, expiryTime, author, priority = 1) {
        const announcement = { title, content, publishTime, expiryTime, author, priority };
        this.announcements.push(announcement);
        this.announcements.sort((a, b) => a.priority - b.priority); // 按优先级排序
        this.showAnnouncement();
    }

    showAnnouncement() {
        if (this.currentAnnouncement || sessionStorage.getItem('dontShowAgain') === 'true') {
            return;
        }

        const announcement = this.announcements[0]; // 获取优先级最高的公告
        if (!announcement) {
            return; // 没有公告
        }

        this.currentAnnouncement = announcement;

        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = 999;

        const announcementDiv = document.createElement('div');
        announcementDiv.id = 'announcement';
        announcementDiv.style.position = 'fixed';
        announcementDiv.style.top = '20%';
        announcementDiv.style.left = '50%';
        announcementDiv.style.transform = 'translate(-50%, -20%)';
        announcementDiv.style.padding = '20px';
        announcementDiv.style.backgroundColor = '#ffffff'; // 背景色为白色
        announcementDiv.style.border = '1px solid #ccc'; // 边框颜色
        announcementDiv.style.borderRadius = '8px'; // 圆角效果
        announcementDiv.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        announcementDiv.style.zIndex = 1000;
        announcementDiv.style.maxWidth = '90%'; // 最大宽度为90%
        announcementDiv.style.boxSizing = 'border-box'; // 包含边框和内边距在宽度计算中

        announcementDiv.innerHTML = `
            <h3 style="color: #007bff; text-align: center; ">${announcement.title}</h3>
            <p>${announcement.content}</p>
            <p><small>发布者: ${announcement.author}</small></p>
            <p><small>发布时间: ${announcement.publishTime}</small></p>
            <p><small>过期时间: ${announcement.expiryTime}</small></p>
            <label>
                <input type="checkbox" id="dont-show-again"> 本周不再弹出
            </label>
            <br>
            <button id="close-button" style="margin-top:10px; padding: 5px 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">关闭</button>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(announcementDiv);

        setTimeout(() => this.closeAnnouncement(), 5000); // 5秒后自动关闭

        document.getElementById('close-button').addEventListener('click', () => {
            if (document.getElementById('dont-show-again').checked) {
                sessionStorage.setItem('dontShowAgain', 'true');
            }
            this.closeAnnouncement();
        });
    }

    closeAnnouncement() {
        const overlay = document.getElementById('overlay');
        const announcementDiv = document.getElementById('announcement');
        if (overlay) overlay.remove();
        if (announcementDiv) announcementDiv.remove();
        this.currentAnnouncement = null; // 重置当前公告
    }
}

const announcementManager = new AnnouncementManager();