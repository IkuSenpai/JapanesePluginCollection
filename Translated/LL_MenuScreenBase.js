//=============================================================================
// RPGツクールMZ - LL_MenuScreenBase.js v1.1.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc メニュー画面立ち絵設定の共通ベースプラグインです。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-menuscreen/
 *
 * @help LL_MenuScreenBase.js
 *
 * メニュー画面立ち絵設定の共通ベースプラグインです。
 * このプラグインでアクター毎の立ち絵リストを定義します。
 *
 * 下記のようにステート、スイッチ、変数条件で表示する立ち絵を複数定義できます。
 *   ・スイッチ1がONかつ毒状態の立ち絵
 *   ・変数1が10以上かつ毒状態の立ち絵
 *   ・スイッチ1がONの時の立ち絵
 *   ・毒状態の立ち絵
 *   ・スイッチ・ステート・変数条件なしの通常立ち絵 (最低限必要)
 *
 * 残りHP％で立ち絵を切り替える:
 *   まず「残りHP％」を「100」に設定した立ち絵リストを作成します。
 *   上記をコピーして「残りHP％」を「50」に変更し、立ち絵リストを複製します。
 *   これでHPが半分以下になった場合、「50」に設定した立ち絵が呼ばれます。
 *   残りHP％毎に、複数立ち絵を定義することも可能です。
 *
 * 画像ファイルの表示優先順:
 *   1. ステートID、スイッチID、変数条件全てに一致するもの
 *   2. ステートID、スイッチID両方に一致するもの
 *   3. ステートID、変数条件両方に一致するもの
 *   4. ステートIDのみ一致するもの
 *   5. スイッチID、変数条件両方に一致するもの
 *   6. スイッチIDのみ一致するもの
 *   7. 変数条件のみ一致するもの
 *   8. 条件なし (ステートID、スイッチID、変数条件全て設定なし)
 *   (上記の中で、残りHP％が最も低いものが優先して表示されます)
 *
 * 戦闘中立ち絵プラグイン連携:
 *   LL_StandingPictureBattle が導入されている場合は、
 *   戦闘中の立ち絵リストとそのまま連携させることも可能です。
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   ・著作権表記は必要ございません。
 *   ・利用するにあたり報告の必要は特にございません。
 *   ・商用・非商用問いません。
 *   ・R18作品にも使用制限はありません。
 *   ・ゲームに合わせて自由に改変していただいて問題ございません。
 *   ・プラグイン素材としての再配布（改変後含む）は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/3/7
 *
 * @param menuPictures
 * @text 立ち絵リスト
 * @desc メニュー画面に表示する立ち絵を定義します。
 * 特定ステート時、スイッチON時の立ち絵を複数定義できます。
 * @default []
 * @type struct<menuPictures>[]
 *
 * @param onSpbPlugin
 * @text 戦闘中立ち絵プラグイン連携
 * @desc ※この項目は使用しません
 *
 * @param onSpbPluginEnable
 * @text 立ち絵リストを連携
 * @desc LL_StandingPictureBattle の立ち絵リストと連携させます。
 * ONにするとこのプラグインの立ち絵リスト設定は無視されます。
 * @default false
 * @type boolean
 * @parent onSpbPlugin
 */

/*~struct~menuPictures:
 *
 * @param actorId
 * @text アクターID
 * @desc アクターIDです。立ち絵を定義するアクターを選択してください。
 * @type actor
 *
 * @param stateId
 * @text ステートID
 * @desc 特定ステートで立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は空白(なし)で設定ください。
 * @type state
 *
 * @param switchId
 * @text スイッチID
 * @desc スイッチONで立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は空白(なし)で設定ください。
 * @type switch
 *
 * @param variableCase
 * @text 変数条件
 * @desc 変数条件で立ち絵を変更したい場合に使用します。
 * @default
 * @type struct<variableCase>
 *
 * @param hpPercentage
 * @text 残りHP％
 * @desc 残りHP％で立ち絵を変更したい場合に使用します。
 * 通常時の立ち絵は100％で設定してください。
 * @default 100
 * @min 0
 * @max 100
 * @type number
 *
 * @param imageName
 * @text 画像ファイル名
 * @desc 立ち絵として表示する画像ファイルを選択してください。
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param x
 * @text X座標
 * @desc 立ち絵の表示位置(X)の調整値です。
 * ＋で右へ、－で左へ調整します。 (初期値: 0)
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 *
 * @param y
 * @text Y座標
 * @desc 立ち絵の表示位置(Y)の調整値です。
 * ＋で下へ、－で上へ調整します。 (初期値: 0)
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 *
 * @param scaleX
 * @text X拡大率
 * @desc 立ち絵の拡大率(X)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param scaleY
 * @text Y拡大率
 * @desc 立ち絵の拡大率(Y)です。
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 */

/*~struct~variableCase:
 *
 * @param id
 * @text 変数ID
 * @desc 条件に使用する変数IDです。
 * @type variable
 *
 * @param type
 * @text 変数条件
 * @desc 変数IDとの比較条件です。
 * @default equal
 * @type select
 * @option 一致する
 * @value equal
 * @option 以上
 * @value higher
 * @option 以下
 * @value lower
 *
 * @param value
 * @text 変数比較数値
 * @desc 変数IDと比較する数値です。
 * @default 0
 * @min -99999999
 * @max 99999999
 * @type number
 */

(() => {
	"use strict";
	const pluginName = "LL_MenuScreenBase";

	const parameters = PluginManager.parameters(pluginName);
	const paramJsonParse = function(key, value) {
		try {
			return JSON.parse(value);
		} catch(e) {
			return value;
		}
	};

	const menuPictures = String(parameters["menuPictures"] || "[]");
	const onSpbPluginEnable = eval(parameters["onSpbPluginEnable"] || "true");
	const menuPictureLists = JSON.parse(JSON.stringify(menuPictures, paramJsonParse));

	//-----------------------------------------------------------------------------
	// 戦闘中立ち絵プラグインの立ち絵リストを取得
	// On LL_StandingPictureBattle Plugin
	//-----------------------------------------------------------------------------
	const spbPluginName = "LL_StandingPictureBattle";
	const spbParameters = PluginManager.parameters(spbPluginName);
	const spbCommandPictures = String(spbParameters["sbCommandPictures"] || "[]");
	const spbCommandPictureLists = JSON.parse(JSON.stringify(spbCommandPictures, paramJsonParse));

	//-----------------------------------------------------------------------------
	// Ex Menu Screen Base Class
	//
	// メニュー画面立ち絵設定の独自クラスを追加定義します。

	class ExMenuScreenBase {

		//-----------------------------------------------------------------------------
		// 画像ファイル名を取得
		//-----------------------------------------------------------------------------
		static getImageName (actorId) {
			// 立ち絵リストを取得
			let pictureLists = this.getPictureLists();
			if (!pictureLists) return;

			// アクターのステート情報を取得
			let actorStates = [];
			if (actorId) actorStates = $gameActors.actor(actorId)._states;
			let specificPicture = null;

			// アクターIDが一致する立ち絵を検索
			pictureLists = pictureLists.filter(function(item) {
				if (Number(item.actorId) == actorId) {
					return true;
				}
			});

			// ステートにかかっているか？
			if (actorStates.length) {
				// ステートID・スイッチID・変数IDが有効な立ち絵リストを検索
				specificPicture = pictureLists.filter(function(item) {
					if (item.variableCase) {
						if (
							actorStates.indexOf(Number(item.stateId)) !== -1 &&
							$gameSwitches.value(Number(item.switchId)) &&
							(
								String(item.variableCase.type) == "equal" && $gameVariables.value(Number(item.variableCase.id)) == Number(item.variableCase.value) ||
								String(item.variableCase.type) == "higher" && $gameVariables.value(Number(item.variableCase.id)) >= Number(item.variableCase.value) ||
								String(item.variableCase.type) == "lower" && $gameVariables.value(Number(item.variableCase.id)) <= Number(item.variableCase.value)
							)
						) {
							return true;
						}
					}
				});
				if (specificPicture.length) return this.checkHpPercentage(actorId, specificPicture);
				// ステートID・スイッチIDが有効な立ち絵リストを検索
				specificPicture = pictureLists.filter(function(item) {
					if (actorStates.indexOf(Number(item.stateId)) !== -1 && $gameSwitches.value(Number(item.switchId)) && !item.variableCase) {
						return true;
					}
				});
				if (specificPicture.length) return this.checkHpPercentage(actorId, specificPicture);
				// ステートID・変数IDが有効な立ち絵リストを検索
				specificPicture = pictureLists.filter(function(item) {
					if (item.variableCase) {
						if (
							actorStates.indexOf(Number(item.stateId)) !== -1 &&
							(Number(item.switchId) === 0 || !item.switchId) &&
							(
								String(item.variableCase.type) == "equal" && $gameVariables.value(Number(item.variableCase.id)) == Number(item.variableCase.value) ||
								String(item.variableCase.type) == "higher" && $gameVariables.value(Number(item.variableCase.id)) >= Number(item.variableCase.value) ||
								String(item.variableCase.type) == "lower" && $gameVariables.value(Number(item.variableCase.id)) <= Number(item.variableCase.value)
							)
						) {
							return true;
						}
					}
				});
				if (specificPicture.length) return this.checkHpPercentage(actorId, specificPicture);
				// ステートIDが有効な立ち絵リストを検索
				specificPicture = pictureLists.filter(function(item) {
					if (actorStates.indexOf(Number(item.stateId)) !== -1 && (Number(item.switchId) === 0 || !item.switchId) && !item.variableCase) {
						return true;
					}
				});
				if (specificPicture.length) return this.checkHpPercentage(actorId, specificPicture);
			}

			// スイッチID・変数IDが有効な立ち絵リストを検索
			specificPicture = pictureLists.filter(function(item) {
				if (item.variableCase) {
					if (
						(Number(item.stateId) === 0 || !item.stateId) &&
						$gameSwitches.value(Number(item.switchId)) &&
						(
							String(item.variableCase.type) == "equal" && $gameVariables.value(Number(item.variableCase.id)) == Number(item.variableCase.value) ||
							String(item.variableCase.type) == "higher" && $gameVariables.value(Number(item.variableCase.id)) >= Number(item.variableCase.value) ||
							String(item.variableCase.type) == "lower" && $gameVariables.value(Number(item.variableCase.id)) <= Number(item.variableCase.value)
						)
					) {
						return true;
					}
				}
			});
			if (specificPicture.length) return this.checkHpPercentage(actorId, specificPicture);
			// スイッチIDが有効な立ち絵リストを検索
			specificPicture = pictureLists.filter(function(item) {
				if ((Number(item.stateId) === 0 || !item.stateId) && $gameSwitches.value(Number(item.switchId)) && !item.variableCase) {
					return true;
				}
			});
			if (specificPicture.length) return this.checkHpPercentage(actorId, specificPicture);
			// 変数IDが有効な立ち絵リストを検索
			specificPicture = pictureLists.filter(function(item) {
				if (item.variableCase) {
					if (
						(Number(item.stateId) === 0 || !item.stateId) &&
						(Number(item.switchId) === 0 || !item.switchId) &&
						(
							String(item.variableCase.type) == "equal" && $gameVariables.value(Number(item.variableCase.id)) == Number(item.variableCase.value) ||
							String(item.variableCase.type) == "higher" && $gameVariables.value(Number(item.variableCase.id)) >= Number(item.variableCase.value) ||
							String(item.variableCase.type) == "lower" && $gameVariables.value(Number(item.variableCase.id)) <= Number(item.variableCase.value)
						)
					) {
						return true;
					}
				}
			});
			if (specificPicture.length) return this.checkHpPercentage(actorId, specificPicture);

			// 上記で見つからなかった場合、通常の立ち絵を検索
			let normalPicture = pictureLists.filter(function(item) {
				if ((Number(item.stateId) === 0 || !item.stateId) && (Number(item.switchId) === 0 || !item.switchId) && !item.variableCase) return true;
			});
			if (normalPicture.length) return this.checkHpPercentage(actorId, normalPicture);
		}

		static checkHpPercentage (actorId, pictureLists) {
			// アクターの残HP％を取得
			let hpRate = this.getHpRate(actorId);
			// 最もHP%が低い立ち絵を適用する
			let minHpRate = 100;
			let result = null;
			pictureLists.forEach(function(item) {
				if (hpRate <= Number(item.hpPercentage) && minHpRate >= Number(item.hpPercentage)) {
					result = item;
					minHpRate = Number(item.hpPercentage);
				} else if (!item.hpPercentage && minHpRate >= 100) {
					// プラグインパラメータが更新されていない場合、便宜的に100として扱う
					result = item;
					minHpRate = Number(item.hpPercentage);
				}
			});
			return result;
		}

		static getPictureLists () {
			return onSpbPluginEnable ? spbCommandPictureLists : menuPictureLists;
		}

		static onSpbPluginEnable () {
			return onSpbPluginEnable;
		}

		// アクターのHPレートを取得
		static getHpRate (actorId) {
			if (!$gameActors.actor(actorId)) return 0;
			return $gameActors.actor(actorId).mhp > 0 ? $gameActors.actor(actorId).hp / $gameActors.actor(actorId).mhp * 100 : 0;
		}
	}

	window.ExMenuScreenBase = ExMenuScreenBase;
})();
