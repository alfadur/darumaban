(function (Kotlin) {
  'use strict';
  var _ = Kotlin.defineRootPackage(function () {
    var tmp$0;
    tmp$0 = Kotlin.modules['stdlib'].kotlin.run_un3fny$(_.f);
    this.levelGrid = tmp$0;
    this.spawnPoints = Kotlin.modules['stdlib'].kotlin.listOf_9mqe4v$([new _.Point(0, 0), new _.Point(9, 9), new _.Point(9, 0), new _.Point(0, 9)]);
    this.RandomController = Kotlin.createObject(function () {
      return [_.Controller];
    }, null, {
      isActive_k8o7am$: function (action) {
        return Math.random() >= 0.5;
      }
    });
    this.UndoStack = Kotlin.createObject(null, function () {
      this.stack_au6yv2$ = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
      this.steps_au7259$ = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
      this.commitedSteps_6vf5cp$ = 0;
    }, {
      push: function (action) {
        this.stack_au6yv2$.add_za3rmp$(action);
        if (Kotlin.isType(action, _.UndoMoveCharacter)) {
          this.commit();
        }
      },
      commit: function () {
        var newSteps = Kotlin.modules['stdlib'].kotlin.get_size_4m3c68$(this.stack_au6yv2$) - this.commitedSteps_6vf5cp$;
        this.steps_au7259$.add_za3rmp$(newSteps);
        this.commitedSteps_6vf5cp$ = Kotlin.modules['stdlib'].kotlin.get_size_4m3c68$(this.stack_au6yv2$);
      },
      undo: function () {
        if (Kotlin.modules['stdlib'].kotlin.isNotEmpty_4m3c68$(this.steps_au7259$) && this.commitedSteps_6vf5cp$ === Kotlin.modules['stdlib'].kotlin.get_size_4m3c68$(this.stack_au6yv2$)) {
          var stepsCount = Kotlin.modules['stdlib'].kotlin.last_fvq2g0$(this.steps_au7259$);
          this.steps_au7259$.remove_za3lpa$(Kotlin.modules['stdlib'].kotlin.get_size_4m3c68$(this.steps_au7259$) - 1);
          this.commitedSteps_6vf5cp$ -= stepsCount;
          return Kotlin.modules['stdlib'].kotlin.drop_21mo2$(this.stack_au6yv2$, Kotlin.modules['stdlib'].kotlin.get_size_4m3c68$(this.stack_au6yv2$) - stepsCount);
        }
         else {
          return Kotlin.modules['stdlib'].kotlin.drop_21mo2$(this.stack_au6yv2$, Kotlin.modules['stdlib'].kotlin.get_size_4m3c68$(this.stack_au6yv2$) - this.commitedSteps_6vf5cp$);
        }
      },
      clear: function () {
        this.stack_au6yv2$.clear();
        this.steps_au7259$.clear();
        this.commitedSteps_6vf5cp$ = 0;
      }
    });
    this.KeyCodes = Kotlin.createObject(null, function () {
      this.Space = 32;
      this.Shift = 16;
      this.Backspace = 8;
      this.Enter = 13;
      this.Escape = 27;
      this.Left = 37;
      this.Up = 38;
      this.Right = 39;
      this.Down = 40;
      this.W = 87;
      this.A = 65;
      this.S = 83;
      this.D = 68;
      this.P = 80;
      this.R = 82;
      this.U = 85;
    });
  }, /** @lends _ */ {
    Point: Kotlin.createClass(null, function (x, y) {
      if (x === void 0)
        x = 0;
      if (y === void 0)
        y = 0;
      this.x = x;
      this.y = y;
    }, /** @lends _.Point.prototype */ {
      plus: function (d) {
        return new _.Point(this.x + d.shift.x, this.y + d.shift.y);
      },
      minus: function (d) {
        return new _.Point(this.x + d.shift.x, this.y + d.shift.y);
      },
      component1: function () {
        return this.x;
      },
      component2: function () {
        return this.y;
      },
      copy: function (x, y) {
        return new _.Point(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
      },
      toString: function () {
        return 'Point(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
      },
      hashCode: function () {
        var result = 0;
        result = result * 31 + Kotlin.hashCode(this.x) | 0;
        result = result * 31 + Kotlin.hashCode(this.y) | 0;
        return result;
      },
      equals_za3rmp$: function (other) {
        return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y))));
      }
    }, /** @lends _.Point */ {
      object_initializer$: function () {
        return Kotlin.createObject(null, function () {
          this.zero = new _.Point();
        });
      }
    }),
    Direction: Kotlin.createEnumClass(function () {
      return [Kotlin.Enum];
    }, function $fun(shift) {
      $fun.baseInitializer.call(this);
      this.shift = shift;
    }, function () {
      return {
        None: new _.Direction(_.Point.object.zero),
        Up: new _.Direction(new _.Point(0, 1)),
        Left: new _.Direction(new _.Point(-1, 0)),
        Down: new _.Direction(new _.Point(0, -1)),
        Right: new _.Direction(new _.Point(1, 0))
      };
    }),
    Vector: Kotlin.createClass(null, function (x, y) {
      if (x === void 0)
        x = 0.0;
      if (y === void 0)
        y = 0.0;
      this.x = x;
      this.y = y;
    }, /** @lends _.Vector.prototype */ {
      component1: function () {
        return this.x;
      },
      component2: function () {
        return this.y;
      },
      copy: function (x, y) {
        return new _.Vector(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
      },
      toString: function () {
        return 'Vector(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
      },
      hashCode: function () {
        var result = 0;
        result = result * 31 + Kotlin.hashCode(this.x) | 0;
        result = result * 31 + Kotlin.hashCode(this.y) | 0;
        return result;
      },
      equals_za3rmp$: function (other) {
        return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y))));
      }
    }, /** @lends _.Vector */ {
      object_initializer$: function () {
        return Kotlin.createObject(null, function () {
          this.zero = new _.Vector();
        });
      }
    }),
    Character: Kotlin.createClass(null, function (currentTile) {
      if (currentTile === void 0)
        currentTile = _.Point.object.zero;
      this.currentTile = currentTile;
      this.targetTile = this.currentTile;
      this.shift = 0.0;
      this.direction = _.Direction.object.None;
      this.moveDirection = _.Direction.object.None;
      this.isRolling = false;
      this.rollSources = Kotlin.nullArray(4);
      this.rollSourcesUpdated = false;
    }, /** @lends _.Character.prototype */ {
      stop: function () {
        this.targetTile = this.currentTile;
        this.shift = 0.0;
        this.moveDirection = _.Direction.object.None;
      }
    }, /** @lends _.Character */ {
      Character$f: function (it) {
        return !it.equals_za3rmp$(_.Direction.object.None);
      },
      object_initializer$: function () {
        return Kotlin.createObject(null, function () {
          var tmp$0;
          tmp$0 = Kotlin.modules['stdlib'].kotlin.filter_dgtl0h$(_.Direction.values(), _.Character.Character$f);
          this.moveDirections = Kotlin.modules['stdlib'].kotlin.toArrayList_ir3nkc$(tmp$0);
        });
      }
    }),
    Snowman: Kotlin.createClass(null, function (currentTile) {
      if (currentTile === void 0)
        currentTile = _.Point.object.zero;
      this.currentTile = currentTile;
      this.targetTile = this.currentTile;
      this.shift = 0.0;
      this.partSizes = Kotlin.numberArrayOfSize(_.Snowman.object.MaxParts);
    }, /** @lends _.Snowman.prototype */ {
      partsCount: {
        get: function () {
          var tmp$0;
          tmp$0 = Kotlin.modules['stdlib'].kotlin.count_74vioc$(this.partSizes, _.Snowman.partsCount$f);
          return tmp$0;
        }
      },
      isRollable: {
        get: function () {
          return this.partsCount <= 1;
        }
      },
      isComplete: {
        get: function () {
          return this.partsCount >= _.Snowman.object.MaxParts;
        }
      },
      hasPlaceFor: function (snowBallSize) {
        return this.partsCount < _.Snowman.object.MaxParts && this.partSizes[this.partsCount - 1] > snowBallSize;
      },
      append: function (size) {
        if (this.partsCount < _.Snowman.object.MaxParts) {
          this.partSizes[this.partsCount] = size;
        }
      },
      reduce: function () {
        var tmp$0, tmp$1;
        if (this.partsCount > 1) {
          this.partSizes[this.partsCount - 1] = 0;
        }
         else {
          tmp$0 = this.partSizes, tmp$1 = 0, tmp$0[tmp$1] = tmp$0[tmp$1] - 1, tmp$0[tmp$1];
        }
      },
      stop: function () {
        this.targetTile = this.currentTile;
        this.shift = 0.0;
      }
    }, /** @lends _.Snowman */ {
      partsCount$f: function (it) {
        return it > 0;
      },
      object_initializer$: function () {
        return Kotlin.createObject(null, function () {
          this.MaxSize = 3;
          this.MaxParts = 3;
        });
      }
    }),
    Level: Kotlin.createClass(null, function (width, height, grid) {
      if (grid === void 0)
        grid = Kotlin.numberArrayOfSize(width * height);
      this.width = width;
      this.height = height;
      this.grid = grid;
      this.snow = Kotlin.numberArrayOfSize(this.grid.length);
      this.characters = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
      this.snowmen = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
      this.snowmenChanged = false;
      this.snowChanged = false;
    }, /** @lends _.Level.prototype */ {
      reset: function () {
        Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(Kotlin.arrayIndices(this.snow), _.Level.reset$f(this));
        this.snowChanged = true;
        this.snowmen.clear();
        this.snowmenChanged = true;
        this.characters.clear();
      },
      isPassable_1: function (tileX, tileY) {
        return (new Kotlin.NumberRange(0, this.width - 1)).contains(tileX) && (new Kotlin.NumberRange(0, this.height - 1)).contains(tileY) && this.grid[tileY * this.width + tileX] <= 0;
      },
      isPassable: function (tile) {
        return this.isPassable_1(tile.x, tile.y);
      },
      hasSomething_1: function (tileX, tileY) {
        var tmp$0, tmp$1;
        tmp$0 = Kotlin.modules['stdlib'].kotlin.any_azvtw4$(this.characters, _.Level.hasSomething_1$f(tileX, tileY));
        if (!tmp$0)
          tmp$1 = Kotlin.modules['stdlib'].kotlin.any_azvtw4$(this.snowmen, _.Level.hasSomething_1$f_0(tileX, tileY));
        else
          tmp$1 = true;
        return tmp$1;
      },
      hasSomething: function (tile) {
        return this.hasSomething_1(tile.x, tile.y);
      },
      hasSnow_1: function (tileX, tileY) {
        return this.isPassable_1(tileX, tileY) && this.snow[this.width * tileY + tileX] >= 0;
      },
      hasSnow: function (tile) {
        return this.hasSnow_1(tile.x, tile.y);
      },
      addSnow_1: function (tileX, tileY) {
        if (this.isPassable_1(tileX, tileY)) {
          this.snow[this.width * tileY + tileX] = 0;
          this.snowChanged = true;
        }
      },
      addSnow: function (tile) {
        this.addSnow_1(tile.x, tile.y);
      },
      removeSnow_1: function (tileX, tileY) {
        if (this.isPassable_1(tileX, tileY)) {
          this.snow[this.width * tileY + tileX] = -1;
          this.snowChanged = true;
        }
      },
      removeSnow: function (tile) {
        this.removeSnow_1(tile.x, tile.y);
      },
      canMoveTo: function (tile) {
        return this.isPassable(tile) && !this.hasSomething(tile);
      },
      createCharacter: function (tile) {
        var tmp$0;
        tmp$0 = Kotlin.modules['stdlib'].kotlin.with_dbz3ex$(new _.Character(tile), _.Level.createCharacter$f(this));
        return tmp$0;
      },
      createSnowman: function (tile) {
        var tmp$0;
        tmp$0 = Kotlin.modules['stdlib'].kotlin.with_dbz3ex$(new _.Snowman(tile), _.Level.createSnowman$f(this));
        return tmp$0;
      },
      findSnowman: function (tile) {
        var tmp$0;
        tmp$0 = Kotlin.modules['stdlib'].kotlin.firstOrNull_azvtw4$(this.snowmen, _.Level.findSnowman$f(tile));
        return tmp$0;
      },
      findRolls: function ($receiver) {
        var tmp$0, tmp$1, tmp$2, tmp$3, tmp$4;
        tmp$0 = Kotlin.modules['stdlib'].kotlin.get_indices_4m3c68$(_.Character.object.moveDirections), tmp$1 = tmp$0.start, tmp$2 = tmp$0.end, tmp$3 = tmp$0.increment;
        for (var i = tmp$1; i <= tmp$2; i += tmp$3) {
          var direction = _.Character.object.moveDirections.get_za3lpa$(i);
          var target = $receiver.currentTile.plus(direction);
          var existingSnowman = this.findSnowman(target);
          var snowmanTarget = target.plus(direction);
          var targetSnowman = this.findSnowman(snowmanTarget);
          if (existingSnowman != null && targetSnowman != null && existingSnowman.isRollable) {
            var size = existingSnowman.partSizes[0] + (this.hasSnow(target) ? 1 : 0);
            if (targetSnowman.hasPlaceFor(size))
              tmp$4 = target;
            else if (this.hasSnow($receiver.currentTile) && existingSnowman.hasPlaceFor(1))
              tmp$4 = $receiver.currentTile;
            else
              tmp$4 = null;
          }
           else if (existingSnowman != null && existingSnowman.isRollable && this.canMoveTo(snowmanTarget))
            tmp$4 = target;
          else if (this.hasSnow($receiver.currentTile) && (this.canMoveTo(target) || (existingSnowman != null && existingSnowman.hasPlaceFor(1))))
            tmp$4 = $receiver.currentTile;
          else
            tmp$4 = null;
          var rollSourceTile = tmp$4;
          $receiver.rollSources[i] = rollSourceTile;
        }
        $receiver.rollSourcesUpdated = true;
      },
      update_1: function ($receiver) {
        var tmp$0, tmp$1, tmp$2;
        if (!Kotlin.equals($receiver.currentTile, $receiver.targetTile)) {
          $receiver.shift += 0.08;
          if ($receiver.shift >= 1.0) {
            $receiver.currentTile = $receiver.targetTile;
            $receiver.shift -= 1.0;
            this.findRolls($receiver);
          }
        }
         else if (!$receiver.direction.equals_za3rmp$(_.Direction.object.None)) {
          var target = $receiver.currentTile.plus($receiver.direction);
          if ($receiver.isRolling) {
            var rollSource = $receiver.rollSources[$receiver.direction.ordinal() - 1];
            if (Kotlin.equals(rollSource, $receiver.currentTile)) {
              this.removeSnow($receiver.currentTile);
              this.createSnowman($receiver.currentTile).targetTile = target;
              this.snowChanged = true;
              this.snowmenChanged = true;
              this.findRolls($receiver);
            }
             else if (Kotlin.equals(rollSource, target)) {
              var snowman = (tmp$0 = this.findSnowman(target)) != null ? tmp$0 : Kotlin.throwNPE();
              if (snowman.partSizes[0] < _.Snowman.object.MaxSize && this.hasSnow(target)) {
                tmp$1 = snowman.partSizes, tmp$2 = 0, tmp$1[tmp$2] = tmp$1[tmp$2] + 1, tmp$1[tmp$2];
                this.removeSnow(target);
                this.snowChanged = true;
                this.snowmenChanged = true;
              }
              snowman.targetTile = target.plus($receiver.direction);
            }
          }
          if (this.canMoveTo(target)) {
            $receiver.targetTile = target;
          }
          $receiver.moveDirection = $receiver.direction;
        }
      },
      update_2: function ($receiver) {
        if (!Kotlin.equals($receiver.currentTile, $receiver.targetTile)) {
          $receiver.shift += 0.125;
          if ($receiver.shift >= 1.0) {
            var targetSnowman = this.findSnowman($receiver.targetTile);
            if (targetSnowman != null) {
              targetSnowman.append($receiver.partSizes[0]);
              this.remove($receiver);
            }
             else {
              $receiver.currentTile = $receiver.targetTile;
              $receiver.shift = 0.0;
            }
          }
          Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(this.characters, _.Level.update_2$f(this));
        }
      },
      remove: function ($receiver) {
        var index = this.snowmen.indexOf_za3rmp$($receiver);
        if (index >= 0) {
          this.snowmen.remove_za3rmp$($receiver);
          this.snowmenChanged = true;
        }
      },
      update: function () {
        Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(this.snowmen, _.Level.update$f(this));
        Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(this.characters, _.Level.update$f_0(this));
      }
    }, /** @lends _.Level */ {
      reset$f: function (this$Level) {
        return function (it) {
          this$Level.snow[it] = 0;
        };
      },
      hasSomething_1$f: function (tileX, tileY) {
        return function (it) {
          return it.targetTile.x === tileX && it.targetTile.y === tileY;
        };
      },
      hasSomething_1$f_0: function (tileX, tileY) {
        return function (it) {
          return it.targetTile.x === tileX && it.targetTile.y === tileY;
        };
      },
      createCharacter$f: function (this$Level) {
        return function () {
          this$Level.findRolls(this);
          this$Level.characters.add_za3rmp$(this);
          return this;
        };
      },
      createSnowman$f: function (this$Level) {
        return function () {
          this.partSizes[0] = 1;
          this$Level.snowmen.add_za3rmp$(this);
          this$Level.snowChanged = true;
          return this;
        };
      },
      findSnowman$f: function (tile) {
        return function (it) {
          return Kotlin.equals(it.currentTile, tile);
        };
      },
      update_2$f: function (this$Level) {
        return function (it) {
          this$Level.findRolls(it);
        };
      },
      update$f: function (this$Level) {
        return function (it) {
          this$Level.update_2(it);
        };
      },
      update$f_0: function (this$Level) {
        return function (it) {
          this$Level.update_1(it);
        };
      }
    }),
    f: function () {
      var X = 1;
      var o = 0;
      var _ = -1;
      return [o, o, o, _, o, o, o, o, o, _, o, o, o, o, o, X, o, o, o, o, X, X, o, o, o, _, X, X, _, o, o, o, o, X, o, X, o, o, o, o, X, o, o, o, o, X, o, o, o, o, o, o, X, X, X, o, _, o, o, _, o, o, o, o, o, _, X, o, o, o, o, X, o, X, X, X, o, o, o, o, X, o, o, X, o, X, _, X, o, o, o, o, X, X, o, o, _, X, o, o, o, o, o, o, _, o, o, o, o, o, o, o, o, o, o, X, o, o, o, o, o, o, _, X, _, o, o, X, o, o, _, X, o, X, X, X, o, o, _, o, o, o, X, X];
    },
    Game: Kotlin.createClass(null, function (controllers) {
      var tmp$0;
      this.controllers = controllers;
      this.levelSize = 12;
      this.tileSize = 40;
      this.screenWidth = (this.levelSize + 2) * this.tileSize;
      this.screenHeight = (this.levelSize + 2) * this.tileSize;
      this.level = new _.Level(this.levelSize, this.levelSize, _.levelGrid);
      this.renderer = new PIXI.CanvasRenderer(this.screenWidth, this.screenHeight);
      this.stage = new PIXI.Stage(136);
      this.snow = new PIXI.SpriteBatch();
      this.background = new PIXI.SpriteBatch();
      this.goals = new PIXI.Graphics();
      this.characters = new PIXI.DisplayObjectContainer();
      this.charSprites = new Kotlin.ArrayList();
      this.snowmen = new PIXI.DisplayObjectContainer();
      this.snowmanSprites = new Kotlin.ArrayList();
      this.texture = PIXI.BaseTexture.fromImage('images/tiles.png', false);
      this.tiles = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
      this.hints = new PIXI.SpriteBatch();
      tmp$0 = 6;
      for (var i = 0; i <= tmp$0; i++) {
        var x = i % 2 * this.tileSize;
        var y = (i / 2 | 0) * this.tileSize;
        var texture = new PIXI.Texture(this.texture, new PIXI.Rectangle(x, y, this.tileSize, this.tileSize));
        this.tiles.add_za3rmp$(texture);
      }
      document.getElementById('game').appendChild(this.renderer.view);
      Kotlin.modules['stdlib'].kotlin.with_dbz3ex$(this.background, _.Game.Game$f(this));
      this.stage.addChild(this.snow);
      this.stage.addChild(this.goals);
      this.updateGoals();
      this.stage.addChild(this.snowmen);
      this.stage.addChild(this.characters);
      this.restart();
      this.stage.addChild(this.hints);
      window.requestAnimationFrame(_.Game.Game$f_0(this));
    }, /** @lends _.Game.prototype */ {
      restart: function () {
        var tmp$0, tmp$1, tmp$2, tmp$3;
        this.level.reset();
        this.characters.removeChildren();
        this.charSprites.clear();
        tmp$0 = Kotlin.modules['stdlib'].kotlin.get_indices_4m3c68$(this.controllers), tmp$1 = tmp$0.start, tmp$2 = tmp$0.end, tmp$3 = tmp$0.increment;
        for (var i = tmp$1; i <= tmp$2; i += tmp$3) {
          this.level.createCharacter(_.spawnPoints.get_za3lpa$(i));
          this.addCharSprite();
        }
      },
      createSprite_1: function (x, y, texture) {
        var sprite = new PIXI.Sprite(texture);
        sprite.position = new PIXI.Point(x * this.tileSize, y * this.tileSize);
        return sprite;
      },
      createSprite: function (tileIndex, texture) {
        var x = tileIndex % this.levelSize + 1;
        var y = (tileIndex / this.levelSize | 0) + 1;
        return this.createSprite_1(x, y, texture);
      },
      updateGoals: function () {
        Kotlin.modules['stdlib'].kotlin.with_dbz3ex$(this.goals, _.Game.updateGoals$f(this));
      },
      updateSnow: function () {
        Kotlin.modules['stdlib'].kotlin.with_dbz3ex$(this.snow, _.Game.updateSnow$f(this));
      },
      addSnowSprite: function (snowman) {
        var tmp$0;
        if (snowman.isComplete) {
          var sprite = this.createSprite_1(0, 0, this.tiles.get_za3lpa$(4));
          this.snowmanSprites.add_za3rmp$(sprite);
          this.snowmen.addChild(sprite);
        }
         else {
          var sprites = new PIXI.SpriteBatch();
          tmp$0 = snowman.partsCount - 1;
          for (var i = 0; i <= tmp$0; i++) {
            var size = snowman.partSizes[i];
            var scale = (size + 1) / (_.Snowman.object.MaxSize + 1);
            var sprite_0 = this.createSprite_1(0, 0, this.tiles.get_za3lpa$(3));
            sprite_0.position = new PIXI.Point((this.tileSize / 2 | 0) * (1.0 - scale), (this.tileSize / 2 | 0) * (1.0 - scale) - i * (this.tileSize / 6 | 0));
            sprite_0.scale = new PIXI.Point(scale, scale);
            sprites.addChild(sprite_0);
          }
          this.snowmanSprites.add_za3rmp$(sprites);
          this.snowmen.addChild(sprites);
        }
      },
      addCharSprite: function () {
        var sprite = this.createSprite_1(0, 0, this.tiles.get_za3lpa$(5));
        sprite.pivot = new PIXI.Point(this.tileSize / 2 | 0, this.tileSize / 2 | 0);
        this.charSprites.add_za3rmp$(sprite);
        this.characters.addChild(sprite);
      },
      lerpTile: function (x1, x2, a) {
        return (1.0 - a) * (x1 * this.tileSize) + a * (x2 * this.tileSize);
      },
      checkWin: function () {
        var tmp$0, tmp$1, tmp$2, tmp$3;
        var win = true;
        tmp$0 = Kotlin.arrayIndices(this.level.grid), tmp$1 = tmp$0.start, tmp$2 = tmp$0.end, tmp$3 = tmp$0.increment;
        for (var i = tmp$1; i <= tmp$2; i += tmp$3) {
          if (this.level.grid[i] < 0) {
            var tile = new _.Point(i % this.levelSize, i / this.levelSize | 0);
            var snowman = this.level.findSnowman(tile);
            if (snowman == null || !snowman.isComplete) {
              win = false;
            }
          }
        }
        return win;
      },
      checkAction: function (action) {
        var tmp$0;
        tmp$0 = Kotlin.modules['stdlib'].kotlin.any_azvtw4$(this.controllers, _.Game.checkAction$f(action));
        return tmp$0;
      },
      update: function () {
        var tmp$1, tmp$2, tmp$3, tmp$4, tmp$5, tmp$7, tmp$8, tmp$9, tmp$10, tmp$12, tmp$13;
        if (this.checkAction(_.ControllerAction.object.Restart)) {
          this.restart();
        }
        if (this.level.snowChanged) {
          this.updateSnow();
          this.level.snowChanged = false;
        }
        if (this.level.snowmenChanged) {
          this.snowmanSprites.clear();
          this.snowmen.removeChildren();
          Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(this.level.snowmen, _.Game.update$f(this));
          this.level.snowmenChanged = false;
          this.checkWin();
        }
        tmp$1 = Kotlin.modules['stdlib'].kotlin.zip_84aay$(this.level.characters, this.controllers).iterator();
        while (tmp$1.hasNext()) {
          var tmp$0 = tmp$1.next()
          , char = tmp$0.component1()
          , controller = tmp$0.component2();
          Kotlin.modules['stdlib'].kotlin.with_dbz3ex$(char, _.Game.update$f_0(controller));
          if (controller.isActive_k8o7am$(_.ControllerAction.object.Hint)) {
            if (!this.hints.visible || char.rollSourcesUpdated) {
              this.hints.removeChildren();
              this.hints.visible = true;
              tmp$2 = Kotlin.modules['stdlib'].kotlin.get_indices_4m3c68$(_.Character.object.moveDirections), tmp$3 = tmp$2.start, tmp$4 = tmp$2.end, tmp$5 = tmp$2.increment;
              for (var i = tmp$3; i <= tmp$4; i += tmp$5) {
                var start = char.rollSources[i];
                if (start != null) {
                  var end = start.plus(_.Character.object.moveDirections.get_za3lpa$(i));
                  var x = this.lerpTile(start.x + 1, end.x + 1, 0.5);
                  var y = this.lerpTile(start.y + 1, end.y + 1, 0.5);
                  var sprite = new PIXI.Sprite(this.tiles.get_za3lpa$(6));
                  var shift = i > 0 ? this.tileSize / 2 | 0 : 0;
                  sprite.position = new PIXI.Point(x + shift, y + shift);
                  sprite.pivot = new PIXI.Point(this.tileSize / 2 | 0, this.tileSize / 2 | 0);
                  sprite.rotation = i * Math.PI / 2;
                  this.hints.addChild(sprite);
                }
              }
              char.rollSourcesUpdated = false;
            }
          }
           else {
            this.hints.visible = false;
          }
        }
        this.level.update();
        tmp$7 = Kotlin.modules['stdlib'].kotlin.zip_84aay$(this.level.characters, this.charSprites).iterator();
        while (tmp$7.hasNext()) {
          var tmp$6 = tmp$7.next()
          , c = tmp$6.component1()
          , sprite_0 = tmp$6.component2();
          var x_0 = this.lerpTile(c.currentTile.x, c.targetTile.x, c.shift);
          var y_0 = this.lerpTile(c.currentTile.y, c.targetTile.y, c.shift);
          sprite_0.position = new PIXI.Point(x_0 + this.tileSize + (this.tileSize / 2 | 0), y_0 + this.tileSize + (this.tileSize / 2 | 0));
          tmp$10 = sprite_0;
          tmp$8 = c.moveDirection;
          if (tmp$8 === _.Direction.object.Down)
            tmp$9 = Math.PI;
          else if (tmp$8 === _.Direction.object.Right)
            tmp$9 = -Math.PI / 2;
          else if (tmp$8 === _.Direction.object.Up)
            tmp$9 = 0.0;
          else if (tmp$8 === _.Direction.object.Left)
            tmp$9 = Math.PI / 2;
          else
            tmp$9 = sprite_0.rotation;
          tmp$10.rotation = tmp$9;
        }
        tmp$12 = Kotlin.modules['stdlib'].kotlin.sortBy_cvgzri$(Kotlin.modules['stdlib'].kotlin.zip_84aay$(this.level.snowmen, this.snowmanSprites), _.Game.update$f_1);
        tmp$13 = tmp$12.iterator();
        while (tmp$13.hasNext()) {
          var tmp$11 = tmp$13.next()
          , s = tmp$11.component1()
          , sprite_1 = tmp$11.component2();
          var x_1 = this.lerpTile(s.currentTile.x, s.targetTile.x, s.shift);
          var y_1 = this.lerpTile(s.currentTile.y, s.targetTile.y, s.shift);
          sprite_1.position = new PIXI.Point(x_1 + this.tileSize, y_1 + this.tileSize);
        }
        this.renderer.render(this.stage);
        window.requestAnimationFrame(_.Game.update$f_2(this));
      }
    }, /** @lends _.Game */ {
      Game$f: function (this$Game) {
        return function () {
          var tmp$0, tmp$1, tmp$2, tmp$3, tmp$4, tmp$5;
          var wall = this$Game.tiles.get_za3lpa$(0);
          var floor = this$Game.tiles.get_za3lpa$(1);
          tmp$0 = this$Game.levelSize + 1;
          for (var x = 0; x <= tmp$0; x++) {
            this.addChild(this$Game.createSprite_1(x, 0, wall));
            this.addChild(this$Game.createSprite_1(x, this$Game.levelSize + 1, wall));
          }
          tmp$1 = this$Game.levelSize;
          for (var y = 1; y <= tmp$1; y++) {
            this.addChild(this$Game.createSprite_1(0, y, wall));
            this.addChild(this$Game.createSprite_1(this$Game.levelSize + 1, y, wall));
          }
          tmp$2 = Kotlin.arrayIndices(_.levelGrid), tmp$3 = tmp$2.start, tmp$4 = tmp$2.end, tmp$5 = tmp$2.increment;
          for (var i = tmp$3; i <= tmp$4; i += tmp$5) {
            var tile = _.levelGrid[i] > 0 ? wall : floor;
            this.addChild(this$Game.createSprite(i, tile));
          }
          return this$Game.stage.addChild(this);
        };
      },
      Game$f_0: function (this$Game) {
        return function () {
          this$Game.update();
        };
      },
      updateGoals$f: function (this$Game) {
        return function () {
          var tmp$0, tmp$1, tmp$2, tmp$3;
          tmp$0 = Kotlin.arrayIndices(this$Game.level.grid), tmp$1 = tmp$0.start, tmp$2 = tmp$0.end, tmp$3 = tmp$0.increment;
          for (var i = tmp$1; i <= tmp$2; i += tmp$3) {
            if (this$Game.level.grid[i] < 0) {
              var x = i % this$Game.levelSize + 1;
              var y = (i / this$Game.levelSize | 0) + 1;
              this.lineStyle(3, 11875072, 0.7);
              this.drawRect(x * this$Game.tileSize, y * this$Game.tileSize, this$Game.tileSize, this$Game.tileSize);
            }
          }
        };
      },
      updateSnow$f: function (this$Game) {
        return function () {
          var tmp$0, tmp$1, tmp$2, tmp$3;
          this.removeChildren();
          tmp$0 = Kotlin.arrayIndices(this$Game.level.snow), tmp$1 = tmp$0.start, tmp$2 = tmp$0.end, tmp$3 = tmp$0.increment;
          for (var i = tmp$1; i <= tmp$2; i += tmp$3) {
            if (this$Game.level.grid[i] <= 0 && this$Game.level.snow[i] >= 0) {
              var x = i % this$Game.levelSize + 1;
              var y = (i / this$Game.levelSize | 0) + 1;
              var sprite = new PIXI.Sprite(this$Game.tiles.get_za3lpa$(2));
              sprite.position = new PIXI.Point(x * this$Game.tileSize, y * this$Game.tileSize);
              this.addChild(sprite);
            }
          }
        };
      },
      checkAction$f: function (action) {
        return function (it) {
          return it.isActive_k8o7am$(action);
        };
      },
      update$f: function (this$Game) {
        return function (it) {
          this$Game.addSnowSprite(it);
        };
      },
      update$f_0: function (controller) {
        return function () {
          var tmp$0;
          if (controller.isActive_k8o7am$(_.ControllerAction.object.Up))
            tmp$0 = _.Direction.object.Up;
          else if (controller.isActive_k8o7am$(_.ControllerAction.object.Left))
            tmp$0 = _.Direction.object.Left;
          else if (controller.isActive_k8o7am$(_.ControllerAction.object.Down))
            tmp$0 = _.Direction.object.Down;
          else if (controller.isActive_k8o7am$(_.ControllerAction.object.Right))
            tmp$0 = _.Direction.object.Right;
          else
            tmp$0 = _.Direction.object.None;
          this.direction = tmp$0;
          this.isRolling = controller.isActive_k8o7am$(_.ControllerAction.object.Roll);
        };
      },
      update$f_1: function (it) {
        return -it.first.partsCount;
      },
      update$f_2: function (this$Game) {
        return function () {
          this$Game.update();
        };
      }
    }),
    ControllerAction: Kotlin.createEnumClass(function () {
      return [Kotlin.Enum];
    }, function $fun() {
      $fun.baseInitializer.call(this);
    }, function () {
      return {
        Up: new _.ControllerAction(),
        Left: new _.ControllerAction(),
        Right: new _.ControllerAction(),
        Down: new _.ControllerAction(),
        Throw: new _.ControllerAction(),
        Roll: new _.ControllerAction(),
        Restart: new _.ControllerAction(),
        Hint: new _.ControllerAction()
      };
    }),
    Controller: Kotlin.createTrait(null),
    KeyboardController: Kotlin.createClass(function () {
      return [_.Controller];
    }, function (window) {
      this.holdActionKeys_y3qldg$ = Kotlin.modules['stdlib'].kotlin.mapOf_eoa9s7$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$(_.ControllerAction.object.Roll, [_.KeyCodes.Space, _.KeyCodes.Shift]), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(_.ControllerAction.object.Hint, [_.KeyCodes.Backspace, _.KeyCodes.Enter])]);
      this.mixedActionKeys_9z5ava$ = Kotlin.modules['stdlib'].kotlin.mapOf_eoa9s7$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$(_.ControllerAction.object.Up, [_.KeyCodes.Down, _.KeyCodes.S]), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(_.ControllerAction.object.Left, [_.KeyCodes.Left, _.KeyCodes.A]), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(_.ControllerAction.object.Down, [_.KeyCodes.Up, _.KeyCodes.W]), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(_.ControllerAction.object.Right, [_.KeyCodes.Right, _.KeyCodes.D])]);
      this.pressActionKeys_l16neq$ = Kotlin.modules['stdlib'].kotlin.mapOf_eoa9s7$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$(_.ControllerAction.object.Restart, [_.KeyCodes.Escape])]);
      this.isDown_spu85l$ = Kotlin.modules['stdlib'].kotlin.hashSetOf_9mqe4v$([]);
      this.wasPressed_rsek04$ = Kotlin.modules['stdlib'].kotlin.hashSetOf_9mqe4v$([]);
      this.continuousMode_o0b3vn$ = true;
      var isDown = this.isDown_spu85l$;
      window.onkeydown = _.KeyboardController.KeyboardController$f(isDown, this);
      window.onkeyup = _.KeyboardController.KeyboardController$f_0(isDown);
    }, /** @lends _.KeyboardController.prototype */ {
      checkHold: function (keys) {
        var tmp$0;
        tmp$0 = keys != null ? Kotlin.modules['stdlib'].kotlin.any_74vioc$(keys, _.KeyboardController.checkHold$f(this)) : null;
        return tmp$0 != null ? tmp$0 : false;
      },
      retrieveFirst: function (keys) {
        var tmp$0, tmp$1, tmp$2;
        tmp$0 = keys != null ? keys : [], tmp$1 = tmp$0.length;
        for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
          var key = tmp$0[tmp$2];
          if (this.wasPressed_rsek04$.remove_za3rmp$(key)) {
            return true;
          }
        }
        return false;
      },
      isActive_k8o7am$: function (action) {
        return this.checkHold(this.holdActionKeys_y3qldg$.get_za3rmp$(action)) || this.retrieveFirst(this.pressActionKeys_l16neq$.get_za3rmp$(action)) || (this.continuousMode_o0b3vn$ ? this.checkHold(this.mixedActionKeys_9z5ava$.get_za3rmp$(action)) : this.retrieveFirst(this.mixedActionKeys_9z5ava$.get_za3rmp$(action)));
      }
    }, /** @lends _.KeyboardController */ {
      KeyboardController$f: function (isDown, this$KeyboardController) {
        return function (it) {
          isDown.add_za3rmp$(it.keyCode);
          this$KeyboardController.wasPressed_rsek04$.add_za3rmp$(it.keyCode);
          if (it.keyCode === _.KeyCodes.P) {
            this$KeyboardController.continuousMode_o0b3vn$ = !this$KeyboardController.continuousMode_o0b3vn$;
            this$KeyboardController.wasPressed_rsek04$.clear();
          }
        };
      },
      KeyboardController$f_0: function (isDown) {
        return function (it) {
          isDown.remove_za3rmp$(it.keyCode);
        };
      },
      checkHold$f: function (this$KeyboardController) {
        return function (it) {
          return this$KeyboardController.isDown_spu85l$.contains_za3rmp$(it);
        };
      }
    }),
    main$f: function () {
      new _.Game(Kotlin.modules['stdlib'].kotlin.listOf_9mqe4v$([new _.KeyboardController(window)]));
    },
    main: function (args) {
      window.onload = _.main$f;
    },
    UndoAction: Kotlin.createTrait(null),
    UndoRemoveSnowman: Kotlin.createClass(function () {
      return [_.UndoAction];
    }, function (snowman, consumer) {
      this.snowman = snowman;
      this.consumer = consumer;
    }),
    UndoMoveCharacter: Kotlin.createClass(function () {
      return [_.UndoAction];
    }, function (character, position) {
      this.character = character;
      this.position = position;
    }),
    UndoExtendSnowball: Kotlin.createClass(function () {
      return [_.UndoAction];
    }, function (snowman, snowSource) {
      this.snowman = snowman;
      this.snowSource = snowSource;
    })
  });
  Kotlin.defineModule('LD31', _);
  _.main([]);
}(Kotlin));