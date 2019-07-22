var $resume = (function() {
	var $container,data = ['info', 'title', 'contact', 'skills'];
	var fileSlogan = function() {
		wss.data.slogan[0] = '<strong>' + wss.data.slogan[0] + '</strong>';
		$container.find('#wss-resume-slogan').html(wss.data.slogan.join('<br>'));
	};
	var fileInfo = function() {
			console.log('~_~带小老弟走吧。');
			console.log("\n          _____                    _____                    _____                    _____          \n         /\\    \\                  /\\    \\                  /\\    \\                  /\\    \\         \n        /::\\____\\                /::\\    \\                /::\\    \\                /::\\    \\        \n       /:::/    /                \\:::\\    \\              /::::\\    \\              /::::\\    \\       \n      /:::/    /                  \\:::\\    \\            /::::::\\    \\            /::::::\\    \\      \n     /:::/    /                    \\:::\\    \\          /:::/\\:::\\    \\          /:::/\\:::\\    \\     \n    /:::/____/                      \\:::\\    \\        /:::/__\\:::\\    \\        /:::/__\\:::\\    \\    \n   /::::\\    \\                      /::::\\    \\      /::::\\   \\:::\\    \\      /::::\\   \\:::\\    \\   \n  /::::::\\    \\   _____    ____    /::::::\\    \\    /::::::\\   \\:::\\    \\    /::::::\\   \\:::\\    \\  \n /:::/\\:::\\    \\ /\\    \\  /\\   \\  /:::/\\:::\\    \\  /:::/\\:::\\   \\:::\\____\\  /:::/\\:::\\   \\:::\\    \\ \n/:::/  \\:::\\    /::\\____\\/::\\   \\/:::/  \\:::\\____\\/:::/  \\:::\\   \\:::|    |/:::/__\\:::\\   \\:::\\____\\\n\\::/    \\:::\\  /:::/    /\\:::\\  /:::/    \\::/    /\\::/   |::::\\  /:::|____|\\:::\\   \\:::\\   \\::/    /\n \\/____/ \\:::\\/:::/    /  \\:::\\/:::/    / \\/____/  \\/____|:::::\\/:::/    /  \\:::\\   \\:::\\   \\/____/ \n          \\::::::/    /    \\::::::/    /                 |:::::::::/    /    \\:::\\   \\:::\\    \\     \n           \\::::/    /      \\::::/____/                  |::|\\::::/    /      \\:::\\   \\:::\\____\\    \n           /:::/    /        \\:::\\    \\                  |::| \\::/____/        \\:::\\   \\::/    /    \n          /:::/    /          \\:::\\    \\                 |::|  ~|               \\:::\\   \\/____/     \n         /:::/    /            \\:::\\    \\                |::|   |                \\:::\\    \\         \n        /:::/    /              \\:::\\____\\               \\::|   |                 \\:::\\____\\        \n        \\::/    /                \\::/    /                \\:|   |                  \\::/    /        \n         \\/____/                  \\/____/                  \\|___|                   \\/____/         \n    ")
			wss.data.info[0] = '<span class="wd-resume-title">'+wss.data.info[0] + '</span>';
			$container.find('#wss-resume-info').html(wss.data.info.join('<br>'));
	};
	var fileContact = function() {
			wss.data.contact[0] = '<span class="wd-resume-title">'+wss.data.contact[0] + '</span>';
			$container.find('#wss-resume-contact').html(wss.data.contact.join('<br>'));
	}
	var fileSkills = function() {
			wss.data.skills[0] = '<span class="wd-resume-title">'+wss.data.skills[0] + '</span>';
			$container.find('#wss-resume-skills').html(wss.data.skills.join('<br>'));
	}
	var show = function(container) {
		$container = container;
		fileSlogan();
		fileInfo();
		fileContact();
		fileSkills();
		$timeline.show($container.find('#wss-resume-timeline'));
	};
	return { show: show };
}());
