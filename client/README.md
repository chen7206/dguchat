#DGU Chat 컴파일 방법


**DGU Chat의 웹 소스는 WebRTC기반으로 구현되었기 때문에, WebRTC를 지원하는 웹브라우저에서만 정상적으로 작동합니다.**
** 따라서 플렛폼과 웹브라우저의 종류에 구애받지 않고, 모든 사용자에게 동일한 사용경험을 제공하기 위해 자체적으로 WebRTC기반 미니 브라우저 프로그램 DGU Chat을 제작하였습니다. **

**소스코드는 www.github.com/rudebono/dguchat 의 /client/source 디렉토리 내에 첨부되어있습니다.**
**DGU Chat을 사용하기를 원하시는 분은 소스코드를 다운받으시고 다음과 같은 절차를 따르시면 됩니다.**

 1. www.qt.io/download 에 접속합니다.
 2. Desktop & Mobile Applications를 선택합니다.


 3.Open Source를 선택합니다.













 












 4. Download Now를 선택하여 Qt Online Installers를 다운로드합니다.


 5. 다운받은 Qt Online Installers를 실행합니다.





 6. Sign-up을 통해 가입을 하시고, Login을 해주고 Next를 누릅니다.













7. Qt를 설치할 경로를 지정해줍니다.














8. 설치할 Qt 버전과 필요한 Tools를 선택합니다.














9. 라이센스 동의를 해줍니다. 














10. 설치가 완료되고 Qt Creator를 실행합니다.


11. Open Project를 눌러 다운받은 소스코드 디렉토리의 qt_dguchat.pro를 선택합니다.


































12. 프로젝트가 로드되었습니다. 사용할 킷을 선택합니다.






















13. Ctrl + R을 눌러 프로젝트를 Run해줍니다.






















14. DGU Chat이 실행되었습니다.





>>고급사용자를 위한 안내

 DGU Chat은 WebRTC기능을 구현하기 위하여 Qt의 WebEngine 모듈을 이용해 제작하였습니다. DGU Chat을 .exe 실행 파일로 배포하지 않은 이유는 다음과 같습니다.
 - 정적링킹 실행파일을 제작하려면 -static 옵션으로 빌드된 Qt버전이 설치되어 있어야합니다.
 - 오픈소스 라이센스로 정적빌드된 Qt버전으로 DGU Chat의 정적링킹 실행파일을 제작하려고 하였지만, Qt 정책상 WebEngine 모듈이 포함된 소스코드는 다음과 같이 정적링킹을 지원하지 않습니다.


 - 따라서 WebEngine 모듈이 포함된 Qt 프로젝트를 정적링킹하기 위해서는 커머셜 라이센스 Qt버전이 필요합니다.
 - 커머셜 라이센스의 한달 이용료는 1년 이용권으로 월간 295달러, 1달 이용권으로 월간 350달러이기에, 대학교 팀프로젝트의 지출비용으로 적합지 않아 부득이하게 소스코드만을 배포합니다.
 - Danamic Linking !

 - 정적링킹을 지원하는 타 모듈을 사용한 Qt 프로젝트를 정적링킹 실행파일로 제작하고 싶은 고급사용자를 위해 Qt 소스코드를 –static 옵션으로 빌드하는 방법을 소개합니다.

 Qt버전 5.7.0을 기준으로 작성한 예시입니다.
Windows 환경에서 Microsoft Visual Studio 2015의 MSVC14 컴파일러를 이용해 빌드하는 방법입니다.

 1. 윈도우 키 + R을 눌러 실행창을 띄우고 gpedit.msc을 실행합니다.
‘로컬 컴퓨터 정책’ - ‘컴퓨터 구성’ - ‘관리 템플릿’ - ‘시스템’ - ‘파일 시스템’ - ‘Win32 긴 경로 사용’
‘사용‘으로 설정합니다.
 이는 앞으로의 작업에서 윈도우의 기본 명령어 길이 260자임에서 비롯한 명령어의 잘못된 인식으로 인한 빌드 실패를 방지합니다.

 2. 빌드 전 선행으로 Microsoft Visual Studio 2015의 설치가 요구됩니다.
www.visualstudio.com에서 Microsoft Visual Studio 2015를 설치합니다.
Microsoft Visual Studio 2015를 실행하고 ‘도구’ – ‘옵션’ - ‘환경’ – ‘국가별 설정’ - ‘추가 언어 가져오기’를 눌러 영어 언어팩을 받아 설치한 후 언어를 ‘English’로 변경합니다.

 3. ‘제어판’ - ‘국가 또는 지역’ - ‘시스템 로캘 변경’
현재 시스템 로캘에서 ‘영어 (미국)’을 선택합니다.
 이는 차후 빌드작업에서 WebEngine을 빌드할 때의 오류를 방지합니다.

 4. https://www.python.org/downloads/에서 파이썬 2.7.13버전을 다운받아 설치합니다.
설치가 완료된 후 파이썬이 설치된 디렉토리를 시스템 환경 변수에 추가합니다.
 내 컴퓨터 – 우 클릭 – 속성 – 고급 시스템 설정 – 고급 탭 – 환경 변수 – 시스템 변수
시스템 변수 중 Path를 누르고 편집을 누릅니다.
 다음 예시와 같이 파이썬이 설치된 디렉토리를 추가합니다.






 










 환경 변수를 추가하고 재부팅을 하여줍니다.
재부팅 후 명령 프롬프트를 켜 python을 입력하여 다음과 같이 뜬다면 작업을 성공적으로 마친 것입니다.



 이는 차후 빌드작업에서 declarative를 빌드할 때의 오류를 방지합니다.


 5. C:\Qt\Static 디렉토리를 생성합니다.

 6. https://download.qt.io/archive/qt/5.7/5.7.0/single/에서 qt-everywhere-opensource-src-5.7.0.zip을 다운 받아 생성한 디렉토리에 압축을 풉니다.

 7. C:\Qt\Static\qt-everywhere-opensource-src-5.7.0\qtbase\mkspecs\common 디렉토리의 msvc-desktop.conf파일을 수정합니다. msvc dll파일들의 의존성을 없애는 작업입니다.
 수정 내용은 다음과 같습니다.
	QMAKE_CFLAGS_RELEASE = -O2 -MD
	QMAKE_CFLAGS_RELEASE_WITH_DEBUGINFO += -O2 -MD -Zi
	QMAKE_CFLAGS_DEBUG = -Zi –MDd
						(변경 전)
	QMAKE_CFLAGS_RELEASE = -O2 -MT
	QMAKE_CFLAGS_RELEASE_WITH_DEBUGINFO += -O2 -MT -Zi
	QMAKE_CFLAGS_DEBUG = -Zi –MTd
						(변경 후)

 8. qt-everywhere-opensource-src-5.7.0\qtwebengine\src\3rdparty\chromium
\third_party\ffmpeg 디렉토리로 이동합니다.
 - ffmpeg_generated.gni 파일을 에디트 플러스로 열고 ‘vorbiscomment.c’를 검색하여 바로 다음줄에 “libavformat/w64.c”, 추가합니다.
 - ffmpeg_generated.gypi 파일을 에디트 플러스 열고 ‘vorbiscomment.c’를 검색하여 바로 다음줄에 ‘libavformat/w64.c’, 추가합니다.
 (에디트 플러스 : https://www.editplus.com/kr/download.html)

 9. qt-everywhere-opensource-src-5.7.0 디렉토리의 이름을 짧은 이름으로 변경합니다.
예시) 570src 
 이는 1.번에서와 같은 이유로 빌드 실패를 방지합니다.

 10. Microsoft Visual Studio 2015가 설치된 폴더 내의 ‘개발자용 명령 프롬프트 VS2015’를 관리자 권한으로 실행합니다.

 11. 커멘드 창 내에서 C:\Qt\Static\570src으로 현재 디렉토리를 변경합니다.

 12. 다음과 같은 명령어를 입력합니다.
 configure -static -debug-and-release -prefix “C:\Qt\Static\5.7.0” -platform win32-msvc2015 -qt-zlib -qt-pcre -qt-libpng -qt-libjpeg -qt-freetype -opengl desktop -qt-sql-sqlite -qt-sql-odbc -no-openssl -opensource -confirm-license -make libs -nomake tools -nomake examples –nomake tests


 다음과 같이 커머셜 라이센스는 c, 오픈 소스 라이센스는 o를 선택해줍니다.
라이센스 준수를 위해 y를 입력합니다.

 13. configure 작업이 끝나면 다음과 같은 명령어를 입력합니다.
nmake
 이 작업은 수 시간걸리므로, 다른 작업을 하시는 것을 권장합니다.

 14. nmake 작업이 끝나면 다음과 같은 명령어를 입력합니다.
nmake install 

 15. nmake install 작업이 끝나고 Qt Creator를 실행합니다.
‘Tools’ - ‘Options’ - ‘Build & Run’ - ‘Qt Versions’
Add를 누르고 C:\Static\5.7.0\bin\qmake.exe를 선택합니다.
적절한 이름을 지정합니다. 예시) Qt 5.7.0. static





 16. ‘Tools’ - ‘Options’ - ‘Build & Run’ - ‘Kits’
Add를 누르고 방금 추가한 Qt Version을 선택합니다.
적절한 이름을 지정합니다. 예시) Qt 5.7.0. Static




11. 이제 새로 생성한 Qt 5.7.0 Static Kit으로 프로젝트를 정적 링킹하여 빌드할 수 있습니다.
