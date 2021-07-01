const expand = '<svg t="1623225416013" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3795" width="60" height="60"><path d="M511.29 230.03L867.8 544.02l56.4-64.04-413.02-363.76L99.74 480.04l56.52 63.92z" p-id="3796" fill="#ffffff"></path><path d="M99.74 817.1l56.52 63.93L511.29 567.1 867.8 881.09l56.4-64.04-413.02-363.76z" p-id="3797" fill="#ffffff"></path></svg>'
const banana_blank = '<svg t="1623403649443" class="icon" viewBox="0 0 1569 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4390" width="22" height="22"><path d="M1567.18075 443.120004a399.649612 399.649612 0 0 0-30.208063-114.661099C1517.325752 282.472122 1498.812294 239.094136 1518.603163 148.973715l3.490389-16.066587a28.786719 28.786719 0 0 0-12.594189-30.369988l-128.136881-81.916206-25.188379-16.084579a28.786719 28.786719 0 0 0-42.622335 14.573276l-10.039368 28.085043c-27.5273 77.058447-61.909437 145.822721-102.156867 204.367709C1115.463161 376.47875 1003.158976 456.991603 867.573531 491.013906c-126.517628 31.719365-271.08093 20.726437-418.037128-31.77334-86.755973-30.999698-172.720311-75.565136-255.482127-132.47288l-14.393359-9.859452a28.786719 28.786719 0 0 0-33.950336 0.971552l-134.559918 104.351855a28.786719 28.786719 0 0 0-7.286638 37.152858l10.327236 17.901741c14.285409 24.738586 30.28003 55.144558 45.75289 84.560986 18.585425 35.335697 37.782568 71.966796 54.730749 99.404137a693.148199 693.148199 0 0 0 151.723998 173.368012c57.303562 46.994318 123.099205 86.180239 195.551778 116.442277 115.506708 48.235745 244.687107 72.938348 378.851207 72.938348a1119.605442 1119.605442 0 0 0 118.38538-6.333078 832.170058 832.170058 0 0 0 238.120137-61.405669c115.614658-49.189305 211.870248-121.821794 278.313593-210.071078C1546.562263 652.11158 1578.155686 547.309933 1567.18075 443.120004z m-137.438589 268.418158C1369.362019 791.727165 1281.220685 858.026576 1174.96171 903.275699a774.902479 774.902479 0 0 1-221.657733 57.123645c-166.549158 17.703832-328.708342-3.904199-468.953636-62.485171C346.551918 840.394711 235.795018 748.133278 163.828222 631.097275c-15.904662-25.890055-34.670004-61.567594-52.823629-96.075673-14.951102-28.426885-30.38798-57.753354-44.619413-82.761815l98.090743-76.068904c85.928355 58.742897 175.311116 104.909597 265.68342 137.186705 98.342627 35.137788 196.10952 52.859612 289.036646 52.859612A668.787438 668.787438 0 0 0 881.571073 546.950099a601.066683 601.066683 0 0 0 200.409536-91.577748c63.186847-44.439497 119.320948-102.012934 166.837026-171.101059 42.046601-61.171777 77.958032-132.310955 106.816717-211.672339L1461.49751 140.3377c-22.255732 105.791191 2.500846 163.940362 22.435648 210.790746a341.842283 341.842283 0 0 1 25.908047 98.16271c9.499617 89.328786-18.225591 180.042933-80.099044 262.247006z" fill="#ffffff" p-id="4391"></path></svg>'
const banana_active = '<svg t="1623403649443" class="icon" viewBox="0 0 1569 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4390" width="22" height="22"><path d="M1567.18075 443.120004a399.649612 399.649612 0 0 0-30.208063-114.661099C1517.325752 282.472122 1498.812294 239.094136 1518.603163 148.973715l3.490389-16.066587a28.786719 28.786719 0 0 0-12.594189-30.369988l-128.136881-81.916206-25.188379-16.084579a28.786719 28.786719 0 0 0-42.622335 14.573276l-10.039368 28.085043c-27.5273 77.058447-61.909437 145.822721-102.156867 204.367709C1115.463161 376.47875 1003.158976 456.991603 867.573531 491.013906c-126.517628 31.719365-271.08093 20.726437-418.037128-31.77334-86.755973-30.999698-172.720311-75.565136-255.482127-132.47288l-14.393359-9.859452a28.786719 28.786719 0 0 0-33.950336 0.971552l-134.559918 104.351855a28.786719 28.786719 0 0 0-7.286638 37.152858l10.327236 17.901741c14.285409 24.738586 30.28003 55.144558 45.75289 84.560986 18.585425 35.335697 37.782568 71.966796 54.730749 99.404137a693.148199 693.148199 0 0 0 151.723998 173.368012c57.303562 46.994318 123.099205 86.180239 195.551778 116.442277 115.506708 48.235745 244.687107 72.938348 378.851207 72.938348a1119.605442 1119.605442 0 0 0 118.38538-6.333078 832.170058 832.170058 0 0 0 238.120137-61.405669c115.614658-49.189305 211.870248-121.821794 278.313593-210.071078C1546.562263 652.11158 1578.155686 547.309933 1567.18075 443.120004z m-137.438589 268.418158C1369.362019 791.727165 1281.220685 858.026576 1174.96171 903.275699a774.902479 774.902479 0 0 1-221.657733 57.123645c-166.549158 17.703832-328.708342-3.904199-468.953636-62.485171C346.551918 840.394711 235.795018 748.133278 163.828222 631.097275c-15.904662-25.890055-34.670004-61.567594-52.823629-96.075673-14.951102-28.426885-30.38798-57.753354-44.619413-82.761815l98.090743-76.068904c85.928355 58.742897 175.311116 104.909597 265.68342 137.186705 98.342627 35.137788 196.10952 52.859612 289.036646 52.859612A668.787438 668.787438 0 0 0 881.571073 546.950099a601.066683 601.066683 0 0 0 200.409536-91.577748c63.186847-44.439497 119.320948-102.012934 166.837026-171.101059 42.046601-61.171777 77.958032-132.310955 106.816717-211.672339L1461.49751 140.3377c-22.255732 105.791191 2.500846 163.940362 22.435648 210.790746a341.842283 341.842283 0 0 1 25.908047 98.16271c9.499617 89.328786-18.225591 180.042933-80.099044 262.247006z" fill="#CCFF66" p-id="4391"></path></svg>'
const like_blank = '<svg t="1623404172716" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5355" width="20" height="20"><path d="M855.466667 362.666667H661.333333V164.266667C661.333333 108.8 616.533333 64 561.066667 64 512 64 469.333333 96 460.8 142.933333 435.2 281.6 354.133333 405.333333 256 405.333333H149.333333c-46.933333 0-85.333333 40.533333-85.333333 87.466667V853.333333c0 46.933333 38.4 85.333333 85.333333 85.333334h588.8c57.6 0 108.8-38.4 123.733334-93.866667l96-347.733333c19.2-68.266667-32-134.4-102.4-134.4zM256 454.4V896H149.333333c-23.466667 0-42.666667-19.2-42.666666-42.666667V492.8C106.666667 469.333333 125.866667 448 149.333333 448h106.666667v6.4z m661.333333 29.866667L821.333333 832c-10.666667 38.4-44.8 64-83.2 64H298.666667V443.733333c81.066667-23.466667 170.666667-117.333333 204.8-290.133333 4.266667-27.733333 27.733333-46.933333 57.6-46.933333C593.066667 106.666667 618.666667 132.266667 618.666667 164.266667v196.266666c0 23.466667 21.333333 44.8 44.8 44.8h192c19.2 0 38.4 8.533333 51.2 25.6 12.8 14.933333 14.933333 34.133333 10.666666 53.333334z" p-id="5356" fill="#ffffff"></path></svg>'
const like_active = '<svg t="1623404172716" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5355" width="20" height="20"><path d="M855.466667 362.666667H661.333333V164.266667C661.333333 108.8 616.533333 64 561.066667 64 512 64 469.333333 96 460.8 142.933333 435.2 281.6 354.133333 405.333333 256 405.333333H149.333333c-46.933333 0-85.333333 40.533333-85.333333 87.466667V853.333333c0 46.933333 38.4 85.333333 85.333333 85.333334h588.8c57.6 0 108.8-38.4 123.733334-93.866667l96-347.733333c19.2-68.266667-32-134.4-102.4-134.4zM256 454.4V896H149.333333c-23.466667 0-42.666667-19.2-42.666666-42.666667V492.8C106.666667 469.333333 125.866667 448 149.333333 448h106.666667v6.4z m661.333333 29.866667L821.333333 832c-10.666667 38.4-44.8 64-83.2 64H298.666667V443.733333c81.066667-23.466667 170.666667-117.333333 204.8-290.133333 4.266667-27.733333 27.733333-46.933333 57.6-46.933333C593.066667 106.666667 618.666667 132.266667 618.666667 164.266667v196.266666c0 23.466667 21.333333 44.8 44.8 44.8h192c19.2 0 38.4 8.533333 51.2 25.6 12.8 14.933333 14.933333 34.133333 10.666666 53.333334z" p-id="5356" fill="#339999"></path></svg>'
const favorite_blank = '<svg t="1623411746327" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2486" width="18" height="18"><path d="M773.458 1005.43c-14.403 0-30.592-4.132-45.599-11.638L513.567 886.61 297.948 993.618c-13.655 7.27-29.286 11.09-45.225 11.09a96.164 96.164 0 0 1-57.549-18.842c-30.177-22.64-45.64-61.85-38.502-97.561l44.099-228.772L31.744 501.996a104.059 104.059 0 0 1-26.281-100.66l0.338-1.162c12.288-36.828 42.772-62.633 79.734-67.584l234.839-42.7L425.779 75.811c16.932-33.895 51.37-55.675 87.788-55.675 37.99 0 73.318 22.6 88.13 56.29l105.068 213.4L941.64 330.89a95.672 95.672 0 0 1 78.264 68.373 98.97 98.97 0 0 1-24.474 101.002l-0.578 0.579-168.55 158.72L868.9 888.745c6.86 36.649-7.716 73.672-38.062 96.742a90.409 90.409 0 0 1-57.38 19.943z m-259.81-196.055l227.667 113.853c6.686 3.37 14.392 5.489 19.665 5.489 8.116 0 15.652-2.499 21.187-7.117l1.03-0.85c12.937-9.707 19.245-25.134 16.414-40.238l-45.814-246.804 181.212-170.65c11.126-11.28 14.93-27.433 9.995-42.286l-0.497-1.562a37.31 37.31 0 0 0-30.971-27.003l-1.034-0.163L661.76 348.21 548.91 118.99c-5.478-12.805-20.347-22.098-35.359-22.098-14.75 0-28.861 9.236-36.009 23.496L365.414 348.109l-252.062 45.788c-15.31 1.92-27.203 12.088-32.697 27.945-3.901 14.49 0.722 31.949 11.372 42.834l181.422 169.057-47.61 246.933c-2.863 14.28 3.9 30.714 16.409 40.1 6.272 4.715 14.397 7.316 22.917 7.316 6.569 0 12.866-1.531 18.294-4.45l0.783-0.46 229.407-113.797z" fill="#ffffff" p-id="2487"></path></svg>'
const favorite_active = '<svg t="1623411746327" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2486" width="18" height="18"><path d="M773.458 1005.43c-14.403 0-30.592-4.132-45.599-11.638L513.567 886.61 297.948 993.618c-13.655 7.27-29.286 11.09-45.225 11.09a96.164 96.164 0 0 1-57.549-18.842c-30.177-22.64-45.64-61.85-38.502-97.561l44.099-228.772L31.744 501.996a104.059 104.059 0 0 1-26.281-100.66l0.338-1.162c12.288-36.828 42.772-62.633 79.734-67.584l234.839-42.7L425.779 75.811c16.932-33.895 51.37-55.675 87.788-55.675 37.99 0 73.318 22.6 88.13 56.29l105.068 213.4L941.64 330.89a95.672 95.672 0 0 1 78.264 68.373 98.97 98.97 0 0 1-24.474 101.002l-0.578 0.579-168.55 158.72L868.9 888.745c6.86 36.649-7.716 73.672-38.062 96.742a90.409 90.409 0 0 1-57.38 19.943z m-259.81-196.055l227.667 113.853c6.686 3.37 14.392 5.489 19.665 5.489 8.116 0 15.652-2.499 21.187-7.117l1.03-0.85c12.937-9.707 19.245-25.134 16.414-40.238l-45.814-246.804 181.212-170.65c11.126-11.28 14.93-27.433 9.995-42.286l-0.497-1.562a37.31 37.31 0 0 0-30.971-27.003l-1.034-0.163L661.76 348.21 548.91 118.99c-5.478-12.805-20.347-22.098-35.359-22.098-14.75 0-28.861 9.236-36.009 23.496L365.414 348.109l-252.062 45.788c-15.31 1.92-27.203 12.088-32.697 27.945-3.901 14.49 0.722 31.949 11.372 42.834l181.422 169.057-47.61 246.933c-2.863 14.28 3.9 30.714 16.409 40.1 6.272 4.715 14.397 7.316 22.917 7.316 6.569 0 12.866-1.531 18.294-4.45l0.783-0.46 229.407-113.797z" fill="#339999" p-id="2487"></path></svg>'
const cancelFavorite = '<svg t="1623414122862" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5854" width="20" height="20"><path d="M749.77 699.98l-11.59-71.05L918.9 443.7c8.38-8.58 11.25-21.13 7.44-32.51s-13.66-19.66-25.51-21.47l-248.46-37.96-111.4-237.36C535.7 103.17 524.41 96 512 96s-23.7 7.17-28.97 18.4l-111.4 237.36-248.46 37.96c-11.86 1.81-21.7 10.1-25.51 21.47s-0.94 23.92 7.44 32.51l180.72 185.23-42.73 261.93a32.003 32.003 0 0 0 13.15 31.31c5.5 3.88 11.96 5.84 18.43 5.84 5.31 0 10.65-1.32 15.48-3.99L512 801.37l78.67 43.48c15.47 8.55 34.94 2.94 43.49-12.53 8.55-15.47 2.94-34.94-12.53-43.49l-94.15-52.04a31.971 31.971 0 0 0-30.96 0L316.87 836.1l34.72-212.83a32.001 32.001 0 0 0-8.68-27.5L194.39 443.58l203.78-31.13a31.985 31.985 0 0 0 24.13-18.04l89.7-191.1 89.69 191.09a32.024 32.024 0 0 0 24.13 18.04l203.78 31.13-148.5 152.22a32.031 32.031 0 0 0-8.68 27.5l14.19 86.99c2.85 17.44 19.3 29.27 36.73 26.43 17.45-2.84 29.28-19.29 26.43-36.73zM877.25 832l41.37-41.37c12.5-12.5 12.5-32.76 0-45.25-12.5-12.5-32.76-12.5-45.25 0L832 786.75l-41.37-41.37c-12.5-12.5-32.76-12.5-45.25 0-12.5 12.5-12.5 32.76 0 45.25L786.75 832l-41.37 41.37c-12.5 12.5-12.5 32.76 0 45.25 6.25 6.25 14.44 9.37 22.63 9.37s16.38-3.12 22.63-9.37L832 877.25l41.37 41.37c6.25 6.25 14.44 9.37 22.63 9.37s16.38-3.12 22.63-9.37c12.5-12.5 12.5-32.76 0-45.25L877.25 832z" p-id="5855" fill="#339999"></path></svg>'
const loopList = '<svg t="1623581529622" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="901" width="18" height="18"><path d="M361.5 727.8c-119.1 0-215.9-96.9-215.9-215.9 0-119.1 96.9-215.9 215.9-215.9 2.3 0 4.6-0.2 6.8-0.6v58.3c0 12.3 14 19.4 23.9 12.1l132.6-97.6c8.1-6 8.1-18.2 0-24.2l-132.6-97.6c-9.9-7.3-23.9-0.2-23.9 12.1v58.1c-2.2-0.4-4.5-0.6-6.8-0.6-39.8 0-78.5 7.9-115 23.4-35.2 15-66.8 36.3-94 63.5s-48.6 58.8-63.5 94c-15.5 36.5-23.4 75.2-23.4 115s7.9 78.5 23.4 115c15 35.2 36.3 66.8 63.5 94s58.8 48.6 94 63.5c36.5 15.5 75.2 23.4 115 23.4 22.1 0 40-17.9 40-40s-17.9-40-40-40zM938.2 396.9c-15-35.2-36.3-66.8-63.5-94s-58.8-48.6-94-63.5c-36.5-15.5-75.2-23.4-115-23.4-22.1 0-40 17.9-40 40s17.9 40 40 40c119.1 0 215.9 96.9 215.9 215.9 0 119.1-96.9 215.9-215.9 215.9-4.1 0-8.1 0.6-11.8 1.8v-60.8c0-12.3-14-19.4-23.9-12.1l-132.6 97.6c-8.1 6-8.1 18.2 0 24.2L629.9 876c9.9 7.3 23.9 0.2 23.9-12.1V806c3.7 1.2 7.7 1.8 11.8 1.8 39.8 0 78.5-7.9 115-23.4 35.2-15 66.8-36.3 94-63.5s48.6-58.8 63.5-94c15.5-36.5 23.4-75.2 23.4-115s-7.8-78.5-23.3-115z" p-id="902" fill="#ffffff"></path></svg>'
const loopSingle = '<svg t="1623581634186" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1150" width="18" height="18"><path d="M361.5 727.8c-119.1 0-215.9-96.9-215.9-215.9 0-119.1 96.9-215.9 215.9-215.9 2.3 0 4.6-0.2 6.8-0.6v58.3c0 12.3 14 19.4 23.9 12.1l132.6-97.6c8.1-6 8.1-18.2 0-24.2l-132.6-97.6c-9.9-7.3-23.9-0.2-23.9 12.1v58.1c-2.2-0.4-4.5-0.6-6.8-0.6-39.8 0-78.5 7.9-115 23.4-35.2 15-66.8 36.3-94 63.5s-48.6 58.8-63.5 94c-15.5 36.5-23.4 75.2-23.4 115s7.9 78.5 23.4 115c15 35.2 36.3 66.8 63.5 94s58.8 48.6 94 63.5c36.5 15.5 75.2 23.4 115 23.4 22.1 0 40-17.9 40-40s-17.9-40-40-40zM938.2 396.9c-15-35.2-36.3-66.8-63.5-94s-58.8-48.6-94-63.5c-36.5-15.5-75.2-23.4-115-23.4-22.1 0-40 17.9-40 40s17.9 40 40 40c119.1 0 215.9 96.9 215.9 215.9 0 119.1-96.9 215.9-215.9 215.9-4.1 0-8.1 0.6-11.8 1.8v-60.8c0-12.3-14-19.4-23.9-12.1l-132.6 97.6c-8.1 6-8.1 18.2 0 24.2L629.9 876c9.9 7.3 23.9 0.2 23.9-12.1V806c3.7 1.2 7.7 1.8 11.8 1.8 39.8 0 78.5-7.9 115-23.4 35.2-15 66.8-36.3 94-63.5s48.6-58.8 63.5-94c15.5-36.5 23.4-75.2 23.4-115s-7.8-78.5-23.3-115z" p-id="1151" fill="#ffffff"></path><path d="M512.8 660.6c22.1-0.1 39.9-18.1 39.8-40.2l-1.2-214.1c-0.1-22-18-39.8-40-39.8h-0.2c-22.1 0.1-39.9 18.1-39.8 40.2l1.2 214.1c0.1 22 18 39.8 40 39.8h0.2z" p-id="1152" fill="#ffffff"></path></svg>'
const loopRandom = '<svg t="1623581665952" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1400" width="18" height="18"><path d="M914.2 705L796.4 596.8c-8.7-8-22.7-1.8-22.7 10V688c-69.5-1.8-134-39.7-169.3-99.8l-45.1-77 47-80.2c34.9-59.6 98.6-97.4 167.4-99.8v60.1c0 11.8 14 17.9 22.7 10l117.8-108.1c5.8-5.4 5.8-14.6 0-19.9L796.4 165c-8.7-8-22.7-1.8-22.7 10v76H758c-4.7 0-9.3 0.8-13.5 2.3-36.5 4.7-72 16.6-104.1 35-42.6 24.4-78.3 59.8-103.1 102.2L513 432l-24.3-41.5c-24.8-42.4-60.5-77.7-103.1-102.2C343 263.9 294.5 251 245.3 251H105c-22.1 0-40 17.9-40 40s17.9 40 40 40h140.3c71.4 0 138.3 38.3 174.4 99.9l47 80.2-45.1 77c-36.2 61.7-103 99.9-174.4 99.9H105c-22.1 0-40 17.9-40 40s17.9 40 40 40l142 0.1h0.2c49.1 0 97.6-12.9 140.2-37.3 42.7-24.4 78.3-59.8 103.2-102.2l22.4-38.3 22.4 38.3c24.8 42.4 60.5 77.8 103.2 102.2 33.1 18.9 69.6 30.9 107.3 35.4 3.8 1.2 7.8 1.8 11.9 1.8l15.9 0.1v55c0 11.8 14 17.9 22.7 10L914.2 725c5.9-5.5 5.9-14.7 0-20z" p-id="1401" fill="#ffffff"></path></svg>'
const minify = '<svg t="1623585529756" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1630" width="28" height="28"><path d="M106.9 937.1c-5.1 0-10.2-2-14.1-5.9-7.8-7.8-7.8-20.5 0-28.3l316.3-316.3c7.8-7.8 20.5-7.8 28.3 0s7.8 20.5 0 28.3L121 931.3c-3.9 3.9-9 5.8-14.1 5.8z" p-id="1631" fill="#339999"></path><path d="M438.4 920.7c-11 0-20-9-20-20V605.6H123.3c-11 0-20-9-20-20s9-20 20-20h315.1c11 0 20 9 20 20v315.1c0 11.1-9 20-20 20z" p-id="1632" fill="#339999"></path><path d="M600.8 443.2c-5.1 0-10.2-2-14.1-5.9-7.8-7.8-7.8-20.5 0-28.3L903 92.7c7.8-7.8 20.5-7.8 28.3 0s7.8 20.5 0 28.3L614.9 437.3c-3.9 3.9-9 5.9-14.1 5.9z" p-id="1633" fill="#339999"></path><path d="M900.7 458.4H585.6c-11 0-20-9-20-20V123.3c0-11 9-20 20-20s20 9 20 20v295.1h295.1c11 0 20 9 20 20s-8.9 20-20 20z" p-id="1634" fill="#339999"></path></svg>'
const volume = '<svg t="1623612609482" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1046" width="20" height="20"><path d="M512 261.168v501.68L295.984 590.032 278.448 576H192v-128H278.448l17.536-14.032L512 261.168M576 128L256 384h-64a64 64 0 0 0-64 64v128a64 64 0 0 0 64 64h64l320 256V128zM693.024 330.976l-45.312 45.312C682.464 411.072 704 459.072 704 512s-21.536 100.928-56.304 135.696l45.312 45.312C739.344 646.688 768 582.688 768 512s-28.656-134.688-74.976-181.024z" p-id="1047" fill="#ffffff"></path><path d="M738.16 285.84C796.112 343.776 832 423.776 832 512c0 88.224-35.888 168.224-93.84 226.16l45.36 45.36A382.736 382.736 0 0 0 896 512a382.848 382.848 0 0 0-112.464-271.536l-45.376 45.376z" p-id="1048" fill="#ffffff"></path></svg>'
const mute = '<svg t="1623612642467" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1330" width="20" height="20"><path d="M512 261.168v501.68L295.984 590.032 278.448 576H192v-128H278.448l17.536-14.032L512 261.168M576 128L256 384h-64a64 64 0 0 0-64 64v128a64 64 0 0 0 64 64h64l320 256V128zM818.736 512l67.888-67.888a32 32 0 1 0-45.248-45.248l-67.888 67.888-67.888-67.888a32 32 0 1 0-45.248 45.248L728.24 512l-67.888 67.888a32 32 0 1 0 45.248 45.248l67.888-67.888 67.888 67.888c6.256 6.256 14.432 9.376 22.624 9.376s16.368-3.12 22.624-9.376a32 32 0 0 0 0-45.248L818.736 512z" p-id="1331" fill="#ffffff"></path></svg>'
const anlisi = 'data:image/png;base64,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'
export { expand, banana_active, banana_blank, like_active, like_blank, favorite_active, favorite_blank, cancelFavorite, loopList, loopSingle, loopRandom, minify, volume, mute, anlisi}