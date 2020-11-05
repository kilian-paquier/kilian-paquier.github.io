var $localize = Object.assign(void 0 === $localize ? {} : $localize, { locale: 'en' });
('use strict');
(function (global) {
	global.ng = global.ng || {};
	global.ng.common = global.ng.common || {};
	global.ng.common.locales = global.ng.common.locales || {};
	const u = undefined;
	function plural(n) {
		let i = Math.floor(Math.abs(n)),
			v = n.toString().replace(/^[^.]*\.?/, '').length;
		if (i === 1 && v === 0) return 1;
		return 5;
	}
	global.ng.common.locales['en'] = [
		'en',
		[['a', 'p'], ['AM', 'PM'], u],
		[['AM', 'PM'], u, u],
		[
			['S', 'M', 'T', 'W', 'T', 'F', 'S'],
			['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		],
		u,
		[
			['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
			['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			[
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			],
		],
		u,
		[
			['B', 'A'],
			['BC', 'AD'],
			['Before Christ', 'Anno Domini'],
		],
		0,
		[6, 0],
		['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
		['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
		['{1}, {0}', u, "{1} 'at' {0}", u],
		['.', ',', ';', '%', '+', '-', 'E', '\xD7', '\u2030', '\u221E', 'NaN', ':'],
		['#,##0.###', '#,##0%', '\xA4#,##0.00', '#E0'],
		'USD',
		'$',
		'US Dollar',
		{},
		'ltr',
		plural,
		[
			[
				['mi', 'n', 'in the morning', 'in the afternoon', 'in the evening', 'at night'],
				['midnight', 'noon', 'in the morning', 'in the afternoon', 'in the evening', 'at night'],
				u,
			],
			[['midnight', 'noon', 'morning', 'afternoon', 'evening', 'night'], u, u],
			['00:00', '12:00', ['06:00', '12:00'], ['12:00', '18:00'], ['18:00', '21:00'], ['21:00', '06:00']],
		],
	];
})(
	(typeof globalThis !== 'undefined' && globalThis) ||
		(typeof global !== 'undefined' && global) ||
		(typeof window !== 'undefined' && window)
);
(window.webpackJsonp = window.webpackJsonp || []).push([
	[1],
	{
		0: function (t, e, n) {
			t.exports = n('zUnb');
		},
		zUnb: function (t, e, n) {
			'use strict';
			function i(t) {
				return 'function' == typeof t;
			}
			n.r(e);
			let s = !1;
			const r = {
				Promise: void 0,
				set useDeprecatedSynchronousErrorHandling(t) {
					if (t) {
						const t = new Error();
						console.warn(
							'DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' +
								t.stack
						);
					} else s && console.log('RxJS: Back to a better error behavior. Thank you. <3');
					s = t;
				},
				get useDeprecatedSynchronousErrorHandling() {
					return s;
				},
			};
			function o(t) {
				setTimeout(() => {
					throw t;
				}, 0);
			}
			const a = {
					closed: !0,
					next(t) {},
					error(t) {
						if (r.useDeprecatedSynchronousErrorHandling) throw t;
						o(t);
					},
					complete() {},
				},
				l = (() => Array.isArray || (t => t && 'number' == typeof t.length))();
			function c(t) {
				return null !== t && 'object' == typeof t;
			}
			const u = (() => {
				function t(t) {
					return (
						Error.call(this),
						(this.message = t
							? `${t.length} errors occurred during unsubscription:\n${t
									.map((t, e) => `${e + 1}) ${t.toString()}`)
									.join('\n  ')}`
							: ''),
						(this.name = 'UnsubscriptionError'),
						(this.errors = t),
						this
					);
				}
				return (t.prototype = Object.create(Error.prototype)), t;
			})();
			let h = (() => {
				class t {
					constructor(t) {
						(this.closed = !1),
							(this._parentOrParents = null),
							(this._subscriptions = null),
							t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
					}
					unsubscribe() {
						let e;
						if (this.closed) return;
						let { _parentOrParents: n, _ctorUnsubscribe: s, _unsubscribe: r, _subscriptions: o } = this;
						if (
							((this.closed = !0),
							(this._parentOrParents = null),
							(this._subscriptions = null),
							n instanceof t)
						)
							n.remove(this);
						else if (null !== n) for (let t = 0; t < n.length; ++t) n[t].remove(this);
						if (i(r)) {
							s && (this._unsubscribe = void 0);
							try {
								r.call(this);
							} catch (a) {
								e = a instanceof u ? d(a.errors) : [a];
							}
						}
						if (l(o)) {
							let t = -1,
								n = o.length;
							for (; ++t < n; ) {
								const n = o[t];
								if (c(n))
									try {
										n.unsubscribe();
									} catch (a) {
										(e = e || []), a instanceof u ? (e = e.concat(d(a.errors))) : e.push(a);
									}
							}
						}
						if (e) throw new u(e);
					}
					add(e) {
						let n = e;
						if (!e) return t.EMPTY;
						switch (typeof e) {
							case 'function':
								n = new t(e);
							case 'object':
								if (n === this || n.closed || 'function' != typeof n.unsubscribe) return n;
								if (this.closed) return n.unsubscribe(), n;
								if (!(n instanceof t)) {
									const e = n;
									(n = new t()), (n._subscriptions = [e]);
								}
								break;
							default:
								throw new Error('unrecognized teardown ' + e + ' added to Subscription.');
						}
						let { _parentOrParents: i } = n;
						if (null === i) n._parentOrParents = this;
						else if (i instanceof t) {
							if (i === this) return n;
							n._parentOrParents = [i, this];
						} else {
							if (-1 !== i.indexOf(this)) return n;
							i.push(this);
						}
						const s = this._subscriptions;
						return null === s ? (this._subscriptions = [n]) : s.push(n), n;
					}
					remove(t) {
						const e = this._subscriptions;
						if (e) {
							const n = e.indexOf(t);
							-1 !== n && e.splice(n, 1);
						}
					}
				}
				return (
					(t.EMPTY = (function (t) {
						return (t.closed = !0), t;
					})(new t())),
					t
				);
			})();
			function d(t) {
				return t.reduce((t, e) => t.concat(e instanceof u ? e.errors : e), []);
			}
			const p = (() =>
				'function' == typeof Symbol ? Symbol('rxSubscriber') : '@@rxSubscriber_' + Math.random())();
			class f extends h {
				constructor(t, e, n) {
					switch (
						(super(),
						(this.syncErrorValue = null),
						(this.syncErrorThrown = !1),
						(this.syncErrorThrowable = !1),
						(this.isStopped = !1),
						arguments.length)
					) {
						case 0:
							this.destination = a;
							break;
						case 1:
							if (!t) {
								this.destination = a;
								break;
							}
							if ('object' == typeof t) {
								t instanceof f
									? ((this.syncErrorThrowable = t.syncErrorThrowable),
									  (this.destination = t),
									  t.add(this))
									: ((this.syncErrorThrowable = !0), (this.destination = new m(this, t)));
								break;
							}
						default:
							(this.syncErrorThrowable = !0), (this.destination = new m(this, t, e, n));
					}
				}
				[p]() {
					return this;
				}
				static create(t, e, n) {
					const i = new f(t, e, n);
					return (i.syncErrorThrowable = !1), i;
				}
				next(t) {
					this.isStopped || this._next(t);
				}
				error(t) {
					this.isStopped || ((this.isStopped = !0), this._error(t));
				}
				complete() {
					this.isStopped || ((this.isStopped = !0), this._complete());
				}
				unsubscribe() {
					this.closed || ((this.isStopped = !0), super.unsubscribe());
				}
				_next(t) {
					this.destination.next(t);
				}
				_error(t) {
					this.destination.error(t), this.unsubscribe();
				}
				_complete() {
					this.destination.complete(), this.unsubscribe();
				}
				_unsubscribeAndRecycle() {
					const { _parentOrParents: t } = this;
					return (
						(this._parentOrParents = null),
						this.unsubscribe(),
						(this.closed = !1),
						(this.isStopped = !1),
						(this._parentOrParents = t),
						this
					);
				}
			}
			class m extends f {
				constructor(t, e, n, s) {
					let r;
					super(), (this._parentSubscriber = t);
					let o = this;
					i(e)
						? (r = e)
						: e &&
						  ((r = e.next),
						  (n = e.error),
						  (s = e.complete),
						  e !== a &&
								((o = Object.create(e)),
								i(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
								(o.unsubscribe = this.unsubscribe.bind(this)))),
						(this._context = o),
						(this._next = r),
						(this._error = n),
						(this._complete = s);
				}
				next(t) {
					if (!this.isStopped && this._next) {
						const { _parentSubscriber: e } = this;
						r.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
							? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
							: this.__tryOrUnsub(this._next, t);
					}
				}
				error(t) {
					if (!this.isStopped) {
						const { _parentSubscriber: e } = this,
							{ useDeprecatedSynchronousErrorHandling: n } = r;
						if (this._error)
							n && e.syncErrorThrowable
								? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
								: (this.__tryOrUnsub(this._error, t), this.unsubscribe());
						else if (e.syncErrorThrowable)
							n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : o(t), this.unsubscribe();
						else {
							if ((this.unsubscribe(), n)) throw t;
							o(t);
						}
					}
				}
				complete() {
					if (!this.isStopped) {
						const { _parentSubscriber: t } = this;
						if (this._complete) {
							const e = () => this._complete.call(this._context);
							r.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
								? (this.__tryOrSetError(t, e), this.unsubscribe())
								: (this.__tryOrUnsub(e), this.unsubscribe());
						} else this.unsubscribe();
					}
				}
				__tryOrUnsub(t, e) {
					try {
						t.call(this._context, e);
					} catch (n) {
						if ((this.unsubscribe(), r.useDeprecatedSynchronousErrorHandling)) throw n;
						o(n);
					}
				}
				__tryOrSetError(t, e, n) {
					if (!r.useDeprecatedSynchronousErrorHandling) throw new Error('bad call');
					try {
						e.call(this._context, n);
					} catch (i) {
						return r.useDeprecatedSynchronousErrorHandling
							? ((t.syncErrorValue = i), (t.syncErrorThrown = !0), !0)
							: (o(i), !0);
					}
					return !1;
				}
				_unsubscribe() {
					const { _parentSubscriber: t } = this;
					(this._context = null), (this._parentSubscriber = null), t.unsubscribe();
				}
			}
			const g = (() => ('function' == typeof Symbol && Symbol.observable) || '@@observable')();
			function y(t) {
				return t;
			}
			let _ = (() => {
				class t {
					constructor(t) {
						(this._isScalar = !1), t && (this._subscribe = t);
					}
					lift(e) {
						const n = new t();
						return (n.source = this), (n.operator = e), n;
					}
					subscribe(t, e, n) {
						const { operator: i } = this,
							s = (function (t, e, n) {
								if (t) {
									if (t instanceof f) return t;
									if (t[p]) return t[p]();
								}
								return t || e || n ? new f(t, e, n) : new f(a);
							})(t, e, n);
						if (
							(s.add(
								i
									? i.call(s, this.source)
									: this.source || (r.useDeprecatedSynchronousErrorHandling && !s.syncErrorThrowable)
									? this._subscribe(s)
									: this._trySubscribe(s)
							),
							r.useDeprecatedSynchronousErrorHandling &&
								s.syncErrorThrowable &&
								((s.syncErrorThrowable = !1), s.syncErrorThrown))
						)
							throw s.syncErrorValue;
						return s;
					}
					_trySubscribe(t) {
						try {
							return this._subscribe(t);
						} catch (e) {
							r.useDeprecatedSynchronousErrorHandling &&
								((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
								(function (t) {
									for (; t; ) {
										const { closed: e, destination: n, isStopped: i } = t;
										if (e || i) return !1;
										t = n && n instanceof f ? n : null;
									}
									return !0;
								})(t)
									? t.error(e)
									: console.warn(e);
						}
					}
					forEach(t, e) {
						return new (e = v(e))((e, n) => {
							let i;
							i = this.subscribe(
								e => {
									try {
										t(e);
									} catch (s) {
										n(s), i && i.unsubscribe();
									}
								},
								n,
								e
							);
						});
					}
					_subscribe(t) {
						const { source: e } = this;
						return e && e.subscribe(t);
					}
					[g]() {
						return this;
					}
					pipe(...t) {
						return 0 === t.length
							? this
							: (0 === (e = t).length
									? y
									: 1 === e.length
									? e[0]
									: function (t) {
											return e.reduce((t, e) => e(t), t);
									  })(this);
						var e;
					}
					toPromise(t) {
						return new (t = v(t))((t, e) => {
							let n;
							this.subscribe(
								t => (n = t),
								t => e(t),
								() => t(n)
							);
						});
					}
				}
				return (t.create = e => new t(e)), t;
			})();
			function v(t) {
				if ((t || (t = r.Promise || Promise), !t)) throw new Error('no Promise impl found');
				return t;
			}
			const b = (() => {
				function t() {
					return (
						Error.call(this),
						(this.message = 'object unsubscribed'),
						(this.name = 'ObjectUnsubscribedError'),
						this
					);
				}
				return (t.prototype = Object.create(Error.prototype)), t;
			})();
			class w extends h {
				constructor(t, e) {
					super(), (this.subject = t), (this.subscriber = e), (this.closed = !1);
				}
				unsubscribe() {
					if (this.closed) return;
					this.closed = !0;
					const t = this.subject,
						e = t.observers;
					if (((this.subject = null), !e || 0 === e.length || t.isStopped || t.closed)) return;
					const n = e.indexOf(this.subscriber);
					-1 !== n && e.splice(n, 1);
				}
			}
			class x extends f {
				constructor(t) {
					super(t), (this.destination = t);
				}
			}
			let S = (() => {
				class t extends _ {
					constructor() {
						super(),
							(this.observers = []),
							(this.closed = !1),
							(this.isStopped = !1),
							(this.hasError = !1),
							(this.thrownError = null);
					}
					[p]() {
						return new x(this);
					}
					lift(t) {
						const e = new E(this, this);
						return (e.operator = t), e;
					}
					next(t) {
						if (this.closed) throw new b();
						if (!this.isStopped) {
							const { observers: e } = this,
								n = e.length,
								i = e.slice();
							for (let s = 0; s < n; s++) i[s].next(t);
						}
					}
					error(t) {
						if (this.closed) throw new b();
						(this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
						const { observers: e } = this,
							n = e.length,
							i = e.slice();
						for (let s = 0; s < n; s++) i[s].error(t);
						this.observers.length = 0;
					}
					complete() {
						if (this.closed) throw new b();
						this.isStopped = !0;
						const { observers: t } = this,
							e = t.length,
							n = t.slice();
						for (let i = 0; i < e; i++) n[i].complete();
						this.observers.length = 0;
					}
					unsubscribe() {
						(this.isStopped = !0), (this.closed = !0), (this.observers = null);
					}
					_trySubscribe(t) {
						if (this.closed) throw new b();
						return super._trySubscribe(t);
					}
					_subscribe(t) {
						if (this.closed) throw new b();
						return this.hasError
							? (t.error(this.thrownError), h.EMPTY)
							: this.isStopped
							? (t.complete(), h.EMPTY)
							: (this.observers.push(t), new w(this, t));
					}
					asObservable() {
						const t = new _();
						return (t.source = this), t;
					}
				}
				return (t.create = (t, e) => new E(t, e)), t;
			})();
			class E extends S {
				constructor(t, e) {
					super(), (this.destination = t), (this.source = e);
				}
				next(t) {
					const { destination: e } = this;
					e && e.next && e.next(t);
				}
				error(t) {
					const { destination: e } = this;
					e && e.error && this.destination.error(t);
				}
				complete() {
					const { destination: t } = this;
					t && t.complete && this.destination.complete();
				}
				_subscribe(t) {
					const { source: e } = this;
					return e ? this.source.subscribe(t) : h.EMPTY;
				}
			}
			function C(t) {
				return t && 'function' == typeof t.schedule;
			}
			function k(t, e) {
				return function (n) {
					if ('function' != typeof t)
						throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
					return n.lift(new T(t, e));
				};
			}
			class T {
				constructor(t, e) {
					(this.project = t), (this.thisArg = e);
				}
				call(t, e) {
					return e.subscribe(new A(t, this.project, this.thisArg));
				}
			}
			class A extends f {
				constructor(t, e, n) {
					super(t), (this.project = e), (this.count = 0), (this.thisArg = n || this);
				}
				_next(t) {
					let e;
					try {
						e = this.project.call(this.thisArg, t, this.count++);
					} catch (n) {
						return void this.destination.error(n);
					}
					this.destination.next(e);
				}
			}
			const I = t => e => {
				for (let n = 0, i = t.length; n < i && !e.closed; n++) e.next(t[n]);
				e.complete();
			};
			function O() {
				return 'function' == typeof Symbol && Symbol.iterator ? Symbol.iterator : '@@iterator';
			}
			const R = O(),
				P = t => t && 'number' == typeof t.length && 'function' != typeof t;
			function L(t) {
				return !!t && 'function' != typeof t.subscribe && 'function' == typeof t.then;
			}
			const N = t => {
				if (t && 'function' == typeof t[g])
					return (
						(i = t),
						t => {
							const e = i[g]();
							if ('function' != typeof e.subscribe)
								throw new TypeError('Provided object does not correctly implement Symbol.observable');
							return e.subscribe(t);
						}
					);
				if (P(t)) return I(t);
				if (L(t))
					return (
						(n = t),
						t => (
							n
								.then(
									e => {
										t.closed || (t.next(e), t.complete());
									},
									e => t.error(e)
								)
								.then(null, o),
							t
						)
					);
				if (t && 'function' == typeof t[R])
					return (
						(e = t),
						t => {
							const n = e[R]();
							for (;;) {
								let e;
								try {
									e = n.next();
								} catch (i) {
									return t.error(i), t;
								}
								if (e.done) {
									t.complete();
									break;
								}
								if ((t.next(e.value), t.closed)) break;
							}
							return (
								'function' == typeof n.return &&
									t.add(() => {
										n.return && n.return();
									}),
								t
							);
						}
					);
				{
					const e = c(t) ? 'an invalid object' : `'${t}'`;
					throw new TypeError(
						`You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
					);
				}
				var e, n, i;
			};
			function D(t, e) {
				return new _(n => {
					const i = new h();
					let s = 0;
					return (
						i.add(
							e.schedule(function () {
								s !== t.length ? (n.next(t[s++]), n.closed || i.add(this.schedule())) : n.complete();
							})
						),
						i
					);
				});
			}
			function M(t, e) {
				return e
					? (function (t, e) {
							if (null != t) {
								if (
									(function (t) {
										return t && 'function' == typeof t[g];
									})(t)
								)
									return (function (t, e) {
										return new _(n => {
											const i = new h();
											return (
												i.add(
													e.schedule(() => {
														const s = t[g]();
														i.add(
															s.subscribe({
																next(t) {
																	i.add(e.schedule(() => n.next(t)));
																},
																error(t) {
																	i.add(e.schedule(() => n.error(t)));
																},
																complete() {
																	i.add(e.schedule(() => n.complete()));
																},
															})
														);
													})
												),
												i
											);
										});
									})(t, e);
								if (L(t))
									return (function (t, e) {
										return new _(n => {
											const i = new h();
											return (
												i.add(
													e.schedule(() =>
														t.then(
															t => {
																i.add(
																	e.schedule(() => {
																		n.next(t),
																			i.add(e.schedule(() => n.complete()));
																	})
																);
															},
															t => {
																i.add(e.schedule(() => n.error(t)));
															}
														)
													)
												),
												i
											);
										});
									})(t, e);
								if (P(t)) return D(t, e);
								if (
									(function (t) {
										return t && 'function' == typeof t[R];
									})(t) ||
									'string' == typeof t
								)
									return (function (t, e) {
										if (!t) throw new Error('Iterable cannot be null');
										return new _(n => {
											const i = new h();
											let s;
											return (
												i.add(() => {
													s && 'function' == typeof s.return && s.return();
												}),
												i.add(
													e.schedule(() => {
														(s = t[R]()),
															i.add(
																e.schedule(function () {
																	if (n.closed) return;
																	let t, e;
																	try {
																		const n = s.next();
																		(t = n.value), (e = n.done);
																	} catch (i) {
																		return void n.error(i);
																	}
																	e ? n.complete() : (n.next(t), this.schedule());
																})
															);
													})
												),
												i
											);
										});
									})(t, e);
							}
							throw new TypeError(((null !== t && typeof t) || t) + ' is not observable');
					  })(t, e)
					: t instanceof _
					? t
					: new _(N(t));
			}
			class F extends f {
				constructor(t) {
					super(), (this.parent = t);
				}
				_next(t) {
					this.parent.notifyNext(t);
				}
				_error(t) {
					this.parent.notifyError(t), this.unsubscribe();
				}
				_complete() {
					this.parent.notifyComplete(), this.unsubscribe();
				}
			}
			class j extends f {
				notifyNext(t) {
					this.destination.next(t);
				}
				notifyError(t) {
					this.destination.error(t);
				}
				notifyComplete() {
					this.destination.complete();
				}
			}
			function B(t, e) {
				if (!e.closed) return t instanceof _ ? t.subscribe(e) : N(t)(e);
			}
			function z(t, e, n = Number.POSITIVE_INFINITY) {
				return 'function' == typeof e
					? i => i.pipe(z((n, i) => M(t(n, i)).pipe(k((t, s) => e(n, t, i, s))), n))
					: ('number' == typeof e && (n = e), e => e.lift(new V(t, n)));
			}
			class V {
				constructor(t, e = Number.POSITIVE_INFINITY) {
					(this.project = t), (this.concurrent = e);
				}
				call(t, e) {
					return e.subscribe(new U(t, this.project, this.concurrent));
				}
			}
			class U extends j {
				constructor(t, e, n = Number.POSITIVE_INFINITY) {
					super(t),
						(this.project = e),
						(this.concurrent = n),
						(this.hasCompleted = !1),
						(this.buffer = []),
						(this.active = 0),
						(this.index = 0);
				}
				_next(t) {
					this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t);
				}
				_tryNext(t) {
					let e;
					const n = this.index++;
					try {
						e = this.project(t, n);
					} catch (i) {
						return void this.destination.error(i);
					}
					this.active++, this._innerSub(e);
				}
				_innerSub(t) {
					const e = new F(this),
						n = this.destination;
					n.add(e);
					const i = B(t, e);
					i !== e && n.add(i);
				}
				_complete() {
					(this.hasCompleted = !0),
						0 === this.active && 0 === this.buffer.length && this.destination.complete(),
						this.unsubscribe();
				}
				notifyNext(t) {
					this.destination.next(t);
				}
				notifyComplete() {
					const t = this.buffer;
					this.active--,
						t.length > 0
							? this._next(t.shift())
							: 0 === this.active && this.hasCompleted && this.destination.complete();
				}
			}
			function H(t = Number.POSITIVE_INFINITY) {
				return z(y, t);
			}
			function q(t, e) {
				return e ? D(t, e) : new _(I(t));
			}
			function W(...t) {
				let e = Number.POSITIVE_INFINITY,
					n = null,
					i = t[t.length - 1];
				return (
					C(i)
						? ((n = t.pop()), t.length > 1 && 'number' == typeof t[t.length - 1] && (e = t.pop()))
						: 'number' == typeof i && (e = t.pop()),
					null === n && 1 === t.length && t[0] instanceof _ ? t[0] : H(e)(q(t, n))
				);
			}
			function Q() {
				return function (t) {
					return t.lift(new Z(t));
				};
			}
			class Z {
				constructor(t) {
					this.connectable = t;
				}
				call(t, e) {
					const { connectable: n } = this;
					n._refCount++;
					const i = new G(t, n),
						s = e.subscribe(i);
					return i.closed || (i.connection = n.connect()), s;
				}
			}
			class G extends f {
				constructor(t, e) {
					super(t), (this.connectable = e);
				}
				_unsubscribe() {
					const { connectable: t } = this;
					if (!t) return void (this.connection = null);
					this.connectable = null;
					const e = t._refCount;
					if (e <= 0) return void (this.connection = null);
					if (((t._refCount = e - 1), e > 1)) return void (this.connection = null);
					const { connection: n } = this,
						i = t._connection;
					(this.connection = null), !i || (n && i !== n) || i.unsubscribe();
				}
			}
			class K extends _ {
				constructor(t, e) {
					super(),
						(this.source = t),
						(this.subjectFactory = e),
						(this._refCount = 0),
						(this._isComplete = !1);
				}
				_subscribe(t) {
					return this.getSubject().subscribe(t);
				}
				getSubject() {
					const t = this._subject;
					return (t && !t.isStopped) || (this._subject = this.subjectFactory()), this._subject;
				}
				connect() {
					let t = this._connection;
					return (
						t ||
							((this._isComplete = !1),
							(t = this._connection = new h()),
							t.add(this.source.subscribe(new X(this.getSubject(), this))),
							t.closed && ((this._connection = null), (t = h.EMPTY))),
						t
					);
				}
				refCount() {
					return Q()(this);
				}
			}
			const Y = (() => {
				const t = K.prototype;
				return {
					operator: { value: null },
					_refCount: { value: 0, writable: !0 },
					_subject: { value: null, writable: !0 },
					_connection: { value: null, writable: !0 },
					_subscribe: { value: t._subscribe },
					_isComplete: { value: t._isComplete, writable: !0 },
					getSubject: { value: t.getSubject },
					connect: { value: t.connect },
					refCount: { value: t.refCount },
				};
			})();
			class X extends x {
				constructor(t, e) {
					super(t), (this.connectable = e);
				}
				_error(t) {
					this._unsubscribe(), super._error(t);
				}
				_complete() {
					(this.connectable._isComplete = !0), this._unsubscribe(), super._complete();
				}
				_unsubscribe() {
					const t = this.connectable;
					if (t) {
						this.connectable = null;
						const e = t._connection;
						(t._refCount = 0), (t._subject = null), (t._connection = null), e && e.unsubscribe();
					}
				}
			}
			function J() {
				return new S();
			}
			function tt() {
				return t => {
					return Q()(
						((e = J),
						function (t) {
							let n;
							n =
								'function' == typeof e
									? e
									: function () {
											return e;
									  };
							const i = Object.create(t, Y);
							return (i.source = t), (i.subjectFactory = n), i;
						})(t)
					);
					var e;
				};
			}
			function et(t) {
				return { toString: t }.toString();
			}
			const nt = '__parameters__';
			function it(t, e, n) {
				return et(() => {
					const i = (function (t) {
						return function (...e) {
							if (t) {
								const n = t(...e);
								for (const t in n) this[t] = n[t];
							}
						};
					})(e);
					function s(...t) {
						if (this instanceof s) return i.apply(this, t), this;
						const e = new s(...t);
						return (n.annotation = e), n;
						function n(t, n, i) {
							const s = t.hasOwnProperty(nt) ? t[nt] : Object.defineProperty(t, nt, { value: [] })[nt];
							for (; s.length <= i; ) s.push(null);
							return (s[i] = s[i] || []).push(e), t;
						}
					}
					return (
						n && (s.prototype = Object.create(n.prototype)),
						(s.prototype.ngMetadataName = t),
						(s.annotationCls = s),
						s
					);
				});
			}
			const st = it('Inject', t => ({ token: t })),
				rt = it('Optional'),
				ot = it('Self'),
				at = it('SkipSelf');
			var lt = (function (t) {
				return (
					(t[(t.Default = 0)] = 'Default'),
					(t[(t.Host = 1)] = 'Host'),
					(t[(t.Self = 2)] = 'Self'),
					(t[(t.SkipSelf = 4)] = 'SkipSelf'),
					(t[(t.Optional = 8)] = 'Optional'),
					t
				);
			})({});
			function ct(t) {
				for (let e in t) if (t[e] === ct) return e;
				throw Error('Could not find renamed property on target object.');
			}
			function ut(t, e) {
				for (const n in e) e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
			}
			function ht(t) {
				return { token: t.token, providedIn: t.providedIn || null, factory: t.factory, value: void 0 };
			}
			function dt(t) {
				return { factory: t.factory, providers: t.providers || [], imports: t.imports || [] };
			}
			function pt(t) {
				return ft(t, t[gt]) || ft(t, t[vt]);
			}
			function ft(t, e) {
				return e && e.token === t ? e : null;
			}
			function mt(t) {
				return t && (t.hasOwnProperty(yt) || t.hasOwnProperty(bt)) ? t[yt] : null;
			}
			const gt = ct({ '\u0275prov': ct }),
				yt = ct({ '\u0275inj': ct }),
				_t = ct({ '\u0275provFallback': ct }),
				vt = ct({ ngInjectableDef: ct }),
				bt = ct({ ngInjectorDef: ct });
			function wt(t) {
				if ('string' == typeof t) return t;
				if (Array.isArray(t)) return '[' + t.map(wt).join(', ') + ']';
				if (null == t) return '' + t;
				if (t.overriddenName) return '' + t.overriddenName;
				if (t.name) return '' + t.name;
				const e = t.toString();
				if (null == e) return '' + e;
				const n = e.indexOf('\n');
				return -1 === n ? e : e.substring(0, n);
			}
			function xt(t, e) {
				return null == t || '' === t ? (null === e ? '' : e) : null == e || '' === e ? t : t + ' ' + e;
			}
			const St = ct({ __forward_ref__: ct });
			function Et(t) {
				return (
					(t.__forward_ref__ = Et),
					(t.toString = function () {
						return wt(this());
					}),
					t
				);
			}
			function Ct(t) {
				return kt(t) ? t() : t;
			}
			function kt(t) {
				return 'function' == typeof t && t.hasOwnProperty(St) && t.__forward_ref__ === Et;
			}
			const Tt = 'undefined' != typeof globalThis && globalThis,
				At = 'undefined' != typeof window && window,
				It =
					'undefined' != typeof self &&
					'undefined' != typeof WorkerGlobalScope &&
					self instanceof WorkerGlobalScope &&
					self,
				Ot = 'undefined' != typeof global && global,
				Rt = Tt || Ot || At || It,
				Pt = ct({ '\u0275cmp': ct }),
				Lt = ct({ '\u0275dir': ct }),
				Nt = ct({ '\u0275pipe': ct }),
				Dt = ct({ '\u0275mod': ct }),
				Mt = ct({ '\u0275loc': ct }),
				Ft = ct({ '\u0275fac': ct }),
				jt = ct({ __NG_ELEMENT_ID__: ct });
			class Bt {
				constructor(t, e) {
					(this._desc = t),
						(this.ngMetadataName = 'InjectionToken'),
						(this.ɵprov = void 0),
						'number' == typeof e
							? (this.__NG_ELEMENT_ID__ = e)
							: void 0 !== e &&
							  (this.ɵprov = ht({
									token: this,
									providedIn: e.providedIn || 'root',
									factory: e.factory,
							  }));
				}
				toString() {
					return 'InjectionToken ' + this._desc;
				}
			}
			const zt = new Bt('INJECTOR', -1),
				Vt = {},
				Ut = /\n/gm,
				Ht = '__source',
				$t = ct({ provide: String, useValue: ct });
			let qt,
				Wt = void 0;
			function Qt(t) {
				const e = Wt;
				return (Wt = t), e;
			}
			function Zt(t) {
				const e = qt;
				return (qt = t), e;
			}
			function Gt(t, e = lt.Default) {
				if (void 0 === Wt) throw new Error('inject() must be called from an injection context');
				return null === Wt ? Xt(t, void 0, e) : Wt.get(t, e & lt.Optional ? null : void 0, e);
			}
			function Kt(t, e = lt.Default) {
				return (qt || Gt)(Ct(t), e);
			}
			const Yt = Kt;
			function Xt(t, e, n) {
				const i = pt(t);
				if (i && 'root' == i.providedIn) return void 0 === i.value ? (i.value = i.factory()) : i.value;
				if (n & lt.Optional) return null;
				if (void 0 !== e) return e;
				throw new Error(`Injector: NOT_FOUND [${wt(t)}]`);
			}
			function Jt(t) {
				const e = [];
				for (let n = 0; n < t.length; n++) {
					const i = Ct(t[n]);
					if (Array.isArray(i)) {
						if (0 === i.length) throw new Error('Arguments array must have arguments.');
						let t = void 0,
							n = lt.Default;
						for (let e = 0; e < i.length; e++) {
							const s = i[e];
							s instanceof rt || 'Optional' === s.ngMetadataName || s === rt
								? (n |= lt.Optional)
								: s instanceof at || 'SkipSelf' === s.ngMetadataName || s === at
								? (n |= lt.SkipSelf)
								: s instanceof ot || 'Self' === s.ngMetadataName || s === ot
								? (n |= lt.Self)
								: (t = s instanceof st || s === st ? s.token : s);
						}
						e.push(Kt(t, n));
					} else e.push(Kt(i));
				}
				return e;
			}
			class te {
				get(t, e = Vt) {
					if (e === Vt) {
						const e = new Error(`NullInjectorError: No provider for ${wt(t)}!`);
						throw ((e.name = 'NullInjectorError'), e);
					}
					return e;
				}
			}
			class ee {}
			class ne {}
			function ie(t, e) {
				for (let n = 0; n < t.length; n++) e.push(t[n]);
			}
			function se(t, e) {
				t.forEach(t => (Array.isArray(t) ? se(t, e) : e(t)));
			}
			function re(t, e, n) {
				e >= t.length ? t.push(n) : t.splice(e, 0, n);
			}
			function oe(t, e) {
				return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
			}
			function ae(t, e) {
				const n = [];
				for (let i = 0; i < t; i++) n.push(e);
				return n;
			}
			function le(t, e, n) {
				let i = ue(t, e);
				return (
					i >= 0
						? (t[1 | i] = n)
						: ((i = ~i),
						  (function (t, e, n, i) {
								let s = t.length;
								if (s == e) t.push(n, i);
								else if (1 === s) t.push(i, t[0]), (t[0] = n);
								else {
									for (s--, t.push(t[s - 1], t[s]); s > e; ) (t[s] = t[s - 2]), s--;
									(t[e] = n), (t[e + 1] = i);
								}
						  })(t, i, e, n)),
					i
				);
			}
			function ce(t, e) {
				const n = ue(t, e);
				if (n >= 0) return t[1 | n];
			}
			function ue(t, e) {
				return (function (t, e, n) {
					let i = 0,
						s = t.length >> 1;
					for (; s !== i; ) {
						const n = i + ((s - i) >> 1),
							r = t[n << 1];
						if (e === r) return n << 1;
						r > e ? (s = n) : (i = n + 1);
					}
					return ~(s << 1);
				})(t, e);
			}
			var he = (function (t) {
					return (t[(t.OnPush = 0)] = 'OnPush'), (t[(t.Default = 1)] = 'Default'), t;
				})({}),
				de = (function (t) {
					return (
						(t[(t.Emulated = 0)] = 'Emulated'),
						(t[(t.Native = 1)] = 'Native'),
						(t[(t.None = 2)] = 'None'),
						(t[(t.ShadowDom = 3)] = 'ShadowDom'),
						t
					);
				})({});
			const pe = {},
				fe = [];
			let me = 0;
			function ge(t) {
				return et(() => {
					const e = {},
						n = {
							type: t.type,
							providersResolver: null,
							decls: t.decls,
							vars: t.vars,
							factory: null,
							template: t.template || null,
							consts: t.consts || null,
							ngContentSelectors: t.ngContentSelectors,
							hostBindings: t.hostBindings || null,
							hostVars: t.hostVars || 0,
							hostAttrs: t.hostAttrs || null,
							contentQueries: t.contentQueries || null,
							declaredInputs: e,
							inputs: null,
							outputs: null,
							exportAs: t.exportAs || null,
							onPush: t.changeDetection === he.OnPush,
							directiveDefs: null,
							pipeDefs: null,
							selectors: t.selectors || fe,
							viewQuery: t.viewQuery || null,
							features: t.features || null,
							data: t.data || {},
							encapsulation: t.encapsulation || de.Emulated,
							id: 'c',
							styles: t.styles || fe,
							_: null,
							setInput: null,
							schemas: t.schemas || null,
							tView: null,
						},
						i = t.directives,
						s = t.features,
						r = t.pipes;
					return (
						(n.id += me++),
						(n.inputs = we(t.inputs, e)),
						(n.outputs = we(t.outputs)),
						s && s.forEach(t => t(n)),
						(n.directiveDefs = i ? () => ('function' == typeof i ? i() : i).map(ye) : null),
						(n.pipeDefs = r ? () => ('function' == typeof r ? r() : r).map(_e) : null),
						n
					);
				});
			}
			function ye(t) {
				return (
					Se(t) ||
					(function (t) {
						return t[Lt] || null;
					})(t)
				);
			}
			function _e(t) {
				return (function (t) {
					return t[Nt] || null;
				})(t);
			}
			const ve = {};
			function be(t) {
				const e = {
					type: t.type,
					bootstrap: t.bootstrap || fe,
					declarations: t.declarations || fe,
					imports: t.imports || fe,
					exports: t.exports || fe,
					transitiveCompileScopes: null,
					schemas: t.schemas || null,
					id: t.id || null,
				};
				return (
					null != t.id &&
						et(() => {
							ve[t.id] = t.type;
						}),
					e
				);
			}
			function we(t, e) {
				if (null == t) return pe;
				const n = {};
				for (const i in t)
					if (t.hasOwnProperty(i)) {
						let s = t[i],
							r = s;
						Array.isArray(s) && ((r = s[1]), (s = s[0])), (n[s] = i), e && (e[s] = r);
					}
				return n;
			}
			const xe = ge;
			function Se(t) {
				return t[Pt] || null;
			}
			function Ee(t, e) {
				return t.hasOwnProperty(Ft) ? t[Ft] : null;
			}
			function Ce(t, e) {
				const n = t[Dt] || null;
				if (!n && !0 === e) throw new Error(`Type ${wt(t)} does not have '\u0275mod' property.`);
				return n;
			}
			const ke = 20,
				Te = 10;
			function Ae(t) {
				return Array.isArray(t) && 'object' == typeof t[1];
			}
			function Ie(t) {
				return Array.isArray(t) && !0 === t[1];
			}
			function Oe(t) {
				return 0 != (8 & t.flags);
			}
			function Re(t) {
				return 2 == (2 & t.flags);
			}
			function Pe(t) {
				return 1 == (1 & t.flags);
			}
			function Le(t) {
				return null !== t.template;
			}
			function Ne(t) {
				return 0 != (512 & t[2]);
			}
			class De {
				constructor(t, e, n) {
					(this.previousValue = t), (this.currentValue = e), (this.firstChange = n);
				}
				isFirstChange() {
					return this.firstChange;
				}
			}
			function Me() {
				return Fe;
			}
			function Fe(t) {
				return t.type.prototype.ngOnChanges && (t.setInput = Be), je;
			}
			function je() {
				const t = ze(this),
					e = null == t ? void 0 : t.current;
				if (e) {
					const n = t.previous;
					if (n === pe) t.previous = e;
					else for (let t in e) n[t] = e[t];
					(t.current = null), this.ngOnChanges(e);
				}
			}
			function Be(t, e, n, i) {
				const s =
						ze(t) ||
						(function (t, e) {
							return (t.__ngSimpleChanges__ = e);
						})(t, { previous: pe, current: null }),
					r = s.current || (s.current = {}),
					o = s.previous,
					a = this.declaredInputs[n],
					l = o[a];
				(r[a] = new De(l && l.currentValue, e, o === pe)), (t[i] = e);
			}
			function ze(t) {
				return t.__ngSimpleChanges__ || null;
			}
			Me.ngInherit = !0;
			let Ve = void 0;
			function Ue() {
				return void 0 !== Ve ? Ve : 'undefined' != typeof document ? document : void 0;
			}
			function He(t) {
				return !!t.listen;
			}
			const $e = { createRenderer: (t, e) => Ue() };
			function qe(t) {
				for (; Array.isArray(t); ) t = t[0];
				return t;
			}
			function We(t, e) {
				return qe(e[t + ke]);
			}
			function Qe(t, e) {
				return qe(e[t.index]);
			}
			function Ze(t, e) {
				return t.data[e + ke];
			}
			function Ge(t, e) {
				return t[e + ke];
			}
			function Ke(t, e) {
				const n = e[t];
				return Ae(n) ? n : n[0];
			}
			function Ye(t) {
				const e = (function (t) {
					return t.__ngContext__ || null;
				})(t);
				return e ? (Array.isArray(e) ? e : e.lView) : null;
			}
			function Xe(t) {
				return 4 == (4 & t[2]);
			}
			function Je(t) {
				return 128 == (128 & t[2]);
			}
			function tn(t, e) {
				return null === t || null == e ? null : t[e];
			}
			function en(t) {
				t[18] = 0;
			}
			function nn(t, e) {
				t[5] += e;
				let n = t,
					i = t[3];
				for (; null !== i && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5])); )
					(i[5] += e), (n = i), (i = i[3]);
			}
			const sn = { lFrame: Cn(null), bindingsEnabled: !0, isInCheckNoChangesMode: !1 };
			function rn() {
				return sn.bindingsEnabled;
			}
			function on() {
				return sn.lFrame.lView;
			}
			function an() {
				return sn.lFrame.tView;
			}
			function ln(t) {
				sn.lFrame.contextLView = t;
			}
			function cn() {
				return sn.lFrame.currentTNode;
			}
			function un(t, e) {
				(sn.lFrame.currentTNode = t), (sn.lFrame.isParent = e);
			}
			function hn() {
				return sn.lFrame.isParent;
			}
			function dn() {
				sn.lFrame.isParent = !1;
			}
			function pn() {
				return sn.isInCheckNoChangesMode;
			}
			function fn(t) {
				sn.isInCheckNoChangesMode = t;
			}
			function mn() {
				return sn.lFrame.bindingIndex++;
			}
			function gn(t) {
				const e = sn.lFrame,
					n = e.bindingIndex;
				return (e.bindingIndex = e.bindingIndex + t), n;
			}
			function yn(t, e) {
				const n = sn.lFrame;
				(n.bindingIndex = n.bindingRootIndex = t), _n(e);
			}
			function _n(t) {
				sn.lFrame.currentDirectiveIndex = t;
			}
			function vn(t) {
				const e = sn.lFrame.currentDirectiveIndex;
				return -1 === e ? null : t[e];
			}
			function bn() {
				return sn.lFrame.currentQueryIndex;
			}
			function wn(t) {
				sn.lFrame.currentQueryIndex = t;
			}
			function xn(t, e) {
				const n = En();
				(sn.lFrame = n), (n.currentTNode = e), (n.lView = t);
			}
			function Sn(t) {
				const e = En(),
					n = t[1];
				(sn.lFrame = e),
					(e.currentTNode = n.firstChild),
					(e.lView = t),
					(e.tView = n),
					(e.contextLView = t),
					(e.bindingIndex = n.bindingStartIndex);
			}
			function En() {
				const t = sn.lFrame,
					e = null === t ? null : t.child;
				return null === e ? Cn(t) : e;
			}
			function Cn(t) {
				const e = {
					currentTNode: null,
					isParent: !0,
					lView: null,
					tView: null,
					selectedIndex: 0,
					contextLView: null,
					elementDepthCount: 0,
					currentNamespace: null,
					currentDirectiveIndex: -1,
					bindingRootIndex: -1,
					bindingIndex: -1,
					currentQueryIndex: 0,
					parent: t,
					child: null,
				};
				return null !== t && (t.child = e), e;
			}
			function kn() {
				const t = sn.lFrame;
				return (sn.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t;
			}
			const Tn = kn;
			function An() {
				const t = kn();
				(t.isParent = !0),
					(t.tView = null),
					(t.selectedIndex = 0),
					(t.contextLView = null),
					(t.elementDepthCount = 0),
					(t.currentDirectiveIndex = -1),
					(t.currentNamespace = null),
					(t.bindingRootIndex = -1),
					(t.bindingIndex = -1),
					(t.currentQueryIndex = 0);
			}
			function In() {
				return sn.lFrame.selectedIndex;
			}
			function On(t) {
				sn.lFrame.selectedIndex = t;
			}
			function Rn() {
				const t = sn.lFrame;
				return Ze(t.tView, t.selectedIndex);
			}
			function Pn(t, e) {
				for (let n = e.directiveStart, i = e.directiveEnd; n < i; n++) {
					const e = t.data[n].type.prototype,
						{
							ngAfterContentInit: i,
							ngAfterContentChecked: s,
							ngAfterViewInit: r,
							ngAfterViewChecked: o,
							ngOnDestroy: a,
						} = e;
					i && (t.contentHooks || (t.contentHooks = [])).push(-n, i),
						s &&
							((t.contentHooks || (t.contentHooks = [])).push(n, s),
							(t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, s)),
						r && (t.viewHooks || (t.viewHooks = [])).push(-n, r),
						o &&
							((t.viewHooks || (t.viewHooks = [])).push(n, o),
							(t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)),
						null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a);
				}
			}
			function Ln(t, e, n) {
				Mn(t, e, 3, n);
			}
			function Nn(t, e, n, i) {
				(3 & t[2]) === n && Mn(t, e, n, i);
			}
			function Dn(t, e) {
				let n = t[2];
				(3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
			}
			function Mn(t, e, n, i) {
				const s = null != i ? i : -1;
				let r = 0;
				for (let o = void 0 !== i ? 65535 & t[18] : 0; o < e.length; o++)
					if ('number' == typeof e[o + 1]) {
						if (((r = e[o]), null != i && r >= i)) break;
					} else
						e[o] < 0 && (t[18] += 65536),
							(r < s || -1 == s) && (Fn(t, n, e, o), (t[18] = (4294901760 & t[18]) + o + 2)),
							o++;
			}
			function Fn(t, e, n, i) {
				const s = n[i] < 0,
					r = n[i + 1],
					o = t[s ? -n[i] : n[i]];
				s ? t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e && ((t[2] += 2048), r.call(o)) : r.call(o);
			}
			const jn = -1;
			class Bn {
				constructor(t, e, n) {
					(this.factory = t), (this.resolving = !1), (this.canSeeViewProviders = e), (this.injectImpl = n);
				}
			}
			function zn(t, e, n) {
				const i = He(t);
				let s = 0;
				for (; s < n.length; ) {
					const r = n[s];
					if ('number' == typeof r) {
						if (0 !== r) break;
						s++;
						const o = n[s++],
							a = n[s++],
							l = n[s++];
						i ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l);
					} else {
						const o = r,
							a = n[++s];
						Un(o) ? i && t.setProperty(e, o, a) : i ? t.setAttribute(e, o, a) : e.setAttribute(o, a), s++;
					}
				}
				return s;
			}
			function Vn(t) {
				return 3 === t || 4 === t || 6 === t;
			}
			function Un(t) {
				return 64 === t.charCodeAt(0);
			}
			function Hn(t, e) {
				if (null === e || 0 === e.length);
				else if (null === t || 0 === t.length) t = e.slice();
				else {
					let n = -1;
					for (let i = 0; i < e.length; i++) {
						const s = e[i];
						'number' == typeof s
							? (n = s)
							: 0 === n || $n(t, n, s, null, -1 === n || 2 === n ? e[++i] : null);
					}
				}
				return t;
			}
			function $n(t, e, n, i, s) {
				let r = 0,
					o = t.length;
				if (-1 === e) o = -1;
				else
					for (; r < t.length; ) {
						const n = t[r++];
						if ('number' == typeof n) {
							if (n === e) {
								o = -1;
								break;
							}
							if (n > e) {
								o = r - 1;
								break;
							}
						}
					}
				for (; r < t.length; ) {
					const e = t[r];
					if ('number' == typeof e) break;
					if (e === n) {
						if (null === i) return void (null !== s && (t[r + 1] = s));
						if (i === t[r + 1]) return void (t[r + 2] = s);
					}
					r++, null !== i && r++, null !== s && r++;
				}
				-1 !== o && (t.splice(o, 0, e), (r = o + 1)),
					t.splice(r++, 0, n),
					null !== i && t.splice(r++, 0, i),
					null !== s && t.splice(r++, 0, s);
			}
			function qn(t) {
				return t !== jn;
			}
			function Wn(t) {
				return 32767 & t;
			}
			function Qn(t, e) {
				let n = t >> 16,
					i = e;
				for (; n > 0; ) (i = i[15]), n--;
				return i;
			}
			function Zn(t) {
				return 'string' == typeof t ? t : null == t ? '' : '' + t;
			}
			function Gn(t) {
				return 'function' == typeof t
					? t.name || t.toString()
					: 'object' == typeof t && null != t && 'function' == typeof t.type
					? t.type.name || t.type.toString()
					: Zn(t);
			}
			const Kn = (() =>
				(('undefined' != typeof requestAnimationFrame && requestAnimationFrame) || setTimeout).bind(Rt))();
			function Yn(t) {
				return t instanceof Function ? t() : t;
			}
			let Xn = !0;
			function Jn(t) {
				const e = Xn;
				return (Xn = t), e;
			}
			let ti = 0;
			function ei(t, e) {
				const n = ii(t, e);
				if (-1 !== n) return n;
				const i = e[1];
				i.firstCreatePass && ((t.injectorIndex = e.length), ni(i.data, t), ni(e, null), ni(i.blueprint, null));
				const s = si(t, e),
					r = t.injectorIndex;
				if (qn(s)) {
					const t = Wn(s),
						n = Qn(s, e),
						i = n[1].data;
					for (let s = 0; s < 8; s++) e[r + s] = n[t + s] | i[t + s];
				}
				return (e[r + 8] = s), r;
			}
			function ni(t, e) {
				t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
			}
			function ii(t, e) {
				return -1 === t.injectorIndex ||
					(t.parent && t.parent.injectorIndex === t.injectorIndex) ||
					null === e[t.injectorIndex + 8]
					? -1
					: t.injectorIndex;
			}
			function si(t, e) {
				if (t.parent && -1 !== t.parent.injectorIndex) return t.parent.injectorIndex;
				let n = 0,
					i = null,
					s = e;
				for (; null !== s; ) {
					const t = s[1],
						e = t.type;
					if (((i = 2 === e ? t.declTNode : 1 === e ? s[6] : null), null === i)) return jn;
					if ((n++, (s = s[15]), -1 !== i.injectorIndex)) return i.injectorIndex | (n << 16);
				}
				return jn;
			}
			function ri(t, e, n) {
				!(function (t, e, n) {
					let i;
					'string' == typeof n ? (i = n.charCodeAt(0) || 0) : n.hasOwnProperty(jt) && (i = n[jt]),
						null == i && (i = n[jt] = ti++);
					const s = 255 & i,
						r = 1 << s,
						o = 64 & s,
						a = 32 & s,
						l = e.data;
					128 & s
						? o
							? a
								? (l[t + 7] |= r)
								: (l[t + 6] |= r)
							: a
							? (l[t + 5] |= r)
							: (l[t + 4] |= r)
						: o
						? a
							? (l[t + 3] |= r)
							: (l[t + 2] |= r)
						: a
						? (l[t + 1] |= r)
						: (l[t] |= r);
				})(t, e, n);
			}
			function oi(t, e, n, i = lt.Default, s) {
				if (null !== t) {
					const s = (function (t) {
						if ('string' == typeof t) return t.charCodeAt(0) || 0;
						const e = t.hasOwnProperty(jt) ? t[jt] : void 0;
						return 'number' == typeof e && e > 0 ? 255 & e : e;
					})(n);
					if ('function' == typeof s) {
						xn(e, t);
						try {
							const t = s();
							if (null != t || i & lt.Optional) return t;
							throw new Error(`No provider for ${Gn(n)}!`);
						} finally {
							Tn();
						}
					} else if ('number' == typeof s) {
						if (-1 === s) return new pi(t, e);
						let r = null,
							o = ii(t, e),
							a = jn,
							l = i & lt.Host ? e[16][6] : null;
						for (
							(-1 === o || i & lt.SkipSelf) &&
							((a = -1 === o ? si(t, e) : e[o + 8]),
							a !== jn && di(i, !1) ? ((r = e[1]), (o = Wn(a)), (e = Qn(a, e))) : (o = -1));
							-1 !== o;

						) {
							const t = e[1];
							if (hi(s, o, t.data)) {
								const t = li(o, e, n, r, i, l);
								if (t !== ai) return t;
							}
							(a = e[o + 8]),
								a !== jn && di(i, e[1].data[o + 8] === l) && hi(s, o, e)
									? ((r = t), (o = Wn(a)), (e = Qn(a, e)))
									: (o = -1);
						}
					}
				}
				if ((i & lt.Optional && void 0 === s && (s = null), 0 == (i & (lt.Self | lt.Host)))) {
					const t = e[9],
						r = Zt(void 0);
					try {
						return t ? t.get(n, s, i & lt.Optional) : Xt(n, s, i & lt.Optional);
					} finally {
						Zt(r);
					}
				}
				if (i & lt.Optional) return s;
				throw new Error(`NodeInjector: NOT_FOUND [${Gn(n)}]`);
			}
			const ai = {};
			function li(t, e, n, i, s, r) {
				const o = e[1],
					a = o.data[t + 8],
					l = ci(a, o, n, null == i ? Re(a) && Xn : i != o && 2 === a.type, s & lt.Host && r === a);
				return null !== l ? ui(e, o, l, a) : ai;
			}
			function ci(t, e, n, i, s) {
				const r = t.providerIndexes,
					o = e.data,
					a = 1048575 & r,
					l = t.directiveStart,
					c = r >> 20,
					u = s ? a + c : t.directiveEnd;
				for (let h = i ? a : a + c; h < u; h++) {
					const t = o[h];
					if ((h < l && n === t) || (h >= l && t.type === n)) return h;
				}
				if (s) {
					const t = o[l];
					if (t && Le(t) && t.type === n) return l;
				}
				return null;
			}
			function ui(t, e, n, i) {
				let s = t[n];
				const r = e.data;
				if (s instanceof Bn) {
					const o = s;
					if (o.resolving) throw new Error('Circular dep for ' + Gn(r[n]));
					const a = Jn(o.canSeeViewProviders);
					o.resolving = !0;
					const l = o.injectImpl ? Zt(o.injectImpl) : null;
					xn(t, i);
					try {
						(s = t[n] = o.factory(void 0, r, t, i)),
							e.firstCreatePass &&
								n >= i.directiveStart &&
								(function (t, e, n) {
									const { ngOnChanges: i, ngOnInit: s, ngDoCheck: r } = e.type.prototype;
									if (i) {
										const i = Fe(e);
										(n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
											(n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, i);
									}
									s && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, s),
										r &&
											((n.preOrderHooks || (n.preOrderHooks = [])).push(t, r),
											(n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, r));
								})(n, r[n], e);
					} finally {
						null !== l && Zt(l), Jn(a), (o.resolving = !1), Tn();
					}
				}
				return s;
			}
			function hi(t, e, n) {
				const i = 64 & t,
					s = 32 & t;
				let r;
				return (
					(r =
						128 & t
							? i
								? s
									? n[e + 7]
									: n[e + 6]
								: s
								? n[e + 5]
								: n[e + 4]
							: i
							? s
								? n[e + 3]
								: n[e + 2]
							: s
							? n[e + 1]
							: n[e]),
					!!(r & (1 << t))
				);
			}
			function di(t, e) {
				return !(t & lt.Self || (t & lt.Host && e));
			}
			class pi {
				constructor(t, e) {
					(this._tNode = t), (this._lView = e);
				}
				get(t, e) {
					return oi(this._tNode, this._lView, t, void 0, e);
				}
			}
			function fi(t) {
				const e = t;
				if (kt(t))
					return () => {
						const t = fi(Ct(e));
						return t ? t() : null;
					};
				let n = Ee(e);
				if (null === n) {
					const t = mt(e);
					n = t && t.factory;
				}
				return n || null;
			}
			function mi(t) {
				return et(() => {
					const e = t.prototype.constructor,
						n = e[Ft] || fi(e),
						i = Object.prototype;
					let s = Object.getPrototypeOf(t.prototype).constructor;
					for (; s && s !== i; ) {
						const t = s[Ft] || fi(s);
						if (t && t !== n) return t;
						s = Object.getPrototypeOf(s);
					}
					return t => new t();
				});
			}
			function gi(t) {
				return t.ngDebugContext;
			}
			function yi(t) {
				return t.ngOriginalError;
			}
			function _i(t, ...e) {
				t.error(...e);
			}
			class vi {
				constructor() {
					this._console = console;
				}
				handleError(t) {
					const e = this._findOriginalError(t),
						n = this._findContext(t),
						i = (function (t) {
							return t.ngErrorLogger || _i;
						})(t);
					i(this._console, 'ERROR', t),
						e && i(this._console, 'ORIGINAL ERROR', e),
						n && i(this._console, 'ERROR CONTEXT', n);
				}
				_findContext(t) {
					return t ? (gi(t) ? gi(t) : this._findContext(yi(t))) : null;
				}
				_findOriginalError(t) {
					let e = yi(t);
					for (; e && yi(e); ) e = yi(e);
					return e;
				}
			}
			class bi {
				constructor(t) {
					this.changingThisBreaksApplicationSecurity = t;
				}
				toString() {
					return (
						'SafeValue must use [property]=binding: ' +
						this.changingThisBreaksApplicationSecurity +
						' (see http://g.co/ng/security#xss)'
					);
				}
			}
			class wi extends bi {
				getTypeName() {
					return 'HTML';
				}
			}
			class xi extends bi {
				getTypeName() {
					return 'Style';
				}
			}
			class Si extends bi {
				getTypeName() {
					return 'Script';
				}
			}
			class Ei extends bi {
				getTypeName() {
					return 'URL';
				}
			}
			class Ci extends bi {
				getTypeName() {
					return 'ResourceURL';
				}
			}
			function ki(t) {
				return t instanceof bi ? t.changingThisBreaksApplicationSecurity : t;
			}
			function Ti(t, e) {
				const n = Ai(t);
				if (null != n && n !== e) {
					if ('ResourceURL' === n && 'URL' === e) return !0;
					throw new Error(`Required a safe ${e}, got a ${n} (see http://g.co/ng/security#xss)`);
				}
				return n === e;
			}
			function Ai(t) {
				return (t instanceof bi && t.getTypeName()) || null;
			}
			let Ii = !0,
				Oi = !1;
			function Ri() {
				return (Oi = !0), Ii;
			}
			function Pi(t) {
				return (function () {
					try {
						return !!new window.DOMParser().parseFromString('', 'text/html');
					} catch (t) {
						return !1;
					}
				})()
					? new Li()
					: new Ni(t);
			}
			class Li {
				getInertBodyElement(t) {
					t = '<body><remove></remove>' + t;
					try {
						const e = new window.DOMParser().parseFromString(t, 'text/html').body;
						return e.removeChild(e.firstChild), e;
					} catch (e) {
						return null;
					}
				}
			}
			class Ni {
				constructor(t) {
					if (
						((this.defaultDoc = t),
						(this.inertDocument = this.defaultDoc.implementation.createHTMLDocument('sanitization-inert')),
						null == this.inertDocument.body)
					) {
						const t = this.inertDocument.createElement('html');
						this.inertDocument.appendChild(t);
						const e = this.inertDocument.createElement('body');
						t.appendChild(e);
					}
				}
				getInertBodyElement(t) {
					const e = this.inertDocument.createElement('template');
					if ('content' in e) return (e.innerHTML = t), e;
					const n = this.inertDocument.createElement('body');
					return (n.innerHTML = t), this.defaultDoc.documentMode && this.stripCustomNsAttrs(n), n;
				}
				stripCustomNsAttrs(t) {
					const e = t.attributes;
					for (let i = e.length - 1; 0 < i; i--) {
						const n = e.item(i).name;
						('xmlns:ns1' !== n && 0 !== n.indexOf('ns1:')) || t.removeAttribute(n);
					}
					let n = t.firstChild;
					for (; n; ) n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n), (n = n.nextSibling);
				}
			}
			const Di = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
				Mi = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
			function Fi(t) {
				return (t = String(t)).match(Di) || t.match(Mi)
					? t
					: (Ri() &&
							console.warn(`WARNING: sanitizing unsafe URL value ${t} (see http://g.co/ng/security#xss)`),
					  'unsafe:' + t);
			}
			function ji(t) {
				return (t = String(t))
					.split(',')
					.map(t => Fi(t.trim()))
					.join(', ');
			}
			function Bi(t) {
				const e = {};
				for (const n of t.split(',')) e[n] = !0;
				return e;
			}
			function zi(...t) {
				const e = {};
				for (const n of t) for (const t in n) n.hasOwnProperty(t) && (e[t] = !0);
				return e;
			}
			const Vi = Bi('area,br,col,hr,img,wbr'),
				Ui = Bi('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
				Hi = Bi('rp,rt'),
				$i = zi(Hi, Ui),
				qi = zi(
					Vi,
					zi(
						Ui,
						Bi(
							'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
						)
					),
					zi(
						Hi,
						Bi(
							'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
						)
					),
					$i
				),
				Wi = Bi('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
				Qi = Bi('srcset'),
				Zi = zi(
					Wi,
					Qi,
					Bi(
						'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
					),
					Bi(
						'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
					)
				),
				Gi = Bi('script,style,template');
			class Ki {
				constructor() {
					(this.sanitizedSomething = !1), (this.buf = []);
				}
				sanitizeChildren(t) {
					let e = t.firstChild,
						n = !0;
					for (; e; )
						if (
							(e.nodeType === Node.ELEMENT_NODE
								? (n = this.startElement(e))
								: e.nodeType === Node.TEXT_NODE
								? this.chars(e.nodeValue)
								: (this.sanitizedSomething = !0),
							n && e.firstChild)
						)
							e = e.firstChild;
						else
							for (; e; ) {
								e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
								let t = this.checkClobberedElement(e, e.nextSibling);
								if (t) {
									e = t;
									break;
								}
								e = this.checkClobberedElement(e, e.parentNode);
							}
					return this.buf.join('');
				}
				startElement(t) {
					const e = t.nodeName.toLowerCase();
					if (!qi.hasOwnProperty(e)) return (this.sanitizedSomething = !0), !Gi.hasOwnProperty(e);
					this.buf.push('<'), this.buf.push(e);
					const n = t.attributes;
					for (let i = 0; i < n.length; i++) {
						const t = n.item(i),
							e = t.name,
							s = e.toLowerCase();
						if (!Zi.hasOwnProperty(s)) {
							this.sanitizedSomething = !0;
							continue;
						}
						let r = t.value;
						Wi[s] && (r = Fi(r)), Qi[s] && (r = ji(r)), this.buf.push(' ', e, '="', Ji(r), '"');
					}
					return this.buf.push('>'), !0;
				}
				endElement(t) {
					const e = t.nodeName.toLowerCase();
					qi.hasOwnProperty(e) &&
						!Vi.hasOwnProperty(e) &&
						(this.buf.push('</'), this.buf.push(e), this.buf.push('>'));
				}
				chars(t) {
					this.buf.push(Ji(t));
				}
				checkClobberedElement(t, e) {
					if (
						e &&
						(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY) ===
							Node.DOCUMENT_POSITION_CONTAINED_BY
					)
						throw new Error('Failed to sanitize html because the element is clobbered: ' + t.outerHTML);
					return e;
				}
			}
			const Yi = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
				Xi = /([^\#-~ |!])/g;
			function Ji(t) {
				return t
					.replace(/&/g, '&amp;')
					.replace(Yi, function (t) {
						return '&#' + (1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320) + 65536) + ';';
					})
					.replace(Xi, function (t) {
						return '&#' + t.charCodeAt(0) + ';';
					})
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;');
			}
			let ts;
			function es(t, e) {
				let n = null;
				try {
					ts = ts || Pi(t);
					let i = e ? String(e) : '';
					n = ts.getInertBodyElement(i);
					let s = 5,
						r = i;
					do {
						if (0 === s) throw new Error('Failed to sanitize html because the input is unstable');
						s--, (i = r), (r = n.innerHTML), (n = ts.getInertBodyElement(i));
					} while (i !== r);
					const o = new Ki(),
						a = o.sanitizeChildren(ns(n) || n);
					return (
						Ri() &&
							o.sanitizedSomething &&
							console.warn(
								'WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss'
							),
						a
					);
				} finally {
					if (n) {
						const t = ns(n) || n;
						for (; t.firstChild; ) t.removeChild(t.firstChild);
					}
				}
			}
			function ns(t) {
				return 'content' in t &&
					(function (t) {
						return t.nodeType === Node.ELEMENT_NODE && 'TEMPLATE' === t.nodeName;
					})(t)
					? t.content
					: null;
			}
			var is = (function (t) {
				return (
					(t[(t.NONE = 0)] = 'NONE'),
					(t[(t.HTML = 1)] = 'HTML'),
					(t[(t.STYLE = 2)] = 'STYLE'),
					(t[(t.SCRIPT = 3)] = 'SCRIPT'),
					(t[(t.URL = 4)] = 'URL'),
					(t[(t.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
					t
				);
			})({});
			function ss(t) {
				const e = (function () {
					const t = on();
					return t && t[12];
				})();
				return e ? e.sanitize(is.HTML, t) || '' : Ti(t, 'HTML') ? ki(t) : es(Ue(), Zn(t));
			}
			function rs(t, e) {
				t.__ngContext__ = e;
			}
			function os(t, e, n) {
				let i = t.length;
				for (;;) {
					const s = t.indexOf(e, n);
					if (-1 === s) return s;
					if (0 === s || t.charCodeAt(s - 1) <= 32) {
						const n = e.length;
						if (s + n === i || t.charCodeAt(s + n) <= 32) return s;
					}
					n = s + 1;
				}
			}
			const as = 'ng-template';
			function ls(t, e, n) {
				let i = 0;
				for (; i < t.length; ) {
					let s = t[i++];
					if (n && 'class' === s) {
						if (((s = t[i]), -1 !== os(s.toLowerCase(), e, 0))) return !0;
					} else if (1 === s) {
						for (; i < t.length && 'string' == typeof (s = t[i++]); ) if (s.toLowerCase() === e) return !0;
						return !1;
					}
				}
				return !1;
			}
			function cs(t) {
				return 0 === t.type && t.tagName !== as;
			}
			function us(t, e, n) {
				return e === (0 !== t.type || n ? t.tagName : as);
			}
			function hs(t, e, n) {
				let i = 4;
				const s = t.attrs || [],
					r = (function (t) {
						for (let e = 0; e < t.length; e++) if (Vn(t[e])) return e;
						return t.length;
					})(s);
				let o = !1;
				for (let a = 0; a < e.length; a++) {
					const l = e[a];
					if ('number' != typeof l) {
						if (!o)
							if (4 & i) {
								if (((i = 2 | (1 & i)), ('' !== l && !us(t, l, n)) || ('' === l && 1 === e.length))) {
									if (ds(i)) return !1;
									o = !0;
								}
							} else {
								const c = 8 & i ? l : e[++a];
								if (8 & i && null !== t.attrs) {
									if (!ls(t.attrs, c, n)) {
										if (ds(i)) return !1;
										o = !0;
									}
									continue;
								}
								const u = ps(8 & i ? 'class' : l, s, cs(t), n);
								if (-1 === u) {
									if (ds(i)) return !1;
									o = !0;
									continue;
								}
								if ('' !== c) {
									let t;
									t = u > r ? '' : s[u + 1].toLowerCase();
									const e = 8 & i ? t : null;
									if ((e && -1 !== os(e, c, 0)) || (2 & i && c !== t)) {
										if (ds(i)) return !1;
										o = !0;
									}
								}
							}
					} else {
						if (!o && !ds(i) && !ds(l)) return !1;
						if (o && ds(l)) continue;
						(o = !1), (i = l | (1 & i));
					}
				}
				return ds(i) || o;
			}
			function ds(t) {
				return 0 == (1 & t);
			}
			function ps(t, e, n, i) {
				if (null === e) return -1;
				let s = 0;
				if (i || !n) {
					let n = !1;
					for (; s < e.length; ) {
						const i = e[s];
						if (i === t) return s;
						if (3 === i || 6 === i) n = !0;
						else {
							if (1 === i || 2 === i) {
								let t = e[++s];
								for (; 'string' == typeof t; ) t = e[++s];
								continue;
							}
							if (4 === i) break;
							if (0 === i) {
								s += 4;
								continue;
							}
						}
						s += n ? 1 : 2;
					}
					return -1;
				}
				return (function (t, e) {
					let n = t.indexOf(4);
					if (n > -1)
						for (n++; n < t.length; ) {
							const i = t[n];
							if ('number' == typeof i) return -1;
							if (i === e) return n;
							n++;
						}
					return -1;
				})(e, t);
			}
			function fs(t, e, n = !1) {
				for (let i = 0; i < e.length; i++) if (hs(t, e[i], n)) return !0;
				return !1;
			}
			function ms(t, e) {
				t: for (let n = 0; n < e.length; n++) {
					const i = e[n];
					if (t.length === i.length) {
						for (let e = 0; e < t.length; e++) if (t[e] !== i[e]) continue t;
						return !0;
					}
				}
				return !1;
			}
			function gs(t, e) {
				return t ? ':not(' + e.trim() + ')' : e;
			}
			function ys(t) {
				let e = t[0],
					n = 1,
					i = 2,
					s = '',
					r = !1;
				for (; n < t.length; ) {
					let o = t[n];
					if ('string' == typeof o)
						if (2 & i) {
							const e = t[++n];
							s += '[' + o + (e.length > 0 ? '="' + e + '"' : '') + ']';
						} else 8 & i ? (s += '.' + o) : 4 & i && (s += ' ' + o);
					else '' === s || ds(o) || ((e += gs(r, s)), (s = '')), (i = o), (r = r || !ds(i));
					n++;
				}
				return '' !== s && (e += gs(r, s)), e;
			}
			const _s = {};
			function vs(t) {
				const e = t[3];
				return Ie(e) ? e[3] : e;
			}
			function bs(t) {
				return xs(t[13]);
			}
			function ws(t) {
				return xs(t[4]);
			}
			function xs(t) {
				for (; null !== t && !Ie(t); ) t = t[4];
				return t;
			}
			function Ss(t) {
				Es(an(), on(), In() + t, pn());
			}
			function Es(t, e, n, i) {
				if (!i)
					if (3 == (3 & e[2])) {
						const i = t.preOrderCheckHooks;
						null !== i && Ln(e, i, n);
					} else {
						const i = t.preOrderHooks;
						null !== i && Nn(e, i, 0, n);
					}
				On(n);
			}
			function Cs(t, e) {
				return (t << 17) | (e << 2);
			}
			function ks(t) {
				return (t >> 17) & 32767;
			}
			function Ts(t) {
				return 2 | t;
			}
			function As(t) {
				return (131068 & t) >> 2;
			}
			function Is(t, e) {
				return (-131069 & t) | (e << 2);
			}
			function Os(t) {
				return 1 | t;
			}
			function Rs(t, e) {
				const n = t.contentQueries;
				if (null !== n)
					for (let i = 0; i < n.length; i += 2) {
						const s = n[i],
							r = n[i + 1];
						if (-1 !== r) {
							const n = t.data[r];
							wn(s), n.contentQueries(2, e[r], r);
						}
					}
			}
			function Ps(t, e, n) {
				return He(e) ? e.createElement(t, n) : null === n ? e.createElement(t) : e.createElementNS(n, t);
			}
			function Ls(t, e, n, i, s, r, o, a, l, c) {
				const u = e.blueprint.slice();
				return (
					(u[0] = s),
					(u[2] = 140 | i),
					en(u),
					(u[3] = u[15] = t),
					(u[8] = n),
					(u[10] = o || (t && t[10])),
					(u[11] = a || (t && t[11])),
					(u[12] = l || (t && t[12]) || null),
					(u[9] = c || (t && t[9]) || null),
					(u[6] = r),
					(u[16] = 2 == e.type ? t[16] : u),
					u
				);
			}
			function Ns(t, e, n, i, s) {
				const r = e + ke,
					o =
						t.data[r] ||
						(function (t, e, n, i, s) {
							const r = cn(),
								o = hn(),
								a = (t.data[e] = (function (t, e, n, i, s, r) {
									return {
										type: n,
										index: i,
										injectorIndex: e ? e.injectorIndex : -1,
										directiveStart: -1,
										directiveEnd: -1,
										directiveStylingLast: -1,
										propertyBindings: null,
										flags: 0,
										providerIndexes: 0,
										tagName: s,
										attrs: r,
										mergedAttrs: null,
										localNames: null,
										initialInputs: void 0,
										inputs: null,
										outputs: null,
										tViews: null,
										next: null,
										projectionNext: null,
										child: null,
										parent: e,
										projection: null,
										styles: null,
										stylesWithoutHost: null,
										residualStyles: void 0,
										classes: null,
										classesWithoutHost: null,
										residualClasses: void 0,
										classBindings: 0,
										styleBindings: 0,
									};
								})(0, o ? r : r && r.parent, n, e, i, s));
							return (
								null === t.firstChild && (t.firstChild = a),
								null !== r &&
									(o && null == r.child && null !== a.parent ? (r.child = a) : o || (r.next = a)),
								a
							);
						})(t, r, n, i, s);
				return un(o, !0), o;
			}
			function Ds(t, e, n) {
				Sn(e);
				try {
					const i = t.viewQuery;
					null !== i && dr(1, i, n);
					const s = t.template;
					null !== s && js(t, e, s, 1, n),
						t.firstCreatePass && (t.firstCreatePass = !1),
						t.staticContentQueries && Rs(t, e),
						t.staticViewQueries && dr(2, t.viewQuery, n);
					const r = t.components;
					null !== r &&
						(function (t, e) {
							for (let n = 0; n < e.length; n++) ar(t, e[n]);
						})(e, r);
				} catch (i) {
					throw (t.firstCreatePass && (t.incompleteFirstPass = !0), i);
				} finally {
					(e[2] &= -5), An();
				}
			}
			function Ms(t, e, n, i) {
				const s = e[2];
				if (256 == (256 & s)) return;
				Sn(e);
				const r = pn();
				try {
					en(e), (sn.lFrame.bindingIndex = t.bindingStartIndex), null !== n && js(t, e, n, 2, i);
					const o = 3 == (3 & s);
					if (!r)
						if (o) {
							const n = t.preOrderCheckHooks;
							null !== n && Ln(e, n, null);
						} else {
							const n = t.preOrderHooks;
							null !== n && Nn(e, n, 0, null), Dn(e, 0);
						}
					if (
						((function (t) {
							for (let e = bs(t); null !== e; e = ws(e)) {
								if (!e[2]) continue;
								const t = e[9];
								for (let e = 0; e < t.length; e++) {
									const n = t[e],
										i = n[3];
									0 == (1024 & n[2]) && nn(i, 1), (n[2] |= 1024);
								}
							}
						})(e),
						(function (t) {
							for (let e = bs(t); null !== e; e = ws(e))
								for (let t = Te; t < e.length; t++) {
									const n = e[t],
										i = n[1];
									Je(n) && Ms(i, n, i.template, n[8]);
								}
						})(e),
						null !== t.contentQueries && Rs(t, e),
						!r)
					)
						if (o) {
							const n = t.contentCheckHooks;
							null !== n && Ln(e, n);
						} else {
							const n = t.contentHooks;
							null !== n && Nn(e, n, 1), Dn(e, 1);
						}
					!(function (t, e) {
						try {
							const n = t.expandoInstructions;
							if (null !== n) {
								let i = t.expandoStartIndex,
									s = -1,
									r = -1;
								for (let t = 0; t < n.length; t++) {
									const o = n[t];
									'number' == typeof o
										? o <= 0
											? ((r = 0 - o), On(r), (i += 9 + n[++t]), (s = i))
											: (i += o)
										: (null !== o && (yn(i, s), o(2, e[s])), s++);
								}
							}
						} finally {
							On(-1);
						}
					})(t, e);
					const a = t.components;
					null !== a &&
						(function (t, e) {
							for (let n = 0; n < e.length; n++) or(t, e[n]);
						})(e, a);
					const l = t.viewQuery;
					if ((null !== l && dr(2, l, i), !r))
						if (o) {
							const n = t.viewCheckHooks;
							null !== n && Ln(e, n);
						} else {
							const n = t.viewHooks;
							null !== n && Nn(e, n, 2), Dn(e, 2);
						}
					!0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
						r || (e[2] &= -73),
						1024 & e[2] && ((e[2] &= -1025), nn(e[3], -1));
				} finally {
					An();
				}
			}
			function Fs(t, e, n, i) {
				const s = e[10],
					r = !pn(),
					o = Xe(e);
				try {
					r && !o && s.begin && s.begin(), o && Ds(t, e, i), Ms(t, e, n, i);
				} finally {
					r && !o && s.end && s.end();
				}
			}
			function js(t, e, n, i, s) {
				const r = In();
				try {
					On(-1), 2 & i && e.length > ke && Es(t, e, 0, pn()), n(i, s);
				} finally {
					On(r);
				}
			}
			function Bs(t, e, n) {
				rn() &&
					((function (t, e, n, i) {
						const s = n.directiveStart,
							r = n.directiveEnd;
						t.firstCreatePass || ei(n, e), rs(i, e);
						const o = n.initialInputs;
						for (let a = s; a < r; a++) {
							const i = t.data[a],
								r = Le(i);
							r && er(e, n, i);
							const l = ui(e, t, a, n);
							rs(l, e), null !== o && ir(0, a - s, l, i, 0, o), r && (Ke(n.index, e)[8] = l);
						}
					})(t, e, n, Qe(n, e)),
					128 == (128 & n.flags) &&
						(function (t, e, n) {
							const i = n.directiveStart,
								s = n.directiveEnd,
								r = t.expandoInstructions,
								o = t.firstCreatePass,
								a = n.index - ke,
								l = sn.lFrame.currentDirectiveIndex;
							try {
								On(a);
								for (let n = i; n < s; n++) {
									const i = t.data[n],
										s = e[n];
									_n(n),
										null !== i.hostBindings || 0 !== i.hostVars || null !== i.hostAttrs
											? Gs(i, s)
											: o && r.push(null);
								}
							} finally {
								On(-1), _n(l);
							}
						})(t, e, n));
			}
			function zs(t, e, n = Qe) {
				const i = e.localNames;
				if (null !== i) {
					let s = e.index + 1;
					for (let r = 0; r < i.length; r += 2) {
						const o = i[r + 1],
							a = -1 === o ? n(e, t) : t[o];
						t[s++] = a;
					}
				}
			}
			function Vs(t) {
				const e = t.tView;
				return null === e || e.incompleteFirstPass
					? (t.tView = Us(
							1,
							null,
							t.template,
							t.decls,
							t.vars,
							t.directiveDefs,
							t.pipeDefs,
							t.viewQuery,
							t.schemas,
							t.consts
					  ))
					: e;
			}
			function Us(t, e, n, i, s, r, o, a, l, c) {
				const u = ke + i,
					h = u + s,
					d = (function (t, e) {
						const n = [];
						for (let i = 0; i < e; i++) n.push(i < t ? null : _s);
						return n;
					})(u, h),
					p = 'function' == typeof c ? c() : c;
				return (d[1] = {
					type: t,
					blueprint: d,
					template: n,
					queries: null,
					viewQuery: a,
					declTNode: e,
					data: d.slice().fill(null, u),
					bindingStartIndex: u,
					expandoStartIndex: h,
					expandoInstructions: null,
					firstCreatePass: !0,
					firstUpdatePass: !0,
					staticViewQueries: !1,
					staticContentQueries: !1,
					preOrderHooks: null,
					preOrderCheckHooks: null,
					contentHooks: null,
					contentCheckHooks: null,
					viewHooks: null,
					viewCheckHooks: null,
					destroyHooks: null,
					cleanup: null,
					contentQueries: null,
					components: null,
					directiveRegistry: 'function' == typeof r ? r() : r,
					pipeRegistry: 'function' == typeof o ? o() : o,
					firstChild: null,
					schemas: l,
					consts: p,
					incompleteFirstPass: !1,
				});
			}
			function Hs(t, e, n, i) {
				const s = fr(e);
				s.push(n),
					t.firstCreatePass &&
						(function (t) {
							return t.cleanup || (t.cleanup = []);
						})(t).push(i, s.length - 1);
			}
			function $s(t, e, n) {
				for (let i in t)
					if (t.hasOwnProperty(i)) {
						const s = t[i];
						(n = null === n ? {} : n).hasOwnProperty(i) ? n[i].push(e, s) : (n[i] = [e, s]);
					}
				return n;
			}
			function qs(t, e, n, i, s, r, o, a) {
				const l = Qe(e, n);
				let c,
					u = e.inputs;
				var h;
				!a && null != u && (c = u[i])
					? (yr(t, n, c, i, s),
					  Re(e) &&
							(function (t, e) {
								const n = Ke(e, t);
								16 & n[2] || (n[2] |= 64);
							})(n, e.index))
					: 2 === e.type &&
					  ((i =
							'class' === (h = i)
								? 'className'
								: 'for' === h
								? 'htmlFor'
								: 'formaction' === h
								? 'formAction'
								: 'innerHtml' === h
								? 'innerHTML'
								: 'readonly' === h
								? 'readOnly'
								: 'tabindex' === h
								? 'tabIndex'
								: h),
					  (s = null != o ? o(s, e.tagName || '', i) : s),
					  He(r) ? r.setProperty(l, i, s) : Un(i) || (l.setProperty ? l.setProperty(i, s) : (l[i] = s)));
			}
			function Ws(t, e, n, i) {
				let s = !1;
				if (rn()) {
					const r = (function (t, e, n) {
							const i = t.directiveRegistry;
							let s = null;
							if (i)
								for (let r = 0; r < i.length; r++) {
									const o = i[r];
									fs(n, o.selectors, !1) &&
										(s || (s = []),
										ri(ei(n, e), t, o.type),
										Le(o) ? (Ys(t, n), s.unshift(o)) : s.push(o));
								}
							return s;
						})(t, e, n),
						o = null === i ? null : { '': -1 };
					if (null !== r) {
						let i = 0;
						(s = !0), Js(n, t.data.length, r.length);
						for (let t = 0; t < r.length; t++) {
							const e = r[t];
							e.providersResolver && e.providersResolver(e);
						}
						Ks(t, n, r.length);
						let a = !1,
							l = !1;
						for (let s = 0; s < r.length; s++) {
							const c = r[s];
							(n.mergedAttrs = Hn(n.mergedAttrs, c.hostAttrs)),
								tr(t, e, c),
								Xs(t.data.length - 1, c, o),
								null !== c.contentQueries && (n.flags |= 8),
								(null === c.hostBindings && null === c.hostAttrs && 0 === c.hostVars) ||
									(n.flags |= 128);
							const u = c.type.prototype;
							!a &&
								(u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
								((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index - ke), (a = !0)),
								l ||
									(!u.ngOnChanges && !u.ngDoCheck) ||
									((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n.index - ke),
									(l = !0)),
								Qs(t, c),
								(i += c.hostVars);
						}
						!(function (t, e) {
							const n = e.directiveEnd,
								i = t.data,
								s = e.attrs,
								r = [];
							let o = null,
								a = null;
							for (let l = e.directiveStart; l < n; l++) {
								const t = i[l],
									n = t.inputs,
									c = null === s || cs(e) ? null : sr(n, s);
								r.push(c), (o = $s(n, l, o)), (a = $s(t.outputs, l, a));
							}
							null !== o &&
								(o.hasOwnProperty('class') && (e.flags |= 16),
								o.hasOwnProperty('style') && (e.flags |= 32)),
								(e.initialInputs = r),
								(e.inputs = o),
								(e.outputs = a);
						})(t, n),
							Zs(t, e, i);
					}
					o &&
						(function (t, e, n) {
							if (e) {
								const i = (t.localNames = []);
								for (let t = 0; t < e.length; t += 2) {
									const s = n[e[t + 1]];
									if (null == s) throw new Error(`Export of name '${e[t + 1]}' not found!`);
									i.push(e[t], s);
								}
							}
						})(n, i, o);
				}
				return (n.mergedAttrs = Hn(n.mergedAttrs, n.attrs)), s;
			}
			function Qs(t, e) {
				const n = t.expandoInstructions;
				n.push(e.hostBindings), 0 !== e.hostVars && n.push(e.hostVars);
			}
			function Zs(t, e, n) {
				for (let i = 0; i < n; i++) e.push(_s), t.blueprint.push(_s), t.data.push(null);
			}
			function Gs(t, e) {
				null !== t.hostBindings && t.hostBindings(1, e);
			}
			function Ks(t, e, n) {
				const i = ke - e.index,
					s = t.data.length - (1048575 & e.providerIndexes);
				(t.expandoInstructions || (t.expandoInstructions = [])).push(i, s, n);
			}
			function Ys(t, e) {
				(e.flags |= 2), (t.components || (t.components = [])).push(e.index);
			}
			function Xs(t, e, n) {
				if (n) {
					if (e.exportAs) for (let i = 0; i < e.exportAs.length; i++) n[e.exportAs[i]] = t;
					Le(e) && (n[''] = t);
				}
			}
			function Js(t, e, n) {
				(t.flags |= 1), (t.directiveStart = e), (t.directiveEnd = e + n), (t.providerIndexes = e);
			}
			function tr(t, e, n) {
				t.data.push(n);
				const i = n.factory || (n.factory = Ee(n.type)),
					s = new Bn(i, Le(n), null);
				t.blueprint.push(s), e.push(s);
			}
			function er(t, e, n) {
				const i = Qe(e, t),
					s = Vs(n),
					r = t[10],
					o = lr(t, Ls(t, s, null, n.onPush ? 64 : 16, i, e, r, r.createRenderer(i, n), null, null));
				t[e.index] = o;
			}
			function nr(t, e, n, i, s, r) {
				const o = Qe(t, e),
					a = e[11];
				if (null == i) He(a) ? a.removeAttribute(o, n, r) : o.removeAttribute(n);
				else {
					const e = null == s ? Zn(i) : s(i, t.tagName || '', n);
					He(a) ? a.setAttribute(o, n, e, r) : r ? o.setAttributeNS(r, n, e) : o.setAttribute(n, e);
				}
			}
			function ir(t, e, n, i, s, r) {
				const o = r[e];
				if (null !== o) {
					const t = i.setInput;
					for (let e = 0; e < o.length; ) {
						const s = o[e++],
							r = o[e++],
							a = o[e++];
						null !== t ? i.setInput(n, a, s, r) : (n[r] = a);
					}
				}
			}
			function sr(t, e) {
				let n = null,
					i = 0;
				for (; i < e.length; ) {
					const s = e[i];
					if (0 !== s)
						if (5 !== s) {
							if ('number' == typeof s) break;
							t.hasOwnProperty(s) && (null === n && (n = []), n.push(s, t[s], e[i + 1])), (i += 2);
						} else i += 2;
					else i += 4;
				}
				return n;
			}
			function rr(t, e, n, i) {
				return new Array(t, !0, !1, e, null, 0, i, n, null, null);
			}
			function or(t, e) {
				const n = Ke(e, t);
				if (Je(n)) {
					const t = n[1];
					80 & n[2]
						? Ms(t, n, t.template, n[8])
						: n[5] > 0 &&
						  (function t(e) {
								for (let i = bs(e); null !== i; i = ws(i))
									for (let e = Te; e < i.length; e++) {
										const n = i[e];
										if (1024 & n[2]) {
											const t = n[1];
											Ms(t, n, t.template, n[8]);
										} else n[5] > 0 && t(n);
									}
								const n = e[1].components;
								if (null !== n)
									for (let i = 0; i < n.length; i++) {
										const s = Ke(n[i], e);
										Je(s) && s[5] > 0 && t(s);
									}
						  })(n);
				}
			}
			function ar(t, e) {
				const n = Ke(e, t),
					i = n[1];
				!(function (t, e) {
					for (let n = e.length; n < t.blueprint.length; n++) e.push(t.blueprint[n]);
				})(i, n),
					Ds(i, n, n[8]);
			}
			function lr(t, e) {
				return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
			}
			function cr(t) {
				for (; t; ) {
					t[2] |= 64;
					const e = vs(t);
					if (Ne(t) && !e) return t;
					t = e;
				}
				return null;
			}
			function ur(t, e, n) {
				const i = e[10];
				i.begin && i.begin();
				try {
					Ms(t, e, t.template, n);
				} catch (s) {
					throw (gr(e, s), s);
				} finally {
					i.end && i.end();
				}
			}
			function hr(t) {
				!(function (t) {
					for (let e = 0; e < t.components.length; e++) {
						const n = t.components[e],
							i = Ye(n),
							s = i[1];
						Fs(s, i, s.template, n);
					}
				})(t[8]);
			}
			function dr(t, e, n) {
				wn(0), e(t, n);
			}
			const pr = (() => Promise.resolve(null))();
			function fr(t) {
				return t[7] || (t[7] = []);
			}
			function mr(t, e, n) {
				return (
					(null === t || Le(t)) &&
						(n = (function (t) {
							for (; Array.isArray(t); ) {
								if ('object' == typeof t[1]) return t;
								t = t[0];
							}
							return null;
						})(n[e.index])),
					n[11]
				);
			}
			function gr(t, e) {
				const n = t[9],
					i = n ? n.get(vi, null) : null;
				i && i.handleError(e);
			}
			function yr(t, e, n, i, s) {
				for (let r = 0; r < n.length; ) {
					const o = n[r++],
						a = n[r++],
						l = e[o],
						c = t.data[o];
					null !== c.setInput ? c.setInput(l, s, i, a) : (l[a] = s);
				}
			}
			function _r(t, e, n) {
				const i = We(e, t),
					s = t[11];
				He(s) ? s.setValue(i, n) : (i.textContent = n);
			}
			function vr(t, e, n, i, s) {
				if (null != i) {
					let r,
						o = !1;
					Ie(i) ? (r = i) : Ae(i) && ((o = !0), (i = i[0]));
					const a = qe(i);
					0 === t && null !== n
						? null == s
							? Tr(e, n, a)
							: kr(e, n, a, s || null)
						: 1 === t && null !== n
						? kr(e, n, a, s || null)
						: 2 === t
						? Pr(e, a, o)
						: 3 === t && e.destroyNode(a),
						null != r &&
							(function (t, e, n, i, s) {
								const r = n[7];
								r !== qe(n) && vr(e, t, i, r, s);
								for (let o = Te; o < n.length; o++) {
									const s = n[o];
									Nr(s[1], s, t, e, i, r);
								}
							})(e, t, r, n, s);
				}
			}
			function br(t, e) {
				return He(e) ? e.createText(t) : e.createTextNode(t);
			}
			function wr(t, e) {
				const n = t[9],
					i = n.indexOf(e),
					s = e[3];
				1024 & e[2] && ((e[2] &= -1025), nn(s, -1)), n.splice(i, 1);
			}
			function xr(t, e) {
				if (t.length <= Te) return;
				const n = Te + e,
					i = t[n];
				if (i) {
					const r = i[17];
					null !== r && r !== t && wr(r, i), e > 0 && (t[n - 1][4] = i[4]);
					const o = oe(t, Te + e);
					Nr(i[1], (s = i), s[11], 2, null, null), (s[0] = null), (s[6] = null);
					const a = o[19];
					null !== a && a.detachView(o[1]), (i[3] = null), (i[4] = null), (i[2] &= -129);
				}
				var s;
				return i;
			}
			function Sr(t, e) {
				if (!(256 & e[2])) {
					const n = e[11];
					He(n) && n.destroyNode && Nr(t, e, n, 3, null, null),
						(function (t) {
							let e = t[13];
							if (!e) return Er(t[1], t);
							for (; e; ) {
								let n = null;
								if (Ae(e)) n = e[13];
								else {
									const t = e[10];
									t && (n = t);
								}
								if (!n) {
									for (; e && !e[4] && e !== t; ) Ae(e) && Er(e[1], e), (e = e[3]);
									null === e && (e = t), Ae(e) && Er(e[1], e), (n = e && e[4]);
								}
								e = n;
							}
						})(e);
				}
			}
			function Er(t, e) {
				if (!(256 & e[2])) {
					(e[2] &= -129),
						(e[2] |= 256),
						(function (t, e) {
							let n;
							if (null != t && null != (n = t.destroyHooks))
								for (let i = 0; i < n.length; i += 2) {
									const t = e[n[i]];
									if (!(t instanceof Bn)) {
										const e = n[i + 1];
										if (Array.isArray(e))
											for (let n = 0; n < e.length; n += 2) e[n + 1].call(t[e[n]]);
										else e.call(t);
									}
								}
						})(t, e),
						(function (t, e) {
							const n = t.cleanup;
							if (null !== n) {
								const t = e[7];
								for (let i = 0; i < n.length - 1; i += 2)
									if ('string' == typeof n[i]) {
										const s = n[i + 1],
											r = 'function' == typeof s ? s(e) : qe(e[s]),
											o = t[n[i + 2]],
											a = n[i + 3];
										'boolean' == typeof a
											? r.removeEventListener(n[i], o, a)
											: a >= 0
											? t[a]()
											: t[-a].unsubscribe(),
											(i += 2);
									} else n[i].call(t[n[i + 1]]);
								e[7] = null;
							}
						})(t, e),
						1 === e[1].type && He(e[11]) && e[11].destroy();
					const n = e[17];
					if (null !== n && Ie(e[3])) {
						n !== e[3] && wr(n, e);
						const i = e[19];
						null !== i && i.detachView(t);
					}
				}
			}
			function Cr(t, e, n) {
				let i = e.parent;
				for (; null != i && (3 === i.type || 4 === i.type); ) i = (e = i).parent;
				if (null === i) return n[0];
				if (e && 4 === e.type && 4 & e.flags) return Qe(e, n).parentNode;
				if (2 & i.flags) {
					const e = t.data,
						n = e[e[i.index].directiveStart].encapsulation;
					if (n !== de.ShadowDom && n !== de.Native) return null;
				}
				return Qe(i, n);
			}
			function kr(t, e, n, i) {
				He(t) ? t.insertBefore(e, n, i) : e.insertBefore(n, i, !0);
			}
			function Tr(t, e, n) {
				He(t) ? t.appendChild(e, n) : e.appendChild(n);
			}
			function Ar(t, e, n, i) {
				null !== i ? kr(t, e, n, i) : Tr(t, e, n);
			}
			function Ir(t, e) {
				return He(t) ? t.parentNode(e) : e.parentNode;
			}
			function Or(t, e) {
				return 3 === t.type || 4 === t.type ? Qe(t, e) : null;
			}
			function Rr(t, e, n, i) {
				const s = Cr(t, i, e);
				if (null != s) {
					const t = e[11],
						r = Or(i.parent || e[6], e);
					if (Array.isArray(n)) for (let e = 0; e < n.length; e++) Ar(t, s, n[e], r);
					else Ar(t, s, n, r);
				}
			}
			function Pr(t, e, n) {
				const i = Ir(t, e);
				i &&
					(function (t, e, n, i) {
						He(t) ? t.removeChild(e, n, i) : e.removeChild(n);
					})(t, i, e, n);
			}
			function Lr(t, e, n, i, s, r, o) {
				for (; null != n; ) {
					const a = i[n.index],
						l = n.type;
					o && 0 === e && (a && rs(qe(a), i), (n.flags |= 4)),
						64 != (64 & n.flags) &&
							(3 === l || 4 === l
								? (Lr(t, e, n.child, i, s, r, !1), vr(e, t, s, a, r))
								: 1 === l
								? Mr(t, e, i, n, s, r)
								: vr(e, t, s, a, r)),
						(n = o ? n.projectionNext : n.next);
				}
			}
			function Nr(t, e, n, i, s, r) {
				Lr(n, i, t.firstChild, e, s, r, !1);
			}
			function Dr(t, e, n) {
				Mr(e[11], 0, e, n, Cr(t, n, e), Or(n.parent || e[6], e));
			}
			function Mr(t, e, n, i, s, r) {
				const o = n[16],
					a = o[6].projection[i.projection];
				if (Array.isArray(a)) for (let l = 0; l < a.length; l++) vr(e, t, s, a[l], r);
				else Lr(t, e, a, o[3], s, r, !0);
			}
			function Fr(t, e, n) {
				He(t) ? t.setAttribute(e, 'style', n) : (e.style.cssText = n);
			}
			function jr(t, e, n) {
				He(t) ? ('' === n ? t.removeAttribute(e, 'class') : t.setAttribute(e, 'class', n)) : (e.className = n);
			}
			class Br {
				constructor(t, e) {
					(this._lView = t),
						(this._cdRefInjectingView = e),
						(this._appRef = null),
						(this._viewContainerRef = null);
				}
				get rootNodes() {
					const t = this._lView,
						e = t[1];
					return (function t(e, n, i, s, r = !1) {
						for (; null !== i; ) {
							const o = n[i.index];
							if ((null !== o && s.push(qe(o)), Ie(o)))
								for (let e = Te; e < o.length; e++) {
									const n = o[e],
										i = n[1].firstChild;
									null !== i && t(n[1], n, i, s);
								}
							const a = i.type;
							if (3 === a || 4 === a) t(e, n, i.child, s);
							else if (1 === a) {
								const e = n[16],
									r = e[6].projection[i.projection];
								if (Array.isArray(r)) s.push(...r);
								else {
									const n = vs(e);
									t(n[1], n, r, s, !0);
								}
							}
							i = r ? i.projectionNext : i.next;
						}
						return s;
					})(e, t, e.firstChild, []);
				}
				get context() {
					return this._lView[8];
				}
				get destroyed() {
					return 256 == (256 & this._lView[2]);
				}
				destroy() {
					if (this._appRef) this._appRef.detachView(this);
					else if (this._viewContainerRef) {
						const t = this._viewContainerRef.indexOf(this);
						t > -1 && this._viewContainerRef.detach(t), (this._viewContainerRef = null);
					}
					Sr(this._lView[1], this._lView);
				}
				onDestroy(t) {
					Hs(this._lView[1], this._lView, null, t);
				}
				markForCheck() {
					cr(this._cdRefInjectingView || this._lView);
				}
				detach() {
					this._lView[2] &= -129;
				}
				reattach() {
					this._lView[2] |= 128;
				}
				detectChanges() {
					ur(this._lView[1], this._lView, this.context);
				}
				checkNoChanges() {
					!(function (t, e, n) {
						fn(!0);
						try {
							ur(t, e, n);
						} finally {
							fn(!1);
						}
					})(this._lView[1], this._lView, this.context);
				}
				attachToViewContainerRef(t) {
					if (this._appRef) throw new Error('This view is already attached directly to the ApplicationRef!');
					this._viewContainerRef = t;
				}
				detachFromAppRef() {
					var t;
					(this._appRef = null), Nr(this._lView[1], (t = this._lView), t[11], 2, null, null);
				}
				attachToAppRef(t) {
					if (this._viewContainerRef) throw new Error('This view is already attached to a ViewContainer!');
					this._appRef = t;
				}
			}
			class zr extends Br {
				constructor(t) {
					super(t), (this._view = t);
				}
				detectChanges() {
					hr(this._view);
				}
				checkNoChanges() {
					!(function (t) {
						fn(!0);
						try {
							hr(t);
						} finally {
							fn(!1);
						}
					})(this._view);
				}
				get context() {
					return null;
				}
			}
			let Vr, Ur, Hr;
			function $r(t, e, n) {
				return Vr || (Vr = class extends t {}), new Vr(Qe(e, n));
			}
			function qr(t, e, n, i) {
				return (
					Ur ||
						(Ur = class extends t {
							constructor(t, e, n) {
								super(),
									(this._declarationView = t),
									(this._declarationTContainer = e),
									(this.elementRef = n);
							}
							createEmbeddedView(t) {
								const e = this._declarationTContainer.tViews,
									n = Ls(this._declarationView, e, t, 16, null, e.declTNode, null, null, null, null);
								n[17] = this._declarationView[this._declarationTContainer.index];
								const i = this._declarationView[19];
								return null !== i && (n[19] = i.createEmbeddedView(e)), Ds(e, n, t), new Br(n);
							}
						}),
					0 === n.type ? new Ur(i, n, $r(e, n, i)) : null
				);
			}
			function Wr(t, e, n, i) {
				let s;
				Hr ||
					(Hr = class extends t {
						constructor(t, e, n) {
							super(), (this._lContainer = t), (this._hostTNode = e), (this._hostView = n);
						}
						get element() {
							return $r(e, this._hostTNode, this._hostView);
						}
						get injector() {
							return new pi(this._hostTNode, this._hostView);
						}
						get parentInjector() {
							const t = si(this._hostTNode, this._hostView);
							if (qn(t)) {
								const e = Qn(t, this._hostView),
									n = Wn(t);
								return new pi(e[1].data[n + 8], e);
							}
							return new pi(null, this._hostView);
						}
						clear() {
							for (; this.length > 0; ) this.remove(this.length - 1);
						}
						get(t) {
							return (null !== this._lContainer[8] && this._lContainer[8][t]) || null;
						}
						get length() {
							return this._lContainer.length - Te;
						}
						createEmbeddedView(t, e, n) {
							const i = t.createEmbeddedView(e || {});
							return this.insert(i, n), i;
						}
						createComponent(t, e, n, i, s) {
							const r = n || this.parentInjector;
							if (!s && null == t.ngModule && r) {
								const t = r.get(ee, null);
								t && (s = t);
							}
							const o = t.create(r, i, void 0, s);
							return this.insert(o.hostView, e), o;
						}
						insert(t, e) {
							const n = t._lView,
								i = n[1];
							if (t.destroyed) throw new Error('Cannot insert a destroyed View in a ViewContainer!');
							if ((this.allocateContainerIfNeeded(), Ie(n[3]))) {
								const e = this.indexOf(t);
								if (-1 !== e) this.detach(e);
								else {
									const e = n[3],
										i = new Hr(e, e[6], e[3]);
									i.detach(i.indexOf(t));
								}
							}
							const s = this._adjustIndex(e),
								r = this._lContainer;
							!(function (t, e, n, i) {
								const s = Te + i,
									r = n.length;
								i > 0 && (n[s - 1][4] = e),
									i < r - Te ? ((e[4] = n[s]), re(n, Te + i, e)) : (n.push(e), (e[4] = null)),
									(e[3] = n);
								const o = e[17];
								null !== o &&
									n !== o &&
									(function (t, e) {
										const n = t[9];
										e[16] !== e[3][3][16] && (t[2] = !0), null === n ? (t[9] = [e]) : n.push(e);
									})(o, e);
								const a = e[19];
								null !== a && a.insertView(t), (e[2] |= 128);
							})(i, n, r, s);
							const o = (function t(e, n) {
									const i = Te + e + 1;
									if (i < n.length) {
										const e = n[i],
											s = e[1].firstChild;
										if (null !== s)
											return (function e(n, i) {
												if (null !== i) {
													const s = i.type;
													if (2 === s) return Qe(i, n);
													if (0 === s) return t(-1, n[i.index]);
													if (3 === s || 4 === s) {
														const s = i.child;
														if (null !== s) return e(n, s);
														{
															const e = n[i.index];
															return Ie(e) ? t(-1, e) : qe(e);
														}
													}
													{
														const t = n[16],
															s = t[6],
															r = vs(t),
															o = s.projection[i.projection];
														return null != o ? e(r, o) : e(n, i.next);
													}
												}
												return null;
											})(e, s);
									}
									return n[7];
								})(s, r),
								a = n[11],
								l = Ir(a, r[7]);
							return (
								null !== l &&
									(function (t, e, n, i, s, r) {
										(i[0] = s), (i[6] = e), Nr(t, i, n, 1, s, r);
									})(i, r[6], a, n, l, o),
								t.attachToViewContainerRef(this),
								re(r[8], s, t),
								t
							);
						}
						move(t, e) {
							if (t.destroyed) throw new Error('Cannot move a destroyed View in a ViewContainer!');
							return this.insert(t, e);
						}
						indexOf(t) {
							const e = this._lContainer[8];
							return null !== e ? e.indexOf(t) : -1;
						}
						remove(t) {
							this.allocateContainerIfNeeded();
							const e = this._adjustIndex(t, -1),
								n = xr(this._lContainer, e);
							n && (oe(this._lContainer[8], e), Sr(n[1], n));
						}
						detach(t) {
							this.allocateContainerIfNeeded();
							const e = this._adjustIndex(t, -1),
								n = xr(this._lContainer, e);
							return n && null != oe(this._lContainer[8], e) ? new Br(n) : null;
						}
						_adjustIndex(t, e = 0) {
							return null == t ? this.length + e : t;
						}
						allocateContainerIfNeeded() {
							null === this._lContainer[8] && (this._lContainer[8] = []);
						}
					});
				const r = i[n.index];
				if (Ie(r)) s = r;
				else {
					let t;
					if (3 === n.type) t = qe(r);
					else if (((t = i[11].createComment('')), Ne(i))) {
						const e = i[11],
							s = Qe(n, i);
						kr(
							e,
							Ir(e, s),
							t,
							(function (t, e) {
								return He(t) ? t.nextSibling(e) : e.nextSibling;
							})(e, s)
						);
					} else Rr(i[1], i, t, n);
					(i[n.index] = s = rr(r, i, t, n)), lr(i, s);
				}
				return new Hr(s, n, i);
			}
			let Qr = (() => {
				class t {}
				return (t.__NG_ELEMENT_ID__ = () => Zr()), t;
			})();
			const Zr = function (t = !1) {
					return (function (t, e, n) {
						if (!n && Re(t)) {
							const n = Ke(t.index, e);
							return new Br(n, n);
						}
						return 2 === t.type || 0 === t.type || 3 === t.type || 4 === t.type ? new Br(e[16], e) : null;
					})(cn(), on(), t);
				},
				Gr = Function,
				Kr = new Bt('Set Injector scope.'),
				Yr = {},
				Xr = {},
				Jr = [];
			let to = void 0;
			function eo() {
				return void 0 === to && (to = new te()), to;
			}
			function no(t, e = null, n = null, i) {
				return new io(t, n, e || eo(), i);
			}
			class io {
				constructor(t, e, n, i = null) {
					(this.parent = n),
						(this.records = new Map()),
						(this.injectorDefTypes = new Set()),
						(this.onDestroy = new Set()),
						(this._destroyed = !1);
					const s = [];
					e && se(e, n => this.processProvider(n, t, e)),
						se([t], t => this.processInjectorType(t, [], s)),
						this.records.set(zt, oo(void 0, this));
					const r = this.records.get(Kr);
					(this.scope = null != r ? r.value : null),
						(this.source = i || ('object' == typeof t ? null : wt(t)));
				}
				get destroyed() {
					return this._destroyed;
				}
				destroy() {
					this.assertNotDestroyed(), (this._destroyed = !0);
					try {
						this.onDestroy.forEach(t => t.ngOnDestroy());
					} finally {
						this.records.clear(), this.onDestroy.clear(), this.injectorDefTypes.clear();
					}
				}
				get(t, e = Vt, n = lt.Default) {
					this.assertNotDestroyed();
					const i = Qt(this);
					try {
						if (!(n & lt.SkipSelf)) {
							let e = this.records.get(t);
							if (void 0 === e) {
								const n =
									('function' == typeof (s = t) || ('object' == typeof s && s instanceof Bt)) &&
									pt(t);
								(e = n && this.injectableDefInScope(n) ? oo(so(t), Yr) : null), this.records.set(t, e);
							}
							if (null != e) return this.hydrate(t, e);
						}
						return (n & lt.Self ? eo() : this.parent).get(t, (e = n & lt.Optional && e === Vt ? null : e));
					} catch (r) {
						if ('NullInjectorError' === r.name) {
							if (((r.ngTempTokenPath = r.ngTempTokenPath || []).unshift(wt(t)), i)) throw r;
							return (function (t, e, n, i) {
								const s = t.ngTempTokenPath;
								throw (
									(e[Ht] && s.unshift(e[Ht]),
									(t.message = (function (t, e, n, i = null) {
										t = t && '\n' === t.charAt(0) && '\u0275' == t.charAt(1) ? t.substr(2) : t;
										let s = wt(e);
										if (Array.isArray(e)) s = e.map(wt).join(' -> ');
										else if ('object' == typeof e) {
											let t = [];
											for (let n in e)
												if (e.hasOwnProperty(n)) {
													let i = e[n];
													t.push(
														n + ':' + ('string' == typeof i ? JSON.stringify(i) : wt(i))
													);
												}
											s = `{${t.join(', ')}}`;
										}
										return `${n}${i ? '(' + i + ')' : ''}[${s}]: ${t.replace(Ut, '\n  ')}`;
									})('\n' + t.message, s, n, i)),
									(t.ngTokenPath = s),
									(t.ngTempTokenPath = null),
									t)
								);
							})(r, t, 'R3InjectorError', this.source);
						}
						throw r;
					} finally {
						Qt(i);
					}
					var s;
				}
				_resolveInjectorDefTypes() {
					this.injectorDefTypes.forEach(t => this.get(t));
				}
				toString() {
					const t = [];
					return this.records.forEach((e, n) => t.push(wt(n))), `R3Injector[${t.join(', ')}]`;
				}
				assertNotDestroyed() {
					if (this._destroyed) throw new Error('Injector has already been destroyed.');
				}
				processInjectorType(t, e, n) {
					if (!(t = Ct(t))) return !1;
					let i = mt(t);
					const s = (null == i && t.ngModule) || void 0,
						r = void 0 === s ? t : s,
						o = -1 !== n.indexOf(r);
					if ((void 0 !== s && (i = mt(s)), null == i)) return !1;
					if (null != i.imports && !o) {
						let t;
						n.push(r);
						try {
							se(i.imports, i => {
								this.processInjectorType(i, e, n) && (void 0 === t && (t = []), t.push(i));
							});
						} finally {
						}
						if (void 0 !== t)
							for (let e = 0; e < t.length; e++) {
								const { ngModule: n, providers: i } = t[e];
								se(i, t => this.processProvider(t, n, i || Jr));
							}
					}
					this.injectorDefTypes.add(r), this.records.set(r, oo(i.factory, Yr));
					const a = i.providers;
					if (null != a && !o) {
						const e = t;
						se(a, t => this.processProvider(t, e, a));
					}
					return void 0 !== s && void 0 !== t.providers;
				}
				processProvider(t, e, n) {
					let i = lo((t = Ct(t))) ? t : Ct(t && t.provide);
					const s = (function (t, e, n) {
						return ao(t) ? oo(void 0, t.useValue) : oo(ro(t), Yr);
					})(t);
					if (lo(t) || !0 !== t.multi) this.records.get(i);
					else {
						let e = this.records.get(i);
						e || ((e = oo(void 0, Yr, !0)), (e.factory = () => Jt(e.multi)), this.records.set(i, e)),
							(i = t),
							e.multi.push(t);
					}
					this.records.set(i, s);
				}
				hydrate(t, e) {
					var n;
					return (
						e.value === Yr && ((e.value = Xr), (e.value = e.factory())),
						'object' == typeof e.value &&
							e.value &&
							null !== (n = e.value) &&
							'object' == typeof n &&
							'function' == typeof n.ngOnDestroy &&
							this.onDestroy.add(e.value),
						e.value
					);
				}
				injectableDefInScope(t) {
					return (
						!!t.providedIn &&
						('string' == typeof t.providedIn
							? 'any' === t.providedIn || t.providedIn === this.scope
							: this.injectorDefTypes.has(t.providedIn))
					);
				}
			}
			function so(t) {
				const e = pt(t),
					n = null !== e ? e.factory : Ee(t);
				if (null !== n) return n;
				const i = mt(t);
				if (null !== i) return i.factory;
				if (t instanceof Bt) throw new Error(`Token ${wt(t)} is missing a \u0275prov definition.`);
				if (t instanceof Function)
					return (function (t) {
						const e = t.length;
						if (e > 0) {
							const n = ae(e, '?');
							throw new Error(`Can't resolve all parameters for ${wt(t)}: (${n.join(', ')}).`);
						}
						const n = (function (t) {
							const e = t && (t[gt] || t[vt] || (t[_t] && t[_t]()));
							if (e) {
								const n = (function (t) {
									if (t.hasOwnProperty('name')) return t.name;
									const e = ('' + t).match(/^function\s*([^\s(]+)/);
									return null === e ? '' : e[1];
								})(t);
								return (
									console.warn(
										`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
									),
									e
								);
							}
							return null;
						})(t);
						return null !== n ? () => n.factory(t) : () => new t();
					})(t);
				throw new Error('unreachable');
			}
			function ro(t, e, n) {
				let i = void 0;
				if (lo(t)) {
					const e = Ct(t);
					return Ee(e) || so(e);
				}
				if (ao(t)) i = () => Ct(t.useValue);
				else if ((s = t) && s.useFactory) i = () => t.useFactory(...Jt(t.deps || []));
				else if (
					(function (t) {
						return !(!t || !t.useExisting);
					})(t)
				)
					i = () => Kt(Ct(t.useExisting));
				else {
					const e = Ct(t && (t.useClass || t.provide));
					if (
						!(function (t) {
							return !!t.deps;
						})(t)
					)
						return Ee(e) || so(e);
					i = () => new e(...Jt(t.deps));
				}
				var s;
				return i;
			}
			function oo(t, e, n = !1) {
				return { factory: t, value: e, multi: n ? [] : void 0 };
			}
			function ao(t) {
				return null !== t && 'object' == typeof t && $t in t;
			}
			function lo(t) {
				return 'function' == typeof t;
			}
			const co = function (t, e, n) {
				return (function (t, e = null, n = null, i) {
					const s = no(t, e, n, i);
					return s._resolveInjectorDefTypes(), s;
				})({ name: n }, e, t, n);
			};
			let uo = (() => {
				class t {
					static create(t, e) {
						return Array.isArray(t) ? co(t, e, '') : co(t.providers, t.parent, t.name || '');
					}
				}
				return (
					(t.THROW_IF_NOT_FOUND = Vt),
					(t.NULL = new te()),
					(t.ɵprov = ht({ token: t, providedIn: 'any', factory: () => Kt(zt) })),
					(t.__NG_ELEMENT_ID__ = -1),
					t
				);
			})();
			const ho = new Bt('AnalyzeForEntryComponents');
			function po(t, e, n) {
				let i = n ? t.styles : null,
					s = n ? t.classes : null,
					r = 0;
				if (null !== e)
					for (let o = 0; o < e.length; o++) {
						const t = e[o];
						'number' == typeof t
							? (r = t)
							: 1 == r
							? (s = xt(s, t))
							: 2 == r && (i = xt(i, t + ': ' + e[++o] + ';'));
					}
				n ? (t.styles = i) : (t.stylesWithoutHost = i), n ? (t.classes = s) : (t.classesWithoutHost = s);
			}
			function fo(t, e) {
				const n = Ye(t)[1],
					i = n.data.length - 1;
				Pn(n, { directiveStart: i, directiveEnd: i + 1 });
			}
			function mo(t) {
				let e = Object.getPrototypeOf(t.type.prototype).constructor,
					n = !0;
				const i = [t];
				for (; e; ) {
					let s = void 0;
					if (Le(t)) s = e.ɵcmp || e.ɵdir;
					else {
						if (e.ɵcmp) throw new Error('Directives cannot inherit Components');
						s = e.ɵdir;
					}
					if (s) {
						if (n) {
							i.push(s);
							const e = t;
							(e.inputs = go(t.inputs)),
								(e.declaredInputs = go(t.declaredInputs)),
								(e.outputs = go(t.outputs));
							const n = s.hostBindings;
							n && vo(t, n);
							const r = s.viewQuery,
								o = s.contentQueries;
							if (
								(r && yo(t, r),
								o && _o(t, o),
								ut(t.inputs, s.inputs),
								ut(t.declaredInputs, s.declaredInputs),
								ut(t.outputs, s.outputs),
								Le(s) && s.data.animation)
							) {
								const e = t.data;
								e.animation = (e.animation || []).concat(s.data.animation);
							}
						}
						const e = s.features;
						if (e)
							for (let i = 0; i < e.length; i++) {
								const s = e[i];
								s && s.ngInherit && s(t), s === mo && (n = !1);
							}
					}
					e = Object.getPrototypeOf(e);
				}
				!(function (t) {
					let e = 0,
						n = null;
					for (let i = t.length - 1; i >= 0; i--) {
						const s = t[i];
						(s.hostVars = e += s.hostVars), (s.hostAttrs = Hn(s.hostAttrs, (n = Hn(n, s.hostAttrs))));
					}
				})(i);
			}
			function go(t) {
				return t === pe ? {} : t === fe ? [] : t;
			}
			function yo(t, e) {
				const n = t.viewQuery;
				t.viewQuery = n
					? (t, i) => {
							e(t, i), n(t, i);
					  }
					: e;
			}
			function _o(t, e) {
				const n = t.contentQueries;
				t.contentQueries = n
					? (t, i, s) => {
							e(t, i, s), n(t, i, s);
					  }
					: e;
			}
			function vo(t, e) {
				const n = t.hostBindings;
				t.hostBindings = n
					? (t, i) => {
							e(t, i), n(t, i);
					  }
					: e;
			}
			let bo = null;
			function wo() {
				if (!bo) {
					const t = Rt.Symbol;
					if (t && t.iterator) bo = t.iterator;
					else {
						const t = Object.getOwnPropertyNames(Map.prototype);
						for (let e = 0; e < t.length; ++e) {
							const n = t[e];
							'entries' !== n && 'size' !== n && Map.prototype[n] === Map.prototype.entries && (bo = n);
						}
					}
				}
				return bo;
			}
			function xo(t) {
				return !!So(t) && (Array.isArray(t) || (!(t instanceof Map) && wo() in t));
			}
			function So(t) {
				return null !== t && ('function' == typeof t || 'object' == typeof t);
			}
			function Eo(t, e, n) {
				return !Object.is(t[e], n) && ((t[e] = n), !0);
			}
			function Co(t, e, n, i) {
				const s = on();
				return Eo(s, mn(), e) && (an(), nr(Rn(), s, t, e, n, i)), Co;
			}
			function ko(t, e, n, i, s, r, o, a) {
				const l = on(),
					c = an(),
					u = t + ke,
					h = c.firstCreatePass
						? (function (t, e, n, i, s, r, o, a, l) {
								const c = e.consts,
									u = Ns(e, t, 0, o || null, tn(c, a));
								Ws(e, n, u, tn(c, l)), Pn(e, u);
								const h = (u.tViews = Us(
									2,
									u,
									i,
									s,
									r,
									e.directiveRegistry,
									e.pipeRegistry,
									null,
									e.schemas,
									c
								));
								return (
									null !== e.queries &&
										(e.queries.template(e, u), (h.queries = e.queries.embeddedTView(u))),
									u
								);
						  })(t, c, l, e, n, i, s, r, o)
						: c.data[u];
				un(h, !1);
				const d = l[11].createComment('');
				Rr(c, l, d, h),
					rs(d, l),
					lr(l, (l[u] = rr(d, l, d, h))),
					Pe(h) && Bs(c, l, h),
					null != o && zs(l, h, a);
			}
			function To(t, e = lt.Default) {
				const n = on();
				return null === n ? Kt(t, e) : oi(cn(), n, Ct(t), e);
			}
			function Ao(t) {
				return (function (t, e) {
					if ('class' === e) return t.classes;
					if ('style' === e) return t.styles;
					const n = t.attrs;
					if (n) {
						const t = n.length;
						let i = 0;
						for (; i < t; ) {
							const s = n[i];
							if (Vn(s)) break;
							if (0 === s) i += 2;
							else if ('number' == typeof s) for (i++; i < t && 'string' == typeof n[i]; ) i++;
							else {
								if (s === e) return n[i + 1];
								i += 2;
							}
						}
					}
					return null;
				})(cn(), t);
			}
			function Io(t, e, n) {
				const i = on();
				return Eo(i, mn(), e) && qs(an(), Rn(), i, t, e, i[11], n, !1), Io;
			}
			function Oo(t, e, n, i, s) {
				const r = s ? 'class' : 'style';
				yr(t, n, e.inputs[r], r, i);
			}
			function Ro(t, e, n, i) {
				const s = on(),
					r = an(),
					o = ke + t,
					a = s[11],
					l = (s[o] = Ps(e, a, sn.lFrame.currentNamespace)),
					c = r.firstCreatePass
						? (function (t, e, n, i, s, r, o) {
								const a = e.consts,
									l = Ns(e, t, 2, s, tn(a, r));
								return (
									Ws(e, n, l, tn(a, o)),
									null !== l.attrs && po(l, l.attrs, !1),
									null !== l.mergedAttrs && po(l, l.mergedAttrs, !0),
									null !== e.queries && e.queries.elementStart(e, l),
									l
								);
						  })(t, r, s, 0, e, n, i)
						: r.data[o];
				un(c, !0);
				const u = c.mergedAttrs;
				null !== u && zn(a, l, u);
				const h = c.classes;
				null !== h && jr(a, l, h);
				const d = c.styles;
				null !== d && Fr(a, l, d),
					Rr(r, s, l, c),
					0 === sn.lFrame.elementDepthCount && rs(l, s),
					sn.lFrame.elementDepthCount++,
					Pe(c) &&
						(Bs(r, s, c),
						(function (t, e, n) {
							if (Oe(e)) {
								const i = e.directiveEnd;
								for (let s = e.directiveStart; s < i; s++) {
									const e = t.data[s];
									e.contentQueries && e.contentQueries(1, n[s], s);
								}
							}
						})(r, c, s)),
					null !== i && zs(s, c);
			}
			function Po() {
				let t = cn();
				hn() ? dn() : ((t = t.parent), un(t, !1));
				const e = t;
				sn.lFrame.elementDepthCount--;
				const n = an();
				n.firstCreatePass && (Pn(n, t), Oe(t) && n.queries.elementEnd(t)),
					null != e.classesWithoutHost &&
						(function (t) {
							return 0 != (16 & t.flags);
						})(e) &&
						Oo(n, e, on(), e.classesWithoutHost, !0),
					null != e.stylesWithoutHost &&
						(function (t) {
							return 0 != (32 & t.flags);
						})(e) &&
						Oo(n, e, on(), e.stylesWithoutHost, !1);
			}
			function Lo(t, e, n, i) {
				Ro(t, e, n, i), Po();
			}
			function No() {
				return on();
			}
			function Do(t) {
				return !!t && 'function' == typeof t.then;
			}
			function Mo(t, e, n = !1, i) {
				const s = on(),
					r = an(),
					o = cn();
				return jo(r, s, s[11], o, t, e, n, i), Mo;
			}
			function Fo(t, e, n = !1, i) {
				const s = cn(),
					r = on(),
					o = an();
				return jo(o, r, mr(vn(o.data), s, r), s, t, e, n, i), Fo;
			}
			function jo(t, e, n, i, s, r, o = !1, a) {
				const l = Pe(i),
					c = t.firstCreatePass && (t.cleanup || (t.cleanup = [])),
					u = fr(e);
				let h = !0;
				if (2 === i.type) {
					const d = Qe(i, e),
						p = a ? a(d) : pe,
						f = p.target || d,
						m = u.length,
						g = a ? t => a(qe(t[i.index])).target : i.index;
					if (He(n)) {
						let o = null;
						if (
							(!a &&
								l &&
								(o = (function (t, e, n, i) {
									const s = t.cleanup;
									if (null != s)
										for (let r = 0; r < s.length - 1; r += 2) {
											const t = s[r];
											if (t === n && s[r + 1] === i) {
												const t = e[7],
													n = s[r + 2];
												return t.length > n ? t[n] : null;
											}
											'string' == typeof t && (r += 2);
										}
									return null;
								})(t, e, s, i.index)),
							null !== o)
						)
							((o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = r),
								(o.__ngLastListenerFn__ = r),
								(h = !1);
						else {
							r = zo(i, e, r, !1);
							const t = n.listen(p.name || f, s, r);
							u.push(r, t), c && c.push(s, g, m, m + 1);
						}
					} else (r = zo(i, e, r, !0)), f.addEventListener(s, r, o), u.push(r), c && c.push(s, g, m, o);
				}
				const d = i.outputs;
				let p;
				if (h && null !== d && (p = d[s])) {
					const t = p.length;
					if (t)
						for (let n = 0; n < t; n += 2) {
							const t = e[p[n]][p[n + 1]].subscribe(r),
								o = u.length;
							u.push(r, t), c && c.push(s, i.index, o, -(o + 1));
						}
				}
			}
			function Bo(t, e, n) {
				try {
					return !1 !== e(n);
				} catch (i) {
					return gr(t, i), !1;
				}
			}
			function zo(t, e, n, i) {
				return function s(r) {
					if (r === Function) return n;
					const o = 2 & t.flags ? Ke(t.index, e) : e;
					0 == (32 & e[2]) && cr(o);
					let a = Bo(e, n, r),
						l = s.__ngNextListenerFn__;
					for (; l; ) (a = Bo(e, l, r) && a), (l = l.__ngNextListenerFn__);
					return i && !1 === a && (r.preventDefault(), (r.returnValue = !1)), a;
				};
			}
			function Vo(t = 1) {
				return (function (t) {
					return (sn.lFrame.contextLView = (function (t, e) {
						for (; t > 0; ) (e = e[15]), t--;
						return e;
					})(t, sn.lFrame.contextLView))[8];
				})(t);
			}
			function Uo(t, e) {
				let n = null;
				const i = (function (t) {
					const e = t.attrs;
					if (null != e) {
						const t = e.indexOf(5);
						if (0 == (1 & t)) return e[t + 1];
					}
					return null;
				})(t);
				for (let s = 0; s < e.length; s++) {
					const r = e[s];
					if ('*' !== r) {
						if (null === i ? fs(t, r, !0) : ms(i, r)) return s;
					} else n = s;
				}
				return n;
			}
			function Ho(t) {
				const e = on()[16][6];
				if (!e.projection) {
					const n = (e.projection = ae(t ? t.length : 1, null)),
						i = n.slice();
					let s = e.child;
					for (; null !== s; ) {
						const e = t ? Uo(s, t) : 0;
						null !== e && (i[e] ? (i[e].projectionNext = s) : (n[e] = s), (i[e] = s)), (s = s.next);
					}
				}
			}
			let $o = !1;
			function qo(t) {
				$o = t;
			}
			function Wo(t, e = 0, n) {
				const i = on(),
					s = an(),
					r = Ns(s, t, 1, null, n || null);
				null === r.projection && (r.projection = e), dn(), $o || Dr(s, i, r);
			}
			const Qo = [];
			function Zo(t, e, n, i, s) {
				const r = t[n + 1],
					o = null === e;
				let a = i ? ks(r) : As(r),
					l = !1;
				for (; 0 !== a && (!1 === l || o); ) {
					const n = t[a + 1];
					Go(t[a], e) && ((l = !0), (t[a + 1] = i ? Os(n) : Ts(n))), (a = i ? ks(n) : As(n));
				}
				l && (t[n + 1] = i ? Ts(r) : Os(r));
			}
			function Go(t, e) {
				return (
					null === t ||
					null == e ||
					(Array.isArray(t) ? t[1] : t) === e ||
					(!(!Array.isArray(t) || 'string' != typeof e) && ue(t, e) >= 0)
				);
			}
			function Ko(t, e, n) {
				return Xo(t, e, n, !1), Ko;
			}
			function Yo(t, e) {
				return Xo(t, e, null, !0), Yo;
			}
			function Xo(t, e, n, i) {
				const s = on(),
					r = an(),
					o = gn(2);
				r.firstUpdatePass &&
					(function (t, e, n, i) {
						const s = t.data;
						if (null === s[n + 1]) {
							const r = s[In() + ke],
								o = (function (t, e) {
									return e >= t.expandoStartIndex;
								})(t, n);
							(function (t, e) {
								return 0 != (t.flags & (e ? 16 : 32));
							})(r, i) &&
								null === e &&
								!o &&
								(e = !1),
								(e = (function (t, e, n, i) {
									const s = vn(t);
									let r = i ? e.residualClasses : e.residualStyles;
									if (null === s)
										0 === (i ? e.classBindings : e.styleBindings) &&
											((n = ta((n = Jo(null, t, e, n, i)), e.attrs, i)), (r = null));
									else {
										const o = e.directiveStylingLast;
										if (-1 === o || t[o] !== s)
											if (((n = Jo(s, t, e, n, i)), null === r)) {
												let n = (function (t, e, n) {
													const i = n ? e.classBindings : e.styleBindings;
													if (0 !== As(i)) return t[ks(i)];
												})(t, e, i);
												void 0 !== n &&
													Array.isArray(n) &&
													((n = Jo(null, t, e, n[1], i)),
													(n = ta(n, e.attrs, i)),
													(function (t, e, n, i) {
														t[ks(n ? e.classBindings : e.styleBindings)] = i;
													})(t, e, i, n));
											} else
												r = (function (t, e, n) {
													let i = void 0;
													const s = e.directiveEnd;
													for (let r = 1 + e.directiveStylingLast; r < s; r++)
														i = ta(i, t[r].hostAttrs, n);
													return ta(i, e.attrs, n);
												})(t, e, i);
									}
									return void 0 !== r && (i ? (e.residualClasses = r) : (e.residualStyles = r)), n;
								})(s, r, e, i)),
								(function (t, e, n, i, s, r) {
									let o = r ? e.classBindings : e.styleBindings,
										a = ks(o),
										l = As(o);
									t[i] = n;
									let c,
										u = !1;
									if (Array.isArray(n)) {
										const t = n;
										(c = t[1]), (null === c || ue(t, c) > 0) && (u = !0);
									} else c = n;
									if (s)
										if (0 !== l) {
											const e = ks(t[a + 1]);
											(t[i + 1] = Cs(e, a)),
												0 !== e && (t[e + 1] = Is(t[e + 1], i)),
												(t[a + 1] = (131071 & t[a + 1]) | (i << 17));
										} else (t[i + 1] = Cs(a, 0)), 0 !== a && (t[a + 1] = Is(t[a + 1], i)), (a = i);
									else
										(t[i + 1] = Cs(l, 0)),
											0 === a ? (a = i) : (t[l + 1] = Is(t[l + 1], i)),
											(l = i);
									u && (t[i + 1] = Ts(t[i + 1])),
										Zo(t, c, i, !0),
										Zo(t, c, i, !1),
										(function (t, e, n, i, s) {
											const r = s ? t.residualClasses : t.residualStyles;
											null != r &&
												'string' == typeof e &&
												ue(r, e) >= 0 &&
												(n[i + 1] = Os(n[i + 1]));
										})(e, c, t, i, r),
										(o = Cs(a, l)),
										r ? (e.classBindings = o) : (e.styleBindings = o);
								})(s, r, e, n, o, i);
						}
					})(r, t, o, i),
					e !== _s &&
						Eo(s, o, e) &&
						(function (t, e, n, i, s, r, o, a) {
							if (2 !== e.type) return;
							const l = t.data,
								c = l[a + 1];
							na(1 == (1 & c) ? ea(l, e, n, s, As(c), o) : void 0) ||
								(na(r) ||
									((function (t) {
										return 2 == (2 & t);
									})(c) &&
										(r = ea(l, null, n, s, a, o))),
								(function (t, e, n, i, s) {
									const r = He(t);
									if (e)
										s
											? r
												? t.addClass(n, i)
												: n.classList.add(i)
											: r
											? t.removeClass(n, i)
											: n.classList.remove(i);
									else {
										const e = -1 == i.indexOf('-') ? void 0 : 2;
										null == s
											? r
												? t.removeStyle(n, i, e)
												: n.style.removeProperty(i)
											: r
											? t.setStyle(n, i, s, e)
											: n.style.setProperty(i, s);
									}
								})(i, o, We(In(), n), s, r));
						})(
							r,
							r.data[In() + ke],
							s,
							s[11],
							t,
							(s[o + 1] = (function (t, e) {
								return (
									null == t ||
										('string' == typeof e ? (t += e) : 'object' == typeof t && (t = wt(ki(t)))),
									t
								);
							})(e, n)),
							i,
							o
						);
			}
			function Jo(t, e, n, i, s) {
				let r = null;
				const o = n.directiveEnd;
				let a = n.directiveStylingLast;
				for (
					-1 === a ? (a = n.directiveStart) : a++;
					a < o && ((r = e[a]), (i = ta(i, r.hostAttrs, s)), r !== t);

				)
					a++;
				return null !== t && (n.directiveStylingLast = a), i;
			}
			function ta(t, e, n) {
				const i = n ? 1 : 2;
				let s = -1;
				if (null !== e)
					for (let r = 0; r < e.length; r++) {
						const o = e[r];
						'number' == typeof o
							? (s = o)
							: s === i &&
							  (Array.isArray(t) || (t = void 0 === t ? [] : ['', t]), le(t, o, !!n || e[++r]));
					}
				return void 0 === t ? null : t;
			}
			function ea(t, e, n, i, s, r) {
				const o = null === e;
				let a = void 0;
				for (; s > 0; ) {
					const e = t[s],
						r = Array.isArray(e),
						l = r ? e[1] : e,
						c = null === l;
					let u = n[s + 1];
					u === _s && (u = c ? Qo : void 0);
					let h = c ? ce(u, i) : l === i ? u : void 0;
					if ((r && !na(h) && (h = ce(e, i)), na(h) && ((a = h), o))) return a;
					const d = t[s + 1];
					s = o ? ks(d) : As(d);
				}
				if (null !== e) {
					let t = r ? e.residualClasses : e.residualStyles;
					null != t && (a = ce(t, i));
				}
				return a;
			}
			function na(t) {
				return void 0 !== t;
			}
			function ia(t, e = '') {
				const n = on(),
					i = an(),
					s = t + ke,
					r = i.firstCreatePass ? Ns(i, t, 2, null, null) : i.data[s],
					o = (n[s] = br(e, n[11]));
				Rr(i, n, o, r), un(r, !1);
			}
			function sa(t) {
				return ra('', t, ''), sa;
			}
			function ra(t, e, n) {
				const i = on(),
					s = (function (t, e, n, i) {
						return Eo(t, mn(), n) ? e + Zn(n) + i : _s;
					})(i, t, e, n);
				return s !== _s && _r(i, In(), s), ra;
			}
			function oa(t, e, n, i, s) {
				const r = on(),
					o = (function (t, e, n, i, s, r) {
						const o = (function (t, e, n, i) {
							const s = Eo(t, e, n);
							return Eo(t, e + 1, i) || s;
						})(t, sn.lFrame.bindingIndex, n, s);
						return gn(2), o ? e + Zn(n) + i + Zn(s) + r : _s;
					})(r, t, e, n, i, s);
				return o !== _s && _r(r, In(), o), oa;
			}
			function aa(t, e, n) {
				const i = on();
				return Eo(i, mn(), e) && qs(an(), Rn(), i, t, e, i[11], n, !0), aa;
			}
			function la(t, e, n) {
				const i = on();
				if (Eo(i, mn(), e)) {
					const s = an(),
						r = Rn();
					qs(s, r, i, t, e, mr(vn(s.data), r, i), n, !0);
				}
				return la;
			}
			const ca = void 0;
			var ua = [
				'en',
				[['a', 'p'], ['AM', 'PM'], ca],
				[['AM', 'PM'], ca, ca],
				[
					['S', 'M', 'T', 'W', 'T', 'F', 'S'],
					['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
					['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
					['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
				],
				ca,
				[
					['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
					['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
					[
						'January',
						'February',
						'March',
						'April',
						'May',
						'June',
						'July',
						'August',
						'September',
						'October',
						'November',
						'December',
					],
				],
				ca,
				[
					['B', 'A'],
					['BC', 'AD'],
					['Before Christ', 'Anno Domini'],
				],
				0,
				[6, 0],
				['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
				['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
				['{1}, {0}', ca, "{1} 'at' {0}", ca],
				['.', ',', ';', '%', '+', '-', 'E', '\xd7', '\u2030', '\u221e', 'NaN', ':'],
				['#,##0.###', '#,##0%', '\xa4#,##0.00', '#E0'],
				'USD',
				'$',
				'US Dollar',
				{},
				'ltr',
				function (t) {
					let e = Math.floor(Math.abs(t)),
						n = t.toString().replace(/^[^.]*\.?/, '').length;
					return 1 === e && 0 === n ? 1 : 5;
				},
			];
			let ha = {};
			function da(t) {
				return (
					t in ha || (ha[t] = Rt.ng && Rt.ng.common && Rt.ng.common.locales && Rt.ng.common.locales[t]), ha[t]
				);
			}
			var pa = (function (t) {
				return (
					(t[(t.LocaleId = 0)] = 'LocaleId'),
					(t[(t.DayPeriodsFormat = 1)] = 'DayPeriodsFormat'),
					(t[(t.DayPeriodsStandalone = 2)] = 'DayPeriodsStandalone'),
					(t[(t.DaysFormat = 3)] = 'DaysFormat'),
					(t[(t.DaysStandalone = 4)] = 'DaysStandalone'),
					(t[(t.MonthsFormat = 5)] = 'MonthsFormat'),
					(t[(t.MonthsStandalone = 6)] = 'MonthsStandalone'),
					(t[(t.Eras = 7)] = 'Eras'),
					(t[(t.FirstDayOfWeek = 8)] = 'FirstDayOfWeek'),
					(t[(t.WeekendRange = 9)] = 'WeekendRange'),
					(t[(t.DateFormat = 10)] = 'DateFormat'),
					(t[(t.TimeFormat = 11)] = 'TimeFormat'),
					(t[(t.DateTimeFormat = 12)] = 'DateTimeFormat'),
					(t[(t.NumberSymbols = 13)] = 'NumberSymbols'),
					(t[(t.NumberFormats = 14)] = 'NumberFormats'),
					(t[(t.CurrencyCode = 15)] = 'CurrencyCode'),
					(t[(t.CurrencySymbol = 16)] = 'CurrencySymbol'),
					(t[(t.CurrencyName = 17)] = 'CurrencyName'),
					(t[(t.Currencies = 18)] = 'Currencies'),
					(t[(t.Directionality = 19)] = 'Directionality'),
					(t[(t.PluralCase = 20)] = 'PluralCase'),
					(t[(t.ExtraData = 21)] = 'ExtraData'),
					t
				);
			})({});
			const fa = 'en-US',
				ma = { marker: 'element' },
				ga = { marker: 'comment' };
			let ya = fa;
			function _a(t) {
				var e, n;
				(n = 'Expected localeId to be defined'),
					null == (e = t) &&
						(function (t, e, n, i) {
							throw new Error('ASSERTION ERROR: ' + t + ` [Expected=> null != ${e} <=Actual]`);
						})(n, e),
					'string' == typeof t && (ya = t.toLowerCase().replace(/_/g, '-'));
			}
			const va = [];
			let ba = -1;
			function wa(t, e, n, i, s) {
				const r = e.next;
				i || (i = n),
					i === n && e !== n.child
						? ((e.next = n.child), null === e.parent ? (t.firstChild = e) : (n.child = e))
						: i !== n && e !== i.next
						? ((e.next = i.next), (i.next = e))
						: (e.next = null),
					n !== s[6] && (e.parent = n);
				let o = e.next;
				for (; o; ) o.next === e && (o.next = r), (o = o.next);
				if (1 === e.type) return Dr(t, s, e), e;
				Rr(t, s, Qe(e, s), e);
				const a = s[e.index];
				return 0 !== e.type && Ie(a) && Rr(t, s, a[7], e), e;
			}
			function xa(t, e, n, i) {
				const s = Ze(t, n),
					r = We(n, e);
				r && Pr(e[11], r);
				const o = Ge(e, n);
				if (Ie(o)) {
					const t = o;
					0 !== s.type && Pr(e[11], t[7]);
				}
				i && s && (s.flags |= 64);
			}
			function Sa(t, e, n, i, s, r) {
				const o = cn();
				e[n + ke] = s;
				const a = Ns(t, n, i, r, null);
				return o && o.next === a && (o.next = null), a;
			}
			const Ea = /\ufffd(\d+):?\d*\ufffd/gi,
				Ca = /({\s*\ufffd\d+:?\d*\ufffd\s*,\s*\S{6}\s*,[\s\S]*})/gi,
				ka = /\ufffd(\d+)\ufffd/,
				Ta = /^\s*(\ufffd\d+:?\d*\ufffd)\s*,\s*(select|plural)\s*,/;
			let Aa;
			const Ia = [],
				Oa = /\ufffd\/?\*(\d+:\d+)\ufffd/gi,
				Ra = /\ufffd(\/?[#*!]\d+):?\d*\ufffd/gi,
				Pa = /\uE500/g;
			function La(t, e, n, i = null) {
				const s = [null, null],
					r = t.split(Ea);
				let o = 0;
				for (let a = 0; a < r.length; a++) {
					const t = r[a];
					if (1 & a) {
						const e = parseInt(t, 10);
						s.push(-1 - e), (o |= Ma(e));
					} else '' !== t && s.push(t);
				}
				return s.push((e << 2) | (n ? 1 : 0)), n && s.push(n, i), (s[0] = o), (s[1] = s.length - 2), s;
			}
			function Na(t, e = 0) {
				let n;
				e |= Ma(t.mainBinding);
				for (let i = 0; i < t.values.length; i++) {
					const s = t.values[i];
					for (let t = 0; t < s.length; t++) {
						const i = s[t];
						if ('string' == typeof i) for (; (n = Ea.exec(i)); ) e |= Ma(parseInt(n[1], 10));
						else e = Na(i, e);
					}
				}
				return e;
			}
			function Da(t) {
				return t + Aa++;
			}
			function Ma(t) {
				return 1 << Math.min(t, 31);
			}
			function Fa(t) {
				return void 0 === t;
			}
			function ja(t) {
				let e,
					n,
					i = '',
					s = 0,
					r = !1;
				for (; null !== (e = Oa.exec(t)); )
					r
						? e[0] === `\ufffd/*${n}\ufffd` && ((s = e.index), (r = !1))
						: ((i += t.substring(s, e.index + e[0].length)), (n = e[1]), (r = !0));
				return (i += t.substr(s)), i;
			}
			function Ba(t, e, n, i) {
				const s = [],
					r = [],
					o = [],
					a = [],
					l = [],
					c = e.values;
				for (let u = 0; u < c.length; u++) {
					const e = c[u],
						h = [];
					for (let t = 0; t < e.length; t++) {
						const n = e[t];
						if ('string' != typeof n) {
							const i = h.push(n) - 1;
							e[t] = `\x3c!--\ufffd${i}\ufffd--\x3e`;
						}
					}
					const d = Va(e.join(''), n, h, t, i);
					s.push(d.create), r.push(d.remove), o.push(d.update), a.push(d.vars), l.push(d.childIcus);
				}
				t.push({
					type: e.type,
					vars: a,
					currentCaseLViewIndex: ke + i + 1,
					childIcus: l,
					cases: e.cases,
					create: s,
					remove: r,
					update: o,
				}),
					(Aa += Math.max(...a));
			}
			function za(t) {
				const e = [],
					n = [];
				let i = 1,
					s = 0;
				const r = Ua(
					(t = t.replace(Ta, function (t, e, n) {
						return (i = 'select' === n ? 0 : 1), (s = parseInt(e.substr(1), 10)), '';
					}))
				);
				for (let o = 0; o < r.length; ) {
					let t = r[o++].trim();
					1 === i && (t = t.replace(/\s*(?:=)?(\w+)\s*/, '$1')), t.length && e.push(t);
					const s = Ua(r[o++]);
					e.length > n.length && n.push(s);
				}
				return { type: i, mainBinding: s, cases: e, values: n };
			}
			function Va(t, e, n, i, s) {
				const r = Pi(Ue()).getInertBodyElement(t);
				if (!r) throw new Error('Unable to generate inert body element');
				const o = { vars: 1, childIcus: [], create: [], remove: [], update: [] };
				return (
					(function t(e, n, i, s, r, o) {
						if (e) {
							const a = [];
							for (; e; ) {
								const l = e.nextSibling,
									c = o + ++n.vars;
								switch (e.nodeType) {
									case Node.ELEMENT_NODE:
										const l = e,
											u = l.tagName.toLowerCase();
										if (qi.hasOwnProperty(u)) {
											n.create.push(ma, u, c, (i << 17) | 1);
											const a = l.attributes;
											for (let t = 0; t < a.length; t++) {
												const e = a.item(t),
													i = e.name.toLowerCase();
												e.value.match(Ea)
													? Zi.hasOwnProperty(i) &&
													  ie(
															Wi[i]
																? La(e.value, c, e.name, Fi)
																: Qi[i]
																? La(e.value, c, e.name, ji)
																: La(e.value, c, e.name),
															n.update
													  )
													: n.create.push((c << 3) | 4, e.name, e.value);
											}
											t(e.firstChild, n, c, s, r, o), n.remove.push((c << 3) | 3);
										} else n.vars--;
										break;
									case Node.TEXT_NODE:
										const h = e.textContent || '',
											d = h.match(Ea);
										n.create.push(d ? '' : h, c, (i << 17) | 1),
											n.remove.push((c << 3) | 3),
											d && ie(La(h, c), n.update);
										break;
									case Node.COMMENT_NODE:
										const p = ka.exec(e.textContent || '');
										if (p) {
											const t = parseInt(p[1], 10);
											n.create.push(ga, '', c, (i << 17) | 1), a.push([s[t], c]);
										} else n.vars--;
										break;
									default:
										n.vars--;
								}
								e = l;
							}
							for (let t = 0; t < a.length; t++) {
								const e = a[t][0],
									i = a[t][1];
								Ba(r, e, i, o + n.vars);
								const s = r.length - 1;
								(n.vars += Math.max(...r[s].vars)), n.childIcus.push(s);
								const l = Na(e);
								n.update.push(
									Ma(e.mainBinding),
									3,
									-1 - e.mainBinding,
									(i << 2) | 2,
									s,
									l,
									2,
									(i << 2) | 3,
									s
								),
									n.remove.push((s << 3) | 6, (i << 3) | 3);
							}
						}
					})((ns(r) || r).firstChild, o, e, n, i, s),
					o
				);
			}
			function Ua(t) {
				if (!t) return [];
				let e = 0;
				const n = [],
					i = [],
					s = /[{}]/g;
				let r;
				for (s.lastIndex = 0; (r = s.exec(t)); ) {
					const s = r.index;
					if ('}' == r[0]) {
						if ((n.pop(), 0 == n.length)) {
							const n = t.substring(e, s);
							Ta.test(n) ? i.push(za(n)) : i.push(n), (e = s + 1);
						}
					} else {
						if (0 == n.length) {
							const n = t.substring(e, s);
							i.push(n), (e = s + 1);
						}
						n.push('{');
					}
				}
				const o = t.substring(e);
				return i.push(o), i;
			}
			function Ha(t, e, n) {
				(function (t, e, n) {
					const i = an(),
						s = tn(i.consts, e);
					!(function (t) {
						va[++ba] = t;
					})(t),
						qo(!0),
						i.firstCreatePass &&
							null === i.data[t + ke] &&
							(function (t, e, n, i, s) {
								const r = e.blueprint.length - ke;
								Aa = 0;
								const o = cn(),
									a = hn() ? o : o && o.parent;
								let l = a && a !== t[6] ? a.index - ke : n,
									c = 0;
								Ia[c] = l;
								const u = [];
								if (n > 0 && o !== a) {
									let t = o.index - ke;
									hn() || (t = ~t), u.push((t << 3) | 0);
								}
								const h = [],
									d = [];
								if ('' === i && Fa(s)) u.push(i, Da(r), (l << 17) | 1);
								else {
									const t = (function (t, e) {
											if (Fa(e)) return ja(t);
											{
												const n = t.indexOf(`:${e}\ufffd`) + 2 + e.toString().length,
													i = t.search(new RegExp(`\ufffd\\/\\*\\d+:${e}\ufffd`));
												return ja(t.substring(n, i));
											}
										})(i, s),
										e = ((p = t), p.replace(Pa, ' ')).split(Ra);
									for (let n = 0; n < e.length; n++) {
										let i = e[n];
										if (1 & n)
											if ('/' === i.charAt(0)) {
												if ('#' === i.charAt(1)) {
													const t = parseInt(i.substr(2), 10);
													(l = Ia[--c]), u.push((t << 3) | 5);
												}
											} else {
												const t = parseInt(i.substr(1), 10),
													e = '#' === i.charAt(0);
												u.push(((e ? t : ~t) << 3) | 0, (l << 17) | 1), e && (Ia[++c] = l = t);
											}
										else {
											const e = Ua(i);
											for (let n = 0; n < e.length; n++)
												if (1 & n) {
													const i = e[n];
													if ('object' != typeof i)
														throw new Error(
															`Unable to parse ICU expression in "${t}" message.`
														);
													const s = Da(r);
													u.push(ga, '', s, (l << 17) | 1);
													const o = Na(i);
													Ba(d, i, s, s);
													const a = d.length - 1;
													h.push(
														Ma(i.mainBinding),
														3,
														-1 - i.mainBinding,
														(s << 2) | 2,
														a,
														o,
														2,
														(s << 2) | 3,
														a
													);
												} else if ('' !== e[n]) {
													const t = e[n],
														i = t.match(Ea),
														s = Da(r);
													u.push(i ? '' : t, s, (l << 17) | 1), i && ie(La(t, s), h);
												}
										}
									}
								}
								var p;
								Aa > 0 &&
									(function (t, e, n) {
										if (n > 0 && t.firstCreatePass) {
											for (let i = 0; i < n; i++)
												t.blueprint.push(null), t.data.push(null), e.push(null);
											t.expandoInstructions
												? t.expandoInstructions.push(n)
												: (t.expandoStartIndex += n);
										}
									})(e, t, Aa),
									(e.data[n + ke] = { vars: Aa, create: u, update: h, icus: d.length ? d : null });
							})(on(), i, t, s, n);
				})(t, e, n),
					(function () {
						const t = on();
						(function (t, e) {
							const n = va[ba--],
								i = t.data[n + ke],
								s = cn(),
								r = (function (t, e, n, i) {
									const s = i[11];
									let r = null,
										o = null;
									const a = [];
									for (let l = 0; l < n.length; l++) {
										const c = n[l];
										if ('string' == typeof c) {
											const e = br(c, s),
												u = n[++l];
											(o = r), (r = Sa(t, i, u, 2, e, null)), a.push(u), dn();
										} else if ('number' == typeof c)
											switch (7 & c) {
												case 1:
													const s = c >>> 17;
													let u;
													(u = s === e ? i[6] : Ze(t, s)), (o = wa(t, r, u, o, i));
													break;
												case 0:
													const h = c >= 0,
														d = (h ? c : ~c) >>> 3;
													a.push(d), (o = r), (r = Ze(t, d)), r && un(r, h);
													break;
												case 5:
													(o = r = Ze(t, c >>> 3)), un(r, !1);
													break;
												case 4:
													const p = n[++l],
														f = n[++l];
													nr(Ze(t, c >>> 3), i, p, f, null, null);
													break;
												default:
													throw new Error(
														`Unable to determine the type of mutate operation for "${c}"`
													);
											}
										else
											switch (c) {
												case ga:
													const e = n[++l],
														u = n[++l],
														h = s.createComment(e);
													(o = r), (r = Sa(t, i, u, 4, h, null)), a.push(u), rs(h, i), dn();
													break;
												case ma:
													const d = n[++l],
														p = n[++l];
													(o = r), (r = Sa(t, i, p, 2, s.createElement(d), d)), a.push(p);
													break;
												default:
													throw new Error(
														`Unable to determine the type of mutate operation for "${c}"`
													);
											}
									}
									return dn(), a;
								})(t, n, i.create, e);
							let o = n + 1;
							for (; null !== s && o <= s.index - ke; ) {
								-1 === r.indexOf(o) && xa(t, e, o, !0);
								const n = Ze(t, o);
								!n ||
									(0 !== n.type && 2 !== n.type && 3 !== n.type) ||
									null === n.localNames ||
									(o += n.localNames.length >> 1),
									o++;
							}
						})(an(), t),
							qo(!1);
					})();
			}
			function $a(t, e) {
				const n = on(),
					i = an();
				!(function (t, e, n, i) {
					const s = cn().index - ke,
						r = [];
					for (let o = 0; o < i.length; o += 2) {
						const a = i[o],
							l = i[o + 1].split(Ca);
						for (let i = 0; i < l.length; i++) {
							const o = l[i];
							if (1 & i) throw new Error('ICU expressions are not yet supported in attributes');
							if ('' !== o)
								if (o.match(Ea)) e.firstCreatePass && null === e.data[n + ke] && ie(La(o, s, a), r);
								else {
									const n = Ze(e, s);
									2 === n.type && nr(n, t, a, o, null, null);
									const i = null !== n.inputs && n.inputs[a];
									i && yr(e, t, i, a, o);
								}
						}
					}
					e.firstCreatePass && null === e.data[n + ke] && (e.data[n + ke] = r);
				})(n, i, t, tn(i.consts, e));
			}
			function qa(t, e, n, i, s) {
				if (((t = Ct(t)), Array.isArray(t))) for (let r = 0; r < t.length; r++) qa(t[r], e, n, i, s);
				else {
					const r = an(),
						o = on();
					let a = lo(t) ? t : Ct(t.provide),
						l = ro(t);
					const c = cn(),
						u = 1048575 & c.providerIndexes,
						h = c.directiveStart,
						d = c.providerIndexes >> 20;
					if (lo(t) || !t.multi) {
						const i = new Bn(l, s, To),
							p = Za(a, e, s ? u : u + d, h);
						-1 === p
							? (ri(ei(c, o), r, a),
							  Wa(r, t, e.length),
							  e.push(a),
							  c.directiveStart++,
							  c.directiveEnd++,
							  s && (c.providerIndexes += 1048576),
							  n.push(i),
							  o.push(i))
							: ((n[p] = i), (o[p] = i));
					} else {
						const p = Za(a, e, u + d, h),
							f = Za(a, e, u, u + d),
							m = p >= 0 && n[p],
							g = f >= 0 && n[f];
						if ((s && !g) || (!s && !m)) {
							ri(ei(c, o), r, a);
							const u = (function (t, e, n, i, s) {
								const r = new Bn(t, n, To);
								return (r.multi = []), (r.index = e), (r.componentProviders = 0), Qa(r, s, i && !n), r;
							})(s ? Ka : Ga, n.length, s, i, l);
							!s && g && (n[f].providerFactory = u),
								Wa(r, t, e.length, 0),
								e.push(a),
								c.directiveStart++,
								c.directiveEnd++,
								s && (c.providerIndexes += 1048576),
								n.push(u),
								o.push(u);
						} else Wa(r, t, p > -1 ? p : f, Qa(n[s ? f : p], l, !s && i));
						!s && i && g && n[f].componentProviders++;
					}
				}
			}
			function Wa(t, e, n, i) {
				const s = lo(e);
				if (s || e.useClass) {
					const r = (e.useClass || e).prototype.ngOnDestroy;
					if (r) {
						const o = t.destroyHooks || (t.destroyHooks = []);
						if (!s && e.multi) {
							const t = o.indexOf(n);
							-1 === t ? o.push(n, [i, r]) : o[t + 1].push(i, r);
						} else o.push(n, r);
					}
				}
			}
			function Qa(t, e, n) {
				return n && t.componentProviders++, t.multi.push(e) - 1;
			}
			function Za(t, e, n, i) {
				for (let s = n; s < i; s++) if (e[s] === t) return s;
				return -1;
			}
			function Ga(t, e, n, i) {
				return Ya(this.multi, []);
			}
			function Ka(t, e, n, i) {
				const s = this.multi;
				let r;
				if (this.providerFactory) {
					const t = this.providerFactory.componentProviders,
						e = ui(n, n[1], this.providerFactory.index, i);
					(r = e.slice(0, t)), Ya(s, r);
					for (let n = t; n < e.length; n++) r.push(e[n]);
				} else (r = []), Ya(s, r);
				return r;
			}
			function Ya(t, e) {
				for (let n = 0; n < t.length; n++) e.push((0, t[n])());
				return e;
			}
			function Xa(t, e = []) {
				return n => {
					n.providersResolver = (n, i) =>
						(function (t, e, n) {
							const i = an();
							if (i.firstCreatePass) {
								const s = Le(t);
								qa(n, i.data, i.blueprint, s, !0), qa(e, i.data, i.blueprint, s, !1);
							}
						})(n, i ? i(t) : t, e);
				};
			}
			class Ja {}
			class tl {
				resolveComponentFactory(t) {
					throw (function (t) {
						const e = Error(
							`No component factory found for ${wt(t)}. Did you add it to @NgModule.entryComponents?`
						);
						return (e.ngComponent = t), e;
					})(t);
				}
			}
			let el = (() => {
					class t {}
					return (t.NULL = new tl()), t;
				})(),
				nl = (() => {
					class t {
						constructor(t) {
							this.nativeElement = t;
						}
					}
					return (t.__NG_ELEMENT_ID__ = () => il(t)), t;
				})();
			const il = function (t) {
				return $r(t, cn(), on());
			};
			class sl {}
			var rl = (function (t) {
				return (t[(t.Important = 1)] = 'Important'), (t[(t.DashCase = 2)] = 'DashCase'), t;
			})({});
			let ol = (() => {
				class t {}
				return (t.ɵprov = ht({ token: t, providedIn: 'root', factory: () => null })), t;
			})();
			class al {
				constructor(t) {
					(this.full = t),
						(this.major = t.split('.')[0]),
						(this.minor = t.split('.')[1]),
						(this.patch = t.split('.').slice(2).join('.'));
				}
			}
			const ll = new al('10.2.0');
			class cl {
				constructor() {}
				supports(t) {
					return xo(t);
				}
				create(t) {
					return new hl(t);
				}
			}
			const ul = (t, e) => e;
			class hl {
				constructor(t) {
					(this.length = 0),
						(this._linkedRecords = null),
						(this._unlinkedRecords = null),
						(this._previousItHead = null),
						(this._itHead = null),
						(this._itTail = null),
						(this._additionsHead = null),
						(this._additionsTail = null),
						(this._movesHead = null),
						(this._movesTail = null),
						(this._removalsHead = null),
						(this._removalsTail = null),
						(this._identityChangesHead = null),
						(this._identityChangesTail = null),
						(this._trackByFn = t || ul);
				}
				forEachItem(t) {
					let e;
					for (e = this._itHead; null !== e; e = e._next) t(e);
				}
				forEachOperation(t) {
					let e = this._itHead,
						n = this._removalsHead,
						i = 0,
						s = null;
					for (; e || n; ) {
						const r = !n || (e && e.currentIndex < ml(n, i, s)) ? e : n,
							o = ml(r, i, s),
							a = r.currentIndex;
						if (r === n) i--, (n = n._nextRemoved);
						else if (((e = e._next), null == r.previousIndex)) i++;
						else {
							s || (s = []);
							const t = o - i,
								e = a - i;
							if (t != e) {
								for (let n = 0; n < t; n++) {
									const i = n < s.length ? s[n] : (s[n] = 0),
										r = i + n;
									e <= r && r < t && (s[n] = i + 1);
								}
								s[r.previousIndex] = e - t;
							}
						}
						o !== a && t(r, o, a);
					}
				}
				forEachPreviousItem(t) {
					let e;
					for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
				}
				forEachAddedItem(t) {
					let e;
					for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
				}
				forEachMovedItem(t) {
					let e;
					for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
				}
				forEachRemovedItem(t) {
					let e;
					for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
				}
				forEachIdentityChange(t) {
					let e;
					for (e = this._identityChangesHead; null !== e; e = e._nextIdentityChange) t(e);
				}
				diff(t) {
					if ((null == t && (t = []), !xo(t)))
						throw new Error(`Error trying to diff '${wt(t)}'. Only arrays and iterables are allowed`);
					return this.check(t) ? this : null;
				}
				onDestroy() {}
				check(t) {
					this._reset();
					let e,
						n,
						i,
						s = this._itHead,
						r = !1;
					if (Array.isArray(t)) {
						this.length = t.length;
						for (let e = 0; e < this.length; e++)
							(n = t[e]),
								(i = this._trackByFn(e, n)),
								null !== s && Object.is(s.trackById, i)
									? (r && (s = this._verifyReinsertion(s, n, i, e)),
									  Object.is(s.item, n) || this._addIdentityChange(s, n))
									: ((s = this._mismatch(s, n, i, e)), (r = !0)),
								(s = s._next);
					} else
						(e = 0),
							(function (t, e) {
								if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e(t[n]);
								else {
									const n = t[wo()]();
									let i;
									for (; !(i = n.next()).done; ) e(i.value);
								}
							})(t, t => {
								(i = this._trackByFn(e, t)),
									null !== s && Object.is(s.trackById, i)
										? (r && (s = this._verifyReinsertion(s, t, i, e)),
										  Object.is(s.item, t) || this._addIdentityChange(s, t))
										: ((s = this._mismatch(s, t, i, e)), (r = !0)),
									(s = s._next),
									e++;
							}),
							(this.length = e);
					return this._truncate(s), (this.collection = t), this.isDirty;
				}
				get isDirty() {
					return (
						null !== this._additionsHead ||
						null !== this._movesHead ||
						null !== this._removalsHead ||
						null !== this._identityChangesHead
					);
				}
				_reset() {
					if (this.isDirty) {
						let t;
						for (t = this._previousItHead = this._itHead; null !== t; t = t._next)
							t._nextPrevious = t._next;
						for (t = this._additionsHead; null !== t; t = t._nextAdded) t.previousIndex = t.currentIndex;
						for (
							this._additionsHead = this._additionsTail = null, t = this._movesHead;
							null !== t;
							t = t._nextMoved
						)
							t.previousIndex = t.currentIndex;
						(this._movesHead = this._movesTail = null),
							(this._removalsHead = this._removalsTail = null),
							(this._identityChangesHead = this._identityChangesTail = null);
					}
				}
				_mismatch(t, e, n, i) {
					let s;
					return (
						null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
						null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(n, i))
							? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._moveAfter(t, s, i))
							: null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null))
							? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._reinsertAfter(t, s, i))
							: (t = this._addAfter(new dl(e, n), s, i)),
						t
					);
				}
				_verifyReinsertion(t, e, n, i) {
					let s = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
					return (
						null !== s
							? (t = this._reinsertAfter(s, t._prev, i))
							: t.currentIndex != i && ((t.currentIndex = i), this._addToMoves(t, i)),
						t
					);
				}
				_truncate(t) {
					for (; null !== t; ) {
						const e = t._next;
						this._addToRemovals(this._unlink(t)), (t = e);
					}
					null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
						null !== this._additionsTail && (this._additionsTail._nextAdded = null),
						null !== this._movesTail && (this._movesTail._nextMoved = null),
						null !== this._itTail && (this._itTail._next = null),
						null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
						null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null);
				}
				_reinsertAfter(t, e, n) {
					null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
					const i = t._prevRemoved,
						s = t._nextRemoved;
					return (
						null === i ? (this._removalsHead = s) : (i._nextRemoved = s),
						null === s ? (this._removalsTail = i) : (s._prevRemoved = i),
						this._insertAfter(t, e, n),
						this._addToMoves(t, n),
						t
					);
				}
				_moveAfter(t, e, n) {
					return this._unlink(t), this._insertAfter(t, e, n), this._addToMoves(t, n), t;
				}
				_addAfter(t, e, n) {
					return (
						this._insertAfter(t, e, n),
						(this._additionsTail =
							null === this._additionsTail
								? (this._additionsHead = t)
								: (this._additionsTail._nextAdded = t)),
						t
					);
				}
				_insertAfter(t, e, n) {
					const i = null === e ? this._itHead : e._next;
					return (
						(t._next = i),
						(t._prev = e),
						null === i ? (this._itTail = t) : (i._prev = t),
						null === e ? (this._itHead = t) : (e._next = t),
						null === this._linkedRecords && (this._linkedRecords = new fl()),
						this._linkedRecords.put(t),
						(t.currentIndex = n),
						t
					);
				}
				_remove(t) {
					return this._addToRemovals(this._unlink(t));
				}
				_unlink(t) {
					null !== this._linkedRecords && this._linkedRecords.remove(t);
					const e = t._prev,
						n = t._next;
					return (
						null === e ? (this._itHead = n) : (e._next = n),
						null === n ? (this._itTail = e) : (n._prev = e),
						t
					);
				}
				_addToMoves(t, e) {
					return (
						t.previousIndex === e ||
							(this._movesTail =
								null === this._movesTail ? (this._movesHead = t) : (this._movesTail._nextMoved = t)),
						t
					);
				}
				_addToRemovals(t) {
					return (
						null === this._unlinkedRecords && (this._unlinkedRecords = new fl()),
						this._unlinkedRecords.put(t),
						(t.currentIndex = null),
						(t._nextRemoved = null),
						null === this._removalsTail
							? ((this._removalsTail = this._removalsHead = t), (t._prevRemoved = null))
							: ((t._prevRemoved = this._removalsTail),
							  (this._removalsTail = this._removalsTail._nextRemoved = t)),
						t
					);
				}
				_addIdentityChange(t, e) {
					return (
						(t.item = e),
						(this._identityChangesTail =
							null === this._identityChangesTail
								? (this._identityChangesHead = t)
								: (this._identityChangesTail._nextIdentityChange = t)),
						t
					);
				}
			}
			class dl {
				constructor(t, e) {
					(this.item = t),
						(this.trackById = e),
						(this.currentIndex = null),
						(this.previousIndex = null),
						(this._nextPrevious = null),
						(this._prev = null),
						(this._next = null),
						(this._prevDup = null),
						(this._nextDup = null),
						(this._prevRemoved = null),
						(this._nextRemoved = null),
						(this._nextAdded = null),
						(this._nextMoved = null),
						(this._nextIdentityChange = null);
				}
			}
			class pl {
				constructor() {
					(this._head = null), (this._tail = null);
				}
				add(t) {
					null === this._head
						? ((this._head = this._tail = t), (t._nextDup = null), (t._prevDup = null))
						: ((this._tail._nextDup = t), (t._prevDup = this._tail), (t._nextDup = null), (this._tail = t));
				}
				get(t, e) {
					let n;
					for (n = this._head; null !== n; n = n._nextDup)
						if ((null === e || e <= n.currentIndex) && Object.is(n.trackById, t)) return n;
					return null;
				}
				remove(t) {
					const e = t._prevDup,
						n = t._nextDup;
					return (
						null === e ? (this._head = n) : (e._nextDup = n),
						null === n ? (this._tail = e) : (n._prevDup = e),
						null === this._head
					);
				}
			}
			class fl {
				constructor() {
					this.map = new Map();
				}
				put(t) {
					const e = t.trackById;
					let n = this.map.get(e);
					n || ((n = new pl()), this.map.set(e, n)), n.add(t);
				}
				get(t, e) {
					const n = this.map.get(t);
					return n ? n.get(t, e) : null;
				}
				remove(t) {
					const e = t.trackById;
					return this.map.get(e).remove(t) && this.map.delete(e), t;
				}
				get isEmpty() {
					return 0 === this.map.size;
				}
				clear() {
					this.map.clear();
				}
			}
			function ml(t, e, n) {
				const i = t.previousIndex;
				if (null === i) return i;
				let s = 0;
				return n && i < n.length && (s = n[i]), i + e + s;
			}
			class gl {
				constructor() {}
				supports(t) {
					return t instanceof Map || So(t);
				}
				create() {
					return new yl();
				}
			}
			class yl {
				constructor() {
					(this._records = new Map()),
						(this._mapHead = null),
						(this._appendAfter = null),
						(this._previousMapHead = null),
						(this._changesHead = null),
						(this._changesTail = null),
						(this._additionsHead = null),
						(this._additionsTail = null),
						(this._removalsHead = null),
						(this._removalsTail = null);
				}
				get isDirty() {
					return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead;
				}
				forEachItem(t) {
					let e;
					for (e = this._mapHead; null !== e; e = e._next) t(e);
				}
				forEachPreviousItem(t) {
					let e;
					for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
				}
				forEachChangedItem(t) {
					let e;
					for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
				}
				forEachAddedItem(t) {
					let e;
					for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
				}
				forEachRemovedItem(t) {
					let e;
					for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
				}
				diff(t) {
					if (t) {
						if (!(t instanceof Map || So(t)))
							throw new Error(`Error trying to diff '${wt(t)}'. Only maps and objects are allowed`);
					} else t = new Map();
					return this.check(t) ? this : null;
				}
				onDestroy() {}
				check(t) {
					this._reset();
					let e = this._mapHead;
					if (
						((this._appendAfter = null),
						this._forEach(t, (t, n) => {
							if (e && e.key === n) this._maybeAddToChanges(e, t), (this._appendAfter = e), (e = e._next);
							else {
								const i = this._getOrCreateRecordForKey(n, t);
								e = this._insertBeforeOrAppend(e, i);
							}
						}),
						e)
					) {
						e._prev && (e._prev._next = null), (this._removalsHead = e);
						for (let t = e; null !== t; t = t._nextRemoved)
							t === this._mapHead && (this._mapHead = null),
								this._records.delete(t.key),
								(t._nextRemoved = t._next),
								(t.previousValue = t.currentValue),
								(t.currentValue = null),
								(t._prev = null),
								(t._next = null);
					}
					return (
						this._changesTail && (this._changesTail._nextChanged = null),
						this._additionsTail && (this._additionsTail._nextAdded = null),
						this.isDirty
					);
				}
				_insertBeforeOrAppend(t, e) {
					if (t) {
						const n = t._prev;
						return (
							(e._next = t),
							(e._prev = n),
							(t._prev = e),
							n && (n._next = e),
							t === this._mapHead && (this._mapHead = e),
							(this._appendAfter = t),
							t
						);
					}
					return (
						this._appendAfter
							? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
							: (this._mapHead = e),
						(this._appendAfter = e),
						null
					);
				}
				_getOrCreateRecordForKey(t, e) {
					if (this._records.has(t)) {
						const n = this._records.get(t);
						this._maybeAddToChanges(n, e);
						const i = n._prev,
							s = n._next;
						return i && (i._next = s), s && (s._prev = i), (n._next = null), (n._prev = null), n;
					}
					const n = new _l(t);
					return this._records.set(t, n), (n.currentValue = e), this._addToAdditions(n), n;
				}
				_reset() {
					if (this.isDirty) {
						let t;
						for (this._previousMapHead = this._mapHead, t = this._previousMapHead; null !== t; t = t._next)
							t._nextPrevious = t._next;
						for (t = this._changesHead; null !== t; t = t._nextChanged) t.previousValue = t.currentValue;
						for (t = this._additionsHead; null != t; t = t._nextAdded) t.previousValue = t.currentValue;
						(this._changesHead = this._changesTail = null),
							(this._additionsHead = this._additionsTail = null),
							(this._removalsHead = null);
					}
				}
				_maybeAddToChanges(t, e) {
					Object.is(e, t.currentValue) ||
						((t.previousValue = t.currentValue), (t.currentValue = e), this._addToChanges(t));
				}
				_addToAdditions(t) {
					null === this._additionsHead
						? (this._additionsHead = this._additionsTail = t)
						: ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
				}
				_addToChanges(t) {
					null === this._changesHead
						? (this._changesHead = this._changesTail = t)
						: ((this._changesTail._nextChanged = t), (this._changesTail = t));
				}
				_forEach(t, e) {
					t instanceof Map ? t.forEach(e) : Object.keys(t).forEach(n => e(t[n], n));
				}
			}
			class _l {
				constructor(t) {
					(this.key = t),
						(this.previousValue = null),
						(this.currentValue = null),
						(this._nextPrevious = null),
						(this._next = null),
						(this._prev = null),
						(this._nextAdded = null),
						(this._nextRemoved = null),
						(this._nextChanged = null);
				}
			}
			let vl = (() => {
					class t {
						constructor(t) {
							this.factories = t;
						}
						static create(e, n) {
							if (null != n) {
								const t = n.factories.slice();
								e = e.concat(t);
							}
							return new t(e);
						}
						static extend(e) {
							return {
								provide: t,
								useFactory: n => {
									if (!n) throw new Error('Cannot extend IterableDiffers without a parent injector');
									return t.create(e, n);
								},
								deps: [[t, new at(), new rt()]],
							};
						}
						find(t) {
							const e = this.factories.find(e => e.supports(t));
							if (null != e) return e;
							throw new Error(
								`Cannot find a differ supporting object '${t}' of type '${
									((n = t), n.name || typeof n)
								}'`
							);
							var n;
						}
					}
					return (t.ɵprov = ht({ token: t, providedIn: 'root', factory: () => new t([new cl()]) })), t;
				})(),
				bl = (() => {
					class t {
						constructor(t) {
							this.factories = t;
						}
						static create(e, n) {
							if (n) {
								const t = n.factories.slice();
								e = e.concat(t);
							}
							return new t(e);
						}
						static extend(e) {
							return {
								provide: t,
								useFactory: n => {
									if (!n) throw new Error('Cannot extend KeyValueDiffers without a parent injector');
									return t.create(e, n);
								},
								deps: [[t, new at(), new rt()]],
							};
						}
						find(t) {
							const e = this.factories.find(e => e.supports(t));
							if (e) return e;
							throw new Error(`Cannot find a differ supporting object '${t}'`);
						}
					}
					return (t.ɵprov = ht({ token: t, providedIn: 'root', factory: () => new t([new gl()]) })), t;
				})();
			const wl = [new gl()],
				xl = new vl([new cl()]),
				Sl = new bl(wl);
			let El = (() => {
				class t {}
				return (t.__NG_ELEMENT_ID__ = () => Cl(t, nl)), t;
			})();
			const Cl = function (t, e) {
				return qr(t, e, cn(), on());
			};
			let kl = (() => {
				class t {}
				return (t.__NG_ELEMENT_ID__ = () => Tl(t, nl)), t;
			})();
			const Tl = function (t, e) {
					return Wr(t, e, cn(), on());
				},
				Al = {};
			class Il extends el {
				constructor(t) {
					super(), (this.ngModule = t);
				}
				resolveComponentFactory(t) {
					const e = Se(t);
					return new Pl(e, this.ngModule);
				}
			}
			function Ol(t) {
				const e = [];
				for (let n in t) t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
				return e;
			}
			const Rl = new Bt('SCHEDULER_TOKEN', { providedIn: 'root', factory: () => Kn });
			class Pl extends Ja {
				constructor(t, e) {
					super(),
						(this.componentDef = t),
						(this.ngModule = e),
						(this.componentType = t.type),
						(this.selector = t.selectors.map(ys).join(',')),
						(this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : []),
						(this.isBoundToModule = !!e);
				}
				get inputs() {
					return Ol(this.componentDef.inputs);
				}
				get outputs() {
					return Ol(this.componentDef.outputs);
				}
				create(t, e, n, i) {
					const s = (i = i || this.ngModule)
							? (function (t, e) {
									return {
										get: (n, i, s) => {
											const r = t.get(n, Al, s);
											return r !== Al || i === Al ? r : e.get(n, i, s);
										},
									};
							  })(t, i.injector)
							: t,
						r = s.get(sl, $e),
						o = s.get(ol, null),
						a = r.createRenderer(null, this.componentDef),
						l = this.componentDef.selectors[0][0] || 'div',
						c = n
							? (function (t, e, n) {
									if (He(t)) return t.selectRootElement(e, n === de.ShadowDom);
									let i = 'string' == typeof e ? t.querySelector(e) : e;
									return (i.textContent = ''), i;
							  })(a, n, this.componentDef.encapsulation)
							: Ps(
									l,
									r.createRenderer(null, this.componentDef),
									(function (t) {
										const e = t.toLowerCase();
										return 'svg' === e
											? 'http://www.w3.org/2000/svg'
											: 'math' === e
											? 'http://www.w3.org/1998/MathML/'
											: null;
									})(l)
							  ),
						u = this.componentDef.onPush ? 576 : 528,
						h = { components: [], scheduler: Kn, clean: pr, playerHandler: null, flags: 0 },
						d = Us(0, null, null, 1, 0, null, null, null, null, null),
						p = Ls(null, d, h, u, null, null, r, a, o, s);
					let f, m;
					Sn(p);
					try {
						const t = (function (t, e, n, i, s, r) {
							const o = n[1];
							n[20] = t;
							const a = Ns(o, 0, 2, null, null),
								l = (a.mergedAttrs = e.hostAttrs);
							null !== l &&
								(po(a, l, !0),
								null !== t &&
									(zn(s, t, l),
									null !== a.classes && jr(s, t, a.classes),
									null !== a.styles && Fr(s, t, a.styles)));
							const c = i.createRenderer(t, e),
								u = Ls(n, Vs(e), null, e.onPush ? 64 : 16, n[20], a, i, c, null, null);
							return (
								o.firstCreatePass && (ri(ei(a, n), o, e.type), Ys(o, a), Js(a, n.length, 1)),
								lr(n, u),
								(n[20] = u)
							);
						})(c, this.componentDef, p, r, a);
						if (c)
							if (n) zn(a, c, ['ng-version', ll.full]);
							else {
								const { attrs: t, classes: e } = (function (t) {
									const e = [],
										n = [];
									let i = 1,
										s = 2;
									for (; i < t.length; ) {
										let r = t[i];
										if ('string' == typeof r)
											2 === s ? '' !== r && e.push(r, t[++i]) : 8 === s && n.push(r);
										else {
											if (!ds(s)) break;
											s = r;
										}
										i++;
									}
									return { attrs: e, classes: n };
								})(this.componentDef.selectors[0]);
								t && zn(a, c, t), e && e.length > 0 && jr(a, c, e.join(' '));
							}
						if (((m = Ze(d, 0)), void 0 !== e)) {
							const t = (m.projection = []);
							for (let n = 0; n < this.ngContentSelectors.length; n++) {
								const i = e[n];
								t.push(null != i ? Array.from(i) : null);
							}
						}
						(f = (function (t, e, n, i, s) {
							const r = n[1],
								o = (function (t, e, n) {
									const i = cn();
									t.firstCreatePass &&
										(n.providersResolver && n.providersResolver(n), Ks(t, i, 1), tr(t, e, n));
									const s = ui(e, t, e.length - 1, i);
									rs(s, e);
									const r = Qe(i, e);
									return r && rs(r, e), s;
								})(r, n, e);
							i.components.push(o),
								(t[8] = o),
								s && s.forEach(t => t(o, e)),
								e.contentQueries && e.contentQueries(1, o, n.length - 1);
							const a = cn();
							if (r.firstCreatePass && (null !== e.hostBindings || null !== e.hostAttrs)) {
								On(a.index - ke);
								const t = n[1];
								Qs(t, e), Zs(t, n, e.hostVars), Gs(e, o);
							}
							return o;
						})(t, this.componentDef, p, h, [fo])),
							Ds(d, p, null);
					} finally {
						An();
					}
					return new Ll(this.componentType, f, $r(nl, m, p), p, m);
				}
			}
			class Ll extends class {} {
				constructor(t, e, n, i, s) {
					super(),
						(this.location = n),
						(this._rootLView = i),
						(this._tNode = s),
						(this.destroyCbs = []),
						(this.instance = e),
						(this.hostView = this.changeDetectorRef = new zr(i)),
						(this.componentType = t);
				}
				get injector() {
					return new pi(this._tNode, this._rootLView);
				}
				destroy() {
					this.destroyCbs &&
						(this.destroyCbs.forEach(t => t()),
						(this.destroyCbs = null),
						!this.hostView.destroyed && this.hostView.destroy());
				}
				onDestroy(t) {
					this.destroyCbs && this.destroyCbs.push(t);
				}
			}
			const Nl = new Map();
			class Dl extends ee {
				constructor(t, e) {
					super(),
						(this._parent = e),
						(this._bootstrapComponents = []),
						(this.injector = this),
						(this.destroyCbs = []),
						(this.componentFactoryResolver = new Il(this));
					const n = Ce(t),
						i = t[Mt] || null;
					i && _a(i),
						(this._bootstrapComponents = Yn(n.bootstrap)),
						(this._r3Injector = no(
							t,
							e,
							[
								{ provide: ee, useValue: this },
								{ provide: el, useValue: this.componentFactoryResolver },
							],
							wt(t)
						)),
						this._r3Injector._resolveInjectorDefTypes(),
						(this.instance = this.get(t));
				}
				get(t, e = uo.THROW_IF_NOT_FOUND, n = lt.Default) {
					return t === uo || t === ee || t === zt ? this : this._r3Injector.get(t, e, n);
				}
				destroy() {
					const t = this._r3Injector;
					!t.destroyed && t.destroy(), this.destroyCbs.forEach(t => t()), (this.destroyCbs = null);
				}
				onDestroy(t) {
					this.destroyCbs.push(t);
				}
			}
			class Ml extends ne {
				constructor(t) {
					super(),
						(this.moduleType = t),
						null !== Ce(t) &&
							(function t(e) {
								if (null !== e.ɵmod.id) {
									const t = e.ɵmod.id;
									(function (t, e, n) {
										if (e && e !== n)
											throw new Error(
												`Duplicate module registered for ${t} - ${wt(e)} vs ${wt(e.name)}`
											);
									})(t, Nl.get(t), e),
										Nl.set(t, e);
								}
								let n = e.ɵmod.imports;
								n instanceof Function && (n = n()), n && n.forEach(e => t(e));
							})(t);
				}
				create(t) {
					return new Dl(this.moduleType, t);
				}
			}
			const Fl = class extends S {
				constructor(t = !1) {
					super(), (this.__isAsync = t);
				}
				emit(t) {
					super.next(t);
				}
				subscribe(t, e, n) {
					let i,
						s = t => null,
						r = () => null;
					t && 'object' == typeof t
						? ((i = this.__isAsync
								? e => {
										setTimeout(() => t.next(e));
								  }
								: e => {
										t.next(e);
								  }),
						  t.error &&
								(s = this.__isAsync
									? e => {
											setTimeout(() => t.error(e));
									  }
									: e => {
											t.error(e);
									  }),
						  t.complete &&
								(r = this.__isAsync
									? () => {
											setTimeout(() => t.complete());
									  }
									: () => {
											t.complete();
									  }))
						: ((i = this.__isAsync
								? e => {
										setTimeout(() => t(e));
								  }
								: e => {
										t(e);
								  }),
						  e &&
								(s = this.__isAsync
									? t => {
											setTimeout(() => e(t));
									  }
									: t => {
											e(t);
									  }),
						  n &&
								(r = this.__isAsync
									? () => {
											setTimeout(() => n());
									  }
									: () => {
											n();
									  }));
					const o = super.subscribe(i, s, r);
					return t instanceof h && t.add(o), o;
				}
			};
			function jl() {
				return this._results[wo()]();
			}
			class Bl {
				constructor() {
					(this.dirty = !0), (this._results = []), (this.changes = new Fl()), (this.length = 0);
					const t = wo(),
						e = Bl.prototype;
					e[t] || (e[t] = jl);
				}
				map(t) {
					return this._results.map(t);
				}
				filter(t) {
					return this._results.filter(t);
				}
				find(t) {
					return this._results.find(t);
				}
				reduce(t, e) {
					return this._results.reduce(t, e);
				}
				forEach(t) {
					this._results.forEach(t);
				}
				some(t) {
					return this._results.some(t);
				}
				toArray() {
					return this._results.slice();
				}
				toString() {
					return this._results.toString();
				}
				reset(t) {
					(this._results = (function t(e, n) {
						void 0 === n && (n = e);
						for (let i = 0; i < e.length; i++) {
							let s = e[i];
							Array.isArray(s) ? (n === e && (n = e.slice(0, i)), t(s, n)) : n !== e && n.push(s);
						}
						return n;
					})(t)),
						(this.dirty = !1),
						(this.length = this._results.length),
						(this.last = this._results[this.length - 1]),
						(this.first = this._results[0]);
				}
				notifyOnChanges() {
					this.changes.emit(this);
				}
				setDirty() {
					this.dirty = !0;
				}
				destroy() {
					this.changes.complete(), this.changes.unsubscribe();
				}
			}
			class zl {
				constructor(t) {
					(this.queryList = t), (this.matches = null);
				}
				clone() {
					return new zl(this.queryList);
				}
				setDirty() {
					this.queryList.setDirty();
				}
			}
			class Vl {
				constructor(t = []) {
					this.queries = t;
				}
				createEmbeddedView(t) {
					const e = t.queries;
					if (null !== e) {
						const n = null !== t.contentQueries ? t.contentQueries[0] : e.length,
							i = [];
						for (let t = 0; t < n; t++) {
							const n = e.getByIndex(t);
							i.push(this.queries[n.indexInDeclarationView].clone());
						}
						return new Vl(i);
					}
					return null;
				}
				insertView(t) {
					this.dirtyQueriesWithMatches(t);
				}
				detachView(t) {
					this.dirtyQueriesWithMatches(t);
				}
				dirtyQueriesWithMatches(t) {
					for (let e = 0; e < this.queries.length; e++)
						null !== tc(t, e).matches && this.queries[e].setDirty();
				}
			}
			class Ul {
				constructor(t, e, n, i = null) {
					(this.predicate = t), (this.descendants = e), (this.isStatic = n), (this.read = i);
				}
			}
			class Hl {
				constructor(t = []) {
					this.queries = t;
				}
				elementStart(t, e) {
					for (let n = 0; n < this.queries.length; n++) this.queries[n].elementStart(t, e);
				}
				elementEnd(t) {
					for (let e = 0; e < this.queries.length; e++) this.queries[e].elementEnd(t);
				}
				embeddedTView(t) {
					let e = null;
					for (let n = 0; n < this.length; n++) {
						const i = null !== e ? e.length : 0,
							s = this.getByIndex(n).embeddedTView(t, i);
						s && ((s.indexInDeclarationView = n), null !== e ? e.push(s) : (e = [s]));
					}
					return null !== e ? new Hl(e) : null;
				}
				template(t, e) {
					for (let n = 0; n < this.queries.length; n++) this.queries[n].template(t, e);
				}
				getByIndex(t) {
					return this.queries[t];
				}
				get length() {
					return this.queries.length;
				}
				track(t) {
					this.queries.push(t);
				}
			}
			class $l {
				constructor(t, e = -1) {
					(this.metadata = t),
						(this.matches = null),
						(this.indexInDeclarationView = -1),
						(this.crossesNgTemplate = !1),
						(this._appliesToNextNode = !0),
						(this._declarationNodeIndex = e);
				}
				elementStart(t, e) {
					this.isApplyingToNode(e) && this.matchTNode(t, e);
				}
				elementEnd(t) {
					this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1);
				}
				template(t, e) {
					this.elementStart(t, e);
				}
				embeddedTView(t, e) {
					return this.isApplyingToNode(t)
						? ((this.crossesNgTemplate = !0), this.addMatch(-t.index, e), new $l(this.metadata))
						: null;
				}
				isApplyingToNode(t) {
					if (this._appliesToNextNode && !1 === this.metadata.descendants) {
						const e = this._declarationNodeIndex;
						let n = t.parent;
						for (; null !== n && 3 === n.type && n.index !== e; ) n = n.parent;
						return e === (null !== n ? n.index : -1);
					}
					return this._appliesToNextNode;
				}
				matchTNode(t, e) {
					const n = this.metadata.predicate;
					if (Array.isArray(n))
						for (let i = 0; i < n.length; i++) {
							const s = n[i];
							this.matchTNodeWithReadOption(t, e, ql(e, s)),
								this.matchTNodeWithReadOption(t, e, ci(e, t, s, !1, !1));
						}
					else
						n === El
							? 0 === e.type && this.matchTNodeWithReadOption(t, e, -1)
							: this.matchTNodeWithReadOption(t, e, ci(e, t, n, !1, !1));
				}
				matchTNodeWithReadOption(t, e, n) {
					if (null !== n) {
						const i = this.metadata.read;
						if (null !== i)
							if (i === nl || i === kl || (i === El && 0 === e.type)) this.addMatch(e.index, -2);
							else {
								const n = ci(e, t, i, !1, !1);
								null !== n && this.addMatch(e.index, n);
							}
						else this.addMatch(e.index, n);
					}
				}
				addMatch(t, e) {
					null === this.matches ? (this.matches = [t, e]) : this.matches.push(t, e);
				}
			}
			function ql(t, e) {
				const n = t.localNames;
				if (null !== n) for (let i = 0; i < n.length; i += 2) if (n[i] === e) return n[i + 1];
				return null;
			}
			function Wl(t, e, n, i) {
				return -1 === n
					? (function (t, e) {
							return 2 === t.type || 3 === t.type ? $r(nl, t, e) : 0 === t.type ? qr(El, nl, t, e) : null;
					  })(e, t)
					: -2 === n
					? (function (t, e, n) {
							return n === nl
								? $r(nl, e, t)
								: n === El
								? qr(El, nl, e, t)
								: n === kl
								? Wr(kl, nl, e, t)
								: void 0;
					  })(t, e, i)
					: ui(t, t[1], n, e);
			}
			function Ql(t, e, n, i) {
				const s = e[19].queries[i];
				if (null === s.matches) {
					const i = t.data,
						r = n.matches,
						o = [];
					for (let t = 0; t < r.length; t += 2) {
						const s = r[t];
						o.push(s < 0 ? null : Wl(e, i[s], r[t + 1], n.metadata.read));
					}
					s.matches = o;
				}
				return s.matches;
			}
			function Zl(t) {
				const e = on(),
					n = an(),
					i = bn();
				wn(i + 1);
				const s = tc(n, i);
				if (t.dirty && Xe(e) === s.metadata.isStatic) {
					if (null === s.matches) t.reset([]);
					else {
						const r = s.crossesNgTemplate
							? (function t(e, n, i, s) {
									const r = e.queries.getByIndex(i),
										o = r.matches;
									if (null !== o) {
										const a = Ql(e, n, r, i);
										for (let e = 0; e < o.length; e += 2) {
											const i = o[e];
											if (i > 0) s.push(a[e / 2]);
											else {
												const r = o[e + 1],
													a = n[-i];
												for (let e = Te; e < a.length; e++) {
													const n = a[e];
													n[17] === n[3] && t(n[1], n, r, s);
												}
												if (null !== a[9]) {
													const e = a[9];
													for (let n = 0; n < e.length; n++) {
														const i = e[n];
														t(i[1], i, r, s);
													}
												}
											}
										}
									}
									return s;
							  })(n, e, i, [])
							: Ql(n, e, s, i);
						t.reset(r), t.notifyOnChanges();
					}
					return !0;
				}
				return !1;
			}
			function Gl(t, e, n) {
				!(function (t, e, n, i, s, r) {
					t.firstCreatePass && Jl(t, new Ul(n, i, false, s), -1), Xl(t, e);
				})(an(), on(), t, e, n);
			}
			function Kl(t, e, n, i) {
				!(function (t, e, n, i, s, r, o, a) {
					t.firstCreatePass &&
						(Jl(t, new Ul(n, i, false, s), o.index),
						(function (t, e) {
							const n = t.contentQueries || (t.contentQueries = []);
							e !== (t.contentQueries.length ? n[n.length - 1] : -1) && n.push(t.queries.length - 1, e);
						})(t, a)),
						Xl(t, e);
				})(an(), on(), e, n, i, 0, cn(), t);
			}
			function Yl() {
				return (t = on()), (e = bn()), t[19].queries[e].queryList;
				var t, e;
			}
			function Xl(t, e) {
				const n = new Bl();
				Hs(t, e, n, n.destroy), null === e[19] && (e[19] = new Vl()), e[19].queries.push(new zl(n));
			}
			function Jl(t, e, n) {
				null === t.queries && (t.queries = new Hl()), t.queries.track(new $l(e, n));
			}
			function tc(t, e) {
				return t.queries.getByIndex(e);
			}
			const ec = new Bt('Application Initializer');
			let nc = (() => {
				class t {
					constructor(t) {
						(this.appInits = t),
							(this.initialized = !1),
							(this.done = !1),
							(this.donePromise = new Promise((t, e) => {
								(this.resolve = t), (this.reject = e);
							}));
					}
					runInitializers() {
						if (this.initialized) return;
						const t = [],
							e = () => {
								(this.done = !0), this.resolve();
							};
						if (this.appInits)
							for (let n = 0; n < this.appInits.length; n++) {
								const e = this.appInits[n]();
								Do(e) && t.push(e);
							}
						Promise.all(t)
							.then(() => {
								e();
							})
							.catch(t => {
								this.reject(t);
							}),
							0 === t.length && e(),
							(this.initialized = !0);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(ec, 8));
					}),
					(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const ic = new Bt('AppId'),
				sc = {
					provide: ic,
					useFactory: function () {
						return `${rc()}${rc()}${rc()}`;
					},
					deps: [],
				};
			function rc() {
				return String.fromCharCode(97 + Math.floor(25 * Math.random()));
			}
			const oc = new Bt('Platform Initializer'),
				ac = new Bt('Platform ID'),
				lc = new Bt('appBootstrapListener');
			let cc = (() => {
				class t {
					log(t) {
						console.log(t);
					}
					warn(t) {
						console.warn(t);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const uc = new Bt('LocaleId'),
				hc = new Bt('DefaultCurrencyCode');
			class dc {
				constructor(t, e) {
					(this.ngModuleFactory = t), (this.componentFactories = e);
				}
			}
			const pc = function (t) {
					return new Ml(t);
				},
				fc = pc,
				mc = function (t) {
					return Promise.resolve(pc(t));
				},
				gc = function (t) {
					const e = pc(t),
						n = Yn(Ce(t).declarations).reduce((t, e) => {
							const n = Se(e);
							return n && t.push(new Pl(n)), t;
						}, []);
					return new dc(e, n);
				},
				yc = gc,
				_c = function (t) {
					return Promise.resolve(gc(t));
				};
			let vc = (() => {
				class t {
					constructor() {
						(this.compileModuleSync = fc),
							(this.compileModuleAsync = mc),
							(this.compileModuleAndAllComponentsSync = yc),
							(this.compileModuleAndAllComponentsAsync = _c);
					}
					clearCache() {}
					clearCacheFor(t) {}
					getModuleId(t) {}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const bc = (() => Promise.resolve(0))();
			function wc(t) {
				'undefined' == typeof Zone
					? bc.then(() => {
							t && t.apply(null, null);
					  })
					: Zone.current.scheduleMicroTask('scheduleMicrotask', t);
			}
			class xc {
				constructor({ enableLongStackTrace: t = !1, shouldCoalesceEventChangeDetection: e = !1 }) {
					if (
						((this.hasPendingMacrotasks = !1),
						(this.hasPendingMicrotasks = !1),
						(this.isStable = !0),
						(this.onUnstable = new Fl(!1)),
						(this.onMicrotaskEmpty = new Fl(!1)),
						(this.onStable = new Fl(!1)),
						(this.onError = new Fl(!1)),
						'undefined' == typeof Zone)
					)
						throw new Error('In this configuration Angular requires Zone.js');
					Zone.assertZonePatched();
					const n = this;
					(n._nesting = 0),
						(n._outer = n._inner = Zone.current),
						Zone.wtfZoneSpec && (n._inner = n._inner.fork(Zone.wtfZoneSpec)),
						Zone.TaskTrackingZoneSpec && (n._inner = n._inner.fork(new Zone.TaskTrackingZoneSpec())),
						t && Zone.longStackTraceZoneSpec && (n._inner = n._inner.fork(Zone.longStackTraceZoneSpec)),
						(n.shouldCoalesceEventChangeDetection = e),
						(n.lastRequestAnimationFrameId = -1),
						(n.nativeRequestAnimationFrame = (function () {
							let t = Rt.requestAnimationFrame,
								e = Rt.cancelAnimationFrame;
							if ('undefined' != typeof Zone && t && e) {
								const n = t[Zone.__symbol__('OriginalDelegate')];
								n && (t = n);
								const i = e[Zone.__symbol__('OriginalDelegate')];
								i && (e = i);
							}
							return { nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: e };
						})().nativeRequestAnimationFrame),
						(function (t) {
							const e =
								!!t.shouldCoalesceEventChangeDetection &&
								t.nativeRequestAnimationFrame &&
								(() => {
									!(function (t) {
										-1 === t.lastRequestAnimationFrameId &&
											((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
												Rt,
												() => {
													t.fakeTopEventTask ||
														(t.fakeTopEventTask = Zone.root.scheduleEventTask(
															'fakeTopEventTask',
															() => {
																(t.lastRequestAnimationFrameId = -1), kc(t), Cc(t);
															},
															void 0,
															() => {},
															() => {}
														)),
														t.fakeTopEventTask.invoke();
												}
											)),
											kc(t));
									})(t);
								});
							t._inner = t._inner.fork({
								name: 'angular',
								properties: { isAngularZone: !0, maybeDelayChangeDetection: e },
								onInvokeTask: (n, i, s, r, o, a) => {
									try {
										return Tc(t), n.invokeTask(s, r, o, a);
									} finally {
										e && 'eventTask' === r.type && e(), Ac(t);
									}
								},
								onInvoke: (e, n, i, s, r, o, a) => {
									try {
										return Tc(t), e.invoke(i, s, r, o, a);
									} finally {
										Ac(t);
									}
								},
								onHasTask: (e, n, i, s) => {
									e.hasTask(i, s),
										n === i &&
											('microTask' == s.change
												? ((t._hasPendingMicrotasks = s.microTask), kc(t), Cc(t))
												: 'macroTask' == s.change && (t.hasPendingMacrotasks = s.macroTask));
								},
								onHandleError: (e, n, i, s) => (
									e.handleError(i, s), t.runOutsideAngular(() => t.onError.emit(s)), !1
								),
							});
						})(n);
				}
				static isInAngularZone() {
					return !0 === Zone.current.get('isAngularZone');
				}
				static assertInAngularZone() {
					if (!xc.isInAngularZone()) throw new Error('Expected to be in Angular Zone, but it is not!');
				}
				static assertNotInAngularZone() {
					if (xc.isInAngularZone()) throw new Error('Expected to not be in Angular Zone, but it is!');
				}
				run(t, e, n) {
					return this._inner.run(t, e, n);
				}
				runTask(t, e, n, i) {
					const s = this._inner,
						r = s.scheduleEventTask('NgZoneEvent: ' + i, t, Ec, Sc, Sc);
					try {
						return s.runTask(r, e, n);
					} finally {
						s.cancelTask(r);
					}
				}
				runGuarded(t, e, n) {
					return this._inner.runGuarded(t, e, n);
				}
				runOutsideAngular(t) {
					return this._outer.run(t);
				}
			}
			function Sc() {}
			const Ec = {};
			function Cc(t) {
				if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
					try {
						t._nesting++, t.onMicrotaskEmpty.emit(null);
					} finally {
						if ((t._nesting--, !t.hasPendingMicrotasks))
							try {
								t.runOutsideAngular(() => t.onStable.emit(null));
							} finally {
								t.isStable = !0;
							}
					}
			}
			function kc(t) {
				t.hasPendingMicrotasks = !!(
					t._hasPendingMicrotasks ||
					(t.shouldCoalesceEventChangeDetection && -1 !== t.lastRequestAnimationFrameId)
				);
			}
			function Tc(t) {
				t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
			}
			function Ac(t) {
				t._nesting--, Cc(t);
			}
			class Ic {
				constructor() {
					(this.hasPendingMicrotasks = !1),
						(this.hasPendingMacrotasks = !1),
						(this.isStable = !0),
						(this.onUnstable = new Fl()),
						(this.onMicrotaskEmpty = new Fl()),
						(this.onStable = new Fl()),
						(this.onError = new Fl());
				}
				run(t, e, n) {
					return t.apply(e, n);
				}
				runGuarded(t, e, n) {
					return t.apply(e, n);
				}
				runOutsideAngular(t) {
					return t();
				}
				runTask(t, e, n, i) {
					return t.apply(e, n);
				}
			}
			let Oc = (() => {
					class t {
						constructor(t) {
							(this._ngZone = t),
								(this._pendingCount = 0),
								(this._isZoneStable = !0),
								(this._didWork = !1),
								(this._callbacks = []),
								(this.taskTrackingZone = null),
								this._watchAngularEvents(),
								t.run(() => {
									this.taskTrackingZone =
										'undefined' == typeof Zone ? null : Zone.current.get('TaskTrackingZone');
								});
						}
						_watchAngularEvents() {
							this._ngZone.onUnstable.subscribe({
								next: () => {
									(this._didWork = !0), (this._isZoneStable = !1);
								},
							}),
								this._ngZone.runOutsideAngular(() => {
									this._ngZone.onStable.subscribe({
										next: () => {
											xc.assertNotInAngularZone(),
												wc(() => {
													(this._isZoneStable = !0), this._runCallbacksIfReady();
												});
										},
									});
								});
						}
						increasePendingRequestCount() {
							return (this._pendingCount += 1), (this._didWork = !0), this._pendingCount;
						}
						decreasePendingRequestCount() {
							if (((this._pendingCount -= 1), this._pendingCount < 0))
								throw new Error('pending async requests below zero');
							return this._runCallbacksIfReady(), this._pendingCount;
						}
						isStable() {
							return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks;
						}
						_runCallbacksIfReady() {
							if (this.isStable())
								wc(() => {
									for (; 0 !== this._callbacks.length; ) {
										let t = this._callbacks.pop();
										clearTimeout(t.timeoutId), t.doneCb(this._didWork);
									}
									this._didWork = !1;
								});
							else {
								let t = this.getPendingTasks();
								(this._callbacks = this._callbacks.filter(
									e => !e.updateCb || !e.updateCb(t) || (clearTimeout(e.timeoutId), !1)
								)),
									(this._didWork = !0);
							}
						}
						getPendingTasks() {
							return this.taskTrackingZone
								? this.taskTrackingZone.macroTasks.map(t => ({
										source: t.source,
										creationLocation: t.creationLocation,
										data: t.data,
								  }))
								: [];
						}
						addCallback(t, e, n) {
							let i = -1;
							e &&
								e > 0 &&
								(i = setTimeout(() => {
									(this._callbacks = this._callbacks.filter(t => t.timeoutId !== i)),
										t(this._didWork, this.getPendingTasks());
								}, e)),
								this._callbacks.push({ doneCb: t, timeoutId: i, updateCb: n });
						}
						whenStable(t, e, n) {
							if (n && !this.taskTrackingZone)
								throw new Error(
									'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
								);
							this.addCallback(t, e, n), this._runCallbacksIfReady();
						}
						getPendingRequestCount() {
							return this._pendingCount;
						}
						findProviders(t, e, n) {
							return [];
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(xc));
						}),
						(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				Rc = (() => {
					class t {
						constructor() {
							(this._applications = new Map()), Nc.addToWindow(this);
						}
						registerApplication(t, e) {
							this._applications.set(t, e);
						}
						unregisterApplication(t) {
							this._applications.delete(t);
						}
						unregisterAllApplications() {
							this._applications.clear();
						}
						getTestability(t) {
							return this._applications.get(t) || null;
						}
						getAllTestabilities() {
							return Array.from(this._applications.values());
						}
						getAllRootElements() {
							return Array.from(this._applications.keys());
						}
						findTestabilityInTree(t, e = !0) {
							return Nc.findTestabilityInTree(this, t, e);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
						t
					);
				})();
			class Pc {
				addToWindow(t) {}
				findTestabilityInTree(t, e, n) {
					return null;
				}
			}
			let Lc,
				Nc = new Pc();
			const Dc = new Bt('AllowMultipleToken');
			class Mc {
				constructor(t, e) {
					(this.name = t), (this.token = e);
				}
			}
			function Fc(t, e, n = []) {
				const i = 'Platform: ' + e,
					s = new Bt(i);
				return (e = []) => {
					let r = jc();
					if (!r || r.injector.get(Dc, !1))
						if (t) t(n.concat(e).concat({ provide: s, useValue: !0 }));
						else {
							const t = n
								.concat(e)
								.concat({ provide: s, useValue: !0 }, { provide: Kr, useValue: 'platform' });
							!(function (t) {
								if (Lc && !Lc.destroyed && !Lc.injector.get(Dc, !1))
									throw new Error(
										'There can be only one platform. Destroy the previous one to create a new one.'
									);
								Lc = t.get(Bc);
								const e = t.get(oc, null);
								e && e.forEach(t => t());
							})(uo.create({ providers: t, name: i }));
						}
					return (function (t) {
						const e = jc();
						if (!e) throw new Error('No platform exists!');
						if (!e.injector.get(t, null))
							throw new Error(
								'A platform with a different configuration has been created. Please destroy it first.'
							);
						return e;
					})(s);
				};
			}
			function jc() {
				return Lc && !Lc.destroyed ? Lc : null;
			}
			let Bc = (() => {
				class t {
					constructor(t) {
						(this._injector = t),
							(this._modules = []),
							(this._destroyListeners = []),
							(this._destroyed = !1);
					}
					bootstrapModuleFactory(t, e) {
						const n = (function (t, e) {
								let n;
								return (
									(n =
										'noop' === t
											? new Ic()
											: ('zone.js' === t ? void 0 : t) ||
											  new xc({
													enableLongStackTrace: Ri(),
													shouldCoalesceEventChangeDetection: e,
											  })),
									n
								);
							})(e ? e.ngZone : void 0, (e && e.ngZoneEventCoalescing) || !1),
							i = [{ provide: xc, useValue: n }];
						return n.run(() => {
							const e = uo.create({ providers: i, parent: this.injector, name: t.moduleType.name }),
								s = t.create(e),
								r = s.injector.get(vi, null);
							if (!r) throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?');
							return (
								s.onDestroy(() => Uc(this._modules, s)),
								n.runOutsideAngular(() =>
									n.onError.subscribe({
										next: t => {
											r.handleError(t);
										},
									})
								),
								(function (t, e, n) {
									try {
										const i = n();
										return Do(i)
											? i.catch(n => {
													throw (e.runOutsideAngular(() => t.handleError(n)), n);
											  })
											: i;
									} catch (i) {
										throw (e.runOutsideAngular(() => t.handleError(i)), i);
									}
								})(r, n, () => {
									const t = s.injector.get(nc);
									return (
										t.runInitializers(),
										t.donePromise.then(
											() => (_a(s.injector.get(uc, fa) || fa), this._moduleDoBootstrap(s), s)
										)
									);
								})
							);
						});
					}
					bootstrapModule(t, e = []) {
						const n = zc({}, e);
						return (function (t, e, n) {
							const i = new Ml(n);
							return Promise.resolve(i);
						})(0, 0, t).then(t => this.bootstrapModuleFactory(t, n));
					}
					_moduleDoBootstrap(t) {
						const e = t.injector.get(Vc);
						if (t._bootstrapComponents.length > 0) t._bootstrapComponents.forEach(t => e.bootstrap(t));
						else {
							if (!t.instance.ngDoBootstrap)
								throw new Error(
									`The module ${wt(
										t.instance.constructor
									)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
								);
							t.instance.ngDoBootstrap(e);
						}
						this._modules.push(t);
					}
					onDestroy(t) {
						this._destroyListeners.push(t);
					}
					get injector() {
						return this._injector;
					}
					destroy() {
						if (this._destroyed) throw new Error('The platform has already been destroyed!');
						this._modules.slice().forEach(t => t.destroy()),
							this._destroyListeners.forEach(t => t()),
							(this._destroyed = !0);
					}
					get destroyed() {
						return this._destroyed;
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(uo));
					}),
					(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			function zc(t, e) {
				return Array.isArray(e) ? e.reduce(zc, t) : Object.assign(Object.assign({}, t), e);
			}
			let Vc = (() => {
				class t {
					constructor(t, e, n, i, s, r) {
						(this._zone = t),
							(this._console = e),
							(this._injector = n),
							(this._exceptionHandler = i),
							(this._componentFactoryResolver = s),
							(this._initStatus = r),
							(this._bootstrapListeners = []),
							(this._views = []),
							(this._runningTick = !1),
							(this._enforceNoNewChanges = !1),
							(this._stable = !0),
							(this.componentTypes = []),
							(this.components = []),
							(this._enforceNoNewChanges = Ri()),
							this._zone.onMicrotaskEmpty.subscribe({
								next: () => {
									this._zone.run(() => {
										this.tick();
									});
								},
							});
						const o = new _(t => {
								(this._stable =
									this._zone.isStable &&
									!this._zone.hasPendingMacrotasks &&
									!this._zone.hasPendingMicrotasks),
									this._zone.runOutsideAngular(() => {
										t.next(this._stable), t.complete();
									});
							}),
							a = new _(t => {
								let e;
								this._zone.runOutsideAngular(() => {
									e = this._zone.onStable.subscribe(() => {
										xc.assertNotInAngularZone(),
											wc(() => {
												this._stable ||
													this._zone.hasPendingMacrotasks ||
													this._zone.hasPendingMicrotasks ||
													((this._stable = !0), t.next(!0));
											});
									});
								});
								const n = this._zone.onUnstable.subscribe(() => {
									xc.assertInAngularZone(),
										this._stable &&
											((this._stable = !1),
											this._zone.runOutsideAngular(() => {
												t.next(!1);
											}));
								});
								return () => {
									e.unsubscribe(), n.unsubscribe();
								};
							});
						this.isStable = W(o, a.pipe(tt()));
					}
					bootstrap(t, e) {
						if (!this._initStatus.done)
							throw new Error(
								'Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.'
							);
						let n;
						(n = t instanceof Ja ? t : this._componentFactoryResolver.resolveComponentFactory(t)),
							this.componentTypes.push(n.componentType);
						const i = n.isBoundToModule ? void 0 : this._injector.get(ee),
							s = n.create(uo.NULL, [], e || n.selector, i);
						s.onDestroy(() => {
							this._unloadComponent(s);
						});
						const r = s.injector.get(Oc, null);
						return (
							r && s.injector.get(Rc).registerApplication(s.location.nativeElement, r),
							this._loadComponent(s),
							Ri() &&
								this._console.log(
									'Angular is running in development mode. Call enableProdMode() to enable production mode.'
								),
							s
						);
					}
					tick() {
						if (this._runningTick) throw new Error('ApplicationRef.tick is called recursively');
						try {
							this._runningTick = !0;
							for (let t of this._views) t.detectChanges();
							if (this._enforceNoNewChanges) for (let t of this._views) t.checkNoChanges();
						} catch (t) {
							this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(t));
						} finally {
							this._runningTick = !1;
						}
					}
					attachView(t) {
						const e = t;
						this._views.push(e), e.attachToAppRef(this);
					}
					detachView(t) {
						const e = t;
						Uc(this._views, e), e.detachFromAppRef();
					}
					_loadComponent(t) {
						this.attachView(t.hostView),
							this.tick(),
							this.components.push(t),
							this._injector
								.get(lc, [])
								.concat(this._bootstrapListeners)
								.forEach(e => e(t));
					}
					_unloadComponent(t) {
						this.detachView(t.hostView), Uc(this.components, t);
					}
					ngOnDestroy() {
						this._views.slice().forEach(t => t.destroy());
					}
					get viewCount() {
						return this._views.length;
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(xc), Kt(cc), Kt(uo), Kt(vi), Kt(el), Kt(nc));
					}),
					(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			function Uc(t, e) {
				const n = t.indexOf(e);
				n > -1 && t.splice(n, 1);
			}
			class Hc {}
			class $c {}
			const qc = { factoryPathPrefix: '', factoryPathSuffix: '.ngfactory' };
			let Wc = (() => {
				class t {
					constructor(t, e) {
						(this._compiler = t), (this._config = e || qc);
					}
					load(t) {
						return this.loadAndCompile(t);
					}
					loadAndCompile(t) {
						let [e, i] = t.split('#');
						return (
							void 0 === i && (i = 'default'),
							n('zn8P')(e)
								.then(t => t[i])
								.then(t => Qc(t, e, i))
								.then(t => this._compiler.compileModuleAsync(t))
						);
					}
					loadFactory(t) {
						let [e, i] = t.split('#'),
							s = 'NgFactory';
						return (
							void 0 === i && ((i = 'default'), (s = '')),
							n('zn8P')(this._config.factoryPathPrefix + e + this._config.factoryPathSuffix)
								.then(t => t[i + s])
								.then(t => Qc(t, e, i))
						);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(vc), Kt($c, 8));
					}),
					(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			function Qc(t, e, n) {
				if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
				return t;
			}
			const Zc = Fc(null, 'core', [
					{ provide: ac, useValue: 'unknown' },
					{ provide: Bc, deps: [uo] },
					{ provide: Rc, deps: [] },
					{ provide: cc, deps: [] },
				]),
				Gc = [
					{ provide: Vc, useClass: Vc, deps: [xc, cc, uo, vi, el, nc] },
					{
						provide: Rl,
						deps: [xc],
						useFactory: function (t) {
							let e = [];
							return (
								t.onStable.subscribe(() => {
									for (; e.length; ) e.pop()();
								}),
								function (t) {
									e.push(t);
								}
							);
						},
					},
					{ provide: nc, useClass: nc, deps: [[new rt(), ec]] },
					{ provide: vc, useClass: vc, deps: [] },
					sc,
					{
						provide: vl,
						useFactory: function () {
							return xl;
						},
						deps: [],
					},
					{
						provide: bl,
						useFactory: function () {
							return Sl;
						},
						deps: [],
					},
					{
						provide: uc,
						useFactory: function (t) {
							return _a((t = t || ('undefined' != typeof $localize && $localize.locale) || fa)), t;
						},
						deps: [[new st(uc), new rt(), new at()]],
					},
					{ provide: hc, useValue: 'USD' },
				];
			let Kc = (() => {
					class t {
						constructor(t) {}
					}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)(Kt(Vc));
							},
							providers: Gc,
						})),
						t
					);
				})(),
				Yc = null;
			function Xc() {
				return Yc;
			}
			const Jc = new Bt('DocumentToken');
			let tu = (() => {
				class t {}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵprov = ht({ factory: eu, token: t, providedIn: 'platform' })),
					t
				);
			})();
			function eu() {
				return Kt(iu);
			}
			const nu = new Bt('Location Initialized');
			let iu = (() => {
				class t extends tu {
					constructor(t) {
						super(), (this._doc = t), this._init();
					}
					_init() {
						(this.location = Xc().getLocation()), (this._history = Xc().getHistory());
					}
					getBaseHrefFromDOM() {
						return Xc().getBaseHref(this._doc);
					}
					onPopState(t) {
						Xc().getGlobalEventTarget(this._doc, 'window').addEventListener('popstate', t, !1);
					}
					onHashChange(t) {
						Xc().getGlobalEventTarget(this._doc, 'window').addEventListener('hashchange', t, !1);
					}
					get href() {
						return this.location.href;
					}
					get protocol() {
						return this.location.protocol;
					}
					get hostname() {
						return this.location.hostname;
					}
					get port() {
						return this.location.port;
					}
					get pathname() {
						return this.location.pathname;
					}
					get search() {
						return this.location.search;
					}
					get hash() {
						return this.location.hash;
					}
					set pathname(t) {
						this.location.pathname = t;
					}
					pushState(t, e, n) {
						su() ? this._history.pushState(t, e, n) : (this.location.hash = n);
					}
					replaceState(t, e, n) {
						su() ? this._history.replaceState(t, e, n) : (this.location.hash = n);
					}
					forward() {
						this._history.forward();
					}
					back() {
						this._history.back();
					}
					getState() {
						return this._history.state;
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(Jc));
					}),
					(t.ɵprov = ht({ factory: ru, token: t, providedIn: 'platform' })),
					t
				);
			})();
			function su() {
				return !!window.history.pushState;
			}
			function ru() {
				return new iu(Kt(Jc));
			}
			function ou(t, e) {
				if (0 == t.length) return e;
				if (0 == e.length) return t;
				let n = 0;
				return (
					t.endsWith('/') && n++,
					e.startsWith('/') && n++,
					2 == n ? t + e.substring(1) : 1 == n ? t + e : t + '/' + e
				);
			}
			function au(t) {
				const e = t.match(/#|\?|$/),
					n = (e && e.index) || t.length;
				return t.slice(0, n - ('/' === t[n - 1] ? 1 : 0)) + t.slice(n);
			}
			function lu(t) {
				return t && '?' !== t[0] ? '?' + t : t;
			}
			let cu = (() => {
				class t {}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵprov = ht({ factory: uu, token: t, providedIn: 'root' })),
					t
				);
			})();
			function uu(t) {
				const e = Kt(Jc).location;
				return new du(Kt(tu), (e && e.origin) || '');
			}
			const hu = new Bt('appBaseHref');
			let du = (() => {
					class t extends cu {
						constructor(t, e) {
							if (
								(super(),
								(this._platformLocation = t),
								null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
								null == e)
							)
								throw new Error(
									'No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.'
								);
							this._baseHref = e;
						}
						onPopState(t) {
							this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t);
						}
						getBaseHref() {
							return this._baseHref;
						}
						prepareExternalUrl(t) {
							return ou(this._baseHref, t);
						}
						path(t = !1) {
							const e = this._platformLocation.pathname + lu(this._platformLocation.search),
								n = this._platformLocation.hash;
							return n && t ? `${e}${n}` : e;
						}
						pushState(t, e, n, i) {
							const s = this.prepareExternalUrl(n + lu(i));
							this._platformLocation.pushState(t, e, s);
						}
						replaceState(t, e, n, i) {
							const s = this.prepareExternalUrl(n + lu(i));
							this._platformLocation.replaceState(t, e, s);
						}
						forward() {
							this._platformLocation.forward();
						}
						back() {
							this._platformLocation.back();
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(tu), Kt(hu, 8));
						}),
						(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				pu = (() => {
					class t extends cu {
						constructor(t, e) {
							super(),
								(this._platformLocation = t),
								(this._baseHref = ''),
								null != e && (this._baseHref = e);
						}
						onPopState(t) {
							this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t);
						}
						getBaseHref() {
							return this._baseHref;
						}
						path(t = !1) {
							let e = this._platformLocation.hash;
							return null == e && (e = '#'), e.length > 0 ? e.substring(1) : e;
						}
						prepareExternalUrl(t) {
							const e = ou(this._baseHref, t);
							return e.length > 0 ? '#' + e : e;
						}
						pushState(t, e, n, i) {
							let s = this.prepareExternalUrl(n + lu(i));
							0 == s.length && (s = this._platformLocation.pathname),
								this._platformLocation.pushState(t, e, s);
						}
						replaceState(t, e, n, i) {
							let s = this.prepareExternalUrl(n + lu(i));
							0 == s.length && (s = this._platformLocation.pathname),
								this._platformLocation.replaceState(t, e, s);
						}
						forward() {
							this._platformLocation.forward();
						}
						back() {
							this._platformLocation.back();
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(tu), Kt(hu, 8));
						}),
						(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				fu = (() => {
					class t {
						constructor(t, e) {
							(this._subject = new Fl()), (this._urlChangeListeners = []), (this._platformStrategy = t);
							const n = this._platformStrategy.getBaseHref();
							(this._platformLocation = e),
								(this._baseHref = au(gu(n))),
								this._platformStrategy.onPopState(t => {
									this._subject.emit({ url: this.path(!0), pop: !0, state: t.state, type: t.type });
								});
						}
						path(t = !1) {
							return this.normalize(this._platformStrategy.path(t));
						}
						getState() {
							return this._platformLocation.getState();
						}
						isCurrentPathEqualTo(t, e = '') {
							return this.path() == this.normalize(t + lu(e));
						}
						normalize(e) {
							return t.stripTrailingSlash(
								(function (t, e) {
									return t && e.startsWith(t) ? e.substring(t.length) : e;
								})(this._baseHref, gu(e))
							);
						}
						prepareExternalUrl(t) {
							return t && '/' !== t[0] && (t = '/' + t), this._platformStrategy.prepareExternalUrl(t);
						}
						go(t, e = '', n = null) {
							this._platformStrategy.pushState(n, '', t, e),
								this._notifyUrlChangeListeners(this.prepareExternalUrl(t + lu(e)), n);
						}
						replaceState(t, e = '', n = null) {
							this._platformStrategy.replaceState(n, '', t, e),
								this._notifyUrlChangeListeners(this.prepareExternalUrl(t + lu(e)), n);
						}
						forward() {
							this._platformStrategy.forward();
						}
						back() {
							this._platformStrategy.back();
						}
						onUrlChange(t) {
							this._urlChangeListeners.push(t),
								this._urlChangeSubscription ||
									(this._urlChangeSubscription = this.subscribe(t => {
										this._notifyUrlChangeListeners(t.url, t.state);
									}));
						}
						_notifyUrlChangeListeners(t = '', e) {
							this._urlChangeListeners.forEach(n => n(t, e));
						}
						subscribe(t, e, n) {
							return this._subject.subscribe({ next: t, error: e, complete: n });
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(cu), Kt(tu));
						}),
						(t.normalizeQueryParams = lu),
						(t.joinWithSlash = ou),
						(t.stripTrailingSlash = au),
						(t.ɵprov = ht({ factory: mu, token: t, providedIn: 'root' })),
						t
					);
				})();
			function mu() {
				return new fu(Kt(cu), Kt(tu));
			}
			function gu(t) {
				return t.replace(/\/index.html$/, '');
			}
			var yu = (function (t) {
				return (
					(t[(t.Zero = 0)] = 'Zero'),
					(t[(t.One = 1)] = 'One'),
					(t[(t.Two = 2)] = 'Two'),
					(t[(t.Few = 3)] = 'Few'),
					(t[(t.Many = 4)] = 'Many'),
					(t[(t.Other = 5)] = 'Other'),
					t
				);
			})({});
			class _u {}
			let vu = (() => {
					class t extends _u {
						constructor(t) {
							super(), (this.locale = t);
						}
						getPluralCategory(t, e) {
							switch (
								(function (t) {
									return (function (t) {
										const e = (function (t) {
											return t.toLowerCase().replace(/_/g, '-');
										})(t);
										let n = da(e);
										if (n) return n;
										const i = e.split('-')[0];
										if (((n = da(i)), n)) return n;
										if ('en' === i) return ua;
										throw new Error(`Missing locale data for the locale "${t}".`);
									})(t)[pa.PluralCase];
								})(e || this.locale)(t)
							) {
								case yu.Zero:
									return 'zero';
								case yu.One:
									return 'one';
								case yu.Two:
									return 'two';
								case yu.Few:
									return 'few';
								case yu.Many:
									return 'many';
								default:
									return 'other';
							}
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(uc));
						}),
						(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				bu = (() => {
					class t {
						constructor(t, e) {
							(this._viewContainer = t),
								(this._context = new wu()),
								(this._thenTemplateRef = null),
								(this._elseTemplateRef = null),
								(this._thenViewRef = null),
								(this._elseViewRef = null),
								(this._thenTemplateRef = e);
						}
						set ngIf(t) {
							(this._context.$implicit = this._context.ngIf = t), this._updateView();
						}
						set ngIfThen(t) {
							xu('ngIfThen', t),
								(this._thenTemplateRef = t),
								(this._thenViewRef = null),
								this._updateView();
						}
						set ngIfElse(t) {
							xu('ngIfElse', t),
								(this._elseTemplateRef = t),
								(this._elseViewRef = null),
								this._updateView();
						}
						_updateView() {
							this._context.$implicit
								? this._thenViewRef ||
								  (this._viewContainer.clear(),
								  (this._elseViewRef = null),
								  this._thenTemplateRef &&
										(this._thenViewRef = this._viewContainer.createEmbeddedView(
											this._thenTemplateRef,
											this._context
										)))
								: this._elseViewRef ||
								  (this._viewContainer.clear(),
								  (this._thenViewRef = null),
								  this._elseTemplateRef &&
										(this._elseViewRef = this._viewContainer.createEmbeddedView(
											this._elseTemplateRef,
											this._context
										)));
						}
						static ngTemplateContextGuard(t, e) {
							return !0;
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(To(kl), To(El));
						}),
						(t.ɵdir = xe({
							type: t,
							selectors: [['', 'ngIf', '']],
							inputs: { ngIf: 'ngIf', ngIfThen: 'ngIfThen', ngIfElse: 'ngIfElse' },
						})),
						t
					);
				})();
			class wu {
				constructor() {
					(this.$implicit = null), (this.ngIf = null);
				}
			}
			function xu(t, e) {
				if (e && !e.createEmbeddedView) throw new Error(`${t} must be a TemplateRef, but received '${wt(e)}'.`);
			}
			let Su = (() => {
				class t {}
				return (
					(t.ɵmod = be({ type: t })),
					(t.ɵinj = dt({
						factory: function (e) {
							return new (e || t)();
						},
						providers: [{ provide: _u, useClass: vu }],
					})),
					t
				);
			})();
			function Eu(t) {
				return 'browser' === t;
			}
			function Cu(t) {
				return 'server' === t;
			}
			let ku = (() => {
				class t {}
				return (
					(t.ɵprov = ht({ token: t, providedIn: 'root', factory: () => new Tu(Kt(Jc), window, Kt(vi)) })), t
				);
			})();
			class Tu {
				constructor(t, e, n) {
					(this.document = t), (this.window = e), (this.errorHandler = n), (this.offset = () => [0, 0]);
				}
				setOffset(t) {
					this.offset = Array.isArray(t) ? () => t : t;
				}
				getScrollPosition() {
					return this.supportsScrolling() ? [this.window.scrollX, this.window.scrollY] : [0, 0];
				}
				scrollToPosition(t) {
					this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
				}
				scrollToAnchor(t) {
					if (this.supportsScrolling()) {
						const e = this.document.getElementById(t) || this.document.getElementsByName(t)[0];
						e && this.scrollToElement(e);
					}
				}
				setHistoryScrollRestoration(t) {
					if (this.supportScrollRestoration()) {
						const e = this.window.history;
						e && e.scrollRestoration && (e.scrollRestoration = t);
					}
				}
				scrollToElement(t) {
					const e = t.getBoundingClientRect(),
						n = e.left + this.window.pageXOffset,
						i = e.top + this.window.pageYOffset,
						s = this.offset();
					this.window.scrollTo(n - s[0], i - s[1]);
				}
				supportScrollRestoration() {
					try {
						if (!this.window || !this.window.scrollTo) return !1;
						const t = Au(this.window.history) || Au(Object.getPrototypeOf(this.window.history));
						return !(!t || (!t.writable && !t.set));
					} catch (t) {
						return !1;
					}
				}
				supportsScrolling() {
					try {
						return !!this.window.scrollTo;
					} catch (t) {
						return !1;
					}
				}
			}
			function Au(t) {
				return Object.getOwnPropertyDescriptor(t, 'scrollRestoration');
			}
			class Iu extends class extends class {} {
				constructor() {
					super();
				}
				supportsDOMEvents() {
					return !0;
				}
			} {
				static makeCurrent() {
					var t;
					(t = new Iu()), Yc || (Yc = t);
				}
				getProperty(t, e) {
					return t[e];
				}
				log(t) {
					window.console && window.console.log && window.console.log(t);
				}
				logGroup(t) {
					window.console && window.console.group && window.console.group(t);
				}
				logGroupEnd() {
					window.console && window.console.groupEnd && window.console.groupEnd();
				}
				onAndCancel(t, e, n) {
					return (
						t.addEventListener(e, n, !1),
						() => {
							t.removeEventListener(e, n, !1);
						}
					);
				}
				dispatchEvent(t, e) {
					t.dispatchEvent(e);
				}
				remove(t) {
					return t.parentNode && t.parentNode.removeChild(t), t;
				}
				getValue(t) {
					return t.value;
				}
				createElement(t, e) {
					return (e = e || this.getDefaultDocument()).createElement(t);
				}
				createHtmlDocument() {
					return document.implementation.createHTMLDocument('fakeTitle');
				}
				getDefaultDocument() {
					return document;
				}
				isElementNode(t) {
					return t.nodeType === Node.ELEMENT_NODE;
				}
				isShadowRoot(t) {
					return t instanceof DocumentFragment;
				}
				getGlobalEventTarget(t, e) {
					return 'window' === e ? window : 'document' === e ? t : 'body' === e ? t.body : null;
				}
				getHistory() {
					return window.history;
				}
				getLocation() {
					return window.location;
				}
				getBaseHref(t) {
					const e = Ru || ((Ru = document.querySelector('base')), Ru) ? Ru.getAttribute('href') : null;
					return null == e
						? null
						: ((n = e),
						  Ou || (Ou = document.createElement('a')),
						  Ou.setAttribute('href', n),
						  '/' === Ou.pathname.charAt(0) ? Ou.pathname : '/' + Ou.pathname);
					var n;
				}
				resetBaseElement() {
					Ru = null;
				}
				getUserAgent() {
					return window.navigator.userAgent;
				}
				performanceNow() {
					return window.performance && window.performance.now
						? window.performance.now()
						: new Date().getTime();
				}
				supportsCookies() {
					return !0;
				}
				getCookie(t) {
					return (function (t, e) {
						e = encodeURIComponent(e);
						for (const n of t.split(';')) {
							const t = n.indexOf('='),
								[i, s] = -1 == t ? [n, ''] : [n.slice(0, t), n.slice(t + 1)];
							if (i.trim() === e) return decodeURIComponent(s);
						}
						return null;
					})(document.cookie, t);
				}
			}
			let Ou,
				Ru = null;
			const Pu = new Bt('TRANSITION_ID'),
				Lu = [
					{
						provide: ec,
						useFactory: function (t, e, n) {
							return () => {
								n.get(nc).donePromise.then(() => {
									const n = Xc();
									Array.prototype.slice
										.apply(e.querySelectorAll('style[ng-transition]'))
										.filter(e => e.getAttribute('ng-transition') === t)
										.forEach(t => n.remove(t));
								});
							};
						},
						deps: [Pu, Jc, uo],
						multi: !0,
					},
				];
			class Nu {
				static init() {
					var t;
					(t = new Nu()), (Nc = t);
				}
				addToWindow(t) {
					(Rt.getAngularTestability = (e, n = !0) => {
						const i = t.findTestabilityInTree(e, n);
						if (null == i) throw new Error('Could not find testability for element.');
						return i;
					}),
						(Rt.getAllAngularTestabilities = () => t.getAllTestabilities()),
						(Rt.getAllAngularRootElements = () => t.getAllRootElements()),
						Rt.frameworkStabilizers || (Rt.frameworkStabilizers = []),
						Rt.frameworkStabilizers.push(t => {
							const e = Rt.getAllAngularTestabilities();
							let n = e.length,
								i = !1;
							const s = function (e) {
								(i = i || e), n--, 0 == n && t(i);
							};
							e.forEach(function (t) {
								t.whenStable(s);
							});
						});
				}
				findTestabilityInTree(t, e, n) {
					if (null == e) return null;
					const i = t.getTestability(e);
					return null != i
						? i
						: n
						? Xc().isShadowRoot(e)
							? this.findTestabilityInTree(t, e.host, !0)
							: this.findTestabilityInTree(t, e.parentElement, !0)
						: null;
				}
			}
			const Du = new Bt('EventManagerPlugins');
			let Mu = (() => {
				class t {
					constructor(t, e) {
						(this._zone = e),
							(this._eventNameToPlugin = new Map()),
							t.forEach(t => (t.manager = this)),
							(this._plugins = t.slice().reverse());
					}
					addEventListener(t, e, n) {
						return this._findPluginFor(e).addEventListener(t, e, n);
					}
					addGlobalEventListener(t, e, n) {
						return this._findPluginFor(e).addGlobalEventListener(t, e, n);
					}
					getZone() {
						return this._zone;
					}
					_findPluginFor(t) {
						const e = this._eventNameToPlugin.get(t);
						if (e) return e;
						const n = this._plugins;
						for (let i = 0; i < n.length; i++) {
							const e = n[i];
							if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
						}
						throw new Error('No event manager plugin found for event ' + t);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(Du), Kt(xc));
					}),
					(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			class Fu {
				constructor(t) {
					this._doc = t;
				}
				addGlobalEventListener(t, e, n) {
					const i = Xc().getGlobalEventTarget(this._doc, t);
					if (!i) throw new Error(`Unsupported event target ${i} for event ${e}`);
					return this.addEventListener(i, e, n);
				}
			}
			let ju = (() => {
					class t {
						constructor() {
							this._stylesSet = new Set();
						}
						addStyles(t) {
							const e = new Set();
							t.forEach(t => {
								this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
							}),
								this.onStylesAdded(e);
						}
						onStylesAdded(t) {}
						getAllStyles() {
							return Array.from(this._stylesSet);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				Bu = (() => {
					class t extends ju {
						constructor(t) {
							super(),
								(this._doc = t),
								(this._hostNodes = new Set()),
								(this._styleNodes = new Set()),
								this._hostNodes.add(t.head);
						}
						_addStylesToHost(t, e) {
							t.forEach(t => {
								const n = this._doc.createElement('style');
								(n.textContent = t), this._styleNodes.add(e.appendChild(n));
							});
						}
						addHost(t) {
							this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
						}
						removeHost(t) {
							this._hostNodes.delete(t);
						}
						onStylesAdded(t) {
							this._hostNodes.forEach(e => this._addStylesToHost(t, e));
						}
						ngOnDestroy() {
							this._styleNodes.forEach(t => Xc().remove(t));
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(Jc));
						}),
						(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
						t
					);
				})();
			const zu = {
					svg: 'http://www.w3.org/2000/svg',
					xhtml: 'http://www.w3.org/1999/xhtml',
					xlink: 'http://www.w3.org/1999/xlink',
					xml: 'http://www.w3.org/XML/1998/namespace',
					xmlns: 'http://www.w3.org/2000/xmlns/',
				},
				Vu = /%COMP%/g;
			function Uu(t, e, n) {
				for (let i = 0; i < e.length; i++) {
					let s = e[i];
					Array.isArray(s) ? Uu(t, s, n) : ((s = s.replace(Vu, t)), n.push(s));
				}
				return n;
			}
			function Hu(t) {
				return e => {
					if ('__ngUnwrap__' === e) return t;
					!1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
				};
			}
			let $u = (() => {
				class t {
					constructor(t, e, n) {
						(this.eventManager = t),
							(this.sharedStylesHost = e),
							(this.appId = n),
							(this.rendererByCompId = new Map()),
							(this.defaultRenderer = new qu(t));
					}
					createRenderer(t, e) {
						if (!t || !e) return this.defaultRenderer;
						switch (e.encapsulation) {
							case de.Emulated: {
								let n = this.rendererByCompId.get(e.id);
								return (
									n ||
										((n = new Wu(this.eventManager, this.sharedStylesHost, e, this.appId)),
										this.rendererByCompId.set(e.id, n)),
									n.applyToHost(t),
									n
								);
							}
							case de.Native:
							case de.ShadowDom:
								return new Qu(this.eventManager, this.sharedStylesHost, t, e);
							default:
								if (!this.rendererByCompId.has(e.id)) {
									const t = Uu(e.id, e.styles, []);
									this.sharedStylesHost.addStyles(t),
										this.rendererByCompId.set(e.id, this.defaultRenderer);
								}
								return this.defaultRenderer;
						}
					}
					begin() {}
					end() {}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(Mu), Kt(Bu), Kt(ic));
					}),
					(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			class qu {
				constructor(t) {
					(this.eventManager = t), (this.data = Object.create(null));
				}
				destroy() {}
				createElement(t, e) {
					return e ? document.createElementNS(zu[e] || e, t) : document.createElement(t);
				}
				createComment(t) {
					return document.createComment(t);
				}
				createText(t) {
					return document.createTextNode(t);
				}
				appendChild(t, e) {
					t.appendChild(e);
				}
				insertBefore(t, e, n) {
					t && t.insertBefore(e, n);
				}
				removeChild(t, e) {
					t && t.removeChild(e);
				}
				selectRootElement(t, e) {
					let n = 'string' == typeof t ? document.querySelector(t) : t;
					if (!n) throw new Error(`The selector "${t}" did not match any elements`);
					return e || (n.textContent = ''), n;
				}
				parentNode(t) {
					return t.parentNode;
				}
				nextSibling(t) {
					return t.nextSibling;
				}
				setAttribute(t, e, n, i) {
					if (i) {
						e = i + ':' + e;
						const s = zu[i];
						s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
					} else t.setAttribute(e, n);
				}
				removeAttribute(t, e, n) {
					if (n) {
						const i = zu[n];
						i ? t.removeAttributeNS(i, e) : t.removeAttribute(`${n}:${e}`);
					} else t.removeAttribute(e);
				}
				addClass(t, e) {
					t.classList.add(e);
				}
				removeClass(t, e) {
					t.classList.remove(e);
				}
				setStyle(t, e, n, i) {
					i & rl.DashCase ? t.style.setProperty(e, n, i & rl.Important ? 'important' : '') : (t.style[e] = n);
				}
				removeStyle(t, e, n) {
					n & rl.DashCase ? t.style.removeProperty(e) : (t.style[e] = '');
				}
				setProperty(t, e, n) {
					t[e] = n;
				}
				setValue(t, e) {
					t.nodeValue = e;
				}
				listen(t, e, n) {
					return 'string' == typeof t
						? this.eventManager.addGlobalEventListener(t, e, Hu(n))
						: this.eventManager.addEventListener(t, e, Hu(n));
				}
			}
			class Wu extends qu {
				constructor(t, e, n, i) {
					super(t), (this.component = n);
					const s = Uu(i + '-' + n.id, n.styles, []);
					e.addStyles(s),
						(this.contentAttr = '_ngcontent-%COMP%'.replace(Vu, i + '-' + n.id)),
						(this.hostAttr = '_nghost-%COMP%'.replace(Vu, i + '-' + n.id));
				}
				applyToHost(t) {
					super.setAttribute(t, this.hostAttr, '');
				}
				createElement(t, e) {
					const n = super.createElement(t, e);
					return super.setAttribute(n, this.contentAttr, ''), n;
				}
			}
			class Qu extends qu {
				constructor(t, e, n, i) {
					super(t),
						(this.sharedStylesHost = e),
						(this.hostEl = n),
						(this.component = i),
						(this.shadowRoot =
							i.encapsulation === de.ShadowDom ? n.attachShadow({ mode: 'open' }) : n.createShadowRoot()),
						this.sharedStylesHost.addHost(this.shadowRoot);
					const s = Uu(i.id, i.styles, []);
					for (let r = 0; r < s.length; r++) {
						const t = document.createElement('style');
						(t.textContent = s[r]), this.shadowRoot.appendChild(t);
					}
				}
				nodeOrShadowRoot(t) {
					return t === this.hostEl ? this.shadowRoot : t;
				}
				destroy() {
					this.sharedStylesHost.removeHost(this.shadowRoot);
				}
				appendChild(t, e) {
					return super.appendChild(this.nodeOrShadowRoot(t), e);
				}
				insertBefore(t, e, n) {
					return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
				}
				removeChild(t, e) {
					return super.removeChild(this.nodeOrShadowRoot(t), e);
				}
				parentNode(t) {
					return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)));
				}
			}
			let Zu = (() => {
				class t extends Fu {
					constructor(t) {
						super(t);
					}
					supports(t) {
						return !0;
					}
					addEventListener(t, e, n) {
						return t.addEventListener(e, n, !1), () => this.removeEventListener(t, e, n);
					}
					removeEventListener(t, e, n) {
						return t.removeEventListener(e, n);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(Jc));
					}),
					(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const Gu = ['alt', 'control', 'meta', 'shift'],
				Ku = {
					'\b': 'Backspace',
					'\t': 'Tab',
					'\x7f': 'Delete',
					'\x1b': 'Escape',
					Del: 'Delete',
					Esc: 'Escape',
					Left: 'ArrowLeft',
					Right: 'ArrowRight',
					Up: 'ArrowUp',
					Down: 'ArrowDown',
					Menu: 'ContextMenu',
					Scroll: 'ScrollLock',
					Win: 'OS',
				},
				Yu = {
					A: '1',
					B: '2',
					C: '3',
					D: '4',
					E: '5',
					F: '6',
					G: '7',
					H: '8',
					I: '9',
					J: '*',
					K: '+',
					M: '-',
					N: '.',
					O: '/',
					'`': '0',
					'\x90': 'NumLock',
				},
				Xu = { alt: t => t.altKey, control: t => t.ctrlKey, meta: t => t.metaKey, shift: t => t.shiftKey };
			let Ju = (() => {
					class t extends Fu {
						constructor(t) {
							super(t);
						}
						supports(e) {
							return null != t.parseEventName(e);
						}
						addEventListener(e, n, i) {
							const s = t.parseEventName(n),
								r = t.eventCallback(s.fullKey, i, this.manager.getZone());
							return this.manager
								.getZone()
								.runOutsideAngular(() => Xc().onAndCancel(e, s.domEventName, r));
						}
						static parseEventName(e) {
							const n = e.toLowerCase().split('.'),
								i = n.shift();
							if (0 === n.length || ('keydown' !== i && 'keyup' !== i)) return null;
							const s = t._normalizeKey(n.pop());
							let r = '';
							if (
								(Gu.forEach(t => {
									const e = n.indexOf(t);
									e > -1 && (n.splice(e, 1), (r += t + '.'));
								}),
								(r += s),
								0 != n.length || 0 === s.length)
							)
								return null;
							const o = {};
							return (o.domEventName = i), (o.fullKey = r), o;
						}
						static getEventFullKey(t) {
							let e = '',
								n = (function (t) {
									let e = t.key;
									if (null == e) {
										if (((e = t.keyIdentifier), null == e)) return 'Unidentified';
										e.startsWith('U+') &&
											((e = String.fromCharCode(parseInt(e.substring(2), 16))),
											3 === t.location && Yu.hasOwnProperty(e) && (e = Yu[e]));
									}
									return Ku[e] || e;
								})(t);
							return (
								(n = n.toLowerCase()),
								' ' === n ? (n = 'space') : '.' === n && (n = 'dot'),
								Gu.forEach(i => {
									i != n && (0, Xu[i])(t) && (e += i + '.');
								}),
								(e += n),
								e
							);
						}
						static eventCallback(e, n, i) {
							return s => {
								t.getEventFullKey(s) === e && i.runGuarded(() => n(s));
							};
						}
						static _normalizeKey(t) {
							switch (t) {
								case 'esc':
									return 'escape';
								default:
									return t;
							}
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(Jc));
						}),
						(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				th = (() => {
					class t {}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵprov = ht({
							factory: function () {
								return Kt(eh);
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				eh = (() => {
					class t extends th {
						constructor(t) {
							super(), (this._doc = t);
						}
						sanitize(t, e) {
							if (null == e) return null;
							switch (t) {
								case is.NONE:
									return e;
								case is.HTML:
									return Ti(e, 'HTML') ? ki(e) : es(this._doc, String(e));
								case is.STYLE:
									return Ti(e, 'Style') ? ki(e) : e;
								case is.SCRIPT:
									if (Ti(e, 'Script')) return ki(e);
									throw new Error('unsafe value used in a script context');
								case is.URL:
									return Ai(e), Ti(e, 'URL') ? ki(e) : Fi(String(e));
								case is.RESOURCE_URL:
									if (Ti(e, 'ResourceURL')) return ki(e);
									throw new Error(
										'unsafe value used in a resource URL context (see http://g.co/ng/security#xss)'
									);
								default:
									throw new Error(
										`Unexpected SecurityContext ${t} (see http://g.co/ng/security#xss)`
									);
							}
						}
						bypassSecurityTrustHtml(t) {
							return new wi(t);
						}
						bypassSecurityTrustStyle(t) {
							return new xi(t);
						}
						bypassSecurityTrustScript(t) {
							return new Si(t);
						}
						bypassSecurityTrustUrl(t) {
							return new Ei(t);
						}
						bypassSecurityTrustResourceUrl(t) {
							return new Ci(t);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(Jc));
						}),
						(t.ɵprov = ht({
							factory: function () {
								return (t = Kt(zt)), new eh(t.get(Jc));
								var t;
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})();
			const nh = Fc(Zc, 'browser', [
					{ provide: ac, useValue: 'browser' },
					{
						provide: oc,
						useValue: function () {
							Iu.makeCurrent(), Nu.init();
						},
						multi: !0,
					},
					{
						provide: Jc,
						useFactory: function () {
							return (
								(function (t) {
									Ve = t;
								})(document),
								document
							);
						},
						deps: [],
					},
				]),
				ih = [
					[],
					{ provide: Kr, useValue: 'root' },
					{
						provide: vi,
						useFactory: function () {
							return new vi();
						},
						deps: [],
					},
					{ provide: Du, useClass: Zu, multi: !0, deps: [Jc, xc, ac] },
					{ provide: Du, useClass: Ju, multi: !0, deps: [Jc] },
					[],
					{ provide: $u, useClass: $u, deps: [Mu, Bu, ic] },
					{ provide: sl, useExisting: $u },
					{ provide: ju, useExisting: Bu },
					{ provide: Bu, useClass: Bu, deps: [Jc] },
					{ provide: Oc, useClass: Oc, deps: [xc] },
					{ provide: Mu, useClass: Mu, deps: [Du, xc] },
					[],
				];
			let sh,
				rh = (() => {
					class t {
						constructor(t) {
							if (t)
								throw new Error(
									'BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.'
								);
						}
						static withServerTransition(e) {
							return {
								ngModule: t,
								providers: [{ provide: ic, useValue: e.appId }, { provide: Pu, useExisting: ic }, Lu],
							};
						}
					}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)(Kt(t, 12));
							},
							providers: ih,
							imports: [Su, Kc],
						})),
						t
					);
				})();
			'undefined' != typeof window && window;
			try {
				sh = 'undefined' != typeof Intl && Intl.v8BreakIterator;
			} catch (nE) {
				sh = !1;
			}
			let oh,
				ah,
				lh,
				ch,
				uh = (() => {
					class t {
						constructor(t) {
							(this._platformId = t),
								(this.isBrowser = this._platformId
									? Eu(this._platformId)
									: 'object' == typeof document && !!document),
								(this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent)),
								(this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent)),
								(this.BLINK =
									this.isBrowser &&
									!(!window.chrome && !sh) &&
									'undefined' != typeof CSS &&
									!this.EDGE &&
									!this.TRIDENT),
								(this.WEBKIT =
									this.isBrowser &&
									/AppleWebKit/i.test(navigator.userAgent) &&
									!this.BLINK &&
									!this.EDGE &&
									!this.TRIDENT),
								(this.IOS =
									this.isBrowser &&
									/iPad|iPhone|iPod/.test(navigator.userAgent) &&
									!('MSStream' in window)),
								(this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent)),
								(this.ANDROID =
									this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT),
								(this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(ac));
						}),
						(t.ɵprov = ht({
							factory: function () {
								return new t(Kt(ac));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				hh = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
						})),
						t
					);
				})();
			function dh(t) {
				return (function () {
					if (null == oh && 'undefined' != typeof window)
						try {
							window.addEventListener(
								'test',
								null,
								Object.defineProperty({}, 'passive', { get: () => (oh = !0) })
							);
						} finally {
							oh = oh || !1;
						}
					return oh;
				})()
					? t
					: !!t.capture;
			}
			function ph() {
				if ('object' != typeof document || !document) return 0;
				if (null == ah) {
					const t = document.createElement('div'),
						e = t.style;
					(t.dir = 'rtl'),
						(e.width = '1px'),
						(e.overflow = 'auto'),
						(e.visibility = 'hidden'),
						(e.pointerEvents = 'none'),
						(e.position = 'absolute');
					const n = document.createElement('div'),
						i = n.style;
					(i.width = '2px'),
						(i.height = '1px'),
						t.appendChild(n),
						document.body.appendChild(t),
						(ah = 0),
						0 === t.scrollLeft && ((t.scrollLeft = 1), (ah = 0 === t.scrollLeft ? 1 : 2)),
						t.parentNode.removeChild(t);
				}
				return ah;
			}
			function fh(...t) {
				let e = t[t.length - 1];
				return C(e) ? (t.pop(), D(t, e)) : q(t);
			}
			function mh() {}
			function gh(t, e, n) {
				return function (i) {
					return i.lift(new yh(t, e, n));
				};
			}
			class yh {
				constructor(t, e, n) {
					(this.nextOrObserver = t), (this.error = e), (this.complete = n);
				}
				call(t, e) {
					return e.subscribe(new _h(t, this.nextOrObserver, this.error, this.complete));
				}
			}
			class _h extends f {
				constructor(t, e, n, s) {
					super(t),
						(this._tapNext = mh),
						(this._tapError = mh),
						(this._tapComplete = mh),
						(this._tapError = n || mh),
						(this._tapComplete = s || mh),
						i(e)
							? ((this._context = this), (this._tapNext = e))
							: e &&
							  ((this._context = e),
							  (this._tapNext = e.next || mh),
							  (this._tapError = e.error || mh),
							  (this._tapComplete = e.complete || mh));
				}
				_next(t) {
					try {
						this._tapNext.call(this._context, t);
					} catch (e) {
						return void this.destination.error(e);
					}
					this.destination.next(t);
				}
				_error(t) {
					try {
						this._tapError.call(this._context, t);
					} catch (t) {
						return void this.destination.error(t);
					}
					this.destination.error(t);
				}
				_complete() {
					try {
						this._tapComplete.call(this._context);
					} catch (t) {
						return void this.destination.error(t);
					}
					return this.destination.complete();
				}
			}
			class vh extends h {
				constructor(t, e) {
					super();
				}
				schedule(t, e = 0) {
					return this;
				}
			}
			class bh extends vh {
				constructor(t, e) {
					super(t, e), (this.scheduler = t), (this.work = e), (this.pending = !1);
				}
				schedule(t, e = 0) {
					if (this.closed) return this;
					this.state = t;
					const n = this.id,
						i = this.scheduler;
					return (
						null != n && (this.id = this.recycleAsyncId(i, n, e)),
						(this.pending = !0),
						(this.delay = e),
						(this.id = this.id || this.requestAsyncId(i, this.id, e)),
						this
					);
				}
				requestAsyncId(t, e, n = 0) {
					return setInterval(t.flush.bind(t, this), n);
				}
				recycleAsyncId(t, e, n = 0) {
					if (null !== n && this.delay === n && !1 === this.pending) return e;
					clearInterval(e);
				}
				execute(t, e) {
					if (this.closed) return new Error('executing a cancelled action');
					this.pending = !1;
					const n = this._execute(t, e);
					if (n) return n;
					!1 === this.pending &&
						null != this.id &&
						(this.id = this.recycleAsyncId(this.scheduler, this.id, null));
				}
				_execute(t, e) {
					let n = !1,
						i = void 0;
					try {
						this.work(t);
					} catch (s) {
						(n = !0), (i = (!!s && s) || new Error(s));
					}
					if (n) return this.unsubscribe(), i;
				}
				_unsubscribe() {
					const t = this.id,
						e = this.scheduler,
						n = e.actions,
						i = n.indexOf(this);
					(this.work = null),
						(this.state = null),
						(this.pending = !1),
						(this.scheduler = null),
						-1 !== i && n.splice(i, 1),
						null != t && (this.id = this.recycleAsyncId(e, t, null)),
						(this.delay = null);
				}
			}
			let wh = (() => {
				class t {
					constructor(e, n = t.now) {
						(this.SchedulerAction = e), (this.now = n);
					}
					schedule(t, e = 0, n) {
						return new this.SchedulerAction(this, t).schedule(n, e);
					}
				}
				return (t.now = () => Date.now()), t;
			})();
			class xh extends wh {
				constructor(t, e = wh.now) {
					super(t, () => (xh.delegate && xh.delegate !== this ? xh.delegate.now() : e())),
						(this.actions = []),
						(this.active = !1),
						(this.scheduled = void 0);
				}
				schedule(t, e = 0, n) {
					return xh.delegate && xh.delegate !== this
						? xh.delegate.schedule(t, e, n)
						: super.schedule(t, e, n);
				}
				flush(t) {
					const { actions: e } = this;
					if (this.active) return void e.push(t);
					let n;
					this.active = !0;
					do {
						if ((n = t.execute(t.state, t.delay))) break;
					} while ((t = e.shift()));
					if (((this.active = !1), n)) {
						for (; (t = e.shift()); ) t.unsubscribe();
						throw n;
					}
				}
			}
			const Sh = new xh(bh);
			class Eh {
				constructor(t, e) {
					(this.dueTime = t), (this.scheduler = e);
				}
				call(t, e) {
					return e.subscribe(new Ch(t, this.dueTime, this.scheduler));
				}
			}
			class Ch extends f {
				constructor(t, e, n) {
					super(t),
						(this.dueTime = e),
						(this.scheduler = n),
						(this.debouncedSubscription = null),
						(this.lastValue = null),
						(this.hasValue = !1);
				}
				_next(t) {
					this.clearDebounce(),
						(this.lastValue = t),
						(this.hasValue = !0),
						this.add((this.debouncedSubscription = this.scheduler.schedule(kh, this.dueTime, this)));
				}
				_complete() {
					this.debouncedNext(), this.destination.complete();
				}
				debouncedNext() {
					if ((this.clearDebounce(), this.hasValue)) {
						const { lastValue: t } = this;
						(this.lastValue = null), (this.hasValue = !1), this.destination.next(t);
					}
				}
				clearDebounce() {
					const t = this.debouncedSubscription;
					null !== t && (this.remove(t), t.unsubscribe(), (this.debouncedSubscription = null));
				}
			}
			function kh(t) {
				t.debouncedNext();
			}
			function Th(t, e) {
				return function (n) {
					return n.lift(new Ah(t, e));
				};
			}
			class Ah {
				constructor(t, e) {
					(this.predicate = t), (this.thisArg = e);
				}
				call(t, e) {
					return e.subscribe(new Ih(t, this.predicate, this.thisArg));
				}
			}
			class Ih extends f {
				constructor(t, e, n) {
					super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
				}
				_next(t) {
					let e;
					try {
						e = this.predicate.call(this.thisArg, t, this.count++);
					} catch (n) {
						return void this.destination.error(n);
					}
					e && this.destination.next(t);
				}
			}
			const Oh = (() => {
					function t() {
						return (
							Error.call(this),
							(this.message = 'argument out of range'),
							(this.name = 'ArgumentOutOfRangeError'),
							this
						);
					}
					return (t.prototype = Object.create(Error.prototype)), t;
				})(),
				Rh = new _(t => t.complete());
			function Ph(t) {
				return t
					? (function (t) {
							return new _(e => t.schedule(() => e.complete()));
					  })(t)
					: Rh;
			}
			function Lh(t) {
				return e => (0 === t ? Ph() : e.lift(new Nh(t)));
			}
			class Nh {
				constructor(t) {
					if (((this.total = t), this.total < 0)) throw new Oh();
				}
				call(t, e) {
					return e.subscribe(new Dh(t, this.total));
				}
			}
			class Dh extends f {
				constructor(t, e) {
					super(t), (this.total = e), (this.count = 0);
				}
				_next(t) {
					const e = this.total,
						n = ++this.count;
					n <= e && (this.destination.next(t), n === e && (this.destination.complete(), this.unsubscribe()));
				}
			}
			function Mh(t) {
				return null != t && '' + t != 'false';
			}
			function Fh(t, e = 0) {
				return (function (t) {
					return !isNaN(parseFloat(t)) && !isNaN(Number(t));
				})(t)
					? Number(t)
					: e;
			}
			function jh(t) {
				return Array.isArray(t) ? t : [t];
			}
			function Bh(t) {
				return null == t ? '' : 'string' == typeof t ? t : t + 'px';
			}
			function zh(t) {
				return t instanceof nl ? t.nativeElement : t;
			}
			let Vh = (() => {
					class t {
						create(t) {
							return 'undefined' == typeof MutationObserver ? null : new MutationObserver(t);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵprov = ht({
							factory: function () {
								return new t();
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				Uh = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
							providers: [Vh],
						})),
						t
					);
				})(),
				Hh = (() => {
					class t {
						constructor(t) {
							this._platform = t;
						}
						isDisabled(t) {
							return t.hasAttribute('disabled');
						}
						isVisible(t) {
							return (
								(function (t) {
									return !!(
										t.offsetWidth ||
										t.offsetHeight ||
										('function' == typeof t.getClientRects && t.getClientRects().length)
									);
								})(t) && 'visible' === getComputedStyle(t).visibility
							);
						}
						isTabbable(t) {
							if (!this._platform.isBrowser) return !1;
							const e = (function (t) {
								try {
									return t.frameElement;
								} catch (nE) {
									return null;
								}
							})(((n = t).ownerDocument && n.ownerDocument.defaultView) || window);
							var n;
							if (e) {
								if (-1 === qh(e)) return !1;
								if (!this.isVisible(e)) return !1;
							}
							let i = t.nodeName.toLowerCase(),
								s = qh(t);
							return t.hasAttribute('contenteditable')
								? -1 !== s
								: 'iframe' !== i &&
										'object' !== i &&
										!(
											this._platform.WEBKIT &&
											this._platform.IOS &&
											!(function (t) {
												let e = t.nodeName.toLowerCase(),
													n = 'input' === e && t.type;
												return (
													'text' === n ||
													'password' === n ||
													'select' === e ||
													'textarea' === e
												);
											})(t)
										) &&
										('audio' === i
											? !!t.hasAttribute('controls') && -1 !== s
											: 'video' === i
											? -1 !== s &&
											  (null !== s || this._platform.FIREFOX || t.hasAttribute('controls'))
											: t.tabIndex >= 0);
						}
						isFocusable(t, e) {
							return (
								(function (t) {
									return (
										!(function (t) {
											return (
												(function (t) {
													return 'input' == t.nodeName.toLowerCase();
												})(t) && 'hidden' == t.type
											);
										})(t) &&
										((function (t) {
											let e = t.nodeName.toLowerCase();
											return (
												'input' === e || 'select' === e || 'button' === e || 'textarea' === e
											);
										})(t) ||
											(function (t) {
												return (
													(function (t) {
														return 'a' == t.nodeName.toLowerCase();
													})(t) && t.hasAttribute('href')
												);
											})(t) ||
											t.hasAttribute('contenteditable') ||
											$h(t))
									);
								})(t) &&
								!this.isDisabled(t) &&
								((null == e ? void 0 : e.ignoreVisibility) || this.isVisible(t))
							);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(uh));
						}),
						(t.ɵprov = ht({
							factory: function () {
								return new t(Kt(uh));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})();
			function $h(t) {
				if (!t.hasAttribute('tabindex') || void 0 === t.tabIndex) return !1;
				let e = t.getAttribute('tabindex');
				return '-32768' != e && !(!e || isNaN(parseInt(e, 10)));
			}
			function qh(t) {
				if (!$h(t)) return null;
				const e = parseInt(t.getAttribute('tabindex') || '', 10);
				return isNaN(e) ? -1 : e;
			}
			class Wh {
				constructor(t, e, n, i, s = !1) {
					(this._element = t),
						(this._checker = e),
						(this._ngZone = n),
						(this._document = i),
						(this._hasAttached = !1),
						(this.startAnchorListener = () => this.focusLastTabbableElement()),
						(this.endAnchorListener = () => this.focusFirstTabbableElement()),
						(this._enabled = !0),
						s || this.attachAnchors();
				}
				get enabled() {
					return this._enabled;
				}
				set enabled(t) {
					(this._enabled = t),
						this._startAnchor &&
							this._endAnchor &&
							(this._toggleAnchorTabIndex(t, this._startAnchor),
							this._toggleAnchorTabIndex(t, this._endAnchor));
				}
				destroy() {
					const t = this._startAnchor,
						e = this._endAnchor;
					t &&
						(t.removeEventListener('focus', this.startAnchorListener),
						t.parentNode && t.parentNode.removeChild(t)),
						e &&
							(e.removeEventListener('focus', this.endAnchorListener),
							e.parentNode && e.parentNode.removeChild(e)),
						(this._startAnchor = this._endAnchor = null),
						(this._hasAttached = !1);
				}
				attachAnchors() {
					return (
						!!this._hasAttached ||
						(this._ngZone.runOutsideAngular(() => {
							this._startAnchor ||
								((this._startAnchor = this._createAnchor()),
								this._startAnchor.addEventListener('focus', this.startAnchorListener)),
								this._endAnchor ||
									((this._endAnchor = this._createAnchor()),
									this._endAnchor.addEventListener('focus', this.endAnchorListener));
						}),
						this._element.parentNode &&
							(this._element.parentNode.insertBefore(this._startAnchor, this._element),
							this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling),
							(this._hasAttached = !0)),
						this._hasAttached)
					);
				}
				focusInitialElementWhenReady() {
					return new Promise(t => {
						this._executeOnStable(() => t(this.focusInitialElement()));
					});
				}
				focusFirstTabbableElementWhenReady() {
					return new Promise(t => {
						this._executeOnStable(() => t(this.focusFirstTabbableElement()));
					});
				}
				focusLastTabbableElementWhenReady() {
					return new Promise(t => {
						this._executeOnStable(() => t(this.focusLastTabbableElement()));
					});
				}
				_getRegionBoundary(t) {
					let e = this._element.querySelectorAll(
						`[cdk-focus-region-${t}], [cdkFocusRegion${t}], [cdk-focus-${t}]`
					);
					for (let n = 0; n < e.length; n++)
						e[n].hasAttribute('cdk-focus-' + t)
							? console.warn(
									`Found use of deprecated attribute 'cdk-focus-${t}', use 'cdkFocusRegion${t}' instead. The deprecated attribute will be removed in 8.0.0.`,
									e[n]
							  )
							: e[n].hasAttribute('cdk-focus-region-' + t) &&
							  console.warn(
									`Found use of deprecated attribute 'cdk-focus-region-${t}', use 'cdkFocusRegion${t}' instead. The deprecated attribute will be removed in 8.0.0.`,
									e[n]
							  );
					return 'start' == t
						? e.length
							? e[0]
							: this._getFirstTabbableElement(this._element)
						: e.length
						? e[e.length - 1]
						: this._getLastTabbableElement(this._element);
				}
				focusInitialElement() {
					const t = this._element.querySelector('[cdk-focus-initial], [cdkFocusInitial]');
					return t
						? (t.hasAttribute('cdk-focus-initial') &&
								console.warn(
									"Found use of deprecated attribute 'cdk-focus-initial', use 'cdkFocusInitial' instead. The deprecated attribute will be removed in 8.0.0",
									t
								),
						  t.focus(),
						  !0)
						: this.focusFirstTabbableElement();
				}
				focusFirstTabbableElement() {
					const t = this._getRegionBoundary('start');
					return t && t.focus(), !!t;
				}
				focusLastTabbableElement() {
					const t = this._getRegionBoundary('end');
					return t && t.focus(), !!t;
				}
				hasAttached() {
					return this._hasAttached;
				}
				_getFirstTabbableElement(t) {
					if (this._checker.isFocusable(t) && this._checker.isTabbable(t)) return t;
					let e = t.children || t.childNodes;
					for (let n = 0; n < e.length; n++) {
						let t =
							e[n].nodeType === this._document.ELEMENT_NODE ? this._getFirstTabbableElement(e[n]) : null;
						if (t) return t;
					}
					return null;
				}
				_getLastTabbableElement(t) {
					if (this._checker.isFocusable(t) && this._checker.isTabbable(t)) return t;
					let e = t.children || t.childNodes;
					for (let n = e.length - 1; n >= 0; n--) {
						let t =
							e[n].nodeType === this._document.ELEMENT_NODE ? this._getLastTabbableElement(e[n]) : null;
						if (t) return t;
					}
					return null;
				}
				_createAnchor() {
					const t = this._document.createElement('div');
					return (
						this._toggleAnchorTabIndex(this._enabled, t),
						t.classList.add('cdk-visually-hidden'),
						t.classList.add('cdk-focus-trap-anchor'),
						t.setAttribute('aria-hidden', 'true'),
						t
					);
				}
				_toggleAnchorTabIndex(t, e) {
					t ? e.setAttribute('tabindex', '0') : e.removeAttribute('tabindex');
				}
				toggleAnchors(t) {
					this._startAnchor &&
						this._endAnchor &&
						(this._toggleAnchorTabIndex(t, this._startAnchor),
						this._toggleAnchorTabIndex(t, this._endAnchor));
				}
				_executeOnStable(t) {
					this._ngZone.isStable ? t() : this._ngZone.onStable.pipe(Lh(1)).subscribe(t);
				}
			}
			let Qh = (() => {
				class t {
					constructor(t, e, n) {
						(this._checker = t), (this._ngZone = e), (this._document = n);
					}
					create(t, e = !1) {
						return new Wh(t, this._checker, this._ngZone, this._document, e);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(Hh), Kt(xc), Kt(Jc));
					}),
					(t.ɵprov = ht({
						factory: function () {
							return new t(Kt(Hh), Kt(xc), Kt(Jc));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			function Zh(t) {
				return 0 === t.buttons;
			}
			'undefined' != typeof Element && Element;
			const Gh = new Bt('cdk-focus-monitor-default-options'),
				Kh = dh({ passive: !0, capture: !0 });
			let Yh = (() => {
				class t {
					constructor(t, e, n, i) {
						(this._ngZone = t),
							(this._platform = e),
							(this._origin = null),
							(this._windowFocused = !1),
							(this._elementInfo = new Map()),
							(this._monitoredElementCount = 0),
							(this._rootNodeFocusListenerCount = new Map()),
							(this._documentKeydownListener = () => {
								(this._lastTouchTarget = null), this._setOriginForCurrentEventQueue('keyboard');
							}),
							(this._documentMousedownListener = t => {
								if (!this._lastTouchTarget) {
									const e = Zh(t) ? 'keyboard' : 'mouse';
									this._setOriginForCurrentEventQueue(e);
								}
							}),
							(this._documentTouchstartListener = t => {
								null != this._touchTimeoutId && clearTimeout(this._touchTimeoutId),
									(this._lastTouchTarget = Xh(t)),
									(this._touchTimeoutId = setTimeout(() => (this._lastTouchTarget = null), 650));
							}),
							(this._windowFocusListener = () => {
								(this._windowFocused = !0),
									(this._windowFocusTimeoutId = setTimeout(() => (this._windowFocused = !1)));
							}),
							(this._rootNodeFocusAndBlurListener = t => {
								const e = Xh(t),
									n = 'focus' === t.type ? this._onFocus : this._onBlur;
								for (let i = e; i; i = i.parentElement) n.call(this, t, i);
							}),
							(this._document = n),
							(this._detectionMode = (null == i ? void 0 : i.detectionMode) || 0);
					}
					monitor(t, e = !1) {
						const n = zh(t);
						if (!this._platform.isBrowser || 1 !== n.nodeType) return fh(null);
						const i =
								(function (t) {
									if (
										(function () {
											if (null == ch) {
												const t = 'undefined' != typeof document ? document.head : null;
												ch = !(!t || (!t.createShadowRoot && !t.attachShadow));
											}
											return ch;
										})()
									) {
										const e = t.getRootNode ? t.getRootNode() : null;
										if ('undefined' != typeof ShadowRoot && ShadowRoot && e instanceof ShadowRoot)
											return e;
									}
									return null;
								})(n) || this._getDocument(),
							s = this._elementInfo.get(n);
						if (s) return e && (s.checkChildren = !0), s.subject;
						const r = { checkChildren: e, subject: new S(), rootNode: i };
						return this._elementInfo.set(n, r), this._registerGlobalListeners(r), r.subject;
					}
					stopMonitoring(t) {
						const e = zh(t),
							n = this._elementInfo.get(e);
						n &&
							(n.subject.complete(),
							this._setClasses(e),
							this._elementInfo.delete(e),
							this._removeGlobalListeners(n));
					}
					focusVia(t, e, n) {
						const i = zh(t);
						this._setOriginForCurrentEventQueue(e), 'function' == typeof i.focus && i.focus(n);
					}
					ngOnDestroy() {
						this._elementInfo.forEach((t, e) => this.stopMonitoring(e));
					}
					_getDocument() {
						return this._document || document;
					}
					_getWindow() {
						return this._getDocument().defaultView || window;
					}
					_toggleClass(t, e, n) {
						n ? t.classList.add(e) : t.classList.remove(e);
					}
					_getFocusOrigin(t) {
						return this._origin
							? this._origin
							: this._windowFocused && this._lastFocusOrigin
							? this._lastFocusOrigin
							: this._wasCausedByTouch(t)
							? 'touch'
							: 'program';
					}
					_setClasses(t, e) {
						this._toggleClass(t, 'cdk-focused', !!e),
							this._toggleClass(t, 'cdk-touch-focused', 'touch' === e),
							this._toggleClass(t, 'cdk-keyboard-focused', 'keyboard' === e),
							this._toggleClass(t, 'cdk-mouse-focused', 'mouse' === e),
							this._toggleClass(t, 'cdk-program-focused', 'program' === e);
					}
					_setOriginForCurrentEventQueue(t) {
						this._ngZone.runOutsideAngular(() => {
							(this._origin = t),
								0 === this._detectionMode &&
									(this._originTimeoutId = setTimeout(() => (this._origin = null), 1));
						});
					}
					_wasCausedByTouch(t) {
						const e = Xh(t);
						return (
							this._lastTouchTarget instanceof Node &&
							e instanceof Node &&
							(e === this._lastTouchTarget || e.contains(this._lastTouchTarget))
						);
					}
					_onFocus(t, e) {
						const n = this._elementInfo.get(e);
						if (!n || (!n.checkChildren && e !== Xh(t))) return;
						const i = this._getFocusOrigin(t);
						this._setClasses(e, i), this._emitOrigin(n.subject, i), (this._lastFocusOrigin = i);
					}
					_onBlur(t, e) {
						const n = this._elementInfo.get(e);
						!n ||
							(n.checkChildren && t.relatedTarget instanceof Node && e.contains(t.relatedTarget)) ||
							(this._setClasses(e), this._emitOrigin(n.subject, null));
					}
					_emitOrigin(t, e) {
						this._ngZone.run(() => t.next(e));
					}
					_registerGlobalListeners(t) {
						if (!this._platform.isBrowser) return;
						const e = t.rootNode,
							n = this._rootNodeFocusListenerCount.get(e) || 0;
						n ||
							this._ngZone.runOutsideAngular(() => {
								e.addEventListener('focus', this._rootNodeFocusAndBlurListener, Kh),
									e.addEventListener('blur', this._rootNodeFocusAndBlurListener, Kh);
							}),
							this._rootNodeFocusListenerCount.set(e, n + 1),
							1 == ++this._monitoredElementCount &&
								this._ngZone.runOutsideAngular(() => {
									const t = this._getDocument(),
										e = this._getWindow();
									t.addEventListener('keydown', this._documentKeydownListener, Kh),
										t.addEventListener('mousedown', this._documentMousedownListener, Kh),
										t.addEventListener('touchstart', this._documentTouchstartListener, Kh),
										e.addEventListener('focus', this._windowFocusListener);
								});
					}
					_removeGlobalListeners(t) {
						const e = t.rootNode;
						if (this._rootNodeFocusListenerCount.has(e)) {
							const t = this._rootNodeFocusListenerCount.get(e);
							t > 1
								? this._rootNodeFocusListenerCount.set(e, t - 1)
								: (e.removeEventListener('focus', this._rootNodeFocusAndBlurListener, Kh),
								  e.removeEventListener('blur', this._rootNodeFocusAndBlurListener, Kh),
								  this._rootNodeFocusListenerCount.delete(e));
						}
						if (!--this._monitoredElementCount) {
							const t = this._getDocument(),
								e = this._getWindow();
							t.removeEventListener('keydown', this._documentKeydownListener, Kh),
								t.removeEventListener('mousedown', this._documentMousedownListener, Kh),
								t.removeEventListener('touchstart', this._documentTouchstartListener, Kh),
								e.removeEventListener('focus', this._windowFocusListener),
								clearTimeout(this._windowFocusTimeoutId),
								clearTimeout(this._touchTimeoutId),
								clearTimeout(this._originTimeoutId);
						}
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(xc), Kt(uh), Kt(Jc, 8), Kt(Gh, 8));
					}),
					(t.ɵprov = ht({
						factory: function () {
							return new t(Kt(xc), Kt(uh), Kt(Jc, 8), Kt(Gh, 8));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			function Xh(t) {
				return t.composedPath ? t.composedPath()[0] : t.target;
			}
			const Jh = 'cdk-high-contrast-black-on-white',
				td = 'cdk-high-contrast-white-on-black',
				ed = 'cdk-high-contrast-active';
			let nd = (() => {
					class t {
						constructor(t, e) {
							(this._platform = t), (this._document = e);
						}
						getHighContrastMode() {
							if (!this._platform.isBrowser) return 0;
							const t = this._document.createElement('div');
							(t.style.backgroundColor = 'rgb(1,2,3)'),
								(t.style.position = 'absolute'),
								this._document.body.appendChild(t);
							const e = this._document.defaultView || window,
								n = e && e.getComputedStyle ? e.getComputedStyle(t) : null,
								i = ((n && n.backgroundColor) || '').replace(/ /g, '');
							switch ((this._document.body.removeChild(t), i)) {
								case 'rgb(0,0,0)':
									return 2;
								case 'rgb(255,255,255)':
									return 1;
							}
							return 0;
						}
						_applyBodyHighContrastModeCssClasses() {
							if (this._platform.isBrowser && this._document.body) {
								const t = this._document.body.classList;
								t.remove(ed), t.remove(Jh), t.remove(td);
								const e = this.getHighContrastMode();
								1 === e ? (t.add(ed), t.add(Jh)) : 2 === e && (t.add(ed), t.add(td));
							}
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(uh), Kt(Jc));
						}),
						(t.ɵprov = ht({
							factory: function () {
								return new t(Kt(uh), Kt(Jc));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				id = (() => {
					class t {
						constructor(t) {
							t._applyBodyHighContrastModeCssClasses();
						}
					}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)(Kt(nd));
							},
							imports: [[hh, Uh]],
						})),
						t
					);
				})();
			const sd = new Bt('cdk-dir-doc', {
				providedIn: 'root',
				factory: function () {
					return Yt(Jc);
				},
			});
			let rd = (() => {
					class t {
						constructor(t) {
							if (((this.value = 'ltr'), (this.change = new Fl()), t)) {
								const e = t.documentElement ? t.documentElement.dir : null,
									n = (t.body ? t.body.dir : null) || e;
								this.value = 'ltr' === n || 'rtl' === n ? n : 'ltr';
							}
						}
						ngOnDestroy() {
							this.change.complete();
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(sd, 8));
						}),
						(t.ɵprov = ht({
							factory: function () {
								return new t(Kt(sd, 8));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				od = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
						})),
						t
					);
				})();
			const ad = new al('10.2.6');
			function ld() {
				return H(1);
			}
			function cd(...t) {
				return ld()(fh(...t));
			}
			function ud(...t) {
				const e = t[t.length - 1];
				return C(e) ? (t.pop(), n => cd(t, n, e)) : e => cd(t, e);
			}
			class hd {}
			const dd = '*';
			function pd(t, e) {
				return { type: 7, name: t, definitions: e, options: {} };
			}
			function fd(t, e = null) {
				return { type: 4, styles: e, timings: t };
			}
			function md(t, e = null) {
				return { type: 2, steps: t, options: e };
			}
			function gd(t) {
				return { type: 6, styles: t, offset: null };
			}
			function yd(t, e, n) {
				return { type: 0, name: t, styles: e, options: n };
			}
			function _d(t, e, n = null) {
				return { type: 1, expr: t, animation: e, options: n };
			}
			function vd(t) {
				Promise.resolve(null).then(t);
			}
			class bd {
				constructor(t = 0, e = 0) {
					(this._onDoneFns = []),
						(this._onStartFns = []),
						(this._onDestroyFns = []),
						(this._started = !1),
						(this._destroyed = !1),
						(this._finished = !1),
						(this.parentPlayer = null),
						(this.totalTime = t + e);
				}
				_onFinish() {
					this._finished ||
						((this._finished = !0), this._onDoneFns.forEach(t => t()), (this._onDoneFns = []));
				}
				onStart(t) {
					this._onStartFns.push(t);
				}
				onDone(t) {
					this._onDoneFns.push(t);
				}
				onDestroy(t) {
					this._onDestroyFns.push(t);
				}
				hasStarted() {
					return this._started;
				}
				init() {}
				play() {
					this.hasStarted() || (this._onStart(), this.triggerMicrotask()), (this._started = !0);
				}
				triggerMicrotask() {
					vd(() => this._onFinish());
				}
				_onStart() {
					this._onStartFns.forEach(t => t()), (this._onStartFns = []);
				}
				pause() {}
				restart() {}
				finish() {
					this._onFinish();
				}
				destroy() {
					this._destroyed ||
						((this._destroyed = !0),
						this.hasStarted() || this._onStart(),
						this.finish(),
						this._onDestroyFns.forEach(t => t()),
						(this._onDestroyFns = []));
				}
				reset() {}
				setPosition(t) {}
				getPosition() {
					return 0;
				}
				triggerCallback(t) {
					const e = 'start' == t ? this._onStartFns : this._onDoneFns;
					e.forEach(t => t()), (e.length = 0);
				}
			}
			class wd {
				constructor(t) {
					(this._onDoneFns = []),
						(this._onStartFns = []),
						(this._finished = !1),
						(this._started = !1),
						(this._destroyed = !1),
						(this._onDestroyFns = []),
						(this.parentPlayer = null),
						(this.totalTime = 0),
						(this.players = t);
					let e = 0,
						n = 0,
						i = 0;
					const s = this.players.length;
					0 == s
						? vd(() => this._onFinish())
						: this.players.forEach(t => {
								t.onDone(() => {
									++e == s && this._onFinish();
								}),
									t.onDestroy(() => {
										++n == s && this._onDestroy();
									}),
									t.onStart(() => {
										++i == s && this._onStart();
									});
						  }),
						(this.totalTime = this.players.reduce((t, e) => Math.max(t, e.totalTime), 0));
				}
				_onFinish() {
					this._finished ||
						((this._finished = !0), this._onDoneFns.forEach(t => t()), (this._onDoneFns = []));
				}
				init() {
					this.players.forEach(t => t.init());
				}
				onStart(t) {
					this._onStartFns.push(t);
				}
				_onStart() {
					this.hasStarted() ||
						((this._started = !0), this._onStartFns.forEach(t => t()), (this._onStartFns = []));
				}
				onDone(t) {
					this._onDoneFns.push(t);
				}
				onDestroy(t) {
					this._onDestroyFns.push(t);
				}
				hasStarted() {
					return this._started;
				}
				play() {
					this.parentPlayer || this.init(), this._onStart(), this.players.forEach(t => t.play());
				}
				pause() {
					this.players.forEach(t => t.pause());
				}
				restart() {
					this.players.forEach(t => t.restart());
				}
				finish() {
					this._onFinish(), this.players.forEach(t => t.finish());
				}
				destroy() {
					this._onDestroy();
				}
				_onDestroy() {
					this._destroyed ||
						((this._destroyed = !0),
						this._onFinish(),
						this.players.forEach(t => t.destroy()),
						this._onDestroyFns.forEach(t => t()),
						(this._onDestroyFns = []));
				}
				reset() {
					this.players.forEach(t => t.reset()),
						(this._destroyed = !1),
						(this._finished = !1),
						(this._started = !1);
				}
				setPosition(t) {
					const e = t * this.totalTime;
					this.players.forEach(t => {
						const n = t.totalTime ? Math.min(1, e / t.totalTime) : 1;
						t.setPosition(n);
					});
				}
				getPosition() {
					let t = 0;
					return (
						this.players.forEach(e => {
							const n = e.getPosition();
							t = Math.min(n, t);
						}),
						t
					);
				}
				beforeDestroy() {
					this.players.forEach(t => {
						t.beforeDestroy && t.beforeDestroy();
					});
				}
				triggerCallback(t) {
					const e = 'start' == t ? this._onStartFns : this._onDoneFns;
					e.forEach(t => t()), (e.length = 0);
				}
			}
			function xd() {
				return 'undefined' != typeof process && '[object process]' === {}.toString.call(process);
			}
			function Sd(t) {
				switch (t.length) {
					case 0:
						return new bd();
					case 1:
						return t[0];
					default:
						return new wd(t);
				}
			}
			function Ed(t, e, n, i, s = {}, r = {}) {
				const o = [],
					a = [];
				let l = -1,
					c = null;
				if (
					(i.forEach(t => {
						const n = t.offset,
							i = n == l,
							u = (i && c) || {};
						Object.keys(t).forEach(n => {
							let i = n,
								a = t[n];
							if ('offset' !== n)
								switch (((i = e.normalizePropertyName(i, o)), a)) {
									case '!':
										a = s[n];
										break;
									case dd:
										a = r[n];
										break;
									default:
										a = e.normalizeStyleValue(n, i, a, o);
								}
							u[i] = a;
						}),
							i || a.push(u),
							(c = u),
							(l = n);
					}),
					o.length)
				) {
					const t = '\n - ';
					throw new Error(`Unable to animate due to the following errors:${t}${o.join(t)}`);
				}
				return a;
			}
			function Cd(t, e, n, i) {
				switch (e) {
					case 'start':
						t.onStart(() => i(n && kd(n, 'start', t)));
						break;
					case 'done':
						t.onDone(() => i(n && kd(n, 'done', t)));
						break;
					case 'destroy':
						t.onDestroy(() => i(n && kd(n, 'destroy', t)));
				}
			}
			function kd(t, e, n) {
				const i = n.totalTime,
					s = Td(
						t.element,
						t.triggerName,
						t.fromState,
						t.toState,
						e || t.phaseName,
						null == i ? t.totalTime : i,
						!!n.disabled
					),
					r = t._data;
				return null != r && (s._data = r), s;
			}
			function Td(t, e, n, i, s = '', r = 0, o) {
				return {
					element: t,
					triggerName: e,
					fromState: n,
					toState: i,
					phaseName: s,
					totalTime: r,
					disabled: !!o,
				};
			}
			function Ad(t, e, n) {
				let i;
				return (
					t instanceof Map ? ((i = t.get(e)), i || t.set(e, (i = n))) : ((i = t[e]), i || (i = t[e] = n)), i
				);
			}
			function Id(t) {
				const e = t.indexOf(':');
				return [t.substring(1, e), t.substr(e + 1)];
			}
			let Od = (t, e) => !1,
				Rd = (t, e) => !1,
				Pd = (t, e, n) => [];
			const Ld = xd();
			(Ld || 'undefined' != typeof Element) &&
				((Od = (t, e) => t.contains(e)),
				(Rd = (() => {
					if (Ld || Element.prototype.matches) return (t, e) => t.matches(e);
					{
						const t = Element.prototype,
							e =
								t.matchesSelector ||
								t.mozMatchesSelector ||
								t.msMatchesSelector ||
								t.oMatchesSelector ||
								t.webkitMatchesSelector;
						return e ? (t, n) => e.apply(t, [n]) : Rd;
					}
				})()),
				(Pd = (t, e, n) => {
					let i = [];
					if (n) i.push(...t.querySelectorAll(e));
					else {
						const n = t.querySelector(e);
						n && i.push(n);
					}
					return i;
				}));
			let Nd = null,
				Dd = !1;
			function Md(t) {
				Nd ||
					((Nd = ('undefined' != typeof document ? document.body : null) || {}),
					(Dd = !!Nd.style && 'WebkitAppearance' in Nd.style));
				let e = !0;
				return (
					Nd.style &&
						!(function (t) {
							return 'ebkit' == t.substring(1, 6);
						})(t) &&
						((e = t in Nd.style), !e && Dd) &&
						(e = 'Webkit' + t.charAt(0).toUpperCase() + t.substr(1) in Nd.style),
					e
				);
			}
			const Fd = Rd,
				jd = Od,
				Bd = Pd;
			function zd(t) {
				const e = {};
				return (
					Object.keys(t).forEach(n => {
						const i = n.replace(/([a-z])([A-Z])/g, '$1-$2');
						e[i] = t[n];
					}),
					e
				);
			}
			let Vd = (() => {
					class t {
						validateStyleProperty(t) {
							return Md(t);
						}
						matchesElement(t, e) {
							return Fd(t, e);
						}
						containsElement(t, e) {
							return jd(t, e);
						}
						query(t, e, n) {
							return Bd(t, e, n);
						}
						computeStyle(t, e, n) {
							return n || '';
						}
						animate(t, e, n, i, s, r = [], o) {
							return new bd(n, i);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				Ud = (() => {
					class t {}
					return (t.NOOP = new Vd()), t;
				})();
			const Hd = 'ng-enter',
				$d = 'ng-leave',
				qd = 'ng-trigger',
				Wd = '.ng-trigger',
				Qd = 'ng-animating',
				Zd = '.ng-animating';
			function Gd(t) {
				if ('number' == typeof t) return t;
				const e = t.match(/^(-?[\.\d]+)(m?s)/);
				return !e || e.length < 2 ? 0 : Kd(parseFloat(e[1]), e[2]);
			}
			function Kd(t, e) {
				switch (e) {
					case 's':
						return 1e3 * t;
					default:
						return t;
				}
			}
			function Yd(t, e, n) {
				return t.hasOwnProperty('duration')
					? t
					: (function (t, e, n) {
							let i,
								s = 0,
								r = '';
							if ('string' == typeof t) {
								const n = t.match(
									/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
								);
								if (null === n)
									return (
										e.push(`The provided timing value "${t}" is invalid.`),
										{ duration: 0, delay: 0, easing: '' }
									);
								i = Kd(parseFloat(n[1]), n[2]);
								const o = n[3];
								null != o && (s = Kd(parseFloat(o), n[4]));
								const a = n[5];
								a && (r = a);
							} else i = t;
							if (!n) {
								let n = !1,
									r = e.length;
								i < 0 &&
									(e.push('Duration values below 0 are not allowed for this animation step.'),
									(n = !0)),
									s < 0 &&
										(e.push('Delay values below 0 are not allowed for this animation step.'),
										(n = !0)),
									n && e.splice(r, 0, `The provided timing value "${t}" is invalid.`);
							}
							return { duration: i, delay: s, easing: r };
					  })(t, e, n);
			}
			function Xd(t, e = {}) {
				return (
					Object.keys(t).forEach(n => {
						e[n] = t[n];
					}),
					e
				);
			}
			function Jd(t, e, n = {}) {
				if (e) for (let i in t) n[i] = t[i];
				else Xd(t, n);
				return n;
			}
			function tp(t, e, n) {
				return n ? e + ':' + n + ';' : '';
			}
			function ep(t) {
				let e = '';
				for (let n = 0; n < t.style.length; n++) {
					const i = t.style.item(n);
					e += tp(0, i, t.style.getPropertyValue(i));
				}
				for (const n in t.style)
					t.style.hasOwnProperty(n) &&
						!n.startsWith('_') &&
						(e += tp(0, n.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(), t.style[n]));
				t.setAttribute('style', e);
			}
			function np(t, e, n) {
				t.style &&
					(Object.keys(e).forEach(i => {
						const s = up(i);
						n && !n.hasOwnProperty(i) && (n[i] = t.style[s]), (t.style[s] = e[i]);
					}),
					xd() && ep(t));
			}
			function ip(t, e) {
				t.style &&
					(Object.keys(e).forEach(e => {
						const n = up(e);
						t.style[n] = '';
					}),
					xd() && ep(t));
			}
			function sp(t) {
				return Array.isArray(t) ? (1 == t.length ? t[0] : md(t)) : t;
			}
			const rp = new RegExp('{{\\s*(.+?)\\s*}}', 'g');
			function op(t) {
				let e = [];
				if ('string' == typeof t) {
					let n;
					for (; (n = rp.exec(t)); ) e.push(n[1]);
					rp.lastIndex = 0;
				}
				return e;
			}
			function ap(t, e, n) {
				const i = t.toString(),
					s = i.replace(rp, (t, i) => {
						let s = e[i];
						return (
							e.hasOwnProperty(i) ||
								(n.push('Please provide a value for the animation param ' + i), (s = '')),
							s.toString()
						);
					});
				return s == i ? t : s;
			}
			function lp(t) {
				const e = [];
				let n = t.next();
				for (; !n.done; ) e.push(n.value), (n = t.next());
				return e;
			}
			const cp = /-+([a-z0-9])/g;
			function up(t) {
				return t.replace(cp, (...t) => t[1].toUpperCase());
			}
			function hp(t, e) {
				return 0 === t || 0 === e;
			}
			function dp(t, e, n) {
				const i = Object.keys(n);
				if (i.length && e.length) {
					let r = e[0],
						o = [];
					if (
						(i.forEach(t => {
							r.hasOwnProperty(t) || o.push(t), (r[t] = n[t]);
						}),
						o.length)
					)
						for (var s = 1; s < e.length; s++) {
							let n = e[s];
							o.forEach(function (e) {
								n[e] = fp(t, e);
							});
						}
				}
				return e;
			}
			function pp(t, e, n) {
				switch (e.type) {
					case 7:
						return t.visitTrigger(e, n);
					case 0:
						return t.visitState(e, n);
					case 1:
						return t.visitTransition(e, n);
					case 2:
						return t.visitSequence(e, n);
					case 3:
						return t.visitGroup(e, n);
					case 4:
						return t.visitAnimate(e, n);
					case 5:
						return t.visitKeyframes(e, n);
					case 6:
						return t.visitStyle(e, n);
					case 8:
						return t.visitReference(e, n);
					case 9:
						return t.visitAnimateChild(e, n);
					case 10:
						return t.visitAnimateRef(e, n);
					case 11:
						return t.visitQuery(e, n);
					case 12:
						return t.visitStagger(e, n);
					default:
						throw new Error('Unable to resolve animation metadata node #' + e.type);
				}
			}
			function fp(t, e) {
				return window.getComputedStyle(t)[e];
			}
			const mp = '*';
			function gp(t, e) {
				const n = [];
				return (
					'string' == typeof t
						? t.split(/\s*,\s*/).forEach(t =>
								(function (t, e, n) {
									if (':' == t[0]) {
										const i = (function (t, e) {
											switch (t) {
												case ':enter':
													return 'void => *';
												case ':leave':
													return '* => void';
												case ':increment':
													return (t, e) => parseFloat(e) > parseFloat(t);
												case ':decrement':
													return (t, e) => parseFloat(e) < parseFloat(t);
												default:
													return (
														e.push(`The transition alias value "${t}" is not supported`),
														'* => *'
													);
											}
										})(t, n);
										if ('function' == typeof i) return void e.push(i);
										t = i;
									}
									const i = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
									if (null == i || i.length < 4)
										return n.push(`The provided transition expression "${t}" is not supported`), e;
									const s = i[1],
										r = i[2],
										o = i[3];
									e.push(vp(s, o)), '<' != r[0] || (s == mp && o == mp) || e.push(vp(o, s));
								})(t, n, e)
						  )
						: n.push(t),
					n
				);
			}
			const yp = new Set(['true', '1']),
				_p = new Set(['false', '0']);
			function vp(t, e) {
				const n = yp.has(t) || _p.has(t),
					i = yp.has(e) || _p.has(e);
				return (s, r) => {
					let o = t == mp || t == s,
						a = e == mp || e == r;
					return (
						!o && n && 'boolean' == typeof s && (o = s ? yp.has(t) : _p.has(t)),
						!a && i && 'boolean' == typeof r && (a = r ? yp.has(e) : _p.has(e)),
						o && a
					);
				};
			}
			const bp = new RegExp('s*:selfs*,?', 'g');
			function wp(t, e, n) {
				return new xp(t).build(e, n);
			}
			class xp {
				constructor(t) {
					this._driver = t;
				}
				build(t, e) {
					const n = new Sp(e);
					return this._resetContextStyleTimingState(n), pp(this, sp(t), n);
				}
				_resetContextStyleTimingState(t) {
					(t.currentQuerySelector = ''),
						(t.collectedStyles = {}),
						(t.collectedStyles[''] = {}),
						(t.currentTime = 0);
				}
				visitTrigger(t, e) {
					let n = (e.queryCount = 0),
						i = (e.depCount = 0);
					const s = [],
						r = [];
					return (
						'@' == t.name.charAt(0) &&
							e.errors.push(
								"animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"
							),
						t.definitions.forEach(t => {
							if ((this._resetContextStyleTimingState(e), 0 == t.type)) {
								const n = t,
									i = n.name;
								i
									.toString()
									.split(/\s*,\s*/)
									.forEach(t => {
										(n.name = t), s.push(this.visitState(n, e));
									}),
									(n.name = i);
							} else if (1 == t.type) {
								const s = this.visitTransition(t, e);
								(n += s.queryCount), (i += s.depCount), r.push(s);
							} else
								e.errors.push(
									'only state() and transition() definitions can sit inside of a trigger()'
								);
						}),
						{ type: 7, name: t.name, states: s, transitions: r, queryCount: n, depCount: i, options: null }
					);
				}
				visitState(t, e) {
					const n = this.visitStyle(t.styles, e),
						i = (t.options && t.options.params) || null;
					if (n.containsDynamicStyles) {
						const s = new Set(),
							r = i || {};
						if (
							(n.styles.forEach(t => {
								if (Ep(t)) {
									const e = t;
									Object.keys(e).forEach(t => {
										op(e[t]).forEach(t => {
											r.hasOwnProperty(t) || s.add(t);
										});
									});
								}
							}),
							s.size)
						) {
							const n = lp(s.values());
							e.errors.push(
								`state("${
									t.name
								}", ...) must define default values for all the following style substitutions: ${n.join(
									', '
								)}`
							);
						}
					}
					return { type: 0, name: t.name, style: n, options: i ? { params: i } : null };
				}
				visitTransition(t, e) {
					(e.queryCount = 0), (e.depCount = 0);
					const n = pp(this, sp(t.animation), e);
					return {
						type: 1,
						matchers: gp(t.expr, e.errors),
						animation: n,
						queryCount: e.queryCount,
						depCount: e.depCount,
						options: Cp(t.options),
					};
				}
				visitSequence(t, e) {
					return { type: 2, steps: t.steps.map(t => pp(this, t, e)), options: Cp(t.options) };
				}
				visitGroup(t, e) {
					const n = e.currentTime;
					let i = 0;
					const s = t.steps.map(t => {
						e.currentTime = n;
						const s = pp(this, t, e);
						return (i = Math.max(i, e.currentTime)), s;
					});
					return (e.currentTime = i), { type: 3, steps: s, options: Cp(t.options) };
				}
				visitAnimate(t, e) {
					const n = (function (t, e) {
						let n = null;
						if (t.hasOwnProperty('duration')) n = t;
						else if ('number' == typeof t) return kp(Yd(t, e).duration, 0, '');
						const i = t;
						if (i.split(/\s+/).some(t => '{' == t.charAt(0) && '{' == t.charAt(1))) {
							const t = kp(0, 0, '');
							return (t.dynamic = !0), (t.strValue = i), t;
						}
						return (n = n || Yd(i, e)), kp(n.duration, n.delay, n.easing);
					})(t.timings, e.errors);
					let i;
					e.currentAnimateTimings = n;
					let s = t.styles ? t.styles : gd({});
					if (5 == s.type) i = this.visitKeyframes(s, e);
					else {
						let s = t.styles,
							r = !1;
						if (!s) {
							r = !0;
							const t = {};
							n.easing && (t.easing = n.easing), (s = gd(t));
						}
						e.currentTime += n.duration + n.delay;
						const o = this.visitStyle(s, e);
						(o.isEmptyStep = r), (i = o);
					}
					return (e.currentAnimateTimings = null), { type: 4, timings: n, style: i, options: null };
				}
				visitStyle(t, e) {
					const n = this._makeStyleAst(t, e);
					return this._validateStyleAst(n, e), n;
				}
				_makeStyleAst(t, e) {
					const n = [];
					Array.isArray(t.styles)
						? t.styles.forEach(t => {
								'string' == typeof t
									? t == dd
										? n.push(t)
										: e.errors.push(`The provided style string value ${t} is not allowed.`)
									: n.push(t);
						  })
						: n.push(t.styles);
					let i = !1,
						s = null;
					return (
						n.forEach(t => {
							if (Ep(t)) {
								const e = t,
									n = e.easing;
								if ((n && ((s = n), delete e.easing), !i))
									for (let t in e)
										if (e[t].toString().indexOf('{{') >= 0) {
											i = !0;
											break;
										}
							}
						}),
						{ type: 6, styles: n, easing: s, offset: t.offset, containsDynamicStyles: i, options: null }
					);
				}
				_validateStyleAst(t, e) {
					const n = e.currentAnimateTimings;
					let i = e.currentTime,
						s = e.currentTime;
					n && s > 0 && (s -= n.duration + n.delay),
						t.styles.forEach(t => {
							'string' != typeof t &&
								Object.keys(t).forEach(n => {
									if (!this._driver.validateStyleProperty(n))
										return void e.errors.push(
											`The provided animation property "${n}" is not a supported CSS property for animations`
										);
									const r = e.collectedStyles[e.currentQuerySelector],
										o = r[n];
									let a = !0;
									o &&
										(s != i &&
											s >= o.startTime &&
											i <= o.endTime &&
											(e.errors.push(
												`The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${s}ms" and "${i}ms"`
											),
											(a = !1)),
										(s = o.startTime)),
										a && (r[n] = { startTime: s, endTime: i }),
										e.options &&
											(function (t, e, n) {
												const i = e.params || {},
													s = op(t);
												s.length &&
													s.forEach(t => {
														i.hasOwnProperty(t) ||
															n.push(
																`Unable to resolve the local animation param ${t} in the given list of values`
															);
													});
											})(t[n], e.options, e.errors);
								});
						});
				}
				visitKeyframes(t, e) {
					const n = { type: 5, styles: [], options: null };
					if (!e.currentAnimateTimings)
						return e.errors.push('keyframes() must be placed inside of a call to animate()'), n;
					let i = 0;
					const s = [];
					let r = !1,
						o = !1,
						a = 0;
					const l = t.steps.map(t => {
						const n = this._makeStyleAst(t, e);
						let l =
								null != n.offset
									? n.offset
									: (function (t) {
											if ('string' == typeof t) return null;
											let e = null;
											if (Array.isArray(t))
												t.forEach(t => {
													if (Ep(t) && t.hasOwnProperty('offset')) {
														const n = t;
														(e = parseFloat(n.offset)), delete n.offset;
													}
												});
											else if (Ep(t) && t.hasOwnProperty('offset')) {
												const n = t;
												(e = parseFloat(n.offset)), delete n.offset;
											}
											return e;
									  })(n.styles),
							c = 0;
						return (
							null != l && (i++, (c = n.offset = l)),
							(o = o || c < 0 || c > 1),
							(r = r || c < a),
							(a = c),
							s.push(c),
							n
						);
					});
					o && e.errors.push('Please ensure that all keyframe offsets are between 0 and 1'),
						r && e.errors.push('Please ensure that all keyframe offsets are in order');
					const c = t.steps.length;
					let u = 0;
					i > 0 && i < c
						? e.errors.push('Not all style() steps within the declared keyframes() contain offsets')
						: 0 == i && (u = 1 / (c - 1));
					const h = c - 1,
						d = e.currentTime,
						p = e.currentAnimateTimings,
						f = p.duration;
					return (
						l.forEach((t, i) => {
							const r = u > 0 ? (i == h ? 1 : u * i) : s[i],
								o = r * f;
							(e.currentTime = d + p.delay + o),
								(p.duration = o),
								this._validateStyleAst(t, e),
								(t.offset = r),
								n.styles.push(t);
						}),
						n
					);
				}
				visitReference(t, e) {
					return { type: 8, animation: pp(this, sp(t.animation), e), options: Cp(t.options) };
				}
				visitAnimateChild(t, e) {
					return e.depCount++, { type: 9, options: Cp(t.options) };
				}
				visitAnimateRef(t, e) {
					return { type: 10, animation: this.visitReference(t.animation, e), options: Cp(t.options) };
				}
				visitQuery(t, e) {
					const n = e.currentQuerySelector,
						i = t.options || {};
					e.queryCount++, (e.currentQuery = t);
					const [s, r] = (function (t) {
						const e = !!t.split(/\s*,\s*/).find(t => ':self' == t);
						return (
							e && (t = t.replace(bp, '')),
							[
								(t = t
									.replace(/@\*/g, Wd)
									.replace(/@\w+/g, t => '.ng-trigger-' + t.substr(1))
									.replace(/:animating/g, Zd)),
								e,
							]
						);
					})(t.selector);
					(e.currentQuerySelector = n.length ? n + ' ' + s : s),
						Ad(e.collectedStyles, e.currentQuerySelector, {});
					const o = pp(this, sp(t.animation), e);
					return (
						(e.currentQuery = null),
						(e.currentQuerySelector = n),
						{
							type: 11,
							selector: s,
							limit: i.limit || 0,
							optional: !!i.optional,
							includeSelf: r,
							animation: o,
							originalSelector: t.selector,
							options: Cp(t.options),
						}
					);
				}
				visitStagger(t, e) {
					e.currentQuery || e.errors.push('stagger() can only be used inside of query()');
					const n =
						'full' === t.timings ? { duration: 0, delay: 0, easing: 'full' } : Yd(t.timings, e.errors, !0);
					return { type: 12, animation: pp(this, sp(t.animation), e), timings: n, options: null };
				}
			}
			class Sp {
				constructor(t) {
					(this.errors = t),
						(this.queryCount = 0),
						(this.depCount = 0),
						(this.currentTransition = null),
						(this.currentQuery = null),
						(this.currentQuerySelector = null),
						(this.currentAnimateTimings = null),
						(this.currentTime = 0),
						(this.collectedStyles = {}),
						(this.options = null);
				}
			}
			function Ep(t) {
				return !Array.isArray(t) && 'object' == typeof t;
			}
			function Cp(t) {
				var e;
				return t ? (t = Xd(t)).params && (t.params = (e = t.params) ? Xd(e) : null) : (t = {}), t;
			}
			function kp(t, e, n) {
				return { duration: t, delay: e, easing: n };
			}
			function Tp(t, e, n, i, s, r, o = null, a = !1) {
				return {
					type: 1,
					element: t,
					keyframes: e,
					preStyleProps: n,
					postStyleProps: i,
					duration: s,
					delay: r,
					totalTime: s + r,
					easing: o,
					subTimeline: a,
				};
			}
			class Ap {
				constructor() {
					this._map = new Map();
				}
				consume(t) {
					let e = this._map.get(t);
					return e ? this._map.delete(t) : (e = []), e;
				}
				append(t, e) {
					let n = this._map.get(t);
					n || this._map.set(t, (n = [])), n.push(...e);
				}
				has(t) {
					return this._map.has(t);
				}
				clear() {
					this._map.clear();
				}
			}
			const Ip = new RegExp(':enter', 'g'),
				Op = new RegExp(':leave', 'g');
			function Rp(t, e, n, i, s, r = {}, o = {}, a, l, c = []) {
				return new Pp().buildKeyframes(t, e, n, i, s, r, o, a, l, c);
			}
			class Pp {
				buildKeyframes(t, e, n, i, s, r, o, a, l, c = []) {
					l = l || new Ap();
					const u = new Np(t, e, l, i, s, c, []);
					(u.options = a), u.currentTimeline.setStyles([r], null, u.errors, a), pp(this, n, u);
					const h = u.timelines.filter(t => t.containsAnimation());
					if (h.length && Object.keys(o).length) {
						const t = h[h.length - 1];
						t.allowOnlyTimelineStyles() || t.setStyles([o], null, u.errors, a);
					}
					return h.length ? h.map(t => t.buildKeyframes()) : [Tp(e, [], [], [], 0, 0, '', !1)];
				}
				visitTrigger(t, e) {}
				visitState(t, e) {}
				visitTransition(t, e) {}
				visitAnimateChild(t, e) {
					const n = e.subInstructions.consume(e.element);
					if (n) {
						const i = e.createSubContext(t.options),
							s = e.currentTimeline.currentTime,
							r = this._visitSubInstructions(n, i, i.options);
						s != r && e.transformIntoNewTimeline(r);
					}
					e.previousNode = t;
				}
				visitAnimateRef(t, e) {
					const n = e.createSubContext(t.options);
					n.transformIntoNewTimeline(),
						this.visitReference(t.animation, n),
						e.transformIntoNewTimeline(n.currentTimeline.currentTime),
						(e.previousNode = t);
				}
				_visitSubInstructions(t, e, n) {
					let i = e.currentTimeline.currentTime;
					const s = null != n.duration ? Gd(n.duration) : null,
						r = null != n.delay ? Gd(n.delay) : null;
					return (
						0 !== s &&
							t.forEach(t => {
								const n = e.appendInstructionToTimeline(t, s, r);
								i = Math.max(i, n.duration + n.delay);
							}),
						i
					);
				}
				visitReference(t, e) {
					e.updateOptions(t.options, !0), pp(this, t.animation, e), (e.previousNode = t);
				}
				visitSequence(t, e) {
					const n = e.subContextCount;
					let i = e;
					const s = t.options;
					if (
						s &&
						(s.params || s.delay) &&
						((i = e.createSubContext(s)), i.transformIntoNewTimeline(), null != s.delay)
					) {
						6 == i.previousNode.type && (i.currentTimeline.snapshotCurrentStyles(), (i.previousNode = Lp));
						const t = Gd(s.delay);
						i.delayNextStep(t);
					}
					t.steps.length &&
						(t.steps.forEach(t => pp(this, t, i)),
						i.currentTimeline.applyStylesToKeyframe(),
						i.subContextCount > n && i.transformIntoNewTimeline()),
						(e.previousNode = t);
				}
				visitGroup(t, e) {
					const n = [];
					let i = e.currentTimeline.currentTime;
					const s = t.options && t.options.delay ? Gd(t.options.delay) : 0;
					t.steps.forEach(r => {
						const o = e.createSubContext(t.options);
						s && o.delayNextStep(s),
							pp(this, r, o),
							(i = Math.max(i, o.currentTimeline.currentTime)),
							n.push(o.currentTimeline);
					}),
						n.forEach(t => e.currentTimeline.mergeTimelineCollectedStyles(t)),
						e.transformIntoNewTimeline(i),
						(e.previousNode = t);
				}
				_visitTiming(t, e) {
					if (t.dynamic) {
						const n = t.strValue;
						return Yd(e.params ? ap(n, e.params, e.errors) : n, e.errors);
					}
					return { duration: t.duration, delay: t.delay, easing: t.easing };
				}
				visitAnimate(t, e) {
					const n = (e.currentAnimateTimings = this._visitTiming(t.timings, e)),
						i = e.currentTimeline;
					n.delay && (e.incrementTime(n.delay), i.snapshotCurrentStyles());
					const s = t.style;
					5 == s.type
						? this.visitKeyframes(s, e)
						: (e.incrementTime(n.duration), this.visitStyle(s, e), i.applyStylesToKeyframe()),
						(e.currentAnimateTimings = null),
						(e.previousNode = t);
				}
				visitStyle(t, e) {
					const n = e.currentTimeline,
						i = e.currentAnimateTimings;
					!i && n.getCurrentStyleProperties().length && n.forwardFrame();
					const s = (i && i.easing) || t.easing;
					t.isEmptyStep ? n.applyEmptyStep(s) : n.setStyles(t.styles, s, e.errors, e.options),
						(e.previousNode = t);
				}
				visitKeyframes(t, e) {
					const n = e.currentAnimateTimings,
						i = e.currentTimeline.duration,
						s = n.duration,
						r = e.createSubContext().currentTimeline;
					(r.easing = n.easing),
						t.styles.forEach(t => {
							r.forwardTime((t.offset || 0) * s),
								r.setStyles(t.styles, t.easing, e.errors, e.options),
								r.applyStylesToKeyframe();
						}),
						e.currentTimeline.mergeTimelineCollectedStyles(r),
						e.transformIntoNewTimeline(i + s),
						(e.previousNode = t);
				}
				visitQuery(t, e) {
					const n = e.currentTimeline.currentTime,
						i = t.options || {},
						s = i.delay ? Gd(i.delay) : 0;
					s &&
						(6 === e.previousNode.type ||
							(0 == n && e.currentTimeline.getCurrentStyleProperties().length)) &&
						(e.currentTimeline.snapshotCurrentStyles(), (e.previousNode = Lp));
					let r = n;
					const o = e.invokeQuery(
						t.selector,
						t.originalSelector,
						t.limit,
						t.includeSelf,
						!!i.optional,
						e.errors
					);
					e.currentQueryTotal = o.length;
					let a = null;
					o.forEach((n, i) => {
						e.currentQueryIndex = i;
						const o = e.createSubContext(t.options, n);
						s && o.delayNextStep(s),
							n === e.element && (a = o.currentTimeline),
							pp(this, t.animation, o),
							o.currentTimeline.applyStylesToKeyframe(),
							(r = Math.max(r, o.currentTimeline.currentTime));
					}),
						(e.currentQueryIndex = 0),
						(e.currentQueryTotal = 0),
						e.transformIntoNewTimeline(r),
						a &&
							(e.currentTimeline.mergeTimelineCollectedStyles(a),
							e.currentTimeline.snapshotCurrentStyles()),
						(e.previousNode = t);
				}
				visitStagger(t, e) {
					const n = e.parentContext,
						i = e.currentTimeline,
						s = t.timings,
						r = Math.abs(s.duration),
						o = r * (e.currentQueryTotal - 1);
					let a = r * e.currentQueryIndex;
					switch (s.duration < 0 ? 'reverse' : s.easing) {
						case 'reverse':
							a = o - a;
							break;
						case 'full':
							a = n.currentStaggerTime;
					}
					const l = e.currentTimeline;
					a && l.delayNextStep(a);
					const c = l.currentTime;
					pp(this, t.animation, e),
						(e.previousNode = t),
						(n.currentStaggerTime = i.currentTime - c + (i.startTime - n.currentTimeline.startTime));
				}
			}
			const Lp = {};
			class Np {
				constructor(t, e, n, i, s, r, o, a) {
					(this._driver = t),
						(this.element = e),
						(this.subInstructions = n),
						(this._enterClassName = i),
						(this._leaveClassName = s),
						(this.errors = r),
						(this.timelines = o),
						(this.parentContext = null),
						(this.currentAnimateTimings = null),
						(this.previousNode = Lp),
						(this.subContextCount = 0),
						(this.options = {}),
						(this.currentQueryIndex = 0),
						(this.currentQueryTotal = 0),
						(this.currentStaggerTime = 0),
						(this.currentTimeline = a || new Dp(this._driver, e, 0)),
						o.push(this.currentTimeline);
				}
				get params() {
					return this.options.params;
				}
				updateOptions(t, e) {
					if (!t) return;
					const n = t;
					let i = this.options;
					null != n.duration && (i.duration = Gd(n.duration)), null != n.delay && (i.delay = Gd(n.delay));
					const s = n.params;
					if (s) {
						let t = i.params;
						t || (t = this.options.params = {}),
							Object.keys(s).forEach(n => {
								(e && t.hasOwnProperty(n)) || (t[n] = ap(s[n], t, this.errors));
							});
					}
				}
				_copyOptions() {
					const t = {};
					if (this.options) {
						const e = this.options.params;
						if (e) {
							const n = (t.params = {});
							Object.keys(e).forEach(t => {
								n[t] = e[t];
							});
						}
					}
					return t;
				}
				createSubContext(t = null, e, n) {
					const i = e || this.element,
						s = new Np(
							this._driver,
							i,
							this.subInstructions,
							this._enterClassName,
							this._leaveClassName,
							this.errors,
							this.timelines,
							this.currentTimeline.fork(i, n || 0)
						);
					return (
						(s.previousNode = this.previousNode),
						(s.currentAnimateTimings = this.currentAnimateTimings),
						(s.options = this._copyOptions()),
						s.updateOptions(t),
						(s.currentQueryIndex = this.currentQueryIndex),
						(s.currentQueryTotal = this.currentQueryTotal),
						(s.parentContext = this),
						this.subContextCount++,
						s
					);
				}
				transformIntoNewTimeline(t) {
					return (
						(this.previousNode = Lp),
						(this.currentTimeline = this.currentTimeline.fork(this.element, t)),
						this.timelines.push(this.currentTimeline),
						this.currentTimeline
					);
				}
				appendInstructionToTimeline(t, e, n) {
					const i = {
							duration: null != e ? e : t.duration,
							delay: this.currentTimeline.currentTime + (null != n ? n : 0) + t.delay,
							easing: '',
						},
						s = new Mp(
							this._driver,
							t.element,
							t.keyframes,
							t.preStyleProps,
							t.postStyleProps,
							i,
							t.stretchStartingKeyframe
						);
					return this.timelines.push(s), i;
				}
				incrementTime(t) {
					this.currentTimeline.forwardTime(this.currentTimeline.duration + t);
				}
				delayNextStep(t) {
					t > 0 && this.currentTimeline.delayNextStep(t);
				}
				invokeQuery(t, e, n, i, s, r) {
					let o = [];
					if ((i && o.push(this.element), t.length > 0)) {
						t = (t = t.replace(Ip, '.' + this._enterClassName)).replace(Op, '.' + this._leaveClassName);
						let e = this._driver.query(this.element, t, 1 != n);
						0 !== n && (e = n < 0 ? e.slice(e.length + n, e.length) : e.slice(0, n)), o.push(...e);
					}
					return (
						s ||
							0 != o.length ||
							r.push(
								`\`query("${e}")\` returned zero elements. (Use \`query("${e}", { optional: true })\` if you wish to allow this.)`
							),
						o
					);
				}
			}
			class Dp {
				constructor(t, e, n, i) {
					(this._driver = t),
						(this.element = e),
						(this.startTime = n),
						(this._elementTimelineStylesLookup = i),
						(this.duration = 0),
						(this._previousKeyframe = {}),
						(this._currentKeyframe = {}),
						(this._keyframes = new Map()),
						(this._styleSummary = {}),
						(this._pendingStyles = {}),
						(this._backFill = {}),
						(this._currentEmptyStepKeyframe = null),
						this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map()),
						(this._localTimelineStyles = Object.create(this._backFill, {})),
						(this._globalTimelineStyles = this._elementTimelineStylesLookup.get(e)),
						this._globalTimelineStyles ||
							((this._globalTimelineStyles = this._localTimelineStyles),
							this._elementTimelineStylesLookup.set(e, this._localTimelineStyles)),
						this._loadKeyframe();
				}
				containsAnimation() {
					switch (this._keyframes.size) {
						case 0:
							return !1;
						case 1:
							return this.getCurrentStyleProperties().length > 0;
						default:
							return !0;
					}
				}
				getCurrentStyleProperties() {
					return Object.keys(this._currentKeyframe);
				}
				get currentTime() {
					return this.startTime + this.duration;
				}
				delayNextStep(t) {
					const e = 1 == this._keyframes.size && Object.keys(this._pendingStyles).length;
					this.duration || e
						? (this.forwardTime(this.currentTime + t), e && this.snapshotCurrentStyles())
						: (this.startTime += t);
				}
				fork(t, e) {
					return (
						this.applyStylesToKeyframe(),
						new Dp(this._driver, t, e || this.currentTime, this._elementTimelineStylesLookup)
					);
				}
				_loadKeyframe() {
					this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe),
						(this._currentKeyframe = this._keyframes.get(this.duration)),
						this._currentKeyframe ||
							((this._currentKeyframe = Object.create(this._backFill, {})),
							this._keyframes.set(this.duration, this._currentKeyframe));
				}
				forwardFrame() {
					(this.duration += 1), this._loadKeyframe();
				}
				forwardTime(t) {
					this.applyStylesToKeyframe(), (this.duration = t), this._loadKeyframe();
				}
				_updateStyle(t, e) {
					(this._localTimelineStyles[t] = e),
						(this._globalTimelineStyles[t] = e),
						(this._styleSummary[t] = { time: this.currentTime, value: e });
				}
				allowOnlyTimelineStyles() {
					return this._currentEmptyStepKeyframe !== this._currentKeyframe;
				}
				applyEmptyStep(t) {
					t && (this._previousKeyframe.easing = t),
						Object.keys(this._globalTimelineStyles).forEach(t => {
							(this._backFill[t] = this._globalTimelineStyles[t] || dd), (this._currentKeyframe[t] = dd);
						}),
						(this._currentEmptyStepKeyframe = this._currentKeyframe);
				}
				setStyles(t, e, n, i) {
					e && (this._previousKeyframe.easing = e);
					const s = (i && i.params) || {},
						r = (function (t, e) {
							const n = {};
							let i;
							return (
								t.forEach(t => {
									'*' === t
										? ((i = i || Object.keys(e)),
										  i.forEach(t => {
												n[t] = dd;
										  }))
										: Jd(t, !1, n);
								}),
								n
							);
						})(t, this._globalTimelineStyles);
					Object.keys(r).forEach(t => {
						const e = ap(r[t], s, n);
						(this._pendingStyles[t] = e),
							this._localTimelineStyles.hasOwnProperty(t) ||
								(this._backFill[t] = this._globalTimelineStyles.hasOwnProperty(t)
									? this._globalTimelineStyles[t]
									: dd),
							this._updateStyle(t, e);
					});
				}
				applyStylesToKeyframe() {
					const t = this._pendingStyles,
						e = Object.keys(t);
					0 != e.length &&
						((this._pendingStyles = {}),
						e.forEach(e => {
							this._currentKeyframe[e] = t[e];
						}),
						Object.keys(this._localTimelineStyles).forEach(t => {
							this._currentKeyframe.hasOwnProperty(t) ||
								(this._currentKeyframe[t] = this._localTimelineStyles[t]);
						}));
				}
				snapshotCurrentStyles() {
					Object.keys(this._localTimelineStyles).forEach(t => {
						const e = this._localTimelineStyles[t];
						(this._pendingStyles[t] = e), this._updateStyle(t, e);
					});
				}
				getFinalKeyframe() {
					return this._keyframes.get(this.duration);
				}
				get properties() {
					const t = [];
					for (let e in this._currentKeyframe) t.push(e);
					return t;
				}
				mergeTimelineCollectedStyles(t) {
					Object.keys(t._styleSummary).forEach(e => {
						const n = this._styleSummary[e],
							i = t._styleSummary[e];
						(!n || i.time > n.time) && this._updateStyle(e, i.value);
					});
				}
				buildKeyframes() {
					this.applyStylesToKeyframe();
					const t = new Set(),
						e = new Set(),
						n = 1 === this._keyframes.size && 0 === this.duration;
					let i = [];
					this._keyframes.forEach((s, r) => {
						const o = Jd(s, !0);
						Object.keys(o).forEach(n => {
							const i = o[n];
							'!' == i ? t.add(n) : i == dd && e.add(n);
						}),
							n || (o.offset = r / this.duration),
							i.push(o);
					});
					const s = t.size ? lp(t.values()) : [],
						r = e.size ? lp(e.values()) : [];
					if (n) {
						const t = i[0],
							e = Xd(t);
						(t.offset = 0), (e.offset = 1), (i = [t, e]);
					}
					return Tp(this.element, i, s, r, this.duration, this.startTime, this.easing, !1);
				}
			}
			class Mp extends Dp {
				constructor(t, e, n, i, s, r, o = !1) {
					super(t, e, r.delay),
						(this.element = e),
						(this.keyframes = n),
						(this.preStyleProps = i),
						(this.postStyleProps = s),
						(this._stretchStartingKeyframe = o),
						(this.timings = { duration: r.duration, delay: r.delay, easing: r.easing });
				}
				containsAnimation() {
					return this.keyframes.length > 1;
				}
				buildKeyframes() {
					let t = this.keyframes,
						{ delay: e, duration: n, easing: i } = this.timings;
					if (this._stretchStartingKeyframe && e) {
						const s = [],
							r = n + e,
							o = e / r,
							a = Jd(t[0], !1);
						(a.offset = 0), s.push(a);
						const l = Jd(t[0], !1);
						(l.offset = Fp(o)), s.push(l);
						const c = t.length - 1;
						for (let i = 1; i <= c; i++) {
							let o = Jd(t[i], !1);
							(o.offset = Fp((e + o.offset * n) / r)), s.push(o);
						}
						(n = r), (e = 0), (i = ''), (t = s);
					}
					return Tp(this.element, t, this.preStyleProps, this.postStyleProps, n, e, i, !0);
				}
			}
			function Fp(t, e = 3) {
				const n = Math.pow(10, e - 1);
				return Math.round(t * n) / n;
			}
			class jp {}
			class Bp extends jp {
				normalizePropertyName(t, e) {
					return up(t);
				}
				normalizeStyleValue(t, e, n, i) {
					let s = '';
					const r = n.toString().trim();
					if (zp[e] && 0 !== n && '0' !== n)
						if ('number' == typeof n) s = 'px';
						else {
							const e = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
							e && 0 == e[1].length && i.push(`Please provide a CSS unit value for ${t}:${n}`);
						}
					return r + s;
				}
			}
			const zp = (() =>
				(function (t) {
					const e = {};
					return t.forEach(t => (e[t] = !0)), e;
				})(
					'width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective'.split(
						','
					)
				))();
			function Vp(t, e, n, i, s, r, o, a, l, c, u, h, d) {
				return {
					type: 0,
					element: t,
					triggerName: e,
					isRemovalTransition: s,
					fromState: n,
					fromStyles: r,
					toState: i,
					toStyles: o,
					timelines: a,
					queriedElements: l,
					preStyleProps: c,
					postStyleProps: u,
					totalTime: h,
					errors: d,
				};
			}
			const Up = {};
			class Hp {
				constructor(t, e, n) {
					(this._triggerName = t), (this.ast = e), (this._stateStyles = n);
				}
				match(t, e, n, i) {
					return (function (t, e, n, i, s) {
						return t.some(t => t(e, n, i, s));
					})(this.ast.matchers, t, e, n, i);
				}
				buildStyles(t, e, n) {
					const i = this._stateStyles['*'],
						s = this._stateStyles[t],
						r = i ? i.buildStyles(e, n) : {};
					return s ? s.buildStyles(e, n) : r;
				}
				build(t, e, n, i, s, r, o, a, l, c) {
					const u = [],
						h = (this.ast.options && this.ast.options.params) || Up,
						d = this.buildStyles(n, (o && o.params) || Up, u),
						p = (a && a.params) || Up,
						f = this.buildStyles(i, p, u),
						m = new Set(),
						g = new Map(),
						y = new Map(),
						_ = 'void' === i,
						v = { params: Object.assign(Object.assign({}, h), p) },
						b = c ? [] : Rp(t, e, this.ast.animation, s, r, d, f, v, l, u);
					let w = 0;
					if (
						(b.forEach(t => {
							w = Math.max(t.duration + t.delay, w);
						}),
						u.length)
					)
						return Vp(e, this._triggerName, n, i, _, d, f, [], [], g, y, w, u);
					b.forEach(t => {
						const n = t.element,
							i = Ad(g, n, {});
						t.preStyleProps.forEach(t => (i[t] = !0));
						const s = Ad(y, n, {});
						t.postStyleProps.forEach(t => (s[t] = !0)), n !== e && m.add(n);
					});
					const x = lp(m.values());
					return Vp(e, this._triggerName, n, i, _, d, f, b, x, g, y, w);
				}
			}
			class $p {
				constructor(t, e) {
					(this.styles = t), (this.defaultParams = e);
				}
				buildStyles(t, e) {
					const n = {},
						i = Xd(this.defaultParams);
					return (
						Object.keys(t).forEach(e => {
							const n = t[e];
							null != n && (i[e] = n);
						}),
						this.styles.styles.forEach(t => {
							if ('string' != typeof t) {
								const s = t;
								Object.keys(s).forEach(t => {
									let r = s[t];
									r.length > 1 && (r = ap(r, i, e)), (n[t] = r);
								});
							}
						}),
						n
					);
				}
			}
			class qp {
				constructor(t, e) {
					(this.name = t),
						(this.ast = e),
						(this.transitionFactories = []),
						(this.states = {}),
						e.states.forEach(t => {
							this.states[t.name] = new $p(t.style, (t.options && t.options.params) || {});
						}),
						Wp(this.states, 'true', '1'),
						Wp(this.states, 'false', '0'),
						e.transitions.forEach(e => {
							this.transitionFactories.push(new Hp(t, e, this.states));
						}),
						(this.fallbackTransition = new Hp(
							t,
							{
								type: 1,
								animation: { type: 2, steps: [], options: null },
								matchers: [(t, e) => !0],
								options: null,
								queryCount: 0,
								depCount: 0,
							},
							this.states
						));
				}
				get containsQueries() {
					return this.ast.queryCount > 0;
				}
				matchTransition(t, e, n, i) {
					return this.transitionFactories.find(s => s.match(t, e, n, i)) || null;
				}
				matchStyles(t, e, n) {
					return this.fallbackTransition.buildStyles(t, e, n);
				}
			}
			function Wp(t, e, n) {
				t.hasOwnProperty(e) ? t.hasOwnProperty(n) || (t[n] = t[e]) : t.hasOwnProperty(n) && (t[e] = t[n]);
			}
			const Qp = new Ap();
			class Zp {
				constructor(t, e, n) {
					(this.bodyNode = t),
						(this._driver = e),
						(this._normalizer = n),
						(this._animations = {}),
						(this._playersById = {}),
						(this.players = []);
				}
				register(t, e) {
					const n = [],
						i = wp(this._driver, e, n);
					if (n.length)
						throw new Error('Unable to build the animation due to the following errors: ' + n.join('\n'));
					this._animations[t] = i;
				}
				_buildPlayer(t, e, n) {
					const i = t.element,
						s = Ed(0, this._normalizer, 0, t.keyframes, e, n);
					return this._driver.animate(i, s, t.duration, t.delay, t.easing, [], !0);
				}
				create(t, e, n = {}) {
					const i = [],
						s = this._animations[t];
					let r;
					const o = new Map();
					if (
						(s
							? ((r = Rp(this._driver, e, s, Hd, $d, {}, {}, n, Qp, i)),
							  r.forEach(t => {
									const e = Ad(o, t.element, {});
									t.postStyleProps.forEach(t => (e[t] = null));
							  }))
							: (i.push("The requested animation doesn't exist or has already been destroyed"), (r = [])),
						i.length)
					)
						throw new Error('Unable to create the animation due to the following errors: ' + i.join('\n'));
					o.forEach((t, e) => {
						Object.keys(t).forEach(n => {
							t[n] = this._driver.computeStyle(e, n, dd);
						});
					});
					const a = Sd(
						r.map(t => {
							const e = o.get(t.element);
							return this._buildPlayer(t, {}, e);
						})
					);
					return (this._playersById[t] = a), a.onDestroy(() => this.destroy(t)), this.players.push(a), a;
				}
				destroy(t) {
					const e = this._getPlayer(t);
					e.destroy(), delete this._playersById[t];
					const n = this.players.indexOf(e);
					n >= 0 && this.players.splice(n, 1);
				}
				_getPlayer(t) {
					const e = this._playersById[t];
					if (!e) throw new Error('Unable to find the timeline player referenced by ' + t);
					return e;
				}
				listen(t, e, n, i) {
					const s = Td(e, '', '', '');
					return Cd(this._getPlayer(t), n, s, i), () => {};
				}
				command(t, e, n, i) {
					if ('register' == n) return void this.register(t, i[0]);
					if ('create' == n) return void this.create(t, e, i[0] || {});
					const s = this._getPlayer(t);
					switch (n) {
						case 'play':
							s.play();
							break;
						case 'pause':
							s.pause();
							break;
						case 'reset':
							s.reset();
							break;
						case 'restart':
							s.restart();
							break;
						case 'finish':
							s.finish();
							break;
						case 'init':
							s.init();
							break;
						case 'setPosition':
							s.setPosition(parseFloat(i[0]));
							break;
						case 'destroy':
							this.destroy(t);
					}
				}
			}
			const Gp = 'ng-animate-queued',
				Kp = 'ng-animate-disabled',
				Yp = '.ng-animate-disabled',
				Xp = [],
				Jp = { namespaceId: '', setForRemoval: !1, setForMove: !1, hasAnimation: !1, removedBeforeQueried: !1 },
				tf = { namespaceId: '', setForMove: !1, setForRemoval: !1, hasAnimation: !1, removedBeforeQueried: !0 };
			class ef {
				constructor(t, e = '') {
					this.namespaceId = e;
					const n = t && t.hasOwnProperty('value');
					if (((this.value = null != (i = n ? t.value : t) ? i : null), n)) {
						const e = Xd(t);
						delete e.value, (this.options = e);
					} else this.options = {};
					var i;
					this.options.params || (this.options.params = {});
				}
				get params() {
					return this.options.params;
				}
				absorbOptions(t) {
					const e = t.params;
					if (e) {
						const t = this.options.params;
						Object.keys(e).forEach(n => {
							null == t[n] && (t[n] = e[n]);
						});
					}
				}
			}
			const nf = 'void',
				sf = new ef(nf);
			class rf {
				constructor(t, e, n) {
					(this.id = t),
						(this.hostElement = e),
						(this._engine = n),
						(this.players = []),
						(this._triggers = {}),
						(this._queue = []),
						(this._elementListeners = new Map()),
						(this._hostClassName = 'ng-tns-' + t),
						df(e, this._hostClassName);
				}
				listen(t, e, n, i) {
					if (!this._triggers.hasOwnProperty(e))
						throw new Error(
							`Unable to listen on the animation trigger event "${n}" because the animation trigger "${e}" doesn't exist!`
						);
					if (null == n || 0 == n.length)
						throw new Error(
							`Unable to listen on the animation trigger "${e}" because the provided event is undefined!`
						);
					if ('start' != (s = n) && 'done' != s)
						throw new Error(
							`The provided animation trigger event "${n}" for the animation trigger "${e}" is not supported!`
						);
					var s;
					const r = Ad(this._elementListeners, t, []),
						o = { name: e, phase: n, callback: i };
					r.push(o);
					const a = Ad(this._engine.statesByElement, t, {});
					return (
						a.hasOwnProperty(e) || (df(t, qd), df(t, 'ng-trigger-' + e), (a[e] = sf)),
						() => {
							this._engine.afterFlush(() => {
								const t = r.indexOf(o);
								t >= 0 && r.splice(t, 1), this._triggers[e] || delete a[e];
							});
						}
					);
				}
				register(t, e) {
					return !this._triggers[t] && ((this._triggers[t] = e), !0);
				}
				_getTrigger(t) {
					const e = this._triggers[t];
					if (!e) throw new Error(`The provided animation trigger "${t}" has not been registered!`);
					return e;
				}
				trigger(t, e, n, i = !0) {
					const s = this._getTrigger(e),
						r = new af(this.id, e, t);
					let o = this._engine.statesByElement.get(t);
					o || (df(t, qd), df(t, 'ng-trigger-' + e), this._engine.statesByElement.set(t, (o = {})));
					let a = o[e];
					const l = new ef(n, this.id);
					if (
						(!(n && n.hasOwnProperty('value')) && a && l.absorbOptions(a.options),
						(o[e] = l),
						a || (a = sf),
						l.value !== nf && a.value === l.value)
					) {
						if (
							!(function (t, e) {
								const n = Object.keys(t),
									i = Object.keys(e);
								if (n.length != i.length) return !1;
								for (let s = 0; s < n.length; s++) {
									const i = n[s];
									if (!e.hasOwnProperty(i) || t[i] !== e[i]) return !1;
								}
								return !0;
							})(a.params, l.params)
						) {
							const e = [],
								n = s.matchStyles(a.value, a.params, e),
								i = s.matchStyles(l.value, l.params, e);
							e.length
								? this._engine.reportError(e)
								: this._engine.afterFlush(() => {
										ip(t, n), np(t, i);
								  });
						}
						return;
					}
					const c = Ad(this._engine.playersByElement, t, []);
					c.forEach(t => {
						t.namespaceId == this.id && t.triggerName == e && t.queued && t.destroy();
					});
					let u = s.matchTransition(a.value, l.value, t, l.params),
						h = !1;
					if (!u) {
						if (!i) return;
						(u = s.fallbackTransition), (h = !0);
					}
					return (
						this._engine.totalQueuedPlayers++,
						this._queue.push({
							element: t,
							triggerName: e,
							transition: u,
							fromState: a,
							toState: l,
							player: r,
							isFallbackTransition: h,
						}),
						h ||
							(df(t, Gp),
							r.onStart(() => {
								pf(t, Gp);
							})),
						r.onDone(() => {
							let e = this.players.indexOf(r);
							e >= 0 && this.players.splice(e, 1);
							const n = this._engine.playersByElement.get(t);
							if (n) {
								let t = n.indexOf(r);
								t >= 0 && n.splice(t, 1);
							}
						}),
						this.players.push(r),
						c.push(r),
						r
					);
				}
				deregister(t) {
					delete this._triggers[t],
						this._engine.statesByElement.forEach((e, n) => {
							delete e[t];
						}),
						this._elementListeners.forEach((e, n) => {
							this._elementListeners.set(
								n,
								e.filter(e => e.name != t)
							);
						});
				}
				clearElementCache(t) {
					this._engine.statesByElement.delete(t), this._elementListeners.delete(t);
					const e = this._engine.playersByElement.get(t);
					e && (e.forEach(t => t.destroy()), this._engine.playersByElement.delete(t));
				}
				_signalRemovalForInnerTriggers(t, e) {
					const n = this._engine.driver.query(t, Wd, !0);
					n.forEach(t => {
						if (t.__ng_removed) return;
						const n = this._engine.fetchNamespacesByElement(t);
						n.size ? n.forEach(n => n.triggerLeaveAnimation(t, e, !1, !0)) : this.clearElementCache(t);
					}),
						this._engine.afterFlushAnimationsDone(() => n.forEach(t => this.clearElementCache(t)));
				}
				triggerLeaveAnimation(t, e, n, i) {
					const s = this._engine.statesByElement.get(t);
					if (s) {
						const r = [];
						if (
							(Object.keys(s).forEach(e => {
								if (this._triggers[e]) {
									const n = this.trigger(t, e, nf, i);
									n && r.push(n);
								}
							}),
							r.length)
						)
							return (
								this._engine.markElementAsRemoved(this.id, t, !0, e),
								n && Sd(r).onDone(() => this._engine.processLeaveNode(t)),
								!0
							);
					}
					return !1;
				}
				prepareLeaveAnimationListeners(t) {
					const e = this._elementListeners.get(t);
					if (e) {
						const n = new Set();
						e.forEach(e => {
							const i = e.name;
							if (n.has(i)) return;
							n.add(i);
							const s = this._triggers[i].fallbackTransition,
								r = this._engine.statesByElement.get(t)[i] || sf,
								o = new ef(nf),
								a = new af(this.id, i, t);
							this._engine.totalQueuedPlayers++,
								this._queue.push({
									element: t,
									triggerName: i,
									transition: s,
									fromState: r,
									toState: o,
									player: a,
									isFallbackTransition: !0,
								});
						});
					}
				}
				removeNode(t, e) {
					const n = this._engine;
					if (
						(t.childElementCount && this._signalRemovalForInnerTriggers(t, e),
						this.triggerLeaveAnimation(t, e, !0))
					)
						return;
					let i = !1;
					if (n.totalAnimations) {
						const e = n.players.length ? n.playersByQueriedElement.get(t) : [];
						if (e && e.length) i = !0;
						else {
							let e = t;
							for (; (e = e.parentNode); )
								if (n.statesByElement.get(e)) {
									i = !0;
									break;
								}
						}
					}
					if ((this.prepareLeaveAnimationListeners(t), i)) n.markElementAsRemoved(this.id, t, !1, e);
					else {
						const i = t.__ng_removed;
						(i && i !== Jp) ||
							(n.afterFlush(() => this.clearElementCache(t)),
							n.destroyInnerAnimations(t),
							n._onRemovalComplete(t, e));
					}
				}
				insertNode(t, e) {
					df(t, this._hostClassName);
				}
				drainQueuedTransitions(t) {
					const e = [];
					return (
						this._queue.forEach(n => {
							const i = n.player;
							if (i.destroyed) return;
							const s = n.element,
								r = this._elementListeners.get(s);
							r &&
								r.forEach(e => {
									if (e.name == n.triggerName) {
										const i = Td(s, n.triggerName, n.fromState.value, n.toState.value);
										(i._data = t), Cd(n.player, e.phase, i, e.callback);
									}
								}),
								i.markedForDestroy
									? this._engine.afterFlush(() => {
											i.destroy();
									  })
									: e.push(n);
						}),
						(this._queue = []),
						e.sort((t, e) => {
							const n = t.transition.ast.depCount,
								i = e.transition.ast.depCount;
							return 0 == n || 0 == i
								? n - i
								: this._engine.driver.containsElement(t.element, e.element)
								? 1
								: -1;
						})
					);
				}
				destroy(t) {
					this.players.forEach(t => t.destroy()), this._signalRemovalForInnerTriggers(this.hostElement, t);
				}
				elementContainsData(t) {
					let e = !1;
					return (
						this._elementListeners.has(t) && (e = !0),
						(e = !!this._queue.find(e => e.element === t) || e),
						e
					);
				}
			}
			class of {
				constructor(t, e, n) {
					(this.bodyNode = t),
						(this.driver = e),
						(this._normalizer = n),
						(this.players = []),
						(this.newHostElements = new Map()),
						(this.playersByElement = new Map()),
						(this.playersByQueriedElement = new Map()),
						(this.statesByElement = new Map()),
						(this.disabledNodes = new Set()),
						(this.totalAnimations = 0),
						(this.totalQueuedPlayers = 0),
						(this._namespaceLookup = {}),
						(this._namespaceList = []),
						(this._flushFns = []),
						(this._whenQuietFns = []),
						(this.namespacesByHostElement = new Map()),
						(this.collectedEnterElements = []),
						(this.collectedLeaveElements = []),
						(this.onRemovalComplete = (t, e) => {});
				}
				_onRemovalComplete(t, e) {
					this.onRemovalComplete(t, e);
				}
				get queuedPlayers() {
					const t = [];
					return (
						this._namespaceList.forEach(e => {
							e.players.forEach(e => {
								e.queued && t.push(e);
							});
						}),
						t
					);
				}
				createNamespace(t, e) {
					const n = new rf(t, e, this);
					return (
						e.parentNode
							? this._balanceNamespaceList(n, e)
							: (this.newHostElements.set(e, n), this.collectEnterElement(e)),
						(this._namespaceLookup[t] = n)
					);
				}
				_balanceNamespaceList(t, e) {
					const n = this._namespaceList.length - 1;
					if (n >= 0) {
						let i = !1;
						for (let s = n; s >= 0; s--)
							if (this.driver.containsElement(this._namespaceList[s].hostElement, e)) {
								this._namespaceList.splice(s + 1, 0, t), (i = !0);
								break;
							}
						i || this._namespaceList.splice(0, 0, t);
					} else this._namespaceList.push(t);
					return this.namespacesByHostElement.set(e, t), t;
				}
				register(t, e) {
					let n = this._namespaceLookup[t];
					return n || (n = this.createNamespace(t, e)), n;
				}
				registerTrigger(t, e, n) {
					let i = this._namespaceLookup[t];
					i && i.register(e, n) && this.totalAnimations++;
				}
				destroy(t, e) {
					if (!t) return;
					const n = this._fetchNamespace(t);
					this.afterFlush(() => {
						this.namespacesByHostElement.delete(n.hostElement), delete this._namespaceLookup[t];
						const e = this._namespaceList.indexOf(n);
						e >= 0 && this._namespaceList.splice(e, 1);
					}),
						this.afterFlushAnimationsDone(() => n.destroy(e));
				}
				_fetchNamespace(t) {
					return this._namespaceLookup[t];
				}
				fetchNamespacesByElement(t) {
					const e = new Set(),
						n = this.statesByElement.get(t);
					if (n) {
						const t = Object.keys(n);
						for (let i = 0; i < t.length; i++) {
							const s = n[t[i]].namespaceId;
							if (s) {
								const t = this._fetchNamespace(s);
								t && e.add(t);
							}
						}
					}
					return e;
				}
				trigger(t, e, n, i) {
					if (lf(e)) {
						const s = this._fetchNamespace(t);
						if (s) return s.trigger(e, n, i), !0;
					}
					return !1;
				}
				insertNode(t, e, n, i) {
					if (!lf(e)) return;
					const s = e.__ng_removed;
					if (s && s.setForRemoval) {
						(s.setForRemoval = !1), (s.setForMove = !0);
						const t = this.collectedLeaveElements.indexOf(e);
						t >= 0 && this.collectedLeaveElements.splice(t, 1);
					}
					if (t) {
						const i = this._fetchNamespace(t);
						i && i.insertNode(e, n);
					}
					i && this.collectEnterElement(e);
				}
				collectEnterElement(t) {
					this.collectedEnterElements.push(t);
				}
				markElementAsDisabled(t, e) {
					e
						? this.disabledNodes.has(t) || (this.disabledNodes.add(t), df(t, Kp))
						: this.disabledNodes.has(t) && (this.disabledNodes.delete(t), pf(t, Kp));
				}
				removeNode(t, e, n, i) {
					if (lf(e)) {
						const s = t ? this._fetchNamespace(t) : null;
						if ((s ? s.removeNode(e, i) : this.markElementAsRemoved(t, e, !1, i), n)) {
							const n = this.namespacesByHostElement.get(e);
							n && n.id !== t && n.removeNode(e, i);
						}
					} else this._onRemovalComplete(e, i);
				}
				markElementAsRemoved(t, e, n, i) {
					this.collectedLeaveElements.push(e),
						(e.__ng_removed = {
							namespaceId: t,
							setForRemoval: i,
							hasAnimation: n,
							removedBeforeQueried: !1,
						});
				}
				listen(t, e, n, i, s) {
					return lf(e) ? this._fetchNamespace(t).listen(e, n, i, s) : () => {};
				}
				_buildInstruction(t, e, n, i, s) {
					return t.transition.build(
						this.driver,
						t.element,
						t.fromState.value,
						t.toState.value,
						n,
						i,
						t.fromState.options,
						t.toState.options,
						e,
						s
					);
				}
				destroyInnerAnimations(t) {
					let e = this.driver.query(t, Wd, !0);
					e.forEach(t => this.destroyActiveAnimationsForElement(t)),
						0 != this.playersByQueriedElement.size &&
							((e = this.driver.query(t, Zd, !0)),
							e.forEach(t => this.finishActiveQueriedAnimationOnElement(t)));
				}
				destroyActiveAnimationsForElement(t) {
					const e = this.playersByElement.get(t);
					e &&
						e.forEach(t => {
							t.queued ? (t.markedForDestroy = !0) : t.destroy();
						});
				}
				finishActiveQueriedAnimationOnElement(t) {
					const e = this.playersByQueriedElement.get(t);
					e && e.forEach(t => t.finish());
				}
				whenRenderingDone() {
					return new Promise(t => {
						if (this.players.length) return Sd(this.players).onDone(() => t());
						t();
					});
				}
				processLeaveNode(t) {
					const e = t.__ng_removed;
					if (e && e.setForRemoval) {
						if (((t.__ng_removed = Jp), e.namespaceId)) {
							this.destroyInnerAnimations(t);
							const n = this._fetchNamespace(e.namespaceId);
							n && n.clearElementCache(t);
						}
						this._onRemovalComplete(t, e.setForRemoval);
					}
					this.driver.matchesElement(t, Yp) && this.markElementAsDisabled(t, !1),
						this.driver.query(t, Yp, !0).forEach(t => {
							this.markElementAsDisabled(t, !1);
						});
				}
				flush(t = -1) {
					let e = [];
					if (
						(this.newHostElements.size &&
							(this.newHostElements.forEach((t, e) => this._balanceNamespaceList(t, e)),
							this.newHostElements.clear()),
						this.totalAnimations && this.collectedEnterElements.length)
					)
						for (let n = 0; n < this.collectedEnterElements.length; n++)
							df(this.collectedEnterElements[n], 'ng-star-inserted');
					if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
						const n = [];
						try {
							e = this._flushAnimations(n, t);
						} finally {
							for (let t = 0; t < n.length; t++) n[t]();
						}
					} else
						for (let n = 0; n < this.collectedLeaveElements.length; n++)
							this.processLeaveNode(this.collectedLeaveElements[n]);
					if (
						((this.totalQueuedPlayers = 0),
						(this.collectedEnterElements.length = 0),
						(this.collectedLeaveElements.length = 0),
						this._flushFns.forEach(t => t()),
						(this._flushFns = []),
						this._whenQuietFns.length)
					) {
						const t = this._whenQuietFns;
						(this._whenQuietFns = []),
							e.length
								? Sd(e).onDone(() => {
										t.forEach(t => t());
								  })
								: t.forEach(t => t());
					}
				}
				reportError(t) {
					throw new Error(
						'Unable to process animations due to the following failed trigger transitions\n ' + t.join('\n')
					);
				}
				_flushAnimations(t, e) {
					const n = new Ap(),
						i = [],
						s = new Map(),
						r = [],
						o = new Map(),
						a = new Map(),
						l = new Map(),
						c = new Set();
					this.disabledNodes.forEach(t => {
						c.add(t);
						const e = this.driver.query(t, '.ng-animate-queued', !0);
						for (let n = 0; n < e.length; n++) c.add(e[n]);
					});
					const u = this.bodyNode,
						h = Array.from(this.statesByElement.keys()),
						d = hf(h, this.collectedEnterElements),
						p = new Map();
					let f = 0;
					d.forEach((t, e) => {
						const n = Hd + f++;
						p.set(e, n), t.forEach(t => df(t, n));
					});
					const m = [],
						g = new Set(),
						y = new Set();
					for (let O = 0; O < this.collectedLeaveElements.length; O++) {
						const t = this.collectedLeaveElements[O],
							e = t.__ng_removed;
						e &&
							e.setForRemoval &&
							(m.push(t),
							g.add(t),
							e.hasAnimation
								? this.driver.query(t, '.ng-star-inserted', !0).forEach(t => g.add(t))
								: y.add(t));
					}
					const _ = new Map(),
						v = hf(h, Array.from(g));
					v.forEach((t, e) => {
						const n = $d + f++;
						_.set(e, n), t.forEach(t => df(t, n));
					}),
						t.push(() => {
							d.forEach((t, e) => {
								const n = p.get(e);
								t.forEach(t => pf(t, n));
							}),
								v.forEach((t, e) => {
									const n = _.get(e);
									t.forEach(t => pf(t, n));
								}),
								m.forEach(t => {
									this.processLeaveNode(t);
								});
						});
					const b = [],
						w = [];
					for (let O = this._namespaceList.length - 1; O >= 0; O--)
						this._namespaceList[O].drainQueuedTransitions(e).forEach(t => {
							const e = t.player,
								s = t.element;
							if ((b.push(e), this.collectedEnterElements.length)) {
								const t = s.__ng_removed;
								if (t && t.setForMove) return void e.destroy();
							}
							const c = !u || !this.driver.containsElement(u, s),
								h = _.get(s),
								d = p.get(s),
								f = this._buildInstruction(t, n, d, h, c);
							if (f.errors && f.errors.length) w.push(f);
							else {
								if (c)
									return (
										e.onStart(() => ip(s, f.fromStyles)),
										e.onDestroy(() => np(s, f.toStyles)),
										void i.push(e)
									);
								if (t.isFallbackTransition)
									return (
										e.onStart(() => ip(s, f.fromStyles)),
										e.onDestroy(() => np(s, f.toStyles)),
										void i.push(e)
									);
								f.timelines.forEach(t => (t.stretchStartingKeyframe = !0)),
									n.append(s, f.timelines),
									r.push({ instruction: f, player: e, element: s }),
									f.queriedElements.forEach(t => Ad(o, t, []).push(e)),
									f.preStyleProps.forEach((t, e) => {
										const n = Object.keys(t);
										if (n.length) {
											let t = a.get(e);
											t || a.set(e, (t = new Set())), n.forEach(e => t.add(e));
										}
									}),
									f.postStyleProps.forEach((t, e) => {
										const n = Object.keys(t);
										let i = l.get(e);
										i || l.set(e, (i = new Set())), n.forEach(t => i.add(t));
									});
							}
						});
					if (w.length) {
						const t = [];
						w.forEach(e => {
							t.push(`@${e.triggerName} has failed due to:\n`), e.errors.forEach(e => t.push(`- ${e}\n`));
						}),
							b.forEach(t => t.destroy()),
							this.reportError(t);
					}
					const x = new Map(),
						S = new Map();
					r.forEach(t => {
						const e = t.element;
						n.has(e) && (S.set(e, e), this._beforeAnimationBuild(t.player.namespaceId, t.instruction, x));
					}),
						i.forEach(t => {
							const e = t.element;
							this._getPreviousPlayers(e, !1, t.namespaceId, t.triggerName, null).forEach(t => {
								Ad(x, e, []).push(t), t.destroy();
							});
						});
					const E = m.filter(t => mf(t, a, l)),
						C = new Map();
					uf(C, this.driver, y, l, dd).forEach(t => {
						mf(t, a, l) && E.push(t);
					});
					const k = new Map();
					d.forEach((t, e) => {
						uf(k, this.driver, new Set(t), a, '!');
					}),
						E.forEach(t => {
							const e = C.get(t),
								n = k.get(t);
							C.set(t, Object.assign(Object.assign({}, e), n));
						});
					const T = [],
						A = [],
						I = {};
					r.forEach(t => {
						const { element: e, player: r, instruction: o } = t;
						if (n.has(e)) {
							if (c.has(e))
								return (
									r.onDestroy(() => np(e, o.toStyles)),
									(r.disabled = !0),
									r.overrideTotalTime(o.totalTime),
									void i.push(r)
								);
							let t = I;
							if (S.size > 1) {
								let n = e;
								const i = [];
								for (; (n = n.parentNode); ) {
									const e = S.get(n);
									if (e) {
										t = e;
										break;
									}
									i.push(n);
								}
								i.forEach(e => S.set(e, t));
							}
							const n = this._buildAnimation(r.namespaceId, o, x, s, k, C);
							if ((r.setRealPlayer(n), t === I)) T.push(r);
							else {
								const e = this.playersByElement.get(t);
								e && e.length && (r.parentPlayer = Sd(e)), i.push(r);
							}
						} else
							ip(e, o.fromStyles), r.onDestroy(() => np(e, o.toStyles)), A.push(r), c.has(e) && i.push(r);
					}),
						A.forEach(t => {
							const e = s.get(t.element);
							if (e && e.length) {
								const n = Sd(e);
								t.setRealPlayer(n);
							}
						}),
						i.forEach(t => {
							t.parentPlayer ? t.syncPlayerEvents(t.parentPlayer) : t.destroy();
						});
					for (let O = 0; O < m.length; O++) {
						const t = m[O],
							e = t.__ng_removed;
						if ((pf(t, $d), e && e.hasAnimation)) continue;
						let n = [];
						if (o.size) {
							let e = o.get(t);
							e && e.length && n.push(...e);
							let i = this.driver.query(t, Zd, !0);
							for (let t = 0; t < i.length; t++) {
								let e = o.get(i[t]);
								e && e.length && n.push(...e);
							}
						}
						const i = n.filter(t => !t.destroyed);
						i.length ? ff(this, t, i) : this.processLeaveNode(t);
					}
					return (
						(m.length = 0),
						T.forEach(t => {
							this.players.push(t),
								t.onDone(() => {
									t.destroy();
									const e = this.players.indexOf(t);
									this.players.splice(e, 1);
								}),
								t.play();
						}),
						T
					);
				}
				elementContainsData(t, e) {
					let n = !1;
					const i = e.__ng_removed;
					return (
						i && i.setForRemoval && (n = !0),
						this.playersByElement.has(e) && (n = !0),
						this.playersByQueriedElement.has(e) && (n = !0),
						this.statesByElement.has(e) && (n = !0),
						this._fetchNamespace(t).elementContainsData(e) || n
					);
				}
				afterFlush(t) {
					this._flushFns.push(t);
				}
				afterFlushAnimationsDone(t) {
					this._whenQuietFns.push(t);
				}
				_getPreviousPlayers(t, e, n, i, s) {
					let r = [];
					if (e) {
						const e = this.playersByQueriedElement.get(t);
						e && (r = e);
					} else {
						const e = this.playersByElement.get(t);
						if (e) {
							const t = !s || s == nf;
							e.forEach(e => {
								e.queued || ((t || e.triggerName == i) && r.push(e));
							});
						}
					}
					return (
						(n || i) && (r = r.filter(t => !((n && n != t.namespaceId) || (i && i != t.triggerName)))), r
					);
				}
				_beforeAnimationBuild(t, e, n) {
					const i = e.element,
						s = e.isRemovalTransition ? void 0 : t,
						r = e.isRemovalTransition ? void 0 : e.triggerName;
					for (const o of e.timelines) {
						const t = o.element,
							a = t !== i,
							l = Ad(n, t, []);
						this._getPreviousPlayers(t, a, s, r, e.toState).forEach(t => {
							const e = t.getRealPlayer();
							e.beforeDestroy && e.beforeDestroy(), t.destroy(), l.push(t);
						});
					}
					ip(i, e.fromStyles);
				}
				_buildAnimation(t, e, n, i, s, r) {
					const o = e.triggerName,
						a = e.element,
						l = [],
						c = new Set(),
						u = new Set(),
						h = e.timelines.map(e => {
							const h = e.element;
							c.add(h);
							const d = h.__ng_removed;
							if (d && d.removedBeforeQueried) return new bd(e.duration, e.delay);
							const p = h !== a,
								f = (function (t) {
									const e = [];
									return (
										(function t(e, n) {
											for (let i = 0; i < e.length; i++) {
												const s = e[i];
												s instanceof wd ? t(s.players, n) : n.push(s);
											}
										})(t, e),
										e
									);
								})((n.get(h) || Xp).map(t => t.getRealPlayer())).filter(
									t => !!t.element && t.element === h
								),
								m = s.get(h),
								g = r.get(h),
								y = Ed(0, this._normalizer, 0, e.keyframes, m, g),
								_ = this._buildPlayer(e, y, f);
							if ((e.subTimeline && i && u.add(h), p)) {
								const e = new af(t, o, h);
								e.setRealPlayer(_), l.push(e);
							}
							return _;
						});
					l.forEach(t => {
						Ad(this.playersByQueriedElement, t.element, []).push(t),
							t.onDone(() =>
								(function (t, e, n) {
									let i;
									if (t instanceof Map) {
										if (((i = t.get(e)), i)) {
											if (i.length) {
												const t = i.indexOf(n);
												i.splice(t, 1);
											}
											0 == i.length && t.delete(e);
										}
									} else if (((i = t[e]), i)) {
										if (i.length) {
											const t = i.indexOf(n);
											i.splice(t, 1);
										}
										0 == i.length && delete t[e];
									}
									return i;
								})(this.playersByQueriedElement, t.element, t)
							);
					}),
						c.forEach(t => df(t, Qd));
					const d = Sd(h);
					return (
						d.onDestroy(() => {
							c.forEach(t => pf(t, Qd)), np(a, e.toStyles);
						}),
						u.forEach(t => {
							Ad(i, t, []).push(d);
						}),
						d
					);
				}
				_buildPlayer(t, e, n) {
					return e.length > 0
						? this.driver.animate(t.element, e, t.duration, t.delay, t.easing, n)
						: new bd(t.duration, t.delay);
				}
			}
			class af {
				constructor(t, e, n) {
					(this.namespaceId = t),
						(this.triggerName = e),
						(this.element = n),
						(this._player = new bd()),
						(this._containsRealPlayer = !1),
						(this._queuedCallbacks = {}),
						(this.destroyed = !1),
						(this.markedForDestroy = !1),
						(this.disabled = !1),
						(this.queued = !0),
						(this.totalTime = 0);
				}
				setRealPlayer(t) {
					this._containsRealPlayer ||
						((this._player = t),
						Object.keys(this._queuedCallbacks).forEach(e => {
							this._queuedCallbacks[e].forEach(n => Cd(t, e, void 0, n));
						}),
						(this._queuedCallbacks = {}),
						(this._containsRealPlayer = !0),
						this.overrideTotalTime(t.totalTime),
						(this.queued = !1));
				}
				getRealPlayer() {
					return this._player;
				}
				overrideTotalTime(t) {
					this.totalTime = t;
				}
				syncPlayerEvents(t) {
					const e = this._player;
					e.triggerCallback && t.onStart(() => e.triggerCallback('start')),
						t.onDone(() => this.finish()),
						t.onDestroy(() => this.destroy());
				}
				_queueEvent(t, e) {
					Ad(this._queuedCallbacks, t, []).push(e);
				}
				onDone(t) {
					this.queued && this._queueEvent('done', t), this._player.onDone(t);
				}
				onStart(t) {
					this.queued && this._queueEvent('start', t), this._player.onStart(t);
				}
				onDestroy(t) {
					this.queued && this._queueEvent('destroy', t), this._player.onDestroy(t);
				}
				init() {
					this._player.init();
				}
				hasStarted() {
					return !this.queued && this._player.hasStarted();
				}
				play() {
					!this.queued && this._player.play();
				}
				pause() {
					!this.queued && this._player.pause();
				}
				restart() {
					!this.queued && this._player.restart();
				}
				finish() {
					this._player.finish();
				}
				destroy() {
					(this.destroyed = !0), this._player.destroy();
				}
				reset() {
					!this.queued && this._player.reset();
				}
				setPosition(t) {
					this.queued || this._player.setPosition(t);
				}
				getPosition() {
					return this.queued ? 0 : this._player.getPosition();
				}
				triggerCallback(t) {
					const e = this._player;
					e.triggerCallback && e.triggerCallback(t);
				}
			}
			function lf(t) {
				return t && 1 === t.nodeType;
			}
			function cf(t, e) {
				const n = t.style.display;
				return (t.style.display = null != e ? e : 'none'), n;
			}
			function uf(t, e, n, i, s) {
				const r = [];
				n.forEach(t => r.push(cf(t)));
				const o = [];
				i.forEach((n, i) => {
					const r = {};
					n.forEach(t => {
						const n = (r[t] = e.computeStyle(i, t, s));
						(n && 0 != n.length) || ((i.__ng_removed = tf), o.push(i));
					}),
						t.set(i, r);
				});
				let a = 0;
				return n.forEach(t => cf(t, r[a++])), o;
			}
			function hf(t, e) {
				const n = new Map();
				if ((t.forEach(t => n.set(t, [])), 0 == e.length)) return n;
				const i = new Set(e),
					s = new Map();
				return (
					e.forEach(t => {
						const e = (function t(e) {
							if (!e) return 1;
							let r = s.get(e);
							if (r) return r;
							const o = e.parentNode;
							return (r = n.has(o) ? o : i.has(o) ? 1 : t(o)), s.set(e, r), r;
						})(t);
						1 !== e && n.get(e).push(t);
					}),
					n
				);
			}
			function df(t, e) {
				if (t.classList) t.classList.add(e);
				else {
					let n = t.$$classes;
					n || (n = t.$$classes = {}), (n[e] = !0);
				}
			}
			function pf(t, e) {
				if (t.classList) t.classList.remove(e);
				else {
					let n = t.$$classes;
					n && delete n[e];
				}
			}
			function ff(t, e, n) {
				Sd(n).onDone(() => t.processLeaveNode(e));
			}
			function mf(t, e, n) {
				const i = n.get(t);
				if (!i) return !1;
				let s = e.get(t);
				return s ? i.forEach(t => s.add(t)) : e.set(t, i), n.delete(t), !0;
			}
			class gf {
				constructor(t, e, n) {
					(this.bodyNode = t),
						(this._driver = e),
						(this._triggerCache = {}),
						(this.onRemovalComplete = (t, e) => {}),
						(this._transitionEngine = new of(t, e, n)),
						(this._timelineEngine = new Zp(t, e, n)),
						(this._transitionEngine.onRemovalComplete = (t, e) => this.onRemovalComplete(t, e));
				}
				registerTrigger(t, e, n, i, s) {
					const r = t + '-' + i;
					let o = this._triggerCache[r];
					if (!o) {
						const t = [],
							e = wp(this._driver, s, t);
						if (t.length)
							throw new Error(
								`The animation trigger "${i}" has failed to build due to the following errors:\n - ${t.join(
									'\n - '
								)}`
							);
						(o = (function (t, e) {
							return new qp(t, e);
						})(i, e)),
							(this._triggerCache[r] = o);
					}
					this._transitionEngine.registerTrigger(e, i, o);
				}
				register(t, e) {
					this._transitionEngine.register(t, e);
				}
				destroy(t, e) {
					this._transitionEngine.destroy(t, e);
				}
				onInsert(t, e, n, i) {
					this._transitionEngine.insertNode(t, e, n, i);
				}
				onRemove(t, e, n, i) {
					this._transitionEngine.removeNode(t, e, i || !1, n);
				}
				disableAnimations(t, e) {
					this._transitionEngine.markElementAsDisabled(t, e);
				}
				process(t, e, n, i) {
					if ('@' == n.charAt(0)) {
						const [t, s] = Id(n);
						this._timelineEngine.command(t, e, s, i);
					} else this._transitionEngine.trigger(t, e, n, i);
				}
				listen(t, e, n, i, s) {
					if ('@' == n.charAt(0)) {
						const [t, i] = Id(n);
						return this._timelineEngine.listen(t, e, i, s);
					}
					return this._transitionEngine.listen(t, e, n, i, s);
				}
				flush(t = -1) {
					this._transitionEngine.flush(t);
				}
				get players() {
					return this._transitionEngine.players.concat(this._timelineEngine.players);
				}
				whenRenderingDone() {
					return this._transitionEngine.whenRenderingDone();
				}
			}
			function yf(t, e) {
				let n = null,
					i = null;
				return (
					Array.isArray(e) && e.length
						? ((n = vf(e[0])), e.length > 1 && (i = vf(e[e.length - 1])))
						: e && (n = vf(e)),
					n || i ? new _f(t, n, i) : null
				);
			}
			let _f = (() => {
				class t {
					constructor(e, n, i) {
						(this._element = e), (this._startStyles = n), (this._endStyles = i), (this._state = 0);
						let s = t.initialStylesByElement.get(e);
						s || t.initialStylesByElement.set(e, (s = {})), (this._initialStyles = s);
					}
					start() {
						this._state < 1 &&
							(this._startStyles && np(this._element, this._startStyles, this._initialStyles),
							(this._state = 1));
					}
					finish() {
						this.start(),
							this._state < 2 &&
								(np(this._element, this._initialStyles),
								this._endStyles && (np(this._element, this._endStyles), (this._endStyles = null)),
								(this._state = 1));
					}
					destroy() {
						this.finish(),
							this._state < 3 &&
								(t.initialStylesByElement.delete(this._element),
								this._startStyles && (ip(this._element, this._startStyles), (this._endStyles = null)),
								this._endStyles && (ip(this._element, this._endStyles), (this._endStyles = null)),
								np(this._element, this._initialStyles),
								(this._state = 3));
					}
				}
				return (t.initialStylesByElement = new WeakMap()), t;
			})();
			function vf(t) {
				let e = null;
				const n = Object.keys(t);
				for (let i = 0; i < n.length; i++) {
					const s = n[i];
					bf(s) && ((e = e || {}), (e[s] = t[s]));
				}
				return e;
			}
			function bf(t) {
				return 'display' === t || 'position' === t;
			}
			const wf = 'animation',
				xf = 'animationend';
			class Sf {
				constructor(t, e, n, i, s, r, o) {
					(this._element = t),
						(this._name = e),
						(this._duration = n),
						(this._delay = i),
						(this._easing = s),
						(this._fillMode = r),
						(this._onDoneFn = o),
						(this._finished = !1),
						(this._destroyed = !1),
						(this._startTime = 0),
						(this._position = 0),
						(this._eventFn = t => this._handleCallback(t));
				}
				apply() {
					!(function (t, e) {
						const n = If(t, '').trim();
						n.length &&
							((function (t, e) {
								let n = 0;
								for (let i = 0; i < t.length; i++) ',' === t.charAt(i) && n++;
							})(n),
							(e = `${n}, ${e}`)),
							Af(t, '', e);
					})(
						this._element,
						`${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`
					),
						Tf(this._element, this._eventFn, !1),
						(this._startTime = Date.now());
				}
				pause() {
					Ef(this._element, this._name, 'paused');
				}
				resume() {
					Ef(this._element, this._name, 'running');
				}
				setPosition(t) {
					const e = Cf(this._element, this._name);
					(this._position = t * this._duration), Af(this._element, 'Delay', `-${this._position}ms`, e);
				}
				getPosition() {
					return this._position;
				}
				_handleCallback(t) {
					const e = t._ngTestManualTimestamp || Date.now(),
						n = 1e3 * parseFloat(t.elapsedTime.toFixed(3));
					t.animationName == this._name &&
						Math.max(e - this._startTime, 0) >= this._delay &&
						n >= this._duration &&
						this.finish();
				}
				finish() {
					this._finished || ((this._finished = !0), this._onDoneFn(), Tf(this._element, this._eventFn, !0));
				}
				destroy() {
					this._destroyed ||
						((this._destroyed = !0),
						this.finish(),
						(function (t, e) {
							const n = If(t, '').split(','),
								i = kf(n, e);
							i >= 0 && (n.splice(i, 1), Af(t, '', n.join(',')));
						})(this._element, this._name));
				}
			}
			function Ef(t, e, n) {
				Af(t, 'PlayState', n, Cf(t, e));
			}
			function Cf(t, e) {
				const n = If(t, '');
				return n.indexOf(',') > 0 ? kf(n.split(','), e) : kf([n], e);
			}
			function kf(t, e) {
				for (let n = 0; n < t.length; n++) if (t[n].indexOf(e) >= 0) return n;
				return -1;
			}
			function Tf(t, e, n) {
				n ? t.removeEventListener(xf, e) : t.addEventListener(xf, e);
			}
			function Af(t, e, n, i) {
				const s = wf + e;
				if (null != i) {
					const e = t.style[s];
					if (e.length) {
						const t = e.split(',');
						(t[i] = n), (n = t.join(','));
					}
				}
				t.style[s] = n;
			}
			function If(t, e) {
				return t.style[wf + e];
			}
			class Of {
				constructor(t, e, n, i, s, r, o, a) {
					(this.element = t),
						(this.keyframes = e),
						(this.animationName = n),
						(this._duration = i),
						(this._delay = s),
						(this._finalStyles = o),
						(this._specialStyles = a),
						(this._onDoneFns = []),
						(this._onStartFns = []),
						(this._onDestroyFns = []),
						(this._started = !1),
						(this.currentSnapshot = {}),
						(this._state = 0),
						(this.easing = r || 'linear'),
						(this.totalTime = i + s),
						this._buildStyler();
				}
				onStart(t) {
					this._onStartFns.push(t);
				}
				onDone(t) {
					this._onDoneFns.push(t);
				}
				onDestroy(t) {
					this._onDestroyFns.push(t);
				}
				destroy() {
					this.init(),
						this._state >= 4 ||
							((this._state = 4),
							this._styler.destroy(),
							this._flushStartFns(),
							this._flushDoneFns(),
							this._specialStyles && this._specialStyles.destroy(),
							this._onDestroyFns.forEach(t => t()),
							(this._onDestroyFns = []));
				}
				_flushDoneFns() {
					this._onDoneFns.forEach(t => t()), (this._onDoneFns = []);
				}
				_flushStartFns() {
					this._onStartFns.forEach(t => t()), (this._onStartFns = []);
				}
				finish() {
					this.init(),
						this._state >= 3 ||
							((this._state = 3),
							this._styler.finish(),
							this._flushStartFns(),
							this._specialStyles && this._specialStyles.finish(),
							this._flushDoneFns());
				}
				setPosition(t) {
					this._styler.setPosition(t);
				}
				getPosition() {
					return this._styler.getPosition();
				}
				hasStarted() {
					return this._state >= 2;
				}
				init() {
					this._state >= 1 || ((this._state = 1), this._styler.apply(), this._delay && this._styler.pause());
				}
				play() {
					this.init(),
						this.hasStarted() ||
							(this._flushStartFns(),
							(this._state = 2),
							this._specialStyles && this._specialStyles.start()),
						this._styler.resume();
				}
				pause() {
					this.init(), this._styler.pause();
				}
				restart() {
					this.reset(), this.play();
				}
				reset() {
					this._styler.destroy(), this._buildStyler(), this._styler.apply();
				}
				_buildStyler() {
					this._styler = new Sf(
						this.element,
						this.animationName,
						this._duration,
						this._delay,
						this.easing,
						'forwards',
						() => this.finish()
					);
				}
				triggerCallback(t) {
					const e = 'start' == t ? this._onStartFns : this._onDoneFns;
					e.forEach(t => t()), (e.length = 0);
				}
				beforeDestroy() {
					this.init();
					const t = {};
					if (this.hasStarted()) {
						const e = this._state >= 3;
						Object.keys(this._finalStyles).forEach(n => {
							'offset' != n && (t[n] = e ? this._finalStyles[n] : fp(this.element, n));
						});
					}
					this.currentSnapshot = t;
				}
			}
			class Rf extends bd {
				constructor(t, e) {
					super(),
						(this.element = t),
						(this._startingStyles = {}),
						(this.__initialized = !1),
						(this._styles = zd(e));
				}
				init() {
					!this.__initialized &&
						this._startingStyles &&
						((this.__initialized = !0),
						Object.keys(this._styles).forEach(t => {
							this._startingStyles[t] = this.element.style[t];
						}),
						super.init());
				}
				play() {
					this._startingStyles &&
						(this.init(),
						Object.keys(this._styles).forEach(t => this.element.style.setProperty(t, this._styles[t])),
						super.play());
				}
				destroy() {
					this._startingStyles &&
						(Object.keys(this._startingStyles).forEach(t => {
							const e = this._startingStyles[t];
							e ? this.element.style.setProperty(t, e) : this.element.style.removeProperty(t);
						}),
						(this._startingStyles = null),
						super.destroy());
				}
			}
			class Pf {
				constructor() {
					(this._count = 0), (this._head = document.querySelector('head')), (this._warningIssued = !1);
				}
				validateStyleProperty(t) {
					return Md(t);
				}
				matchesElement(t, e) {
					return Fd(t, e);
				}
				containsElement(t, e) {
					return jd(t, e);
				}
				query(t, e, n) {
					return Bd(t, e, n);
				}
				computeStyle(t, e, n) {
					return window.getComputedStyle(t)[e];
				}
				buildKeyframeElement(t, e, n) {
					n = n.map(t => zd(t));
					let i = `@keyframes ${e} {\n`,
						s = '';
					n.forEach(t => {
						s = ' ';
						const e = parseFloat(t.offset);
						(i += `${s}${100 * e}% {\n`),
							(s += ' '),
							Object.keys(t).forEach(e => {
								const n = t[e];
								switch (e) {
									case 'offset':
										return;
									case 'easing':
										return void (n && (i += `${s}animation-timing-function: ${n};\n`));
									default:
										return void (i += `${s}${e}: ${n};\n`);
								}
							}),
							(i += s + '}\n');
					}),
						(i += '}\n');
					const r = document.createElement('style');
					return (r.textContent = i), r;
				}
				animate(t, e, n, i, s, r = [], o) {
					o && this._notifyFaultyScrubber();
					const a = r.filter(t => t instanceof Of),
						l = {};
					hp(n, i) &&
						a.forEach(t => {
							let e = t.currentSnapshot;
							Object.keys(e).forEach(t => (l[t] = e[t]));
						});
					const c = (function (t) {
						let e = {};
						return (
							t &&
								(Array.isArray(t) ? t : [t]).forEach(t => {
									Object.keys(t).forEach(n => {
										'offset' != n && 'easing' != n && (e[n] = t[n]);
									});
								}),
							e
						);
					})((e = dp(t, e, l)));
					if (0 == n) return new Rf(t, c);
					const u = 'gen_css_kf_' + this._count++,
						h = this.buildKeyframeElement(t, u, e);
					document.querySelector('head').appendChild(h);
					const d = yf(t, e),
						p = new Of(t, e, u, n, i, s, c, d);
					return (
						p.onDestroy(() => {
							var t;
							(t = h).parentNode.removeChild(t);
						}),
						p
					);
				}
				_notifyFaultyScrubber() {
					this._warningIssued ||
						(console.warn(
							'@angular/animations: please load the web-animations.js polyfill to allow programmatic access...\n',
							'  visit http://bit.ly/IWukam to learn more about using the web-animation-js polyfill.'
						),
						(this._warningIssued = !0));
				}
			}
			class Lf {
				constructor(t, e, n, i) {
					(this.element = t),
						(this.keyframes = e),
						(this.options = n),
						(this._specialStyles = i),
						(this._onDoneFns = []),
						(this._onStartFns = []),
						(this._onDestroyFns = []),
						(this._initialized = !1),
						(this._finished = !1),
						(this._started = !1),
						(this._destroyed = !1),
						(this.time = 0),
						(this.parentPlayer = null),
						(this.currentSnapshot = {}),
						(this._duration = n.duration),
						(this._delay = n.delay || 0),
						(this.time = this._duration + this._delay);
				}
				_onFinish() {
					this._finished ||
						((this._finished = !0), this._onDoneFns.forEach(t => t()), (this._onDoneFns = []));
				}
				init() {
					this._buildPlayer(), this._preparePlayerBeforeStart();
				}
				_buildPlayer() {
					if (this._initialized) return;
					this._initialized = !0;
					const t = this.keyframes;
					(this.domPlayer = this._triggerWebAnimation(this.element, t, this.options)),
						(this._finalKeyframe = t.length ? t[t.length - 1] : {}),
						this.domPlayer.addEventListener('finish', () => this._onFinish());
				}
				_preparePlayerBeforeStart() {
					this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
				}
				_triggerWebAnimation(t, e, n) {
					return t.animate(e, n);
				}
				onStart(t) {
					this._onStartFns.push(t);
				}
				onDone(t) {
					this._onDoneFns.push(t);
				}
				onDestroy(t) {
					this._onDestroyFns.push(t);
				}
				play() {
					this._buildPlayer(),
						this.hasStarted() ||
							(this._onStartFns.forEach(t => t()),
							(this._onStartFns = []),
							(this._started = !0),
							this._specialStyles && this._specialStyles.start()),
						this.domPlayer.play();
				}
				pause() {
					this.init(), this.domPlayer.pause();
				}
				finish() {
					this.init(),
						this._specialStyles && this._specialStyles.finish(),
						this._onFinish(),
						this.domPlayer.finish();
				}
				reset() {
					this._resetDomPlayerState(), (this._destroyed = !1), (this._finished = !1), (this._started = !1);
				}
				_resetDomPlayerState() {
					this.domPlayer && this.domPlayer.cancel();
				}
				restart() {
					this.reset(), this.play();
				}
				hasStarted() {
					return this._started;
				}
				destroy() {
					this._destroyed ||
						((this._destroyed = !0),
						this._resetDomPlayerState(),
						this._onFinish(),
						this._specialStyles && this._specialStyles.destroy(),
						this._onDestroyFns.forEach(t => t()),
						(this._onDestroyFns = []));
				}
				setPosition(t) {
					this.domPlayer.currentTime = t * this.time;
				}
				getPosition() {
					return this.domPlayer.currentTime / this.time;
				}
				get totalTime() {
					return this._delay + this._duration;
				}
				beforeDestroy() {
					const t = {};
					this.hasStarted() &&
						Object.keys(this._finalKeyframe).forEach(e => {
							'offset' != e && (t[e] = this._finished ? this._finalKeyframe[e] : fp(this.element, e));
						}),
						(this.currentSnapshot = t);
				}
				triggerCallback(t) {
					const e = 'start' == t ? this._onStartFns : this._onDoneFns;
					e.forEach(t => t()), (e.length = 0);
				}
			}
			class Nf {
				constructor() {
					(this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(Df().toString())),
						(this._cssKeyframesDriver = new Pf());
				}
				validateStyleProperty(t) {
					return Md(t);
				}
				matchesElement(t, e) {
					return Fd(t, e);
				}
				containsElement(t, e) {
					return jd(t, e);
				}
				query(t, e, n) {
					return Bd(t, e, n);
				}
				computeStyle(t, e, n) {
					return window.getComputedStyle(t)[e];
				}
				overrideWebAnimationsSupport(t) {
					this._isNativeImpl = t;
				}
				animate(t, e, n, i, s, r = [], o) {
					if (!o && !this._isNativeImpl) return this._cssKeyframesDriver.animate(t, e, n, i, s, r);
					const a = { duration: n, delay: i, fill: 0 == i ? 'both' : 'forwards' };
					s && (a.easing = s);
					const l = {},
						c = r.filter(t => t instanceof Lf);
					hp(n, i) &&
						c.forEach(t => {
							let e = t.currentSnapshot;
							Object.keys(e).forEach(t => (l[t] = e[t]));
						});
					const u = yf(t, (e = dp(t, (e = e.map(t => Jd(t, !1))), l)));
					return new Lf(t, e, a, u);
				}
			}
			function Df() {
				return ('undefined' != typeof window && void 0 !== window.document && Element.prototype.animate) || {};
			}
			let Mf = (() => {
				class t extends hd {
					constructor(t, e) {
						super(),
							(this._nextAnimationId = 0),
							(this._renderer = t.createRenderer(e.body, {
								id: '0',
								encapsulation: de.None,
								styles: [],
								data: { animation: [] },
							}));
					}
					build(t) {
						const e = this._nextAnimationId.toString();
						this._nextAnimationId++;
						const n = Array.isArray(t) ? md(t) : t;
						return Bf(this._renderer, null, e, 'register', [n]), new Ff(e, this._renderer);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(sl), Kt(Jc));
					}),
					(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			class Ff extends class {} {
				constructor(t, e) {
					super(), (this._id = t), (this._renderer = e);
				}
				create(t, e) {
					return new jf(this._id, t, e || {}, this._renderer);
				}
			}
			class jf {
				constructor(t, e, n, i) {
					(this.id = t),
						(this.element = e),
						(this._renderer = i),
						(this.parentPlayer = null),
						(this._started = !1),
						(this.totalTime = 0),
						this._command('create', n);
				}
				_listen(t, e) {
					return this._renderer.listen(this.element, `@@${this.id}:${t}`, e);
				}
				_command(t, ...e) {
					return Bf(this._renderer, this.element, this.id, t, e);
				}
				onDone(t) {
					this._listen('done', t);
				}
				onStart(t) {
					this._listen('start', t);
				}
				onDestroy(t) {
					this._listen('destroy', t);
				}
				init() {
					this._command('init');
				}
				hasStarted() {
					return this._started;
				}
				play() {
					this._command('play'), (this._started = !0);
				}
				pause() {
					this._command('pause');
				}
				restart() {
					this._command('restart');
				}
				finish() {
					this._command('finish');
				}
				destroy() {
					this._command('destroy');
				}
				reset() {
					this._command('reset');
				}
				setPosition(t) {
					this._command('setPosition', t);
				}
				getPosition() {
					return 0;
				}
			}
			function Bf(t, e, n, i, s) {
				return t.setProperty(e, `@@${n}:${i}`, s);
			}
			const zf = '@',
				Vf = '@.disabled';
			let Uf = (() => {
				class t {
					constructor(t, e, n) {
						(this.delegate = t),
							(this.engine = e),
							(this._zone = n),
							(this._currentId = 0),
							(this._microtaskId = 1),
							(this._animationCallbacksBuffer = []),
							(this._rendererCache = new Map()),
							(this._cdRecurDepth = 0),
							(this.promise = Promise.resolve(0)),
							(e.onRemovalComplete = (t, e) => {
								e && e.parentNode(t) && e.removeChild(t.parentNode, t);
							});
					}
					createRenderer(t, e) {
						const n = this.delegate.createRenderer(t, e);
						if (!(t && e && e.data && e.data.animation)) {
							let t = this._rendererCache.get(n);
							return t || ((t = new Hf('', n, this.engine)), this._rendererCache.set(n, t)), t;
						}
						const i = e.id,
							s = e.id + '-' + this._currentId;
						this._currentId++, this.engine.register(s, t);
						const r = e => {
							Array.isArray(e) ? e.forEach(r) : this.engine.registerTrigger(i, s, t, e.name, e);
						};
						return e.data.animation.forEach(r), new $f(this, s, n, this.engine);
					}
					begin() {
						this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
					}
					_scheduleCountTask() {
						this.promise.then(() => {
							this._microtaskId++;
						});
					}
					scheduleListenerCallback(t, e, n) {
						t >= 0 && t < this._microtaskId
							? this._zone.run(() => e(n))
							: (0 == this._animationCallbacksBuffer.length &&
									Promise.resolve(null).then(() => {
										this._zone.run(() => {
											this._animationCallbacksBuffer.forEach(t => {
												const [e, n] = t;
												e(n);
											}),
												(this._animationCallbacksBuffer = []);
										});
									}),
							  this._animationCallbacksBuffer.push([e, n]));
					}
					end() {
						this._cdRecurDepth--,
							0 == this._cdRecurDepth &&
								this._zone.runOutsideAngular(() => {
									this._scheduleCountTask(), this.engine.flush(this._microtaskId);
								}),
							this.delegate.end && this.delegate.end();
					}
					whenRenderingDone() {
						return this.engine.whenRenderingDone();
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(sl), Kt(gf), Kt(xc));
					}),
					(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			class Hf {
				constructor(t, e, n) {
					(this.namespaceId = t),
						(this.delegate = e),
						(this.engine = n),
						(this.destroyNode = this.delegate.destroyNode ? t => e.destroyNode(t) : null);
				}
				get data() {
					return this.delegate.data;
				}
				destroy() {
					this.engine.destroy(this.namespaceId, this.delegate), this.delegate.destroy();
				}
				createElement(t, e) {
					return this.delegate.createElement(t, e);
				}
				createComment(t) {
					return this.delegate.createComment(t);
				}
				createText(t) {
					return this.delegate.createText(t);
				}
				appendChild(t, e) {
					this.delegate.appendChild(t, e), this.engine.onInsert(this.namespaceId, e, t, !1);
				}
				insertBefore(t, e, n) {
					this.delegate.insertBefore(t, e, n), this.engine.onInsert(this.namespaceId, e, t, !0);
				}
				removeChild(t, e, n) {
					this.engine.onRemove(this.namespaceId, e, this.delegate, n);
				}
				selectRootElement(t, e) {
					return this.delegate.selectRootElement(t, e);
				}
				parentNode(t) {
					return this.delegate.parentNode(t);
				}
				nextSibling(t) {
					return this.delegate.nextSibling(t);
				}
				setAttribute(t, e, n, i) {
					this.delegate.setAttribute(t, e, n, i);
				}
				removeAttribute(t, e, n) {
					this.delegate.removeAttribute(t, e, n);
				}
				addClass(t, e) {
					this.delegate.addClass(t, e);
				}
				removeClass(t, e) {
					this.delegate.removeClass(t, e);
				}
				setStyle(t, e, n, i) {
					this.delegate.setStyle(t, e, n, i);
				}
				removeStyle(t, e, n) {
					this.delegate.removeStyle(t, e, n);
				}
				setProperty(t, e, n) {
					e.charAt(0) == zf && e == Vf ? this.disableAnimations(t, !!n) : this.delegate.setProperty(t, e, n);
				}
				setValue(t, e) {
					this.delegate.setValue(t, e);
				}
				listen(t, e, n) {
					return this.delegate.listen(t, e, n);
				}
				disableAnimations(t, e) {
					this.engine.disableAnimations(t, e);
				}
			}
			class $f extends Hf {
				constructor(t, e, n, i) {
					super(e, n, i), (this.factory = t), (this.namespaceId = e);
				}
				setProperty(t, e, n) {
					e.charAt(0) == zf
						? '.' == e.charAt(1) && e == Vf
							? this.disableAnimations(t, (n = void 0 === n || !!n))
							: this.engine.process(this.namespaceId, t, e.substr(1), n)
						: this.delegate.setProperty(t, e, n);
				}
				listen(t, e, n) {
					if (e.charAt(0) == zf) {
						const i = (function (t) {
							switch (t) {
								case 'body':
									return document.body;
								case 'document':
									return document;
								case 'window':
									return window;
								default:
									return t;
							}
						})(t);
						let s = e.substr(1),
							r = '';
						return (
							s.charAt(0) != zf &&
								([s, r] = (function (t) {
									const e = t.indexOf('.');
									return [t.substring(0, e), t.substr(e + 1)];
								})(s)),
							this.engine.listen(this.namespaceId, i, s, r, t => {
								this.factory.scheduleListenerCallback(t._data || -1, n, t);
							})
						);
					}
					return this.delegate.listen(t, e, n);
				}
			}
			let qf = (() => {
				class t extends gf {
					constructor(t, e, n) {
						super(t.body, e, n);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(Jc), Kt(Ud), Kt(jp));
					}),
					(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const Wf = new Bt('AnimationModuleType'),
				Qf = [
					{
						provide: Ud,
						useFactory: function () {
							return 'function' == typeof Df() ? new Nf() : new Pf();
						},
					},
					{ provide: Wf, useValue: 'BrowserAnimations' },
					{ provide: hd, useClass: Mf },
					{
						provide: jp,
						useFactory: function () {
							return new Bp();
						},
					},
					{ provide: gf, useClass: qf },
					{
						provide: sl,
						useFactory: function (t, e, n) {
							return new Uf(t, e, n);
						},
						deps: [$u, gf, xc],
					},
				];
			let Zf = (() => {
				class t {}
				return (
					(t.ɵmod = be({ type: t })),
					(t.ɵinj = dt({
						factory: function (e) {
							return new (e || t)();
						},
						providers: Qf,
						imports: [rh],
					})),
					t
				);
			})();
			const Gf = new al('10.2.6'),
				Kf = new Bt('mat-sanity-checks', {
					providedIn: 'root',
					factory: function () {
						return !0;
					},
				});
			let Yf,
				Xf = (() => {
					class t {
						constructor(t, e, n) {
							(this._hasDoneGlobalChecks = !1),
								(this._document = n),
								t._applyBodyHighContrastModeCssClasses(),
								(this._sanityChecks = e),
								this._hasDoneGlobalChecks ||
									(this._checkDoctypeIsDefined(),
									this._checkThemeIsPresent(),
									this._checkCdkVersionMatch(),
									(this._hasDoneGlobalChecks = !0));
						}
						_getDocument() {
							const t = this._document || document;
							return 'object' == typeof t && t ? t : null;
						}
						_getWindow() {
							const t = this._getDocument(),
								e = (null == t ? void 0 : t.defaultView) || window;
							return 'object' == typeof e && e ? e : null;
						}
						_checksAreEnabled() {
							return Ri() && !this._isTestEnv();
						}
						_isTestEnv() {
							const t = this._getWindow();
							return t && (t.__karma__ || t.jasmine);
						}
						_checkDoctypeIsDefined() {
							const t =
									this._checksAreEnabled() &&
									(!0 === this._sanityChecks || this._sanityChecks.doctype),
								e = this._getDocument();
							t &&
								e &&
								!e.doctype &&
								console.warn(
									'Current document does not have a doctype. This may cause some Angular Material components not to behave as expected.'
								);
						}
						_checkThemeIsPresent() {
							const t =
									!this._checksAreEnabled() || !1 === this._sanityChecks || !this._sanityChecks.theme,
								e = this._getDocument();
							if (t || !e || !e.body || 'function' != typeof getComputedStyle) return;
							const n = e.createElement('div');
							n.classList.add('mat-theme-loaded-marker'), e.body.appendChild(n);
							const i = getComputedStyle(n);
							i &&
								'none' !== i.display &&
								console.warn(
									'Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming'
								),
								e.body.removeChild(n);
						}
						_checkCdkVersionMatch() {
							this._checksAreEnabled() &&
								(!0 === this._sanityChecks || this._sanityChecks.version) &&
								Gf.full !== ad.full &&
								console.warn(
									'The Angular Material version (' +
										Gf.full +
										') does not match the Angular CDK version (' +
										ad.full +
										').\nPlease ensure the versions of these two packages exactly match.'
								);
						}
					}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)(Kt(nd), Kt(Kf, 8), Kt(Jc, 8));
							},
							imports: [[od], od],
						})),
						t
					);
				})();
			function Jf(t) {
				return class extends t {
					constructor(...t) {
						super(...t), (this._disabled = !1);
					}
					get disabled() {
						return this._disabled;
					}
					set disabled(t) {
						this._disabled = Mh(t);
					}
				};
			}
			function tm(t, e) {
				return class extends t {
					constructor(...t) {
						super(...t), (this.defaultColor = e), (this.color = e);
					}
					get color() {
						return this._color;
					}
					set color(t) {
						const e = t || this.defaultColor;
						e !== this._color &&
							(this._color && this._elementRef.nativeElement.classList.remove('mat-' + this._color),
							e && this._elementRef.nativeElement.classList.add('mat-' + e),
							(this._color = e));
					}
				};
			}
			function em(t) {
				return class extends t {
					constructor(...t) {
						super(...t), (this._disableRipple = !1);
					}
					get disableRipple() {
						return this._disableRipple;
					}
					set disableRipple(t) {
						this._disableRipple = Mh(t);
					}
				};
			}
			try {
				Yf = 'undefined' != typeof Intl;
			} catch (nE) {
				Yf = !1;
			}
			let nm = (() => {
				class t {}
				return (
					(t.ɵmod = be({ type: t })),
					(t.ɵinj = dt({
						factory: function (e) {
							return new (e || t)();
						},
						imports: [[Xf], Xf],
					})),
					t
				);
			})();
			class im {
				constructor(t, e, n) {
					(this._renderer = t), (this.element = e), (this.config = n), (this.state = 3);
				}
				fadeOut() {
					this._renderer.fadeOutRipple(this);
				}
			}
			const sm = { enterDuration: 450, exitDuration: 400 },
				rm = dh({ passive: !0 }),
				om = ['mousedown', 'touchstart'],
				am = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];
			class lm {
				constructor(t, e, n, i) {
					(this._target = t),
						(this._ngZone = e),
						(this._isPointerDown = !1),
						(this._activeRipples = new Set()),
						(this._pointerUpEventsRegistered = !1),
						i.isBrowser && (this._containerElement = zh(n));
				}
				fadeInRipple(t, e, n = {}) {
					const i = (this._containerRect =
							this._containerRect || this._containerElement.getBoundingClientRect()),
						s = Object.assign(Object.assign({}, sm), n.animation);
					n.centered && ((t = i.left + i.width / 2), (e = i.top + i.height / 2));
					const r =
							n.radius ||
							(function (t, e, n) {
								const i = Math.max(Math.abs(t - n.left), Math.abs(t - n.right)),
									s = Math.max(Math.abs(e - n.top), Math.abs(e - n.bottom));
								return Math.sqrt(i * i + s * s);
							})(t, e, i),
						o = t - i.left,
						a = e - i.top,
						l = s.enterDuration,
						c = document.createElement('div');
					c.classList.add('mat-ripple-element'),
						(c.style.left = o - r + 'px'),
						(c.style.top = a - r + 'px'),
						(c.style.height = 2 * r + 'px'),
						(c.style.width = 2 * r + 'px'),
						null != n.color && (c.style.backgroundColor = n.color),
						(c.style.transitionDuration = l + 'ms'),
						this._containerElement.appendChild(c),
						window.getComputedStyle(c).getPropertyValue('opacity'),
						(c.style.transform = 'scale(1)');
					const u = new im(this, c, n);
					return (
						(u.state = 0),
						this._activeRipples.add(u),
						n.persistent || (this._mostRecentTransientRipple = u),
						this._runTimeoutOutsideZone(() => {
							const t = u === this._mostRecentTransientRipple;
							(u.state = 1), n.persistent || (t && this._isPointerDown) || u.fadeOut();
						}, l),
						u
					);
				}
				fadeOutRipple(t) {
					const e = this._activeRipples.delete(t);
					if (
						(t === this._mostRecentTransientRipple && (this._mostRecentTransientRipple = null),
						this._activeRipples.size || (this._containerRect = null),
						!e)
					)
						return;
					const n = t.element,
						i = Object.assign(Object.assign({}, sm), t.config.animation);
					(n.style.transitionDuration = i.exitDuration + 'ms'),
						(n.style.opacity = '0'),
						(t.state = 2),
						this._runTimeoutOutsideZone(() => {
							(t.state = 3), n.parentNode.removeChild(n);
						}, i.exitDuration);
				}
				fadeOutAll() {
					this._activeRipples.forEach(t => t.fadeOut());
				}
				setupTriggerEvents(t) {
					const e = zh(t);
					e &&
						e !== this._triggerElement &&
						(this._removeTriggerEvents(), (this._triggerElement = e), this._registerEvents(om));
				}
				handleEvent(t) {
					'mousedown' === t.type
						? this._onMousedown(t)
						: 'touchstart' === t.type
						? this._onTouchStart(t)
						: this._onPointerUp(),
						this._pointerUpEventsRegistered ||
							(this._registerEvents(am), (this._pointerUpEventsRegistered = !0));
				}
				_onMousedown(t) {
					const e = Zh(t),
						n = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + 800;
					this._target.rippleDisabled ||
						e ||
						n ||
						((this._isPointerDown = !0),
						this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
				}
				_onTouchStart(t) {
					if (!this._target.rippleDisabled) {
						(this._lastTouchStartEvent = Date.now()), (this._isPointerDown = !0);
						const e = t.changedTouches;
						for (let t = 0; t < e.length; t++)
							this.fadeInRipple(e[t].clientX, e[t].clientY, this._target.rippleConfig);
					}
				}
				_onPointerUp() {
					this._isPointerDown &&
						((this._isPointerDown = !1),
						this._activeRipples.forEach(t => {
							!t.config.persistent &&
								(1 === t.state || (t.config.terminateOnPointerUp && 0 === t.state)) &&
								t.fadeOut();
						}));
				}
				_runTimeoutOutsideZone(t, e = 0) {
					this._ngZone.runOutsideAngular(() => setTimeout(t, e));
				}
				_registerEvents(t) {
					this._ngZone.runOutsideAngular(() => {
						t.forEach(t => {
							this._triggerElement.addEventListener(t, this, rm);
						});
					});
				}
				_removeTriggerEvents() {
					this._triggerElement &&
						(om.forEach(t => {
							this._triggerElement.removeEventListener(t, this, rm);
						}),
						this._pointerUpEventsRegistered &&
							am.forEach(t => {
								this._triggerElement.removeEventListener(t, this, rm);
							}));
				}
			}
			const cm = new Bt('mat-ripple-global-options');
			let um = (() => {
					class t {
						constructor(t, e, n, i, s) {
							(this._elementRef = t),
								(this._animationMode = s),
								(this.radius = 0),
								(this._disabled = !1),
								(this._isInitialized = !1),
								(this._globalOptions = i || {}),
								(this._rippleRenderer = new lm(this, e, t, n));
						}
						get disabled() {
							return this._disabled;
						}
						set disabled(t) {
							(this._disabled = t), this._setupTriggerEventsIfEnabled();
						}
						get trigger() {
							return this._trigger || this._elementRef.nativeElement;
						}
						set trigger(t) {
							(this._trigger = t), this._setupTriggerEventsIfEnabled();
						}
						ngOnInit() {
							(this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
						}
						ngOnDestroy() {
							this._rippleRenderer._removeTriggerEvents();
						}
						fadeOutAll() {
							this._rippleRenderer.fadeOutAll();
						}
						get rippleConfig() {
							return {
								centered: this.centered,
								radius: this.radius,
								color: this.color,
								animation: Object.assign(
									Object.assign(
										Object.assign({}, this._globalOptions.animation),
										'NoopAnimations' === this._animationMode
											? { enterDuration: 0, exitDuration: 0 }
											: {}
									),
									this.animation
								),
								terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
							};
						}
						get rippleDisabled() {
							return this.disabled || !!this._globalOptions.disabled;
						}
						_setupTriggerEventsIfEnabled() {
							!this.disabled &&
								this._isInitialized &&
								this._rippleRenderer.setupTriggerEvents(this.trigger);
						}
						launch(t, e = 0, n) {
							return 'number' == typeof t
								? this._rippleRenderer.fadeInRipple(
										t,
										e,
										Object.assign(Object.assign({}, this.rippleConfig), n)
								  )
								: this._rippleRenderer.fadeInRipple(
										0,
										0,
										Object.assign(Object.assign({}, this.rippleConfig), t)
								  );
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(To(nl), To(xc), To(uh), To(cm, 8), To(Wf, 8));
						}),
						(t.ɵdir = xe({
							type: t,
							selectors: [
								['', 'mat-ripple', ''],
								['', 'matRipple', ''],
							],
							hostAttrs: [1, 'mat-ripple'],
							hostVars: 2,
							hostBindings: function (t, e) {
								2 & t && Yo('mat-ripple-unbounded', e.unbounded);
							},
							inputs: {
								radius: ['matRippleRadius', 'radius'],
								disabled: ['matRippleDisabled', 'disabled'],
								trigger: ['matRippleTrigger', 'trigger'],
								color: ['matRippleColor', 'color'],
								unbounded: ['matRippleUnbounded', 'unbounded'],
								centered: ['matRippleCentered', 'centered'],
								animation: ['matRippleAnimation', 'animation'],
							},
							exportAs: ['matRipple'],
						})),
						t
					);
				})(),
				hm = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[Xf, hh], Xf],
						})),
						t
					);
				})(),
				dm = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
						})),
						t
					);
				})();
			function pm(t, e) {
				return new _(e ? n => e.schedule(fm, 0, { error: t, subscriber: n }) : e => e.error(t));
			}
			function fm({ error: t, subscriber: e }) {
				e.error(t);
			}
			function mm(t, e) {
				return new _(n => {
					const i = t.length;
					if (0 === i) return void n.complete();
					const s = new Array(i);
					let r = 0,
						o = 0;
					for (let a = 0; a < i; a++) {
						const l = M(t[a]);
						let c = !1;
						n.add(
							l.subscribe({
								next: t => {
									c || ((c = !0), o++), (s[a] = t);
								},
								error: t => n.error(t),
								complete: () => {
									r++,
										(r !== i && c) ||
											(o === i && n.next(e ? e.reduce((t, e, n) => ((t[e] = s[n]), t), {}) : s),
											n.complete());
								},
							})
						);
					}
				});
			}
			function gm(t) {
				return function (e) {
					const n = new ym(t),
						i = e.lift(n);
					return (n.caught = i);
				};
			}
			class ym {
				constructor(t) {
					this.selector = t;
				}
				call(t, e) {
					return e.subscribe(new _m(t, this.selector, this.caught));
				}
			}
			class _m extends j {
				constructor(t, e, n) {
					super(t), (this.selector = e), (this.caught = n);
				}
				error(t) {
					if (!this.isStopped) {
						let n;
						try {
							n = this.selector(t, this.caught);
						} catch (e) {
							return void super.error(e);
						}
						this._unsubscribeAndRecycle();
						const i = new F(this);
						this.add(i);
						const s = B(n, i);
						s !== i && this.add(s);
					}
				}
			}
			function vm(t) {
				return e => e.lift(new bm(t));
			}
			class bm {
				constructor(t) {
					this.callback = t;
				}
				call(t, e) {
					return e.subscribe(new wm(t, this.callback));
				}
			}
			class wm extends f {
				constructor(t, e) {
					super(t), this.add(new h(e));
				}
			}
			function xm(t, e) {
				return z(t, e, 1);
			}
			class Sm {}
			class Em {
				constructor(t) {
					(this.normalizedNames = new Map()),
						(this.lazyUpdate = null),
						t
							? (this.lazyInit =
									'string' == typeof t
										? () => {
												(this.headers = new Map()),
													t.split('\n').forEach(t => {
														const e = t.indexOf(':');
														if (e > 0) {
															const n = t.slice(0, e),
																i = n.toLowerCase(),
																s = t.slice(e + 1).trim();
															this.maybeSetNormalizedName(n, i),
																this.headers.has(i)
																	? this.headers.get(i).push(s)
																	: this.headers.set(i, [s]);
														}
													});
										  }
										: () => {
												(this.headers = new Map()),
													Object.keys(t).forEach(e => {
														let n = t[e];
														const i = e.toLowerCase();
														'string' == typeof n && (n = [n]),
															n.length > 0 &&
																(this.headers.set(i, n),
																this.maybeSetNormalizedName(e, i));
													});
										  })
							: (this.headers = new Map());
				}
				has(t) {
					return this.init(), this.headers.has(t.toLowerCase());
				}
				get(t) {
					this.init();
					const e = this.headers.get(t.toLowerCase());
					return e && e.length > 0 ? e[0] : null;
				}
				keys() {
					return this.init(), Array.from(this.normalizedNames.values());
				}
				getAll(t) {
					return this.init(), this.headers.get(t.toLowerCase()) || null;
				}
				append(t, e) {
					return this.clone({ name: t, value: e, op: 'a' });
				}
				set(t, e) {
					return this.clone({ name: t, value: e, op: 's' });
				}
				delete(t, e) {
					return this.clone({ name: t, value: e, op: 'd' });
				}
				maybeSetNormalizedName(t, e) {
					this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
				}
				init() {
					this.lazyInit &&
						(this.lazyInit instanceof Em ? this.copyFrom(this.lazyInit) : this.lazyInit(),
						(this.lazyInit = null),
						this.lazyUpdate &&
							(this.lazyUpdate.forEach(t => this.applyUpdate(t)), (this.lazyUpdate = null)));
				}
				copyFrom(t) {
					t.init(),
						Array.from(t.headers.keys()).forEach(e => {
							this.headers.set(e, t.headers.get(e)),
								this.normalizedNames.set(e, t.normalizedNames.get(e));
						});
				}
				clone(t) {
					const e = new Em();
					return (
						(e.lazyInit = this.lazyInit && this.lazyInit instanceof Em ? this.lazyInit : this),
						(e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
						e
					);
				}
				applyUpdate(t) {
					const e = t.name.toLowerCase();
					switch (t.op) {
						case 'a':
						case 's':
							let n = t.value;
							if (('string' == typeof n && (n = [n]), 0 === n.length)) return;
							this.maybeSetNormalizedName(t.name, e);
							const i = ('a' === t.op ? this.headers.get(e) : void 0) || [];
							i.push(...n), this.headers.set(e, i);
							break;
						case 'd':
							const s = t.value;
							if (s) {
								let t = this.headers.get(e);
								if (!t) return;
								(t = t.filter(t => -1 === s.indexOf(t))),
									0 === t.length
										? (this.headers.delete(e), this.normalizedNames.delete(e))
										: this.headers.set(e, t);
							} else this.headers.delete(e), this.normalizedNames.delete(e);
					}
				}
				forEach(t) {
					this.init(),
						Array.from(this.normalizedNames.keys()).forEach(e =>
							t(this.normalizedNames.get(e), this.headers.get(e))
						);
				}
			}
			class Cm {
				encodeKey(t) {
					return km(t);
				}
				encodeValue(t) {
					return km(t);
				}
				decodeKey(t) {
					return decodeURIComponent(t);
				}
				decodeValue(t) {
					return decodeURIComponent(t);
				}
			}
			function km(t) {
				return encodeURIComponent(t)
					.replace(/%40/gi, '@')
					.replace(/%3A/gi, ':')
					.replace(/%24/gi, '$')
					.replace(/%2C/gi, ',')
					.replace(/%3B/gi, ';')
					.replace(/%2B/gi, '+')
					.replace(/%3D/gi, '=')
					.replace(/%3F/gi, '?')
					.replace(/%2F/gi, '/');
			}
			class Tm {
				constructor(t = {}) {
					if (
						((this.updates = null),
						(this.cloneFrom = null),
						(this.encoder = t.encoder || new Cm()),
						t.fromString)
					) {
						if (t.fromObject) throw new Error('Cannot specify both fromString and fromObject.');
						this.map = (function (t, e) {
							const n = new Map();
							return (
								t.length > 0 &&
									t.split('&').forEach(t => {
										const i = t.indexOf('='),
											[s, r] =
												-1 == i
													? [e.decodeKey(t), '']
													: [e.decodeKey(t.slice(0, i)), e.decodeValue(t.slice(i + 1))],
											o = n.get(s) || [];
										o.push(r), n.set(s, o);
									}),
								n
							);
						})(t.fromString, this.encoder);
					} else
						t.fromObject
							? ((this.map = new Map()),
							  Object.keys(t.fromObject).forEach(e => {
									const n = t.fromObject[e];
									this.map.set(e, Array.isArray(n) ? n : [n]);
							  }))
							: (this.map = null);
				}
				has(t) {
					return this.init(), this.map.has(t);
				}
				get(t) {
					this.init();
					const e = this.map.get(t);
					return e ? e[0] : null;
				}
				getAll(t) {
					return this.init(), this.map.get(t) || null;
				}
				keys() {
					return this.init(), Array.from(this.map.keys());
				}
				append(t, e) {
					return this.clone({ param: t, value: e, op: 'a' });
				}
				set(t, e) {
					return this.clone({ param: t, value: e, op: 's' });
				}
				delete(t, e) {
					return this.clone({ param: t, value: e, op: 'd' });
				}
				toString() {
					return (
						this.init(),
						this.keys()
							.map(t => {
								const e = this.encoder.encodeKey(t);
								return this.map
									.get(t)
									.map(t => e + '=' + this.encoder.encodeValue(t))
									.join('&');
							})
							.filter(t => '' !== t)
							.join('&')
					);
				}
				clone(t) {
					const e = new Tm({ encoder: this.encoder });
					return (e.cloneFrom = this.cloneFrom || this), (e.updates = (this.updates || []).concat([t])), e;
				}
				init() {
					null === this.map && (this.map = new Map()),
						null !== this.cloneFrom &&
							(this.cloneFrom.init(),
							this.cloneFrom.keys().forEach(t => this.map.set(t, this.cloneFrom.map.get(t))),
							this.updates.forEach(t => {
								switch (t.op) {
									case 'a':
									case 's':
										const e = ('a' === t.op ? this.map.get(t.param) : void 0) || [];
										e.push(t.value), this.map.set(t.param, e);
										break;
									case 'd':
										if (void 0 === t.value) {
											this.map.delete(t.param);
											break;
										}
										{
											let e = this.map.get(t.param) || [];
											const n = e.indexOf(t.value);
											-1 !== n && e.splice(n, 1),
												e.length > 0 ? this.map.set(t.param, e) : this.map.delete(t.param);
										}
								}
							}),
							(this.cloneFrom = this.updates = null));
				}
			}
			function Am(t) {
				return 'undefined' != typeof ArrayBuffer && t instanceof ArrayBuffer;
			}
			function Im(t) {
				return 'undefined' != typeof Blob && t instanceof Blob;
			}
			function Om(t) {
				return 'undefined' != typeof FormData && t instanceof FormData;
			}
			class Rm {
				constructor(t, e, n, i) {
					let s;
					if (
						((this.url = e),
						(this.body = null),
						(this.reportProgress = !1),
						(this.withCredentials = !1),
						(this.responseType = 'json'),
						(this.method = t.toUpperCase()),
						(function (t) {
							switch (t) {
								case 'DELETE':
								case 'GET':
								case 'HEAD':
								case 'OPTIONS':
								case 'JSONP':
									return !1;
								default:
									return !0;
							}
						})(this.method) || i
							? ((this.body = void 0 !== n ? n : null), (s = i))
							: (s = n),
						s &&
							((this.reportProgress = !!s.reportProgress),
							(this.withCredentials = !!s.withCredentials),
							s.responseType && (this.responseType = s.responseType),
							s.headers && (this.headers = s.headers),
							s.params && (this.params = s.params)),
						this.headers || (this.headers = new Em()),
						this.params)
					) {
						const t = this.params.toString();
						if (0 === t.length) this.urlWithParams = e;
						else {
							const n = e.indexOf('?');
							this.urlWithParams = e + (-1 === n ? '?' : n < e.length - 1 ? '&' : '') + t;
						}
					} else (this.params = new Tm()), (this.urlWithParams = e);
				}
				serializeBody() {
					return null === this.body
						? null
						: Am(this.body) || Im(this.body) || Om(this.body) || 'string' == typeof this.body
						? this.body
						: this.body instanceof Tm
						? this.body.toString()
						: 'object' == typeof this.body || 'boolean' == typeof this.body || Array.isArray(this.body)
						? JSON.stringify(this.body)
						: this.body.toString();
				}
				detectContentTypeHeader() {
					return null === this.body || Om(this.body)
						? null
						: Im(this.body)
						? this.body.type || null
						: Am(this.body)
						? null
						: 'string' == typeof this.body
						? 'text/plain'
						: this.body instanceof Tm
						? 'application/x-www-form-urlencoded;charset=UTF-8'
						: 'object' == typeof this.body || 'number' == typeof this.body || Array.isArray(this.body)
						? 'application/json'
						: null;
				}
				clone(t = {}) {
					const e = t.method || this.method,
						n = t.url || this.url,
						i = t.responseType || this.responseType,
						s = void 0 !== t.body ? t.body : this.body,
						r = void 0 !== t.withCredentials ? t.withCredentials : this.withCredentials,
						o = void 0 !== t.reportProgress ? t.reportProgress : this.reportProgress;
					let a = t.headers || this.headers,
						l = t.params || this.params;
					return (
						void 0 !== t.setHeaders &&
							(a = Object.keys(t.setHeaders).reduce((e, n) => e.set(n, t.setHeaders[n]), a)),
						t.setParams && (l = Object.keys(t.setParams).reduce((e, n) => e.set(n, t.setParams[n]), l)),
						new Rm(e, n, s, {
							params: l,
							headers: a,
							reportProgress: o,
							responseType: i,
							withCredentials: r,
						})
					);
				}
			}
			var Pm = (function (t) {
				return (
					(t[(t.Sent = 0)] = 'Sent'),
					(t[(t.UploadProgress = 1)] = 'UploadProgress'),
					(t[(t.ResponseHeader = 2)] = 'ResponseHeader'),
					(t[(t.DownloadProgress = 3)] = 'DownloadProgress'),
					(t[(t.Response = 4)] = 'Response'),
					(t[(t.User = 5)] = 'User'),
					t
				);
			})({});
			class Lm extends class {
				constructor(t, e = 200, n = 'OK') {
					(this.headers = t.headers || new Em()),
						(this.status = void 0 !== t.status ? t.status : e),
						(this.statusText = t.statusText || n),
						(this.url = t.url || null),
						(this.ok = this.status >= 200 && this.status < 300);
				}
			} {
				constructor(t = {}) {
					super(t), (this.type = Pm.Response), (this.body = void 0 !== t.body ? t.body : null);
				}
				clone(t = {}) {
					return new Lm({
						body: void 0 !== t.body ? t.body : this.body,
						headers: t.headers || this.headers,
						status: void 0 !== t.status ? t.status : this.status,
						statusText: t.statusText || this.statusText,
						url: t.url || this.url || void 0,
					});
				}
			}
			function Nm(t, e) {
				return {
					body: e,
					headers: t.headers,
					observe: t.observe,
					params: t.params,
					reportProgress: t.reportProgress,
					responseType: t.responseType,
					withCredentials: t.withCredentials,
				};
			}
			let Dm = (() => {
				class t {
					constructor(t) {
						this.handler = t;
					}
					request(t, e, n = {}) {
						let i;
						if (t instanceof Rm) i = t;
						else {
							let s = void 0;
							s = n.headers instanceof Em ? n.headers : new Em(n.headers);
							let r = void 0;
							n.params && (r = n.params instanceof Tm ? n.params : new Tm({ fromObject: n.params })),
								(i = new Rm(t, e, void 0 !== n.body ? n.body : null, {
									headers: s,
									params: r,
									reportProgress: n.reportProgress,
									responseType: n.responseType || 'json',
									withCredentials: n.withCredentials,
								}));
						}
						const s = fh(i).pipe(xm(t => this.handler.handle(t)));
						if (t instanceof Rm || 'events' === n.observe) return s;
						const r = s.pipe(Th(t => t instanceof Lm));
						switch (n.observe || 'body') {
							case 'body':
								switch (i.responseType) {
									case 'arraybuffer':
										return r.pipe(
											k(t => {
												if (null !== t.body && !(t.body instanceof ArrayBuffer))
													throw new Error('Response is not an ArrayBuffer.');
												return t.body;
											})
										);
									case 'blob':
										return r.pipe(
											k(t => {
												if (null !== t.body && !(t.body instanceof Blob))
													throw new Error('Response is not a Blob.');
												return t.body;
											})
										);
									case 'text':
										return r.pipe(
											k(t => {
												if (null !== t.body && 'string' != typeof t.body)
													throw new Error('Response is not a string.');
												return t.body;
											})
										);
									case 'json':
									default:
										return r.pipe(k(t => t.body));
								}
							case 'response':
								return r;
							default:
								throw new Error(`Unreachable: unhandled observe type ${n.observe}}`);
						}
					}
					delete(t, e = {}) {
						return this.request('DELETE', t, e);
					}
					get(t, e = {}) {
						return this.request('GET', t, e);
					}
					head(t, e = {}) {
						return this.request('HEAD', t, e);
					}
					jsonp(t, e) {
						return this.request('JSONP', t, {
							params: new Tm().append(e, 'JSONP_CALLBACK'),
							observe: 'body',
							responseType: 'json',
						});
					}
					options(t, e = {}) {
						return this.request('OPTIONS', t, e);
					}
					patch(t, e, n = {}) {
						return this.request('PATCH', t, Nm(n, e));
					}
					post(t, e, n = {}) {
						return this.request('POST', t, Nm(n, e));
					}
					put(t, e, n = {}) {
						return this.request('PUT', t, Nm(n, e));
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(Sm));
					}),
					(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const Mm = ['*'];
			function Fm(t) {
				return Error(`Unable to find icon with the name "${t}"`);
			}
			function jm(t) {
				return Error(
					`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`
				);
			}
			function Bm(t) {
				return Error(
					`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`
				);
			}
			class zm {
				constructor(t, e, n) {
					(this.url = t), (this.svgText = e), (this.options = n);
				}
			}
			let Vm = (() => {
				class t {
					constructor(t, e, n, i) {
						(this._httpClient = t),
							(this._sanitizer = e),
							(this._errorHandler = i),
							(this._svgIconConfigs = new Map()),
							(this._iconSetConfigs = new Map()),
							(this._cachedIconsByUrl = new Map()),
							(this._inProgressUrlFetches = new Map()),
							(this._fontCssClassesByAlias = new Map()),
							(this._defaultFontSetClass = 'material-icons'),
							(this._document = n);
					}
					addSvgIcon(t, e, n) {
						return this.addSvgIconInNamespace('', t, e, n);
					}
					addSvgIconLiteral(t, e, n) {
						return this.addSvgIconLiteralInNamespace('', t, e, n);
					}
					addSvgIconInNamespace(t, e, n, i) {
						return this._addSvgIconConfig(t, e, new zm(n, null, i));
					}
					addSvgIconLiteralInNamespace(t, e, n, i) {
						const s = this._sanitizer.sanitize(is.HTML, n);
						if (!s) throw Bm(n);
						return this._addSvgIconConfig(t, e, new zm('', s, i));
					}
					addSvgIconSet(t, e) {
						return this.addSvgIconSetInNamespace('', t, e);
					}
					addSvgIconSetLiteral(t, e) {
						return this.addSvgIconSetLiteralInNamespace('', t, e);
					}
					addSvgIconSetInNamespace(t, e, n) {
						return this._addSvgIconSetConfig(t, new zm(e, null, n));
					}
					addSvgIconSetLiteralInNamespace(t, e, n) {
						const i = this._sanitizer.sanitize(is.HTML, e);
						if (!i) throw Bm(e);
						return this._addSvgIconSetConfig(t, new zm('', i, n));
					}
					registerFontClassAlias(t, e = t) {
						return this._fontCssClassesByAlias.set(t, e), this;
					}
					classNameForFontAlias(t) {
						return this._fontCssClassesByAlias.get(t) || t;
					}
					setDefaultFontSetClass(t) {
						return (this._defaultFontSetClass = t), this;
					}
					getDefaultFontSetClass() {
						return this._defaultFontSetClass;
					}
					getSvgIconFromUrl(t) {
						const e = this._sanitizer.sanitize(is.RESOURCE_URL, t);
						if (!e) throw jm(t);
						const n = this._cachedIconsByUrl.get(e);
						return n
							? fh(Um(n))
							: this._loadSvgIconFromConfig(new zm(t, null)).pipe(
									gh(t => this._cachedIconsByUrl.set(e, t)),
									k(t => Um(t))
							  );
					}
					getNamedSvgIcon(t, e = '') {
						const n = Hm(e, t),
							i = this._svgIconConfigs.get(n);
						if (i) return this._getSvgFromConfig(i);
						const s = this._iconSetConfigs.get(e);
						return s ? this._getSvgFromIconSetConfigs(t, s) : pm(Fm(n));
					}
					ngOnDestroy() {
						this._svgIconConfigs.clear(), this._iconSetConfigs.clear(), this._cachedIconsByUrl.clear();
					}
					_getSvgFromConfig(t) {
						return t.svgText
							? fh(Um(this._svgElementFromConfig(t)))
							: this._loadSvgIconFromConfig(t).pipe(k(t => Um(t)));
					}
					_getSvgFromIconSetConfigs(t, e) {
						const n = this._extractIconWithNameFromAnySet(t, e);
						return n
							? fh(n)
							: (function (...t) {
									if (1 === t.length) {
										const e = t[0];
										if (l(e)) return mm(e, null);
										if (c(e) && Object.getPrototypeOf(e) === Object.prototype) {
											const t = Object.keys(e);
											return mm(
												t.map(t => e[t]),
												t
											);
										}
									}
									if ('function' == typeof t[t.length - 1]) {
										const e = t.pop();
										return mm((t = 1 === t.length && l(t[0]) ? t[0] : t), null).pipe(
											k(t => e(...t))
										);
									}
									return mm(t, null);
							  })(
									e
										.filter(t => !t.svgText)
										.map(t =>
											this._loadSvgIconSetFromConfig(t).pipe(
												gm(e => {
													const n = this._sanitizer.sanitize(is.RESOURCE_URL, t.url);
													return (
														this._errorHandler.handleError(
															new Error(`Loading icon set URL: ${n} failed: ${e.message}`)
														),
														fh(null)
													);
												})
											)
										)
							  ).pipe(
									k(() => {
										const n = this._extractIconWithNameFromAnySet(t, e);
										if (!n) throw Fm(t);
										return n;
									})
							  );
					}
					_extractIconWithNameFromAnySet(t, e) {
						for (let n = e.length - 1; n >= 0; n--) {
							const i = e[n];
							if (i.svgText && i.svgText.indexOf(t) > -1) {
								const e = this._svgElementFromConfig(i),
									n = this._extractSvgIconFromSet(e, t, i.options);
								if (n) return n;
							}
						}
						return null;
					}
					_loadSvgIconFromConfig(t) {
						return this._fetchIcon(t).pipe(
							gh(e => (t.svgText = e)),
							k(() => this._svgElementFromConfig(t))
						);
					}
					_loadSvgIconSetFromConfig(t) {
						return t.svgText ? fh(null) : this._fetchIcon(t).pipe(gh(e => (t.svgText = e)));
					}
					_extractSvgIconFromSet(t, e, n) {
						const i = t.querySelector(`[id="${e}"]`);
						if (!i) return null;
						const s = i.cloneNode(!0);
						if ((s.removeAttribute('id'), 'svg' === s.nodeName.toLowerCase()))
							return this._setSvgAttributes(s, n);
						if ('symbol' === s.nodeName.toLowerCase())
							return this._setSvgAttributes(this._toSvgElement(s), n);
						const r = this._svgElementFromString('<svg></svg>');
						return r.appendChild(s), this._setSvgAttributes(r, n);
					}
					_svgElementFromString(t) {
						const e = this._document.createElement('DIV');
						e.innerHTML = t;
						const n = e.querySelector('svg');
						if (!n) throw Error('<svg> tag not found');
						return n;
					}
					_toSvgElement(t) {
						const e = this._svgElementFromString('<svg></svg>'),
							n = t.attributes;
						for (let i = 0; i < n.length; i++) {
							const { name: t, value: s } = n[i];
							'id' !== t && e.setAttribute(t, s);
						}
						for (let i = 0; i < t.childNodes.length; i++)
							t.childNodes[i].nodeType === this._document.ELEMENT_NODE &&
								e.appendChild(t.childNodes[i].cloneNode(!0));
						return e;
					}
					_setSvgAttributes(t, e) {
						return (
							t.setAttribute('fit', ''),
							t.setAttribute('height', '100%'),
							t.setAttribute('width', '100%'),
							t.setAttribute('preserveAspectRatio', 'xMidYMid meet'),
							t.setAttribute('focusable', 'false'),
							e && e.viewBox && t.setAttribute('viewBox', e.viewBox),
							t
						);
					}
					_fetchIcon(t) {
						var e;
						const { url: n, options: i } = t,
							s = null !== (e = null == i ? void 0 : i.withCredentials) && void 0 !== e && e;
						if (!this._httpClient)
							throw Error(
								'Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports.'
							);
						if (null == n) throw Error(`Cannot fetch icon from URL "${n}".`);
						const r = this._sanitizer.sanitize(is.RESOURCE_URL, n);
						if (!r) throw jm(n);
						const o = this._inProgressUrlFetches.get(r);
						if (o) return o;
						const a = this._httpClient.get(r, { responseType: 'text', withCredentials: s }).pipe(
							vm(() => this._inProgressUrlFetches.delete(r)),
							tt()
						);
						return this._inProgressUrlFetches.set(r, a), a;
					}
					_addSvgIconConfig(t, e, n) {
						return this._svgIconConfigs.set(Hm(t, e), n), this;
					}
					_addSvgIconSetConfig(t, e) {
						const n = this._iconSetConfigs.get(t);
						return n ? n.push(e) : this._iconSetConfigs.set(t, [e]), this;
					}
					_svgElementFromConfig(t) {
						if (!t.svgElement) {
							const e = this._svgElementFromString(t.svgText);
							this._setSvgAttributes(e, t.options), (t.svgElement = e);
						}
						return t.svgElement;
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(Dm, 8), Kt(th), Kt(Jc, 8), Kt(vi));
					}),
					(t.ɵprov = ht({
						factory: function () {
							return new t(Kt(Dm, 8), Kt(th), Kt(Jc, 8), Kt(vi));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			function Um(t) {
				return t.cloneNode(!0);
			}
			function Hm(t, e) {
				return t + ':' + e;
			}
			class $m {
				constructor(t) {
					this._elementRef = t;
				}
			}
			const qm = tm($m),
				Wm = new Bt('mat-icon-location', {
					providedIn: 'root',
					factory: function () {
						const t = Yt(Jc),
							e = t ? t.location : null;
						return { getPathname: () => (e ? e.pathname + e.search : '') };
					},
				}),
				Qm = [
					'clip-path',
					'color-profile',
					'src',
					'cursor',
					'fill',
					'filter',
					'marker',
					'marker-start',
					'marker-mid',
					'marker-end',
					'mask',
					'stroke',
				],
				Zm = Qm.map(t => `[${t}]`).join(', '),
				Gm = /^url\(['"]?#(.*?)['"]?\)$/;
			let Km = (() => {
					class t extends qm {
						constructor(t, e, n, i, s) {
							super(t),
								(this._iconRegistry = e),
								(this._location = i),
								(this._errorHandler = s),
								(this._inline = !1),
								(this._currentIconFetch = h.EMPTY),
								n || t.nativeElement.setAttribute('aria-hidden', 'true');
						}
						get inline() {
							return this._inline;
						}
						set inline(t) {
							this._inline = Mh(t);
						}
						get fontSet() {
							return this._fontSet;
						}
						set fontSet(t) {
							this._fontSet = this._cleanupFontValue(t);
						}
						get fontIcon() {
							return this._fontIcon;
						}
						set fontIcon(t) {
							this._fontIcon = this._cleanupFontValue(t);
						}
						_splitIconName(t) {
							if (!t) return ['', ''];
							const e = t.split(':');
							switch (e.length) {
								case 1:
									return ['', e[0]];
								case 2:
									return e;
								default:
									throw Error(`Invalid icon name: "${t}"`);
							}
						}
						ngOnChanges(t) {
							const e = t.svgIcon;
							if (((this._svgNamespace = null), (this._svgName = null), e))
								if ((this._currentIconFetch.unsubscribe(), this.svgIcon)) {
									const [t, e] = this._splitIconName(this.svgIcon);
									t && (this._svgNamespace = t),
										e && (this._svgName = e),
										(this._currentIconFetch = this._iconRegistry
											.getNamedSvgIcon(e, t)
											.pipe(Lh(1))
											.subscribe(
												t => this._setSvgElement(t),
												n => {
													this._errorHandler.handleError(
														new Error(`Error retrieving icon ${t}:${e}! ${n.message}`)
													);
												}
											));
								} else e.previousValue && this._clearSvgElement();
							this._usingFontIcon() && this._updateFontIconClasses();
						}
						ngOnInit() {
							this._usingFontIcon() && this._updateFontIconClasses();
						}
						ngAfterViewChecked() {
							const t = this._elementsWithExternalReferences;
							if (t && t.size) {
								const t = this._location.getPathname();
								t !== this._previousPath &&
									((this._previousPath = t), this._prependPathToReferences(t));
							}
						}
						ngOnDestroy() {
							this._currentIconFetch.unsubscribe(),
								this._elementsWithExternalReferences && this._elementsWithExternalReferences.clear();
						}
						_usingFontIcon() {
							return !this.svgIcon;
						}
						_setSvgElement(t) {
							this._clearSvgElement();
							const e = t.querySelectorAll('style');
							for (let i = 0; i < e.length; i++) e[i].textContent += ' ';
							const n = this._location.getPathname();
							(this._previousPath = n),
								this._cacheChildrenWithExternalReferences(t),
								this._prependPathToReferences(n),
								this._elementRef.nativeElement.appendChild(t);
						}
						_clearSvgElement() {
							const t = this._elementRef.nativeElement;
							let e = t.childNodes.length;
							for (
								this._elementsWithExternalReferences && this._elementsWithExternalReferences.clear();
								e--;

							) {
								const n = t.childNodes[e];
								(1 === n.nodeType && 'svg' !== n.nodeName.toLowerCase()) || t.removeChild(n);
							}
						}
						_updateFontIconClasses() {
							if (!this._usingFontIcon()) return;
							const t = this._elementRef.nativeElement,
								e = this.fontSet
									? this._iconRegistry.classNameForFontAlias(this.fontSet)
									: this._iconRegistry.getDefaultFontSetClass();
							e != this._previousFontSetClass &&
								(this._previousFontSetClass && t.classList.remove(this._previousFontSetClass),
								e && t.classList.add(e),
								(this._previousFontSetClass = e)),
								this.fontIcon != this._previousFontIconClass &&
									(this._previousFontIconClass && t.classList.remove(this._previousFontIconClass),
									this.fontIcon && t.classList.add(this.fontIcon),
									(this._previousFontIconClass = this.fontIcon));
						}
						_cleanupFontValue(t) {
							return 'string' == typeof t ? t.trim().split(' ')[0] : t;
						}
						_prependPathToReferences(t) {
							const e = this._elementsWithExternalReferences;
							e &&
								e.forEach((e, n) => {
									e.forEach(e => {
										n.setAttribute(e.name, `url('${t}#${e.value}')`);
									});
								});
						}
						_cacheChildrenWithExternalReferences(t) {
							const e = t.querySelectorAll(Zm),
								n = (this._elementsWithExternalReferences =
									this._elementsWithExternalReferences || new Map());
							for (let i = 0; i < e.length; i++)
								Qm.forEach(t => {
									const s = e[i],
										r = s.getAttribute(t),
										o = r ? r.match(Gm) : null;
									if (o) {
										let e = n.get(s);
										e || ((e = []), n.set(s, e)), e.push({ name: t, value: o[1] });
									}
								});
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(To(nl), To(Vm), Ao('aria-hidden'), To(Wm), To(vi));
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [['mat-icon']],
							hostAttrs: ['role', 'img', 1, 'mat-icon', 'notranslate'],
							hostVars: 7,
							hostBindings: function (t, e) {
								2 & t &&
									(Co('data-mat-icon-type', e._usingFontIcon() ? 'font' : 'svg')(
										'data-mat-icon-name',
										e._svgName || e.fontIcon
									)('data-mat-icon-namespace', e._svgNamespace || e.fontSet),
									Yo('mat-icon-inline', e.inline)(
										'mat-icon-no-color',
										'primary' !== e.color && 'accent' !== e.color && 'warn' !== e.color
									));
							},
							inputs: {
								color: 'color',
								inline: 'inline',
								fontSet: 'fontSet',
								fontIcon: 'fontIcon',
								svgIcon: 'svgIcon',
							},
							exportAs: ['matIcon'],
							features: [mo, Me],
							ngContentSelectors: Mm,
							decls: 1,
							vars: 0,
							template: function (t, e) {
								1 & t && (Ho(), Wo(0));
							},
							styles: [
								'.mat-icon{background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}\n',
							],
							encapsulation: 2,
							changeDetection: 0,
						})),
						t
					);
				})(),
				Ym = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[Xf], Xf],
						})),
						t
					);
				})(),
				Xm = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[Xf], Xf],
						})),
						t
					);
				})();
			const Jm = ['mat-button', ''],
				tg = ['*'],
				eg =
					'.mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:block;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}.cdk-high-contrast-active .mat-button-base.cdk-keyboard-focused,.cdk-high-contrast-active .mat-button-base.cdk-program-focused{outline:solid 3px}\n',
				ng = [
					'mat-button',
					'mat-flat-button',
					'mat-icon-button',
					'mat-raised-button',
					'mat-stroked-button',
					'mat-mini-fab',
					'mat-fab',
				];
			class ig {
				constructor(t) {
					this._elementRef = t;
				}
			}
			const sg = tm(Jf(em(ig)));
			let rg = (() => {
					class t extends sg {
						constructor(t, e, n) {
							super(t),
								(this._focusMonitor = e),
								(this._animationMode = n),
								(this.isRoundButton = this._hasHostAttributes('mat-fab', 'mat-mini-fab')),
								(this.isIconButton = this._hasHostAttributes('mat-icon-button'));
							for (const i of ng) this._hasHostAttributes(i) && this._getHostElement().classList.add(i);
							t.nativeElement.classList.add('mat-button-base'),
								this.isRoundButton && (this.color = 'accent');
						}
						ngAfterViewInit() {
							this._focusMonitor.monitor(this._elementRef, !0);
						}
						ngOnDestroy() {
							this._focusMonitor.stopMonitoring(this._elementRef);
						}
						focus(t = 'program', e) {
							this._focusMonitor.focusVia(this._getHostElement(), t, e);
						}
						_getHostElement() {
							return this._elementRef.nativeElement;
						}
						_isRippleDisabled() {
							return this.disableRipple || this.disabled;
						}
						_hasHostAttributes(...t) {
							return t.some(t => this._getHostElement().hasAttribute(t));
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(To(nl), To(Yh), To(Wf, 8));
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [
								['button', 'mat-button', ''],
								['button', 'mat-raised-button', ''],
								['button', 'mat-icon-button', ''],
								['button', 'mat-fab', ''],
								['button', 'mat-mini-fab', ''],
								['button', 'mat-stroked-button', ''],
								['button', 'mat-flat-button', ''],
							],
							viewQuery: function (t, e) {
								var n;
								1 & t && Gl(um, !0), 2 & t && Zl((n = Yl())) && (e.ripple = n.first);
							},
							hostAttrs: [1, 'mat-focus-indicator'],
							hostVars: 5,
							hostBindings: function (t, e) {
								2 & t &&
									(Co('disabled', e.disabled || null),
									Yo('_mat-animation-noopable', 'NoopAnimations' === e._animationMode)(
										'mat-button-disabled',
										e.disabled
									));
							},
							inputs: { disabled: 'disabled', disableRipple: 'disableRipple', color: 'color' },
							exportAs: ['matButton'],
							features: [mo],
							attrs: Jm,
							ngContentSelectors: tg,
							decls: 4,
							vars: 5,
							consts: [
								[1, 'mat-button-wrapper'],
								[
									'matRipple',
									'',
									1,
									'mat-button-ripple',
									3,
									'matRippleDisabled',
									'matRippleCentered',
									'matRippleTrigger',
								],
								[1, 'mat-button-focus-overlay'],
							],
							template: function (t, e) {
								1 & t && (Ho(), Ro(0, 'span', 0), Wo(1), Po(), Lo(2, 'span', 1), Lo(3, 'span', 2)),
									2 & t &&
										(Ss(2),
										Yo('mat-button-ripple-round', e.isRoundButton || e.isIconButton),
										Io('matRippleDisabled', e._isRippleDisabled())(
											'matRippleCentered',
											e.isIconButton
										)('matRippleTrigger', e._getHostElement()));
							},
							directives: [um],
							styles: [eg],
							encapsulation: 2,
							changeDetection: 0,
						})),
						t
					);
				})(),
				og = (() => {
					class t extends rg {
						constructor(t, e, n) {
							super(e, t, n);
						}
						_haltDisabledEvents(t) {
							this.disabled && (t.preventDefault(), t.stopImmediatePropagation());
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(To(Yh), To(nl), To(Wf, 8));
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [
								['a', 'mat-button', ''],
								['a', 'mat-raised-button', ''],
								['a', 'mat-icon-button', ''],
								['a', 'mat-fab', ''],
								['a', 'mat-mini-fab', ''],
								['a', 'mat-stroked-button', ''],
								['a', 'mat-flat-button', ''],
							],
							hostAttrs: [1, 'mat-focus-indicator'],
							hostVars: 7,
							hostBindings: function (t, e) {
								1 & t &&
									Mo('click', function (t) {
										return e._haltDisabledEvents(t);
									}),
									2 & t &&
										(Co('tabindex', e.disabled ? -1 : e.tabIndex || 0)(
											'disabled',
											e.disabled || null
										)('aria-disabled', e.disabled.toString()),
										Yo('_mat-animation-noopable', 'NoopAnimations' === e._animationMode)(
											'mat-button-disabled',
											e.disabled
										));
							},
							inputs: {
								disabled: 'disabled',
								disableRipple: 'disableRipple',
								color: 'color',
								tabIndex: 'tabIndex',
							},
							exportAs: ['matButton', 'matAnchor'],
							features: [mo],
							attrs: Jm,
							ngContentSelectors: tg,
							decls: 4,
							vars: 5,
							consts: [
								[1, 'mat-button-wrapper'],
								[
									'matRipple',
									'',
									1,
									'mat-button-ripple',
									3,
									'matRippleDisabled',
									'matRippleCentered',
									'matRippleTrigger',
								],
								[1, 'mat-button-focus-overlay'],
							],
							template: function (t, e) {
								1 & t && (Ho(), Ro(0, 'span', 0), Wo(1), Po(), Lo(2, 'span', 1), Lo(3, 'span', 2)),
									2 & t &&
										(Ss(2),
										Yo('mat-button-ripple-round', e.isRoundButton || e.isIconButton),
										Io('matRippleDisabled', e._isRippleDisabled())(
											'matRippleCentered',
											e.isIconButton
										)('matRippleTrigger', e._getHostElement()));
							},
							directives: [um],
							styles: [eg],
							encapsulation: 2,
							changeDetection: 0,
						})),
						t
					);
				})(),
				ag = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[hm, Xf], Xf],
						})),
						t
					);
				})();
			function lg(t) {
				return e => e.lift(new cg(t));
			}
			class cg {
				constructor(t) {
					this.notifier = t;
				}
				call(t, e) {
					const n = new ug(t),
						i = B(this.notifier, new F(n));
					return i && !n.seenValue ? (n.add(i), e.subscribe(n)) : n;
				}
			}
			class ug extends j {
				constructor(t) {
					super(t), (this.seenValue = !1);
				}
				notifyNext() {
					(this.seenValue = !0), this.complete();
				}
				notifyComplete() {}
			}
			let hg = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[Xf], Xf],
						})),
						t
					);
				})(),
				dg = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[nm, hm, Xf, dm, Su], nm, Xf, dm, hg],
						})),
						t
					);
				})();
			class pg extends S {
				constructor(t) {
					super(), (this._value = t);
				}
				get value() {
					return this.getValue();
				}
				_subscribe(t) {
					const e = super._subscribe(t);
					return e && !e.closed && t.next(this._value), e;
				}
				getValue() {
					if (this.hasError) throw this.thrownError;
					if (this.closed) throw new b();
					return this._value;
				}
				next(t) {
					super.next((this._value = t));
				}
			}
			function fg(t, e, n, s) {
				return (
					i(n) && ((s = n), (n = void 0)),
					s
						? fg(t, e, n).pipe(k(t => (l(t) ? s(...t) : s(t))))
						: new _(i => {
								!(function t(e, n, i, s, r) {
									let o;
									if (
										(function (t) {
											return (
												t &&
												'function' == typeof t.addEventListener &&
												'function' == typeof t.removeEventListener
											);
										})(e)
									) {
										const t = e;
										e.addEventListener(n, i, r), (o = () => t.removeEventListener(n, i, r));
									} else if (
										(function (t) {
											return t && 'function' == typeof t.on && 'function' == typeof t.off;
										})(e)
									) {
										const t = e;
										e.on(n, i), (o = () => t.off(n, i));
									} else if (
										(function (t) {
											return (
												t &&
												'function' == typeof t.addListener &&
												'function' == typeof t.removeListener
											);
										})(e)
									) {
										const t = e;
										e.addListener(n, i), (o = () => t.removeListener(n, i));
									} else {
										if (!e || !e.length) throw new TypeError('Invalid event target');
										for (let o = 0, a = e.length; o < a; o++) t(e[o], n, i, s, r);
									}
									s.add(o);
								})(
									t,
									e,
									function (t) {
										i.next(arguments.length > 1 ? Array.prototype.slice.call(arguments) : t);
									},
									i,
									n
								);
						  })
				);
			}
			function mg(t, e) {
				return 'function' == typeof e
					? n => n.pipe(mg((n, i) => M(t(n, i)).pipe(k((t, s) => e(n, t, i, s)))))
					: e => e.lift(new gg(t));
			}
			class gg {
				constructor(t) {
					this.project = t;
				}
				call(t, e) {
					return e.subscribe(new yg(t, this.project));
				}
			}
			class yg extends j {
				constructor(t, e) {
					super(t), (this.project = e), (this.index = 0);
				}
				_next(t) {
					let e;
					const n = this.index++;
					try {
						e = this.project(t, n);
					} catch (i) {
						return void this.destination.error(i);
					}
					this._innerSub(e);
				}
				_innerSub(t) {
					const e = this.innerSubscription;
					e && e.unsubscribe();
					const n = new F(this),
						i = this.destination;
					i.add(n),
						(this.innerSubscription = B(t, n)),
						this.innerSubscription !== n && i.add(this.innerSubscription);
				}
				_complete() {
					const { innerSubscription: t } = this;
					(t && !t.closed) || super._complete(), this.unsubscribe();
				}
				_unsubscribe() {
					this.innerSubscription = void 0;
				}
				notifyComplete() {
					(this.innerSubscription = void 0), this.isStopped && super._complete();
				}
				notifyNext(t) {
					this.destination.next(t);
				}
			}
			const _g = {
					provide: lc,
					useFactory: function (t, e) {
						return () => {
							if (Eu(e)) {
								const e = Array.from(t.querySelectorAll(`[class*=${vg}]`)),
									n = /\bflex-layout-.+?\b/g;
								e.forEach(t => {
									t.classList.contains(vg + 'ssr') && t.parentNode
										? t.parentNode.removeChild(t)
										: t.className.replace(n, '');
								});
							}
						};
					},
					deps: [Jc, ac],
					multi: !0,
				},
				vg = 'flex-layout-';
			let bg = (() => {
				class t {}
				return (
					(t.ɵmod = be({ type: t })),
					(t.ɵinj = dt({
						factory: function (e) {
							return new (e || t)();
						},
						providers: [_g],
					})),
					t
				);
			})();
			class wg {
				constructor(t = !1, e = 'all', n = '', i = '', s = 0) {
					(this.matches = t),
						(this.mediaQuery = e),
						(this.mqAlias = n),
						(this.suffix = i),
						(this.priority = s),
						(this.property = '');
				}
				clone() {
					return new wg(this.matches, this.mediaQuery, this.mqAlias, this.suffix);
				}
			}
			let xg = (() => {
				class t {
					constructor() {
						this.stylesheet = new Map();
					}
					addStyleToElement(t, e, n) {
						const i = this.stylesheet.get(t);
						i ? i.set(e, n) : this.stylesheet.set(t, new Map([[e, n]]));
					}
					clearStyles() {
						this.stylesheet.clear();
					}
					getStyleForElement(t, e) {
						const n = this.stylesheet.get(t);
						let i = '';
						if (n) {
							const t = n.get(e);
							('number' != typeof t && 'string' != typeof t) || (i = t + '');
						}
						return i;
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵprov = ht({
						factory: function () {
							return new t();
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			const Sg = {
					addFlexToParent: !0,
					addOrientationBps: !1,
					disableDefaultBps: !1,
					disableVendorPrefixes: !1,
					serverLoaded: !1,
					useColumnBasisZero: !0,
					printWithBreakpoints: [],
					mediaTriggerAutoRestore: !0,
					ssrObserveBreakpoints: [],
				},
				Eg = new Bt('Flex Layout token, config options for the library', {
					providedIn: 'root',
					factory: () => Sg,
				}),
				Cg = new Bt('FlexLayoutServerLoaded', { providedIn: 'root', factory: () => !1 }),
				kg = new Bt('Flex Layout token, collect all breakpoints into one provider', {
					providedIn: 'root',
					factory: () => null,
				});
			function Tg(t, e) {
				return (
					(t = t ? t.clone() : new wg()),
					e &&
						((t.mqAlias = e.alias),
						(t.mediaQuery = e.mediaQuery),
						(t.suffix = e.suffix),
						(t.priority = e.priority)),
					t
				);
			}
			const Ag = 'inline',
				Ig = ['row', 'column', 'row-reverse', 'column-reverse'];
			function Og(t) {
				if (t)
					switch (t.toLowerCase()) {
						case 'reverse':
						case 'wrap-reverse':
						case 'reverse-wrap':
							t = 'wrap-reverse';
							break;
						case 'no':
						case 'none':
						case 'nowrap':
							t = 'nowrap';
							break;
						default:
							t = 'wrap';
					}
				return t;
			}
			let Rg = (() => {
				class t {
					constructor(t, e, n, i) {
						(this.elementRef = t),
							(this.styleBuilder = e),
							(this.styler = n),
							(this.marshal = i),
							(this.DIRECTIVE_KEY = ''),
							(this.inputs = []),
							(this.mru = {}),
							(this.destroySubject = new S()),
							(this.styleCache = new Map());
					}
					get parentElement() {
						return this.elementRef.nativeElement.parentElement;
					}
					get nativeElement() {
						return this.elementRef.nativeElement;
					}
					get activatedValue() {
						return this.marshal.getValue(this.nativeElement, this.DIRECTIVE_KEY);
					}
					set activatedValue(t) {
						this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, t, this.marshal.activatedAlias);
					}
					ngOnChanges(t) {
						Object.keys(t).forEach(e => {
							if (-1 !== this.inputs.indexOf(e)) {
								const n = e.split('.').slice(1).join('.');
								this.setValue(t[e].currentValue, n);
							}
						});
					}
					ngOnDestroy() {
						this.destroySubject.next(),
							this.destroySubject.complete(),
							this.marshal.releaseElement(this.nativeElement);
					}
					init(t = []) {
						this.marshal.init(
							this.elementRef.nativeElement,
							this.DIRECTIVE_KEY,
							this.updateWithValue.bind(this),
							this.clearStyles.bind(this),
							t
						);
					}
					addStyles(t, e) {
						const n = this.styleBuilder,
							i = n.shouldCache;
						let s = this.styleCache.get(t);
						(s && i) || ((s = n.buildStyles(t, e)), i && this.styleCache.set(t, s)),
							(this.mru = Object.assign({}, s)),
							this.applyStyleToElement(s),
							n.sideEffect(t, s, e);
					}
					clearStyles() {
						Object.keys(this.mru).forEach(t => {
							this.mru[t] = '';
						}),
							this.applyStyleToElement(this.mru),
							(this.mru = {});
					}
					triggerUpdate() {
						this.marshal.triggerUpdate(this.nativeElement, this.DIRECTIVE_KEY);
					}
					getFlexFlowDirection(t, e = !1) {
						if (t) {
							const [n, i] = this.styler.getFlowDirection(t);
							if (!i && e) {
								const e = (function (t) {
									let [e, n, i] = (function (t) {
										t = t ? t.toLowerCase() : '';
										let [e, n, i] = t.split(' ');
										return (
											Ig.find(t => t === e) || (e = Ig[0]),
											n === Ag && ((n = i !== Ag ? i : ''), (i = Ag)),
											[e, Og(n), !!i]
										);
									})(t);
									return (function (t, e = null, n = !1) {
										return {
											display: n ? 'inline-flex' : 'flex',
											'box-sizing': 'border-box',
											'flex-direction': t,
											'flex-wrap': e || null,
										};
									})(e, n, i);
								})(n);
								this.styler.applyStyleToElements(e, [t]);
							}
							return n.trim();
						}
						return 'row';
					}
					hasWrap(t) {
						return this.styler.hasWrap(t);
					}
					applyStyleToElement(t, e, n = this.nativeElement) {
						this.styler.applyStyleToElement(n, t, e);
					}
					setValue(t, e) {
						this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, t, e);
					}
					updateWithValue(t) {
						this.currentValue !== t && (this.addStyles(t), (this.currentValue = t));
					}
				}
				return (
					(t.ɵfac = function (t) {
						!(function () {
							throw new Error('invalid');
						})();
					}),
					(t.ɵdir = xe({ type: t, features: [Me] })),
					t
				);
			})();
			const Pg = [
					{ alias: 'xs', mediaQuery: 'screen and (min-width: 0px) and (max-width: 599.9px)', priority: 1e3 },
					{
						alias: 'sm',
						mediaQuery: 'screen and (min-width: 600px) and (max-width: 959.9px)',
						priority: 900,
					},
					{
						alias: 'md',
						mediaQuery: 'screen and (min-width: 960px) and (max-width: 1279.9px)',
						priority: 800,
					},
					{
						alias: 'lg',
						mediaQuery: 'screen and (min-width: 1280px) and (max-width: 1919.9px)',
						priority: 700,
					},
					{
						alias: 'xl',
						mediaQuery: 'screen and (min-width: 1920px) and (max-width: 4999.9px)',
						priority: 600,
					},
					{ alias: 'lt-sm', overlapping: !0, mediaQuery: 'screen and (max-width: 599.9px)', priority: 950 },
					{ alias: 'lt-md', overlapping: !0, mediaQuery: 'screen and (max-width: 959.9px)', priority: 850 },
					{ alias: 'lt-lg', overlapping: !0, mediaQuery: 'screen and (max-width: 1279.9px)', priority: 750 },
					{ alias: 'lt-xl', overlapping: !0, priority: 650, mediaQuery: 'screen and (max-width: 1919.9px)' },
					{ alias: 'gt-xs', overlapping: !0, mediaQuery: 'screen and (min-width: 600px)', priority: -950 },
					{ alias: 'gt-sm', overlapping: !0, mediaQuery: 'screen and (min-width: 960px)', priority: -850 },
					{ alias: 'gt-md', overlapping: !0, mediaQuery: 'screen and (min-width: 1280px)', priority: -750 },
					{ alias: 'gt-lg', overlapping: !0, mediaQuery: 'screen and (min-width: 1920px)', priority: -650 },
				],
				Lg = '(orientation: portrait) and (max-width: 599.9px)',
				Ng = '(orientation: landscape) and (max-width: 959.9px)',
				Dg = '(orientation: portrait) and (min-width: 600px) and (max-width: 839.9px)',
				Mg = '(orientation: landscape) and (min-width: 960px) and (max-width: 1279.9px)',
				Fg = '(orientation: portrait) and (min-width: 840px)',
				jg = '(orientation: landscape) and (min-width: 1280px)',
				Bg = {
					HANDSET: `${Lg}, ${Ng}`,
					TABLET: `${Dg} , ${Mg}`,
					WEB: `${Fg}, ${jg} `,
					HANDSET_PORTRAIT: '' + Lg,
					TABLET_PORTRAIT: Dg + ' ',
					WEB_PORTRAIT: '' + Fg,
					HANDSET_LANDSCAPE: '' + Ng,
					TABLET_LANDSCAPE: '' + Mg,
					WEB_LANDSCAPE: '' + jg,
				},
				zg = [
					{ alias: 'handset', priority: 2e3, mediaQuery: Bg.HANDSET },
					{ alias: 'handset.landscape', priority: 2e3, mediaQuery: Bg.HANDSET_LANDSCAPE },
					{ alias: 'handset.portrait', priority: 2e3, mediaQuery: Bg.HANDSET_PORTRAIT },
					{ alias: 'tablet', priority: 2100, mediaQuery: Bg.TABLET },
					{ alias: 'tablet.landscape', priority: 2100, mediaQuery: Bg.TABLET_LANDSCAPE },
					{ alias: 'tablet.portrait', priority: 2100, mediaQuery: Bg.TABLET_PORTRAIT },
					{ alias: 'web', priority: 2200, mediaQuery: Bg.WEB, overlapping: !0 },
					{ alias: 'web.landscape', priority: 2200, mediaQuery: Bg.WEB_LANDSCAPE, overlapping: !0 },
					{ alias: 'web.portrait', priority: 2200, mediaQuery: Bg.WEB_PORTRAIT, overlapping: !0 },
				],
				Vg = /(\.|-|_)/g;
			function Ug(t) {
				let e = t.length > 0 ? t.charAt(0) : '',
					n = t.length > 1 ? t.slice(1) : '';
				return e.toUpperCase() + n;
			}
			const Hg = new Bt('Token (@angular/flex-layout) Breakpoints', {
				providedIn: 'root',
				factory: () => {
					const t = Yt(kg),
						e = Yt(Eg),
						n = [].concat.apply(
							[],
							(t || []).map(t => (Array.isArray(t) ? t : [t]))
						);
					return (function (t, e = []) {
						const n = {};
						return (
							t.forEach(t => {
								n[t.alias] = t;
							}),
							e.forEach(t => {
								n[t.alias]
									? (function (t, ...e) {
											if (null == t)
												throw TypeError('Cannot convert undefined or null to object');
											for (let n of e)
												if (null != n) for (let e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
									  })(n[t.alias], t)
									: (n[t.alias] = t);
							}),
							(i = Object.keys(n).map(t => n[t])).forEach(t => {
								t.suffix ||
									((t.suffix = t.alias.replace(Vg, '|').split('|').map(Ug).join('')),
									(t.overlapping = !!t.overlapping));
							}),
							i
						);
						var i;
					})((e.disableDefaultBps ? [] : Pg).concat(e.addOrientationBps ? zg : []), n);
				},
			});
			function $g(t, e) {
				return ((e && e.priority) || 0) - ((t && t.priority) || 0);
			}
			function qg(t, e) {
				return (t.priority || 0) - (e.priority || 0);
			}
			let Wg = (() => {
					class t {
						constructor(t) {
							(this.findByMap = new Map()), (this.items = [...t].sort(qg));
						}
						findByAlias(t) {
							return t ? this.findWithPredicate(t, e => e.alias == t) : null;
						}
						findByQuery(t) {
							return this.findWithPredicate(t, e => e.mediaQuery == t);
						}
						get overlappings() {
							return this.items.filter(t => 1 == t.overlapping);
						}
						get aliases() {
							return this.items.map(t => t.alias);
						}
						get suffixes() {
							return this.items.map(t => (t.suffix ? t.suffix : ''));
						}
						findWithPredicate(t, e) {
							let n = this.findByMap.get(t);
							return n || ((n = this.items.find(e) || null), this.findByMap.set(t, n)), n || null;
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(Hg));
						}),
						(t.ɵprov = ht({
							factory: function () {
								return new t(Kt(Hg));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				Qg = (() => {
					class t {
						constructor(t, e, n) {
							(this._zone = t),
								(this._platformId = e),
								(this._document = n),
								(this.source = new pg(new wg(!0))),
								(this.registry = new Map()),
								(this.pendingRemoveListenerFns = []),
								(this._observable$ = this.source.asObservable());
						}
						get activations() {
							const t = [];
							return (
								this.registry.forEach((e, n) => {
									e.matches && t.push(n);
								}),
								t
							);
						}
						isActive(t) {
							const e = this.registry.get(t);
							return e ? e.matches : this.registerQuery(t).some(t => t.matches);
						}
						observe(t, e = !1) {
							if (t && t.length) {
								const n = this._observable$.pipe(Th(n => !e || t.indexOf(n.mediaQuery) > -1));
								return W(
									new _(e => {
										const n = this.registerQuery(t);
										if (n.length) {
											const t = n.pop();
											n.forEach(t => {
												e.next(t);
											}),
												this.source.next(t);
										}
										e.complete();
									}),
									n
								);
							}
							return this._observable$;
						}
						registerQuery(t) {
							const e = Array.isArray(t) ? t : [t],
								n = [];
							return (
								(function (t, e) {
									const n = t.filter(t => !Zg[t]);
									if (n.length > 0) {
										const t = n.join(', ');
										try {
											const i = e.createElement('style');
											i.setAttribute('type', 'text/css'),
												i.styleSheet ||
													i.appendChild(
														e.createTextNode(
															`\n/*\n  @angular/flex-layout - workaround for possible browser quirk with mediaQuery listeners\n  see http://bit.ly/2sd4HMP\n*/\n@media ${t} {.fx-query-test{ }}\n`
														)
													),
												e.head.appendChild(i),
												n.forEach(t => (Zg[t] = i));
										} catch (i) {
											console.error(i);
										}
									}
								})(e, this._document),
								e.forEach(t => {
									const e = e => {
										this._zone.run(() => this.source.next(new wg(e.matches, t)));
									};
									let i = this.registry.get(t);
									i ||
										((i = this.buildMQL(t)),
										i.addListener(e),
										this.pendingRemoveListenerFns.push(() => i.removeListener(e)),
										this.registry.set(t, i)),
										i.matches && n.push(new wg(!0, t));
								}),
								n
							);
						}
						ngOnDestroy() {
							let t;
							for (; (t = this.pendingRemoveListenerFns.pop()); ) t();
						}
						buildMQL(t) {
							return (function (t, e) {
								return e && window.matchMedia('all').addListener
									? window.matchMedia(t)
									: {
											matches: 'all' === t || '' === t,
											media: t,
											addListener: () => {},
											removeListener: () => {},
											onchange: null,
											addEventListener() {},
											removeEventListener() {},
											dispatchEvent: () => !1,
									  };
							})(t, Eu(this._platformId));
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(xc), Kt(ac), Kt(Jc));
						}),
						(t.ɵprov = ht({
							factory: function () {
								return new t(Kt(xc), Kt(ac), Kt(Jc));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})();
			const Zg = {},
				Gg = 'print',
				Kg = { alias: Gg, mediaQuery: Gg, priority: 1e3 };
			let Yg = (() => {
				class t {
					constructor(t, e, n) {
						(this.breakpoints = t),
							(this.layoutConfig = e),
							(this._document = n),
							(this.registeredBeforeAfterPrintHooks = !1),
							(this.isPrintingBeforeAfterEvent = !1),
							(this.beforePrintEventListeners = []),
							(this.afterPrintEventListeners = []),
							(this.isPrinting = !1),
							(this.queue = new Xg()),
							(this.deactivations = []);
					}
					withPrintQuery(t) {
						return [...t, Gg];
					}
					isPrintEvent(t) {
						return t.mediaQuery.startsWith(Gg);
					}
					get printAlias() {
						return this.layoutConfig.printWithBreakpoints || [];
					}
					get printBreakPoints() {
						return this.printAlias.map(t => this.breakpoints.findByAlias(t)).filter(t => null !== t);
					}
					getEventBreakpoints({ mediaQuery: t }) {
						const e = this.breakpoints.findByQuery(t);
						return (e ? [...this.printBreakPoints, e] : this.printBreakPoints).sort($g);
					}
					updateEvent(t) {
						let e = this.breakpoints.findByQuery(t.mediaQuery);
						return (
							this.isPrintEvent(t) &&
								((e = this.getEventBreakpoints(t)[0]), (t.mediaQuery = e ? e.mediaQuery : '')),
							Tg(t, e)
						);
					}
					registerBeforeAfterPrintHooks(t) {
						if (!this._document.defaultView || this.registeredBeforeAfterPrintHooks) return;
						this.registeredBeforeAfterPrintHooks = !0;
						const e = () => {
								this.isPrinting ||
									((this.isPrintingBeforeAfterEvent = !0),
									this.startPrinting(t, this.getEventBreakpoints(new wg(!0, Gg))),
									t.updateStyles());
							},
							n = () => {
								(this.isPrintingBeforeAfterEvent = !1),
									this.isPrinting && (this.stopPrinting(t), t.updateStyles());
							};
						this._document.defaultView.addEventListener('beforeprint', e),
							this._document.defaultView.addEventListener('afterprint', n),
							this.beforePrintEventListeners.push(e),
							this.afterPrintEventListeners.push(n);
					}
					interceptEvents(t) {
						return (
							this.registerBeforeAfterPrintHooks(t),
							e => {
								this.isPrintEvent(e)
									? e.matches && !this.isPrinting
										? (this.startPrinting(t, this.getEventBreakpoints(e)), t.updateStyles())
										: e.matches ||
										  !this.isPrinting ||
										  this.isPrintingBeforeAfterEvent ||
										  (this.stopPrinting(t), t.updateStyles())
									: this.collectActivations(e);
							}
						);
					}
					blockPropagation() {
						return t => !(this.isPrinting || this.isPrintEvent(t));
					}
					startPrinting(t, e) {
						(this.isPrinting = !0), (t.activatedBreakpoints = this.queue.addPrintBreakpoints(e));
					}
					stopPrinting(t) {
						(t.activatedBreakpoints = this.deactivations),
							(this.deactivations = []),
							this.queue.clear(),
							(this.isPrinting = !1);
					}
					collectActivations(t) {
						if (!this.isPrinting || this.isPrintingBeforeAfterEvent)
							if (t.matches) this.isPrintingBeforeAfterEvent || (this.deactivations = []);
							else {
								const e = this.breakpoints.findByQuery(t.mediaQuery);
								e && (this.deactivations.push(e), this.deactivations.sort($g));
							}
					}
					ngOnDestroy() {
						this.beforePrintEventListeners.forEach(t =>
							this._document.defaultView.removeEventListener('beforeprint', t)
						),
							this.afterPrintEventListeners.forEach(t =>
								this._document.defaultView.removeEventListener('afterprint', t)
							);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(Wg), Kt(Eg), Kt(Jc));
					}),
					(t.ɵprov = ht({
						factory: function () {
							return new t(Kt(Wg), Kt(Eg), Kt(Jc));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			class Xg {
				constructor() {
					this.printBreakpoints = [];
				}
				addPrintBreakpoints(t) {
					return t.push(Kg), t.sort($g), t.forEach(t => this.addBreakpoint(t)), this.printBreakpoints;
				}
				addBreakpoint(t) {
					t &&
						void 0 === this.printBreakpoints.find(e => e.mediaQuery === t.mediaQuery) &&
						(this.printBreakpoints = (function (t) {
							return !!t && t.mediaQuery.startsWith(Gg);
						})(t)
							? [t, ...this.printBreakpoints]
							: [...this.printBreakpoints, t]);
				}
				clear() {
					this.printBreakpoints = [];
				}
			}
			function Jg(t) {
				for (let e in t) {
					let n = t[e] || '';
					switch (e) {
						case 'display':
							t.display =
								'flex' === n
									? ['-webkit-flex', 'flex']
									: 'inline-flex' === n
									? ['-webkit-inline-flex', 'inline-flex']
									: n;
							break;
						case 'align-items':
						case 'align-self':
						case 'align-content':
						case 'flex':
						case 'flex-basis':
						case 'flex-flow':
						case 'flex-grow':
						case 'flex-shrink':
						case 'flex-wrap':
						case 'justify-content':
							t['-webkit-' + e] = n;
							break;
						case 'flex-direction':
							(n = n || 'row'), (t['-webkit-flex-direction'] = n), (t['flex-direction'] = n);
							break;
						case 'order':
							t.order = t['-webkit-' + e] = isNaN(+n) ? '0' : n;
					}
				}
				return t;
			}
			let ty = (() => {
				class t {
					constructor(t, e, n, i) {
						(this._serverStylesheet = t),
							(this._serverModuleLoaded = e),
							(this._platformId = n),
							(this.layoutConfig = i);
					}
					applyStyleToElement(t, e, n = null) {
						let i = {};
						'string' == typeof e && ((i[e] = n), (e = i)),
							(i = this.layoutConfig.disableVendorPrefixes ? e : Jg(e)),
							this._applyMultiValueStyleToElement(i, t);
					}
					applyStyleToElements(t, e = []) {
						const n = this.layoutConfig.disableVendorPrefixes ? t : Jg(t);
						e.forEach(t => {
							this._applyMultiValueStyleToElement(n, t);
						});
					}
					getFlowDirection(t) {
						const e = 'flex-direction';
						let n = this.lookupStyle(t, e);
						return [
							n || 'row',
							this.lookupInlineStyle(t, e) || (Cu(this._platformId) && this._serverModuleLoaded) ? n : '',
						];
					}
					hasWrap(t) {
						return 'wrap' === this.lookupStyle(t, 'flex-wrap');
					}
					lookupAttributeValue(t, e) {
						return t.getAttribute(e) || '';
					}
					lookupInlineStyle(t, e) {
						return Eu(this._platformId) ? t.style.getPropertyValue(e) : this._getServerStyle(t, e);
					}
					lookupStyle(t, e, n = !1) {
						let i = '';
						return (
							t &&
								((i = this.lookupInlineStyle(t, e)) ||
									(Eu(this._platformId)
										? n || (i = getComputedStyle(t).getPropertyValue(e))
										: this._serverModuleLoaded &&
										  (i = this._serverStylesheet.getStyleForElement(t, e)))),
							i ? i.trim() : ''
						);
					}
					_applyMultiValueStyleToElement(t, e) {
						Object.keys(t)
							.sort()
							.forEach(n => {
								const i = t[n],
									s = Array.isArray(i) ? i : [i];
								s.sort();
								for (let t of s)
									(t = t ? t + '' : ''),
										Eu(this._platformId) || !this._serverModuleLoaded
											? Eu(this._platformId)
												? e.style.setProperty(n, t)
												: this._setServerStyle(e, n, t)
											: this._serverStylesheet.addStyleToElement(e, n, t);
							});
					}
					_setServerStyle(t, e, n) {
						e = e.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
						const i = this._readStyleAttribute(t);
						(i[e] = n || ''), this._writeStyleAttribute(t, i);
					}
					_getServerStyle(t, e) {
						return this._readStyleAttribute(t)[e] || '';
					}
					_readStyleAttribute(t) {
						const e = {},
							n = t.getAttribute('style');
						if (n) {
							const t = n.split(/;+/g);
							for (let n = 0; n < t.length; n++) {
								const i = t[n].trim();
								if (i.length > 0) {
									const t = i.indexOf(':');
									if (-1 === t) throw new Error('Invalid CSS style: ' + i);
									e[i.substr(0, t).trim()] = i.substr(t + 1).trim();
								}
							}
						}
						return e;
					}
					_writeStyleAttribute(t, e) {
						let n = '';
						for (const i in e) e[i] && (n += i + ':' + e[i] + ';');
						t.setAttribute('style', n);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(xg), Kt(Cg), Kt(ac), Kt(Eg));
					}),
					(t.ɵprov = ht({
						factory: function () {
							return new t(Kt(xg), Kt(Cg), Kt(ac), Kt(Eg));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			class ey {
				constructor() {
					this.shouldCache = !0;
				}
				sideEffect(t, e, n) {}
			}
			let ny = (() => {
				class t {
					constructor(t, e, n) {
						(this.matchMedia = t),
							(this.breakpoints = e),
							(this.hook = n),
							(this.activatedBreakpoints = []),
							(this.elementMap = new Map()),
							(this.elementKeyMap = new WeakMap()),
							(this.watcherMap = new WeakMap()),
							(this.updateMap = new WeakMap()),
							(this.clearMap = new WeakMap()),
							(this.subject = new S()),
							this.observeActivations();
					}
					get activatedAlias() {
						return this.activatedBreakpoints[0] ? this.activatedBreakpoints[0].alias : '';
					}
					onMediaChange(t) {
						const e = this.findByQuery(t.mediaQuery);
						e &&
							((t = Tg(t, e)).matches && -1 === this.activatedBreakpoints.indexOf(e)
								? (this.activatedBreakpoints.push(e),
								  this.activatedBreakpoints.sort($g),
								  this.updateStyles())
								: t.matches ||
								  -1 === this.activatedBreakpoints.indexOf(e) ||
								  (this.activatedBreakpoints.splice(this.activatedBreakpoints.indexOf(e), 1),
								  this.activatedBreakpoints.sort($g),
								  this.updateStyles()));
					}
					init(t, e, n, i, s = []) {
						iy(this.updateMap, t, e, n),
							iy(this.clearMap, t, e, i),
							this.buildElementKeyMap(t, e),
							this.watchExtraTriggers(t, e, s);
					}
					getValue(t, e, n) {
						const i = this.elementMap.get(t);
						if (i) {
							const t = void 0 !== n ? i.get(n) : this.getActivatedValues(i, e);
							if (t) return t.get(e);
						}
					}
					hasValue(t, e) {
						const n = this.elementMap.get(t);
						if (n) {
							const t = this.getActivatedValues(n, e);
							if (t) return void 0 !== t.get(e) || !1;
						}
						return !1;
					}
					setValue(t, e, n, i) {
						let s = this.elementMap.get(t);
						if (s) {
							const r = (s.get(i) || new Map()).set(e, n);
							s.set(i, r), this.elementMap.set(t, s);
						} else (s = new Map().set(i, new Map().set(e, n))), this.elementMap.set(t, s);
						const r = this.getValue(t, e);
						void 0 !== r && this.updateElement(t, e, r);
					}
					trackValue(t, e) {
						return this.subject.asObservable().pipe(Th(n => n.element === t && n.key === e));
					}
					updateStyles() {
						this.elementMap.forEach((t, e) => {
							const n = new Set(this.elementKeyMap.get(e));
							let i = this.getActivatedValues(t);
							i &&
								i.forEach((t, i) => {
									this.updateElement(e, i, t), n.delete(i);
								}),
								n.forEach(n => {
									if (((i = this.getActivatedValues(t, n)), i)) {
										const t = i.get(n);
										this.updateElement(e, n, t);
									} else this.clearElement(e, n);
								});
						});
					}
					clearElement(t, e) {
						const n = this.clearMap.get(t);
						if (n) {
							const i = n.get(e);
							i && (i(), this.subject.next({ element: t, key: e, value: '' }));
						}
					}
					updateElement(t, e, n) {
						const i = this.updateMap.get(t);
						if (i) {
							const s = i.get(e);
							s && (s(n), this.subject.next({ element: t, key: e, value: n }));
						}
					}
					releaseElement(t) {
						const e = this.watcherMap.get(t);
						e && (e.forEach(t => t.unsubscribe()), this.watcherMap.delete(t));
						const n = this.elementMap.get(t);
						n && (n.forEach((t, e) => n.delete(e)), this.elementMap.delete(t));
					}
					triggerUpdate(t, e) {
						const n = this.elementMap.get(t);
						if (n) {
							const i = this.getActivatedValues(n, e);
							i &&
								(e
									? this.updateElement(t, e, i.get(e))
									: i.forEach((e, n) => this.updateElement(t, n, e)));
						}
					}
					buildElementKeyMap(t, e) {
						let n = this.elementKeyMap.get(t);
						n || ((n = new Set()), this.elementKeyMap.set(t, n)), n.add(e);
					}
					watchExtraTriggers(t, e, n) {
						if (n && n.length) {
							let i = this.watcherMap.get(t);
							if ((i || ((i = new Map()), this.watcherMap.set(t, i)), !i.get(e))) {
								const s = W(...n).subscribe(() => {
									const n = this.getValue(t, e);
									this.updateElement(t, e, n);
								});
								i.set(e, s);
							}
						}
					}
					findByQuery(t) {
						return this.breakpoints.findByQuery(t);
					}
					getActivatedValues(t, e) {
						for (let i = 0; i < this.activatedBreakpoints.length; i++) {
							const n = t.get(this.activatedBreakpoints[i].alias);
							if (n && (void 0 === e || (n.has(e) && null != n.get(e)))) return n;
						}
						const n = t.get('');
						return void 0 === e || (n && n.has(e)) ? n : void 0;
					}
					observeActivations() {
						const t = this.breakpoints.items.map(t => t.mediaQuery);
						this.matchMedia
							.observe(this.hook.withPrintQuery(t))
							.pipe(gh(this.hook.interceptEvents(this)), Th(this.hook.blockPropagation()))
							.subscribe(this.onMediaChange.bind(this));
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(Qg), Kt(Wg), Kt(Yg));
					}),
					(t.ɵprov = ht({
						factory: function () {
							return new t(Kt(Qg), Kt(Wg), Kt(Yg));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			function iy(t, e, n, i) {
				if (void 0 !== i) {
					let s = t.get(e);
					s || ((s = new Map()), t.set(e, s)), s.set(n, i);
				}
			}
			let sy = (() => {
				class t {}
				return (
					(t.ɵmod = be({ type: t })),
					(t.ɵinj = dt({
						factory: function (e) {
							return new (e || t)();
						},
						imports: [[bg]],
					})),
					t
				);
			})();
			const ry = 'inline',
				oy = ['row', 'column', 'row-reverse', 'column-reverse'];
			function ay(t) {
				t = t ? t.toLowerCase() : '';
				let [e, n, i] = t.split(' ');
				return (
					oy.find(t => t === e) || (e = oy[0]),
					n === ry && ((n = i !== ry ? i : ''), (i = ry)),
					[e, cy(n), !!i]
				);
			}
			function ly(t) {
				let [e] = ay(t);
				return e.indexOf('row') > -1;
			}
			function cy(t) {
				if (t)
					switch (t.toLowerCase()) {
						case 'reverse':
						case 'wrap-reverse':
						case 'reverse-wrap':
							t = 'wrap-reverse';
							break;
						case 'no':
						case 'none':
						case 'nowrap':
							t = 'nowrap';
							break;
						default:
							t = 'wrap';
					}
				return t;
			}
			let uy = (() => {
				class t extends ey {
					buildStyles(t) {
						return (function (t) {
							let [e, n, i] = ay(t);
							return (function (t, e = null, n = !1) {
								return {
									display: n ? 'inline-flex' : 'flex',
									'box-sizing': 'border-box',
									'flex-direction': t,
									'flex-wrap': e || null,
								};
							})(e, n, i);
						})(t);
					}
				}
				(t.ɵfac = function (n) {
					return e(n || t);
				}),
					(t.ɵprov = ht({
						factory: function () {
							return new t();
						},
						token: t,
						providedIn: 'root',
					}));
				const e = mi(t);
				return t;
			})();
			const hy = [
				'fxLayout',
				'fxLayout.xs',
				'fxLayout.sm',
				'fxLayout.md',
				'fxLayout.lg',
				'fxLayout.xl',
				'fxLayout.lt-sm',
				'fxLayout.lt-md',
				'fxLayout.lt-lg',
				'fxLayout.lt-xl',
				'fxLayout.gt-xs',
				'fxLayout.gt-sm',
				'fxLayout.gt-md',
				'fxLayout.gt-lg',
			];
			let dy = (() => {
					class t extends Rg {
						constructor(t, e, n, i) {
							super(t, n, e, i), (this.DIRECTIVE_KEY = 'layout'), (this.styleCache = fy), this.init();
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(To(nl), To(ty), To(uy), To(ny));
						}),
						(t.ɵdir = xe({ type: t, features: [mo] })),
						t
					);
				})(),
				py = (() => {
					class t extends dy {
						constructor() {
							super(...arguments), (this.inputs = hy);
						}
					}
					(t.ɵfac = function (n) {
						return e(n || t);
					}),
						(t.ɵdir = xe({
							type: t,
							selectors: [
								['', 'fxLayout', ''],
								['', 'fxLayout.xs', ''],
								['', 'fxLayout.sm', ''],
								['', 'fxLayout.md', ''],
								['', 'fxLayout.lg', ''],
								['', 'fxLayout.xl', ''],
								['', 'fxLayout.lt-sm', ''],
								['', 'fxLayout.lt-md', ''],
								['', 'fxLayout.lt-lg', ''],
								['', 'fxLayout.lt-xl', ''],
								['', 'fxLayout.gt-xs', ''],
								['', 'fxLayout.gt-sm', ''],
								['', 'fxLayout.gt-md', ''],
								['', 'fxLayout.gt-lg', ''],
							],
							inputs: {
								fxLayout: 'fxLayout',
								'fxLayout.xs': 'fxLayout.xs',
								'fxLayout.sm': 'fxLayout.sm',
								'fxLayout.md': 'fxLayout.md',
								'fxLayout.lg': 'fxLayout.lg',
								'fxLayout.xl': 'fxLayout.xl',
								'fxLayout.lt-sm': 'fxLayout.lt-sm',
								'fxLayout.lt-md': 'fxLayout.lt-md',
								'fxLayout.lt-lg': 'fxLayout.lt-lg',
								'fxLayout.lt-xl': 'fxLayout.lt-xl',
								'fxLayout.gt-xs': 'fxLayout.gt-xs',
								'fxLayout.gt-sm': 'fxLayout.gt-sm',
								'fxLayout.gt-md': 'fxLayout.gt-md',
								'fxLayout.gt-lg': 'fxLayout.gt-lg',
							},
							features: [mo],
						}));
					const e = mi(t);
					return t;
				})();
			const fy = new Map(),
				my = { margin: 0, width: '100%', height: '100%', 'min-width': '100%', 'min-height': '100%' };
			let gy = (() => {
					class t extends ey {
						buildStyles(t) {
							return my;
						}
					}
					(t.ɵfac = function (n) {
						return e(n || t);
					}),
						(t.ɵprov = ht({
							factory: function () {
								return new t();
							},
							token: t,
							providedIn: 'root',
						}));
					const e = mi(t);
					return t;
				})(),
				yy = (() => {
					class t extends Rg {
						constructor(t, e, n, i) {
							super(t, n, e, i), (this.styleCache = _y), this.addStyles('');
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(To(nl), To(ty), To(gy), To(ny));
						}),
						(t.ɵdir = xe({
							type: t,
							selectors: [
								['', 'fxFill', ''],
								['', 'fxFlexFill', ''],
							],
							features: [mo],
						})),
						t
					);
				})();
			const _y = new Map();
			let vy = (() => {
				class t extends ey {
					buildStyles(t, e) {
						const n = {},
							[i, s] = t.split(' ');
						switch (i) {
							case 'center':
								n['justify-content'] = 'center';
								break;
							case 'space-around':
								n['justify-content'] = 'space-around';
								break;
							case 'space-between':
								n['justify-content'] = 'space-between';
								break;
							case 'space-evenly':
								n['justify-content'] = 'space-evenly';
								break;
							case 'end':
							case 'flex-end':
								n['justify-content'] = 'flex-end';
								break;
							case 'start':
							case 'flex-start':
							default:
								n['justify-content'] = 'flex-start';
						}
						switch (s) {
							case 'start':
							case 'flex-start':
								n['align-items'] = n['align-content'] = 'flex-start';
								break;
							case 'center':
								n['align-items'] = n['align-content'] = 'center';
								break;
							case 'end':
							case 'flex-end':
								n['align-items'] = n['align-content'] = 'flex-end';
								break;
							case 'space-between':
								(n['align-content'] = 'space-between'), (n['align-items'] = 'stretch');
								break;
							case 'space-around':
								(n['align-content'] = 'space-around'), (n['align-items'] = 'stretch');
								break;
							case 'baseline':
								(n['align-content'] = 'stretch'), (n['align-items'] = 'baseline');
								break;
							case 'stretch':
							default:
								n['align-items'] = n['align-content'] = 'stretch';
						}
						return (function (t, ...e) {
							if (null == t) throw TypeError('Cannot convert undefined or null to object');
							for (let n of e) if (null != n) for (let e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
							return t;
						})(n, {
							display: e.inline ? 'inline-flex' : 'flex',
							'flex-direction': e.layout,
							'box-sizing': 'border-box',
							'max-width': 'stretch' === s ? (ly(e.layout) ? null : '100%') : null,
							'max-height': 'stretch' === s && ly(e.layout) ? '100%' : null,
						});
					}
				}
				(t.ɵfac = function (n) {
					return e(n || t);
				}),
					(t.ɵprov = ht({
						factory: function () {
							return new t();
						},
						token: t,
						providedIn: 'root',
					}));
				const e = mi(t);
				return t;
			})();
			const by = [
				'fxLayoutAlign',
				'fxLayoutAlign.xs',
				'fxLayoutAlign.sm',
				'fxLayoutAlign.md',
				'fxLayoutAlign.lg',
				'fxLayoutAlign.xl',
				'fxLayoutAlign.lt-sm',
				'fxLayoutAlign.lt-md',
				'fxLayoutAlign.lt-lg',
				'fxLayoutAlign.lt-xl',
				'fxLayoutAlign.gt-xs',
				'fxLayoutAlign.gt-sm',
				'fxLayoutAlign.gt-md',
				'fxLayoutAlign.gt-lg',
			];
			let wy = (() => {
					class t extends Rg {
						constructor(t, e, n, i) {
							super(t, n, e, i),
								(this.DIRECTIVE_KEY = 'layout-align'),
								(this.layout = 'row'),
								(this.inline = !1),
								this.init(),
								this.marshal
									.trackValue(this.nativeElement, 'layout')
									.pipe(lg(this.destroySubject))
									.subscribe(this.onLayoutChange.bind(this));
						}
						updateWithValue(t) {
							const e = this.layout || 'row',
								n = this.inline;
							'row' === e && n
								? (this.styleCache = Ty)
								: 'row' !== e || n
								? 'row-reverse' === e && n
									? (this.styleCache = Iy)
									: 'row-reverse' !== e || n
									? 'column' === e && n
										? (this.styleCache = Ay)
										: 'column' !== e || n
										? 'column-reverse' === e && n
											? (this.styleCache = Oy)
											: 'column-reverse' !== e || n || (this.styleCache = ky)
										: (this.styleCache = Ey)
									: (this.styleCache = Cy)
								: (this.styleCache = Sy),
								this.addStyles(t, { layout: e, inline: n });
						}
						onLayoutChange(t) {
							const e = t.value.split(' ');
							(this.layout = e[0]),
								(this.inline = t.value.includes('inline')),
								oy.find(t => t === this.layout) || (this.layout = 'row'),
								this.triggerUpdate();
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(To(nl), To(ty), To(vy), To(ny));
						}),
						(t.ɵdir = xe({ type: t, features: [mo] })),
						t
					);
				})(),
				xy = (() => {
					class t extends wy {
						constructor() {
							super(...arguments), (this.inputs = by);
						}
					}
					(t.ɵfac = function (n) {
						return e(n || t);
					}),
						(t.ɵdir = xe({
							type: t,
							selectors: [
								['', 'fxLayoutAlign', ''],
								['', 'fxLayoutAlign.xs', ''],
								['', 'fxLayoutAlign.sm', ''],
								['', 'fxLayoutAlign.md', ''],
								['', 'fxLayoutAlign.lg', ''],
								['', 'fxLayoutAlign.xl', ''],
								['', 'fxLayoutAlign.lt-sm', ''],
								['', 'fxLayoutAlign.lt-md', ''],
								['', 'fxLayoutAlign.lt-lg', ''],
								['', 'fxLayoutAlign.lt-xl', ''],
								['', 'fxLayoutAlign.gt-xs', ''],
								['', 'fxLayoutAlign.gt-sm', ''],
								['', 'fxLayoutAlign.gt-md', ''],
								['', 'fxLayoutAlign.gt-lg', ''],
							],
							inputs: {
								fxLayoutAlign: 'fxLayoutAlign',
								'fxLayoutAlign.xs': 'fxLayoutAlign.xs',
								'fxLayoutAlign.sm': 'fxLayoutAlign.sm',
								'fxLayoutAlign.md': 'fxLayoutAlign.md',
								'fxLayoutAlign.lg': 'fxLayoutAlign.lg',
								'fxLayoutAlign.xl': 'fxLayoutAlign.xl',
								'fxLayoutAlign.lt-sm': 'fxLayoutAlign.lt-sm',
								'fxLayoutAlign.lt-md': 'fxLayoutAlign.lt-md',
								'fxLayoutAlign.lt-lg': 'fxLayoutAlign.lt-lg',
								'fxLayoutAlign.lt-xl': 'fxLayoutAlign.lt-xl',
								'fxLayoutAlign.gt-xs': 'fxLayoutAlign.gt-xs',
								'fxLayoutAlign.gt-sm': 'fxLayoutAlign.gt-sm',
								'fxLayoutAlign.gt-md': 'fxLayoutAlign.gt-md',
								'fxLayoutAlign.gt-lg': 'fxLayoutAlign.gt-lg',
							},
							features: [mo],
						}));
					const e = mi(t);
					return t;
				})();
			const Sy = new Map(),
				Ey = new Map(),
				Cy = new Map(),
				ky = new Map(),
				Ty = new Map(),
				Ay = new Map(),
				Iy = new Map(),
				Oy = new Map();
			let Ry = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[bg, od]],
						})),
						t
					);
				})(),
				Py = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[bg]],
						})),
						t
					);
				})(),
				Ly = (() => {
					class t {
						constructor(t, e) {
							Cu(e) &&
								!t &&
								console.warn(
									'Warning: Flex Layout loaded on the server without FlexLayoutServerModule'
								);
						}
						static withConfig(e, n = []) {
							return {
								ngModule: t,
								providers: e.serverLoaded
									? [
											{ provide: Eg, useValue: Object.assign(Object.assign({}, Sg), e) },
											{ provide: kg, useValue: n, multi: !0 },
											{ provide: Cg, useValue: !0 },
									  ]
									: [
											{ provide: Eg, useValue: Object.assign(Object.assign({}, Sg), e) },
											{ provide: kg, useValue: n, multi: !0 },
									  ],
							};
						}
					}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)(Kt(Cg), Kt(ac));
							},
							imports: [[Ry, sy, Py], Ry, sy, Py],
						})),
						t
					);
				})();
			class Ny {
				constructor(t, e) {
					(this.compare = t), (this.keySelector = e);
				}
				call(t, e) {
					return e.subscribe(new Dy(t, this.compare, this.keySelector));
				}
			}
			class Dy extends f {
				constructor(t, e, n) {
					super(t), (this.keySelector = n), (this.hasKey = !1), 'function' == typeof e && (this.compare = e);
				}
				compare(t, e) {
					return t === e;
				}
				_next(t) {
					let e;
					try {
						const { keySelector: n } = this;
						e = n ? n(t) : t;
					} catch (i) {
						return this.destination.error(i);
					}
					let n = !1;
					if (this.hasKey)
						try {
							const { compare: t } = this;
							n = t(this.key, e);
						} catch (i) {
							return this.destination.error(i);
						}
					else this.hasKey = !0;
					n || ((this.key = e), this.destination.next(t));
				}
			}
			class My {
				constructor(t) {
					this.durationSelector = t;
				}
				call(t, e) {
					return e.subscribe(new Fy(t, this.durationSelector));
				}
			}
			class Fy extends j {
				constructor(t, e) {
					super(t), (this.durationSelector = e), (this.hasValue = !1);
				}
				_next(t) {
					if (((this.value = t), (this.hasValue = !0), !this.throttled)) {
						let n;
						try {
							const { durationSelector: e } = this;
							n = e(t);
						} catch (e) {
							return this.destination.error(e);
						}
						const i = B(n, new F(this));
						!i || i.closed ? this.clearThrottle() : this.add((this.throttled = i));
					}
				}
				clearThrottle() {
					const { value: t, hasValue: e, throttled: n } = this;
					n && (this.remove(n), (this.throttled = void 0), n.unsubscribe()),
						e && ((this.value = void 0), (this.hasValue = !1), this.destination.next(t));
				}
				notifyNext() {
					this.clearThrottle();
				}
				notifyComplete() {
					this.clearThrottle();
				}
			}
			function jy(t) {
				return !l(t) && t - parseFloat(t) + 1 >= 0;
			}
			function By(t) {
				const { index: e, period: n, subscriber: i } = t;
				if ((i.next(e), !i.closed)) {
					if (-1 === n) return i.complete();
					(t.index = e + 1), this.schedule(t, n);
				}
			}
			function zy(t, e = Sh) {
				return (
					(n = () =>
						(function (t = 0, e, n) {
							let i = -1;
							return (
								jy(e) ? (i = Number(e) < 1 ? 1 : Number(e)) : C(e) && (n = e),
								C(n) || (n = Sh),
								new _(e => {
									const s = jy(t) ? t : +t - n.now();
									return n.schedule(By, s, { index: 0, period: i, subscriber: e });
								})
							);
						})(t, e)),
					function (t) {
						return t.lift(new My(n));
					}
				);
				var n;
			}
			class Vy extends bh {
				constructor(t, e) {
					super(t, e), (this.scheduler = t), (this.work = e);
				}
				schedule(t, e = 0) {
					return e > 0
						? super.schedule(t, e)
						: ((this.delay = e), (this.state = t), this.scheduler.flush(this), this);
				}
				execute(t, e) {
					return e > 0 || this.closed ? super.execute(t, e) : this._execute(t, e);
				}
				requestAsyncId(t, e, n = 0) {
					return (null !== n && n > 0) || (null === n && this.delay > 0)
						? super.requestAsyncId(t, e, n)
						: t.flush(this);
				}
			}
			class Uy extends xh {}
			const Hy = new Uy(Vy);
			let $y = (() => {
				class t {
					constructor(t, e, n) {
						(this.kind = t), (this.value = e), (this.error = n), (this.hasValue = 'N' === t);
					}
					observe(t) {
						switch (this.kind) {
							case 'N':
								return t.next && t.next(this.value);
							case 'E':
								return t.error && t.error(this.error);
							case 'C':
								return t.complete && t.complete();
						}
					}
					do(t, e, n) {
						switch (this.kind) {
							case 'N':
								return t && t(this.value);
							case 'E':
								return e && e(this.error);
							case 'C':
								return n && n();
						}
					}
					accept(t, e, n) {
						return t && 'function' == typeof t.next ? this.observe(t) : this.do(t, e, n);
					}
					toObservable() {
						switch (this.kind) {
							case 'N':
								return fh(this.value);
							case 'E':
								return pm(this.error);
							case 'C':
								return Ph();
						}
						throw new Error('unexpected notification kind value');
					}
					static createNext(e) {
						return void 0 !== e ? new t('N', e) : t.undefinedValueNotification;
					}
					static createError(e) {
						return new t('E', void 0, e);
					}
					static createComplete() {
						return t.completeNotification;
					}
				}
				return (t.completeNotification = new t('C')), (t.undefinedValueNotification = new t('N', void 0)), t;
			})();
			class qy extends f {
				constructor(t, e, n = 0) {
					super(t), (this.scheduler = e), (this.delay = n);
				}
				static dispatch(t) {
					const { notification: e, destination: n } = t;
					e.observe(n), this.unsubscribe();
				}
				scheduleMessage(t) {
					this.destination.add(this.scheduler.schedule(qy.dispatch, this.delay, new Wy(t, this.destination)));
				}
				_next(t) {
					this.scheduleMessage($y.createNext(t));
				}
				_error(t) {
					this.scheduleMessage($y.createError(t)), this.unsubscribe();
				}
				_complete() {
					this.scheduleMessage($y.createComplete()), this.unsubscribe();
				}
			}
			class Wy {
				constructor(t, e) {
					(this.notification = t), (this.destination = e);
				}
			}
			class Qy extends S {
				constructor(t = Number.POSITIVE_INFINITY, e = Number.POSITIVE_INFINITY, n) {
					super(),
						(this.scheduler = n),
						(this._events = []),
						(this._infiniteTimeWindow = !1),
						(this._bufferSize = t < 1 ? 1 : t),
						(this._windowTime = e < 1 ? 1 : e),
						e === Number.POSITIVE_INFINITY
							? ((this._infiniteTimeWindow = !0), (this.next = this.nextInfiniteTimeWindow))
							: (this.next = this.nextTimeWindow);
				}
				nextInfiniteTimeWindow(t) {
					if (!this.isStopped) {
						const e = this._events;
						e.push(t), e.length > this._bufferSize && e.shift();
					}
					super.next(t);
				}
				nextTimeWindow(t) {
					this.isStopped || (this._events.push(new Zy(this._getNow(), t)), this._trimBufferThenGetEvents()),
						super.next(t);
				}
				_subscribe(t) {
					const e = this._infiniteTimeWindow,
						n = e ? this._events : this._trimBufferThenGetEvents(),
						i = this.scheduler,
						s = n.length;
					let r;
					if (this.closed) throw new b();
					if (
						(this.isStopped || this.hasError
							? (r = h.EMPTY)
							: (this.observers.push(t), (r = new w(this, t))),
						i && t.add((t = new qy(t, i))),
						e)
					)
						for (let o = 0; o < s && !t.closed; o++) t.next(n[o]);
					else for (let o = 0; o < s && !t.closed; o++) t.next(n[o].value);
					return this.hasError ? t.error(this.thrownError) : this.isStopped && t.complete(), r;
				}
				_getNow() {
					return (this.scheduler || Hy).now();
				}
				_trimBufferThenGetEvents() {
					const t = this._getNow(),
						e = this._bufferSize,
						n = this._windowTime,
						i = this._events,
						s = i.length;
					let r = 0;
					for (; r < s && !(t - i[r].time < n); ) r++;
					return s > e && (r = Math.max(r, s - e)), r > 0 && i.splice(0, r), i;
				}
			}
			class Zy {
				constructor(t, e) {
					(this.time = t), (this.value = e);
				}
			}
			let Gy = (() => {
					class t {
						constructor(t, e, n) {
							(this._ngZone = t),
								(this._platform = e),
								(this._scrolled = new S()),
								(this._globalSubscription = null),
								(this._scrolledCount = 0),
								(this.scrollContainers = new Map()),
								(this._document = n);
						}
						register(t) {
							this.scrollContainers.has(t) ||
								this.scrollContainers.set(
									t,
									t.elementScrolled().subscribe(() => this._scrolled.next(t))
								);
						}
						deregister(t) {
							const e = this.scrollContainers.get(t);
							e && (e.unsubscribe(), this.scrollContainers.delete(t));
						}
						scrolled(t = 20) {
							return this._platform.isBrowser
								? new _(e => {
										this._globalSubscription || this._addGlobalListener();
										const n =
											t > 0
												? this._scrolled.pipe(zy(t)).subscribe(e)
												: this._scrolled.subscribe(e);
										return (
											this._scrolledCount++,
											() => {
												n.unsubscribe(),
													this._scrolledCount--,
													this._scrolledCount || this._removeGlobalListener();
											}
										);
								  })
								: fh();
						}
						ngOnDestroy() {
							this._removeGlobalListener(),
								this.scrollContainers.forEach((t, e) => this.deregister(e)),
								this._scrolled.complete();
						}
						ancestorScrolled(t, e) {
							const n = this.getAncestorScrollContainers(t);
							return this.scrolled(e).pipe(Th(t => !t || n.indexOf(t) > -1));
						}
						getAncestorScrollContainers(t) {
							const e = [];
							return (
								this.scrollContainers.forEach((n, i) => {
									this._scrollableContainsElement(i, t) && e.push(i);
								}),
								e
							);
						}
						_getDocument() {
							return this._document || document;
						}
						_getWindow() {
							return this._getDocument().defaultView || window;
						}
						_scrollableContainsElement(t, e) {
							let n = e.nativeElement,
								i = t.getElementRef().nativeElement;
							do {
								if (n == i) return !0;
							} while ((n = n.parentElement));
							return !1;
						}
						_addGlobalListener() {
							this._globalSubscription = this._ngZone.runOutsideAngular(() =>
								fg(this._getWindow().document, 'scroll').subscribe(() => this._scrolled.next())
							);
						}
						_removeGlobalListener() {
							this._globalSubscription &&
								(this._globalSubscription.unsubscribe(), (this._globalSubscription = null));
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(xc), Kt(uh), Kt(Jc, 8));
						}),
						(t.ɵprov = ht({
							factory: function () {
								return new t(Kt(xc), Kt(uh), Kt(Jc, 8));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				Ky = (() => {
					class t {
						constructor(t, e, n, i) {
							(this.elementRef = t),
								(this.scrollDispatcher = e),
								(this.ngZone = n),
								(this.dir = i),
								(this._destroyed = new S()),
								(this._elementScrolled = new _(t =>
									this.ngZone.runOutsideAngular(() =>
										fg(this.elementRef.nativeElement, 'scroll')
											.pipe(lg(this._destroyed))
											.subscribe(t)
									)
								));
						}
						ngOnInit() {
							this.scrollDispatcher.register(this);
						}
						ngOnDestroy() {
							this.scrollDispatcher.deregister(this), this._destroyed.next(), this._destroyed.complete();
						}
						elementScrolled() {
							return this._elementScrolled;
						}
						getElementRef() {
							return this.elementRef;
						}
						scrollTo(t) {
							const e = this.elementRef.nativeElement,
								n = this.dir && 'rtl' == this.dir.value;
							null == t.left && (t.left = n ? t.end : t.start),
								null == t.right && (t.right = n ? t.start : t.end),
								null != t.bottom && (t.top = e.scrollHeight - e.clientHeight - t.bottom),
								n && 0 != ph()
									? (null != t.left && (t.right = e.scrollWidth - e.clientWidth - t.left),
									  2 == ph()
											? (t.left = t.right)
											: 1 == ph() && (t.left = t.right ? -t.right : t.right))
									: null != t.right && (t.left = e.scrollWidth - e.clientWidth - t.right),
								this._applyScrollToOptions(t);
						}
						_applyScrollToOptions(t) {
							const e = this.elementRef.nativeElement;
							!(function () {
								if (null == lh)
									if (
										(('object' == typeof document && document) || (lh = !1),
										'scrollBehavior' in document.documentElement.style)
									)
										lh = !0;
									else {
										const t = Element.prototype.scrollTo;
										lh = !!t && !/\{\s*\[native code\]\s*\}/.test(t.toString());
									}
								return lh;
							})()
								? (null != t.top && (e.scrollTop = t.top), null != t.left && (e.scrollLeft = t.left))
								: e.scrollTo(t);
						}
						measureScrollOffset(t) {
							const e = 'left',
								n = 'right',
								i = this.elementRef.nativeElement;
							if ('top' == t) return i.scrollTop;
							if ('bottom' == t) return i.scrollHeight - i.clientHeight - i.scrollTop;
							const s = this.dir && 'rtl' == this.dir.value;
							return (
								'start' == t ? (t = s ? n : e) : 'end' == t && (t = s ? e : n),
								s && 2 == ph()
									? t == e
										? i.scrollWidth - i.clientWidth - i.scrollLeft
										: i.scrollLeft
									: s && 1 == ph()
									? t == e
										? i.scrollLeft + i.scrollWidth - i.clientWidth
										: -i.scrollLeft
									: t == e
									? i.scrollLeft
									: i.scrollWidth - i.clientWidth - i.scrollLeft
							);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(To(nl), To(Gy), To(xc), To(rd, 8));
						}),
						(t.ɵdir = xe({
							type: t,
							selectors: [
								['', 'cdk-scrollable', ''],
								['', 'cdkScrollable', ''],
							],
						})),
						t
					);
				})(),
				Yy = (() => {
					class t {
						constructor(t, e, n) {
							(this._platform = t),
								(this._change = new S()),
								(this._changeListener = t => {
									this._change.next(t);
								}),
								(this._document = n),
								e.runOutsideAngular(() => {
									if (t.isBrowser) {
										const t = this._getWindow();
										t.addEventListener('resize', this._changeListener),
											t.addEventListener('orientationchange', this._changeListener);
									}
									this.change().subscribe(() => this._updateViewportSize());
								});
						}
						ngOnDestroy() {
							if (this._platform.isBrowser) {
								const t = this._getWindow();
								t.removeEventListener('resize', this._changeListener),
									t.removeEventListener('orientationchange', this._changeListener);
							}
							this._change.complete();
						}
						getViewportSize() {
							this._viewportSize || this._updateViewportSize();
							const t = { width: this._viewportSize.width, height: this._viewportSize.height };
							return this._platform.isBrowser || (this._viewportSize = null), t;
						}
						getViewportRect() {
							const t = this.getViewportScrollPosition(),
								{ width: e, height: n } = this.getViewportSize();
							return {
								top: t.top,
								left: t.left,
								bottom: t.top + n,
								right: t.left + e,
								height: n,
								width: e,
							};
						}
						getViewportScrollPosition() {
							if (!this._platform.isBrowser) return { top: 0, left: 0 };
							const t = this._getDocument(),
								e = this._getWindow(),
								n = t.documentElement,
								i = n.getBoundingClientRect();
							return {
								top: -i.top || t.body.scrollTop || e.scrollY || n.scrollTop || 0,
								left: -i.left || t.body.scrollLeft || e.scrollX || n.scrollLeft || 0,
							};
						}
						change(t = 20) {
							return t > 0 ? this._change.pipe(zy(t)) : this._change;
						}
						_getDocument() {
							return this._document || document;
						}
						_getWindow() {
							return this._getDocument().defaultView || window;
						}
						_updateViewportSize() {
							const t = this._getWindow();
							this._viewportSize = this._platform.isBrowser
								? { width: t.innerWidth, height: t.innerHeight }
								: { width: 0, height: 0 };
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(uh), Kt(xc), Kt(Jc, 8));
						}),
						(t.ɵprov = ht({
							factory: function () {
								return new t(Kt(uh), Kt(xc), Kt(Jc, 8));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				Xy = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
						})),
						t
					);
				})(),
				Jy = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[od, hh, Xy], od, Xy],
						})),
						t
					);
				})();
			function t_(t) {
				return e => e.lift(new e_(t));
			}
			class e_ {
				constructor(t) {
					this.value = t;
				}
				call(t, e) {
					return e.subscribe(new n_(t, this.value));
				}
			}
			class n_ extends f {
				constructor(t, e) {
					super(t), (this.value = e);
				}
				_next(t) {
					this.destination.next(this.value);
				}
			}
			const i_ = ['*'];
			function s_(t, e) {
				if (1 & t) {
					const t = No();
					Ro(0, 'div', 2),
						Mo('click', function () {
							return ln(t), Vo()._onBackdropClicked();
						}),
						Po();
				}
				2 & t && Yo('mat-drawer-shown', Vo()._isShowingBackdrop());
			}
			function r_(t, e) {
				1 & t && (Ro(0, 'mat-drawer-content'), Wo(1, 2), Po());
			}
			const o_ = [[['mat-drawer']], [['mat-drawer-content']], '*'],
				a_ = ['mat-drawer', 'mat-drawer-content', '*'];
			function l_(t, e) {
				if (1 & t) {
					const t = No();
					Ro(0, 'div', 2),
						Mo('click', function () {
							return ln(t), Vo()._onBackdropClicked();
						}),
						Po();
				}
				2 & t && Yo('mat-drawer-shown', Vo()._isShowingBackdrop());
			}
			function c_(t, e) {
				1 & t && (Ro(0, 'mat-sidenav-content', 3), Wo(1, 2), Po());
			}
			const u_ = [[['mat-sidenav']], [['mat-sidenav-content']], '*'],
				h_ = ['mat-sidenav', 'mat-sidenav-content', '*'],
				d_ =
					'.mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer{transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}\n',
				p_ = {
					transformDrawer: pd('transform', [
						yd('open, open-instant', gd({ transform: 'none', visibility: 'visible' })),
						yd('void', gd({ 'box-shadow': 'none', visibility: 'hidden' })),
						_d('void => open-instant', fd('0ms')),
						_d('void <=> open, open-instant => void', fd('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
					]),
				},
				f_ = new Bt('MAT_DRAWER_DEFAULT_AUTOSIZE', {
					providedIn: 'root',
					factory: function () {
						return !1;
					},
				}),
				m_ = new Bt('MAT_DRAWER_CONTAINER');
			let g_ = (() => {
					class t extends Ky {
						constructor(t, e, n, i, s) {
							super(n, i, s), (this._changeDetectorRef = t), (this._container = e);
						}
						ngAfterContentInit() {
							this._container._contentMarginChanges.subscribe(() => {
								this._changeDetectorRef.markForCheck();
							});
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(To(Qr), To(Et(() => __)), To(nl), To(Gy), To(xc));
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [['mat-drawer-content']],
							hostAttrs: [1, 'mat-drawer-content'],
							hostVars: 4,
							hostBindings: function (t, e) {
								2 & t &&
									Ko('margin-left', e._container._contentMargins.left, 'px')(
										'margin-right',
										e._container._contentMargins.right,
										'px'
									);
							},
							features: [mo],
							ngContentSelectors: i_,
							decls: 1,
							vars: 0,
							template: function (t, e) {
								1 & t && (Ho(), Wo(0));
							},
							encapsulation: 2,
							changeDetection: 0,
						})),
						t
					);
				})(),
				y_ = (() => {
					class t {
						constructor(t, e, n, i, s, r, o) {
							(this._elementRef = t),
								(this._focusTrapFactory = e),
								(this._focusMonitor = n),
								(this._platform = i),
								(this._ngZone = s),
								(this._doc = r),
								(this._container = o),
								(this._elementFocusedBeforeDrawerWasOpened = null),
								(this._enableAnimations = !1),
								(this._position = 'start'),
								(this._mode = 'over'),
								(this._disableClose = !1),
								(this._opened = !1),
								(this._animationStarted = new S()),
								(this._animationEnd = new S()),
								(this._animationState = 'void'),
								(this.openedChange = new Fl(!0)),
								(this._openedStream = this.openedChange.pipe(
									Th(t => t),
									k(() => {})
								)),
								(this.openedStart = this._animationStarted.pipe(
									Th(t => t.fromState !== t.toState && 0 === t.toState.indexOf('open')),
									t_(void 0)
								)),
								(this._closedStream = this.openedChange.pipe(
									Th(t => !t),
									k(() => {})
								)),
								(this.closedStart = this._animationStarted.pipe(
									Th(t => t.fromState !== t.toState && 'void' === t.toState),
									t_(void 0)
								)),
								(this._destroyed = new S()),
								(this.onPositionChanged = new Fl()),
								(this._modeChanged = new S()),
								this.openedChange.subscribe(t => {
									t
										? (this._doc &&
												(this._elementFocusedBeforeDrawerWasOpened = this._doc.activeElement),
										  this._takeFocus())
										: this._isFocusWithinDrawer() && this._restoreFocus();
								}),
								this._ngZone.runOutsideAngular(() => {
									fg(this._elementRef.nativeElement, 'keydown')
										.pipe(
											Th(
												t =>
													27 === t.keyCode &&
													!this.disableClose &&
													!(function (t, ...e) {
														return e.length
															? e.some(e => t[e])
															: t.altKey || t.shiftKey || t.ctrlKey || t.metaKey;
													})(t)
											),
											lg(this._destroyed)
										)
										.subscribe(t =>
											this._ngZone.run(() => {
												this.close(), t.stopPropagation(), t.preventDefault();
											})
										);
								}),
								this._animationEnd
									.pipe(
										(function (t, e) {
											return e => e.lift(new Ny(t, undefined));
										})((t, e) => t.fromState === e.fromState && t.toState === e.toState)
									)
									.subscribe(t => {
										const { fromState: e, toState: n } = t;
										((0 === n.indexOf('open') && 'void' === e) ||
											('void' === n && 0 === e.indexOf('open'))) &&
											this.openedChange.emit(this._opened);
									});
						}
						get position() {
							return this._position;
						}
						set position(t) {
							(t = 'end' === t ? 'end' : 'start') != this._position &&
								((this._position = t), this.onPositionChanged.emit());
						}
						get mode() {
							return this._mode;
						}
						set mode(t) {
							(this._mode = t), this._updateFocusTrapState(), this._modeChanged.next();
						}
						get disableClose() {
							return this._disableClose;
						}
						set disableClose(t) {
							this._disableClose = Mh(t);
						}
						get autoFocus() {
							const t = this._autoFocus;
							return null == t ? 'side' !== this.mode : t;
						}
						set autoFocus(t) {
							this._autoFocus = Mh(t);
						}
						get opened() {
							return this._opened;
						}
						set opened(t) {
							this.toggle(Mh(t));
						}
						_takeFocus() {
							this.autoFocus &&
								this._focusTrap &&
								this._focusTrap.focusInitialElementWhenReady().then(t => {
									t ||
										'function' != typeof this._elementRef.nativeElement.focus ||
										this._elementRef.nativeElement.focus();
								});
						}
						_restoreFocus() {
							this.autoFocus &&
								(this._elementFocusedBeforeDrawerWasOpened
									? this._focusMonitor.focusVia(
											this._elementFocusedBeforeDrawerWasOpened,
											this._openedVia
									  )
									: this._elementRef.nativeElement.blur(),
								(this._elementFocusedBeforeDrawerWasOpened = null),
								(this._openedVia = null));
						}
						_isFocusWithinDrawer() {
							var t;
							const e = null === (t = this._doc) || void 0 === t ? void 0 : t.activeElement;
							return !!e && this._elementRef.nativeElement.contains(e);
						}
						ngAfterContentInit() {
							(this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement)),
								this._updateFocusTrapState();
						}
						ngAfterContentChecked() {
							this._platform.isBrowser && (this._enableAnimations = !0);
						}
						ngOnDestroy() {
							this._focusTrap && this._focusTrap.destroy(),
								this._animationStarted.complete(),
								this._animationEnd.complete(),
								this._modeChanged.complete(),
								this._destroyed.next(),
								this._destroyed.complete();
						}
						open(t) {
							return this.toggle(!0, t);
						}
						close() {
							return this.toggle(!1);
						}
						_closeViaBackdropClick() {
							return this._setOpen(!1, !0);
						}
						toggle(t = !this.opened, e) {
							return this._setOpen(t, !t && this._isFocusWithinDrawer(), e);
						}
						_setOpen(t, e, n = 'program') {
							return (
								(this._opened = t),
								t
									? ((this._animationState = this._enableAnimations ? 'open' : 'open-instant'),
									  (this._openedVia = n))
									: ((this._animationState = 'void'), e && this._restoreFocus()),
								this._updateFocusTrapState(),
								new Promise(t => {
									this.openedChange.pipe(Lh(1)).subscribe(e => t(e ? 'open' : 'close'));
								})
							);
						}
						_getWidth() {
							return (this._elementRef.nativeElement && this._elementRef.nativeElement.offsetWidth) || 0;
						}
						_updateFocusTrapState() {
							this._focusTrap && (this._focusTrap.enabled = this.opened && 'side' !== this.mode);
						}
						_animationStartListener(t) {
							this._animationStarted.next(t);
						}
						_animationDoneListener(t) {
							this._animationEnd.next(t);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(To(nl), To(Qh), To(Yh), To(uh), To(xc), To(Jc, 8), To(m_, 8));
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [['mat-drawer']],
							hostAttrs: ['tabIndex', '-1', 1, 'mat-drawer'],
							hostVars: 12,
							hostBindings: function (t, e) {
								1 & t &&
									Fo('@transform.start', function (t) {
										return e._animationStartListener(t);
									})('@transform.done', function (t) {
										return e._animationDoneListener(t);
									}),
									2 & t &&
										(Co('align', null),
										la('@transform', e._animationState),
										Yo('mat-drawer-end', 'end' === e.position)(
											'mat-drawer-over',
											'over' === e.mode
										)('mat-drawer-push', 'push' === e.mode)('mat-drawer-side', 'side' === e.mode)(
											'mat-drawer-opened',
											e.opened
										));
							},
							inputs: {
								position: 'position',
								mode: 'mode',
								disableClose: 'disableClose',
								autoFocus: 'autoFocus',
								opened: 'opened',
							},
							outputs: {
								openedChange: 'openedChange',
								_openedStream: 'opened',
								openedStart: 'openedStart',
								_closedStream: 'closed',
								closedStart: 'closedStart',
								onPositionChanged: 'positionChanged',
							},
							exportAs: ['matDrawer'],
							ngContentSelectors: i_,
							decls: 2,
							vars: 0,
							consts: [[1, 'mat-drawer-inner-container']],
							template: function (t, e) {
								1 & t && (Ho(), Ro(0, 'div', 0), Wo(1), Po());
							},
							encapsulation: 2,
							data: { animation: [p_.transformDrawer] },
							changeDetection: 0,
						})),
						t
					);
				})(),
				__ = (() => {
					class t {
						constructor(t, e, n, i, s, r = !1, o) {
							(this._dir = t),
								(this._element = e),
								(this._ngZone = n),
								(this._changeDetectorRef = i),
								(this._animationMode = o),
								(this._drawers = new Bl()),
								(this.backdropClick = new Fl()),
								(this._destroyed = new S()),
								(this._doCheckSubject = new S()),
								(this._contentMargins = { left: null, right: null }),
								(this._contentMarginChanges = new S()),
								t &&
									t.change.pipe(lg(this._destroyed)).subscribe(() => {
										this._validateDrawers(), this.updateContentMargins();
									}),
								s
									.change()
									.pipe(lg(this._destroyed))
									.subscribe(() => this.updateContentMargins()),
								(this._autosize = r);
						}
						get start() {
							return this._start;
						}
						get end() {
							return this._end;
						}
						get autosize() {
							return this._autosize;
						}
						set autosize(t) {
							this._autosize = Mh(t);
						}
						get hasBackdrop() {
							return null == this._backdropOverride
								? !this._start || 'side' !== this._start.mode || !this._end || 'side' !== this._end.mode
								: this._backdropOverride;
						}
						set hasBackdrop(t) {
							this._backdropOverride = null == t ? null : Mh(t);
						}
						get scrollable() {
							return this._userContent || this._content;
						}
						ngAfterContentInit() {
							this._allDrawers.changes.pipe(ud(this._allDrawers), lg(this._destroyed)).subscribe(t => {
								this._drawers.reset(t.filter(t => !t._container || t._container === this)),
									this._drawers.notifyOnChanges();
							}),
								this._drawers.changes.pipe(ud(null)).subscribe(() => {
									this._validateDrawers(),
										this._drawers.forEach(t => {
											this._watchDrawerToggle(t),
												this._watchDrawerPosition(t),
												this._watchDrawerMode(t);
										}),
										(!this._drawers.length ||
											this._isDrawerOpen(this._start) ||
											this._isDrawerOpen(this._end)) &&
											this.updateContentMargins(),
										this._changeDetectorRef.markForCheck();
								}),
								this._ngZone.runOutsideAngular(() => {
									this._doCheckSubject
										.pipe(
											(function (t, e = Sh) {
												return n => n.lift(new Eh(t, e));
											})(10),
											lg(this._destroyed)
										)
										.subscribe(() => this.updateContentMargins());
								});
						}
						ngOnDestroy() {
							this._contentMarginChanges.complete(),
								this._doCheckSubject.complete(),
								this._drawers.destroy(),
								this._destroyed.next(),
								this._destroyed.complete();
						}
						open() {
							this._drawers.forEach(t => t.open());
						}
						close() {
							this._drawers.forEach(t => t.close());
						}
						updateContentMargins() {
							let t = 0,
								e = 0;
							if (this._left && this._left.opened)
								if ('side' == this._left.mode) t += this._left._getWidth();
								else if ('push' == this._left.mode) {
									const n = this._left._getWidth();
									(t += n), (e -= n);
								}
							if (this._right && this._right.opened)
								if ('side' == this._right.mode) e += this._right._getWidth();
								else if ('push' == this._right.mode) {
									const n = this._right._getWidth();
									(e += n), (t -= n);
								}
							(t = t || null),
								(e = e || null),
								(t === this._contentMargins.left && e === this._contentMargins.right) ||
									((this._contentMargins = { left: t, right: e }),
									this._ngZone.run(() => this._contentMarginChanges.next(this._contentMargins)));
						}
						ngDoCheck() {
							this._autosize &&
								this._isPushed() &&
								this._ngZone.runOutsideAngular(() => this._doCheckSubject.next());
						}
						_watchDrawerToggle(t) {
							t._animationStarted
								.pipe(
									Th(t => t.fromState !== t.toState),
									lg(this._drawers.changes)
								)
								.subscribe(t => {
									'open-instant' !== t.toState &&
										'NoopAnimations' !== this._animationMode &&
										this._element.nativeElement.classList.add('mat-drawer-transition'),
										this.updateContentMargins(),
										this._changeDetectorRef.markForCheck();
								}),
								'side' !== t.mode &&
									t.openedChange
										.pipe(lg(this._drawers.changes))
										.subscribe(() => this._setContainerClass(t.opened));
						}
						_watchDrawerPosition(t) {
							t &&
								t.onPositionChanged.pipe(lg(this._drawers.changes)).subscribe(() => {
									this._ngZone.onMicrotaskEmpty.pipe(Lh(1)).subscribe(() => {
										this._validateDrawers();
									});
								});
						}
						_watchDrawerMode(t) {
							t &&
								t._modeChanged.pipe(lg(W(this._drawers.changes, this._destroyed))).subscribe(() => {
									this.updateContentMargins(), this._changeDetectorRef.markForCheck();
								});
						}
						_setContainerClass(t) {
							const e = this._element.nativeElement.classList,
								n = 'mat-drawer-container-has-open';
							t ? e.add(n) : e.remove(n);
						}
						_validateDrawers() {
							(this._start = this._end = null),
								this._drawers.forEach(t => {
									'end' == t.position ? (this._end = t) : (this._start = t);
								}),
								(this._right = this._left = null),
								this._dir && 'rtl' === this._dir.value
									? ((this._left = this._end), (this._right = this._start))
									: ((this._left = this._start), (this._right = this._end));
						}
						_isPushed() {
							return (
								(this._isDrawerOpen(this._start) && 'over' != this._start.mode) ||
								(this._isDrawerOpen(this._end) && 'over' != this._end.mode)
							);
						}
						_onBackdropClicked() {
							this.backdropClick.emit(), this._closeModalDrawersViaBackdrop();
						}
						_closeModalDrawersViaBackdrop() {
							[this._start, this._end]
								.filter(t => t && !t.disableClose && this._canHaveBackdrop(t))
								.forEach(t => t._closeViaBackdropClick());
						}
						_isShowingBackdrop() {
							return (
								(this._isDrawerOpen(this._start) && this._canHaveBackdrop(this._start)) ||
								(this._isDrawerOpen(this._end) && this._canHaveBackdrop(this._end))
							);
						}
						_canHaveBackdrop(t) {
							return 'side' !== t.mode || !!this._backdropOverride;
						}
						_isDrawerOpen(t) {
							return null != t && t.opened;
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(To(rd, 8), To(nl), To(xc), To(Qr), To(Yy), To(f_), To(Wf, 8));
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [['mat-drawer-container']],
							contentQueries: function (t, e, n) {
								var i;
								1 & t && (Kl(n, g_, !0), Kl(n, y_, !0)),
									2 & t &&
										(Zl((i = Yl())) && (e._content = i.first),
										Zl((i = Yl())) && (e._allDrawers = i));
							},
							viewQuery: function (t, e) {
								var n;
								1 & t && Gl(g_, !0), 2 & t && Zl((n = Yl())) && (e._userContent = n.first);
							},
							hostAttrs: [1, 'mat-drawer-container'],
							hostVars: 2,
							hostBindings: function (t, e) {
								2 & t && Yo('mat-drawer-container-explicit-backdrop', e._backdropOverride);
							},
							inputs: { autosize: 'autosize', hasBackdrop: 'hasBackdrop' },
							outputs: { backdropClick: 'backdropClick' },
							exportAs: ['matDrawerContainer'],
							features: [Xa([{ provide: m_, useExisting: t }])],
							ngContentSelectors: a_,
							decls: 4,
							vars: 2,
							consts: [
								['class', 'mat-drawer-backdrop', 3, 'mat-drawer-shown', 'click', 4, 'ngIf'],
								[4, 'ngIf'],
								[1, 'mat-drawer-backdrop', 3, 'click'],
							],
							template: function (t, e) {
								1 & t &&
									(Ho(o_),
									ko(0, s_, 1, 2, 'div', 0),
									Wo(1),
									Wo(2, 1),
									ko(3, r_, 2, 0, 'mat-drawer-content', 1)),
									2 & t && (Io('ngIf', e.hasBackdrop), Ss(3), Io('ngIf', !e._content));
							},
							directives: [bu, g_],
							styles: [d_],
							encapsulation: 2,
							changeDetection: 0,
						})),
						t
					);
				})(),
				v_ = (() => {
					class t extends g_ {
						constructor(t, e, n, i, s) {
							super(t, e, n, i, s);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(To(Qr), To(Et(() => x_)), To(nl), To(Gy), To(xc));
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [['mat-sidenav-content']],
							hostAttrs: [1, 'mat-drawer-content', 'mat-sidenav-content'],
							hostVars: 4,
							hostBindings: function (t, e) {
								2 & t &&
									Ko('margin-left', e._container._contentMargins.left, 'px')(
										'margin-right',
										e._container._contentMargins.right,
										'px'
									);
							},
							features: [mo],
							ngContentSelectors: i_,
							decls: 1,
							vars: 0,
							template: function (t, e) {
								1 & t && (Ho(), Wo(0));
							},
							encapsulation: 2,
							changeDetection: 0,
						})),
						t
					);
				})(),
				b_ = (() => {
					class t extends y_ {
						constructor() {
							super(...arguments),
								(this._fixedInViewport = !1),
								(this._fixedTopGap = 0),
								(this._fixedBottomGap = 0);
						}
						get fixedInViewport() {
							return this._fixedInViewport;
						}
						set fixedInViewport(t) {
							this._fixedInViewport = Mh(t);
						}
						get fixedTopGap() {
							return this._fixedTopGap;
						}
						set fixedTopGap(t) {
							this._fixedTopGap = Fh(t);
						}
						get fixedBottomGap() {
							return this._fixedBottomGap;
						}
						set fixedBottomGap(t) {
							this._fixedBottomGap = Fh(t);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return w_(e || t);
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [['mat-sidenav']],
							hostAttrs: ['tabIndex', '-1', 1, 'mat-drawer', 'mat-sidenav'],
							hostVars: 17,
							hostBindings: function (t, e) {
								2 & t &&
									(Co('align', null),
									Ko('top', e.fixedInViewport ? e.fixedTopGap : null, 'px')(
										'bottom',
										e.fixedInViewport ? e.fixedBottomGap : null,
										'px'
									),
									Yo('mat-drawer-end', 'end' === e.position)('mat-drawer-over', 'over' === e.mode)(
										'mat-drawer-push',
										'push' === e.mode
									)('mat-drawer-side', 'side' === e.mode)('mat-drawer-opened', e.opened)(
										'mat-sidenav-fixed',
										e.fixedInViewport
									));
							},
							inputs: {
								fixedInViewport: 'fixedInViewport',
								fixedTopGap: 'fixedTopGap',
								fixedBottomGap: 'fixedBottomGap',
							},
							exportAs: ['matSidenav'],
							features: [mo],
							ngContentSelectors: i_,
							decls: 2,
							vars: 0,
							consts: [[1, 'mat-drawer-inner-container']],
							template: function (t, e) {
								1 & t && (Ho(), Ro(0, 'div', 0), Wo(1), Po());
							},
							encapsulation: 2,
							data: { animation: [p_.transformDrawer] },
							changeDetection: 0,
						})),
						t
					);
				})();
			const w_ = mi(b_);
			let x_ = (() => {
				class t extends __ {}
				return (
					(t.ɵfac = function (e) {
						return S_(e || t);
					}),
					(t.ɵcmp = ge({
						type: t,
						selectors: [['mat-sidenav-container']],
						contentQueries: function (t, e, n) {
							var i;
							1 & t && (Kl(n, v_, !0), Kl(n, b_, !0)),
								2 & t &&
									(Zl((i = Yl())) && (e._content = i.first), Zl((i = Yl())) && (e._allDrawers = i));
						},
						hostAttrs: [1, 'mat-drawer-container', 'mat-sidenav-container'],
						hostVars: 2,
						hostBindings: function (t, e) {
							2 & t && Yo('mat-drawer-container-explicit-backdrop', e._backdropOverride);
						},
						exportAs: ['matSidenavContainer'],
						features: [Xa([{ provide: m_, useExisting: t }]), mo],
						ngContentSelectors: h_,
						decls: 4,
						vars: 2,
						consts: [
							['class', 'mat-drawer-backdrop', 3, 'mat-drawer-shown', 'click', 4, 'ngIf'],
							['cdkScrollable', '', 4, 'ngIf'],
							[1, 'mat-drawer-backdrop', 3, 'click'],
							['cdkScrollable', ''],
						],
						template: function (t, e) {
							1 & t &&
								(Ho(u_),
								ko(0, l_, 1, 2, 'div', 0),
								Wo(1),
								Wo(2, 1),
								ko(3, c_, 2, 0, 'mat-sidenav-content', 1)),
								2 & t && (Io('ngIf', e.hasBackdrop), Ss(3), Io('ngIf', !e._content));
						},
						directives: [bu, v_, Ky],
						styles: [d_],
						encapsulation: 2,
						changeDetection: 0,
					})),
					t
				);
			})();
			const S_ = mi(x_);
			let E_ = (() => {
				class t {}
				return (
					(t.ɵmod = be({ type: t })),
					(t.ɵinj = dt({
						factory: function (e) {
							return new (e || t)();
						},
						imports: [[Su, Xf, hh, Xy], Xy, Xf],
					})),
					t
				);
			})();
			class C_ {
				attach(t) {
					return (this._attachedHost = t), t.attach(this);
				}
				detach() {
					let t = this._attachedHost;
					null != t && ((this._attachedHost = null), t.detach());
				}
				get isAttached() {
					return null != this._attachedHost;
				}
				setAttachedHost(t) {
					this._attachedHost = t;
				}
			}
			class k_ extends C_ {
				constructor(t, e, n, i) {
					super(),
						(this.component = t),
						(this.viewContainerRef = e),
						(this.injector = n),
						(this.componentFactoryResolver = i);
				}
			}
			class T_ extends C_ {
				constructor(t, e, n) {
					super(), (this.templateRef = t), (this.viewContainerRef = e), (this.context = n);
				}
				get origin() {
					return this.templateRef.elementRef;
				}
				attach(t, e = this.context) {
					return (this.context = e), super.attach(t);
				}
				detach() {
					return (this.context = void 0), super.detach();
				}
			}
			class A_ extends C_ {
				constructor(t) {
					super(), (this.element = t instanceof nl ? t.nativeElement : t);
				}
			}
			class I_ extends class {
				constructor() {
					(this._isDisposed = !1), (this.attachDomPortal = null);
				}
				hasAttached() {
					return !!this._attachedPortal;
				}
				attach(t) {
					return t instanceof k_
						? ((this._attachedPortal = t), this.attachComponentPortal(t))
						: t instanceof T_
						? ((this._attachedPortal = t), this.attachTemplatePortal(t))
						: this.attachDomPortal && t instanceof A_
						? ((this._attachedPortal = t), this.attachDomPortal(t))
						: void 0;
				}
				detach() {
					this._attachedPortal && (this._attachedPortal.setAttachedHost(null), (this._attachedPortal = null)),
						this._invokeDisposeFn();
				}
				dispose() {
					this.hasAttached() && this.detach(), this._invokeDisposeFn(), (this._isDisposed = !0);
				}
				setDisposeFn(t) {
					this._disposeFn = t;
				}
				_invokeDisposeFn() {
					this._disposeFn && (this._disposeFn(), (this._disposeFn = null));
				}
			} {
				constructor(t, e, n, i, s) {
					super(),
						(this.outletElement = t),
						(this._componentFactoryResolver = e),
						(this._appRef = n),
						(this._defaultInjector = i),
						(this.attachDomPortal = t => {
							const e = t.element,
								n = this._document.createComment('dom-portal');
							e.parentNode.insertBefore(n, e),
								this.outletElement.appendChild(e),
								super.setDisposeFn(() => {
									n.parentNode && n.parentNode.replaceChild(e, n);
								});
						}),
						(this._document = s);
				}
				attachComponentPortal(t) {
					const e = (t.componentFactoryResolver || this._componentFactoryResolver).resolveComponentFactory(
						t.component
					);
					let n;
					return (
						t.viewContainerRef
							? ((n = t.viewContainerRef.createComponent(
									e,
									t.viewContainerRef.length,
									t.injector || t.viewContainerRef.injector
							  )),
							  this.setDisposeFn(() => n.destroy()))
							: ((n = e.create(t.injector || this._defaultInjector)),
							  this._appRef.attachView(n.hostView),
							  this.setDisposeFn(() => {
									this._appRef.detachView(n.hostView), n.destroy();
							  })),
						this.outletElement.appendChild(this._getComponentRootNode(n)),
						n
					);
				}
				attachTemplatePortal(t) {
					let e = t.viewContainerRef,
						n = e.createEmbeddedView(t.templateRef, t.context);
					return (
						n.rootNodes.forEach(t => this.outletElement.appendChild(t)),
						n.detectChanges(),
						this.setDisposeFn(() => {
							let t = e.indexOf(n);
							-1 !== t && e.remove(t);
						}),
						n
					);
				}
				dispose() {
					super.dispose(),
						null != this.outletElement.parentNode &&
							this.outletElement.parentNode.removeChild(this.outletElement);
				}
				_getComponentRootNode(t) {
					return t.hostView.rootNodes[0];
				}
			}
			let O_ = (() => {
				class t {}
				return (
					(t.ɵmod = be({ type: t })),
					(t.ɵinj = dt({
						factory: function (e) {
							return new (e || t)();
						},
					})),
					t
				);
			})();
			class R_ {
				constructor(t, e) {
					(this._viewportRuler = t),
						(this._previousHTMLStyles = { top: '', left: '' }),
						(this._isEnabled = !1),
						(this._document = e);
				}
				attach() {}
				enable() {
					if (this._canBeEnabled()) {
						const t = this._document.documentElement;
						(this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition()),
							(this._previousHTMLStyles.left = t.style.left || ''),
							(this._previousHTMLStyles.top = t.style.top || ''),
							(t.style.left = Bh(-this._previousScrollPosition.left)),
							(t.style.top = Bh(-this._previousScrollPosition.top)),
							t.classList.add('cdk-global-scrollblock'),
							(this._isEnabled = !0);
					}
				}
				disable() {
					if (this._isEnabled) {
						const t = this._document.documentElement,
							e = t.style,
							n = this._document.body.style,
							i = e.scrollBehavior || '',
							s = n.scrollBehavior || '';
						(this._isEnabled = !1),
							(e.left = this._previousHTMLStyles.left),
							(e.top = this._previousHTMLStyles.top),
							t.classList.remove('cdk-global-scrollblock'),
							(e.scrollBehavior = n.scrollBehavior = 'auto'),
							window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top),
							(e.scrollBehavior = i),
							(n.scrollBehavior = s);
					}
				}
				_canBeEnabled() {
					if (this._document.documentElement.classList.contains('cdk-global-scrollblock') || this._isEnabled)
						return !1;
					const t = this._document.body,
						e = this._viewportRuler.getViewportSize();
					return t.scrollHeight > e.height || t.scrollWidth > e.width;
				}
			}
			class P_ {
				constructor(t, e, n, i) {
					(this._scrollDispatcher = t),
						(this._ngZone = e),
						(this._viewportRuler = n),
						(this._config = i),
						(this._scrollSubscription = null),
						(this._detach = () => {
							this.disable(),
								this._overlayRef.hasAttached() && this._ngZone.run(() => this._overlayRef.detach());
						});
				}
				attach(t) {
					this._overlayRef = t;
				}
				enable() {
					if (this._scrollSubscription) return;
					const t = this._scrollDispatcher.scrolled(0);
					this._config && this._config.threshold && this._config.threshold > 1
						? ((this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top),
						  (this._scrollSubscription = t.subscribe(() => {
								const t = this._viewportRuler.getViewportScrollPosition().top;
								Math.abs(t - this._initialScrollPosition) > this._config.threshold
									? this._detach()
									: this._overlayRef.updatePosition();
						  })))
						: (this._scrollSubscription = t.subscribe(this._detach));
				}
				disable() {
					this._scrollSubscription &&
						(this._scrollSubscription.unsubscribe(), (this._scrollSubscription = null));
				}
				detach() {
					this.disable(), (this._overlayRef = null);
				}
			}
			class L_ {
				enable() {}
				disable() {}
				attach() {}
			}
			function N_(t, e) {
				return e.some(e => t.bottom < e.top || t.top > e.bottom || t.right < e.left || t.left > e.right);
			}
			function D_(t, e) {
				return e.some(e => t.top < e.top || t.bottom > e.bottom || t.left < e.left || t.right > e.right);
			}
			class M_ {
				constructor(t, e, n, i) {
					(this._scrollDispatcher = t),
						(this._viewportRuler = e),
						(this._ngZone = n),
						(this._config = i),
						(this._scrollSubscription = null);
				}
				attach(t) {
					this._overlayRef = t;
				}
				enable() {
					this._scrollSubscription ||
						(this._scrollSubscription = this._scrollDispatcher
							.scrolled(this._config ? this._config.scrollThrottle : 0)
							.subscribe(() => {
								if ((this._overlayRef.updatePosition(), this._config && this._config.autoClose)) {
									const t = this._overlayRef.overlayElement.getBoundingClientRect(),
										{ width: e, height: n } = this._viewportRuler.getViewportSize();
									N_(t, [{ width: e, height: n, bottom: n, right: e, top: 0, left: 0 }]) &&
										(this.disable(), this._ngZone.run(() => this._overlayRef.detach()));
								}
							}));
				}
				disable() {
					this._scrollSubscription &&
						(this._scrollSubscription.unsubscribe(), (this._scrollSubscription = null));
				}
				detach() {
					this.disable(), (this._overlayRef = null);
				}
			}
			let F_ = (() => {
				class t {
					constructor(t, e, n, i) {
						(this._scrollDispatcher = t),
							(this._viewportRuler = e),
							(this._ngZone = n),
							(this.noop = () => new L_()),
							(this.close = t => new P_(this._scrollDispatcher, this._ngZone, this._viewportRuler, t)),
							(this.block = () => new R_(this._viewportRuler, this._document)),
							(this.reposition = t =>
								new M_(this._scrollDispatcher, this._viewportRuler, this._ngZone, t)),
							(this._document = i);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(Gy), Kt(Yy), Kt(xc), Kt(Jc));
					}),
					(t.ɵprov = ht({
						factory: function () {
							return new t(Kt(Gy), Kt(Yy), Kt(xc), Kt(Jc));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			class j_ {
				constructor(t) {
					if (
						((this.scrollStrategy = new L_()),
						(this.panelClass = ''),
						(this.hasBackdrop = !1),
						(this.backdropClass = 'cdk-overlay-dark-backdrop'),
						(this.disposeOnNavigation = !1),
						t)
					) {
						const e = Object.keys(t);
						for (const n of e) void 0 !== t[n] && (this[n] = t[n]);
					}
				}
			}
			class B_ {
				constructor(t, e, n, i, s) {
					(this.offsetX = n),
						(this.offsetY = i),
						(this.panelClass = s),
						(this.originX = t.originX),
						(this.originY = t.originY),
						(this.overlayX = e.overlayX),
						(this.overlayY = e.overlayY);
				}
			}
			class z_ {
				constructor(t, e) {
					(this.connectionPair = t), (this.scrollableViewProperties = e);
				}
			}
			let V_ = (() => {
					class t {
						constructor(t) {
							(this._attachedOverlays = []), (this._document = t);
						}
						ngOnDestroy() {
							this.detach();
						}
						add(t) {
							this.remove(t), this._attachedOverlays.push(t);
						}
						remove(t) {
							const e = this._attachedOverlays.indexOf(t);
							e > -1 && this._attachedOverlays.splice(e, 1),
								0 === this._attachedOverlays.length && this.detach();
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(Jc));
						}),
						(t.ɵprov = ht({
							factory: function () {
								return new t(Kt(Jc));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				U_ = (() => {
					class t extends V_ {
						constructor(t) {
							super(t),
								(this._keydownListener = t => {
									const e = this._attachedOverlays;
									for (let n = e.length - 1; n > -1; n--)
										if (e[n]._keydownEvents.observers.length > 0) {
											e[n]._keydownEvents.next(t);
											break;
										}
								});
						}
						add(t) {
							super.add(t),
								this._isAttached ||
									(this._document.body.addEventListener('keydown', this._keydownListener),
									(this._isAttached = !0));
						}
						detach() {
							this._isAttached &&
								(this._document.body.removeEventListener('keydown', this._keydownListener),
								(this._isAttached = !1));
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(Jc));
						}),
						(t.ɵprov = ht({
							factory: function () {
								return new t(Kt(Jc));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				H_ = (() => {
					class t extends V_ {
						constructor(t, e) {
							super(t),
								(this._platform = e),
								(this._cursorStyleIsSet = !1),
								(this._clickListener = t => {
									const e = t.composedPath ? t.composedPath()[0] : t.target,
										n = this._attachedOverlays.slice();
									for (let i = n.length - 1; i > -1; i--) {
										const s = n[i];
										if (!(s._outsidePointerEvents.observers.length < 1) && s.hasAttached()) {
											if (s.overlayElement.contains(e)) break;
											s._outsidePointerEvents.next(t);
										}
									}
								});
						}
						add(t) {
							super.add(t),
								this._isAttached ||
									(this._document.body.addEventListener('click', this._clickListener, !0),
									this._document.body.addEventListener('contextmenu', this._clickListener, !0),
									this._platform.IOS &&
										!this._cursorStyleIsSet &&
										((this._cursorOriginalValue = this._document.body.style.cursor),
										(this._document.body.style.cursor = 'pointer'),
										(this._cursorStyleIsSet = !0)),
									(this._isAttached = !0));
						}
						detach() {
							this._isAttached &&
								(this._document.body.removeEventListener('click', this._clickListener, !0),
								this._document.body.removeEventListener('contextmenu', this._clickListener, !0),
								this._platform.IOS &&
									this._cursorStyleIsSet &&
									((this._document.body.style.cursor = this._cursorOriginalValue),
									(this._cursorStyleIsSet = !1)),
								(this._isAttached = !1));
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(Jc), Kt(uh));
						}),
						(t.ɵprov = ht({
							factory: function () {
								return new t(Kt(Jc), Kt(uh));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})();
			const $_ = !('undefined' == typeof window || !window || (!window.__karma__ && !window.jasmine));
			let q_ = (() => {
				class t {
					constructor(t, e) {
						(this._platform = e), (this._document = t);
					}
					ngOnDestroy() {
						const t = this._containerElement;
						t && t.parentNode && t.parentNode.removeChild(t);
					}
					getContainerElement() {
						return this._containerElement || this._createContainer(), this._containerElement;
					}
					_createContainer() {
						const t = this._platform ? this._platform.isBrowser : 'undefined' != typeof window,
							e = 'cdk-overlay-container';
						if (t || $_) {
							const t = this._document.querySelectorAll(
								`.${e}[platform="server"], .${e}[platform="test"]`
							);
							for (let e = 0; e < t.length; e++) t[e].parentNode.removeChild(t[e]);
						}
						const n = this._document.createElement('div');
						n.classList.add(e),
							$_ ? n.setAttribute('platform', 'test') : t || n.setAttribute('platform', 'server'),
							this._document.body.appendChild(n),
							(this._containerElement = n);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(Jc), Kt(uh));
					}),
					(t.ɵprov = ht({
						factory: function () {
							return new t(Kt(Jc), Kt(uh));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			class W_ {
				constructor(t, e, n, i, s, r, o, a, l) {
					(this._portalOutlet = t),
						(this._host = e),
						(this._pane = n),
						(this._config = i),
						(this._ngZone = s),
						(this._keyboardDispatcher = r),
						(this._document = o),
						(this._location = a),
						(this._outsideClickDispatcher = l),
						(this._backdropElement = null),
						(this._backdropClick = new S()),
						(this._attachments = new S()),
						(this._detachments = new S()),
						(this._locationChanges = h.EMPTY),
						(this._backdropClickHandler = t => this._backdropClick.next(t)),
						(this._keydownEvents = new S()),
						(this._outsidePointerEvents = new S()),
						i.scrollStrategy &&
							((this._scrollStrategy = i.scrollStrategy), this._scrollStrategy.attach(this)),
						(this._positionStrategy = i.positionStrategy);
				}
				get overlayElement() {
					return this._pane;
				}
				get backdropElement() {
					return this._backdropElement;
				}
				get hostElement() {
					return this._host;
				}
				attach(t) {
					let e = this._portalOutlet.attach(t);
					return (
						!this._host.parentElement &&
							this._previousHostParent &&
							this._previousHostParent.appendChild(this._host),
						this._positionStrategy && this._positionStrategy.attach(this),
						this._updateStackingOrder(),
						this._updateElementSize(),
						this._updateElementDirection(),
						this._scrollStrategy && this._scrollStrategy.enable(),
						this._ngZone.onStable.pipe(Lh(1)).subscribe(() => {
							this.hasAttached() && this.updatePosition();
						}),
						this._togglePointerEvents(!0),
						this._config.hasBackdrop && this._attachBackdrop(),
						this._config.panelClass && this._toggleClasses(this._pane, this._config.panelClass, !0),
						this._attachments.next(),
						this._keyboardDispatcher.add(this),
						this._config.disposeOnNavigation &&
							this._location &&
							(this._locationChanges = this._location.subscribe(() => this.dispose())),
						this._outsideClickDispatcher && this._outsideClickDispatcher.add(this),
						e
					);
				}
				detach() {
					if (!this.hasAttached()) return;
					this.detachBackdrop(),
						this._togglePointerEvents(!1),
						this._positionStrategy && this._positionStrategy.detach && this._positionStrategy.detach(),
						this._scrollStrategy && this._scrollStrategy.disable();
					const t = this._portalOutlet.detach();
					return (
						this._detachments.next(),
						this._keyboardDispatcher.remove(this),
						this._detachContentWhenStable(),
						this._locationChanges.unsubscribe(),
						this._outsideClickDispatcher && this._outsideClickDispatcher.remove(this),
						t
					);
				}
				dispose() {
					const t = this.hasAttached();
					this._positionStrategy && this._positionStrategy.dispose(),
						this._disposeScrollStrategy(),
						this.detachBackdrop(),
						this._locationChanges.unsubscribe(),
						this._keyboardDispatcher.remove(this),
						this._portalOutlet.dispose(),
						this._attachments.complete(),
						this._backdropClick.complete(),
						this._keydownEvents.complete(),
						this._outsidePointerEvents.complete(),
						this._outsideClickDispatcher && this._outsideClickDispatcher.remove(this),
						this._host &&
							this._host.parentNode &&
							(this._host.parentNode.removeChild(this._host), (this._host = null)),
						(this._previousHostParent = this._pane = null),
						t && this._detachments.next(),
						this._detachments.complete();
				}
				hasAttached() {
					return this._portalOutlet.hasAttached();
				}
				backdropClick() {
					return this._backdropClick;
				}
				attachments() {
					return this._attachments;
				}
				detachments() {
					return this._detachments;
				}
				keydownEvents() {
					return this._keydownEvents;
				}
				outsidePointerEvents() {
					return this._outsidePointerEvents;
				}
				getConfig() {
					return this._config;
				}
				updatePosition() {
					this._positionStrategy && this._positionStrategy.apply();
				}
				updatePositionStrategy(t) {
					t !== this._positionStrategy &&
						(this._positionStrategy && this._positionStrategy.dispose(),
						(this._positionStrategy = t),
						this.hasAttached() && (t.attach(this), this.updatePosition()));
				}
				updateSize(t) {
					(this._config = Object.assign(Object.assign({}, this._config), t)), this._updateElementSize();
				}
				setDirection(t) {
					(this._config = Object.assign(Object.assign({}, this._config), { direction: t })),
						this._updateElementDirection();
				}
				addPanelClass(t) {
					this._pane && this._toggleClasses(this._pane, t, !0);
				}
				removePanelClass(t) {
					this._pane && this._toggleClasses(this._pane, t, !1);
				}
				getDirection() {
					const t = this._config.direction;
					return t ? ('string' == typeof t ? t : t.value) : 'ltr';
				}
				updateScrollStrategy(t) {
					t !== this._scrollStrategy &&
						(this._disposeScrollStrategy(),
						(this._scrollStrategy = t),
						this.hasAttached() && (t.attach(this), t.enable()));
				}
				_updateElementDirection() {
					this._host.setAttribute('dir', this.getDirection());
				}
				_updateElementSize() {
					if (!this._pane) return;
					const t = this._pane.style;
					(t.width = Bh(this._config.width)),
						(t.height = Bh(this._config.height)),
						(t.minWidth = Bh(this._config.minWidth)),
						(t.minHeight = Bh(this._config.minHeight)),
						(t.maxWidth = Bh(this._config.maxWidth)),
						(t.maxHeight = Bh(this._config.maxHeight));
				}
				_togglePointerEvents(t) {
					this._pane.style.pointerEvents = t ? 'auto' : 'none';
				}
				_attachBackdrop() {
					const t = 'cdk-overlay-backdrop-showing';
					(this._backdropElement = this._document.createElement('div')),
						this._backdropElement.classList.add('cdk-overlay-backdrop'),
						this._config.backdropClass &&
							this._toggleClasses(this._backdropElement, this._config.backdropClass, !0),
						this._host.parentElement.insertBefore(this._backdropElement, this._host),
						this._backdropElement.addEventListener('click', this._backdropClickHandler),
						'undefined' != typeof requestAnimationFrame
							? this._ngZone.runOutsideAngular(() => {
									requestAnimationFrame(() => {
										this._backdropElement && this._backdropElement.classList.add(t);
									});
							  })
							: this._backdropElement.classList.add(t);
				}
				_updateStackingOrder() {
					this._host.nextSibling && this._host.parentNode.appendChild(this._host);
				}
				detachBackdrop() {
					let t,
						e = this._backdropElement;
					if (!e) return;
					let n = () => {
						e &&
							(e.removeEventListener('click', this._backdropClickHandler),
							e.removeEventListener('transitionend', n),
							e.parentNode && e.parentNode.removeChild(e)),
							this._backdropElement == e && (this._backdropElement = null),
							this._config.backdropClass && this._toggleClasses(e, this._config.backdropClass, !1),
							clearTimeout(t);
					};
					e.classList.remove('cdk-overlay-backdrop-showing'),
						this._ngZone.runOutsideAngular(() => {
							e.addEventListener('transitionend', n);
						}),
						(e.style.pointerEvents = 'none'),
						(t = this._ngZone.runOutsideAngular(() => setTimeout(n, 500)));
				}
				_toggleClasses(t, e, n) {
					const i = t.classList;
					jh(e).forEach(t => {
						t && (n ? i.add(t) : i.remove(t));
					});
				}
				_detachContentWhenStable() {
					this._ngZone.runOutsideAngular(() => {
						const t = this._ngZone.onStable
							.pipe(lg(W(this._attachments, this._detachments)))
							.subscribe(() => {
								(this._pane && this._host && 0 !== this._pane.children.length) ||
									(this._pane &&
										this._config.panelClass &&
										this._toggleClasses(this._pane, this._config.panelClass, !1),
									this._host &&
										this._host.parentElement &&
										((this._previousHostParent = this._host.parentElement),
										this._previousHostParent.removeChild(this._host)),
									t.unsubscribe());
							});
					});
				}
				_disposeScrollStrategy() {
					const t = this._scrollStrategy;
					t && (t.disable(), t.detach && t.detach());
				}
			}
			const Q_ = 'cdk-overlay-connected-position-bounding-box',
				Z_ = /([A-Za-z%]+)$/;
			class G_ {
				constructor(t, e, n, i, s) {
					(this._viewportRuler = e),
						(this._document = n),
						(this._platform = i),
						(this._overlayContainer = s),
						(this._lastBoundingBoxSize = { width: 0, height: 0 }),
						(this._isPushed = !1),
						(this._canPush = !0),
						(this._growAfterOpen = !1),
						(this._hasFlexibleDimensions = !0),
						(this._positionLocked = !1),
						(this._viewportMargin = 0),
						(this._scrollables = []),
						(this._preferredPositions = []),
						(this._positionChanges = new S()),
						(this._resizeSubscription = h.EMPTY),
						(this._offsetX = 0),
						(this._offsetY = 0),
						(this._appliedPanelClasses = []),
						(this.positionChanges = this._positionChanges),
						this.setOrigin(t);
				}
				get positions() {
					return this._preferredPositions;
				}
				attach(t) {
					this._validatePositions(),
						t.hostElement.classList.add(Q_),
						(this._overlayRef = t),
						(this._boundingBox = t.hostElement),
						(this._pane = t.overlayElement),
						(this._isDisposed = !1),
						(this._isInitialRender = !0),
						(this._lastPosition = null),
						this._resizeSubscription.unsubscribe(),
						(this._resizeSubscription = this._viewportRuler.change().subscribe(() => {
							(this._isInitialRender = !0), this.apply();
						}));
				}
				apply() {
					if (this._isDisposed || !this._platform.isBrowser) return;
					if (!this._isInitialRender && this._positionLocked && this._lastPosition)
						return void this.reapplyLastPosition();
					this._clearPanelClasses(),
						this._resetOverlayElementStyles(),
						this._resetBoundingBoxStyles(),
						(this._viewportRect = this._getNarrowedViewportRect()),
						(this._originRect = this._getOriginRect()),
						(this._overlayRect = this._pane.getBoundingClientRect());
					const t = this._originRect,
						e = this._overlayRect,
						n = this._viewportRect,
						i = [];
					let s;
					for (let r of this._preferredPositions) {
						let o = this._getOriginPoint(t, r),
							a = this._getOverlayPoint(o, e, r),
							l = this._getOverlayFit(a, e, n, r);
						if (l.isCompletelyWithinViewport) return (this._isPushed = !1), void this._applyPosition(r, o);
						this._canFitWithFlexibleDimensions(l, a, n)
							? i.push({
									position: r,
									origin: o,
									overlayRect: e,
									boundingBoxRect: this._calculateBoundingBoxRect(o, r),
							  })
							: (!s || s.overlayFit.visibleArea < l.visibleArea) &&
							  (s = { overlayFit: l, overlayPoint: a, originPoint: o, position: r, overlayRect: e });
					}
					if (i.length) {
						let t = null,
							e = -1;
						for (const n of i) {
							const i = n.boundingBoxRect.width * n.boundingBoxRect.height * (n.position.weight || 1);
							i > e && ((e = i), (t = n));
						}
						return (this._isPushed = !1), void this._applyPosition(t.position, t.origin);
					}
					if (this._canPush)
						return (this._isPushed = !0), void this._applyPosition(s.position, s.originPoint);
					this._applyPosition(s.position, s.originPoint);
				}
				detach() {
					this._clearPanelClasses(),
						(this._lastPosition = null),
						(this._previousPushAmount = null),
						this._resizeSubscription.unsubscribe();
				}
				dispose() {
					this._isDisposed ||
						(this._boundingBox &&
							K_(this._boundingBox.style, {
								top: '',
								left: '',
								right: '',
								bottom: '',
								height: '',
								width: '',
								alignItems: '',
								justifyContent: '',
							}),
						this._pane && this._resetOverlayElementStyles(),
						this._overlayRef && this._overlayRef.hostElement.classList.remove(Q_),
						this.detach(),
						this._positionChanges.complete(),
						(this._overlayRef = this._boundingBox = null),
						(this._isDisposed = !0));
				}
				reapplyLastPosition() {
					if (!this._isDisposed && (!this._platform || this._platform.isBrowser)) {
						(this._originRect = this._getOriginRect()),
							(this._overlayRect = this._pane.getBoundingClientRect()),
							(this._viewportRect = this._getNarrowedViewportRect());
						const t = this._lastPosition || this._preferredPositions[0],
							e = this._getOriginPoint(this._originRect, t);
						this._applyPosition(t, e);
					}
				}
				withScrollableContainers(t) {
					return (this._scrollables = t), this;
				}
				withPositions(t) {
					return (
						(this._preferredPositions = t),
						-1 === t.indexOf(this._lastPosition) && (this._lastPosition = null),
						this._validatePositions(),
						this
					);
				}
				withViewportMargin(t) {
					return (this._viewportMargin = t), this;
				}
				withFlexibleDimensions(t = !0) {
					return (this._hasFlexibleDimensions = t), this;
				}
				withGrowAfterOpen(t = !0) {
					return (this._growAfterOpen = t), this;
				}
				withPush(t = !0) {
					return (this._canPush = t), this;
				}
				withLockedPosition(t = !0) {
					return (this._positionLocked = t), this;
				}
				setOrigin(t) {
					return (this._origin = t), this;
				}
				withDefaultOffsetX(t) {
					return (this._offsetX = t), this;
				}
				withDefaultOffsetY(t) {
					return (this._offsetY = t), this;
				}
				withTransformOriginOn(t) {
					return (this._transformOriginSelector = t), this;
				}
				_getOriginPoint(t, e) {
					let n, i;
					if ('center' == e.originX) n = t.left + t.width / 2;
					else {
						const i = this._isRtl() ? t.right : t.left,
							s = this._isRtl() ? t.left : t.right;
						n = 'start' == e.originX ? i : s;
					}
					return (
						(i = 'center' == e.originY ? t.top + t.height / 2 : 'top' == e.originY ? t.top : t.bottom),
						{ x: n, y: i }
					);
				}
				_getOverlayPoint(t, e, n) {
					let i, s;
					return (
						(i =
							'center' == n.overlayX
								? -e.width / 2
								: 'start' === n.overlayX
								? this._isRtl()
									? -e.width
									: 0
								: this._isRtl()
								? 0
								: -e.width),
						(s = 'center' == n.overlayY ? -e.height / 2 : 'top' == n.overlayY ? 0 : -e.height),
						{ x: t.x + i, y: t.y + s }
					);
				}
				_getOverlayFit(t, e, n, i) {
					let { x: s, y: r } = t,
						o = this._getOffset(i, 'x'),
						a = this._getOffset(i, 'y');
					o && (s += o), a && (r += a);
					let l = 0 - r,
						c = r + e.height - n.height,
						u = this._subtractOverflows(e.width, 0 - s, s + e.width - n.width),
						h = this._subtractOverflows(e.height, l, c),
						d = u * h;
					return {
						visibleArea: d,
						isCompletelyWithinViewport: e.width * e.height === d,
						fitsInViewportVertically: h === e.height,
						fitsInViewportHorizontally: u == e.width,
					};
				}
				_canFitWithFlexibleDimensions(t, e, n) {
					if (this._hasFlexibleDimensions) {
						const i = n.bottom - e.y,
							s = n.right - e.x,
							r = Y_(this._overlayRef.getConfig().minHeight),
							o = Y_(this._overlayRef.getConfig().minWidth),
							a = t.fitsInViewportHorizontally || (null != o && o <= s);
						return (t.fitsInViewportVertically || (null != r && r <= i)) && a;
					}
					return !1;
				}
				_pushOverlayOnScreen(t, e, n) {
					if (this._previousPushAmount && this._positionLocked)
						return { x: t.x + this._previousPushAmount.x, y: t.y + this._previousPushAmount.y };
					const i = this._viewportRect,
						s = Math.max(t.x + e.width - i.width, 0),
						r = Math.max(t.y + e.height - i.height, 0),
						o = Math.max(i.top - n.top - t.y, 0),
						a = Math.max(i.left - n.left - t.x, 0);
					let l = 0,
						c = 0;
					return (
						(l = e.width <= i.width ? a || -s : t.x < this._viewportMargin ? i.left - n.left - t.x : 0),
						(c = e.height <= i.height ? o || -r : t.y < this._viewportMargin ? i.top - n.top - t.y : 0),
						(this._previousPushAmount = { x: l, y: c }),
						{ x: t.x + l, y: t.y + c }
					);
				}
				_applyPosition(t, e) {
					if (
						(this._setTransformOrigin(t),
						this._setOverlayElementStyles(e, t),
						this._setBoundingBoxStyles(e, t),
						t.panelClass && this._addPanelClasses(t.panelClass),
						(this._lastPosition = t),
						this._positionChanges.observers.length)
					) {
						const e = this._getScrollVisibility(),
							n = new z_(t, e);
						this._positionChanges.next(n);
					}
					this._isInitialRender = !1;
				}
				_setTransformOrigin(t) {
					if (!this._transformOriginSelector) return;
					const e = this._boundingBox.querySelectorAll(this._transformOriginSelector);
					let n,
						i = t.overlayY;
					n =
						'center' === t.overlayX
							? 'center'
							: this._isRtl()
							? 'start' === t.overlayX
								? 'right'
								: 'left'
							: 'start' === t.overlayX
							? 'left'
							: 'right';
					for (let s = 0; s < e.length; s++) e[s].style.transformOrigin = `${n} ${i}`;
				}
				_calculateBoundingBoxRect(t, e) {
					const n = this._viewportRect,
						i = this._isRtl();
					let s, r, o, a, l, c;
					if ('top' === e.overlayY) (r = t.y), (s = n.height - r + this._viewportMargin);
					else if ('bottom' === e.overlayY)
						(o = n.height - t.y + 2 * this._viewportMargin), (s = n.height - o + this._viewportMargin);
					else {
						const e = Math.min(n.bottom - t.y + n.top, t.y),
							i = this._lastBoundingBoxSize.height;
						(s = 2 * e),
							(r = t.y - e),
							s > i && !this._isInitialRender && !this._growAfterOpen && (r = t.y - i / 2);
					}
					if (('end' === e.overlayX && !i) || ('start' === e.overlayX && i))
						(c = n.width - t.x + this._viewportMargin), (a = t.x - this._viewportMargin);
					else if (('start' === e.overlayX && !i) || ('end' === e.overlayX && i))
						(l = t.x), (a = n.right - t.x);
					else {
						const e = Math.min(n.right - t.x + n.left, t.x),
							i = this._lastBoundingBoxSize.width;
						(a = 2 * e),
							(l = t.x - e),
							a > i && !this._isInitialRender && !this._growAfterOpen && (l = t.x - i / 2);
					}
					return { top: r, left: l, bottom: o, right: c, width: a, height: s };
				}
				_setBoundingBoxStyles(t, e) {
					const n = this._calculateBoundingBoxRect(t, e);
					this._isInitialRender ||
						this._growAfterOpen ||
						((n.height = Math.min(n.height, this._lastBoundingBoxSize.height)),
						(n.width = Math.min(n.width, this._lastBoundingBoxSize.width)));
					const i = {};
					if (this._hasExactPosition())
						(i.top = i.left = '0'),
							(i.bottom = i.right = i.maxHeight = i.maxWidth = ''),
							(i.width = i.height = '100%');
					else {
						const t = this._overlayRef.getConfig().maxHeight,
							s = this._overlayRef.getConfig().maxWidth;
						(i.height = Bh(n.height)),
							(i.top = Bh(n.top)),
							(i.bottom = Bh(n.bottom)),
							(i.width = Bh(n.width)),
							(i.left = Bh(n.left)),
							(i.right = Bh(n.right)),
							(i.alignItems =
								'center' === e.overlayX ? 'center' : 'end' === e.overlayX ? 'flex-end' : 'flex-start'),
							(i.justifyContent =
								'center' === e.overlayY
									? 'center'
									: 'bottom' === e.overlayY
									? 'flex-end'
									: 'flex-start'),
							t && (i.maxHeight = Bh(t)),
							s && (i.maxWidth = Bh(s));
					}
					(this._lastBoundingBoxSize = n), K_(this._boundingBox.style, i);
				}
				_resetBoundingBoxStyles() {
					K_(this._boundingBox.style, {
						top: '0',
						left: '0',
						right: '0',
						bottom: '0',
						height: '',
						width: '',
						alignItems: '',
						justifyContent: '',
					});
				}
				_resetOverlayElementStyles() {
					K_(this._pane.style, { top: '', left: '', bottom: '', right: '', position: '', transform: '' });
				}
				_setOverlayElementStyles(t, e) {
					const n = {},
						i = this._hasExactPosition(),
						s = this._hasFlexibleDimensions,
						r = this._overlayRef.getConfig();
					if (i) {
						const i = this._viewportRuler.getViewportScrollPosition();
						K_(n, this._getExactOverlayY(e, t, i)), K_(n, this._getExactOverlayX(e, t, i));
					} else n.position = 'static';
					let o = '',
						a = this._getOffset(e, 'x'),
						l = this._getOffset(e, 'y');
					a && (o += `translateX(${a}px) `),
						l && (o += `translateY(${l}px)`),
						(n.transform = o.trim()),
						r.maxHeight && (i ? (n.maxHeight = Bh(r.maxHeight)) : s && (n.maxHeight = '')),
						r.maxWidth && (i ? (n.maxWidth = Bh(r.maxWidth)) : s && (n.maxWidth = '')),
						K_(this._pane.style, n);
				}
				_getExactOverlayY(t, e, n) {
					let i = { top: '', bottom: '' },
						s = this._getOverlayPoint(e, this._overlayRect, t);
					this._isPushed && (s = this._pushOverlayOnScreen(s, this._overlayRect, n));
					let r = this._overlayContainer.getContainerElement().getBoundingClientRect().top;
					return (
						(s.y -= r),
						'bottom' === t.overlayY
							? (i.bottom =
									this._document.documentElement.clientHeight -
									(s.y + this._overlayRect.height) +
									'px')
							: (i.top = Bh(s.y)),
						i
					);
				}
				_getExactOverlayX(t, e, n) {
					let i,
						s = { left: '', right: '' },
						r = this._getOverlayPoint(e, this._overlayRect, t);
					return (
						this._isPushed && (r = this._pushOverlayOnScreen(r, this._overlayRect, n)),
						(i = this._isRtl()
							? 'end' === t.overlayX
								? 'left'
								: 'right'
							: 'end' === t.overlayX
							? 'right'
							: 'left'),
						'right' === i
							? (s.right =
									this._document.documentElement.clientWidth - (r.x + this._overlayRect.width) + 'px')
							: (s.left = Bh(r.x)),
						s
					);
				}
				_getScrollVisibility() {
					const t = this._getOriginRect(),
						e = this._pane.getBoundingClientRect(),
						n = this._scrollables.map(t => t.getElementRef().nativeElement.getBoundingClientRect());
					return {
						isOriginClipped: D_(t, n),
						isOriginOutsideView: N_(t, n),
						isOverlayClipped: D_(e, n),
						isOverlayOutsideView: N_(e, n),
					};
				}
				_subtractOverflows(t, ...e) {
					return e.reduce((t, e) => t - Math.max(e, 0), t);
				}
				_getNarrowedViewportRect() {
					const t = this._document.documentElement.clientWidth,
						e = this._document.documentElement.clientHeight,
						n = this._viewportRuler.getViewportScrollPosition();
					return {
						top: n.top + this._viewportMargin,
						left: n.left + this._viewportMargin,
						right: n.left + t - this._viewportMargin,
						bottom: n.top + e - this._viewportMargin,
						width: t - 2 * this._viewportMargin,
						height: e - 2 * this._viewportMargin,
					};
				}
				_isRtl() {
					return 'rtl' === this._overlayRef.getDirection();
				}
				_hasExactPosition() {
					return !this._hasFlexibleDimensions || this._isPushed;
				}
				_getOffset(t, e) {
					return 'x' === e
						? null == t.offsetX
							? this._offsetX
							: t.offsetX
						: null == t.offsetY
						? this._offsetY
						: t.offsetY;
				}
				_validatePositions() {}
				_addPanelClasses(t) {
					this._pane &&
						jh(t).forEach(t => {
							'' !== t &&
								-1 === this._appliedPanelClasses.indexOf(t) &&
								(this._appliedPanelClasses.push(t), this._pane.classList.add(t));
						});
				}
				_clearPanelClasses() {
					this._pane &&
						(this._appliedPanelClasses.forEach(t => {
							this._pane.classList.remove(t);
						}),
						(this._appliedPanelClasses = []));
				}
				_getOriginRect() {
					const t = this._origin;
					if (t instanceof nl) return t.nativeElement.getBoundingClientRect();
					if (t instanceof Element) return t.getBoundingClientRect();
					const e = t.width || 0,
						n = t.height || 0;
					return { top: t.y, bottom: t.y + n, left: t.x, right: t.x + e, height: n, width: e };
				}
			}
			function K_(t, e) {
				for (let n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
				return t;
			}
			function Y_(t) {
				if ('number' != typeof t && null != t) {
					const [e, n] = t.split(Z_);
					return n && 'px' !== n ? null : parseFloat(e);
				}
				return t || null;
			}
			class X_ {
				constructor(t, e, n, i, s, r, o) {
					(this._preferredPositions = []),
						(this._positionStrategy = new G_(n, i, s, r, o)
							.withFlexibleDimensions(!1)
							.withPush(!1)
							.withViewportMargin(0)),
						this.withFallbackPosition(t, e),
						(this.onPositionChange = this._positionStrategy.positionChanges);
				}
				get positions() {
					return this._preferredPositions;
				}
				attach(t) {
					(this._overlayRef = t),
						this._positionStrategy.attach(t),
						this._direction && (t.setDirection(this._direction), (this._direction = null));
				}
				dispose() {
					this._positionStrategy.dispose();
				}
				detach() {
					this._positionStrategy.detach();
				}
				apply() {
					this._positionStrategy.apply();
				}
				recalculateLastPosition() {
					this._positionStrategy.reapplyLastPosition();
				}
				withScrollableContainers(t) {
					this._positionStrategy.withScrollableContainers(t);
				}
				withFallbackPosition(t, e, n, i) {
					const s = new B_(t, e, n, i);
					return (
						this._preferredPositions.push(s),
						this._positionStrategy.withPositions(this._preferredPositions),
						this
					);
				}
				withDirection(t) {
					return this._overlayRef ? this._overlayRef.setDirection(t) : (this._direction = t), this;
				}
				withOffsetX(t) {
					return this._positionStrategy.withDefaultOffsetX(t), this;
				}
				withOffsetY(t) {
					return this._positionStrategy.withDefaultOffsetY(t), this;
				}
				withLockedPosition(t) {
					return this._positionStrategy.withLockedPosition(t), this;
				}
				withPositions(t) {
					return (
						(this._preferredPositions = t.slice()),
						this._positionStrategy.withPositions(this._preferredPositions),
						this
					);
				}
				setOrigin(t) {
					return this._positionStrategy.setOrigin(t), this;
				}
			}
			const J_ = 'cdk-global-overlay-wrapper';
			class tv {
				constructor() {
					(this._cssPosition = 'static'),
						(this._topOffset = ''),
						(this._bottomOffset = ''),
						(this._leftOffset = ''),
						(this._rightOffset = ''),
						(this._alignItems = ''),
						(this._justifyContent = ''),
						(this._width = ''),
						(this._height = '');
				}
				attach(t) {
					const e = t.getConfig();
					(this._overlayRef = t),
						this._width && !e.width && t.updateSize({ width: this._width }),
						this._height && !e.height && t.updateSize({ height: this._height }),
						t.hostElement.classList.add(J_),
						(this._isDisposed = !1);
				}
				top(t = '') {
					return (this._bottomOffset = ''), (this._topOffset = t), (this._alignItems = 'flex-start'), this;
				}
				left(t = '') {
					return (
						(this._rightOffset = ''), (this._leftOffset = t), (this._justifyContent = 'flex-start'), this
					);
				}
				bottom(t = '') {
					return (this._topOffset = ''), (this._bottomOffset = t), (this._alignItems = 'flex-end'), this;
				}
				right(t = '') {
					return (this._leftOffset = ''), (this._rightOffset = t), (this._justifyContent = 'flex-end'), this;
				}
				width(t = '') {
					return this._overlayRef ? this._overlayRef.updateSize({ width: t }) : (this._width = t), this;
				}
				height(t = '') {
					return this._overlayRef ? this._overlayRef.updateSize({ height: t }) : (this._height = t), this;
				}
				centerHorizontally(t = '') {
					return this.left(t), (this._justifyContent = 'center'), this;
				}
				centerVertically(t = '') {
					return this.top(t), (this._alignItems = 'center'), this;
				}
				apply() {
					if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
					const t = this._overlayRef.overlayElement.style,
						e = this._overlayRef.hostElement.style,
						n = this._overlayRef.getConfig(),
						{ width: i, height: s, maxWidth: r, maxHeight: o } = n,
						a = !(('100%' !== i && '100vw' !== i) || (r && '100%' !== r && '100vw' !== r)),
						l = !(('100%' !== s && '100vh' !== s) || (o && '100%' !== o && '100vh' !== o));
					(t.position = this._cssPosition),
						(t.marginLeft = a ? '0' : this._leftOffset),
						(t.marginTop = l ? '0' : this._topOffset),
						(t.marginBottom = this._bottomOffset),
						(t.marginRight = this._rightOffset),
						a
							? (e.justifyContent = 'flex-start')
							: 'center' === this._justifyContent
							? (e.justifyContent = 'center')
							: 'rtl' === this._overlayRef.getConfig().direction
							? 'flex-start' === this._justifyContent
								? (e.justifyContent = 'flex-end')
								: 'flex-end' === this._justifyContent && (e.justifyContent = 'flex-start')
							: (e.justifyContent = this._justifyContent),
						(e.alignItems = l ? 'flex-start' : this._alignItems);
				}
				dispose() {
					if (this._isDisposed || !this._overlayRef) return;
					const t = this._overlayRef.overlayElement.style,
						e = this._overlayRef.hostElement,
						n = e.style;
					e.classList.remove(J_),
						(n.justifyContent = n.alignItems = t.marginTop = t.marginBottom = t.marginLeft = t.marginRight = t.position =
							''),
						(this._overlayRef = null),
						(this._isDisposed = !0);
				}
			}
			let ev = (() => {
					class t {
						constructor(t, e, n, i) {
							(this._viewportRuler = t),
								(this._document = e),
								(this._platform = n),
								(this._overlayContainer = i);
						}
						global() {
							return new tv();
						}
						connectedTo(t, e, n) {
							return new X_(
								e,
								n,
								t,
								this._viewportRuler,
								this._document,
								this._platform,
								this._overlayContainer
							);
						}
						flexibleConnectedTo(t) {
							return new G_(
								t,
								this._viewportRuler,
								this._document,
								this._platform,
								this._overlayContainer
							);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(Yy), Kt(Jc), Kt(uh), Kt(q_));
						}),
						(t.ɵprov = ht({
							factory: function () {
								return new t(Kt(Yy), Kt(Jc), Kt(uh), Kt(q_));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				nv = 0,
				iv = (() => {
					class t {
						constructor(t, e, n, i, s, r, o, a, l, c, u) {
							(this.scrollStrategies = t),
								(this._overlayContainer = e),
								(this._componentFactoryResolver = n),
								(this._positionBuilder = i),
								(this._keyboardDispatcher = s),
								(this._injector = r),
								(this._ngZone = o),
								(this._document = a),
								(this._directionality = l),
								(this._location = c),
								(this._outsideClickDispatcher = u);
						}
						create(t) {
							const e = this._createHostElement(),
								n = this._createPaneElement(e),
								i = this._createPortalOutlet(n),
								s = new j_(t);
							return (
								(s.direction = s.direction || this._directionality.value),
								new W_(
									i,
									e,
									n,
									s,
									this._ngZone,
									this._keyboardDispatcher,
									this._document,
									this._location,
									this._outsideClickDispatcher
								)
							);
						}
						position() {
							return this._positionBuilder;
						}
						_createPaneElement(t) {
							const e = this._document.createElement('div');
							return (
								(e.id = 'cdk-overlay-' + nv++), e.classList.add('cdk-overlay-pane'), t.appendChild(e), e
							);
						}
						_createHostElement() {
							const t = this._document.createElement('div');
							return this._overlayContainer.getContainerElement().appendChild(t), t;
						}
						_createPortalOutlet(t) {
							return (
								this._appRef || (this._appRef = this._injector.get(Vc)),
								new I_(t, this._componentFactoryResolver, this._appRef, this._injector, this._document)
							);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(
								Kt(F_),
								Kt(q_),
								Kt(el),
								Kt(ev),
								Kt(U_),
								Kt(uo),
								Kt(xc),
								Kt(Jc),
								Kt(rd),
								Kt(fu),
								Kt(H_)
							);
						}),
						(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
						t
					);
				})();
			const sv = {
				provide: new Bt('cdk-connected-overlay-scroll-strategy'),
				deps: [iv],
				useFactory: function (t) {
					return () => t.scrollStrategies.reposition();
				},
			};
			let rv = (() => {
				class t {}
				return (
					(t.ɵmod = be({ type: t })),
					(t.ɵinj = dt({
						factory: function (e) {
							return new (e || t)();
						},
						providers: [iv, sv],
						imports: [[od, O_, Jy], Jy],
					})),
					t
				);
			})();
			class ov extends f {
				notifyNext(t, e, n, i, s) {
					this.destination.next(e);
				}
				notifyError(t, e) {
					this.destination.error(t);
				}
				notifyComplete(t) {
					this.destination.complete();
				}
			}
			class av extends f {
				constructor(t, e, n) {
					super(), (this.parent = t), (this.outerValue = e), (this.outerIndex = n), (this.index = 0);
				}
				_next(t) {
					this.parent.notifyNext(this.outerValue, t, this.outerIndex, this.index++, this);
				}
				_error(t) {
					this.parent.notifyError(t, this), this.unsubscribe();
				}
				_complete() {
					this.parent.notifyComplete(this), this.unsubscribe();
				}
			}
			function lv(t, e, n, i, s = new av(t, n, i)) {
				if (!s.closed) return e instanceof _ ? e.subscribe(s) : N(e)(s);
			}
			const cv = {};
			class uv {
				constructor(t) {
					this.resultSelector = t;
				}
				call(t, e) {
					return e.subscribe(new hv(t, this.resultSelector));
				}
			}
			class hv extends ov {
				constructor(t, e) {
					super(t), (this.resultSelector = e), (this.active = 0), (this.values = []), (this.observables = []);
				}
				_next(t) {
					this.values.push(cv), this.observables.push(t);
				}
				_complete() {
					const t = this.observables,
						e = t.length;
					if (0 === e) this.destination.complete();
					else {
						(this.active = e), (this.toRespond = e);
						for (let n = 0; n < e; n++) this.add(lv(this, t[n], void 0, n));
					}
				}
				notifyComplete(t) {
					0 == (this.active -= 1) && this.destination.complete();
				}
				notifyNext(t, e, n) {
					const i = this.values,
						s = this.toRespond ? (i[n] === cv ? --this.toRespond : this.toRespond) : 0;
					(i[n] = e),
						0 === s &&
							(this.resultSelector ? this._tryResultSelector(i) : this.destination.next(i.slice()));
				}
				_tryResultSelector(t) {
					let e;
					try {
						e = this.resultSelector.apply(this, t);
					} catch (n) {
						return void this.destination.error(n);
					}
					this.destination.next(e);
				}
			}
			const dv = {
				provide: new Bt('mat-tooltip-scroll-strategy'),
				deps: [iv],
				useFactory: function (t) {
					return () => t.scrollStrategies.reposition({ scrollThrottle: 20 });
				},
			};
			let pv = (() => {
				class t {}
				return (
					(t.ɵmod = be({ type: t })),
					(t.ɵinj = dt({
						factory: function (e) {
							return new (e || t)();
						},
						providers: [dv],
						imports: [[id, Su, rv, Xf], Xf, Xy],
					})),
					t
				);
			})();
			var fv = {
					prefix: 'fab',
					iconName: 'github',
					icon: [
						496,
						512,
						[],
						'f09b',
						'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z',
					],
				},
				mv = {
					prefix: 'fab',
					iconName: 'linkedin-in',
					icon: [
						448,
						512,
						[],
						'f0e1',
						'M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z',
					],
				};
			let gv = (() => {
				class t {
					constructor(t, e) {
						(this.document = t), (this.platformId = e), (this.documentIsAccessible = Eu(this.platformId));
					}
					check(t) {
						return (
							!!this.documentIsAccessible &&
							((t = encodeURIComponent(t)), this.getCookieRegExp(t).test(this.document.cookie))
						);
					}
					get(t) {
						if (this.documentIsAccessible && this.check(t)) {
							t = encodeURIComponent(t);
							const e = this.getCookieRegExp(t).exec(this.document.cookie);
							return this.safeDecodeURIComponent(e[1]);
						}
						return '';
					}
					getAll() {
						if (!this.documentIsAccessible) return {};
						const t = {},
							e = this.document;
						return (
							e.cookie &&
								'' !== e.cookie &&
								e.cookie.split(';').forEach(e => {
									const [n, i] = e.split('=');
									t[this.safeDecodeURIComponent(n.replace(/^ /, ''))] = this.safeDecodeURIComponent(
										i
									);
								}),
							t
						);
					}
					set(t, e, n, i, s, r, o) {
						if (!this.documentIsAccessible) return;
						if ('number' == typeof n || n instanceof Date || i || s || r || o)
							return void this.set(t, e, {
								expires: n,
								path: i,
								domain: s,
								secure: r,
								sameSite: o || 'Lax',
							});
						let a = encodeURIComponent(t) + '=' + encodeURIComponent(e) + ';';
						const l = n || {};
						l.expires &&
							(a +=
								'number' == typeof l.expires
									? 'expires=' +
									  new Date(new Date().getTime() + 1e3 * l.expires * 60 * 60 * 24).toUTCString() +
									  ';'
									: 'expires=' + l.expires.toUTCString() + ';'),
							l.path && (a += 'path=' + l.path + ';'),
							l.domain && (a += 'domain=' + l.domain + ';'),
							!1 === l.secure &&
								'None' === l.sameSite &&
								((l.secure = !0),
								console.warn(
									`[ngx-cookie-service] Cookie ${t} was forced with secure flag because sameSite=None.More details : https://github.com/stevermeister/ngx-cookie-service/issues/86#issuecomment-597720130`
								)),
							l.secure && (a += 'secure;'),
							l.sameSite || (l.sameSite = 'Lax'),
							(a += 'sameSite=' + l.sameSite + ';'),
							(this.document.cookie = a);
					}
					delete(t, e, n, i, s = 'Lax') {
						if (!this.documentIsAccessible) return;
						const r = new Date('Thu, 01 Jan 1970 00:00:01 GMT');
						this.set(t, '', { expires: r, path: e, domain: n, secure: i, sameSite: s });
					}
					deleteAll(t, e, n, i = 'Lax') {
						if (!this.documentIsAccessible) return;
						const s = this.getAll();
						for (const r in s) s.hasOwnProperty(r) && this.delete(r, t, e, n, i);
					}
					getCookieRegExp(t) {
						const e = t.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi, '\\$1');
						return new RegExp('(?:^' + e + '|;\\s*' + e + ')=(.*?)(?:;|$)', 'g');
					}
					safeDecodeURIComponent(t) {
						try {
							return decodeURIComponent(t);
						} catch (nE) {
							return t;
						}
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(Jc), Kt(ac));
					}),
					(t.ɵprov = ht({
						factory: function () {
							return new t(Kt(Jc), Kt(ac));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			const yv = {
					target: null,
					action: 'click',
					duration: 650,
					easing: 'easeInOutQuad',
					offset: 0,
					offsetMap: new Map(),
				},
				_v = {
					easeInQuad: t => t * t,
					easeOutQuad: t => t * (2 - t),
					easeInOutQuad: t => (t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1),
					easeInCubic: t => t * t * t,
					easeOutCubic: t => --t * t * t + 1,
					easeInOutCubic: t => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
					easeInQuart: t => t * t * t * t,
					easeOutQuart: t => 1 - --t * t * t * t,
					easeInOutQuart: t => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
					easeInQuint: t => t * t * t * t * t,
					easeOutQuint: t => 1 + --t * t * t * t * t,
					easeInOutQuint: t => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t),
					easeOutElastic: t => Math.pow(2, -10 * t) * Math.sin(((t - 1 / 4) * (2 * Math.PI)) / 1) + 1,
				};
			function vv(t) {
				return t === window;
			}
			class bv {
				constructor(t, e, n, i, s, r) {
					(this.container = t),
						(this.listenerTarget = e),
						(this.isWindow = n),
						(this.to = i),
						(this.options = s),
						(this.isBrowser = r),
						(this.loop = () => {
							(this.timeLapsed += this.tick),
								(this.percentage = this.timeLapsed / this.options.duration),
								(this.percentage = this.percentage > 1 ? 1 : this.percentage),
								(this.position =
									this.startPosition +
									(this.startPosition - this.to <= 0 ? 1 : -1) *
										this.distance *
										_v[this.options.easing](this.percentage)),
								null !== this.lastPosition && this.position === this.lastPosition
									? this.stop()
									: (this.source$.next(this.position),
									  this.isWindow
											? this.listenerTarget.scrollTo(0, Math.floor(this.position))
											: (this.container.scrollTop = Math.floor(this.position)),
									  (this.lastPosition = this.position));
						}),
						(this.tick = 16),
						(this.interval = null),
						(this.lastPosition = null),
						(this.timeLapsed = 0),
						(this.windowScrollTop =
							window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
						(this.startPosition = this.container
							? this.isWindow
								? this.windowScrollTop
								: this.container.scrollTop
							: this.windowScrollTop),
						this.container &&
							!this.isWindow &&
							(this.to = this.to - this.container.getBoundingClientRect().top + this.startPosition);
					const o = this.startPosition - this.to;
					(this.distance = this.container ? Math.abs(this.startPosition - this.to) : this.to),
						(this.mappedOffset = this.options.offset),
						this.isBrowser &&
							this.options.offsetMap.forEach(
								(t, e) => (this.mappedOffset = window.innerWidth > e ? t : this.mappedOffset)
							),
						(this.distance += this.mappedOffset * (o <= 0 ? 1 : -1)),
						(this.source$ = new Qy());
				}
				start() {
					return (
						clearInterval(this.interval),
						(this.interval = setInterval(this.loop, this.tick)),
						this.source$.asObservable()
					);
				}
				stop() {
					clearInterval(this.interval), (this.interval = null), this.source$.complete();
				}
			}
			let wv = (() => {
				let t = class {
					constructor(t, e) {
						(this.document = t),
							(this.platformId = e),
							(this.interruptiveEvents = ['mousewheel', 'DOMMouseScroll', 'touchstart']);
					}
					scrollTo(t) {
						return Eu(this.platformId) ? this.start(t) : new Qy().asObservable();
					}
					start(t) {
						const e = Object.assign(Object.assign({}, yv), t);
						this.animation && this.animation.stop();
						const n = this.getNode(e.target);
						if (e.target && !n) return pm('Unable to find Target Element');
						const i = this.getContainer(e, n);
						if (e.container && !i) return pm('Unable to find Container Element');
						const s = this.getListenerTarget(i) || window;
						let r = i ? i.getBoundingClientRect().top : 0;
						n &&
							(r = vv(s)
								? window.scrollY + n.getBoundingClientRect().top
								: n.getBoundingClientRect().top),
							(this.animation = new bv(i, s, vv(s), r, e, Eu(this.platformId)));
						const o = () => this.animation.stop();
						this.addInterruptiveEventListeners(s, o);
						const a = this.animation.start();
						return this.subscribeToAnimation(a, s, o), a;
					}
					subscribeToAnimation(t, e, n) {
						const i = t.subscribe(
							() => {},
							() => {},
							() => {
								this.removeInterruptiveEventListeners(this.interruptiveEvents, e, n), i.unsubscribe();
							}
						);
					}
					getContainer(t, e) {
						let n = null;
						return (
							t.container
								? (n = this.getNode(t.container, !0))
								: e && (n = this.getFirstScrollableParent(e)),
							n
						);
					}
					addInterruptiveEventListeners(t, e) {
						t || (t = window),
							this.interruptiveEvents.forEach(n =>
								t.addEventListener(n, e, !!this.supportPassive() && { passive: !0 })
							);
					}
					supportPassive() {
						let t = !1;
						try {
							const e = Object.defineProperty({}, 'passive', {
								get: () => {
									t = !0;
								},
							});
							window.addEventListener('testPassive', null, e),
								window.removeEventListener('testPassive', null, e);
						} catch (e) {}
						return t;
					}
					removeInterruptiveEventListeners(t, e, n) {
						e || (e = window), t.forEach(t => e.removeEventListener(t, n));
					}
					getFirstScrollableParent(t) {
						let e = window.getComputedStyle(t);
						const n = /(auto|scroll|overlay)/;
						if ('fixed' === e.position) return null;
						let i = t;
						for (; i.parentElement; )
							if (
								((i = i.parentElement),
								(e = window.getComputedStyle(i)),
								'absolute' !== e.position &&
									'hidden' !== e.overflow &&
									'hidden' !== e.overflowY &&
									(n.test(e.overflow + e.overflowY) || 'BODY' === i.tagName))
							)
								return i;
						return null;
					}
					getNode(t, e = !1) {
						let n;
						var i;
						return (
							'string' == typeof (i = t) || i instanceof String
								? (n =
										!e || ('body' !== t && 'BODY' !== t)
											? this.document.getElementById(
													(function (t) {
														return '#' === t.substring(0, 1) ? t.substring(1) : t;
													})(t)
											  )
											: this.document.body)
								: (function (t) {
										return !isNaN(parseFloat(t)) && isFinite(t);
								  })(t)
								? (n = this.document.getElementById(String(t)))
								: (function (t) {
										return t instanceof nl;
								  })(t)
								? (n = t.nativeElement)
								: (function (t) {
										return t instanceof HTMLElement;
								  })(t) && (n = t),
							n
						);
					}
					getListenerTarget(t) {
						return t ? (this.isDocumentBody(t) ? window : t) : null;
					}
					isDocumentBody(t) {
						return 'BODY' === t.tagName.toUpperCase();
					}
				};
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(Jc), Kt(ac));
					}),
					(t.ɵprov = ht({
						token: t,
						factory: function (e) {
							return t.ɵfac(e);
						},
					})),
					t
				);
			})();
			var xv;
			let Sv = (() => {
				let t = (xv = class {
					static forRoot() {
						return { ngModule: xv, providers: [wv] };
					}
				});
				return (
					(t.ɵmod = be({ type: t })),
					(t.ɵinj = dt({
						factory: function (e) {
							return new (e || t)();
						},
					})),
					t
				);
			})();
			function Ev(t) {
				return (Ev =
					'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
						? function (t) {
								return typeof t;
						  }
						: function (t) {
								return t &&
									'function' == typeof Symbol &&
									t.constructor === Symbol &&
									t !== Symbol.prototype
									? 'symbol'
									: typeof t;
						  })(t);
			}
			function Cv(t, e, n) {
				return (
					e in t
						? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 })
						: (t[e] = n),
					t
				);
			}
			function kv(t) {
				for (var e = 1; e < arguments.length; e++) {
					var n = null != arguments[e] ? arguments[e] : {},
						i = Object.keys(n);
					'function' == typeof Object.getOwnPropertySymbols &&
						(i = i.concat(
							Object.getOwnPropertySymbols(n).filter(function (t) {
								return Object.getOwnPropertyDescriptor(n, t).enumerable;
							})
						)),
						i.forEach(function (e) {
							Cv(t, e, n[e]);
						});
				}
				return t;
			}
			function Tv(t, e) {
				return (
					(function (t) {
						if (Array.isArray(t)) return t;
					})(t) ||
					(function (t, e) {
						var n = [],
							i = !0,
							s = !1,
							r = void 0;
						try {
							for (
								var o, a = t[Symbol.iterator]();
								!(i = (o = a.next()).done) && (n.push(o.value), !e || n.length !== e);
								i = !0
							);
						} catch (l) {
							(s = !0), (r = l);
						} finally {
							try {
								i || null == a.return || a.return();
							} finally {
								if (s) throw r;
							}
						}
						return n;
					})(t, e) ||
					(function () {
						throw new TypeError('Invalid attempt to destructure non-iterable instance');
					})()
				);
			}
			var Av = {},
				Iv = {};
			try {
				'undefined' != typeof window && (Av = window),
					'undefined' != typeof document && (Iv = document),
					'undefined' != typeof MutationObserver && MutationObserver,
					'undefined' != typeof performance && performance;
			} catch (iE) {}
			var Ov = (Av.navigator || {}).userAgent,
				Rv = void 0 === Ov ? '' : Ov,
				Pv = Av,
				Lv = Iv,
				Nv =
					!!Lv.documentElement &&
					!!Lv.head &&
					'function' == typeof Lv.addEventListener &&
					'function' == typeof Lv.createElement,
				Dv = (~Rv.indexOf('MSIE') || Rv.indexOf('Trident/'), 'svg-inline--fa'),
				Mv = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				Fv = Mv.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
				jv = { GROUP: 'group', SWAP_OPACITY: 'swap-opacity', PRIMARY: 'primary', SECONDARY: 'secondary' },
				Bv =
					([
						'xs',
						'sm',
						'lg',
						'fw',
						'ul',
						'li',
						'border',
						'pull-left',
						'pull-right',
						'spin',
						'pulse',
						'rotate-90',
						'rotate-180',
						'rotate-270',
						'flip-horizontal',
						'flip-vertical',
						'flip-both',
						'stack',
						'stack-1x',
						'stack-2x',
						'inverse',
						'layers',
						'layers-text',
						'layers-counter',
						jv.GROUP,
						jv.SWAP_OPACITY,
						jv.PRIMARY,
						jv.SECONDARY,
					]
						.concat(
							Mv.map(function (t) {
								return ''.concat(t, 'x');
							})
						)
						.concat(
							Fv.map(function (t) {
								return 'w-'.concat(t);
							})
						),
					Pv.FontAwesomeConfig || {});
			Lv &&
				'function' == typeof Lv.querySelector &&
				[
					['data-family-prefix', 'familyPrefix'],
					['data-replacement-class', 'replacementClass'],
					['data-auto-replace-svg', 'autoReplaceSvg'],
					['data-auto-add-css', 'autoAddCss'],
					['data-auto-a11y', 'autoA11y'],
					['data-search-pseudo-elements', 'searchPseudoElements'],
					['data-observe-mutations', 'observeMutations'],
					['data-mutate-approach', 'mutateApproach'],
					['data-keep-original-source', 'keepOriginalSource'],
					['data-measure-performance', 'measurePerformance'],
					['data-show-missing-icons', 'showMissingIcons'],
				].forEach(function (t) {
					var e = Tv(t, 2),
						n = e[1],
						i = (function (t) {
							return '' === t || ('false' !== t && ('true' === t || t));
						})(
							(function (t) {
								var e = Lv.querySelector('script[' + t + ']');
								if (e) return e.getAttribute(t);
							})(e[0])
						);
					null != i && (Bv[n] = i);
				});
			var zv = kv(
				{},
				{
					familyPrefix: 'fa',
					replacementClass: Dv,
					autoReplaceSvg: !0,
					autoAddCss: !0,
					autoA11y: !0,
					searchPseudoElements: !1,
					observeMutations: !0,
					mutateApproach: 'async',
					keepOriginalSource: !0,
					measurePerformance: !1,
					showMissingIcons: !0,
				},
				Bv
			);
			zv.autoReplaceSvg || (zv.observeMutations = !1);
			var Vv = kv({}, zv);
			Pv.FontAwesomeConfig = Vv;
			var Uv = Pv || {};
			Uv.___FONT_AWESOME___ || (Uv.___FONT_AWESOME___ = {}),
				Uv.___FONT_AWESOME___.styles || (Uv.___FONT_AWESOME___.styles = {}),
				Uv.___FONT_AWESOME___.hooks || (Uv.___FONT_AWESOME___.hooks = {}),
				Uv.___FONT_AWESOME___.shims || (Uv.___FONT_AWESOME___.shims = []);
			var Hv = Uv.___FONT_AWESOME___,
				$v = [];
			Nv &&
				((Lv.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(Lv.readyState) ||
					Lv.addEventListener('DOMContentLoaded', function t() {
						Lv.removeEventListener('DOMContentLoaded', t),
							$v.map(function (t) {
								return t();
							});
					}));
			var qv,
				Wv = 'pending',
				Qv = 'settled',
				Zv = 'fulfilled',
				Gv = 'rejected',
				Kv = function () {},
				Yv =
					'undefined' != typeof global &&
					void 0 !== global.process &&
					'function' == typeof global.process.emit,
				Xv = 'undefined' == typeof setImmediate ? setTimeout : setImmediate,
				Jv = [];
			function tb() {
				for (var t = 0; t < Jv.length; t++) Jv[t][0](Jv[t][1]);
				(Jv = []), (qv = !1);
			}
			function eb(t, e) {
				Jv.push([t, e]), qv || ((qv = !0), Xv(tb, 0));
			}
			function nb(t) {
				var e = t.owner,
					n = e._state,
					i = e._data,
					s = t[n],
					r = t.then;
				if ('function' == typeof s) {
					n = Zv;
					try {
						i = s(i);
					} catch (iE) {
						ob(r, iE);
					}
				}
				ib(r, i) || (n === Zv && sb(r, i), n === Gv && ob(r, i));
			}
			function ib(t, e) {
				var n;
				try {
					if (t === e) throw new TypeError('A promises callback cannot return that same promise.');
					if (e && ('function' == typeof e || 'object' === Ev(e))) {
						var i = e.then;
						if ('function' == typeof i)
							return (
								i.call(
									e,
									function (i) {
										n || ((n = !0), e === i ? rb(t, i) : sb(t, i));
									},
									function (e) {
										n || ((n = !0), ob(t, e));
									}
								),
								!0
							);
					}
				} catch (iE) {
					return n || ob(t, iE), !0;
				}
				return !1;
			}
			function sb(t, e) {
				(t !== e && ib(t, e)) || rb(t, e);
			}
			function rb(t, e) {
				t._state === Wv && ((t._state = Qv), (t._data = e), eb(lb, t));
			}
			function ob(t, e) {
				t._state === Wv && ((t._state = Qv), (t._data = e), eb(cb, t));
			}
			function ab(t) {
				t._then = t._then.forEach(nb);
			}
			function lb(t) {
				(t._state = Zv), ab(t);
			}
			function cb(t) {
				(t._state = Gv), ab(t), !t._handled && Yv && global.process.emit('unhandledRejection', t._data, t);
			}
			function ub(t) {
				global.process.emit('rejectionHandled', t);
			}
			function hb(t) {
				if ('function' != typeof t) throw new TypeError('Promise resolver ' + t + ' is not a function');
				if (this instanceof hb == 0)
					throw new TypeError(
						"Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
					);
				(this._then = []),
					(function (t, e) {
						function n(t) {
							ob(e, t);
						}
						try {
							t(function (t) {
								sb(e, t);
							}, n);
						} catch (iE) {
							n(iE);
						}
					})(t, this);
			}
			(hb.prototype = {
				constructor: hb,
				_state: Wv,
				_then: null,
				_data: void 0,
				_handled: !1,
				then: function (t, e) {
					var n = { owner: this, then: new this.constructor(Kv), fulfilled: t, rejected: e };
					return (
						(!e && !t) || this._handled || ((this._handled = !0), this._state === Gv && Yv && eb(ub, this)),
						this._state === Zv || this._state === Gv ? eb(nb, n) : this._then.push(n),
						n.then
					);
				},
				catch: function (t) {
					return this.then(null, t);
				},
			}),
				(hb.all = function (t) {
					if (!Array.isArray(t)) throw new TypeError('You must pass an array to Promise.all().');
					return new hb(function (e, n) {
						var i = [],
							s = 0;
						function r(t) {
							return (
								s++,
								function (n) {
									(i[t] = n), --s || e(i);
								}
							);
						}
						for (var o, a = 0; a < t.length; a++)
							(o = t[a]) && 'function' == typeof o.then ? o.then(r(a), n) : (i[a] = o);
						s || e(i);
					});
				}),
				(hb.race = function (t) {
					if (!Array.isArray(t)) throw new TypeError('You must pass an array to Promise.race().');
					return new hb(function (e, n) {
						for (var i, s = 0; s < t.length; s++)
							(i = t[s]) && 'function' == typeof i.then ? i.then(e, n) : e(i);
					});
				}),
				(hb.resolve = function (t) {
					return t && 'object' === Ev(t) && t.constructor === hb
						? t
						: new hb(function (e) {
								e(t);
						  });
				}),
				(hb.reject = function (t) {
					return new hb(function (e, n) {
						n(t);
					});
				});
			var db = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 };
			function pb() {
				for (var t = 12, e = ''; t-- > 0; )
					e += '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'[(62 * Math.random()) | 0];
				return e;
			}
			function fb(t) {
				return ''
					.concat(t)
					.replace(/&/g, '&amp;')
					.replace(/"/g, '&quot;')
					.replace(/'/g, '&#39;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;');
			}
			function mb(t) {
				return Object.keys(t || {}).reduce(function (e, n) {
					return e + ''.concat(n, ': ').concat(t[n], ';');
				}, '');
			}
			function gb(t) {
				return (
					t.size !== db.size || t.x !== db.x || t.y !== db.y || t.rotate !== db.rotate || t.flipX || t.flipY
				);
			}
			function yb(t) {
				var e = t.transform,
					n = t.iconWidth,
					i = { transform: 'translate('.concat(t.containerWidth / 2, ' 256)') },
					s = 'translate('.concat(32 * e.x, ', ').concat(32 * e.y, ') '),
					r = 'scale('
						.concat((e.size / 16) * (e.flipX ? -1 : 1), ', ')
						.concat((e.size / 16) * (e.flipY ? -1 : 1), ') '),
					o = 'rotate('.concat(e.rotate, ' 0 0)');
				return {
					outer: i,
					inner: { transform: ''.concat(s, ' ').concat(r, ' ').concat(o) },
					path: { transform: 'translate('.concat((n / 2) * -1, ' -256)') },
				};
			}
			var _b = { x: 0, y: 0, width: '100%', height: '100%' };
			function vb(t) {
				var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
				return t.attributes && (t.attributes.fill || e) && (t.attributes.fill = 'black'), t;
			}
			function bb(t) {
				var e = t.icons,
					n = e.main,
					i = e.mask,
					s = t.prefix,
					r = t.iconName,
					o = t.transform,
					a = t.symbol,
					l = t.title,
					c = t.maskId,
					u = t.titleId,
					h = t.extra,
					d = t.watchable,
					p = void 0 !== d && d,
					f = i.found ? i : n,
					m = f.width,
					g = f.height,
					y = 'fak' === s,
					_ = y ? '' : 'fa-w-'.concat(Math.ceil((m / g) * 16)),
					v = [Vv.replacementClass, r ? ''.concat(Vv.familyPrefix, '-').concat(r) : '', _]
						.filter(function (t) {
							return -1 === h.classes.indexOf(t);
						})
						.filter(function (t) {
							return '' !== t || !!t;
						})
						.concat(h.classes)
						.join(' '),
					b = {
						children: [],
						attributes: kv({}, h.attributes, {
							'data-prefix': s,
							'data-icon': r,
							class: v,
							role: h.attributes.role || 'img',
							xmlns: 'http://www.w3.org/2000/svg',
							viewBox: '0 0 '.concat(m, ' ').concat(g),
						}),
					},
					w = y && !~h.classes.indexOf('fa-fw') ? { width: ''.concat((m / g) * 16 * 0.0625, 'em') } : {};
				p && (b.attributes['data-fa-i2svg'] = ''),
					l &&
						b.children.push({
							tag: 'title',
							attributes: { id: b.attributes['aria-labelledby'] || 'title-'.concat(u || pb()) },
							children: [l],
						});
				var x = kv({}, b, {
						prefix: s,
						iconName: r,
						main: n,
						mask: i,
						maskId: c,
						transform: o,
						symbol: a,
						styles: kv({}, w, h.styles),
					}),
					S =
						i.found && n.found
							? (function (t) {
									var e,
										n = t.children,
										i = t.attributes,
										s = t.main,
										r = t.mask,
										o = t.maskId,
										a = s.icon,
										l = r.icon,
										c = yb({ transform: t.transform, containerWidth: r.width, iconWidth: s.width }),
										u = { tag: 'rect', attributes: kv({}, _b, { fill: 'white' }) },
										h = a.children ? { children: a.children.map(vb) } : {},
										d = {
											tag: 'g',
											attributes: kv({}, c.inner),
											children: [
												vb(kv({ tag: a.tag, attributes: kv({}, a.attributes, c.path) }, h)),
											],
										},
										p = { tag: 'g', attributes: kv({}, c.outer), children: [d] },
										f = 'mask-'.concat(o || pb()),
										m = 'clip-'.concat(o || pb()),
										g = {
											tag: 'mask',
											attributes: kv({}, _b, {
												id: f,
												maskUnits: 'userSpaceOnUse',
												maskContentUnits: 'userSpaceOnUse',
											}),
											children: [u, p],
										},
										y = {
											tag: 'defs',
											children: [
												{
													tag: 'clipPath',
													attributes: { id: m },
													children: ((e = l), 'g' === e.tag ? e.children : [e]),
												},
												g,
											],
										};
									return (
										n.push(y, {
											tag: 'rect',
											attributes: kv(
												{
													fill: 'currentColor',
													'clip-path': 'url(#'.concat(m, ')'),
													mask: 'url(#'.concat(f, ')'),
												},
												_b
											),
										}),
										{ children: n, attributes: i }
									);
							  })(x)
							: (function (t) {
									var e = t.children,
										n = t.attributes,
										i = t.main,
										s = t.transform,
										r = mb(t.styles);
									if ((r.length > 0 && (n.style = r), gb(s))) {
										var o = yb({ transform: s, containerWidth: i.width, iconWidth: i.width });
										e.push({
											tag: 'g',
											attributes: kv({}, o.outer),
											children: [
												{
													tag: 'g',
													attributes: kv({}, o.inner),
													children: [
														{
															tag: i.icon.tag,
															children: i.icon.children,
															attributes: kv({}, i.icon.attributes, o.path),
														},
													],
												},
											],
										});
									} else e.push(i.icon);
									return { children: e, attributes: n };
							  })(x),
					E = S.attributes;
				return (
					(x.children = S.children),
					(x.attributes = E),
					a
						? (function (t) {
								var e = t.iconName,
									n = t.children,
									i = t.symbol;
								return [
									{
										tag: 'svg',
										attributes: { style: 'display: none;' },
										children: [
											{
												tag: 'symbol',
												attributes: kv({}, t.attributes, {
													id:
														!0 === i
															? ''
																	.concat(t.prefix, '-')
																	.concat(Vv.familyPrefix, '-')
																	.concat(e)
															: i,
												}),
												children: n,
											},
										],
									},
								];
						  })(x)
						: (function (t) {
								var e = t.children,
									n = t.main,
									i = t.mask,
									s = t.attributes,
									r = t.styles,
									o = t.transform;
								if (gb(o) && n.found && !i.found) {
									var a = { x: n.width / n.height / 2, y: 0.5 };
									s.style = mb(
										kv({}, r, {
											'transform-origin': ''
												.concat(a.x + o.x / 16, 'em ')
												.concat(a.y + o.y / 16, 'em'),
										})
									);
								}
								return [{ tag: 'svg', attributes: s, children: e }];
						  })(x)
				);
			}
			var wb = function (t, e, n, i) {
				var s,
					r,
					o,
					a = Object.keys(t),
					l = a.length,
					c =
						void 0 !== i
							? (function (t, e) {
									return function (n, i, s, r) {
										return t.call(e, n, i, s, r);
									};
							  })(e, i)
							: e;
				for (void 0 === n ? ((s = 1), (o = t[a[0]])) : ((s = 0), (o = n)); s < l; s++)
					o = c(o, t[(r = a[s])], r, t);
				return o;
			};
			function xb(t, e) {
				var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
					i = n.skipHooks,
					s = void 0 !== i && i,
					r = Object.keys(e).reduce(function (t, n) {
						var i = e[n];
						return i.icon ? (t[i.iconName] = i.icon) : (t[n] = i), t;
					}, {});
				'function' != typeof Hv.hooks.addPack || s
					? (Hv.styles[t] = kv({}, Hv.styles[t] || {}, r))
					: Hv.hooks.addPack(t, r),
					'fas' === t && xb('fa', e);
			}
			var Sb = Hv.styles,
				Eb = Hv.shims,
				Cb = function () {
					var t = function (t) {
						return wb(
							Sb,
							function (e, n, i) {
								return (e[i] = wb(n, t, {})), e;
							},
							{}
						);
					};
					t(function (t, e, n) {
						return e[3] && (t[e[3]] = n), t;
					}),
						t(function (t, e, n) {
							var i = e[2];
							return (
								(t[n] = n),
								i.forEach(function (e) {
									t[e] = n;
								}),
								t
							);
						});
					var e = 'far' in Sb;
					wb(
						Eb,
						function (t, n) {
							var i = n[1];
							return 'far' !== i || e || (i = 'fas'), (t[n[0]] = { prefix: i, iconName: n[2] }), t;
						},
						{}
					);
				};
			function kb(t, e, n) {
				if (t && t[e] && t[e][n]) return { prefix: e, iconName: n, icon: t[e][n] };
			}
			function Tb(t) {
				var e = t.tag,
					n = t.attributes,
					i = void 0 === n ? {} : n,
					s = t.children,
					r = void 0 === s ? [] : s;
				return 'string' == typeof t
					? fb(t)
					: '<'
							.concat(e, ' ')
							.concat(
								(function (t) {
									return Object.keys(t || {})
										.reduce(function (e, n) {
											return e + ''.concat(n, '="').concat(fb(t[n]), '" ');
										}, '')
										.trim();
								})(i),
								'>'
							)
							.concat(r.map(Tb).join(''), '</')
							.concat(e, '>');
			}
			function Ab(t) {
				(this.name = 'MissingIcon'), (this.message = t || 'Icon unavailable'), (this.stack = new Error().stack);
			}
			Cb(), ((Ab.prototype = Object.create(Error.prototype)).constructor = Ab);
			var Ib = { fill: 'currentColor' },
				Ob = { attributeType: 'XML', repeatCount: 'indefinite', dur: '2s' },
				Rb =
					(kv({}, Ib, {
						d:
							'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z',
					}),
					kv({}, Ob, { attributeName: 'opacity' }));
			function Pb(t) {
				var e = t[0],
					n = t[1],
					i = Tv(t.slice(4), 1)[0];
				return {
					found: !0,
					width: e,
					height: n,
					icon: Array.isArray(i)
						? {
								tag: 'g',
								attributes: { class: ''.concat(Vv.familyPrefix, '-').concat(jv.GROUP) },
								children: [
									{
										tag: 'path',
										attributes: {
											class: ''.concat(Vv.familyPrefix, '-').concat(jv.SECONDARY),
											fill: 'currentColor',
											d: i[0],
										},
									},
									{
										tag: 'path',
										attributes: {
											class: ''.concat(Vv.familyPrefix, '-').concat(jv.PRIMARY),
											fill: 'currentColor',
											d: i[1],
										},
									},
								],
						  }
						: { tag: 'path', attributes: { fill: 'currentColor', d: i } },
				};
			}
			function Lb() {
				Vv.autoAddCss &&
					!jb &&
					((function (t) {
						if (t && Nv) {
							var e = Lv.createElement('style');
							e.setAttribute('type', 'text/css'), (e.innerHTML = t);
							for (var n = Lv.head.childNodes, i = null, s = n.length - 1; s > -1; s--) {
								var r = n[s],
									o = (r.tagName || '').toUpperCase();
								['STYLE', 'LINK'].indexOf(o) > -1 && (i = r);
							}
							Lv.head.insertBefore(e, i);
						}
					})(
						(function () {
							var t = 'fa',
								e = Dv,
								n = Vv.familyPrefix,
								i = Vv.replacementClass,
								s =
									'svg:not(:root).svg-inline--fa {\n  overflow: visible;\n}\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.225em;\n}\n.svg-inline--fa.fa-w-1 {\n  width: 0.0625em;\n}\n.svg-inline--fa.fa-w-2 {\n  width: 0.125em;\n}\n.svg-inline--fa.fa-w-3 {\n  width: 0.1875em;\n}\n.svg-inline--fa.fa-w-4 {\n  width: 0.25em;\n}\n.svg-inline--fa.fa-w-5 {\n  width: 0.3125em;\n}\n.svg-inline--fa.fa-w-6 {\n  width: 0.375em;\n}\n.svg-inline--fa.fa-w-7 {\n  width: 0.4375em;\n}\n.svg-inline--fa.fa-w-8 {\n  width: 0.5em;\n}\n.svg-inline--fa.fa-w-9 {\n  width: 0.5625em;\n}\n.svg-inline--fa.fa-w-10 {\n  width: 0.625em;\n}\n.svg-inline--fa.fa-w-11 {\n  width: 0.6875em;\n}\n.svg-inline--fa.fa-w-12 {\n  width: 0.75em;\n}\n.svg-inline--fa.fa-w-13 {\n  width: 0.8125em;\n}\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-15 {\n  width: 0.9375em;\n}\n.svg-inline--fa.fa-w-16 {\n  width: 1em;\n}\n.svg-inline--fa.fa-w-17 {\n  width: 1.0625em;\n}\n.svg-inline--fa.fa-w-18 {\n  width: 1.125em;\n}\n.svg-inline--fa.fa-w-19 {\n  width: 1.1875em;\n}\n.svg-inline--fa.fa-w-20 {\n  width: 1.25em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-border {\n  height: 1.5em;\n}\n.svg-inline--fa.fa-li {\n  width: 2em;\n}\n.svg-inline--fa.fa-fw {\n  width: 1.25em;\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: 0.25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-lg {\n  font-size: 1.3333333333em;\n  line-height: 0.75em;\n  vertical-align: -0.0667em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit;\n}\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: 0.1em;\n  padding: 0.2em 0.25em 0.15em;\n}\n\n.fa-pull-left {\n  float: left;\n}\n\n.fa-pull-right {\n  float: right;\n}\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: 0.3em;\n}\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: 0.3em;\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear;\n}\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8);\n}\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical,\n:root .fa-flip-both {\n  -webkit-filter: none;\n          filter: none;\n}\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: #fff;\n}\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n}\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse {\n  color: #fff;\n}';
							if (n !== t || i !== e) {
								var r = new RegExp('\\.'.concat(t, '\\-'), 'g'),
									o = new RegExp('\\--'.concat(t, '\\-'), 'g'),
									a = new RegExp('\\.'.concat(e), 'g');
								s = s
									.replace(r, '.'.concat(n, '-'))
									.replace(o, '--'.concat(n, '-'))
									.replace(a, '.'.concat(i));
							}
							return s;
						})()
					),
					(jb = !0));
			}
			function Nb(t, e) {
				return (
					Object.defineProperty(t, 'abstract', { get: e }),
					Object.defineProperty(t, 'html', {
						get: function () {
							return t.abstract.map(function (t) {
								return Tb(t);
							});
						},
					}),
					Object.defineProperty(t, 'node', {
						get: function () {
							if (Nv) {
								var e = Lv.createElement('div');
								return (e.innerHTML = t.html), e.children;
							}
						},
					}),
					t
				);
			}
			function Db(t) {
				var e = t.prefix,
					n = void 0 === e ? 'fa' : e,
					i = t.iconName;
				if (i) return kb(Fb.definitions, n, i) || kb(Hv.styles, n, i);
			}
			kv({}, Ib, { cx: '256', cy: '364', r: '28' }),
				kv({}, Ob, { attributeName: 'r', values: '28;14;28;28;14;28;' }),
				kv({}, Rb, { values: '1;0;1;1;0;1;' }),
				kv({}, Ib, {
					opacity: '1',
					d:
						'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z',
				}),
				kv({}, Rb, { values: '1;0;0;0;0;1;' }),
				kv({}, Ib, {
					opacity: '0',
					d:
						'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z',
				}),
				kv({}, Rb, { values: '0;0;1;1;0;0;' });
			var Mb,
				Fb = new ((function () {
					function t() {
						!(function (t, e) {
							if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
						})(this, t),
							(this.definitions = {});
					}
					var e;
					return (
						(e = [
							{
								key: 'add',
								value: function () {
									for (var t = this, e = arguments.length, n = new Array(e), i = 0; i < e; i++)
										n[i] = arguments[i];
									var s = n.reduce(this._pullDefinitions, {});
									Object.keys(s).forEach(function (e) {
										(t.definitions[e] = kv({}, t.definitions[e] || {}, s[e])), xb(e, s[e]), Cb();
									});
								},
							},
							{
								key: 'reset',
								value: function () {
									this.definitions = {};
								},
							},
							{
								key: '_pullDefinitions',
								value: function (t, e) {
									var n = e.prefix && e.iconName && e.icon ? { 0: e } : e;
									return (
										Object.keys(n).map(function (e) {
											var i = n[e],
												s = i.prefix,
												r = i.iconName,
												o = i.icon;
											t[s] || (t[s] = {}), (t[s][r] = o);
										}),
										t
									);
								},
							},
						]) &&
							(function (t, e) {
								for (var n = 0; n < e.length; n++) {
									var i = e[n];
									(i.enumerable = i.enumerable || !1),
										(i.configurable = !0),
										'value' in i && (i.writable = !0),
										Object.defineProperty(t, i.key, i);
								}
							})(t.prototype, e),
						t
					);
				})())(),
				jb = !1,
				Bb =
					((Mb = function (t) {
						var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
							n = e.transform,
							i = void 0 === n ? db : n,
							s = e.symbol,
							r = void 0 !== s && s,
							o = e.mask,
							a = void 0 === o ? null : o,
							l = e.maskId,
							c = void 0 === l ? null : l,
							u = e.title,
							h = void 0 === u ? null : u,
							d = e.titleId,
							p = void 0 === d ? null : d,
							f = e.classes,
							m = void 0 === f ? [] : f,
							g = e.attributes,
							y = void 0 === g ? {} : g,
							_ = e.styles,
							v = void 0 === _ ? {} : _;
						if (t) {
							var b = t.prefix,
								w = t.iconName,
								x = t.icon;
							return Nb(kv({ type: 'icon' }, t), function () {
								return (
									Lb(),
									Vv.autoA11y &&
										(h
											? (y['aria-labelledby'] = ''
													.concat(Vv.replacementClass, '-title-')
													.concat(p || pb()))
											: ((y['aria-hidden'] = 'true'), (y.focusable = 'false'))),
									bb({
										icons: {
											main: Pb(x),
											mask: a ? Pb(a.icon) : { found: !1, width: null, height: null, icon: {} },
										},
										prefix: b,
										iconName: w,
										transform: kv({}, db, i),
										symbol: r,
										title: h,
										maskId: c,
										titleId: p,
										extra: { attributes: y, styles: v, classes: m },
									})
								);
							});
						}
					}),
					function (t) {
						var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
							n = (t || {}).icon ? t : Db(t || {}),
							i = e.mask;
						return i && (i = (i || {}).icon ? i : Db(i || {})), Mb(n, kv({}, e, { mask: i }));
					});
			let zb = (() => {
					class t {
						constructor() {
							(this.defaultPrefix = 'fas'), (this.fallbackIcon = null), (this.globalLibrary = !1);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵprov = ht({
							factory: function () {
								return new t();
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				Vb = (() => {
					class t {
						constructor() {
							this.definitions = {};
						}
						addIcons(...t) {
							for (const e of t)
								e.prefix in this.definitions || (this.definitions[e.prefix] = {}),
									(this.definitions[e.prefix][e.iconName] = e);
						}
						addIconPacks(...t) {
							for (const e of t) {
								const t = Object.keys(e).map(t => e[t]);
								this.addIcons(...t);
							}
						}
						getIconDefinition(t, e) {
							return t in this.definitions && e in this.definitions[t] ? this.definitions[t][e] : null;
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵprov = ht({
							factory: function () {
								return new t();
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})();
			const Ub = t => {
				const e = {
					'fa-spin': t.spin,
					'fa-pulse': t.pulse,
					'fa-fw': t.fixedWidth,
					'fa-border': t.border,
					'fa-inverse': t.inverse,
					'fa-layers-counter': t.counter,
					'fa-flip-horizontal': 'horizontal' === t.flip || 'both' === t.flip,
					'fa-flip-vertical': 'vertical' === t.flip || 'both' === t.flip,
					['fa-' + t.size]: null !== t.size,
					['fa-rotate-' + t.rotate]: null !== t.rotate,
					['fa-pull-' + t.pull]: null !== t.pull,
					['fa-stack-' + t.stackItemSize]: null != t.stackItemSize,
				};
				return Object.keys(e)
					.map(t => (e[t] ? t : null))
					.filter(t => t);
			};
			let Hb = (() => {
					class t {
						constructor() {
							this.stackItemSize = '1x';
						}
						ngOnChanges(t) {
							if ('size' in t)
								throw new Error(
									'fa-icon is not allowed to customize size when used inside fa-stack. Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.'
								);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵdir = xe({
							type: t,
							selectors: [
								['fa-icon', 'stackItemSize', ''],
								['fa-duotone-icon', 'stackItemSize', ''],
							],
							inputs: { stackItemSize: 'stackItemSize', size: 'size' },
							features: [Me],
						})),
						t
					);
				})(),
				$b = (() => {
					class t {
						constructor(t, e, n, i) {
							(this.sanitizer = t),
								(this.config = e),
								(this.iconLibrary = n),
								(this.stackItem = i),
								(this.classes = []);
						}
						ngOnChanges(t) {
							if (null == this.icon && null == this.config.fallbackIcon)
								return (() => {
									throw new Error(
										'Property `icon` is required for `fa-icon`/`fa-duotone-icon` components.'
									);
								})();
							let e = null;
							if (((e = null == this.icon ? this.config.fallbackIcon : this.icon), t)) {
								const t = this.findIconDefinition(e);
								if (null != t) {
									const e = this.buildParams();
									this.renderIcon(t, e);
								}
							}
						}
						render() {
							this.ngOnChanges({});
						}
						findIconDefinition(t) {
							const e = ((t, e) => {
								return void 0 !== (n = t).prefix && void 0 !== n.iconName
									? t
									: Array.isArray(t) && 2 === t.length
									? { prefix: t[0], iconName: t[1] }
									: 'string' == typeof t
									? { prefix: e, iconName: t }
									: void 0;
								var n;
							})(t, this.config.defaultPrefix);
							if ('icon' in e) return e;
							const n = this.iconLibrary.getIconDefinition(e.prefix, e.iconName);
							if (null != n) return n;
							const i = Db(e);
							if (null != i) {
								const t =
									'Global icon library is deprecated. Consult https://github.com/FortAwesome/angular-fontawesome/blob/master/UPGRADING.md for the migration instructions.';
								if ('unset' === this.config.globalLibrary) console.error('FontAwesome: ' + t);
								else if (!this.config.globalLibrary) throw new Error(t);
								return i;
							}
							return (
								(t => {
									throw new Error(
										`Could not find icon with iconName=${t.iconName} and prefix=${t.prefix} in the icon library.`
									);
								})(e),
								null
							);
						}
						buildParams() {
							const t = {
									flip: this.flip,
									spin: this.spin,
									pulse: this.pulse,
									border: this.border,
									inverse: this.inverse,
									size: this.size || null,
									pull: this.pull || null,
									rotate: this.rotate || null,
									fixedWidth:
										'boolean' == typeof this.fixedWidth ? this.fixedWidth : this.config.fixedWidth,
									stackItemSize: null != this.stackItem ? this.stackItem.stackItemSize : null,
								},
								e =
									'string' == typeof this.transform
										? (function (t) {
												var e = { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 };
												return t
													? t
															.toLowerCase()
															.split(' ')
															.reduce(function (t, e) {
																var n = e.toLowerCase().split('-'),
																	i = n[0],
																	s = n.slice(1).join('-');
																if (i && 'h' === s) return (t.flipX = !0), t;
																if (i && 'v' === s) return (t.flipY = !0), t;
																if (((s = parseFloat(s)), isNaN(s))) return t;
																switch (i) {
																	case 'grow':
																		t.size = t.size + s;
																		break;
																	case 'shrink':
																		t.size = t.size - s;
																		break;
																	case 'left':
																		t.x = t.x - s;
																		break;
																	case 'right':
																		t.x = t.x + s;
																		break;
																	case 'up':
																		t.y = t.y - s;
																		break;
																	case 'down':
																		t.y = t.y + s;
																		break;
																	case 'rotate':
																		t.rotate = t.rotate + s;
																}
																return t;
															}, e)
													: e;
										  })(this.transform)
										: this.transform;
							return {
								title: this.title,
								transform: e,
								classes: [...Ub(t), ...this.classes],
								mask: null != this.mask ? this.findIconDefinition(this.mask) : null,
								styles: null != this.styles ? this.styles : {},
								symbol: this.symbol,
								attributes: { role: this.a11yRole },
							};
						}
						renderIcon(t, e) {
							const n = Bb(t, e);
							this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(n.html.join('\n'));
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(To(th), To(zb), To(Vb), To(Hb, 8));
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [['fa-icon']],
							hostAttrs: [1, 'ng-fa-icon'],
							hostVars: 2,
							hostBindings: function (t, e) {
								2 & t && (aa('innerHTML', e.renderedIconHTML, ss), Co('title', e.title));
							},
							inputs: {
								classes: 'classes',
								icon: 'icon',
								title: 'title',
								spin: 'spin',
								pulse: 'pulse',
								mask: 'mask',
								styles: 'styles',
								flip: 'flip',
								size: 'size',
								pull: 'pull',
								border: 'border',
								inverse: 'inverse',
								symbol: 'symbol',
								rotate: 'rotate',
								fixedWidth: 'fixedWidth',
								transform: 'transform',
								a11yRole: 'a11yRole',
							},
							features: [Me],
							decls: 0,
							vars: 0,
							template: function (t, e) {},
							encapsulation: 2,
						})),
						t
					);
				})(),
				qb = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
						})),
						t
					);
				})();
			const Wb = (() => {
				function t() {
					return (
						Error.call(this), (this.message = 'no elements in sequence'), (this.name = 'EmptyError'), this
					);
				}
				return (t.prototype = Object.create(Error.prototype)), t;
			})();
			function Qb(t) {
				return new _(e => {
					let n;
					try {
						n = t();
					} catch (i) {
						return void e.error(i);
					}
					return (n ? M(n) : Ph()).subscribe(e);
				});
			}
			function Zb(t) {
				return function (e) {
					return 0 === t ? Ph() : e.lift(new Gb(t));
				};
			}
			class Gb {
				constructor(t) {
					if (((this.total = t), this.total < 0)) throw new Oh();
				}
				call(t, e) {
					return e.subscribe(new Kb(t, this.total));
				}
			}
			class Kb extends f {
				constructor(t, e) {
					super(t), (this.total = e), (this.ring = new Array()), (this.count = 0);
				}
				_next(t) {
					const e = this.ring,
						n = this.total,
						i = this.count++;
					e.length < n ? e.push(t) : (e[i % n] = t);
				}
				_complete() {
					const t = this.destination;
					let e = this.count;
					if (e > 0) {
						const n = this.count >= this.total ? this.total : this.count,
							i = this.ring;
						for (let s = 0; s < n; s++) {
							const s = e++ % n;
							t.next(i[s]);
						}
					}
					t.complete();
				}
			}
			function Yb(t = tw) {
				return e => e.lift(new Xb(t));
			}
			class Xb {
				constructor(t) {
					this.errorFactory = t;
				}
				call(t, e) {
					return e.subscribe(new Jb(t, this.errorFactory));
				}
			}
			class Jb extends f {
				constructor(t, e) {
					super(t), (this.errorFactory = e), (this.hasValue = !1);
				}
				_next(t) {
					(this.hasValue = !0), this.destination.next(t);
				}
				_complete() {
					if (this.hasValue) return this.destination.complete();
					{
						let t;
						try {
							t = this.errorFactory();
						} catch (iE) {
							t = iE;
						}
						this.destination.error(t);
					}
				}
			}
			function tw() {
				return new Wb();
			}
			function ew(t = null) {
				return e => e.lift(new nw(t));
			}
			class nw {
				constructor(t) {
					this.defaultValue = t;
				}
				call(t, e) {
					return e.subscribe(new iw(t, this.defaultValue));
				}
			}
			class iw extends f {
				constructor(t, e) {
					super(t), (this.defaultValue = e), (this.isEmpty = !0);
				}
				_next(t) {
					(this.isEmpty = !1), this.destination.next(t);
				}
				_complete() {
					this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete();
				}
			}
			class sw {
				constructor(t, e, n = !1) {
					(this.accumulator = t), (this.seed = e), (this.hasSeed = n);
				}
				call(t, e) {
					return e.subscribe(new rw(t, this.accumulator, this.seed, this.hasSeed));
				}
			}
			class rw extends f {
				constructor(t, e, n, i) {
					super(t), (this.accumulator = e), (this._seed = n), (this.hasSeed = i), (this.index = 0);
				}
				get seed() {
					return this._seed;
				}
				set seed(t) {
					(this.hasSeed = !0), (this._seed = t);
				}
				_next(t) {
					if (this.hasSeed) return this._tryNext(t);
					(this.seed = t), this.destination.next(t);
				}
				_tryNext(t) {
					const e = this.index++;
					let n;
					try {
						n = this.accumulator(this.seed, t, e);
					} catch (i) {
						this.destination.error(i);
					}
					(this.seed = n), this.destination.next(n);
				}
			}
			function ow(t, e) {
				const n = arguments.length >= 2;
				return i => i.pipe(t ? Th((e, n) => t(e, n, i)) : y, Lh(1), n ? ew(e) : Yb(() => new Wb()));
			}
			class aw {
				constructor(t, e) {
					(this.id = t), (this.url = e);
				}
			}
			class lw extends aw {
				constructor(t, e, n = 'imperative', i = null) {
					super(t, e), (this.navigationTrigger = n), (this.restoredState = i);
				}
				toString() {
					return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
				}
			}
			class cw extends aw {
				constructor(t, e, n) {
					super(t, e), (this.urlAfterRedirects = n);
				}
				toString() {
					return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
				}
			}
			class uw extends aw {
				constructor(t, e, n) {
					super(t, e), (this.reason = n);
				}
				toString() {
					return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
				}
			}
			class hw extends aw {
				constructor(t, e, n) {
					super(t, e), (this.error = n);
				}
				toString() {
					return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
				}
			}
			class dw extends aw {
				constructor(t, e, n, i) {
					super(t, e), (this.urlAfterRedirects = n), (this.state = i);
				}
				toString() {
					return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class pw extends aw {
				constructor(t, e, n, i) {
					super(t, e), (this.urlAfterRedirects = n), (this.state = i);
				}
				toString() {
					return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class fw extends aw {
				constructor(t, e, n, i, s) {
					super(t, e), (this.urlAfterRedirects = n), (this.state = i), (this.shouldActivate = s);
				}
				toString() {
					return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
				}
			}
			class mw extends aw {
				constructor(t, e, n, i) {
					super(t, e), (this.urlAfterRedirects = n), (this.state = i);
				}
				toString() {
					return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class gw extends aw {
				constructor(t, e, n, i) {
					super(t, e), (this.urlAfterRedirects = n), (this.state = i);
				}
				toString() {
					return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class yw {
				constructor(t) {
					this.route = t;
				}
				toString() {
					return `RouteConfigLoadStart(path: ${this.route.path})`;
				}
			}
			class _w {
				constructor(t) {
					this.route = t;
				}
				toString() {
					return `RouteConfigLoadEnd(path: ${this.route.path})`;
				}
			}
			class vw {
				constructor(t) {
					this.snapshot = t;
				}
				toString() {
					return `ChildActivationStart(path: '${
						(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
					}')`;
				}
			}
			class bw {
				constructor(t) {
					this.snapshot = t;
				}
				toString() {
					return `ChildActivationEnd(path: '${
						(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
					}')`;
				}
			}
			class ww {
				constructor(t) {
					this.snapshot = t;
				}
				toString() {
					return `ActivationStart(path: '${
						(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
					}')`;
				}
			}
			class xw {
				constructor(t) {
					this.snapshot = t;
				}
				toString() {
					return `ActivationEnd(path: '${
						(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
					}')`;
				}
			}
			class Sw {
				constructor(t, e, n) {
					(this.routerEvent = t), (this.position = e), (this.anchor = n);
				}
				toString() {
					return `Scroll(anchor: '${this.anchor}', position: '${
						this.position ? `${this.position[0]}, ${this.position[1]}` : null
					}')`;
				}
			}
			const Ew = 'primary';
			class Cw {
				constructor(t) {
					this.params = t || {};
				}
				has(t) {
					return Object.prototype.hasOwnProperty.call(this.params, t);
				}
				get(t) {
					if (this.has(t)) {
						const e = this.params[t];
						return Array.isArray(e) ? e[0] : e;
					}
					return null;
				}
				getAll(t) {
					if (this.has(t)) {
						const e = this.params[t];
						return Array.isArray(e) ? e : [e];
					}
					return [];
				}
				get keys() {
					return Object.keys(this.params);
				}
			}
			function kw(t) {
				return new Cw(t);
			}
			function Tw(t) {
				const e = Error('NavigationCancelingError: ' + t);
				return (e.ngNavigationCancelingError = !0), e;
			}
			function Aw(t, e, n) {
				const i = n.path.split('/');
				if (i.length > t.length) return null;
				if ('full' === n.pathMatch && (e.hasChildren() || i.length < t.length)) return null;
				const s = {};
				for (let r = 0; r < i.length; r++) {
					const e = i[r],
						n = t[r];
					if (e.startsWith(':')) s[e.substring(1)] = n;
					else if (e !== n.path) return null;
				}
				return { consumed: t.slice(0, i.length), posParams: s };
			}
			function Iw(t, e) {
				const n = Object.keys(t),
					i = Object.keys(e);
				if (!n || !i || n.length != i.length) return !1;
				let s;
				for (let r = 0; r < n.length; r++) if (((s = n[r]), !Ow(t[s], e[s]))) return !1;
				return !0;
			}
			function Ow(t, e) {
				if (Array.isArray(t) && Array.isArray(e)) {
					if (t.length !== e.length) return !1;
					const n = [...t].sort(),
						i = [...e].sort();
					return n.every((t, e) => i[e] === t);
				}
				return t === e;
			}
			function Rw(t) {
				return Array.prototype.concat.apply([], t);
			}
			function Pw(t) {
				return t.length > 0 ? t[t.length - 1] : null;
			}
			function Lw(t, e) {
				for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
			}
			function Nw(t) {
				return (e = t) && 'function' == typeof e.subscribe ? t : Do(t) ? M(Promise.resolve(t)) : fh(t);
				var e;
			}
			function Dw(t, e, n) {
				return n
					? (function (t, e) {
							return Iw(t, e);
					  })(t.queryParams, e.queryParams) &&
							(function t(e, n) {
								if (!Bw(e.segments, n.segments)) return !1;
								if (e.numberOfChildren !== n.numberOfChildren) return !1;
								for (const i in n.children) {
									if (!e.children[i]) return !1;
									if (!t(e.children[i], n.children[i])) return !1;
								}
								return !0;
							})(t.root, e.root)
					: (function (t, e) {
							return (
								Object.keys(e).length <= Object.keys(t).length &&
								Object.keys(e).every(n => Ow(t[n], e[n]))
							);
					  })(t.queryParams, e.queryParams) &&
							(function t(e, n) {
								return (function e(n, i, s) {
									if (n.segments.length > s.length)
										return !!Bw(n.segments.slice(0, s.length), s) && !i.hasChildren();
									if (n.segments.length === s.length) {
										if (!Bw(n.segments, s)) return !1;
										for (const e in i.children) {
											if (!n.children[e]) return !1;
											if (!t(n.children[e], i.children[e])) return !1;
										}
										return !0;
									}
									{
										const t = s.slice(0, n.segments.length),
											r = s.slice(n.segments.length);
										return (
											!!Bw(n.segments, t) && !!n.children.primary && e(n.children.primary, i, r)
										);
									}
								})(e, n, n.segments);
							})(t.root, e.root);
			}
			class Mw {
				constructor(t, e, n) {
					(this.root = t), (this.queryParams = e), (this.fragment = n);
				}
				get queryParamMap() {
					return this._queryParamMap || (this._queryParamMap = kw(this.queryParams)), this._queryParamMap;
				}
				toString() {
					return Hw.serialize(this);
				}
			}
			class Fw {
				constructor(t, e) {
					(this.segments = t), (this.children = e), (this.parent = null), Lw(e, (t, e) => (t.parent = this));
				}
				hasChildren() {
					return this.numberOfChildren > 0;
				}
				get numberOfChildren() {
					return Object.keys(this.children).length;
				}
				toString() {
					return $w(this);
				}
			}
			class jw {
				constructor(t, e) {
					(this.path = t), (this.parameters = e);
				}
				get parameterMap() {
					return this._parameterMap || (this._parameterMap = kw(this.parameters)), this._parameterMap;
				}
				toString() {
					return Kw(this);
				}
			}
			function Bw(t, e) {
				return t.length === e.length && t.every((t, n) => t.path === e[n].path);
			}
			function zw(t, e) {
				let n = [];
				return (
					Lw(t.children, (t, i) => {
						i === Ew && (n = n.concat(e(t, i)));
					}),
					Lw(t.children, (t, i) => {
						i !== Ew && (n = n.concat(e(t, i)));
					}),
					n
				);
			}
			class Vw {}
			class Uw {
				parse(t) {
					const e = new ex(t);
					return new Mw(e.parseRootSegment(), e.parseQueryParams(), e.parseFragment());
				}
				serialize(t) {
					return `${
						'/' +
						(function t(e, n) {
							if (!e.hasChildren()) return $w(e);
							if (n) {
								const n = e.children.primary ? t(e.children.primary, !1) : '',
									i = [];
								return (
									Lw(e.children, (e, n) => {
										n !== Ew && i.push(`${n}:${t(e, !1)}`);
									}),
									i.length > 0 ? `${n}(${i.join('//')})` : n
								);
							}
							{
								const n = zw(e, (n, i) =>
									i === Ew ? [t(e.children.primary, !1)] : [`${i}:${t(n, !1)}`]
								);
								return 1 === Object.keys(e.children).length && null != e.children.primary
									? `${$w(e)}/${n[0]}`
									: `${$w(e)}/(${n.join('//')})`;
							}
						})(t.root, !0)
					}${(function (t) {
						const e = Object.keys(t).map(e => {
							const n = t[e];
							return Array.isArray(n) ? n.map(t => `${Ww(e)}=${Ww(t)}`).join('&') : `${Ww(e)}=${Ww(n)}`;
						});
						return e.length ? '?' + e.join('&') : '';
					})(t.queryParams)}${'string' == typeof t.fragment ? '#' + encodeURI(t.fragment) : ''}`;
				}
			}
			const Hw = new Uw();
			function $w(t) {
				return t.segments.map(t => Kw(t)).join('/');
			}
			function qw(t) {
				return encodeURIComponent(t)
					.replace(/%40/g, '@')
					.replace(/%3A/gi, ':')
					.replace(/%24/g, '$')
					.replace(/%2C/gi, ',');
			}
			function Ww(t) {
				return qw(t).replace(/%3B/gi, ';');
			}
			function Qw(t) {
				return qw(t).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%26/gi, '&');
			}
			function Zw(t) {
				return decodeURIComponent(t);
			}
			function Gw(t) {
				return Zw(t.replace(/\+/g, '%20'));
			}
			function Kw(t) {
				return `${Qw(t.path)}${
					((e = t.parameters),
					Object.keys(e)
						.map(t => `;${Qw(t)}=${Qw(e[t])}`)
						.join(''))
				}`;
				var e;
			}
			const Yw = /^[^\/()?;=#]+/;
			function Xw(t) {
				const e = t.match(Yw);
				return e ? e[0] : '';
			}
			const Jw = /^[^=?&#]+/,
				tx = /^[^?&#]+/;
			class ex {
				constructor(t) {
					(this.url = t), (this.remaining = t);
				}
				parseRootSegment() {
					return (
						this.consumeOptional('/'),
						'' === this.remaining || this.peekStartsWith('?') || this.peekStartsWith('#')
							? new Fw([], {})
							: new Fw([], this.parseChildren())
					);
				}
				parseQueryParams() {
					const t = {};
					if (this.consumeOptional('?'))
						do {
							this.parseQueryParam(t);
						} while (this.consumeOptional('&'));
					return t;
				}
				parseFragment() {
					return this.consumeOptional('#') ? decodeURIComponent(this.remaining) : null;
				}
				parseChildren() {
					if ('' === this.remaining) return {};
					this.consumeOptional('/');
					const t = [];
					for (
						this.peekStartsWith('(') || t.push(this.parseSegment());
						this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(');

					)
						this.capture('/'), t.push(this.parseSegment());
					let e = {};
					this.peekStartsWith('/(') && (this.capture('/'), (e = this.parseParens(!0)));
					let n = {};
					return (
						this.peekStartsWith('(') && (n = this.parseParens(!1)),
						(t.length > 0 || Object.keys(e).length > 0) && (n.primary = new Fw(t, e)),
						n
					);
				}
				parseSegment() {
					const t = Xw(this.remaining);
					if ('' === t && this.peekStartsWith(';'))
						throw new Error(`Empty path url segment cannot have parameters: '${this.remaining}'.`);
					return this.capture(t), new jw(Zw(t), this.parseMatrixParams());
				}
				parseMatrixParams() {
					const t = {};
					for (; this.consumeOptional(';'); ) this.parseParam(t);
					return t;
				}
				parseParam(t) {
					const e = Xw(this.remaining);
					if (!e) return;
					this.capture(e);
					let n = '';
					if (this.consumeOptional('=')) {
						const t = Xw(this.remaining);
						t && ((n = t), this.capture(n));
					}
					t[Zw(e)] = Zw(n);
				}
				parseQueryParam(t) {
					const e = (function (t) {
						const e = t.match(Jw);
						return e ? e[0] : '';
					})(this.remaining);
					if (!e) return;
					this.capture(e);
					let n = '';
					if (this.consumeOptional('=')) {
						const t = (function (t) {
							const e = t.match(tx);
							return e ? e[0] : '';
						})(this.remaining);
						t && ((n = t), this.capture(n));
					}
					const i = Gw(e),
						s = Gw(n);
					if (t.hasOwnProperty(i)) {
						let e = t[i];
						Array.isArray(e) || ((e = [e]), (t[i] = e)), e.push(s);
					} else t[i] = s;
				}
				parseParens(t) {
					const e = {};
					for (this.capture('('); !this.consumeOptional(')') && this.remaining.length > 0; ) {
						const n = Xw(this.remaining),
							i = this.remaining[n.length];
						if ('/' !== i && ')' !== i && ';' !== i) throw new Error(`Cannot parse url '${this.url}'`);
						let s = void 0;
						n.indexOf(':') > -1
							? ((s = n.substr(0, n.indexOf(':'))), this.capture(s), this.capture(':'))
							: t && (s = Ew);
						const r = this.parseChildren();
						(e[s] = 1 === Object.keys(r).length ? r.primary : new Fw([], r)), this.consumeOptional('//');
					}
					return e;
				}
				peekStartsWith(t) {
					return this.remaining.startsWith(t);
				}
				consumeOptional(t) {
					return !!this.peekStartsWith(t) && ((this.remaining = this.remaining.substring(t.length)), !0);
				}
				capture(t) {
					if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
				}
			}
			class nx {
				constructor(t) {
					this._root = t;
				}
				get root() {
					return this._root.value;
				}
				parent(t) {
					const e = this.pathFromRoot(t);
					return e.length > 1 ? e[e.length - 2] : null;
				}
				children(t) {
					const e = ix(t, this._root);
					return e ? e.children.map(t => t.value) : [];
				}
				firstChild(t) {
					const e = ix(t, this._root);
					return e && e.children.length > 0 ? e.children[0].value : null;
				}
				siblings(t) {
					const e = sx(t, this._root);
					return e.length < 2 ? [] : e[e.length - 2].children.map(t => t.value).filter(e => e !== t);
				}
				pathFromRoot(t) {
					return sx(t, this._root).map(t => t.value);
				}
			}
			function ix(t, e) {
				if (t === e.value) return e;
				for (const n of e.children) {
					const e = ix(t, n);
					if (e) return e;
				}
				return null;
			}
			function sx(t, e) {
				if (t === e.value) return [e];
				for (const n of e.children) {
					const i = sx(t, n);
					if (i.length) return i.unshift(e), i;
				}
				return [];
			}
			class rx {
				constructor(t, e) {
					(this.value = t), (this.children = e);
				}
				toString() {
					return `TreeNode(${this.value})`;
				}
			}
			function ox(t) {
				const e = {};
				return t && t.children.forEach(t => (e[t.value.outlet] = t)), e;
			}
			class ax extends nx {
				constructor(t, e) {
					super(t), (this.snapshot = e), px(this, t);
				}
				toString() {
					return this.snapshot.toString();
				}
			}
			function lx(t, e) {
				const n = (function (t, e) {
						const n = new hx([], {}, {}, '', {}, Ew, e, null, t.root, -1, {});
						return new dx('', new rx(n, []));
					})(t, e),
					i = new pg([new jw('', {})]),
					s = new pg({}),
					r = new pg({}),
					o = new pg({}),
					a = new pg(''),
					l = new cx(i, s, o, a, r, Ew, e, n.root);
				return (l.snapshot = n.root), new ax(new rx(l, []), n);
			}
			class cx {
				constructor(t, e, n, i, s, r, o, a) {
					(this.url = t),
						(this.params = e),
						(this.queryParams = n),
						(this.fragment = i),
						(this.data = s),
						(this.outlet = r),
						(this.component = o),
						(this._futureSnapshot = a);
				}
				get routeConfig() {
					return this._futureSnapshot.routeConfig;
				}
				get root() {
					return this._routerState.root;
				}
				get parent() {
					return this._routerState.parent(this);
				}
				get firstChild() {
					return this._routerState.firstChild(this);
				}
				get children() {
					return this._routerState.children(this);
				}
				get pathFromRoot() {
					return this._routerState.pathFromRoot(this);
				}
				get paramMap() {
					return this._paramMap || (this._paramMap = this.params.pipe(k(t => kw(t)))), this._paramMap;
				}
				get queryParamMap() {
					return (
						this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(k(t => kw(t)))),
						this._queryParamMap
					);
				}
				toString() {
					return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
				}
			}
			function ux(t, e = 'emptyOnly') {
				const n = t.pathFromRoot;
				let i = 0;
				if ('always' !== e)
					for (i = n.length - 1; i >= 1; ) {
						const t = n[i],
							e = n[i - 1];
						if (t.routeConfig && '' === t.routeConfig.path) i--;
						else {
							if (e.component) break;
							i--;
						}
					}
				return (function (t) {
					return t.reduce(
						(t, e) => ({
							params: Object.assign(Object.assign({}, t.params), e.params),
							data: Object.assign(Object.assign({}, t.data), e.data),
							resolve: Object.assign(Object.assign({}, t.resolve), e._resolvedData),
						}),
						{ params: {}, data: {}, resolve: {} }
					);
				})(n.slice(i));
			}
			class hx {
				constructor(t, e, n, i, s, r, o, a, l, c, u) {
					(this.url = t),
						(this.params = e),
						(this.queryParams = n),
						(this.fragment = i),
						(this.data = s),
						(this.outlet = r),
						(this.component = o),
						(this.routeConfig = a),
						(this._urlSegment = l),
						(this._lastPathIndex = c),
						(this._resolve = u);
				}
				get root() {
					return this._routerState.root;
				}
				get parent() {
					return this._routerState.parent(this);
				}
				get firstChild() {
					return this._routerState.firstChild(this);
				}
				get children() {
					return this._routerState.children(this);
				}
				get pathFromRoot() {
					return this._routerState.pathFromRoot(this);
				}
				get paramMap() {
					return this._paramMap || (this._paramMap = kw(this.params)), this._paramMap;
				}
				get queryParamMap() {
					return this._queryParamMap || (this._queryParamMap = kw(this.queryParams)), this._queryParamMap;
				}
				toString() {
					return `Route(url:'${this.url.map(t => t.toString()).join('/')}', path:'${
						this.routeConfig ? this.routeConfig.path : ''
					}')`;
				}
			}
			class dx extends nx {
				constructor(t, e) {
					super(e), (this.url = t), px(this, e);
				}
				toString() {
					return fx(this._root);
				}
			}
			function px(t, e) {
				(e.value._routerState = t), e.children.forEach(e => px(t, e));
			}
			function fx(t) {
				const e = t.children.length > 0 ? ` { ${t.children.map(fx).join(', ')} } ` : '';
				return `${t.value}${e}`;
			}
			function mx(t) {
				if (t.snapshot) {
					const e = t.snapshot,
						n = t._futureSnapshot;
					(t.snapshot = n),
						Iw(e.queryParams, n.queryParams) || t.queryParams.next(n.queryParams),
						e.fragment !== n.fragment && t.fragment.next(n.fragment),
						Iw(e.params, n.params) || t.params.next(n.params),
						(function (t, e) {
							if (t.length !== e.length) return !1;
							for (let n = 0; n < t.length; ++n) if (!Iw(t[n], e[n])) return !1;
							return !0;
						})(e.url, n.url) || t.url.next(n.url),
						Iw(e.data, n.data) || t.data.next(n.data);
				} else (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
			}
			function gx(t, e) {
				var n, i;
				return (
					Iw(t.params, e.params) &&
					Bw((n = t.url), (i = e.url)) &&
					n.every((t, e) => Iw(t.parameters, i[e].parameters)) &&
					!(!t.parent != !e.parent) &&
					(!t.parent || gx(t.parent, e.parent))
				);
			}
			function yx(t) {
				return 'object' == typeof t && null != t && !t.outlets && !t.segmentPath;
			}
			function _x(t, e, n, i, s) {
				let r = {};
				return (
					i &&
						Lw(i, (t, e) => {
							r[e] = Array.isArray(t) ? t.map(t => '' + t) : '' + t;
						}),
					new Mw(
						n.root === t
							? e
							: (function t(e, n, i) {
									const s = {};
									return (
										Lw(e.children, (e, r) => {
											s[r] = e === n ? i : t(e, n, i);
										}),
										new Fw(e.segments, s)
									);
							  })(n.root, t, e),
						r,
						s
					)
				);
			}
			class vx {
				constructor(t, e, n) {
					if (
						((this.isAbsolute = t),
						(this.numberOfDoubleDots = e),
						(this.commands = n),
						t && n.length > 0 && yx(n[0]))
					)
						throw new Error('Root segment cannot have matrix parameters');
					const i = n.find(t => 'object' == typeof t && null != t && t.outlets);
					if (i && i !== Pw(n)) throw new Error('{outlets:{}} has to be the last command');
				}
				toRoot() {
					return this.isAbsolute && 1 === this.commands.length && '/' == this.commands[0];
				}
			}
			class bx {
				constructor(t, e, n) {
					(this.segmentGroup = t), (this.processChildren = e), (this.index = n);
				}
			}
			function wx(t) {
				return 'object' == typeof t && null != t && t.outlets ? t.outlets.primary : '' + t;
			}
			function xx(t, e, n) {
				if ((t || (t = new Fw([], {})), 0 === t.segments.length && t.hasChildren())) return Sx(t, e, n);
				const i = (function (t, e, n) {
						let i = 0,
							s = e;
						const r = { match: !1, pathIndex: 0, commandIndex: 0 };
						for (; s < t.segments.length; ) {
							if (i >= n.length) return r;
							const e = t.segments[s],
								o = wx(n[i]),
								a = i < n.length - 1 ? n[i + 1] : null;
							if (s > 0 && void 0 === o) break;
							if (o && a && 'object' == typeof a && void 0 === a.outlets) {
								if (!Tx(o, a, e)) return r;
								i += 2;
							} else {
								if (!Tx(o, {}, e)) return r;
								i++;
							}
							s++;
						}
						return { match: !0, pathIndex: s, commandIndex: i };
					})(t, e, n),
					s = n.slice(i.commandIndex);
				if (i.match && i.pathIndex < t.segments.length) {
					const e = new Fw(t.segments.slice(0, i.pathIndex), {});
					return (e.children.primary = new Fw(t.segments.slice(i.pathIndex), t.children)), Sx(e, 0, s);
				}
				return i.match && 0 === s.length
					? new Fw(t.segments, {})
					: i.match && !t.hasChildren()
					? Ex(t, e, n)
					: i.match
					? Sx(t, 0, s)
					: Ex(t, e, n);
			}
			function Sx(t, e, n) {
				if (0 === n.length) return new Fw(t.segments, {});
				{
					const i = (function (t) {
							return 'object' == typeof t[0] && null !== t[0] && t[0].outlets
								? t[0].outlets
								: { [Ew]: t };
						})(n),
						s = {};
					return (
						Lw(i, (n, i) => {
							null !== n && (s[i] = xx(t.children[i], e, n));
						}),
						Lw(t.children, (t, e) => {
							void 0 === i[e] && (s[e] = t);
						}),
						new Fw(t.segments, s)
					);
				}
			}
			function Ex(t, e, n) {
				const i = t.segments.slice(0, e);
				let s = 0;
				for (; s < n.length; ) {
					if ('object' == typeof n[s] && null !== n[s] && void 0 !== n[s].outlets) {
						const t = Cx(n[s].outlets);
						return new Fw(i, t);
					}
					if (0 === s && yx(n[0])) {
						i.push(new jw(t.segments[e].path, n[0])), s++;
						continue;
					}
					const r = wx(n[s]),
						o = s < n.length - 1 ? n[s + 1] : null;
					r && o && yx(o) ? (i.push(new jw(r, kx(o))), (s += 2)) : (i.push(new jw(r, {})), s++);
				}
				return new Fw(i, {});
			}
			function Cx(t) {
				const e = {};
				return (
					Lw(t, (t, n) => {
						null !== t && (e[n] = Ex(new Fw([], {}), 0, t));
					}),
					e
				);
			}
			function kx(t) {
				const e = {};
				return Lw(t, (t, n) => (e[n] = '' + t)), e;
			}
			function Tx(t, e, n) {
				return t == n.path && Iw(e, n.parameters);
			}
			class Ax {
				constructor(t, e, n, i) {
					(this.routeReuseStrategy = t),
						(this.futureState = e),
						(this.currState = n),
						(this.forwardEvent = i);
				}
				activate(t) {
					const e = this.futureState._root,
						n = this.currState ? this.currState._root : null;
					this.deactivateChildRoutes(e, n, t), mx(this.futureState.root), this.activateChildRoutes(e, n, t);
				}
				deactivateChildRoutes(t, e, n) {
					const i = ox(e);
					t.children.forEach(t => {
						const e = t.value.outlet;
						this.deactivateRoutes(t, i[e], n), delete i[e];
					}),
						Lw(i, (t, e) => {
							this.deactivateRouteAndItsChildren(t, n);
						});
				}
				deactivateRoutes(t, e, n) {
					const i = t.value,
						s = e ? e.value : null;
					if (i === s)
						if (i.component) {
							const s = n.getContext(i.outlet);
							s && this.deactivateChildRoutes(t, e, s.children);
						} else this.deactivateChildRoutes(t, e, n);
					else s && this.deactivateRouteAndItsChildren(e, n);
				}
				deactivateRouteAndItsChildren(t, e) {
					this.routeReuseStrategy.shouldDetach(t.value.snapshot)
						? this.detachAndStoreRouteSubtree(t, e)
						: this.deactivateRouteAndOutlet(t, e);
				}
				detachAndStoreRouteSubtree(t, e) {
					const n = e.getContext(t.value.outlet);
					if (n && n.outlet) {
						const e = n.outlet.detach(),
							i = n.children.onOutletDeactivated();
						this.routeReuseStrategy.store(t.value.snapshot, { componentRef: e, route: t, contexts: i });
					}
				}
				deactivateRouteAndOutlet(t, e) {
					const n = e.getContext(t.value.outlet);
					if (n) {
						const i = ox(t),
							s = t.value.component ? n.children : e;
						Lw(i, (t, e) => this.deactivateRouteAndItsChildren(t, s)),
							n.outlet && (n.outlet.deactivate(), n.children.onOutletDeactivated());
					}
				}
				activateChildRoutes(t, e, n) {
					const i = ox(e);
					t.children.forEach(t => {
						this.activateRoutes(t, i[t.value.outlet], n), this.forwardEvent(new xw(t.value.snapshot));
					}),
						t.children.length && this.forwardEvent(new bw(t.value.snapshot));
				}
				activateRoutes(t, e, n) {
					const i = t.value,
						s = e ? e.value : null;
					if ((mx(i), i === s))
						if (i.component) {
							const s = n.getOrCreateContext(i.outlet);
							this.activateChildRoutes(t, e, s.children);
						} else this.activateChildRoutes(t, e, n);
					else if (i.component) {
						const e = n.getOrCreateContext(i.outlet);
						if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
							const t = this.routeReuseStrategy.retrieve(i.snapshot);
							this.routeReuseStrategy.store(i.snapshot, null),
								e.children.onOutletReAttached(t.contexts),
								(e.attachRef = t.componentRef),
								(e.route = t.route.value),
								e.outlet && e.outlet.attach(t.componentRef, t.route.value),
								Ix(t.route);
						} else {
							const n = (function (t) {
									for (let e = t.parent; e; e = e.parent) {
										const t = e.routeConfig;
										if (t && t._loadedConfig) return t._loadedConfig;
										if (t && t.component) return null;
									}
									return null;
								})(i.snapshot),
								s = n ? n.module.componentFactoryResolver : null;
							(e.attachRef = null),
								(e.route = i),
								(e.resolver = s),
								e.outlet && e.outlet.activateWith(i, s),
								this.activateChildRoutes(t, null, e.children);
						}
					} else this.activateChildRoutes(t, null, n);
				}
			}
			function Ix(t) {
				mx(t.value), t.children.forEach(Ix);
			}
			class Ox {
				constructor(t, e) {
					(this.routes = t), (this.module = e);
				}
			}
			function Rx(t) {
				return 'function' == typeof t;
			}
			function Px(t) {
				return t instanceof Mw;
			}
			const Lx = Symbol('INITIAL_VALUE');
			function Nx() {
				return mg(t =>
					(function (...t) {
						let e = void 0,
							n = void 0;
						return (
							C(t[t.length - 1]) && (n = t.pop()),
							'function' == typeof t[t.length - 1] && (e = t.pop()),
							1 === t.length && l(t[0]) && (t = t[0]),
							q(t, n).lift(new uv(e))
						);
					})(...t.map(t => t.pipe(Lh(1), ud(Lx)))).pipe(
						(function (t, e) {
							let n = !1;
							return (
								arguments.length >= 2 && (n = !0),
								function (i) {
									return i.lift(new sw(t, e, n));
								}
							);
						})((t, e) => {
							let n = !1;
							return e.reduce((t, i, s) => {
								if (t !== Lx) return t;
								if ((i === Lx && (n = !0), !n)) {
									if (!1 === i) return i;
									if (s === e.length - 1 || Px(i)) return i;
								}
								return t;
							}, t);
						}, Lx),
						Th(t => t !== Lx),
						k(t => (Px(t) ? t : !0 === t)),
						Lh(1)
					)
				);
			}
			class Dx {
				constructor(t) {
					this.segmentGroup = t || null;
				}
			}
			class Mx {
				constructor(t) {
					this.urlTree = t;
				}
			}
			function Fx(t) {
				return new _(e => e.error(new Dx(t)));
			}
			function jx(t) {
				return new _(e => e.error(new Mx(t)));
			}
			function Bx(t) {
				return new _(e =>
					e.error(new Error(`Only absolute redirects can have named outlets. redirectTo: '${t}'`))
				);
			}
			class zx {
				constructor(t, e, n, i, s) {
					(this.configLoader = e),
						(this.urlSerializer = n),
						(this.urlTree = i),
						(this.config = s),
						(this.allowRedirects = !0),
						(this.ngModule = t.get(ee));
				}
				apply() {
					return this.expandSegmentGroup(this.ngModule, this.config, this.urlTree.root, Ew)
						.pipe(k(t => this.createUrlTree(t, this.urlTree.queryParams, this.urlTree.fragment)))
						.pipe(
							gm(t => {
								if (t instanceof Mx) return (this.allowRedirects = !1), this.match(t.urlTree);
								if (t instanceof Dx) throw this.noMatchError(t);
								throw t;
							})
						);
				}
				match(t) {
					return this.expandSegmentGroup(this.ngModule, this.config, t.root, Ew)
						.pipe(k(e => this.createUrlTree(e, t.queryParams, t.fragment)))
						.pipe(
							gm(t => {
								if (t instanceof Dx) throw this.noMatchError(t);
								throw t;
							})
						);
				}
				noMatchError(t) {
					return new Error(`Cannot match any routes. URL Segment: '${t.segmentGroup}'`);
				}
				createUrlTree(t, e, n) {
					const i = t.segments.length > 0 ? new Fw([], { [Ew]: t }) : t;
					return new Mw(i, e, n);
				}
				expandSegmentGroup(t, e, n, i) {
					return 0 === n.segments.length && n.hasChildren()
						? this.expandChildren(t, e, n).pipe(k(t => new Fw([], t)))
						: this.expandSegment(t, n, e, n.segments, i, !0);
				}
				expandChildren(t, e, n) {
					return (function (t, e) {
						if (0 === Object.keys(t).length) return fh({});
						const n = [],
							i = [],
							s = {};
						return (
							Lw(t, (t, r) => {
								const o = e(r, t).pipe(k(t => (s[r] = t)));
								r === Ew ? n.push(o) : i.push(o);
							}),
							fh.apply(null, n.concat(i)).pipe(
								ld(),
								(function (t, e) {
									const n = arguments.length >= 2;
									return i =>
										i.pipe(t ? Th((e, n) => t(e, n, i)) : y, Zb(1), n ? ew(e) : Yb(() => new Wb()));
								})(),
								k(() => s)
							)
						);
					})(n.children, (n, i) => this.expandSegmentGroup(t, e, i, n));
				}
				expandSegment(t, e, n, i, s, r) {
					return fh(...n).pipe(
						xm(o =>
							this.expandSegmentAgainstRoute(t, e, n, o, i, s, r).pipe(
								gm(t => {
									if (t instanceof Dx) return fh(null);
									throw t;
								})
							)
						),
						ow(t => !!t),
						gm((t, n) => {
							if (t instanceof Wb || 'EmptyError' === t.name) {
								if (this.noLeftoversInUrl(e, i, s)) return fh(new Fw([], {}));
								throw new Dx(e);
							}
							throw t;
						})
					);
				}
				noLeftoversInUrl(t, e, n) {
					return 0 === e.length && !t.children[n];
				}
				expandSegmentAgainstRoute(t, e, n, i, s, r, o) {
					return $x(i) !== r
						? Fx(e)
						: void 0 === i.redirectTo
						? this.matchSegmentAgainstRoute(t, e, i, s)
						: o && this.allowRedirects
						? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, i, s, r)
						: Fx(e);
				}
				expandSegmentAgainstRouteUsingRedirect(t, e, n, i, s, r) {
					return '**' === i.path
						? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, i, r)
						: this.expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, i, s, r);
				}
				expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, i) {
					const s = this.applyRedirectCommands([], n.redirectTo, {});
					return n.redirectTo.startsWith('/')
						? jx(s)
						: this.lineralizeSegments(n, s).pipe(
								z(n => {
									const s = new Fw(n, {});
									return this.expandSegment(t, s, e, n, i, !1);
								})
						  );
				}
				expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, i, s, r) {
					const { matched: o, consumedSegments: a, lastChild: l, positionalParamSegments: c } = Vx(e, i, s);
					if (!o) return Fx(e);
					const u = this.applyRedirectCommands(a, i.redirectTo, c);
					return i.redirectTo.startsWith('/')
						? jx(u)
						: this.lineralizeSegments(i, u).pipe(
								z(i => this.expandSegment(t, e, n, i.concat(s.slice(l)), r, !1))
						  );
				}
				matchSegmentAgainstRoute(t, e, n, i) {
					if ('**' === n.path)
						return n.loadChildren
							? this.configLoader.load(t.injector, n).pipe(k(t => ((n._loadedConfig = t), new Fw(i, {}))))
							: fh(new Fw(i, {}));
					const { matched: s, consumedSegments: r, lastChild: o } = Vx(e, n, i);
					if (!s) return Fx(e);
					const a = i.slice(o);
					return this.getChildConfig(t, n, i).pipe(
						z(t => {
							const n = t.module,
								i = t.routes,
								{ segmentGroup: s, slicedSegments: o } = (function (t, e, n, i) {
									return n.length > 0 &&
										(function (t, e, n) {
											return n.some(n => Hx(t, e, n) && $x(n) !== Ew);
										})(t, n, i)
										? {
												segmentGroup: Ux(
													new Fw(
														e,
														(function (t, e) {
															const n = {};
															n.primary = e;
															for (const i of t)
																'' === i.path &&
																	$x(i) !== Ew &&
																	(n[$x(i)] = new Fw([], {}));
															return n;
														})(i, new Fw(n, t.children))
													)
												),
												slicedSegments: [],
										  }
										: 0 === n.length &&
										  (function (t, e, n) {
												return n.some(n => Hx(t, e, n));
										  })(t, n, i)
										? {
												segmentGroup: Ux(
													new Fw(
														t.segments,
														(function (t, e, n, i) {
															const s = {};
															for (const r of n)
																Hx(t, e, r) && !i[$x(r)] && (s[$x(r)] = new Fw([], {}));
															return Object.assign(Object.assign({}, i), s);
														})(t, n, i, t.children)
													)
												),
												slicedSegments: n,
										  }
										: { segmentGroup: t, slicedSegments: n };
								})(e, r, a, i);
							return 0 === o.length && s.hasChildren()
								? this.expandChildren(n, i, s).pipe(k(t => new Fw(r, t)))
								: 0 === i.length && 0 === o.length
								? fh(new Fw(r, {}))
								: this.expandSegment(n, s, i, o, Ew, !0).pipe(
										k(t => new Fw(r.concat(t.segments), t.children))
								  );
						})
					);
				}
				getChildConfig(t, e, n) {
					return e.children
						? fh(new Ox(e.children, t))
						: e.loadChildren
						? void 0 !== e._loadedConfig
							? fh(e._loadedConfig)
							: this.runCanLoadGuards(t.injector, e, n).pipe(
									z(n =>
										n
											? this.configLoader
													.load(t.injector, e)
													.pipe(k(t => ((e._loadedConfig = t), t)))
											: (function (t) {
													return new _(e =>
														e.error(
															Tw(
																`Cannot load children because the guard of the route "path: '${t.path}'" returned false`
															)
														)
													);
											  })(e)
									)
							  )
						: fh(new Ox([], t));
				}
				runCanLoadGuards(t, e, n) {
					const i = e.canLoad;
					return i && 0 !== i.length
						? fh(
								i.map(i => {
									const s = t.get(i);
									let r;
									if (
										(function (t) {
											return t && Rx(t.canLoad);
										})(s)
									)
										r = s.canLoad(e, n);
									else {
										if (!Rx(s)) throw new Error('Invalid CanLoad guard');
										r = s(e, n);
									}
									return Nw(r);
								})
						  ).pipe(
								Nx(),
								gh(t => {
									if (!Px(t)) return;
									const e = Tw(`Redirecting to "${this.urlSerializer.serialize(t)}"`);
									throw ((e.url = t), e);
								}),
								k(t => !0 === t)
						  )
						: fh(!0);
				}
				lineralizeSegments(t, e) {
					let n = [],
						i = e.root;
					for (;;) {
						if (((n = n.concat(i.segments)), 0 === i.numberOfChildren)) return fh(n);
						if (i.numberOfChildren > 1 || !i.children.primary) return Bx(t.redirectTo);
						i = i.children.primary;
					}
				}
				applyRedirectCommands(t, e, n) {
					return this.applyRedirectCreatreUrlTree(e, this.urlSerializer.parse(e), t, n);
				}
				applyRedirectCreatreUrlTree(t, e, n, i) {
					const s = this.createSegmentGroup(t, e.root, n, i);
					return new Mw(s, this.createQueryParams(e.queryParams, this.urlTree.queryParams), e.fragment);
				}
				createQueryParams(t, e) {
					const n = {};
					return (
						Lw(t, (t, i) => {
							if ('string' == typeof t && t.startsWith(':')) {
								const s = t.substring(1);
								n[i] = e[s];
							} else n[i] = t;
						}),
						n
					);
				}
				createSegmentGroup(t, e, n, i) {
					const s = this.createSegments(t, e.segments, n, i);
					let r = {};
					return (
						Lw(e.children, (e, s) => {
							r[s] = this.createSegmentGroup(t, e, n, i);
						}),
						new Fw(s, r)
					);
				}
				createSegments(t, e, n, i) {
					return e.map(e => (e.path.startsWith(':') ? this.findPosParam(t, e, i) : this.findOrReturn(e, n)));
				}
				findPosParam(t, e, n) {
					const i = n[e.path.substring(1)];
					if (!i) throw new Error(`Cannot redirect to '${t}'. Cannot find '${e.path}'.`);
					return i;
				}
				findOrReturn(t, e) {
					let n = 0;
					for (const i of e) {
						if (i.path === t.path) return e.splice(n), i;
						n++;
					}
					return t;
				}
			}
			function Vx(t, e, n) {
				if ('' === e.path)
					return 'full' === e.pathMatch && (t.hasChildren() || n.length > 0)
						? { matched: !1, consumedSegments: [], lastChild: 0, positionalParamSegments: {} }
						: { matched: !0, consumedSegments: [], lastChild: 0, positionalParamSegments: {} };
				const i = (e.matcher || Aw)(n, t, e);
				return i
					? {
							matched: !0,
							consumedSegments: i.consumed,
							lastChild: i.consumed.length,
							positionalParamSegments: i.posParams,
					  }
					: { matched: !1, consumedSegments: [], lastChild: 0, positionalParamSegments: {} };
			}
			function Ux(t) {
				if (1 === t.numberOfChildren && t.children.primary) {
					const e = t.children.primary;
					return new Fw(t.segments.concat(e.segments), e.children);
				}
				return t;
			}
			function Hx(t, e, n) {
				return (
					(!(t.hasChildren() || e.length > 0) || 'full' !== n.pathMatch) &&
					'' === n.path &&
					void 0 !== n.redirectTo
				);
			}
			function $x(t) {
				return t.outlet || Ew;
			}
			class qx {
				constructor(t) {
					(this.path = t), (this.route = this.path[this.path.length - 1]);
				}
			}
			class Wx {
				constructor(t, e) {
					(this.component = t), (this.route = e);
				}
			}
			function Qx(t, e, n) {
				const i = t._root;
				return (function t(e, n, i, s, r = { canDeactivateChecks: [], canActivateChecks: [] }) {
					const o = ox(n);
					return (
						e.children.forEach(e => {
							!(function (e, n, i, s, r = { canDeactivateChecks: [], canActivateChecks: [] }) {
								const o = e.value,
									a = n ? n.value : null,
									l = i ? i.getContext(e.value.outlet) : null;
								if (a && o.routeConfig === a.routeConfig) {
									const c = (function (t, e, n) {
										if ('function' == typeof n) return n(t, e);
										switch (n) {
											case 'pathParamsChange':
												return !Bw(t.url, e.url);
											case 'pathParamsOrQueryParamsChange':
												return !Bw(t.url, e.url) || !Iw(t.queryParams, e.queryParams);
											case 'always':
												return !0;
											case 'paramsOrQueryParamsChange':
												return !gx(t, e) || !Iw(t.queryParams, e.queryParams);
											case 'paramsChange':
											default:
												return !gx(t, e);
										}
									})(a, o, o.routeConfig.runGuardsAndResolvers);
									c
										? r.canActivateChecks.push(new qx(s))
										: ((o.data = a.data), (o._resolvedData = a._resolvedData)),
										t(e, n, o.component ? (l ? l.children : null) : i, s, r),
										c &&
											l &&
											l.outlet &&
											l.outlet.isActivated &&
											r.canDeactivateChecks.push(new Wx(l.outlet.component, a));
								} else
									a && Gx(n, l, r),
										r.canActivateChecks.push(new qx(s)),
										t(e, null, o.component ? (l ? l.children : null) : i, s, r);
							})(e, o[e.value.outlet], i, s.concat([e.value]), r),
								delete o[e.value.outlet];
						}),
						Lw(o, (t, e) => Gx(t, i.getContext(e), r)),
						r
					);
				})(i, e ? e._root : null, n, [i.value]);
			}
			function Zx(t, e, n) {
				const i = (function (t) {
					if (!t) return null;
					for (let e = t.parent; e; e = e.parent) {
						const t = e.routeConfig;
						if (t && t._loadedConfig) return t._loadedConfig;
					}
					return null;
				})(e);
				return (i ? i.module.injector : n).get(t);
			}
			function Gx(t, e, n) {
				const i = ox(t),
					s = t.value;
				Lw(i, (t, i) => {
					Gx(t, s.component ? (e ? e.children.getContext(i) : null) : e, n);
				}),
					n.canDeactivateChecks.push(
						new Wx(s.component && e && e.outlet && e.outlet.isActivated ? e.outlet.component : null, s)
					);
			}
			function Kx(t, e) {
				return null !== t && e && e(new ww(t)), fh(!0);
			}
			function Yx(t, e) {
				return null !== t && e && e(new vw(t)), fh(!0);
			}
			function Xx(t, e, n) {
				const i = e.routeConfig ? e.routeConfig.canActivate : null;
				return i && 0 !== i.length
					? fh(
							i.map(i =>
								Qb(() => {
									const s = Zx(i, e, n);
									let r;
									if (
										(function (t) {
											return t && Rx(t.canActivate);
										})(s)
									)
										r = Nw(s.canActivate(e, t));
									else {
										if (!Rx(s)) throw new Error('Invalid CanActivate guard');
										r = Nw(s(e, t));
									}
									return r.pipe(ow());
								})
							)
					  ).pipe(Nx())
					: fh(!0);
			}
			function Jx(t, e, n) {
				const i = e[e.length - 1],
					s = e
						.slice(0, e.length - 1)
						.reverse()
						.map(t =>
							(function (t) {
								const e = t.routeConfig ? t.routeConfig.canActivateChild : null;
								return e && 0 !== e.length ? { node: t, guards: e } : null;
							})(t)
						)
						.filter(t => null !== t)
						.map(e =>
							Qb(() =>
								fh(
									e.guards.map(s => {
										const r = Zx(s, e.node, n);
										let o;
										if (
											(function (t) {
												return t && Rx(t.canActivateChild);
											})(r)
										)
											o = Nw(r.canActivateChild(i, t));
										else {
											if (!Rx(r)) throw new Error('Invalid CanActivateChild guard');
											o = Nw(r(i, t));
										}
										return o.pipe(ow());
									})
								).pipe(Nx())
							)
						);
				return fh(s).pipe(Nx());
			}
			class tS {}
			class eS {
				constructor(t, e, n, i, s, r) {
					(this.rootComponentType = t),
						(this.config = e),
						(this.urlTree = n),
						(this.url = i),
						(this.paramsInheritanceStrategy = s),
						(this.relativeLinkResolution = r);
				}
				recognize() {
					try {
						const t = sS(this.urlTree.root, [], [], this.config, this.relativeLinkResolution).segmentGroup,
							e = this.processSegmentGroup(this.config, t, Ew),
							n = new hx(
								[],
								Object.freeze({}),
								Object.freeze(Object.assign({}, this.urlTree.queryParams)),
								this.urlTree.fragment,
								{},
								Ew,
								this.rootComponentType,
								null,
								this.urlTree.root,
								-1,
								{}
							),
							i = new rx(n, e),
							s = new dx(this.url, i);
						return this.inheritParamsAndData(s._root), fh(s);
					} catch (iE) {
						return new _(e => e.error(iE));
					}
				}
				inheritParamsAndData(t) {
					const e = t.value,
						n = ux(e, this.paramsInheritanceStrategy);
					(e.params = Object.freeze(n.params)),
						(e.data = Object.freeze(n.data)),
						t.children.forEach(t => this.inheritParamsAndData(t));
				}
				processSegmentGroup(t, e, n) {
					return 0 === e.segments.length && e.hasChildren()
						? this.processChildren(t, e)
						: this.processSegment(t, e, e.segments, n);
				}
				processChildren(t, e) {
					const n = zw(e, (e, n) => this.processSegmentGroup(t, e, n));
					return (
						(function (t) {
							const e = {};
							t.forEach(t => {
								const n = e[t.value.outlet];
								if (n) {
									const e = n.url.map(t => t.toString()).join('/'),
										i = t.value.url.map(t => t.toString()).join('/');
									throw new Error(
										`Two segments cannot have the same outlet name: '${e}' and '${i}'.`
									);
								}
								e[t.value.outlet] = t.value;
							});
						})(n),
						n.sort((t, e) =>
							t.value.outlet === Ew
								? -1
								: e.value.outlet === Ew
								? 1
								: t.value.outlet.localeCompare(e.value.outlet)
						),
						n
					);
				}
				processSegment(t, e, n, i) {
					for (const s of t)
						try {
							return this.processSegmentAgainstRoute(s, e, n, i);
						} catch (iE) {
							if (!(iE instanceof tS)) throw iE;
						}
					if (this.noLeftoversInUrl(e, n, i)) return [];
					throw new tS();
				}
				noLeftoversInUrl(t, e, n) {
					return 0 === e.length && !t.children[n];
				}
				processSegmentAgainstRoute(t, e, n, i) {
					if (t.redirectTo) throw new tS();
					if ((t.outlet || Ew) !== i) throw new tS();
					let s,
						r = [],
						o = [];
					if ('**' === t.path) {
						const r = n.length > 0 ? Pw(n).parameters : {};
						s = new hx(
							n,
							r,
							Object.freeze(Object.assign({}, this.urlTree.queryParams)),
							this.urlTree.fragment,
							aS(t),
							i,
							t.component,
							t,
							nS(e),
							iS(e) + n.length,
							lS(t)
						);
					} else {
						const a = (function (t, e, n) {
							if ('' === e.path) {
								if ('full' === e.pathMatch && (t.hasChildren() || n.length > 0)) throw new tS();
								return { consumedSegments: [], lastChild: 0, parameters: {} };
							}
							const i = (e.matcher || Aw)(n, t, e);
							if (!i) throw new tS();
							const s = {};
							Lw(i.posParams, (t, e) => {
								s[e] = t.path;
							});
							const r =
								i.consumed.length > 0
									? Object.assign(Object.assign({}, s), i.consumed[i.consumed.length - 1].parameters)
									: s;
							return { consumedSegments: i.consumed, lastChild: i.consumed.length, parameters: r };
						})(e, t, n);
						(r = a.consumedSegments),
							(o = n.slice(a.lastChild)),
							(s = new hx(
								r,
								a.parameters,
								Object.freeze(Object.assign({}, this.urlTree.queryParams)),
								this.urlTree.fragment,
								aS(t),
								i,
								t.component,
								t,
								nS(e),
								iS(e) + r.length,
								lS(t)
							));
					}
					const a = (function (t) {
							return t.children ? t.children : t.loadChildren ? t._loadedConfig.routes : [];
						})(t),
						{ segmentGroup: l, slicedSegments: c } = sS(e, r, o, a, this.relativeLinkResolution);
					if (0 === c.length && l.hasChildren()) {
						const t = this.processChildren(a, l);
						return [new rx(s, t)];
					}
					if (0 === a.length && 0 === c.length) return [new rx(s, [])];
					const u = this.processSegment(a, l, c, Ew);
					return [new rx(s, u)];
				}
			}
			function nS(t) {
				let e = t;
				for (; e._sourceSegment; ) e = e._sourceSegment;
				return e;
			}
			function iS(t) {
				let e = t,
					n = e._segmentIndexShift ? e._segmentIndexShift : 0;
				for (; e._sourceSegment; )
					(e = e._sourceSegment), (n += e._segmentIndexShift ? e._segmentIndexShift : 0);
				return n - 1;
			}
			function sS(t, e, n, i, s) {
				if (
					n.length > 0 &&
					(function (t, e, n) {
						return n.some(n => rS(t, e, n) && oS(n) !== Ew);
					})(t, n, i)
				) {
					const s = new Fw(
						e,
						(function (t, e, n, i) {
							const s = {};
							(s.primary = i), (i._sourceSegment = t), (i._segmentIndexShift = e.length);
							for (const r of n)
								if ('' === r.path && oS(r) !== Ew) {
									const n = new Fw([], {});
									(n._sourceSegment = t), (n._segmentIndexShift = e.length), (s[oS(r)] = n);
								}
							return s;
						})(t, e, i, new Fw(n, t.children))
					);
					return (
						(s._sourceSegment = t),
						(s._segmentIndexShift = e.length),
						{ segmentGroup: s, slicedSegments: [] }
					);
				}
				if (
					0 === n.length &&
					(function (t, e, n) {
						return n.some(n => rS(t, e, n));
					})(t, n, i)
				) {
					const r = new Fw(
						t.segments,
						(function (t, e, n, i, s, r) {
							const o = {};
							for (const a of i)
								if (rS(t, n, a) && !s[oS(a)]) {
									const n = new Fw([], {});
									(n._sourceSegment = t),
										(n._segmentIndexShift = 'legacy' === r ? t.segments.length : e.length),
										(o[oS(a)] = n);
								}
							return Object.assign(Object.assign({}, s), o);
						})(t, e, n, i, t.children, s)
					);
					return (
						(r._sourceSegment = t),
						(r._segmentIndexShift = e.length),
						{ segmentGroup: r, slicedSegments: n }
					);
				}
				const r = new Fw(t.segments, t.children);
				return (
					(r._sourceSegment = t), (r._segmentIndexShift = e.length), { segmentGroup: r, slicedSegments: n }
				);
			}
			function rS(t, e, n) {
				return (
					(!(t.hasChildren() || e.length > 0) || 'full' !== n.pathMatch) &&
					'' === n.path &&
					void 0 === n.redirectTo
				);
			}
			function oS(t) {
				return t.outlet || Ew;
			}
			function aS(t) {
				return t.data || {};
			}
			function lS(t) {
				return t.resolve || {};
			}
			function cS(t) {
				return function (e) {
					return e.pipe(
						mg(e => {
							const n = t(e);
							return n ? M(n).pipe(k(() => e)) : M([e]);
						})
					);
				};
			}
			class uS extends class {
				shouldDetach(t) {
					return !1;
				}
				store(t, e) {}
				shouldAttach(t) {
					return !1;
				}
				retrieve(t) {
					return null;
				}
				shouldReuseRoute(t, e) {
					return t.routeConfig === e.routeConfig;
				}
			} {}
			let hS = (() => {
				class t {}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵcmp = ge({
						type: t,
						selectors: [['ng-component']],
						decls: 1,
						vars: 0,
						template: function (t, e) {
							1 & t && Lo(0, 'router-outlet');
						},
						directives: function () {
							return [CS];
						},
						encapsulation: 2,
					})),
					t
				);
			})();
			function dS(t, e = '') {
				for (let n = 0; n < t.length; n++) {
					const i = t[n];
					pS(i, fS(e, i));
				}
			}
			function pS(t, e) {
				if (!t)
					throw new Error(
						`\n      Invalid configuration of route '${e}': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    `
					);
				if (Array.isArray(t))
					throw new Error(`Invalid configuration of route '${e}': Array cannot be specified`);
				if (!t.component && !t.children && !t.loadChildren && t.outlet && t.outlet !== Ew)
					throw new Error(
						`Invalid configuration of route '${e}': a componentless route without children or loadChildren cannot have a named outlet set`
					);
				if (t.redirectTo && t.children)
					throw new Error(
						`Invalid configuration of route '${e}': redirectTo and children cannot be used together`
					);
				if (t.redirectTo && t.loadChildren)
					throw new Error(
						`Invalid configuration of route '${e}': redirectTo and loadChildren cannot be used together`
					);
				if (t.children && t.loadChildren)
					throw new Error(
						`Invalid configuration of route '${e}': children and loadChildren cannot be used together`
					);
				if (t.redirectTo && t.component)
					throw new Error(
						`Invalid configuration of route '${e}': redirectTo and component cannot be used together`
					);
				if (t.path && t.matcher)
					throw new Error(`Invalid configuration of route '${e}': path and matcher cannot be used together`);
				if (void 0 === t.redirectTo && !t.component && !t.children && !t.loadChildren)
					throw new Error(
						`Invalid configuration of route '${e}'. One of the following must be provided: component, redirectTo, children or loadChildren`
					);
				if (void 0 === t.path && void 0 === t.matcher)
					throw new Error(
						`Invalid configuration of route '${e}': routes must have either a path or a matcher specified`
					);
				if ('string' == typeof t.path && '/' === t.path.charAt(0))
					throw new Error(`Invalid configuration of route '${e}': path cannot start with a slash`);
				if ('' === t.path && void 0 !== t.redirectTo && void 0 === t.pathMatch)
					throw new Error(
						`Invalid configuration of route '{path: "${e}", redirectTo: "${t.redirectTo}"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`
					);
				if (void 0 !== t.pathMatch && 'full' !== t.pathMatch && 'prefix' !== t.pathMatch)
					throw new Error(
						`Invalid configuration of route '${e}': pathMatch can only be set to 'prefix' or 'full'`
					);
				t.children && dS(t.children, e);
			}
			function fS(t, e) {
				return e ? (t || e.path ? (t && !e.path ? t + '/' : !t && e.path ? e.path : `${t}/${e.path}`) : '') : t;
			}
			function mS(t) {
				const e = t.children && t.children.map(mS),
					n = e ? Object.assign(Object.assign({}, t), { children: e }) : Object.assign({}, t);
				return !n.component && (e || n.loadChildren) && n.outlet && n.outlet !== Ew && (n.component = hS), n;
			}
			const gS = new Bt('ROUTES');
			class yS {
				constructor(t, e, n, i) {
					(this.loader = t),
						(this.compiler = e),
						(this.onLoadStartListener = n),
						(this.onLoadEndListener = i);
				}
				load(t, e) {
					return (
						this.onLoadStartListener && this.onLoadStartListener(e),
						this.loadModuleFactory(e.loadChildren).pipe(
							k(n => {
								this.onLoadEndListener && this.onLoadEndListener(e);
								const i = n.create(t);
								return new Ox(Rw(i.injector.get(gS)).map(mS), i);
							})
						)
					);
				}
				loadModuleFactory(t) {
					return 'string' == typeof t
						? M(this.loader.load(t))
						: Nw(t()).pipe(z(t => (t instanceof ne ? fh(t) : M(this.compiler.compileModuleAsync(t)))));
				}
			}
			class _S {
				constructor() {
					(this.outlet = null),
						(this.route = null),
						(this.resolver = null),
						(this.children = new vS()),
						(this.attachRef = null);
				}
			}
			class vS {
				constructor() {
					this.contexts = new Map();
				}
				onChildOutletCreated(t, e) {
					const n = this.getOrCreateContext(t);
					(n.outlet = e), this.contexts.set(t, n);
				}
				onChildOutletDestroyed(t) {
					const e = this.getContext(t);
					e && (e.outlet = null);
				}
				onOutletDeactivated() {
					const t = this.contexts;
					return (this.contexts = new Map()), t;
				}
				onOutletReAttached(t) {
					this.contexts = t;
				}
				getOrCreateContext(t) {
					let e = this.getContext(t);
					return e || ((e = new _S()), this.contexts.set(t, e)), e;
				}
				getContext(t) {
					return this.contexts.get(t) || null;
				}
			}
			class bS {
				shouldProcessUrl(t) {
					return !0;
				}
				extract(t) {
					return t;
				}
				merge(t, e) {
					return t;
				}
			}
			function wS(t) {
				throw t;
			}
			function xS(t, e, n) {
				return e.parse('/');
			}
			function SS(t, e) {
				return fh(null);
			}
			let ES = (() => {
					class t {
						constructor(t, e, n, i, s, r, o, a) {
							(this.rootComponentType = t),
								(this.urlSerializer = e),
								(this.rootContexts = n),
								(this.location = i),
								(this.config = a),
								(this.lastSuccessfulNavigation = null),
								(this.currentNavigation = null),
								(this.lastLocationChangeInfo = null),
								(this.navigationId = 0),
								(this.isNgZoneEnabled = !1),
								(this.events = new S()),
								(this.errorHandler = wS),
								(this.malformedUriErrorHandler = xS),
								(this.navigated = !1),
								(this.lastSuccessfulId = -1),
								(this.hooks = { beforePreactivation: SS, afterPreactivation: SS }),
								(this.urlHandlingStrategy = new bS()),
								(this.routeReuseStrategy = new uS()),
								(this.onSameUrlNavigation = 'ignore'),
								(this.paramsInheritanceStrategy = 'emptyOnly'),
								(this.urlUpdateStrategy = 'deferred'),
								(this.relativeLinkResolution = 'legacy'),
								(this.ngModule = s.get(ee)),
								(this.console = s.get(cc));
							const l = s.get(xc);
							(this.isNgZoneEnabled = l instanceof xc),
								this.resetConfig(a),
								(this.currentUrlTree = new Mw(new Fw([], {}), {}, null)),
								(this.rawUrlTree = this.currentUrlTree),
								(this.browserUrlTree = this.currentUrlTree),
								(this.configLoader = new yS(
									r,
									o,
									t => this.triggerEvent(new yw(t)),
									t => this.triggerEvent(new _w(t))
								)),
								(this.routerState = lx(this.currentUrlTree, this.rootComponentType)),
								(this.transitions = new pg({
									id: 0,
									currentUrlTree: this.currentUrlTree,
									currentRawUrl: this.currentUrlTree,
									extractedUrl: this.urlHandlingStrategy.extract(this.currentUrlTree),
									urlAfterRedirects: this.urlHandlingStrategy.extract(this.currentUrlTree),
									rawUrl: this.currentUrlTree,
									extras: {},
									resolve: null,
									reject: null,
									promise: Promise.resolve(!0),
									source: 'imperative',
									restoredState: null,
									currentSnapshot: this.routerState.snapshot,
									targetSnapshot: null,
									currentRouterState: this.routerState,
									targetRouterState: null,
									guards: { canActivateChecks: [], canDeactivateChecks: [] },
									guardsResult: null,
								})),
								(this.navigations = this.setupNavigations(this.transitions)),
								this.processNavigations();
						}
						setupNavigations(t) {
							const e = this.events;
							return t.pipe(
								Th(t => 0 !== t.id),
								k(t =>
									Object.assign(Object.assign({}, t), {
										extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl),
									})
								),
								mg(t => {
									let n = !1,
										i = !1;
									return fh(t).pipe(
										gh(t => {
											this.currentNavigation = {
												id: t.id,
												initialUrl: t.currentRawUrl,
												extractedUrl: t.extractedUrl,
												trigger: t.source,
												extras: t.extras,
												previousNavigation: this.lastSuccessfulNavigation
													? Object.assign(Object.assign({}, this.lastSuccessfulNavigation), {
															previousNavigation: null,
													  })
													: null,
											};
										}),
										mg(t => {
											const n =
												!this.navigated ||
												t.extractedUrl.toString() !== this.browserUrlTree.toString();
											if (
												('reload' === this.onSameUrlNavigation || n) &&
												this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
											)
												return fh(t).pipe(
													mg(t => {
														const n = this.transitions.getValue();
														return (
															e.next(
																new lw(
																	t.id,
																	this.serializeUrl(t.extractedUrl),
																	t.source,
																	t.restoredState
																)
															),
															n !== this.transitions.getValue() ? Rh : [t]
														);
													}),
													mg(t => Promise.resolve(t)),
													((i = this.ngModule.injector),
													(s = this.configLoader),
													(r = this.urlSerializer),
													(o = this.config),
													function (t) {
														return t.pipe(
															mg(t =>
																(function (t, e, n, i, s) {
																	return new zx(t, e, n, i, s).apply();
																})(i, s, r, t.extractedUrl, o).pipe(
																	k(e =>
																		Object.assign(Object.assign({}, t), {
																			urlAfterRedirects: e,
																		})
																	)
																)
															)
														);
													}),
													gh(t => {
														this.currentNavigation = Object.assign(
															Object.assign({}, this.currentNavigation),
															{ finalUrl: t.urlAfterRedirects }
														);
													}),
													(function (t, e, n, i, s) {
														return function (r) {
															return r.pipe(
																z(r =>
																	(function (
																		t,
																		e,
																		n,
																		i,
																		s = 'emptyOnly',
																		r = 'legacy'
																	) {
																		return new eS(t, e, n, i, s, r).recognize();
																	})(
																		t,
																		e,
																		r.urlAfterRedirects,
																		n(r.urlAfterRedirects),
																		i,
																		s
																	).pipe(
																		k(t =>
																			Object.assign(Object.assign({}, r), {
																				targetSnapshot: t,
																			})
																		)
																	)
																)
															);
														};
													})(
														this.rootComponentType,
														this.config,
														t => this.serializeUrl(t),
														this.paramsInheritanceStrategy,
														this.relativeLinkResolution
													),
													gh(t => {
														'eager' === this.urlUpdateStrategy &&
															(t.extras.skipLocationChange ||
																this.setBrowserUrl(
																	t.urlAfterRedirects,
																	!!t.extras.replaceUrl,
																	t.id,
																	t.extras.state
																),
															(this.browserUrlTree = t.urlAfterRedirects));
													}),
													gh(t => {
														const n = new dw(
															t.id,
															this.serializeUrl(t.extractedUrl),
															this.serializeUrl(t.urlAfterRedirects),
															t.targetSnapshot
														);
														e.next(n);
													})
												);
											var i, s, r, o;
											if (
												n &&
												this.rawUrlTree &&
												this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
											) {
												const {
														id: n,
														extractedUrl: i,
														source: s,
														restoredState: r,
														extras: o,
													} = t,
													a = new lw(n, this.serializeUrl(i), s, r);
												e.next(a);
												const l = lx(i, this.rootComponentType).snapshot;
												return fh(
													Object.assign(Object.assign({}, t), {
														targetSnapshot: l,
														urlAfterRedirects: i,
														extras: Object.assign(Object.assign({}, o), {
															skipLocationChange: !1,
															replaceUrl: !1,
														}),
													})
												);
											}
											return (
												(this.rawUrlTree = t.rawUrl),
												(this.browserUrlTree = t.urlAfterRedirects),
												t.resolve(null),
												Rh
											);
										}),
										cS(t => {
											const {
												targetSnapshot: e,
												id: n,
												extractedUrl: i,
												rawUrl: s,
												extras: { skipLocationChange: r, replaceUrl: o },
											} = t;
											return this.hooks.beforePreactivation(e, {
												navigationId: n,
												appliedUrlTree: i,
												rawUrlTree: s,
												skipLocationChange: !!r,
												replaceUrl: !!o,
											});
										}),
										gh(t => {
											const e = new pw(
												t.id,
												this.serializeUrl(t.extractedUrl),
												this.serializeUrl(t.urlAfterRedirects),
												t.targetSnapshot
											);
											this.triggerEvent(e);
										}),
										k(t =>
											Object.assign(Object.assign({}, t), {
												guards: Qx(t.targetSnapshot, t.currentSnapshot, this.rootContexts),
											})
										),
										(function (t, e) {
											return function (n) {
												return n.pipe(
													z(n => {
														const {
															targetSnapshot: i,
															currentSnapshot: s,
															guards: { canActivateChecks: r, canDeactivateChecks: o },
														} = n;
														return 0 === o.length && 0 === r.length
															? fh(
																	Object.assign(Object.assign({}, n), {
																		guardsResult: !0,
																	})
															  )
															: (function (t, e, n, i) {
																	return M(t).pipe(
																		z(t =>
																			(function (t, e, n, i, s) {
																				const r =
																					e && e.routeConfig
																						? e.routeConfig.canDeactivate
																						: null;
																				return r && 0 !== r.length
																					? fh(
																							r.map(r => {
																								const o = Zx(r, e, s);
																								let a;
																								if (
																									(function (t) {
																										return (
																											t &&
																											Rx(
																												t.canDeactivate
																											)
																										);
																									})(o)
																								)
																									a = Nw(
																										o.canDeactivate(
																											t,
																											e,
																											n,
																											i
																										)
																									);
																								else {
																									if (!Rx(o))
																										throw new Error(
																											'Invalid CanDeactivate guard'
																										);
																									a = Nw(
																										o(t, e, n, i)
																									);
																								}
																								return a.pipe(ow());
																							})
																					  ).pipe(Nx())
																					: fh(!0);
																			})(t.component, t.route, n, e, i)
																		),
																		ow(t => !0 !== t, !0)
																	);
															  })(o, i, s, t).pipe(
																	z(n =>
																		n && 'boolean' == typeof n
																			? (function (t, e, n, i) {
																					return M(e).pipe(
																						xm(e =>
																							M([
																								Yx(e.route.parent, i),
																								Kx(e.route, i),
																								Jx(t, e.path, n),
																								Xx(t, e.route, n),
																							]).pipe(
																								ld(),
																								ow(t => !0 !== t, !0)
																							)
																						),
																						ow(t => !0 !== t, !0)
																					);
																			  })(i, r, t, e)
																			: fh(n)
																	),
																	k(t =>
																		Object.assign(Object.assign({}, n), {
																			guardsResult: t,
																		})
																	)
															  );
													})
												);
											};
										})(this.ngModule.injector, t => this.triggerEvent(t)),
										gh(t => {
											if (Px(t.guardsResult)) {
												const e = Tw(`Redirecting to "${this.serializeUrl(t.guardsResult)}"`);
												throw ((e.url = t.guardsResult), e);
											}
										}),
										gh(t => {
											const e = new fw(
												t.id,
												this.serializeUrl(t.extractedUrl),
												this.serializeUrl(t.urlAfterRedirects),
												t.targetSnapshot,
												!!t.guardsResult
											);
											this.triggerEvent(e);
										}),
										Th(t => {
											if (!t.guardsResult) {
												this.resetUrlToCurrentUrlTree();
												const n = new uw(t.id, this.serializeUrl(t.extractedUrl), '');
												return e.next(n), t.resolve(!1), !1;
											}
											return !0;
										}),
										cS(t => {
											if (t.guards.canActivateChecks.length)
												return fh(t).pipe(
													gh(t => {
														const e = new mw(
															t.id,
															this.serializeUrl(t.extractedUrl),
															this.serializeUrl(t.urlAfterRedirects),
															t.targetSnapshot
														);
														this.triggerEvent(e);
													}),
													mg(t => {
														let n = !1;
														return fh(t).pipe(
															((i = this.paramsInheritanceStrategy),
															(s = this.ngModule.injector),
															function (t) {
																return t.pipe(
																	z(t => {
																		const {
																			targetSnapshot: e,
																			guards: { canActivateChecks: n },
																		} = t;
																		if (!n.length) return fh(t);
																		let r = 0;
																		return M(n).pipe(
																			xm(t =>
																				(function (t, e, n, i) {
																					return (function (t, e, n, i) {
																						const s = Object.keys(t);
																						if (0 === s.length)
																							return fh({});
																						const r = {};
																						return M(s).pipe(
																							z(s =>
																								(function (t, e, n, i) {
																									const s = Zx(
																										t,
																										e,
																										i
																									);
																									return Nw(
																										s.resolve
																											? s.resolve(
																													e,
																													n
																											  )
																											: s(e, n)
																									);
																								})(t[s], e, n, i).pipe(
																									gh(t => {
																										r[s] = t;
																									})
																								)
																							),
																							Zb(1),
																							z(() =>
																								Object.keys(r)
																									.length === s.length
																									? fh(r)
																									: Rh
																							)
																						);
																					})(t._resolve, t, e, i).pipe(
																						k(
																							e => (
																								(t._resolvedData = e),
																								(t.data = Object.assign(
																									Object.assign(
																										{},
																										t.data
																									),
																									ux(t, n).resolve
																								)),
																								null
																							)
																						)
																					);
																				})(t.route, e, i, s)
																			),
																			gh(() => r++),
																			Zb(1),
																			z(e => (r === n.length ? fh(t) : Rh))
																		);
																	})
																);
															}),
															gh({
																next: () => (n = !0),
																complete: () => {
																	if (!n) {
																		const n = new uw(
																			t.id,
																			this.serializeUrl(t.extractedUrl),
																			"At least one route resolver didn't emit any value."
																		);
																		e.next(n), t.resolve(!1);
																	}
																},
															})
														);
														var i, s;
													}),
													gh(t => {
														const e = new gw(
															t.id,
															this.serializeUrl(t.extractedUrl),
															this.serializeUrl(t.urlAfterRedirects),
															t.targetSnapshot
														);
														this.triggerEvent(e);
													})
												);
										}),
										cS(t => {
											const {
												targetSnapshot: e,
												id: n,
												extractedUrl: i,
												rawUrl: s,
												extras: { skipLocationChange: r, replaceUrl: o },
											} = t;
											return this.hooks.afterPreactivation(e, {
												navigationId: n,
												appliedUrlTree: i,
												rawUrlTree: s,
												skipLocationChange: !!r,
												replaceUrl: !!o,
											});
										}),
										k(t => {
											const e = (function (t, e, n) {
												const i = (function t(e, n, i) {
													if (i && e.shouldReuseRoute(n.value, i.value.snapshot)) {
														const s = i.value;
														s._futureSnapshot = n.value;
														const r = (function (e, n, i) {
															return n.children.map(n => {
																for (const s of i.children)
																	if (e.shouldReuseRoute(s.value.snapshot, n.value))
																		return t(e, n, s);
																return t(e, n);
															});
														})(e, n, i);
														return new rx(s, r);
													}
													{
														const i = e.retrieve(n.value);
														if (i) {
															const t = i.route;
															return (
																(function t(e, n) {
																	if (e.value.routeConfig !== n.value.routeConfig)
																		throw new Error(
																			'Cannot reattach ActivatedRouteSnapshot created from a different route'
																		);
																	if (e.children.length !== n.children.length)
																		throw new Error(
																			'Cannot reattach ActivatedRouteSnapshot with a different number of children'
																		);
																	n.value._futureSnapshot = e.value;
																	for (let i = 0; i < e.children.length; ++i)
																		t(e.children[i], n.children[i]);
																})(n, t),
																t
															);
														}
														{
															const i = new cx(
																	new pg((s = n.value).url),
																	new pg(s.params),
																	new pg(s.queryParams),
																	new pg(s.fragment),
																	new pg(s.data),
																	s.outlet,
																	s.component,
																	s
																),
																r = n.children.map(n => t(e, n));
															return new rx(i, r);
														}
													}
													var s;
												})(t, e._root, n ? n._root : void 0);
												return new ax(i, e);
											})(this.routeReuseStrategy, t.targetSnapshot, t.currentRouterState);
											return Object.assign(Object.assign({}, t), { targetRouterState: e });
										}),
										gh(t => {
											(this.currentUrlTree = t.urlAfterRedirects),
												(this.rawUrlTree = this.urlHandlingStrategy.merge(
													this.currentUrlTree,
													t.rawUrl
												)),
												(this.routerState = t.targetRouterState),
												'deferred' === this.urlUpdateStrategy &&
													(t.extras.skipLocationChange ||
														this.setBrowserUrl(
															this.rawUrlTree,
															!!t.extras.replaceUrl,
															t.id,
															t.extras.state
														),
													(this.browserUrlTree = t.urlAfterRedirects));
										}),
										((s = this.rootContexts),
										(r = this.routeReuseStrategy),
										(o = t => this.triggerEvent(t)),
										k(
											t => (
												new Ax(r, t.targetRouterState, t.currentRouterState, o).activate(s), t
											)
										)),
										gh({
											next() {
												n = !0;
											},
											complete() {
												n = !0;
											},
										}),
										vm(() => {
											if (!n && !i) {
												this.resetUrlToCurrentUrlTree();
												const n = new uw(
													t.id,
													this.serializeUrl(t.extractedUrl),
													`Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`
												);
												e.next(n), t.resolve(!1);
											}
											this.currentNavigation = null;
										}),
										gm(n => {
											if (((i = !0), (s = n) && s.ngNavigationCancelingError)) {
												const i = Px(n.url);
												i ||
													((this.navigated = !0),
													this.resetStateAndUrl(
														t.currentRouterState,
														t.currentUrlTree,
														t.rawUrl
													));
												const s = new uw(t.id, this.serializeUrl(t.extractedUrl), n.message);
												e.next(s),
													i
														? setTimeout(() => {
																const e = this.urlHandlingStrategy.merge(
																	n.url,
																	this.rawUrlTree
																);
																return this.scheduleNavigation(
																	e,
																	'imperative',
																	null,
																	{
																		skipLocationChange: t.extras.skipLocationChange,
																		replaceUrl: 'eager' === this.urlUpdateStrategy,
																	},
																	{
																		resolve: t.resolve,
																		reject: t.reject,
																		promise: t.promise,
																	}
																);
														  }, 0)
														: t.resolve(!1);
											} else {
												this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl);
												const i = new hw(t.id, this.serializeUrl(t.extractedUrl), n);
												e.next(i);
												try {
													t.resolve(this.errorHandler(n));
												} catch (r) {
													t.reject(r);
												}
											}
											var s;
											return Rh;
										})
									);
									var s, r, o;
								})
							);
						}
						resetRootComponentType(t) {
							(this.rootComponentType = t), (this.routerState.root.component = this.rootComponentType);
						}
						getTransition() {
							const t = this.transitions.value;
							return (t.urlAfterRedirects = this.browserUrlTree), t;
						}
						setTransition(t) {
							this.transitions.next(Object.assign(Object.assign({}, this.getTransition()), t));
						}
						initialNavigation() {
							this.setUpLocationChangeListener(),
								0 === this.navigationId &&
									this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
						}
						setUpLocationChangeListener() {
							this.locationSubscription ||
								(this.locationSubscription = this.location.subscribe(t => {
									const e = this.extractLocationChangeInfoFromEvent(t);
									this.shouldScheduleNavigation(this.lastLocationChangeInfo, e) &&
										setTimeout(() => {
											const { source: t, state: n, urlTree: i } = e,
												s = { replaceUrl: !0 };
											if (n) {
												const t = Object.assign({}, n);
												delete t.navigationId, 0 !== Object.keys(t).length && (s.state = t);
											}
											this.scheduleNavigation(i, t, n, s);
										}, 0),
										(this.lastLocationChangeInfo = e);
								}));
						}
						extractLocationChangeInfoFromEvent(t) {
							var e;
							return {
								source: 'popstate' === t.type ? 'popstate' : 'hashchange',
								urlTree: this.parseUrl(t.url),
								state: (null === (e = t.state) || void 0 === e ? void 0 : e.navigationId)
									? t.state
									: null,
								transitionId: this.getTransition().id,
							};
						}
						shouldScheduleNavigation(t, e) {
							if (!t) return !0;
							const n = e.urlTree.toString() === t.urlTree.toString();
							return !(
								e.transitionId === t.transitionId &&
								n &&
								(('hashchange' === e.source && 'popstate' === t.source) ||
									('popstate' === e.source && 'hashchange' === t.source))
							);
						}
						get url() {
							return this.serializeUrl(this.currentUrlTree);
						}
						getCurrentNavigation() {
							return this.currentNavigation;
						}
						triggerEvent(t) {
							this.events.next(t);
						}
						resetConfig(t) {
							dS(t), (this.config = t.map(mS)), (this.navigated = !1), (this.lastSuccessfulId = -1);
						}
						ngOnDestroy() {
							this.dispose();
						}
						dispose() {
							this.locationSubscription &&
								(this.locationSubscription.unsubscribe(), (this.locationSubscription = void 0));
						}
						createUrlTree(t, e = {}) {
							const {
								relativeTo: n,
								queryParams: i,
								fragment: s,
								preserveQueryParams: r,
								queryParamsHandling: o,
								preserveFragment: a,
							} = e;
							Ri() &&
								r &&
								console &&
								console.warn &&
								console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
							const l = n || this.routerState.root,
								c = a ? this.currentUrlTree.fragment : s;
							let u = null;
							if (o)
								switch (o) {
									case 'merge':
										u = Object.assign(Object.assign({}, this.currentUrlTree.queryParams), i);
										break;
									case 'preserve':
										u = this.currentUrlTree.queryParams;
										break;
									default:
										u = i || null;
								}
							else u = r ? this.currentUrlTree.queryParams : i || null;
							return (
								null !== u && (u = this.removeEmptyProps(u)),
								(function (t, e, n, i, s) {
									if (0 === n.length) return _x(e.root, e.root, e, i, s);
									const r = (function (t) {
										if ('string' == typeof t[0] && 1 === t.length && '/' === t[0])
											return new vx(!0, 0, t);
										let e = 0,
											n = !1;
										const i = t.reduce((t, i, s) => {
											if ('object' == typeof i && null != i) {
												if (i.outlets) {
													const e = {};
													return (
														Lw(i.outlets, (t, n) => {
															e[n] = 'string' == typeof t ? t.split('/') : t;
														}),
														[...t, { outlets: e }]
													);
												}
												if (i.segmentPath) return [...t, i.segmentPath];
											}
											return 'string' != typeof i
												? [...t, i]
												: 0 === s
												? (i.split('/').forEach((i, s) => {
														(0 == s && '.' === i) ||
															(0 == s && '' === i
																? (n = !0)
																: '..' === i
																? e++
																: '' != i && t.push(i));
												  }),
												  t)
												: [...t, i];
										}, []);
										return new vx(n, e, i);
									})(n);
									if (r.toRoot()) return _x(e.root, new Fw([], {}), e, i, s);
									const o = (function (t, e, n) {
											if (t.isAbsolute) return new bx(e.root, !0, 0);
											if (-1 === n.snapshot._lastPathIndex) {
												const t = n.snapshot._urlSegment;
												return new bx(t, t === e.root, 0);
											}
											const i = yx(t.commands[0]) ? 0 : 1;
											return (function (t, e, n) {
												let i = t,
													s = e,
													r = n;
												for (; r > s; ) {
													if (((r -= s), (i = i.parent), !i))
														throw new Error("Invalid number of '../'");
													s = i.segments.length;
												}
												return new bx(i, !1, s - r);
											})(
												n.snapshot._urlSegment,
												n.snapshot._lastPathIndex + i,
												t.numberOfDoubleDots
											);
										})(r, e, t),
										a = o.processChildren
											? Sx(o.segmentGroup, o.index, r.commands)
											: xx(o.segmentGroup, o.index, r.commands);
									return _x(o.segmentGroup, a, e, i, s);
								})(l, this.currentUrlTree, t, u, c)
							);
						}
						navigateByUrl(t, e = { skipLocationChange: !1 }) {
							Ri() &&
								this.isNgZoneEnabled &&
								!xc.isInAngularZone() &&
								this.console.warn(
									"Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?"
								);
							const n = Px(t) ? t : this.parseUrl(t),
								i = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
							return this.scheduleNavigation(i, 'imperative', null, e);
						}
						navigate(t, e = { skipLocationChange: !1 }) {
							return (
								(function (t) {
									for (let e = 0; e < t.length; e++) {
										const n = t[e];
										if (null == n)
											throw new Error(`The requested path contains ${n} segment at index ${e}`);
									}
								})(t),
								this.navigateByUrl(this.createUrlTree(t, e), e)
							);
						}
						serializeUrl(t) {
							return this.urlSerializer.serialize(t);
						}
						parseUrl(t) {
							let e;
							try {
								e = this.urlSerializer.parse(t);
							} catch (iE) {
								e = this.malformedUriErrorHandler(iE, this.urlSerializer, t);
							}
							return e;
						}
						isActive(t, e) {
							if (Px(t)) return Dw(this.currentUrlTree, t, e);
							const n = this.parseUrl(t);
							return Dw(this.currentUrlTree, n, e);
						}
						removeEmptyProps(t) {
							return Object.keys(t).reduce((e, n) => {
								const i = t[n];
								return null != i && (e[n] = i), e;
							}, {});
						}
						processNavigations() {
							this.navigations.subscribe(
								t => {
									(this.navigated = !0),
										(this.lastSuccessfulId = t.id),
										this.events.next(
											new cw(
												t.id,
												this.serializeUrl(t.extractedUrl),
												this.serializeUrl(this.currentUrlTree)
											)
										),
										(this.lastSuccessfulNavigation = this.currentNavigation),
										(this.currentNavigation = null),
										t.resolve(!0);
								},
								t => {
									this.console.warn('Unhandled Navigation Error: ');
								}
							);
						}
						scheduleNavigation(t, e, n, i, s) {
							const r = this.getTransition(),
								o = 'imperative' !== e && 'imperative' === (null == r ? void 0 : r.source),
								a =
									(this.lastSuccessfulId === r.id || this.currentNavigation
										? r.rawUrl
										: r.urlAfterRedirects
									).toString() === t.toString();
							if (o && a) return Promise.resolve(!0);
							let l, c, u;
							s
								? ((l = s.resolve), (c = s.reject), (u = s.promise))
								: (u = new Promise((t, e) => {
										(l = t), (c = e);
								  }));
							const h = ++this.navigationId;
							return (
								this.setTransition({
									id: h,
									source: e,
									restoredState: n,
									currentUrlTree: this.currentUrlTree,
									currentRawUrl: this.rawUrlTree,
									rawUrl: t,
									extras: i,
									resolve: l,
									reject: c,
									promise: u,
									currentSnapshot: this.routerState.snapshot,
									currentRouterState: this.routerState,
								}),
								u.catch(t => Promise.reject(t))
							);
						}
						setBrowserUrl(t, e, n, i) {
							const s = this.urlSerializer.serialize(t);
							(i = i || {}),
								this.location.isCurrentPathEqualTo(s) || e
									? this.location.replaceState(
											s,
											'',
											Object.assign(Object.assign({}, i), { navigationId: n })
									  )
									: this.location.go(s, '', Object.assign(Object.assign({}, i), { navigationId: n }));
						}
						resetStateAndUrl(t, e, n) {
							(this.routerState = t),
								(this.currentUrlTree = e),
								(this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n)),
								this.resetUrlToCurrentUrlTree();
						}
						resetUrlToCurrentUrlTree() {
							this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), '', {
								navigationId: this.lastSuccessfulId,
							});
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(Gr), Kt(Vw), Kt(vS), Kt(fu), Kt(uo), Kt(Hc), Kt(vc), Kt(void 0));
						}),
						(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				CS = (() => {
					class t {
						constructor(t, e, n, i, s) {
							(this.parentContexts = t),
								(this.location = e),
								(this.resolver = n),
								(this.changeDetector = s),
								(this.activated = null),
								(this._activatedRoute = null),
								(this.activateEvents = new Fl()),
								(this.deactivateEvents = new Fl()),
								(this.name = i || Ew),
								t.onChildOutletCreated(this.name, this);
						}
						ngOnDestroy() {
							this.parentContexts.onChildOutletDestroyed(this.name);
						}
						ngOnInit() {
							if (!this.activated) {
								const t = this.parentContexts.getContext(this.name);
								t &&
									t.route &&
									(t.attachRef
										? this.attach(t.attachRef, t.route)
										: this.activateWith(t.route, t.resolver || null));
							}
						}
						get isActivated() {
							return !!this.activated;
						}
						get component() {
							if (!this.activated) throw new Error('Outlet is not activated');
							return this.activated.instance;
						}
						get activatedRoute() {
							if (!this.activated) throw new Error('Outlet is not activated');
							return this._activatedRoute;
						}
						get activatedRouteData() {
							return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
						}
						detach() {
							if (!this.activated) throw new Error('Outlet is not activated');
							this.location.detach();
							const t = this.activated;
							return (this.activated = null), (this._activatedRoute = null), t;
						}
						attach(t, e) {
							(this.activated = t), (this._activatedRoute = e), this.location.insert(t.hostView);
						}
						deactivate() {
							if (this.activated) {
								const t = this.component;
								this.activated.destroy(),
									(this.activated = null),
									(this._activatedRoute = null),
									this.deactivateEvents.emit(t);
							}
						}
						activateWith(t, e) {
							if (this.isActivated) throw new Error('Cannot activate an already activated outlet');
							this._activatedRoute = t;
							const n = (e = e || this.resolver).resolveComponentFactory(
									t._futureSnapshot.routeConfig.component
								),
								i = this.parentContexts.getOrCreateContext(this.name).children,
								s = new kS(t, i, this.location.injector);
							(this.activated = this.location.createComponent(n, this.location.length, s)),
								this.changeDetector.markForCheck(),
								this.activateEvents.emit(this.activated.instance);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(To(vS), To(kl), To(el), Ao('name'), To(Qr));
						}),
						(t.ɵdir = xe({
							type: t,
							selectors: [['router-outlet']],
							outputs: { activateEvents: 'activate', deactivateEvents: 'deactivate' },
							exportAs: ['outlet'],
						})),
						t
					);
				})();
			class kS {
				constructor(t, e, n) {
					(this.route = t), (this.childContexts = e), (this.parent = n);
				}
				get(t, e) {
					return t === cx ? this.route : t === vS ? this.childContexts : this.parent.get(t, e);
				}
			}
			class TS {}
			class AS {
				preload(t, e) {
					return fh(null);
				}
			}
			let IS = (() => {
					class t {
						constructor(t, e, n, i, s) {
							(this.router = t),
								(this.injector = i),
								(this.preloadingStrategy = s),
								(this.loader = new yS(
									e,
									n,
									e => t.triggerEvent(new yw(e)),
									e => t.triggerEvent(new _w(e))
								));
						}
						setUpPreloading() {
							this.subscription = this.router.events
								.pipe(
									Th(t => t instanceof cw),
									xm(() => this.preload())
								)
								.subscribe(() => {});
						}
						preload() {
							const t = this.injector.get(ee);
							return this.processRoutes(t, this.router.config);
						}
						ngOnDestroy() {
							this.subscription && this.subscription.unsubscribe();
						}
						processRoutes(t, e) {
							const n = [];
							for (const i of e)
								if (i.loadChildren && !i.canLoad && i._loadedConfig) {
									const t = i._loadedConfig;
									n.push(this.processRoutes(t.module, t.routes));
								} else
									i.loadChildren && !i.canLoad
										? n.push(this.preloadConfig(t, i))
										: i.children && n.push(this.processRoutes(t, i.children));
							return M(n).pipe(
								H(),
								k(t => {})
							);
						}
						preloadConfig(t, e) {
							return this.preloadingStrategy.preload(e, () =>
								this.loader
									.load(t.injector, e)
									.pipe(z(t => ((e._loadedConfig = t), this.processRoutes(t.module, t.routes))))
							);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(ES), Kt(Hc), Kt(vc), Kt(uo), Kt(TS));
						}),
						(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				OS = (() => {
					class t {
						constructor(t, e, n = {}) {
							(this.router = t),
								(this.viewportScroller = e),
								(this.options = n),
								(this.lastId = 0),
								(this.lastSource = 'imperative'),
								(this.restoredId = 0),
								(this.store = {}),
								(n.scrollPositionRestoration = n.scrollPositionRestoration || 'disabled'),
								(n.anchorScrolling = n.anchorScrolling || 'disabled');
						}
						init() {
							'disabled' !== this.options.scrollPositionRestoration &&
								this.viewportScroller.setHistoryScrollRestoration('manual'),
								(this.routerEventsSubscription = this.createScrollEvents()),
								(this.scrollEventsSubscription = this.consumeScrollEvents());
						}
						createScrollEvents() {
							return this.router.events.subscribe(t => {
								t instanceof lw
									? ((this.store[this.lastId] = this.viewportScroller.getScrollPosition()),
									  (this.lastSource = t.navigationTrigger),
									  (this.restoredId = t.restoredState ? t.restoredState.navigationId : 0))
									: t instanceof cw &&
									  ((this.lastId = t.id),
									  this.scheduleScrollEvent(t, this.router.parseUrl(t.urlAfterRedirects).fragment));
							});
						}
						consumeScrollEvents() {
							return this.router.events.subscribe(t => {
								t instanceof Sw &&
									(t.position
										? 'top' === this.options.scrollPositionRestoration
											? this.viewportScroller.scrollToPosition([0, 0])
											: 'enabled' === this.options.scrollPositionRestoration &&
											  this.viewportScroller.scrollToPosition(t.position)
										: t.anchor && 'enabled' === this.options.anchorScrolling
										? this.viewportScroller.scrollToAnchor(t.anchor)
										: 'disabled' !== this.options.scrollPositionRestoration &&
										  this.viewportScroller.scrollToPosition([0, 0]));
							});
						}
						scheduleScrollEvent(t, e) {
							this.router.triggerEvent(
								new Sw(t, 'popstate' === this.lastSource ? this.store[this.restoredId] : null, e)
							);
						}
						ngOnDestroy() {
							this.routerEventsSubscription && this.routerEventsSubscription.unsubscribe(),
								this.scrollEventsSubscription && this.scrollEventsSubscription.unsubscribe();
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Kt(ES), Kt(ku), Kt(void 0));
						}),
						(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
						t
					);
				})();
			const RS = new Bt('ROUTER_CONFIGURATION'),
				PS = new Bt('ROUTER_FORROOT_GUARD'),
				LS = [
					fu,
					{ provide: Vw, useClass: Uw },
					{
						provide: ES,
						useFactory: function (t, e, n, i, s, r, o, a = {}, l, c) {
							const u = new ES(null, t, e, n, i, s, r, Rw(o));
							if (
								(l && (u.urlHandlingStrategy = l),
								c && (u.routeReuseStrategy = c),
								a.errorHandler && (u.errorHandler = a.errorHandler),
								a.malformedUriErrorHandler && (u.malformedUriErrorHandler = a.malformedUriErrorHandler),
								a.enableTracing)
							) {
								const t = Xc();
								u.events.subscribe(e => {
									t.logGroup('Router Event: ' + e.constructor.name),
										t.log(e.toString()),
										t.log(e),
										t.logGroupEnd();
								});
							}
							return (
								a.onSameUrlNavigation && (u.onSameUrlNavigation = a.onSameUrlNavigation),
								a.paramsInheritanceStrategy &&
									(u.paramsInheritanceStrategy = a.paramsInheritanceStrategy),
								a.urlUpdateStrategy && (u.urlUpdateStrategy = a.urlUpdateStrategy),
								a.relativeLinkResolution && (u.relativeLinkResolution = a.relativeLinkResolution),
								u
							);
						},
						deps: [Vw, vS, fu, uo, Hc, vc, gS, RS, [class {}, new rt()], [class {}, new rt()]],
					},
					vS,
					{
						provide: cx,
						useFactory: function (t) {
							return t.routerState.root;
						},
						deps: [ES],
					},
					{ provide: Hc, useClass: Wc },
					IS,
					AS,
					class {
						preload(t, e) {
							return e().pipe(gm(() => fh(null)));
						}
					},
					{ provide: RS, useValue: { enableTracing: !1 } },
				];
			function NS() {
				return new Mc('Router', ES);
			}
			let DS = (() => {
				class t {
					constructor(t, e) {}
					static forRoot(e, n) {
						return {
							ngModule: t,
							providers: [
								LS,
								BS(e),
								{ provide: PS, useFactory: jS, deps: [[ES, new rt(), new at()]] },
								{ provide: RS, useValue: n || {} },
								{ provide: cu, useFactory: FS, deps: [tu, [new st(hu), new rt()], RS] },
								{ provide: OS, useFactory: MS, deps: [ES, ku, RS] },
								{ provide: TS, useExisting: n && n.preloadingStrategy ? n.preloadingStrategy : AS },
								{ provide: Mc, multi: !0, useFactory: NS },
								[
									zS,
									{ provide: ec, multi: !0, useFactory: VS, deps: [zS] },
									{ provide: HS, useFactory: US, deps: [zS] },
									{ provide: lc, multi: !0, useExisting: HS },
								],
							],
						};
					}
					static forChild(e) {
						return { ngModule: t, providers: [BS(e)] };
					}
				}
				return (
					(t.ɵmod = be({ type: t })),
					(t.ɵinj = dt({
						factory: function (e) {
							return new (e || t)(Kt(PS, 8), Kt(ES, 8));
						},
					})),
					t
				);
			})();
			function MS(t, e, n) {
				return n.scrollOffset && e.setOffset(n.scrollOffset), new OS(t, e, n);
			}
			function FS(t, e, n = {}) {
				return n.useHash ? new pu(t, e) : new du(t, e);
			}
			function jS(t) {
				if (t)
					throw new Error(
						'RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.'
					);
				return 'guarded';
			}
			function BS(t) {
				return [
					{ provide: ho, multi: !0, useValue: t },
					{ provide: gS, multi: !0, useValue: t },
				];
			}
			let zS = (() => {
				class t {
					constructor(t) {
						(this.injector = t), (this.initNavigation = !1), (this.resultOfPreactivationDone = new S());
					}
					appInitializer() {
						return this.injector.get(nu, Promise.resolve(null)).then(() => {
							let t = null;
							const e = new Promise(e => (t = e)),
								n = this.injector.get(ES),
								i = this.injector.get(RS);
							if (this.isLegacyDisabled(i) || this.isLegacyEnabled(i)) t(!0);
							else if ('disabled' === i.initialNavigation) n.setUpLocationChangeListener(), t(!0);
							else {
								if ('enabled' !== i.initialNavigation)
									throw new Error(`Invalid initialNavigation options: '${i.initialNavigation}'`);
								(n.hooks.afterPreactivation = () =>
									this.initNavigation
										? fh(null)
										: ((this.initNavigation = !0), t(!0), this.resultOfPreactivationDone)),
									n.initialNavigation();
							}
							return e;
						});
					}
					bootstrapListener(t) {
						const e = this.injector.get(RS),
							n = this.injector.get(IS),
							i = this.injector.get(OS),
							s = this.injector.get(ES),
							r = this.injector.get(Vc);
						t === r.components[0] &&
							(this.isLegacyEnabled(e)
								? s.initialNavigation()
								: this.isLegacyDisabled(e) && s.setUpLocationChangeListener(),
							n.setUpPreloading(),
							i.init(),
							s.resetRootComponentType(r.componentTypes[0]),
							this.resultOfPreactivationDone.next(null),
							this.resultOfPreactivationDone.complete());
					}
					isLegacyEnabled(t) {
						return (
							'legacy_enabled' === t.initialNavigation ||
							!0 === t.initialNavigation ||
							void 0 === t.initialNavigation
						);
					}
					isLegacyDisabled(t) {
						return 'legacy_disabled' === t.initialNavigation || !1 === t.initialNavigation;
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Kt(uo));
					}),
					(t.ɵprov = ht({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			function VS(t) {
				return t.appInitializer.bind(t);
			}
			function US(t) {
				return t.bootstrapListener.bind(t);
			}
			const HS = new Bt('Router Initializer'),
				$S = ['sidenav'];
			let qS = (() => {
					class t {
						constructor(t, e) {
							(this.cookieService = t),
								(this.scrollToService = e),
								(this.faGithub = fv),
								(this.faLinkedinIn = mv);
						}
						ngOnInit() {
							this.setTheme();
						}
						changeTheme() {
							const t = document.getElementById('body');
							t.classList.contains('dark-theme')
								? (t.classList.remove('dark-theme'), this.cookieService.set('theme', 'light-theme'))
								: (t.classList.add('dark-theme'), this.cookieService.set('theme', 'dark-theme'));
						}
						setTheme() {
							const t = this.cookieService.get('theme');
							t && 'dark-theme' === t && this.changeTheme();
						}
						scrollTo(t) {
							this.scrollToService.scrollTo({ target: '#' + t, duration: 500 });
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(To(gv), To(wv));
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [['app-root']],
							viewQuery: function (t, e) {
								var n;
								1 & t && Gl($S, !0), 2 & t && Zl((n = Yl())) && (e.sidenav = n.first);
							},
							decls: 63,
							vars: 2,
							consts: function () {
								return [
									['autosize', '', 'fxFlexFill', ''],
									['fxLayout', 'column', 1, 'sidenav'],
									['sidenav', ''],
									['fxLayout', 'column'],
									['mat-button', '', 1, 'nav-item', 3, 'click'],
									[1, 'mr-3', 'mb-1'],
									'About',
									['mat-button', '', 1, 'nav-item'],
									'Experiences',
									'Education',
									'Skills',
									'Projects',
									'Interests',
									'Contact',
									['fxLayout', 'row', 'fxLayoutAlign', 'center', 1, 'my-2'],
									['href', 'https://github.com/kilian-paquier', 'target', '_blank', 1, 'mx-1'],
									[2, 'font-size', '1.5rem', 3, 'icon'],
									[
										'href',
										'https://www.linkedin.com/in/kilian-paquier/',
										'target',
										'_blank',
										1,
										'mx-1',
									],
									[1, 'mx-1', 'pointer', 'mt-1-5', 3, 'click'],
									[2, 'font-size', '1.5rem'],
									[1, 'mx-1', 'pointer', 'mt-1-5', 6, 'href'],
									['href', '/'],
									['id', 'lang', 1, 'flag-icon', 2, 'font-size', '1.5rem'],
									['fxFlexFill', ''],
									['name', 'about'],
									['name', 'experiences'],
									['name', 'education'],
									['name', 'skills'],
									['name', 'projects'],
									['name', 'interests'],
									['name', 'contact'],
									['name', 'footer'],
									[1, 'nav-button'],
									[
										'mat-fab',
										'',
										'color',
										'primary',
										'onclick',
										'this.blur()',
										1,
										'pointer',
										'button',
										3,
										'click',
									],
								];
							},
							template: function (t, e) {
								if (1 & t) {
									const t = No();
									Ro(0, 'mat-sidenav-container', 0),
										Ro(1, 'mat-sidenav', 1, 2),
										Ro(3, 'div', 3),
										Ro(4, 'button', 4),
										Mo('click', function () {
											return e.scrollTo('about');
										}),
										Ro(5, 'mat-icon', 5),
										ia(6, 'person'),
										Po(),
										Ro(7, 'span'),
										Ha(8, 6),
										Po(),
										Po(),
										Ro(9, 'button', 7),
										Ro(10, 'mat-icon', 5),
										ia(11, 'business'),
										Po(),
										Ro(12, 'span'),
										Ha(13, 8),
										Po(),
										Po(),
										Ro(14, 'button', 4),
										Mo('click', function () {
											return e.scrollTo('education');
										}),
										Ro(15, 'mat-icon', 5),
										ia(16, 'school'),
										Po(),
										Ro(17, 'span'),
										Ha(18, 9),
										Po(),
										Po(),
										Ro(19, 'button', 4),
										Mo('click', function () {
											return e.scrollTo('skills');
										}),
										Ro(20, 'mat-icon', 5),
										ia(21, 'code'),
										Po(),
										Ro(22, 'span'),
										Ha(23, 10),
										Po(),
										Po(),
										Ro(24, 'button', 7),
										Ro(25, 'mat-icon', 5),
										ia(26, 'collections_bookmark'),
										Po(),
										Ro(27, 'span'),
										Ha(28, 11),
										Po(),
										Po(),
										Ro(29, 'button', 4),
										Mo('click', function () {
											return e.scrollTo('interests');
										}),
										Ro(30, 'mat-icon', 5),
										ia(31, 'favorite'),
										Po(),
										Ro(32, 'span'),
										Ha(33, 12),
										Po(),
										Po(),
										Ro(34, 'button', 7),
										Ro(35, 'mat-icon', 5),
										ia(36, 'contact_mail'),
										Po(),
										Ro(37, 'span'),
										Ha(38, 13),
										Po(),
										Po(),
										Po(),
										Ro(39, 'div', 14),
										Ro(40, 'a', 15),
										Lo(41, 'fa-icon', 16),
										Po(),
										Ro(42, 'a', 17),
										Lo(43, 'fa-icon', 16),
										Po(),
										Ro(44, 'a', 18),
										Mo('click', function () {
											return e.changeTheme();
										}),
										Ro(45, 'mat-icon', 19),
										ia(46, 'brightness_6'),
										Po(),
										Po(),
										Ro(47, 'a', 20),
										$a(48, 21),
										Lo(49, 'i', 22),
										Po(),
										Po(),
										Po(),
										Ro(50, 'mat-sidenav-content', 23),
										Lo(51, 'router-outlet', 24),
										Lo(52, 'router-outlet', 25),
										Lo(53, 'router-outlet', 26),
										Lo(54, 'router-outlet', 27),
										Lo(55, 'router-outlet', 28),
										Lo(56, 'router-outlet', 29),
										Lo(57, 'router-outlet', 30),
										Lo(58, 'router-outlet', 31),
										Ro(59, 'div', 32),
										Ro(60, 'button', 33),
										Mo('click', function () {
											return ln(t), (2, Ge(sn.lFrame.contextLView, 2)).toggle();
										}),
										Ro(61, 'mat-icon'),
										ia(62, 'menu'),
										Po(),
										Po(),
										Po(),
										Po(),
										Po();
								}
								2 & t && (Ss(41), Io('icon', e.faGithub), Ss(2), Io('icon', e.faLinkedinIn));
							},
							directives: [x_, yy, b_, py, rg, Km, xy, $b, v_, CS],
							encapsulation: 2,
						})),
						t
					);
				})(),
				WS = (() => {
					class t {
						constructor() {}
						ngOnInit() {
							(this.age = this.calculAge()), this.changeFlagClass();
						}
						changeFlagClass() {
							const t = document.getElementById('lang');
							console.log(location.href),
								location.href.includes('/en')
									? t.classList.add('flag-icon-fr')
									: t.classList.add('flag-icon-gb');
						}
						calculAge() {
							let t = new Date(),
								e = new Date('1997-11-25:'),
								n = t.getFullYear() - e.getFullYear(),
								i = t.getMonth() - e.getMonth();
							return (i < 0 || (0 === i && t.getDate() < e.getDate())) && (n -= 1), n + ' ';
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [['app-about']],
							decls: 28,
							vars: 1,
							consts: function () {
								return [
									[1, 'masthead'],
									[1, 'container'],
									[1, 'intro-text'],
									[
										'src',
										'../../assets/images/profil.jpg',
										1,
										'rounded-circle',
										'img-fluid',
										'mb-4',
										'img-profil',
									],
									[1, 'intro-heading', 'text-uppercase'],
									'Consultant Innovation Intern',
									[
										'mat-raised-button',
										'',
										'color',
										'primary',
										'onclick',
										'this.blur()',
										'target',
										'_blank',
										1,
										'mt-2',
										'about-button',
										'link',
										'text-uppercase',
										6,
										'href',
									],
									['href', 'https://cvdesignr.com/p/5ddff0dda9765'],
									'My resume',
									['id', 'about'],
									[1, 'row', 'mb-4', 'text-center'],
									[1, 'col-12'],
									[1, 'section-heading', 'text-uppercase'],
									'About',
									[1, 'row', 'text-center', 'section-body'],
									[1, 'h5'],
									"\n\t\t\t\t\tWelcome on my portfolio and have a great reading ! I'm a student following a dual\n                degree computer science engineer and master degree in computer science (with Polytech Tours and the\n                University of Qu\xE9bec at Chicoutimi).\n\t\t\t\t",
									[1, 'list-group', 'list-group-flush', 'bg-transparent'],
									[1, 'list-group-item', 'bg-transparent'],
									'\n\t\t\t\t\tPassionate by computer science since the 8th grade in the USA or the year 9 in the UK\n                (where i attended a course in HTML/CSS on the website \\"Site du Z\xE9ro\\"), my main quality is my attention\n                to detail because it is important for me to produce complete applications which facilitate the user\n                experience (in taking into account the perception of the final users at every application presentation).\n\t\t\t\t',
									'years',
								];
							},
							template: function (t, e) {
								1 & t &&
									(Ro(0, 'header', 0),
									Ro(1, 'div', 1),
									Ro(2, 'div', 2),
									Lo(3, 'img', 3),
									Ro(4, 'div', 4),
									Ha(5, 5),
									Po(),
									Ro(6, 'a', 6),
									$a(7, 7),
									Ha(8, 8),
									Po(),
									Po(),
									Po(),
									Po(),
									Ro(9, 'section', 9),
									Ro(10, 'div', 1),
									Ro(11, 'div', 10),
									Ro(12, 'div', 11),
									Ro(13, 'h2', 12),
									Ha(14, 13),
									Po(),
									Po(),
									Po(),
									Ro(15, 'div', 14),
									Ro(16, 'div', 11),
									Ro(17, 'p', 15),
									Ha(18, 16),
									Po(),
									Po(),
									Ro(19, 'div', 11),
									Ro(20, 'ul', 17),
									Ro(21, 'li', 18),
									Ha(22, 19),
									Po(),
									Ro(23, 'li', 18),
									Ro(24, 'span'),
									ia(25),
									Po(),
									Ro(26, 'span'),
									Ha(27, 20),
									Po(),
									Po(),
									Po(),
									Po(),
									Po(),
									Po(),
									Po()),
									2 & t && (Ss(25), sa(e.age));
							},
							directives: [og],
							encapsulation: 2,
						})),
						t
					);
				})(),
				QS = (() => {
					class t {
						constructor() {}
						ngOnInit() {}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [['app-contact']],
							decls: 2,
							vars: 0,
							template: function (t, e) {
								1 & t && (Ro(0, 'p'), ia(1, 'contact works!'), Po());
							},
							encapsulation: 2,
						})),
						t
					);
				})(),
				ZS = (() => {
					class t {
						constructor() {}
						ngOnInit() {}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [['app-education']],
							decls: 57,
							vars: 0,
							consts: function () {
								return [
									['id', 'education'],
									[1, 'container'],
									[1, 'row', 'mb-5'],
									[1, 'col-lg-12', 'text-center'],
									[1, 'section-heading', 'text-uppercase'],
									'Education',
									[1, 'row'],
									[1, 'col-lg-12'],
									[1, 'timeline'],
									[1, 'timeline-image'],
									[
										'src',
										'../../assets/images/uqac_haute_resolution.jpg',
										1,
										'rounded-circle',
										'h-100',
										'w-100',
									],
									[1, 'timeline-panel'],
									[1, 'timeline-heading'],
									'August 2019 - Today',
									[1, 'subheading'],
									'UQAC',
									[1, 'timeline-body'],
									"\n\t\t\t\t\tI'm currently fulfilling a dual degree at the University of Qu\xE9bec at Chicoutimi\n                (UQAC) to obtain a master degree in computer science and a computer science engineering degree (with\n                Polytech Tours). I improved my knowledge in projet management (functional specification, Scrum/Agile and\n                predictive methodologies like waterfall and V), in object oriented development, software engineering and\n                software quality. But also my skills in programming.\n\t\t\t\t",
									[1, 'timeline-inverted'],
									[
										'src',
										'../../assets/images/polytechtours.jpg',
										'alt',
										'',
										1,
										'rounded-circle',
										'img-fluid',
									],
									'September 2019 - Today',
									'Polytech Tours',
									"\n\t\t\t\t\tI'm currently achieving a computer science engineering degree at Polytech Tours. I\n                learned programming languages but i also reinforced my knowledge with courses about software\n                engineering, software quality, distributed systems, life cycle of a project, algorithm and project\n                management.\n\t\t\t\t",
									[
										'src',
										'../../assets/images/univtours.jpg',
										'alt',
										'',
										1,
										'rounded-circle',
										'img-fluid',
									],
									'September 2015 - June 2017',
									'PeiP Tours',
									"\n\t\t\t\t\tI completed the Parcours des \xE9coles d'ing\xE9nieurs Polytech (PeiP) in mathematics and\n                computer science at Polytech Tours. I discovered programming languages and realised two main projects :\n                an engine movement with the voice (in python with an existing voice recognition library) and a tram\n                creation study for a second line in Tours (France).\n\t\t\t\t",
									[
										'src',
										'../../assets/images/camilleguerin.png',
										1,
										'rounded-circle',
										'img-fluid',
										2,
										'height',
										'100%',
										'width',
										'100%',
									],
									'September 2012 - June 2015',
									'High School Camille Gu\xE9rin',
									'\n\t\t\t\t\tHigh school diploma in chemistry, physics and mathematics with speciality in\n                mathematics.\n\t\t\t\t',
								];
							},
							template: function (t, e) {
								1 & t &&
									(Ro(0, 'section', 0),
									Ro(1, 'div', 1),
									Ro(2, 'div', 2),
									Ro(3, 'div', 3),
									Ro(4, 'h2', 4),
									Ha(5, 5),
									Po(),
									Po(),
									Po(),
									Ro(6, 'div', 6),
									Ro(7, 'div', 7),
									Ro(8, 'ul', 8),
									Ro(9, 'li'),
									Ro(10, 'div', 9),
									Lo(11, 'img', 10),
									Po(),
									Ro(12, 'div', 11),
									Ro(13, 'div', 12),
									Ro(14, 'h5'),
									Ha(15, 13),
									Po(),
									Ro(16, 'h4', 14),
									Ha(17, 15),
									Po(),
									Po(),
									Ro(18, 'div', 16),
									Ro(19, 'p'),
									Ha(20, 17),
									Po(),
									Po(),
									Po(),
									Po(),
									Ro(21, 'li', 18),
									Ro(22, 'div', 9),
									Lo(23, 'img', 19),
									Po(),
									Ro(24, 'div', 11),
									Ro(25, 'div', 12),
									Ro(26, 'h5'),
									Ha(27, 20),
									Po(),
									Ro(28, 'h4', 14),
									Ha(29, 21),
									Po(),
									Po(),
									Ro(30, 'div', 16),
									Ro(31, 'p'),
									Ha(32, 22),
									Po(),
									Po(),
									Po(),
									Po(),
									Ro(33, 'li'),
									Ro(34, 'div', 9),
									Lo(35, 'img', 23),
									Po(),
									Ro(36, 'div', 11),
									Ro(37, 'div', 12),
									Ro(38, 'h5'),
									Ha(39, 24),
									Po(),
									Ro(40, 'h4', 14),
									Ha(41, 25),
									Po(),
									Po(),
									Ro(42, 'div', 16),
									Ro(43, 'p'),
									Ha(44, 26),
									Po(),
									Po(),
									Po(),
									Po(),
									Ro(45, 'li', 18),
									Ro(46, 'div', 9),
									Lo(47, 'img', 27),
									Po(),
									Ro(48, 'div', 11),
									Ro(49, 'div', 12),
									Ro(50, 'h5'),
									Ha(51, 28),
									Po(),
									Ro(52, 'h4', 14),
									Ha(53, 29),
									Po(),
									Po(),
									Ro(54, 'div', 16),
									Ro(55, 'p'),
									Ha(56, 30),
									Po(),
									Po(),
									Po(),
									Po(),
									Po(),
									Po(),
									Po(),
									Po(),
									Po());
							},
							encapsulation: 2,
						})),
						t
					);
				})(),
				GS = (() => {
					class t {
						constructor() {}
						ngOnInit() {}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [['app-experiences']],
							decls: 2,
							vars: 0,
							template: function (t, e) {
								1 & t && (Ro(0, 'p'), ia(1, 'experiences works!'), Po());
							},
							encapsulation: 2,
						})),
						t
					);
				})(),
				KS = (() => {
					class t {
						constructor() {
							(this.initYear = 2019), (this.year = new Date().getFullYear());
						}
						ngOnInit() {}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [['app-footer']],
							decls: 20,
							vars: 2,
							consts: function () {
								return [
									['id', 'footer'],
									[1, 'container'],
									[1, 'row'],
									[1, 'col-12', 'mb-3', 'mb-lg-0'],
									[1, 'copyright'],
									[1, 'pb-0'],
									[1, 'footer'],
									'Created with',
									['href', 'https://angular.io/', 'target', '_blank'],
									'and',
									['href', 'https://material.angular.io/', 'target', '_blank'],
									['href', '/images', 'target', '_blank'],
									'Image references',
								];
							},
							template: function (t, e) {
								1 & t &&
									(Ro(0, 'footer', 0),
									Ro(1, 'div', 1),
									Ro(2, 'div', 2),
									Ro(3, 'div', 3),
									Ro(4, 'span', 4),
									ia(5),
									Po(),
									Lo(6, 'br', 5),
									Ro(7, 'span', 6),
									Ro(8, 'span'),
									Ha(9, 7),
									Po(),
									Ro(10, 'a', 8),
									ia(11, 'Angular'),
									Po(),
									Ro(12, 'span'),
									Ha(13, 9),
									Po(),
									Ro(14, 'a', 10),
									ia(15, 'Angular Material'),
									Po(),
									Po(),
									Lo(16, 'br', 5),
									Ro(17, 'span', 6),
									Ro(18, 'a', 11),
									Ha(19, 12),
									Po(),
									Po(),
									Po(),
									Po(),
									Po(),
									Po()),
									2 & t &&
										(Ss(5), oa('Copyright \xa9 Kilian Paquier ', e.initYear, ' - ', e.year, ''));
							},
							encapsulation: 2,
						})),
						t
					);
				})(),
				YS = (() => {
					class t {
						constructor() {}
						ngOnInit() {}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [['app-images']],
							decls: 2,
							vars: 0,
							template: function (t, e) {
								1 & t && (Ro(0, 'p'), ia(1, 'images works!'), Po());
							},
							encapsulation: 2,
						})),
						t
					);
				})(),
				XS = (() => {
					class t {
						constructor() {}
						ngOnInit() {}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵcmp = ge({
							type: t,
							selectors: [['app-interests']],
							decls: 62,
							vars: 0,
							consts: function () {
								return [
									['id', 'interests'],
									[1, 'container'],
									[1, 'row', 'animated', 'fadeIn', 'mb-5'],
									[1, 'col-lg-12', 'text-center'],
									[1, 'section-heading', 'text-uppercase'],
									'Interests',
									[1, 'row', 'text-center'],
									[1, 'offset-lg-1', 'col-sm-4', 'col-lg-2', 'col-md-4', 'mb-2', 'mb-lg-0'],
									[1, 'fa-stack', 'fa-3x', 'mb-3'],
									['ontouchstart', "this.classList.toggle('hover');", 1, 'flip-container'],
									[1, 'flipper'],
									[1, 'front'],
									[
										'src',
										'../../assets/images/tvtime.jpg',
										1,
										'rounded-circle',
										'border-experiences',
										'img-fluid',
									],
									[1, 'back'],
									[1, 'service-heading'],
									'TV Shows',
									[1, 'col-md-4', 'col-lg-2', 'col-sm-4', 'mb-2', 'mb-lg-0'],
									[
										'src',
										'../../assets/images/basketball.jpg',
										1,
										'rounded-circle',
										'border-experiences',
										'img-fluid',
									],
									'Basket',
									[
										'src',
										'../../assets/images/voyage.jpg',
										1,
										'rounded-circle',
										'border-experiences',
										'img-fluid',
									],
									'Travels',
									[1, 'col-md-6', 'col-lg-2', 'col-sm-6', 'mb-2', 'mb-lg-0'],
									[
										'src',
										'../../assets/images/videogame.jpg',
										1,
										'rounded-circle',
										'border-experiences',
										'img-fluid',
									],
									'Video games',
									[1, 'col-md-6', 'col-lg-2', 'col-sm-6'],
									[
										'src',
										'../../assets/images/bobine.jpg',
										1,
										'rounded-circle',
										'border-experiences',
										'img-fluid',
									],
									'Movies',
								];
							},
							template: function (t, e) {
								1 & t &&
									(Ro(0, 'section', 0),
									Ro(1, 'div', 1),
									Ro(2, 'div', 2),
									Ro(3, 'div', 3),
									Ro(4, 'h2', 4),
									Ha(5, 5),
									Po(),
									Po(),
									Po(),
									Ro(6, 'div', 6),
									Ro(7, 'div', 7),
									Ro(8, 'span', 8),
									Ro(9, 'div', 9),
									Ro(10, 'div', 10),
									Ro(11, 'div', 11),
									Lo(12, 'img', 12),
									Po(),
									Ro(13, 'div', 13),
									Lo(14, 'img', 12),
									Po(),
									Po(),
									Po(),
									Po(),
									Ro(15, 'div'),
									Ro(16, 'h4', 14),
									Ha(17, 15),
									Po(),
									Po(),
									Po(),
									Ro(18, 'div', 16),
									Ro(19, 'span', 8),
									Ro(20, 'div', 9),
									Ro(21, 'div', 10),
									Ro(22, 'div', 11),
									Lo(23, 'img', 17),
									Po(),
									Ro(24, 'div', 13),
									Lo(25, 'img', 17),
									Po(),
									Po(),
									Po(),
									Po(),
									Ro(26, 'div'),
									Ro(27, 'h4', 14),
									Ha(28, 18),
									Po(),
									Po(),
									Po(),
									Ro(29, 'div', 16),
									Ro(30, 'span', 8),
									Ro(31, 'div', 9),
									Ro(32, 'div', 10),
									Ro(33, 'div', 11),
									Lo(34, 'img', 19),
									Po(),
									Ro(35, 'div', 13),
									Lo(36, 'img', 19),
									Po(),
									Po(),
									Po(),
									Po(),
									Ro(37, 'div'),
									Ro(38, 'h4', 14),
									Ha(39, 20),
									Po(),
									Po(),
									Po(),
									Ro(40, 'div', 21),
									Ro(41, 'span', 8),
									Ro(42, 'div', 9),
									Ro(43, 'div', 10),
									Ro(44, 'div', 11),
									Lo(45, 'img', 22),
									Po(),
									Ro(46, 'div', 13),
									Lo(47, 'img', 22),
									Po(),
									Po(),
									Po(),
									Po(),
									Ro(48, 'div'),
									Ro(49, 'h4', 14),
									Ha(50, 23),
									Po(),
									Po(),
									Po(),
									Ro(51, 'div', 24),
									Ro(52, 'span', 8),
									Ro(53, 'div', 9),
									Ro(54, 'div', 10),
									Ro(55, 'div', 11),
									Lo(56, 'img', 25),
									Po(),
									Ro(57, 'div', 13),
									Lo(58, 'img', 25),
									Po(),
									Po(),
									Po(),
									Po(),
									Ro(59, 'div'),
									Ro(60, 'h4', 14),
									Ha(61, 26),
									Po(),
									Po(),
									Po(),
									Po(),
									Po(),
									Po());
							},
							encapsulation: 2,
						})),
						t
					);
				})();
			const JS = [
				{ path: '', outlet: 'footer', component: KS },
				{
					path: '',
					outlet: 'projects',
					component: (() => {
						class t {
							constructor() {}
							ngOnInit() {}
						}
						return (
							(t.ɵfac = function (e) {
								return new (e || t)();
							}),
							(t.ɵcmp = ge({
								type: t,
								selectors: [['app-projects']],
								decls: 2,
								vars: 0,
								template: function (t, e) {
									1 & t && (Ro(0, 'p'), ia(1, 'projects works!'), Po());
								},
								encapsulation: 2,
							})),
							t
						);
					})(),
				},
				{
					path: '',
					outlet: 'skills',
					component: (() => {
						class t {
							constructor() {}
							ngOnInit() {
								$('[data-toggle="tooltip"]').tooltip();
							}
						}
						return (
							(t.ɵfac = function (e) {
								return new (e || t)();
							}),
							(t.ɵcmp = ge({
								type: t,
								selectors: [['app-skills']],
								decls: 97,
								vars: 0,
								consts: function () {
									return [
										['id', 'skills'],
										[1, 'container'],
										[1, 'row', 'mb-5'],
										[1, 'col-lg-12', 'text-center'],
										[1, 'section-heading', 'text-uppercase'],
										'Skills',
										[1, 'row', 'text-center'],
										[1, 'col-lg-12'],
										[1, 'section-subheading', 'mb-4'],
										'Programming',
										[1, 'col-6', 'col-md-3', 'col-sm-4', 'col-lg-2', 'mb-5'],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Java \u26aa\u26aa\u26aa\u26aa\u26ab',
											1,
											'devicon-java-plain',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'C# \u26aa\u26aa\u26aa\u26aa\u26ab',
											1,
											'devicon-csharp-plain',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'C++ \u26aa\u26aa\u26aa\u26ab\u26ab',
											1,
											'devicon-cplusplus-plain',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'C \u26aa\u26aa\u26aa\u26ab\u26ab',
											1,
											'devicon-c-plain',
											'icon',
											'colored',
											'fa-3x',
											'devicon',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'CSS3 \u26aa\u26aa\u26aa\u26ab\u26ab',
											1,
											'devicon-css3-plain',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'SCSS \u26aa\u26aa\u26ab\u26ab\u26ab',
											1,
											'devicon-sass-original',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'HTML5 \u26aa\u26aa\u26aa\u26aa\u26ab',
											1,
											'devicon-html5-plain',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'TypeScript \u26aa\u26aa\u26ab\u26ab\u26ab',
											1,
											'devicon-typescript-plain',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'PHP \u26aa\u26aa\u26ab\u26ab\u26ab',
											1,
											'devicon-php-plain',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Javascript \u26aa\u26aa\u26aa\u26aa\u26ab',
											1,
											'devicon-javascript-plain',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Android (Java) \u26aa\u26aa\u26aa\u26ab\u26ab',
											1,
											'devicon-android-plain',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[1, 'icon', 'fa-3x', 'devicon'],
										[
											'src',
											'../../assets/skills/sql.png',
											'height',
											'48',
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'MySQL / SQLite \u26aa\u26aa\u26aa\u26aa\u26ab',
											1,
											'align-top',
										],
										'Frameworks',
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Bootstrap \u26aa\u26aa\u26aa\u26aa\u26ab',
											1,
											'devicon-bootstrap-plain',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'JQuery \u26aa\u26aa\u26aa\u26aa\u26ab',
											1,
											'devicon-jquery-plain-wordmark',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'.NET \u26aa\u26aa\u26aa\u26aa\u26ab',
											1,
											'devicon-dot-net-plain-wordmark',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'src',
											'../../assets/skills/spring-3.svg',
											'height',
											'48',
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Spring \u26aa\u26aa\u26aa\u26ab\u26ab',
											1,
											'align-top',
										],
										[
											'src',
											'../../assets/skills/struts.svg',
											'height',
											'48',
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Struts 2 \u26aa\u26aa\u26aa\u26ab\u26ab',
											1,
											'align-top',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Angular \u26aa\u26aa\u26ab\u26ab\u26ab',
											1,
											'devicon-angularjs-plain',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'src',
											'../../assets/skills/swing.svg',
											'height',
											'55',
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Java Swing \u26aa\u26aa\u26aa\u26aa\u26ab',
											1,
											'mt-n5',
										],
										[
											'src',
											'../../assets/skills/hibernate.svg',
											'height',
											'44',
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Hibernate \u26aa\u26aa\u26aa\u26ab\u26ab',
											1,
											'align-top',
										],
										[
											'src',
											'../../assets/skills/qt.svg',
											'width',
											'48',
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Qt \u26aa\u26aa\u26ab\u26ab\u26ab',
											1,
											'align-top',
										],
										[
											'src',
											'../../assets/skills/1280px-Maven_logo.svg.png',
											'width',
											'68',
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Maven \u26aa\u26aa\u26ab\u26ab\u26ab',
											1,
											'mt-n5',
										],
										[
											'src',
											'../../assets/skills/Extjs.png',
											'height',
											'70',
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'ExtJS \u26aa\u26aa\u26ab\u26ab\u26ab',
											1,
											'mt-n5',
										],
										[
											'src',
											'../../assets/skills/300px-Mol_logo.svg.png',
											'height',
											'70',
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Moleculer \u26aa\u26aa\u26ab\u26ab\u26ab',
											1,
											'mt-n5',
										],
										'Tools',
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'JetBrains \u26aa\u26aa\u26aa\u26aa\u26ab',
											1,
											'devicon-jetbrains-plain',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Git \u26aa\u26aa\u26aa\u26ab\u26ab',
											1,
											'devicon-git-plain',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Trello \u26aa\u26aa\u26aa\u26aa\u26ab',
											1,
											'devicon-trello-plain',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'src',
											'../../assets/skills/visual_paradigm_online.png',
											'height',
											'48',
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Visual Paradigm Online \u26aa\u26aa\u26ab\u26ab\u26ab',
											1,
											'align-top',
										],
										[
											'src',
											'../../assets/skills/astah.png',
											'height',
											'46',
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Astah UML \u26aa\u26aa\u26aa\u26ab\u26ab',
											1,
											'align-top',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Visual Studio \u26aa\u26aa\u26aa\u26ab\u26ab',
											1,
											'devicon-visualstudio-plain',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Nodejs \u26aa\u26aa\u26ab\u26ab\u26ab',
											1,
											'devicon-nodejs-plain',
											'colored',
											'icon',
											'fa-3x',
											'devicon',
										],
										[
											'src',
											'../../assets/skills/gant.png',
											'height',
											'46',
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'Gantt Project \u26aa\u26aa\u26aa\u26ab\u26ab',
											1,
											'align-top',
										],
										[
											'src',
											'../../assets/skills/uml.png',
											'height',
											'48',
											'data-toggle',
											'tooltip',
											'data-placement',
											'bottom',
											'title',
											'UML \u26aa\u26aa\u26aa\u26aa\u26ab',
											1,
											'align-top',
										],
									];
								},
								template: function (t, e) {
									1 & t &&
										(Ro(0, 'section', 0),
										Ro(1, 'div', 1),
										Ro(2, 'div', 2),
										Ro(3, 'div', 3),
										Ro(4, 'h2', 4),
										Ha(5, 5),
										Po(),
										Po(),
										Po(),
										Ro(6, 'div', 6),
										Ro(7, 'div', 7),
										Ro(8, 'h3', 8),
										Ha(9, 9),
										Po(),
										Po(),
										Ro(10, 'div', 10),
										Lo(11, 'i', 11),
										Po(),
										Ro(12, 'div', 10),
										Lo(13, 'i', 12),
										Po(),
										Ro(14, 'div', 10),
										Lo(15, 'i', 13),
										Po(),
										Ro(16, 'div', 10),
										Lo(17, 'i', 14),
										Po(),
										Ro(18, 'div', 10),
										Lo(19, 'i', 15),
										Po(),
										Ro(20, 'div', 10),
										Lo(21, 'i', 16),
										Po(),
										Ro(22, 'div', 10),
										Lo(23, 'i', 17),
										Po(),
										Ro(24, 'div', 10),
										Lo(25, 'i', 18),
										Po(),
										Ro(26, 'div', 10),
										Lo(27, 'i', 19),
										Po(),
										Ro(28, 'div', 10),
										Lo(29, 'i', 20),
										Po(),
										Ro(30, 'div', 10),
										Lo(31, 'i', 21),
										Po(),
										Ro(32, 'div', 10),
										Ro(33, 'i', 22),
										Lo(34, 'img', 23),
										Po(),
										Po(),
										Po(),
										Ro(35, 'div', 6),
										Ro(36, 'div', 7),
										Ro(37, 'h3', 8),
										Ha(38, 24),
										Po(),
										Po(),
										Ro(39, 'div', 10),
										Lo(40, 'i', 25),
										Po(),
										Ro(41, 'div', 10),
										Lo(42, 'i', 26),
										Po(),
										Ro(43, 'div', 10),
										Lo(44, 'i', 27),
										Po(),
										Ro(45, 'div', 10),
										Ro(46, 'i', 22),
										Lo(47, 'img', 28),
										Po(),
										Po(),
										Ro(48, 'div', 10),
										Ro(49, 'i', 22),
										Lo(50, 'img', 29),
										Po(),
										Po(),
										Ro(51, 'div', 10),
										Lo(52, 'i', 30),
										Po(),
										Ro(53, 'div', 10),
										Ro(54, 'i', 22),
										Lo(55, 'img', 31),
										Po(),
										Po(),
										Ro(56, 'div', 10),
										Ro(57, 'i', 22),
										Lo(58, 'img', 32),
										Po(),
										Po(),
										Ro(59, 'div', 10),
										Ro(60, 'i', 22),
										Lo(61, 'img', 33),
										Po(),
										Po(),
										Ro(62, 'div', 10),
										Ro(63, 'i', 22),
										Lo(64, 'img', 34),
										Po(),
										Po(),
										Ro(65, 'div', 10),
										Ro(66, 'i', 22),
										Lo(67, 'img', 35),
										Po(),
										Po(),
										Ro(68, 'div', 10),
										Ro(69, 'i', 22),
										Lo(70, 'img', 36),
										Po(),
										Po(),
										Po(),
										Ro(71, 'div', 6),
										Ro(72, 'div', 7),
										Ro(73, 'h3', 8),
										Ha(74, 37),
										Po(),
										Po(),
										Ro(75, 'div', 10),
										Lo(76, 'i', 38),
										Po(),
										Ro(77, 'div', 10),
										Lo(78, 'i', 39),
										Po(),
										Ro(79, 'div', 10),
										Lo(80, 'i', 40),
										Po(),
										Ro(81, 'div', 10),
										Ro(82, 'i', 22),
										Lo(83, 'img', 41),
										Po(),
										Po(),
										Ro(84, 'div', 10),
										Ro(85, 'i', 22),
										Lo(86, 'img', 42),
										Po(),
										Po(),
										Ro(87, 'div', 10),
										Lo(88, 'i', 43),
										Po(),
										Ro(89, 'div', 10),
										Lo(90, 'i', 44),
										Po(),
										Ro(91, 'div', 10),
										Ro(92, 'i', 22),
										Lo(93, 'img', 45),
										Po(),
										Po(),
										Ro(94, 'div', 10),
										Ro(95, 'i', 22),
										Lo(96, 'img', 46),
										Po(),
										Po(),
										Po(),
										Po(),
										Po());
								},
								encapsulation: 2,
							})),
							t
						);
					})(),
				},
				{ path: '', outlet: 'about', component: WS },
				{ path: '', outlet: 'education', component: ZS },
				{ path: '', outlet: 'interests', component: XS },
				{ path: '', outlet: 'contact', component: QS },
				{ path: '', outlet: 'experiences', component: GS },
				{ path: '**', redirectTo: '' },
				{ path: 'images', component: YS },
			];
			let tE = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[DS.forRoot(JS)], DS],
						})),
						t
					);
				})(),
				eE = (() => {
					class t {}
					return (
						(t.ɵmod = be({ type: t, bootstrap: [qS] })),
						(t.ɵinj = dt({
							factory: function (e) {
								return new (e || t)();
							},
							providers: [gv],
							imports: [[rh, Zf, tE, Ym, Xm, ag, hm, dg, Ly, E_, qb, Sv.forRoot(), pv]],
						})),
						t
					);
				})();
			(function () {
				if (Oi) throw new Error('Cannot enable prod mode after platform setup.');
				Ii = !1;
			})(),
				nh()
					.bootstrapModule(eE)
					.catch(t => console.error(t));
		},
		zn8P: function (t, e) {
			function n(t) {
				return Promise.resolve().then(function () {
					var e = new Error("Cannot find module '" + t + "'");
					throw ((e.code = 'MODULE_NOT_FOUND'), e);
				});
			}
			(n.keys = function () {
				return [];
			}),
				(n.resolve = n),
				(t.exports = n),
				(n.id = 'zn8P');
		},
	},
	[[0, 0]],
]);
