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
    this.KeyCodes = Kotlin.createObject(null, function () {
      this.Space = 32;
      this.Left = 37;
      this.Up = 38;
      this.Right = 39;
      this.Down = 40;
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
      isPassable_1: function (tileX, tileY) {
        return tileX >= 0 && tileX < this.width && tileY >= 0 && tileY < this.height && this.grid[tileY * this.width + tileX] <= 0;
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
      update_1: function ($receiver) {
        var tmp$0, tmp$1;
        if (!Kotlin.equals($receiver.currentTile, $receiver.targetTile)) {
          $receiver.shift += 0.08;
          if ($receiver.shift >= 1.0) {
            $receiver.currentTile = $receiver.targetTile;
            $receiver.shift -= 1.0;
          }
        }
         else if (!$receiver.direction.equals_za3rmp$(_.Direction.object.None)) {
          var target = $receiver.currentTile.plus($receiver.direction);
          var snowmanTarget = target.plus($receiver.direction);
          if ($receiver.isRolling) {
            var existingSnowman = this.findSnowman(target);
            var targetSnowman = this.findSnowman(snowmanTarget);
            var existingSize = existingSnowman != null ? existingSnowman.partSizes[0] : 0;
            var newSize = existingSize + (this.hasSnow(target) ? 1 : 0);
            var canRoll = targetSnowman != null && targetSnowman.hasPlaceFor(existingSize) || this.canMoveTo(snowmanTarget);
            var removeSnow = targetSnowman == null || targetSnowman.hasPlaceFor(newSize);
            if (existingSnowman == null) {
              if (this.canMoveTo(target)) {
                if (this.hasSnow($receiver.currentTile)) {
                  this.createSnowman($receiver.currentTile).targetTile = target;
                  this.snowmenChanged = true;
                  this.removeSnow($receiver.currentTile);
                }
                 else {
                  $receiver.targetTile = target;
                }
              }
            }
             else if (canRoll && existingSnowman.isRollable) {
              existingSnowman.targetTile = snowmanTarget;
              if (this.hasSnow(target) && removeSnow && existingSnowman.partSizes[0] < _.Snowman.object.MaxSize) {
                tmp$0 = existingSnowman.partSizes, tmp$1 = 0, tmp$0[tmp$1] = tmp$0[tmp$1] + 1, tmp$0[tmp$1];
                this.snowmenChanged = true;
                this.removeSnow(target);
              }
              $receiver.targetTile = target;
            }
             else if (this.hasSnow($receiver.currentTile) && existingSnowman.hasPlaceFor(0)) {
              this.createSnowman($receiver.currentTile).targetTile = target;
              this.snowmenChanged = true;
              this.removeSnow($receiver.currentTile);
            }
          }
           else if (this.canMoveTo(target)) {
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
      var tmp$0, tmp$1, tmp$2, tmp$3, tmp$4;
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
      this.charSprites = new Kotlin.ArrayList();
      this.snowSprites = new Kotlin.ArrayList();
      this.texture = PIXI.BaseTexture.fromImage('images/tiles.png', false);
      this.tiles = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
      tmp$0 = 5;
      for (var i = 0; i <= tmp$0; i++) {
        var x = i % 2 * this.tileSize;
        var y = (i / 2 | 0) * this.tileSize;
        var texture = new PIXI.Texture(this.texture, new PIXI.Rectangle(x, y, this.tileSize, this.tileSize));
        this.tiles.add_za3rmp$(texture);
      }
      document.getElementById('game').appendChild(this.renderer.view);
      Kotlin.modules['stdlib'].kotlin.with_dbz3ex$(this.background, _.Game.Game$f(this));
      this.updateSnow();
      this.stage.addChild(this.snow);
      this.updateGoals();
      this.stage.addChild(this.goals);
      tmp$1 = Kotlin.modules['stdlib'].kotlin.get_indices_4m3c68$(this.controllers), tmp$2 = tmp$1.start, tmp$3 = tmp$1.end, tmp$4 = tmp$1.increment;
      for (var i_0 = tmp$2; i_0 <= tmp$3; i_0 += tmp$4) {
        this.level.characters.add_za3rmp$(new _.Character(_.spawnPoints.get_za3lpa$(i_0)));
      }
      Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(this.level.characters, _.Game.Game$f_0(this));
      Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(this.level.snowmen, _.Game.Game$f_1(this));
      window.requestAnimationFrame(_.Game.Game$f_2(this));
    }, /** @lends _.Game.prototype */ {
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
          this.snowSprites.add_za3rmp$(sprite);
          this.stage.addChild(sprite);
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
          this.snowSprites.add_za3rmp$(sprites);
          this.stage.addChild(sprites);
        }
      },
      addCharSprite: function () {
        var sprite = this.createSprite_1(0, 0, this.tiles.get_za3lpa$(5));
        sprite.pivot = new PIXI.Point(this.tileSize / 2 | 0, this.tileSize / 2 | 0);
        this.charSprites.add_za3rmp$(sprite);
        this.stage.addChild(sprite);
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
      update: function () {
        var tmp$1, tmp$3, tmp$4, tmp$5, tmp$6, tmp$8, tmp$9;
        if (this.level.snowChanged) {
          this.updateSnow();
          this.level.snowChanged = false;
        }
        if (this.level.snowmenChanged) {
          Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(this.snowSprites, _.Game.update$f(this));
          this.snowSprites.clear();
          Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(this.level.snowmen, _.Game.update$f_0(this));
          this.level.snowmenChanged = false;
          this.checkWin();
        }
        tmp$1 = Kotlin.modules['stdlib'].kotlin.zip_84aay$(this.level.characters, this.controllers).iterator();
        while (tmp$1.hasNext()) {
          var tmp$0 = tmp$1.next()
          , char = tmp$0.component1()
          , controller = tmp$0.component2();
          Kotlin.modules['stdlib'].kotlin.with_dbz3ex$(char, _.Game.update$f_1(controller));
        }
        this.level.update();
        tmp$3 = Kotlin.modules['stdlib'].kotlin.zip_84aay$(this.level.characters, this.charSprites).iterator();
        while (tmp$3.hasNext()) {
          var tmp$2 = tmp$3.next()
          , c = tmp$2.component1()
          , sprite = tmp$2.component2();
          var x = this.lerpTile(c.currentTile.x, c.targetTile.x, c.shift);
          var y = this.lerpTile(c.currentTile.y, c.targetTile.y, c.shift);
          sprite.position = new PIXI.Point(x + this.tileSize + (this.tileSize / 2 | 0), y + this.tileSize + (this.tileSize / 2 | 0));
          tmp$6 = sprite;
          tmp$4 = c.moveDirection;
          if (tmp$4 === _.Direction.object.Down)
            tmp$5 = Math.PI;
          else if (tmp$4 === _.Direction.object.Right)
            tmp$5 = -Math.PI / 2;
          else if (tmp$4 === _.Direction.object.Up)
            tmp$5 = 0.0;
          else if (tmp$4 === _.Direction.object.Left)
            tmp$5 = Math.PI / 2;
          else
            tmp$5 = sprite.rotation;
          tmp$6.rotation = tmp$5;
        }
        tmp$8 = Kotlin.modules['stdlib'].kotlin.sortBy_cvgzri$(Kotlin.modules['stdlib'].kotlin.zip_84aay$(this.level.snowmen, this.snowSprites), _.Game.update$f_2);
        tmp$9 = tmp$8.iterator();
        while (tmp$9.hasNext()) {
          var tmp$7 = tmp$9.next()
          , s = tmp$7.component1()
          , sprite_0 = tmp$7.component2();
          var x_0 = this.lerpTile(s.currentTile.x, s.targetTile.x, s.shift);
          var y_0 = this.lerpTile(s.currentTile.y, s.targetTile.y, s.shift);
          sprite_0.position = new PIXI.Point(x_0 + this.tileSize, y_0 + this.tileSize);
        }
        this.renderer.render(this.stage);
        window.requestAnimationFrame(_.Game.update$f_3(this));
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
        return function (it) {
          this$Game.addCharSprite();
        };
      },
      Game$f_1: function (this$Game) {
        return function (it) {
          this$Game.addSnowSprite(it);
        };
      },
      Game$f_2: function (this$Game) {
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
      update$f: function (this$Game) {
        return function (it) {
          this$Game.stage.removeChild(it);
        };
      },
      update$f_0: function (this$Game) {
        return function (it) {
          this$Game.addSnowSprite(it);
        };
      },
      update$f_1: function (controller) {
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
      update$f_2: function (it) {
        return -it.first.partsCount;
      },
      update$f_3: function (this$Game) {
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
        Roll: new _.ControllerAction()
      };
    }),
    Controller: Kotlin.createTrait(null),
    KeyboardController: Kotlin.createClass(function () {
      return [_.Controller];
    }, function (window) {
      this.keys = Kotlin.modules['stdlib'].kotlin.mapOf_eoa9s7$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$(_.ControllerAction.object.Up, _.KeyCodes.Down), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(_.ControllerAction.object.Left, _.KeyCodes.Left), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(_.ControllerAction.object.Down, _.KeyCodes.Up), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(_.ControllerAction.object.Right, _.KeyCodes.Right), Kotlin.modules['stdlib'].kotlin.to_l1ob02$(_.ControllerAction.object.Roll, _.KeyCodes.Space)]);
      this.isPressed = Kotlin.modules['stdlib'].kotlin.hashMapOf_eoa9s7$([]);
      var isPressed = this.isPressed;
      window.onkeydown = _.KeyboardController.KeyboardController$f(isPressed);
      window.onkeyup = _.KeyboardController.KeyboardController$f_0(isPressed);
    }, /** @lends _.KeyboardController.prototype */ {
      isActive_k8o7am$: function (action) {
        var tmp$0;
        if (Kotlin.modules['stdlib'].kotlin.contains_qbyksu$(this.keys, action))
          tmp$0 = Kotlin.modules['stdlib'].kotlin.getOrElse_lphkgk$(this.isPressed, this.keys.get_za3rmp$(action), _.KeyboardController.isActive_k8o7am$f);
        else
          tmp$0 = false;
        return tmp$0;
      }
    }, /** @lends _.KeyboardController */ {
      KeyboardController$f: function (isPressed) {
        return function (it) {
          Kotlin.modules['stdlib'].kotlin.plusAssign_86ee4c$(isPressed, new Kotlin.modules['stdlib'].kotlin.Pair(it.keyCode, true));
        };
      },
      KeyboardController$f_0: function (isPressed) {
        return function (it) {
          Kotlin.modules['stdlib'].kotlin.plusAssign_86ee4c$(isPressed, new Kotlin.modules['stdlib'].kotlin.Pair(it.keyCode, false));
        };
      },
      isActive_k8o7am$f: function () {
        return false;
      }
    }),
    main$f: function () {
      new _.Game(Kotlin.modules['stdlib'].kotlin.listOf_9mqe4v$([new _.KeyboardController(window)]));
    },
    main: function (args) {
      window.onload = _.main$f;
    }
  });
  Kotlin.defineModule('LD31', _);
  _.main([]);
}(Kotlin));
