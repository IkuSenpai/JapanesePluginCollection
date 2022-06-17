//=============================================================================
// PANDA_AutoActorFace.js
//=============================================================================
// [Update History]
// 2021-06-01 Ver.1.0.0 First Release for MZ.
// 2021-06-01 Ver.1.1.0 Support "\N[\V[x]]" format.
// 2021-06-02 Ver.1.1.1 Bug fix.
// 2021-07-24 Ver.1.1.2 Bug fix.

/*:
 * @target MZ
 * @plugindesc automatically displays the face image in message.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210721010242.html
 * 
 * @help When you set the Name to "\N[x]" in "Show Text",
 * the face image of the xth actor will be displayed automatically.
 * It is also possible to describe x as "\N[\V[v]]" using a variable.
 * This means the actor whose id is the number stored in the varibale v.
 * 
 * If the face image is already set or the name format does not match,
 * it will be ignored.
 * Please note that the text input frame width is different from the width
 * when there is a face image, and the face image is not displayed in "Preview".
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 「文章の表示」で顔グラフィックを自動的に表示します。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210721010242.html
 * 
 * @help 「文章の表示」で、名前欄を「\N[x]」と設定すると、
 * x番のアクターの顔グラが自動的に設定されます。
 * xのところは変数を用いて「\N[\V[v]]」のように記述することも可能です。
 * この場合、v番の変数に格納されている番号のアクターになります。
 * 
 * 既に顔グラが設定されていたり、名前欄の形式が合わない場合は無視されます。
 * 「文章」の入力欄の枠幅が本来の顔グラありの場合の枠幅と異なるのと、
 * 「プレビュー」では顔グラが表示されないのに、ご注意ください。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 */

/*:ko
 * @target MZ
 * @plugindesc "텍스트 표시"에서 얼굴 이미지를 자동적으로 표시합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210721010242.html
 * 
 * @help "텍스트 표시"에서 이름란을 "\N[x]"로 설정하면
 * x번 액터의 얼굴 이미지가 자동적으로 설정됩니다.
 * x는 변수를 사용하여 "\N[\V[v]]"와 같이 기술할 수도 있습니다.
 * 이 경우 v번 변수에 저장되어 있는 번호의 액터를 뜻합니다.
 * 
 * 이미 얼굴 이미지가 설정되어 있거나
 * 이름란의 형식이 맞지 않는 경우에는 무시됩니다.
 * 텍스트 입력란 폭이 본래 얼굴 이미지가 있을 경우의 폭과 다른 점과
 * 프리뷰에서는 얼굴 이미지가 표시되지 않는 점에 주의하십시오.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 */

(() => {
	'use strict';
	
	//--------------------------------------------------
	// Game_Interpreter.command101
	//  [Added Definition]
	//--------------------------------------------------
	const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
	Game_Interpreter.prototype.command101 = function(params) {
		
		// copy params
		const new_params = params.clone();
		
		// no face image
		if (params[0] === '') {
			// speaker name
			if (params[4] != '') {
				// convert variable
				const name = params[4].replace(/\\V\[(\d+)\]/gi, (_, p1) =>
					$gameVariables.value(parseInt(p1))
				);
				// parse actor name
				const arr = name.match(/\\N\[(\d+)\]/);
				if (arr) {
					// get actor
					const actor_id = Number(arr[1]);
					const actor = $gameActors.actor(actor_id);
					// face image
					new_params[0] = actor.faceName();
					new_params[1] = actor.faceIndex();
				}
			}
		}
		
		// Original Processing
		return _Game_Interpreter_command101.call(this, new_params);
		
	};
	
})();

