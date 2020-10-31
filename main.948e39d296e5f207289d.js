(window.webpackJsonp = window.webpackJsonp || []).push([
	[1],
	{
		0: function (t, e, n) {
			t.exports = n('zUnb');
		},
		zUnb: function (t, e, n) {
			'use strict';
			function r(t) {
				return 'function' == typeof t;
			}
			n.r(e);
			let s = !1;
			const i = {
				Promise: void 0,
				set useDeprecatedSynchronousErrorHandling(t) {
					if (t) {
						const t = new Error();
						console.warn(
							'DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' +
								t.stack
						);
					} else
						s &&
							console.log(
								'RxJS: Back to a better error behavior. Thank you. <3'
							);
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
						if (i.useDeprecatedSynchronousErrorHandling) throw t;
						o(t);
					},
					complete() {},
				},
				l = (() =>
					Array.isArray || (t => t && 'number' == typeof t.length))();
			function c(t) {
				return null !== t && 'object' == typeof t;
			}
			const u = (() => {
				function t(t) {
					return (
						Error.call(this),
						(this.message = t
							? `${
									t.length
							  } errors occurred during unsubscription:\n${t
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
							t &&
								((this._ctorUnsubscribe = !0),
								(this._unsubscribe = t));
					}
					unsubscribe() {
						let e;
						if (this.closed) return;
						let {
							_parentOrParents: n,
							_ctorUnsubscribe: s,
							_unsubscribe: i,
							_subscriptions: o,
						} = this;
						if (
							((this.closed = !0),
							(this._parentOrParents = null),
							(this._subscriptions = null),
							n instanceof t)
						)
							n.remove(this);
						else if (null !== n)
							for (let t = 0; t < n.length; ++t)
								n[t].remove(this);
						if (r(i)) {
							s && (this._unsubscribe = void 0);
							try {
								i.call(this);
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
										(e = e || []),
											a instanceof u
												? (e = e.concat(d(a.errors)))
												: e.push(a);
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
								if (
									n === this ||
									n.closed ||
									'function' != typeof n.unsubscribe
								)
									return n;
								if (this.closed) return n.unsubscribe(), n;
								if (!(n instanceof t)) {
									const e = n;
									(n = new t()), (n._subscriptions = [e]);
								}
								break;
							default:
								throw new Error(
									'unrecognized teardown ' +
										e +
										' added to Subscription.'
								);
						}
						let { _parentOrParents: r } = n;
						if (null === r) n._parentOrParents = this;
						else if (r instanceof t) {
							if (r === this) return n;
							n._parentOrParents = [r, this];
						} else {
							if (-1 !== r.indexOf(this)) return n;
							r.push(this);
						}
						const s = this._subscriptions;
						return (
							null === s
								? (this._subscriptions = [n])
								: s.push(n),
							n
						);
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
				return t.reduce(
					(t, e) => t.concat(e instanceof u ? e.errors : e),
					[]
				);
			}
			const f = (() =>
				'function' == typeof Symbol
					? Symbol('rxSubscriber')
					: '@@rxSubscriber_' + Math.random())();
			class p extends h {
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
								t instanceof p
									? ((this.syncErrorThrowable =
											t.syncErrorThrowable),
									  (this.destination = t),
									  t.add(this))
									: ((this.syncErrorThrowable = !0),
									  (this.destination = new m(this, t)));
								break;
							}
						default:
							(this.syncErrorThrowable = !0),
								(this.destination = new m(this, t, e, n));
					}
				}
				[f]() {
					return this;
				}
				static create(t, e, n) {
					const r = new p(t, e, n);
					return (r.syncErrorThrowable = !1), r;
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
			class m extends p {
				constructor(t, e, n, s) {
					let i;
					super(), (this._parentSubscriber = t);
					let o = this;
					r(e)
						? (i = e)
						: e &&
						  ((i = e.next),
						  (n = e.error),
						  (s = e.complete),
						  e !== a &&
								((o = Object.create(e)),
								r(o.unsubscribe) &&
									this.add(o.unsubscribe.bind(o)),
								(o.unsubscribe = this.unsubscribe.bind(this)))),
						(this._context = o),
						(this._next = i),
						(this._error = n),
						(this._complete = s);
				}
				next(t) {
					if (!this.isStopped && this._next) {
						const { _parentSubscriber: e } = this;
						i.useDeprecatedSynchronousErrorHandling &&
						e.syncErrorThrowable
							? this.__tryOrSetError(e, this._next, t) &&
							  this.unsubscribe()
							: this.__tryOrUnsub(this._next, t);
					}
				}
				error(t) {
					if (!this.isStopped) {
						const { _parentSubscriber: e } = this,
							{ useDeprecatedSynchronousErrorHandling: n } = i;
						if (this._error)
							n && e.syncErrorThrowable
								? (this.__tryOrSetError(e, this._error, t),
								  this.unsubscribe())
								: (this.__tryOrUnsub(this._error, t),
								  this.unsubscribe());
						else if (e.syncErrorThrowable)
							n
								? ((e.syncErrorValue = t),
								  (e.syncErrorThrown = !0))
								: o(t),
								this.unsubscribe();
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
							i.useDeprecatedSynchronousErrorHandling &&
							t.syncErrorThrowable
								? (this.__tryOrSetError(t, e),
								  this.unsubscribe())
								: (this.__tryOrUnsub(e), this.unsubscribe());
						} else this.unsubscribe();
					}
				}
				__tryOrUnsub(t, e) {
					try {
						t.call(this._context, e);
					} catch (n) {
						if (
							(this.unsubscribe(),
							i.useDeprecatedSynchronousErrorHandling)
						)
							throw n;
						o(n);
					}
				}
				__tryOrSetError(t, e, n) {
					if (!i.useDeprecatedSynchronousErrorHandling)
						throw new Error('bad call');
					try {
						e.call(this._context, n);
					} catch (r) {
						return i.useDeprecatedSynchronousErrorHandling
							? ((t.syncErrorValue = r),
							  (t.syncErrorThrown = !0),
							  !0)
							: (o(r), !0);
					}
					return !1;
				}
				_unsubscribe() {
					const { _parentSubscriber: t } = this;
					(this._context = null),
						(this._parentSubscriber = null),
						t.unsubscribe();
				}
			}
			const g = (() =>
				('function' == typeof Symbol && Symbol.observable) ||
				'@@observable')();
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
						const { operator: r } = this,
							s = (function (t, e, n) {
								if (t) {
									if (t instanceof p) return t;
									if (t[f]) return t[f]();
								}
								return t || e || n ? new p(t, e, n) : new p(a);
							})(t, e, n);
						if (
							(s.add(
								r
									? r.call(s, this.source)
									: this.source ||
									  (i.useDeprecatedSynchronousErrorHandling &&
											!s.syncErrorThrowable)
									? this._subscribe(s)
									: this._trySubscribe(s)
							),
							i.useDeprecatedSynchronousErrorHandling &&
								s.syncErrorThrowable &&
								((s.syncErrorThrowable = !1),
								s.syncErrorThrown))
						)
							throw s.syncErrorValue;
						return s;
					}
					_trySubscribe(t) {
						try {
							return this._subscribe(t);
						} catch (e) {
							i.useDeprecatedSynchronousErrorHandling &&
								((t.syncErrorThrown = !0),
								(t.syncErrorValue = e)),
								(function (t) {
									for (; t; ) {
										const {
											closed: e,
											destination: n,
											isStopped: r,
										} = t;
										if (e || r) return !1;
										t = n && n instanceof p ? n : null;
									}
									return !0;
								})(t)
									? t.error(e)
									: console.warn(e);
						}
					}
					forEach(t, e) {
						return new (e = b(e))((e, n) => {
							let r;
							r = this.subscribe(
								e => {
									try {
										t(e);
									} catch (s) {
										n(s), r && r.unsubscribe();
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
						return new (t = b(t))((t, e) => {
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
			function b(t) {
				if ((t || (t = i.Promise || Promise), !t))
					throw new Error('no Promise impl found');
				return t;
			}
			const v = (() => {
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
					super(),
						(this.subject = t),
						(this.subscriber = e),
						(this.closed = !1);
				}
				unsubscribe() {
					if (this.closed) return;
					this.closed = !0;
					const t = this.subject,
						e = t.observers;
					if (
						((this.subject = null),
						!e || 0 === e.length || t.isStopped || t.closed)
					)
						return;
					const n = e.indexOf(this.subscriber);
					-1 !== n && e.splice(n, 1);
				}
			}
			class S extends p {
				constructor(t) {
					super(t), (this.destination = t);
				}
			}
			let E = (() => {
				class t extends _ {
					constructor() {
						super(),
							(this.observers = []),
							(this.closed = !1),
							(this.isStopped = !1),
							(this.hasError = !1),
							(this.thrownError = null);
					}
					[f]() {
						return new S(this);
					}
					lift(t) {
						const e = new x(this, this);
						return (e.operator = t), e;
					}
					next(t) {
						if (this.closed) throw new v();
						if (!this.isStopped) {
							const { observers: e } = this,
								n = e.length,
								r = e.slice();
							for (let s = 0; s < n; s++) r[s].next(t);
						}
					}
					error(t) {
						if (this.closed) throw new v();
						(this.hasError = !0),
							(this.thrownError = t),
							(this.isStopped = !0);
						const { observers: e } = this,
							n = e.length,
							r = e.slice();
						for (let s = 0; s < n; s++) r[s].error(t);
						this.observers.length = 0;
					}
					complete() {
						if (this.closed) throw new v();
						this.isStopped = !0;
						const { observers: t } = this,
							e = t.length,
							n = t.slice();
						for (let r = 0; r < e; r++) n[r].complete();
						this.observers.length = 0;
					}
					unsubscribe() {
						(this.isStopped = !0),
							(this.closed = !0),
							(this.observers = null);
					}
					_trySubscribe(t) {
						if (this.closed) throw new v();
						return super._trySubscribe(t);
					}
					_subscribe(t) {
						if (this.closed) throw new v();
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
				return (t.create = (t, e) => new x(t, e)), t;
			})();
			class x extends E {
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
						throw new TypeError(
							'argument is not a function. Are you looking for `mapTo()`?'
						);
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
			class A extends p {
				constructor(t, e, n) {
					super(t),
						(this.project = e),
						(this.count = 0),
						(this.thisArg = n || this);
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
				for (let n = 0, r = t.length; n < r && !e.closed; n++)
					e.next(t[n]);
				e.complete();
			};
			function O() {
				return 'function' == typeof Symbol && Symbol.iterator
					? Symbol.iterator
					: '@@iterator';
			}
			const R = O(),
				P = t =>
					t && 'number' == typeof t.length && 'function' != typeof t;
			function N(t) {
				return (
					!!t &&
					'function' != typeof t.subscribe &&
					'function' == typeof t.then
				);
			}
			const L = t => {
				if (t && 'function' == typeof t[g])
					return (
						(r = t),
						t => {
							const e = r[g]();
							if ('function' != typeof e.subscribe)
								throw new TypeError(
									'Provided object does not correctly implement Symbol.observable'
								);
							return e.subscribe(t);
						}
					);
				if (P(t)) return I(t);
				if (N(t))
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
								} catch (r) {
									return t.error(r), t;
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
				var e, n, r;
			};
			function D(t, e) {
				return new _(n => {
					const r = new h();
					let s = 0;
					return (
						r.add(
							e.schedule(function () {
								s !== t.length
									? (n.next(t[s++]),
									  n.closed || r.add(this.schedule()))
									: n.complete();
							})
						),
						r
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
											const r = new h();
											return (
												r.add(
													e.schedule(() => {
														const s = t[g]();
														r.add(
															s.subscribe({
																next(t) {
																	r.add(
																		e.schedule(
																			() =>
																				n.next(
																					t
																				)
																		)
																	);
																},
																error(t) {
																	r.add(
																		e.schedule(
																			() =>
																				n.error(
																					t
																				)
																		)
																	);
																},
																complete() {
																	r.add(
																		e.schedule(
																			() =>
																				n.complete()
																		)
																	);
																},
															})
														);
													})
												),
												r
											);
										});
									})(t, e);
								if (N(t))
									return (function (t, e) {
										return new _(n => {
											const r = new h();
											return (
												r.add(
													e.schedule(() =>
														t.then(
															t => {
																r.add(
																	e.schedule(
																		() => {
																			n.next(
																				t
																			),
																				r.add(
																					e.schedule(
																						() =>
																							n.complete()
																					)
																				);
																		}
																	)
																);
															},
															t => {
																r.add(
																	e.schedule(
																		() =>
																			n.error(
																				t
																			)
																	)
																);
															}
														)
													)
												),
												r
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
										if (!t)
											throw new Error(
												'Iterable cannot be null'
											);
										return new _(n => {
											const r = new h();
											let s;
											return (
												r.add(() => {
													s &&
														'function' ==
															typeof s.return &&
														s.return();
												}),
												r.add(
													e.schedule(() => {
														(s = t[R]()),
															r.add(
																e.schedule(
																	function () {
																		if (
																			n.closed
																		)
																			return;
																		let t,
																			e;
																		try {
																			const n = s.next();
																			(t =
																				n.value),
																				(e =
																					n.done);
																		} catch (r) {
																			return void n.error(
																				r
																			);
																		}
																		e
																			? n.complete()
																			: (n.next(
																					t
																			  ),
																			  this.schedule());
																	}
																)
															);
													})
												),
												r
											);
										});
									})(t, e);
							}
							throw new TypeError(
								((null !== t && typeof t) || t) +
									' is not observable'
							);
					  })(t, e)
					: t instanceof _
					? t
					: new _(L(t));
			}
			class F extends p {
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
			class j extends p {
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
			function z(t, e) {
				if (!e.closed) return t instanceof _ ? t.subscribe(e) : L(t)(e);
			}
			function B(t, e, n = Number.POSITIVE_INFINITY) {
				return 'function' == typeof e
					? r =>
							r.pipe(
								B(
									(n, r) =>
										M(t(n, r)).pipe(
											k((t, s) => e(n, t, r, s))
										),
									n
								)
							)
					: ('number' == typeof e && (n = e),
					  e => e.lift(new U(t, n)));
			}
			class U {
				constructor(t, e = Number.POSITIVE_INFINITY) {
					(this.project = t), (this.concurrent = e);
				}
				call(t, e) {
					return e.subscribe(new V(t, this.project, this.concurrent));
				}
			}
			class V extends j {
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
					this.active < this.concurrent
						? this._tryNext(t)
						: this.buffer.push(t);
				}
				_tryNext(t) {
					let e;
					const n = this.index++;
					try {
						e = this.project(t, n);
					} catch (r) {
						return void this.destination.error(r);
					}
					this.active++, this._innerSub(e);
				}
				_innerSub(t) {
					const e = new F(this),
						n = this.destination;
					n.add(e);
					const r = z(t, e);
					r !== e && n.add(r);
				}
				_complete() {
					(this.hasCompleted = !0),
						0 === this.active &&
							0 === this.buffer.length &&
							this.destination.complete(),
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
							: 0 === this.active &&
							  this.hasCompleted &&
							  this.destination.complete();
				}
			}
			function H(t = Number.POSITIVE_INFINITY) {
				return B(y, t);
			}
			function $(t, e) {
				return e ? D(t, e) : new _(I(t));
			}
			function q(...t) {
				let e = Number.POSITIVE_INFINITY,
					n = null,
					r = t[t.length - 1];
				return (
					C(r)
						? ((n = t.pop()),
						  t.length > 1 &&
								'number' == typeof t[t.length - 1] &&
								(e = t.pop()))
						: 'number' == typeof r && (e = t.pop()),
					null === n && 1 === t.length && t[0] instanceof _
						? t[0]
						: H(e)($(t, n))
				);
			}
			function W() {
				return function (t) {
					return t.lift(new Q(t));
				};
			}
			class Q {
				constructor(t) {
					this.connectable = t;
				}
				call(t, e) {
					const { connectable: n } = this;
					n._refCount++;
					const r = new K(t, n),
						s = e.subscribe(r);
					return r.closed || (r.connection = n.connect()), s;
				}
			}
			class K extends p {
				constructor(t, e) {
					super(t), (this.connectable = e);
				}
				_unsubscribe() {
					const { connectable: t } = this;
					if (!t) return void (this.connection = null);
					this.connectable = null;
					const e = t._refCount;
					if (e <= 0) return void (this.connection = null);
					if (((t._refCount = e - 1), e > 1))
						return void (this.connection = null);
					const { connection: n } = this,
						r = t._connection;
					(this.connection = null),
						!r || (n && r !== n) || r.unsubscribe();
				}
			}
			class G extends _ {
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
					return (
						(t && !t.isStopped) ||
							(this._subject = this.subjectFactory()),
						this._subject
					);
				}
				connect() {
					let t = this._connection;
					return (
						t ||
							((this._isComplete = !1),
							(t = this._connection = new h()),
							t.add(
								this.source.subscribe(
									new Y(this.getSubject(), this)
								)
							),
							t.closed &&
								((this._connection = null), (t = h.EMPTY))),
						t
					);
				}
				refCount() {
					return W()(this);
				}
			}
			const Z = (() => {
				const t = G.prototype;
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
			class Y extends S {
				constructor(t, e) {
					super(t), (this.connectable = e);
				}
				_error(t) {
					this._unsubscribe(), super._error(t);
				}
				_complete() {
					(this.connectable._isComplete = !0),
						this._unsubscribe(),
						super._complete();
				}
				_unsubscribe() {
					const t = this.connectable;
					if (t) {
						this.connectable = null;
						const e = t._connection;
						(t._refCount = 0),
							(t._subject = null),
							(t._connection = null),
							e && e.unsubscribe();
					}
				}
			}
			function X() {
				return new E();
			}
			function J() {
				return t => {
					return W()(
						((e = X),
						function (t) {
							let n;
							n =
								'function' == typeof e
									? e
									: function () {
											return e;
									  };
							const r = Object.create(t, Z);
							return (r.source = t), (r.subjectFactory = n), r;
						})(t)
					);
					var e;
				};
			}
			function tt(t) {
				return { toString: t }.toString();
			}
			const et = '__parameters__';
			function nt(t, e, n) {
				return tt(() => {
					const r = (function (t) {
						return function (...e) {
							if (t) {
								const n = t(...e);
								for (const t in n) this[t] = n[t];
							}
						};
					})(e);
					function s(...t) {
						if (this instanceof s) return r.apply(this, t), this;
						const e = new s(...t);
						return (n.annotation = e), n;
						function n(t, n, r) {
							const s = t.hasOwnProperty(et)
								? t[et]
								: Object.defineProperty(t, et, { value: [] })[
										et
								  ];
							for (; s.length <= r; ) s.push(null);
							return (s[r] = s[r] || []).push(e), t;
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
			const rt = nt('Inject', t => ({ token: t })),
				st = nt('Optional'),
				it = nt('Self'),
				ot = nt('SkipSelf');
			var at = (function (t) {
				return (
					(t[(t.Default = 0)] = 'Default'),
					(t[(t.Host = 1)] = 'Host'),
					(t[(t.Self = 2)] = 'Self'),
					(t[(t.SkipSelf = 4)] = 'SkipSelf'),
					(t[(t.Optional = 8)] = 'Optional'),
					t
				);
			})({});
			function lt(t) {
				for (let e in t) if (t[e] === lt) return e;
				throw Error(
					'Could not find renamed property on target object.'
				);
			}
			function ct(t, e) {
				for (const n in e)
					e.hasOwnProperty(n) &&
						!t.hasOwnProperty(n) &&
						(t[n] = e[n]);
			}
			function ut(t) {
				return {
					token: t.token,
					providedIn: t.providedIn || null,
					factory: t.factory,
					value: void 0,
				};
			}
			function ht(t) {
				return {
					factory: t.factory,
					providers: t.providers || [],
					imports: t.imports || [],
				};
			}
			function dt(t) {
				return ft(t, t[mt]) || ft(t, t[_t]);
			}
			function ft(t, e) {
				return e && e.token === t ? e : null;
			}
			function pt(t) {
				return t && (t.hasOwnProperty(gt) || t.hasOwnProperty(bt))
					? t[gt]
					: null;
			}
			const mt = lt({ '\u0275prov': lt }),
				gt = lt({ '\u0275inj': lt }),
				yt = lt({ '\u0275provFallback': lt }),
				_t = lt({ ngInjectableDef: lt }),
				bt = lt({ ngInjectorDef: lt });
			function vt(t) {
				if ('string' == typeof t) return t;
				if (Array.isArray(t)) return '[' + t.map(vt).join(', ') + ']';
				if (null == t) return '' + t;
				if (t.overriddenName) return '' + t.overriddenName;
				if (t.name) return '' + t.name;
				const e = t.toString();
				if (null == e) return '' + e;
				const n = e.indexOf('\n');
				return -1 === n ? e : e.substring(0, n);
			}
			function wt(t, e) {
				return null == t || '' === t
					? null === e
						? ''
						: e
					: null == e || '' === e
					? t
					: t + ' ' + e;
			}
			const St = lt({ __forward_ref__: lt });
			function Et(t) {
				return (
					(t.__forward_ref__ = Et),
					(t.toString = function () {
						return vt(this());
					}),
					t
				);
			}
			function xt(t) {
				return Ct(t) ? t() : t;
			}
			function Ct(t) {
				return (
					'function' == typeof t &&
					t.hasOwnProperty(St) &&
					t.__forward_ref__ === Et
				);
			}
			const kt = 'undefined' != typeof globalThis && globalThis,
				Tt = 'undefined' != typeof window && window,
				At =
					'undefined' != typeof self &&
					'undefined' != typeof WorkerGlobalScope &&
					self instanceof WorkerGlobalScope &&
					self,
				It = 'undefined' != typeof global && global,
				Ot = kt || It || Tt || At,
				Rt = lt({ '\u0275cmp': lt }),
				Pt = lt({ '\u0275dir': lt }),
				Nt = lt({ '\u0275pipe': lt }),
				Lt = lt({ '\u0275mod': lt }),
				Dt = lt({ '\u0275loc': lt }),
				Mt = lt({ '\u0275fac': lt }),
				Ft = lt({ __NG_ELEMENT_ID__: lt });
			class jt {
				constructor(t, e) {
					(this._desc = t),
						(this.ngMetadataName = 'InjectionToken'),
						(this.ɵprov = void 0),
						'number' == typeof e
							? (this.__NG_ELEMENT_ID__ = e)
							: void 0 !== e &&
							  (this.ɵprov = ut({
									token: this,
									providedIn: e.providedIn || 'root',
									factory: e.factory,
							  }));
				}
				toString() {
					return 'InjectionToken ' + this._desc;
				}
			}
			const zt = new jt('INJECTOR', -1),
				Bt = {},
				Ut = /\n/gm,
				Vt = '__source',
				Ht = lt({ provide: String, useValue: lt });
			let $t,
				qt = void 0;
			function Wt(t) {
				const e = qt;
				return (qt = t), e;
			}
			function Qt(t) {
				const e = $t;
				return ($t = t), e;
			}
			function Kt(t, e = at.Default) {
				if (void 0 === qt)
					throw new Error(
						'inject() must be called from an injection context'
					);
				return null === qt
					? Yt(t, void 0, e)
					: qt.get(t, e & at.Optional ? null : void 0, e);
			}
			function Gt(t, e = at.Default) {
				return ($t || Kt)(xt(t), e);
			}
			const Zt = Gt;
			function Yt(t, e, n) {
				const r = dt(t);
				if (r && 'root' == r.providedIn)
					return void 0 === r.value
						? (r.value = r.factory())
						: r.value;
				if (n & at.Optional) return null;
				if (void 0 !== e) return e;
				throw new Error(`Injector: NOT_FOUND [${vt(t)}]`);
			}
			function Xt(t) {
				const e = [];
				for (let n = 0; n < t.length; n++) {
					const r = xt(t[n]);
					if (Array.isArray(r)) {
						if (0 === r.length)
							throw new Error(
								'Arguments array must have arguments.'
							);
						let t = void 0,
							n = at.Default;
						for (let e = 0; e < r.length; e++) {
							const s = r[e];
							s instanceof st ||
							'Optional' === s.ngMetadataName ||
							s === st
								? (n |= at.Optional)
								: s instanceof ot ||
								  'SkipSelf' === s.ngMetadataName ||
								  s === ot
								? (n |= at.SkipSelf)
								: s instanceof it ||
								  'Self' === s.ngMetadataName ||
								  s === it
								? (n |= at.Self)
								: (t =
										s instanceof rt || s === rt
											? s.token
											: s);
						}
						e.push(Gt(t, n));
					} else e.push(Gt(r));
				}
				return e;
			}
			class Jt {
				get(t, e = Bt) {
					if (e === Bt) {
						const e = new Error(
							`NullInjectorError: No provider for ${vt(t)}!`
						);
						throw ((e.name = 'NullInjectorError'), e);
					}
					return e;
				}
			}
			class te {}
			class ee {}
			function ne(t, e) {
				t.forEach(t => (Array.isArray(t) ? ne(t, e) : e(t)));
			}
			function re(t, e, n) {
				e >= t.length ? t.push(n) : t.splice(e, 0, n);
			}
			function se(t, e) {
				return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
			}
			function ie(t, e) {
				const n = [];
				for (let r = 0; r < t; r++) n.push(e);
				return n;
			}
			function oe(t, e, n) {
				let r = le(t, e);
				return (
					r >= 0
						? (t[1 | r] = n)
						: ((r = ~r),
						  (function (t, e, n, r) {
								let s = t.length;
								if (s == e) t.push(n, r);
								else if (1 === s) t.push(r, t[0]), (t[0] = n);
								else {
									for (s--, t.push(t[s - 1], t[s]); s > e; )
										(t[s] = t[s - 2]), s--;
									(t[e] = n), (t[e + 1] = r);
								}
						  })(t, r, e, n)),
					r
				);
			}
			function ae(t, e) {
				const n = le(t, e);
				if (n >= 0) return t[1 | n];
			}
			function le(t, e) {
				return (function (t, e, n) {
					let r = 0,
						s = t.length >> 1;
					for (; s !== r; ) {
						const n = r + ((s - r) >> 1),
							i = t[n << 1];
						if (e === i) return n << 1;
						i > e ? (s = n) : (r = n + 1);
					}
					return ~(s << 1);
				})(t, e);
			}
			var ce = (function (t) {
					return (
						(t[(t.OnPush = 0)] = 'OnPush'),
						(t[(t.Default = 1)] = 'Default'),
						t
					);
				})({}),
				ue = (function (t) {
					return (
						(t[(t.Emulated = 0)] = 'Emulated'),
						(t[(t.Native = 1)] = 'Native'),
						(t[(t.None = 2)] = 'None'),
						(t[(t.ShadowDom = 3)] = 'ShadowDom'),
						t
					);
				})({});
			const he = {},
				de = [];
			let fe = 0;
			function pe(t) {
				return tt(() => {
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
							onPush: t.changeDetection === ce.OnPush,
							directiveDefs: null,
							pipeDefs: null,
							selectors: t.selectors || de,
							viewQuery: t.viewQuery || null,
							features: t.features || null,
							data: t.data || {},
							encapsulation: t.encapsulation || ue.Emulated,
							id: 'c',
							styles: t.styles || de,
							_: null,
							setInput: null,
							schemas: t.schemas || null,
							tView: null,
						},
						r = t.directives,
						s = t.features,
						i = t.pipes;
					return (
						(n.id += fe++),
						(n.inputs = be(t.inputs, e)),
						(n.outputs = be(t.outputs)),
						s && s.forEach(t => t(n)),
						(n.directiveDefs = r
							? () => ('function' == typeof r ? r() : r).map(me)
							: null),
						(n.pipeDefs = i
							? () => ('function' == typeof i ? i() : i).map(ge)
							: null),
						n
					);
				});
			}
			function me(t) {
				return (
					we(t) ||
					(function (t) {
						return t[Pt] || null;
					})(t)
				);
			}
			function ge(t) {
				return (function (t) {
					return t[Nt] || null;
				})(t);
			}
			const ye = {};
			function _e(t) {
				const e = {
					type: t.type,
					bootstrap: t.bootstrap || de,
					declarations: t.declarations || de,
					imports: t.imports || de,
					exports: t.exports || de,
					transitiveCompileScopes: null,
					schemas: t.schemas || null,
					id: t.id || null,
				};
				return (
					null != t.id &&
						tt(() => {
							ye[t.id] = t.type;
						}),
					e
				);
			}
			function be(t, e) {
				if (null == t) return he;
				const n = {};
				for (const r in t)
					if (t.hasOwnProperty(r)) {
						let s = t[r],
							i = s;
						Array.isArray(s) && ((i = s[1]), (s = s[0])),
							(n[s] = r),
							e && (e[s] = i);
					}
				return n;
			}
			const ve = pe;
			function we(t) {
				return t[Rt] || null;
			}
			function Se(t, e) {
				return t.hasOwnProperty(Mt) ? t[Mt] : null;
			}
			function Ee(t, e) {
				const n = t[Lt] || null;
				if (!n && !0 === e)
					throw new Error(
						`Type ${vt(t)} does not have '\u0275mod' property.`
					);
				return n;
			}
			const xe = 20,
				Ce = 10;
			function ke(t) {
				return Array.isArray(t) && 'object' == typeof t[1];
			}
			function Te(t) {
				return Array.isArray(t) && !0 === t[1];
			}
			function Ae(t) {
				return 0 != (8 & t.flags);
			}
			function Ie(t) {
				return 2 == (2 & t.flags);
			}
			function Oe(t) {
				return 1 == (1 & t.flags);
			}
			function Re(t) {
				return null !== t.template;
			}
			function Pe(t) {
				return 0 != (512 & t[2]);
			}
			class Ne {
				constructor(t, e, n) {
					(this.previousValue = t),
						(this.currentValue = e),
						(this.firstChange = n);
				}
				isFirstChange() {
					return this.firstChange;
				}
			}
			function Le() {
				return De;
			}
			function De(t) {
				return t.type.prototype.ngOnChanges && (t.setInput = Fe), Me;
			}
			function Me() {
				const t = je(this),
					e = null == t ? void 0 : t.current;
				if (e) {
					const n = t.previous;
					if (n === he) t.previous = e;
					else for (let t in e) n[t] = e[t];
					(t.current = null), this.ngOnChanges(e);
				}
			}
			function Fe(t, e, n, r) {
				const s =
						je(t) ||
						(function (t, e) {
							return (t.__ngSimpleChanges__ = e);
						})(t, { previous: he, current: null }),
					i = s.current || (s.current = {}),
					o = s.previous,
					a = this.declaredInputs[n],
					l = o[a];
				(i[a] = new Ne(l && l.currentValue, e, o === he)), (t[r] = e);
			}
			function je(t) {
				return t.__ngSimpleChanges__ || null;
			}
			Le.ngInherit = !0;
			let ze = void 0;
			function Be() {
				return void 0 !== ze
					? ze
					: 'undefined' != typeof document
					? document
					: void 0;
			}
			function Ue(t) {
				return !!t.listen;
			}
			const Ve = { createRenderer: (t, e) => Be() };
			function He(t) {
				for (; Array.isArray(t); ) t = t[0];
				return t;
			}
			function $e(t, e) {
				return He(e[t.index]);
			}
			function qe(t, e) {
				return t.data[e + xe];
			}
			function We(t, e) {
				const n = e[t];
				return ke(n) ? n : n[0];
			}
			function Qe(t) {
				const e = (function (t) {
					return t.__ngContext__ || null;
				})(t);
				return e ? (Array.isArray(e) ? e : e.lView) : null;
			}
			function Ke(t) {
				return 4 == (4 & t[2]);
			}
			function Ge(t) {
				return 128 == (128 & t[2]);
			}
			function Ze(t, e) {
				return null === t || null == e ? null : t[e];
			}
			function Ye(t) {
				t[18] = 0;
			}
			function Xe(t, e) {
				t[5] += e;
				let n = t,
					r = t[3];
				for (
					;
					null !== r &&
					((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

				)
					(r[5] += e), (n = r), (r = r[3]);
			}
			const Je = {
				lFrame: vn(null),
				bindingsEnabled: !0,
				isInCheckNoChangesMode: !1,
			};
			function tn() {
				return Je.bindingsEnabled;
			}
			function en() {
				return Je.lFrame.lView;
			}
			function nn() {
				return Je.lFrame.tView;
			}
			function rn(t) {
				Je.lFrame.contextLView = t;
			}
			function sn() {
				return Je.lFrame.currentTNode;
			}
			function on(t, e) {
				(Je.lFrame.currentTNode = t), (Je.lFrame.isParent = e);
			}
			function an() {
				return Je.lFrame.isParent;
			}
			function ln() {
				Je.lFrame.isParent = !1;
			}
			function cn() {
				return Je.isInCheckNoChangesMode;
			}
			function un(t) {
				Je.isInCheckNoChangesMode = t;
			}
			function hn() {
				return Je.lFrame.bindingIndex++;
			}
			function dn(t, e) {
				const n = Je.lFrame;
				(n.bindingIndex = n.bindingRootIndex = t), fn(e);
			}
			function fn(t) {
				Je.lFrame.currentDirectiveIndex = t;
			}
			function pn(t) {
				const e = Je.lFrame.currentDirectiveIndex;
				return -1 === e ? null : t[e];
			}
			function mn() {
				return Je.lFrame.currentQueryIndex;
			}
			function gn(t) {
				Je.lFrame.currentQueryIndex = t;
			}
			function yn(t, e) {
				const n = bn();
				(Je.lFrame = n), (n.currentTNode = e), (n.lView = t);
			}
			function _n(t) {
				const e = bn(),
					n = t[1];
				(Je.lFrame = e),
					(e.currentTNode = n.firstChild),
					(e.lView = t),
					(e.tView = n),
					(e.contextLView = t),
					(e.bindingIndex = n.bindingStartIndex);
			}
			function bn() {
				const t = Je.lFrame,
					e = null === t ? null : t.child;
				return null === e ? vn(t) : e;
			}
			function vn(t) {
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
			function wn() {
				const t = Je.lFrame;
				return (
					(Je.lFrame = t.parent),
					(t.currentTNode = null),
					(t.lView = null),
					t
				);
			}
			const Sn = wn;
			function En() {
				const t = wn();
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
			function xn() {
				return Je.lFrame.selectedIndex;
			}
			function Cn(t) {
				Je.lFrame.selectedIndex = t;
			}
			function kn() {
				const t = Je.lFrame;
				return qe(t.tView, t.selectedIndex);
			}
			function Tn(t, e) {
				for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
					const e = t.data[n].type.prototype,
						{
							ngAfterContentInit: r,
							ngAfterContentChecked: s,
							ngAfterViewInit: i,
							ngAfterViewChecked: o,
							ngOnDestroy: a,
						} = e;
					r && (t.contentHooks || (t.contentHooks = [])).push(-n, r),
						s &&
							((t.contentHooks || (t.contentHooks = [])).push(
								n,
								s
							),
							(
								t.contentCheckHooks ||
								(t.contentCheckHooks = [])
							).push(n, s)),
						i && (t.viewHooks || (t.viewHooks = [])).push(-n, i),
						o &&
							((t.viewHooks || (t.viewHooks = [])).push(n, o),
							(t.viewCheckHooks || (t.viewCheckHooks = [])).push(
								n,
								o
							)),
						null != a &&
							(t.destroyHooks || (t.destroyHooks = [])).push(
								n,
								a
							);
				}
			}
			function An(t, e, n) {
				Rn(t, e, 3, n);
			}
			function In(t, e, n, r) {
				(3 & t[2]) === n && Rn(t, e, n, r);
			}
			function On(t, e) {
				let n = t[2];
				(3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
			}
			function Rn(t, e, n, r) {
				const s = null != r ? r : -1;
				let i = 0;
				for (
					let o = void 0 !== r ? 65535 & t[18] : 0;
					o < e.length;
					o++
				)
					if ('number' == typeof e[o + 1]) {
						if (((i = e[o]), null != r && i >= r)) break;
					} else
						e[o] < 0 && (t[18] += 65536),
							(i < s || -1 == s) &&
								(Pn(t, n, e, o),
								(t[18] = (4294901760 & t[18]) + o + 2)),
							o++;
			}
			function Pn(t, e, n, r) {
				const s = n[r] < 0,
					i = n[r + 1],
					o = t[s ? -n[r] : n[r]];
				s
					? t[2] >> 11 < t[18] >> 16 &&
					  (3 & t[2]) === e &&
					  ((t[2] += 2048), i.call(o))
					: i.call(o);
			}
			const Nn = -1;
			class Ln {
				constructor(t, e, n) {
					(this.factory = t),
						(this.resolving = !1),
						(this.canSeeViewProviders = e),
						(this.injectImpl = n);
				}
			}
			function Dn(t, e, n) {
				const r = Ue(t);
				let s = 0;
				for (; s < n.length; ) {
					const i = n[s];
					if ('number' == typeof i) {
						if (0 !== i) break;
						s++;
						const o = n[s++],
							a = n[s++],
							l = n[s++];
						r
							? t.setAttribute(e, a, l, o)
							: e.setAttributeNS(o, a, l);
					} else {
						const o = i,
							a = n[++s];
						Fn(o)
							? r && t.setProperty(e, o, a)
							: r
							? t.setAttribute(e, o, a)
							: e.setAttribute(o, a),
							s++;
					}
				}
				return s;
			}
			function Mn(t) {
				return 3 === t || 4 === t || 6 === t;
			}
			function Fn(t) {
				return 64 === t.charCodeAt(0);
			}
			function jn(t, e) {
				if (null === e || 0 === e.length);
				else if (null === t || 0 === t.length) t = e.slice();
				else {
					let n = -1;
					for (let r = 0; r < e.length; r++) {
						const s = e[r];
						'number' == typeof s
							? (n = s)
							: 0 === n ||
							  zn(
									t,
									n,
									s,
									null,
									-1 === n || 2 === n ? e[++r] : null
							  );
					}
				}
				return t;
			}
			function zn(t, e, n, r, s) {
				let i = 0,
					o = t.length;
				if (-1 === e) o = -1;
				else
					for (; i < t.length; ) {
						const n = t[i++];
						if ('number' == typeof n) {
							if (n === e) {
								o = -1;
								break;
							}
							if (n > e) {
								o = i - 1;
								break;
							}
						}
					}
				for (; i < t.length; ) {
					const e = t[i];
					if ('number' == typeof e) break;
					if (e === n) {
						if (null === r)
							return void (null !== s && (t[i + 1] = s));
						if (r === t[i + 1]) return void (t[i + 2] = s);
					}
					i++, null !== r && i++, null !== s && i++;
				}
				-1 !== o && (t.splice(o, 0, e), (i = o + 1)),
					t.splice(i++, 0, n),
					null !== r && t.splice(i++, 0, r),
					null !== s && t.splice(i++, 0, s);
			}
			function Bn(t) {
				return t !== Nn;
			}
			function Un(t) {
				return 32767 & t;
			}
			function Vn(t, e) {
				let n = t >> 16,
					r = e;
				for (; n > 0; ) (r = r[15]), n--;
				return r;
			}
			function Hn(t) {
				return 'string' == typeof t ? t : null == t ? '' : '' + t;
			}
			function $n(t) {
				return 'function' == typeof t
					? t.name || t.toString()
					: 'object' == typeof t &&
					  null != t &&
					  'function' == typeof t.type
					? t.type.name || t.type.toString()
					: Hn(t);
			}
			const qn = (() =>
				(
					('undefined' != typeof requestAnimationFrame &&
						requestAnimationFrame) ||
					setTimeout
				).bind(Ot))();
			function Wn(t) {
				return t instanceof Function ? t() : t;
			}
			let Qn = !0;
			function Kn(t) {
				const e = Qn;
				return (Qn = t), e;
			}
			let Gn = 0;
			function Zn(t, e) {
				const n = Xn(t, e);
				if (-1 !== n) return n;
				const r = e[1];
				r.firstCreatePass &&
					((t.injectorIndex = e.length),
					Yn(r.data, t),
					Yn(e, null),
					Yn(r.blueprint, null));
				const s = Jn(t, e),
					i = t.injectorIndex;
				if (Bn(s)) {
					const t = Un(s),
						n = Vn(s, e),
						r = n[1].data;
					for (let s = 0; s < 8; s++) e[i + s] = n[t + s] | r[t + s];
				}
				return (e[i + 8] = s), i;
			}
			function Yn(t, e) {
				t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
			}
			function Xn(t, e) {
				return -1 === t.injectorIndex ||
					(t.parent && t.parent.injectorIndex === t.injectorIndex) ||
					null === e[t.injectorIndex + 8]
					? -1
					: t.injectorIndex;
			}
			function Jn(t, e) {
				if (t.parent && -1 !== t.parent.injectorIndex)
					return t.parent.injectorIndex;
				let n = 0,
					r = null,
					s = e;
				for (; null !== s; ) {
					const t = s[1],
						e = t.type;
					if (
						((r = 2 === e ? t.declTNode : 1 === e ? s[6] : null),
						null === r)
					)
						return Nn;
					if ((n++, (s = s[15]), -1 !== r.injectorIndex))
						return r.injectorIndex | (n << 16);
				}
				return Nn;
			}
			function tr(t, e, n) {
				!(function (t, e, n) {
					let r;
					'string' == typeof n
						? (r = n.charCodeAt(0) || 0)
						: n.hasOwnProperty(Ft) && (r = n[Ft]),
						null == r && (r = n[Ft] = Gn++);
					const s = 255 & r,
						i = 1 << s,
						o = 64 & s,
						a = 32 & s,
						l = e.data;
					128 & s
						? o
							? a
								? (l[t + 7] |= i)
								: (l[t + 6] |= i)
							: a
							? (l[t + 5] |= i)
							: (l[t + 4] |= i)
						: o
						? a
							? (l[t + 3] |= i)
							: (l[t + 2] |= i)
						: a
						? (l[t + 1] |= i)
						: (l[t] |= i);
				})(t, e, n);
			}
			function er(t, e, n, r = at.Default, s) {
				if (null !== t) {
					const s = (function (t) {
						if ('string' == typeof t) return t.charCodeAt(0) || 0;
						const e = t.hasOwnProperty(Ft) ? t[Ft] : void 0;
						return 'number' == typeof e && e > 0 ? 255 & e : e;
					})(n);
					if ('function' == typeof s) {
						yn(e, t);
						try {
							const t = s();
							if (null != t || r & at.Optional) return t;
							throw new Error(`No provider for ${$n(n)}!`);
						} finally {
							Sn();
						}
					} else if ('number' == typeof s) {
						if (-1 === s) return new lr(t, e);
						let i = null,
							o = Xn(t, e),
							a = Nn,
							l = r & at.Host ? e[16][6] : null;
						for (
							(-1 === o || r & at.SkipSelf) &&
							((a = -1 === o ? Jn(t, e) : e[o + 8]),
							a !== Nn && ar(r, !1)
								? ((i = e[1]), (o = Un(a)), (e = Vn(a, e)))
								: (o = -1));
							-1 !== o;

						) {
							const t = e[1];
							if (or(s, o, t.data)) {
								const t = rr(o, e, n, i, r, l);
								if (t !== nr) return t;
							}
							(a = e[o + 8]),
								a !== Nn &&
								ar(r, e[1].data[o + 8] === l) &&
								or(s, o, e)
									? ((i = t), (o = Un(a)), (e = Vn(a, e)))
									: (o = -1);
						}
					}
				}
				if (
					(r & at.Optional && void 0 === s && (s = null),
					0 == (r & (at.Self | at.Host)))
				) {
					const t = e[9],
						i = Qt(void 0);
					try {
						return t
							? t.get(n, s, r & at.Optional)
							: Yt(n, s, r & at.Optional);
					} finally {
						Qt(i);
					}
				}
				if (r & at.Optional) return s;
				throw new Error(`NodeInjector: NOT_FOUND [${$n(n)}]`);
			}
			const nr = {};
			function rr(t, e, n, r, s, i) {
				const o = e[1],
					a = o.data[t + 8],
					l = sr(
						a,
						o,
						n,
						null == r ? Ie(a) && Qn : r != o && 2 === a.type,
						s & at.Host && i === a
					);
				return null !== l ? ir(e, o, l, a) : nr;
			}
			function sr(t, e, n, r, s) {
				const i = t.providerIndexes,
					o = e.data,
					a = 1048575 & i,
					l = t.directiveStart,
					c = i >> 20,
					u = s ? a + c : t.directiveEnd;
				for (let h = r ? a : a + c; h < u; h++) {
					const t = o[h];
					if ((h < l && n === t) || (h >= l && t.type === n))
						return h;
				}
				if (s) {
					const t = o[l];
					if (t && Re(t) && t.type === n) return l;
				}
				return null;
			}
			function ir(t, e, n, r) {
				let s = t[n];
				const i = e.data;
				if (s instanceof Ln) {
					const o = s;
					if (o.resolving)
						throw new Error('Circular dep for ' + $n(i[n]));
					const a = Kn(o.canSeeViewProviders);
					o.resolving = !0;
					const l = o.injectImpl ? Qt(o.injectImpl) : null;
					yn(t, r);
					try {
						(s = t[n] = o.factory(void 0, i, t, r)),
							e.firstCreatePass &&
								n >= r.directiveStart &&
								(function (t, e, n) {
									const {
										ngOnChanges: r,
										ngOnInit: s,
										ngDoCheck: i,
									} = e.type.prototype;
									if (r) {
										const r = De(e);
										(
											n.preOrderHooks ||
											(n.preOrderHooks = [])
										).push(t, r),
											(
												n.preOrderCheckHooks ||
												(n.preOrderCheckHooks = [])
											).push(t, r);
									}
									s &&
										(
											n.preOrderHooks ||
											(n.preOrderHooks = [])
										).push(0 - t, s),
										i &&
											((
												n.preOrderHooks ||
												(n.preOrderHooks = [])
											).push(t, i),
											(
												n.preOrderCheckHooks ||
												(n.preOrderCheckHooks = [])
											).push(t, i));
								})(n, i[n], e);
					} finally {
						null !== l && Qt(l), Kn(a), (o.resolving = !1), Sn();
					}
				}
				return s;
			}
			function or(t, e, n) {
				const r = 64 & t,
					s = 32 & t;
				let i;
				return (
					(i =
						128 & t
							? r
								? s
									? n[e + 7]
									: n[e + 6]
								: s
								? n[e + 5]
								: n[e + 4]
							: r
							? s
								? n[e + 3]
								: n[e + 2]
							: s
							? n[e + 1]
							: n[e]),
					!!(i & (1 << t))
				);
			}
			function ar(t, e) {
				return !(t & at.Self || (t & at.Host && e));
			}
			class lr {
				constructor(t, e) {
					(this._tNode = t), (this._lView = e);
				}
				get(t, e) {
					return er(this._tNode, this._lView, t, void 0, e);
				}
			}
			function cr(t) {
				const e = t;
				if (Ct(t))
					return () => {
						const t = cr(xt(e));
						return t ? t() : null;
					};
				let n = Se(e);
				if (null === n) {
					const t = pt(e);
					n = t && t.factory;
				}
				return n || null;
			}
			function ur(t) {
				return tt(() => {
					const e = t.prototype.constructor,
						n = e[Mt] || cr(e),
						r = Object.prototype;
					let s = Object.getPrototypeOf(t.prototype).constructor;
					for (; s && s !== r; ) {
						const t = s[Mt] || cr(s);
						if (t && t !== n) return t;
						s = Object.getPrototypeOf(s);
					}
					return t => new t();
				});
			}
			function hr(t) {
				return t.ngDebugContext;
			}
			function dr(t) {
				return t.ngOriginalError;
			}
			function fr(t, ...e) {
				t.error(...e);
			}
			class pr {
				constructor() {
					this._console = console;
				}
				handleError(t) {
					const e = this._findOriginalError(t),
						n = this._findContext(t),
						r = (function (t) {
							return t.ngErrorLogger || fr;
						})(t);
					r(this._console, 'ERROR', t),
						e && r(this._console, 'ORIGINAL ERROR', e),
						n && r(this._console, 'ERROR CONTEXT', n);
				}
				_findContext(t) {
					return t
						? hr(t)
							? hr(t)
							: this._findContext(dr(t))
						: null;
				}
				_findOriginalError(t) {
					let e = dr(t);
					for (; e && dr(e); ) e = dr(e);
					return e;
				}
			}
			class mr {
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
			class gr extends mr {
				getTypeName() {
					return 'HTML';
				}
			}
			class yr extends mr {
				getTypeName() {
					return 'Style';
				}
			}
			class _r extends mr {
				getTypeName() {
					return 'Script';
				}
			}
			class br extends mr {
				getTypeName() {
					return 'URL';
				}
			}
			class vr extends mr {
				getTypeName() {
					return 'ResourceURL';
				}
			}
			function wr(t) {
				return t instanceof mr
					? t.changingThisBreaksApplicationSecurity
					: t;
			}
			function Sr(t, e) {
				const n = Er(t);
				if (null != n && n !== e) {
					if ('ResourceURL' === n && 'URL' === e) return !0;
					throw new Error(
						`Required a safe ${e}, got a ${n} (see http://g.co/ng/security#xss)`
					);
				}
				return n === e;
			}
			function Er(t) {
				return (t instanceof mr && t.getTypeName()) || null;
			}
			let xr = !0,
				Cr = !1;
			function kr() {
				return (Cr = !0), xr;
			}
			class Tr {
				getInertBodyElement(t) {
					t = '<body><remove></remove>' + t;
					try {
						const e = new window.DOMParser().parseFromString(
							t,
							'text/html'
						).body;
						return e.removeChild(e.firstChild), e;
					} catch (e) {
						return null;
					}
				}
			}
			class Ar {
				constructor(t) {
					if (
						((this.defaultDoc = t),
						(this.inertDocument = this.defaultDoc.implementation.createHTMLDocument(
							'sanitization-inert'
						)),
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
					return (
						(n.innerHTML = t),
						this.defaultDoc.documentMode &&
							this.stripCustomNsAttrs(n),
						n
					);
				}
				stripCustomNsAttrs(t) {
					const e = t.attributes;
					for (let r = e.length - 1; 0 < r; r--) {
						const n = e.item(r).name;
						('xmlns:ns1' !== n && 0 !== n.indexOf('ns1:')) ||
							t.removeAttribute(n);
					}
					let n = t.firstChild;
					for (; n; )
						n.nodeType === Node.ELEMENT_NODE &&
							this.stripCustomNsAttrs(n),
							(n = n.nextSibling);
				}
			}
			const Ir = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
				Or = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
			function Rr(t) {
				return (t = String(t)).match(Ir) || t.match(Or)
					? t
					: (kr() &&
							console.warn(
								`WARNING: sanitizing unsafe URL value ${t} (see http://g.co/ng/security#xss)`
							),
					  'unsafe:' + t);
			}
			function Pr(t) {
				const e = {};
				for (const n of t.split(',')) e[n] = !0;
				return e;
			}
			function Nr(...t) {
				const e = {};
				for (const n of t)
					for (const t in n) n.hasOwnProperty(t) && (e[t] = !0);
				return e;
			}
			const Lr = Pr('area,br,col,hr,img,wbr'),
				Dr = Pr('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
				Mr = Pr('rp,rt'),
				Fr = Nr(Mr, Dr),
				jr = Nr(
					Lr,
					Nr(
						Dr,
						Pr(
							'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
						)
					),
					Nr(
						Mr,
						Pr(
							'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
						)
					),
					Fr
				),
				zr = Pr(
					'background,cite,href,itemtype,longdesc,poster,src,xlink:href'
				),
				Br = Pr('srcset'),
				Ur = Nr(
					zr,
					Br,
					Pr(
						'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
					),
					Pr(
						'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
					)
				),
				Vr = Pr('script,style,template');
			class Hr {
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
								e.nodeType === Node.ELEMENT_NODE &&
									this.endElement(e);
								let t = this.checkClobberedElement(
									e,
									e.nextSibling
								);
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
					if (!jr.hasOwnProperty(e))
						return (
							(this.sanitizedSomething = !0),
							!Vr.hasOwnProperty(e)
						);
					this.buf.push('<'), this.buf.push(e);
					const n = t.attributes;
					for (let s = 0; s < n.length; s++) {
						const t = n.item(s),
							e = t.name,
							i = e.toLowerCase();
						if (!Ur.hasOwnProperty(i)) {
							this.sanitizedSomething = !0;
							continue;
						}
						let o = t.value;
						zr[i] && (o = Rr(o)),
							Br[i] &&
								((r = o),
								(o = (r = String(r))
									.split(',')
									.map(t => Rr(t.trim()))
									.join(', '))),
							this.buf.push(' ', e, '="', Wr(o), '"');
					}
					var r;
					return this.buf.push('>'), !0;
				}
				endElement(t) {
					const e = t.nodeName.toLowerCase();
					jr.hasOwnProperty(e) &&
						!Lr.hasOwnProperty(e) &&
						(this.buf.push('</'),
						this.buf.push(e),
						this.buf.push('>'));
				}
				chars(t) {
					this.buf.push(Wr(t));
				}
				checkClobberedElement(t, e) {
					if (
						e &&
						(t.compareDocumentPosition(e) &
							Node.DOCUMENT_POSITION_CONTAINED_BY) ===
							Node.DOCUMENT_POSITION_CONTAINED_BY
					)
						throw new Error(
							'Failed to sanitize html because the element is clobbered: ' +
								t.outerHTML
						);
					return e;
				}
			}
			const $r = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
				qr = /([^\#-~ |!])/g;
			function Wr(t) {
				return t
					.replace(/&/g, '&amp;')
					.replace($r, function (t) {
						return (
							'&#' +
							(1024 * (t.charCodeAt(0) - 55296) +
								(t.charCodeAt(1) - 56320) +
								65536) +
							';'
						);
					})
					.replace(qr, function (t) {
						return '&#' + t.charCodeAt(0) + ';';
					})
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;');
			}
			let Qr;
			function Kr(t, e) {
				let n = null;
				try {
					Qr =
						Qr ||
						(function (t) {
							return (function () {
								try {
									return !!new window.DOMParser().parseFromString(
										'',
										'text/html'
									);
								} catch (t) {
									return !1;
								}
							})()
								? new Tr()
								: new Ar(t);
						})(t);
					let r = e ? String(e) : '';
					n = Qr.getInertBodyElement(r);
					let s = 5,
						i = r;
					do {
						if (0 === s)
							throw new Error(
								'Failed to sanitize html because the input is unstable'
							);
						s--,
							(r = i),
							(i = n.innerHTML),
							(n = Qr.getInertBodyElement(r));
					} while (r !== i);
					const o = new Hr(),
						a = o.sanitizeChildren(Gr(n) || n);
					return (
						kr() &&
							o.sanitizedSomething &&
							console.warn(
								'WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss'
							),
						a
					);
				} finally {
					if (n) {
						const t = Gr(n) || n;
						for (; t.firstChild; ) t.removeChild(t.firstChild);
					}
				}
			}
			function Gr(t) {
				return 'content' in t &&
					(function (t) {
						return (
							t.nodeType === Node.ELEMENT_NODE &&
							'TEMPLATE' === t.nodeName
						);
					})(t)
					? t.content
					: null;
			}
			var Zr = (function (t) {
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
			function Yr(t) {
				const e = (function () {
					const t = en();
					return t && t[12];
				})();
				return e
					? e.sanitize(Zr.HTML, t) || ''
					: Sr(t, 'HTML')
					? wr(t)
					: Kr(Be(), Hn(t));
			}
			function Xr(t, e) {
				t.__ngContext__ = e;
			}
			function Jr(t, e, n) {
				let r = t.length;
				for (;;) {
					const s = t.indexOf(e, n);
					if (-1 === s) return s;
					if (0 === s || t.charCodeAt(s - 1) <= 32) {
						const n = e.length;
						if (s + n === r || t.charCodeAt(s + n) <= 32) return s;
					}
					n = s + 1;
				}
			}
			const ts = 'ng-template';
			function es(t, e, n) {
				let r = 0;
				for (; r < t.length; ) {
					let s = t[r++];
					if (n && 'class' === s) {
						if (((s = t[r]), -1 !== Jr(s.toLowerCase(), e, 0)))
							return !0;
					} else if (1 === s) {
						for (
							;
							r < t.length && 'string' == typeof (s = t[r++]);

						)
							if (s.toLowerCase() === e) return !0;
						return !1;
					}
				}
				return !1;
			}
			function ns(t) {
				return 0 === t.type && t.tagName !== ts;
			}
			function rs(t, e, n) {
				return e === (0 !== t.type || n ? t.tagName : ts);
			}
			function ss(t, e, n) {
				let r = 4;
				const s = t.attrs || [],
					i = (function (t) {
						for (let e = 0; e < t.length; e++)
							if (Mn(t[e])) return e;
						return t.length;
					})(s);
				let o = !1;
				for (let a = 0; a < e.length; a++) {
					const l = e[a];
					if ('number' != typeof l) {
						if (!o)
							if (4 & r) {
								if (
									((r = 2 | (1 & r)),
									('' !== l && !rs(t, l, n)) ||
										('' === l && 1 === e.length))
								) {
									if (is(r)) return !1;
									o = !0;
								}
							} else {
								const c = 8 & r ? l : e[++a];
								if (8 & r && null !== t.attrs) {
									if (!es(t.attrs, c, n)) {
										if (is(r)) return !1;
										o = !0;
									}
									continue;
								}
								const u = os(8 & r ? 'class' : l, s, ns(t), n);
								if (-1 === u) {
									if (is(r)) return !1;
									o = !0;
									continue;
								}
								if ('' !== c) {
									let t;
									t = u > i ? '' : s[u + 1].toLowerCase();
									const e = 8 & r ? t : null;
									if (
										(e && -1 !== Jr(e, c, 0)) ||
										(2 & r && c !== t)
									) {
										if (is(r)) return !1;
										o = !0;
									}
								}
							}
					} else {
						if (!o && !is(r) && !is(l)) return !1;
						if (o && is(l)) continue;
						(o = !1), (r = l | (1 & r));
					}
				}
				return is(r) || o;
			}
			function is(t) {
				return 0 == (1 & t);
			}
			function os(t, e, n, r) {
				if (null === e) return -1;
				let s = 0;
				if (r || !n) {
					let n = !1;
					for (; s < e.length; ) {
						const r = e[s];
						if (r === t) return s;
						if (3 === r || 6 === r) n = !0;
						else {
							if (1 === r || 2 === r) {
								let t = e[++s];
								for (; 'string' == typeof t; ) t = e[++s];
								continue;
							}
							if (4 === r) break;
							if (0 === r) {
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
							const r = t[n];
							if ('number' == typeof r) return -1;
							if (r === e) return n;
							n++;
						}
					return -1;
				})(e, t);
			}
			function as(t, e, n = !1) {
				for (let r = 0; r < e.length; r++)
					if (ss(t, e[r], n)) return !0;
				return !1;
			}
			function ls(t, e) {
				t: for (let n = 0; n < e.length; n++) {
					const r = e[n];
					if (t.length === r.length) {
						for (let e = 0; e < t.length; e++)
							if (t[e] !== r[e]) continue t;
						return !0;
					}
				}
				return !1;
			}
			function cs(t, e) {
				return t ? ':not(' + e.trim() + ')' : e;
			}
			function us(t) {
				let e = t[0],
					n = 1,
					r = 2,
					s = '',
					i = !1;
				for (; n < t.length; ) {
					let o = t[n];
					if ('string' == typeof o)
						if (2 & r) {
							const e = t[++n];
							s +=
								'[' +
								o +
								(e.length > 0 ? '="' + e + '"' : '') +
								']';
						} else 8 & r ? (s += '.' + o) : 4 & r && (s += ' ' + o);
					else
						'' === s || is(o) || ((e += cs(i, s)), (s = '')),
							(r = o),
							(i = i || !is(r));
					n++;
				}
				return '' !== s && (e += cs(i, s)), e;
			}
			const hs = {};
			function ds(t) {
				const e = t[3];
				return Te(e) ? e[3] : e;
			}
			function fs(t) {
				return ms(t[13]);
			}
			function ps(t) {
				return ms(t[4]);
			}
			function ms(t) {
				for (; null !== t && !Te(t); ) t = t[4];
				return t;
			}
			function gs(t) {
				ys(nn(), en(), xn() + t, cn());
			}
			function ys(t, e, n, r) {
				if (!r)
					if (3 == (3 & e[2])) {
						const r = t.preOrderCheckHooks;
						null !== r && An(e, r, n);
					} else {
						const r = t.preOrderHooks;
						null !== r && In(e, r, 0, n);
					}
				Cn(n);
			}
			function _s(t, e) {
				return (t << 17) | (e << 2);
			}
			function bs(t) {
				return (t >> 17) & 32767;
			}
			function vs(t) {
				return 2 | t;
			}
			function ws(t) {
				return (131068 & t) >> 2;
			}
			function Ss(t, e) {
				return (-131069 & t) | (e << 2);
			}
			function Es(t) {
				return 1 | t;
			}
			function xs(t, e) {
				const n = t.contentQueries;
				if (null !== n)
					for (let r = 0; r < n.length; r += 2) {
						const s = n[r],
							i = n[r + 1];
						if (-1 !== i) {
							const n = t.data[i];
							gn(s), n.contentQueries(2, e[i], i);
						}
					}
			}
			function Cs(t, e, n) {
				return Ue(e)
					? e.createElement(t, n)
					: null === n
					? e.createElement(t)
					: e.createElementNS(n, t);
			}
			function ks(t, e, n, r, s, i, o, a, l, c) {
				const u = e.blueprint.slice();
				return (
					(u[0] = s),
					(u[2] = 140 | r),
					Ye(u),
					(u[3] = u[15] = t),
					(u[8] = n),
					(u[10] = o || (t && t[10])),
					(u[11] = a || (t && t[11])),
					(u[12] = l || (t && t[12]) || null),
					(u[9] = c || (t && t[9]) || null),
					(u[6] = i),
					(u[16] = 2 == e.type ? t[16] : u),
					u
				);
			}
			function Ts(t, e, n, r, s) {
				const i = e + xe,
					o =
						t.data[i] ||
						(function (t, e, n, r, s) {
							const i = sn(),
								o = an(),
								a = (t.data[e] = (function (t, e, n, r, s, i) {
									return {
										type: n,
										index: r,
										injectorIndex: e ? e.injectorIndex : -1,
										directiveStart: -1,
										directiveEnd: -1,
										directiveStylingLast: -1,
										propertyBindings: null,
										flags: 0,
										providerIndexes: 0,
										tagName: s,
										attrs: i,
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
								})(0, o ? i : i && i.parent, n, e, r, s));
							return (
								null === t.firstChild && (t.firstChild = a),
								null !== i &&
									(o && null == i.child && null !== a.parent
										? (i.child = a)
										: o || (i.next = a)),
								a
							);
						})(t, i, n, r, s);
				return on(o, !0), o;
			}
			function As(t, e, n) {
				_n(e);
				try {
					const r = t.viewQuery;
					null !== r && si(1, r, n);
					const s = t.template;
					null !== s && Rs(t, e, s, 1, n),
						t.firstCreatePass && (t.firstCreatePass = !1),
						t.staticContentQueries && xs(t, e),
						t.staticViewQueries && si(2, t.viewQuery, n);
					const i = t.components;
					null !== i &&
						(function (t, e) {
							for (let n = 0; n < e.length; n++) Js(t, e[n]);
						})(e, i);
				} catch (r) {
					throw (
						(t.firstCreatePass && (t.incompleteFirstPass = !0), r)
					);
				} finally {
					(e[2] &= -5), En();
				}
			}
			function Is(t, e, n, r) {
				const s = e[2];
				if (256 == (256 & s)) return;
				_n(e);
				const i = cn();
				try {
					Ye(e),
						(Je.lFrame.bindingIndex = t.bindingStartIndex),
						null !== n && Rs(t, e, n, 2, r);
					const o = 3 == (3 & s);
					if (!i)
						if (o) {
							const n = t.preOrderCheckHooks;
							null !== n && An(e, n, null);
						} else {
							const n = t.preOrderHooks;
							null !== n && In(e, n, 0, null), On(e, 0);
						}
					if (
						((function (t) {
							for (let e = fs(t); null !== e; e = ps(e)) {
								if (!e[2]) continue;
								const t = e[9];
								for (let e = 0; e < t.length; e++) {
									const n = t[e],
										r = n[3];
									0 == (1024 & n[2]) && Xe(r, 1),
										(n[2] |= 1024);
								}
							}
						})(e),
						(function (t) {
							for (let e = fs(t); null !== e; e = ps(e))
								for (let t = Ce; t < e.length; t++) {
									const n = e[t],
										r = n[1];
									Ge(n) && Is(r, n, r.template, n[8]);
								}
						})(e),
						null !== t.contentQueries && xs(t, e),
						!i)
					)
						if (o) {
							const n = t.contentCheckHooks;
							null !== n && An(e, n);
						} else {
							const n = t.contentHooks;
							null !== n && In(e, n, 1), On(e, 1);
						}
					!(function (t, e) {
						try {
							const n = t.expandoInstructions;
							if (null !== n) {
								let r = t.expandoStartIndex,
									s = -1,
									i = -1;
								for (let t = 0; t < n.length; t++) {
									const o = n[t];
									'number' == typeof o
										? o <= 0
											? ((i = 0 - o),
											  Cn(i),
											  (r += 9 + n[++t]),
											  (s = r))
											: (r += o)
										: (null !== o && (dn(r, s), o(2, e[s])),
										  s++);
								}
							}
						} finally {
							Cn(-1);
						}
					})(t, e);
					const a = t.components;
					null !== a &&
						(function (t, e) {
							for (let n = 0; n < e.length; n++) Xs(t, e[n]);
						})(e, a);
					const l = t.viewQuery;
					if ((null !== l && si(2, l, r), !i))
						if (o) {
							const n = t.viewCheckHooks;
							null !== n && An(e, n);
						} else {
							const n = t.viewHooks;
							null !== n && In(e, n, 2), On(e, 2);
						}
					!0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
						i || (e[2] &= -73),
						1024 & e[2] && ((e[2] &= -1025), Xe(e[3], -1));
				} finally {
					En();
				}
			}
			function Os(t, e, n, r) {
				const s = e[10],
					i = !cn(),
					o = Ke(e);
				try {
					i && !o && s.begin && s.begin(),
						o && As(t, e, r),
						Is(t, e, n, r);
				} finally {
					i && !o && s.end && s.end();
				}
			}
			function Rs(t, e, n, r, s) {
				const i = xn();
				try {
					Cn(-1),
						2 & r && e.length > xe && ys(t, e, 0, cn()),
						n(r, s);
				} finally {
					Cn(i);
				}
			}
			function Ps(t, e, n) {
				tn() &&
					((function (t, e, n, r) {
						const s = n.directiveStart,
							i = n.directiveEnd;
						t.firstCreatePass || Zn(n, e), Xr(r, e);
						const o = n.initialInputs;
						for (let a = s; a < i; a++) {
							const r = t.data[a],
								i = Re(r);
							i && Ks(e, n, r);
							const l = ir(e, t, a, n);
							Xr(l, e),
								null !== o && Gs(0, a - s, l, r, 0, o),
								i && (We(n.index, e)[8] = l);
						}
					})(t, e, n, $e(n, e)),
					128 == (128 & n.flags) &&
						(function (t, e, n) {
							const r = n.directiveStart,
								s = n.directiveEnd,
								i = t.expandoInstructions,
								o = t.firstCreatePass,
								a = n.index - xe,
								l = Je.lFrame.currentDirectiveIndex;
							try {
								Cn(a);
								for (let n = r; n < s; n++) {
									const r = t.data[n],
										s = e[n];
									fn(n),
										null !== r.hostBindings ||
										0 !== r.hostVars ||
										null !== r.hostAttrs
											? Vs(r, s)
											: o && i.push(null);
								}
							} finally {
								Cn(-1), fn(l);
							}
						})(t, e, n));
			}
			function Ns(t, e, n = $e) {
				const r = e.localNames;
				if (null !== r) {
					let s = e.index + 1;
					for (let i = 0; i < r.length; i += 2) {
						const o = r[i + 1],
							a = -1 === o ? n(e, t) : t[o];
						t[s++] = a;
					}
				}
			}
			function Ls(t) {
				const e = t.tView;
				return null === e || e.incompleteFirstPass
					? (t.tView = Ds(
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
			function Ds(t, e, n, r, s, i, o, a, l, c) {
				const u = xe + r,
					h = u + s,
					d = (function (t, e) {
						const n = [];
						for (let r = 0; r < e; r++) n.push(r < t ? null : hs);
						return n;
					})(u, h),
					f = 'function' == typeof c ? c() : c;
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
					directiveRegistry: 'function' == typeof i ? i() : i,
					pipeRegistry: 'function' == typeof o ? o() : o,
					firstChild: null,
					schemas: l,
					consts: f,
					incompleteFirstPass: !1,
				});
			}
			function Ms(t, e, n, r) {
				const s = oi(e);
				s.push(n),
					t.firstCreatePass &&
						(function (t) {
							return t.cleanup || (t.cleanup = []);
						})(t).push(r, s.length - 1);
			}
			function Fs(t, e, n) {
				for (let r in t)
					if (t.hasOwnProperty(r)) {
						const s = t[r];
						(n = null === n ? {} : n).hasOwnProperty(r)
							? n[r].push(e, s)
							: (n[r] = [e, s]);
					}
				return n;
			}
			function js(t, e, n, r, s, i, o, a) {
				const l = $e(e, n);
				let c,
					u = e.inputs;
				var h;
				!a && null != u && (c = u[r])
					? (ci(t, n, c, r, s),
					  Ie(e) &&
							(function (t, e) {
								const n = We(e, t);
								16 & n[2] || (n[2] |= 64);
							})(n, e.index))
					: 2 === e.type &&
					  ((r =
							'class' === (h = r)
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
					  (s = null != o ? o(s, e.tagName || '', r) : s),
					  Ue(i)
							? i.setProperty(l, r, s)
							: Fn(r) ||
							  (l.setProperty
									? l.setProperty(r, s)
									: (l[r] = s)));
			}
			function zs(t, e, n, r) {
				let s = !1;
				if (tn()) {
					const i = (function (t, e, n) {
							const r = t.directiveRegistry;
							let s = null;
							if (r)
								for (let i = 0; i < r.length; i++) {
									const o = r[i];
									as(n, o.selectors, !1) &&
										(s || (s = []),
										tr(Zn(n, e), t, o.type),
										Re(o)
											? ($s(t, n), s.unshift(o))
											: s.push(o));
								}
							return s;
						})(t, e, n),
						o = null === r ? null : { '': -1 };
					if (null !== i) {
						let r = 0;
						(s = !0), Ws(n, t.data.length, i.length);
						for (let t = 0; t < i.length; t++) {
							const e = i[t];
							e.providersResolver && e.providersResolver(e);
						}
						Hs(t, n, i.length);
						let a = !1,
							l = !1;
						for (let s = 0; s < i.length; s++) {
							const c = i[s];
							(n.mergedAttrs = jn(n.mergedAttrs, c.hostAttrs)),
								Qs(t, e, c),
								qs(t.data.length - 1, c, o),
								null !== c.contentQueries && (n.flags |= 8),
								(null === c.hostBindings &&
									null === c.hostAttrs &&
									0 === c.hostVars) ||
									(n.flags |= 128);
							const u = c.type.prototype;
							!a &&
								(u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
								((
									t.preOrderHooks || (t.preOrderHooks = [])
								).push(n.index - xe),
								(a = !0)),
								l ||
									(!u.ngOnChanges && !u.ngDoCheck) ||
									((
										t.preOrderCheckHooks ||
										(t.preOrderCheckHooks = [])
									).push(n.index - xe),
									(l = !0)),
								Bs(t, c),
								(r += c.hostVars);
						}
						!(function (t, e) {
							const n = e.directiveEnd,
								r = t.data,
								s = e.attrs,
								i = [];
							let o = null,
								a = null;
							for (let l = e.directiveStart; l < n; l++) {
								const t = r[l],
									n = t.inputs,
									c = null === s || ns(e) ? null : Zs(n, s);
								i.push(c),
									(o = Fs(n, l, o)),
									(a = Fs(t.outputs, l, a));
							}
							null !== o &&
								(o.hasOwnProperty('class') && (e.flags |= 16),
								o.hasOwnProperty('style') && (e.flags |= 32)),
								(e.initialInputs = i),
								(e.inputs = o),
								(e.outputs = a);
						})(t, n),
							Us(t, e, r);
					}
					o &&
						(function (t, e, n) {
							if (e) {
								const r = (t.localNames = []);
								for (let t = 0; t < e.length; t += 2) {
									const s = n[e[t + 1]];
									if (null == s)
										throw new Error(
											`Export of name '${
												e[t + 1]
											}' not found!`
										);
									r.push(e[t], s);
								}
							}
						})(n, r, o);
				}
				return (n.mergedAttrs = jn(n.mergedAttrs, n.attrs)), s;
			}
			function Bs(t, e) {
				const n = t.expandoInstructions;
				n.push(e.hostBindings), 0 !== e.hostVars && n.push(e.hostVars);
			}
			function Us(t, e, n) {
				for (let r = 0; r < n; r++)
					e.push(hs), t.blueprint.push(hs), t.data.push(null);
			}
			function Vs(t, e) {
				null !== t.hostBindings && t.hostBindings(1, e);
			}
			function Hs(t, e, n) {
				const r = xe - e.index,
					s = t.data.length - (1048575 & e.providerIndexes);
				(t.expandoInstructions || (t.expandoInstructions = [])).push(
					r,
					s,
					n
				);
			}
			function $s(t, e) {
				(e.flags |= 2),
					(t.components || (t.components = [])).push(e.index);
			}
			function qs(t, e, n) {
				if (n) {
					if (e.exportAs)
						for (let r = 0; r < e.exportAs.length; r++)
							n[e.exportAs[r]] = t;
					Re(e) && (n[''] = t);
				}
			}
			function Ws(t, e, n) {
				(t.flags |= 1),
					(t.directiveStart = e),
					(t.directiveEnd = e + n),
					(t.providerIndexes = e);
			}
			function Qs(t, e, n) {
				t.data.push(n);
				const r = n.factory || (n.factory = Se(n.type)),
					s = new Ln(r, Re(n), null);
				t.blueprint.push(s), e.push(s);
			}
			function Ks(t, e, n) {
				const r = $e(e, t),
					s = Ls(n),
					i = t[10],
					o = ti(
						t,
						ks(
							t,
							s,
							null,
							n.onPush ? 64 : 16,
							r,
							e,
							i,
							i.createRenderer(r, n),
							null,
							null
						)
					);
				t[e.index] = o;
			}
			function Gs(t, e, n, r, s, i) {
				const o = i[e];
				if (null !== o) {
					const t = r.setInput;
					for (let e = 0; e < o.length; ) {
						const s = o[e++],
							i = o[e++],
							a = o[e++];
						null !== t ? r.setInput(n, a, s, i) : (n[i] = a);
					}
				}
			}
			function Zs(t, e) {
				let n = null,
					r = 0;
				for (; r < e.length; ) {
					const s = e[r];
					if (0 !== s)
						if (5 !== s) {
							if ('number' == typeof s) break;
							t.hasOwnProperty(s) &&
								(null === n && (n = []),
								n.push(s, t[s], e[r + 1])),
								(r += 2);
						} else r += 2;
					else r += 4;
				}
				return n;
			}
			function Ys(t, e, n, r) {
				return new Array(t, !0, !1, e, null, 0, r, n, null, null);
			}
			function Xs(t, e) {
				const n = We(e, t);
				if (Ge(n)) {
					const t = n[1];
					80 & n[2]
						? Is(t, n, t.template, n[8])
						: n[5] > 0 &&
						  (function t(e) {
								for (let r = fs(e); null !== r; r = ps(r))
									for (let e = Ce; e < r.length; e++) {
										const n = r[e];
										if (1024 & n[2]) {
											const t = n[1];
											Is(t, n, t.template, n[8]);
										} else n[5] > 0 && t(n);
									}
								const n = e[1].components;
								if (null !== n)
									for (let r = 0; r < n.length; r++) {
										const s = We(n[r], e);
										Ge(s) && s[5] > 0 && t(s);
									}
						  })(n);
				}
			}
			function Js(t, e) {
				const n = We(e, t),
					r = n[1];
				!(function (t, e) {
					for (let n = e.length; n < t.blueprint.length; n++)
						e.push(t.blueprint[n]);
				})(r, n),
					As(r, n, n[8]);
			}
			function ti(t, e) {
				return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
			}
			function ei(t) {
				for (; t; ) {
					t[2] |= 64;
					const e = ds(t);
					if (Pe(t) && !e) return t;
					t = e;
				}
				return null;
			}
			function ni(t, e, n) {
				const r = e[10];
				r.begin && r.begin();
				try {
					Is(t, e, t.template, n);
				} catch (s) {
					throw (li(e, s), s);
				} finally {
					r.end && r.end();
				}
			}
			function ri(t) {
				!(function (t) {
					for (let e = 0; e < t.components.length; e++) {
						const n = t.components[e],
							r = Qe(n),
							s = r[1];
						Os(s, r, s.template, n);
					}
				})(t[8]);
			}
			function si(t, e, n) {
				gn(0), e(t, n);
			}
			const ii = (() => Promise.resolve(null))();
			function oi(t) {
				return t[7] || (t[7] = []);
			}
			function ai(t, e, n) {
				return (
					(null === t || Re(t)) &&
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
			function li(t, e) {
				const n = t[9],
					r = n ? n.get(pr, null) : null;
				r && r.handleError(e);
			}
			function ci(t, e, n, r, s) {
				for (let i = 0; i < n.length; ) {
					const o = n[i++],
						a = n[i++],
						l = e[o],
						c = t.data[o];
					null !== c.setInput ? c.setInput(l, s, r, a) : (l[a] = s);
				}
			}
			function ui(t, e, n, r, s) {
				if (null != r) {
					let i,
						o = !1;
					Te(r) ? (i = r) : ke(r) && ((o = !0), (r = r[0]));
					const a = He(r);
					0 === t && null !== n
						? null == s
							? yi(e, n, a)
							: gi(e, n, a, s || null)
						: 1 === t && null !== n
						? gi(e, n, a, s || null)
						: 2 === t
						? (function (t, e, n) {
								const r = bi(t, e);
								r &&
									(function (t, e, n, r) {
										Ue(t)
											? t.removeChild(e, n, r)
											: e.removeChild(n);
									})(t, r, e, n);
						  })(e, a, o)
						: 3 === t && e.destroyNode(a),
						null != i &&
							(function (t, e, n, r, s) {
								const i = n[7];
								i !== He(n) && ui(e, t, r, i, s);
								for (let o = Ce; o < n.length; o++) {
									const s = n[o];
									Ei(s[1], s, t, e, r, i);
								}
							})(e, t, i, n, s);
				}
			}
			function hi(t, e) {
				const n = t[9],
					r = n.indexOf(e),
					s = e[3];
				1024 & e[2] && ((e[2] &= -1025), Xe(s, -1)), n.splice(r, 1);
			}
			function di(t, e) {
				if (t.length <= Ce) return;
				const n = Ce + e,
					r = t[n];
				if (r) {
					const i = r[17];
					null !== i && i !== t && hi(i, r),
						e > 0 && (t[n - 1][4] = r[4]);
					const o = se(t, Ce + e);
					Ei(r[1], (s = r), s[11], 2, null, null),
						(s[0] = null),
						(s[6] = null);
					const a = o[19];
					null !== a && a.detachView(o[1]),
						(r[3] = null),
						(r[4] = null),
						(r[2] &= -129);
				}
				var s;
				return r;
			}
			function fi(t, e) {
				if (!(256 & e[2])) {
					const n = e[11];
					Ue(n) && n.destroyNode && Ei(t, e, n, 3, null, null),
						(function (t) {
							let e = t[13];
							if (!e) return pi(t[1], t);
							for (; e; ) {
								let n = null;
								if (ke(e)) n = e[13];
								else {
									const t = e[10];
									t && (n = t);
								}
								if (!n) {
									for (; e && !e[4] && e !== t; )
										ke(e) && pi(e[1], e), (e = e[3]);
									null === e && (e = t),
										ke(e) && pi(e[1], e),
										(n = e && e[4]);
								}
								e = n;
							}
						})(e);
				}
			}
			function pi(t, e) {
				if (!(256 & e[2])) {
					(e[2] &= -129),
						(e[2] |= 256),
						(function (t, e) {
							let n;
							if (null != t && null != (n = t.destroyHooks))
								for (let r = 0; r < n.length; r += 2) {
									const t = e[n[r]];
									if (!(t instanceof Ln)) {
										const e = n[r + 1];
										if (Array.isArray(e))
											for (
												let n = 0;
												n < e.length;
												n += 2
											)
												e[n + 1].call(t[e[n]]);
										else e.call(t);
									}
								}
						})(t, e),
						(function (t, e) {
							const n = t.cleanup;
							if (null !== n) {
								const t = e[7];
								for (let r = 0; r < n.length - 1; r += 2)
									if ('string' == typeof n[r]) {
										const s = n[r + 1],
											i =
												'function' == typeof s
													? s(e)
													: He(e[s]),
											o = t[n[r + 2]],
											a = n[r + 3];
										'boolean' == typeof a
											? i.removeEventListener(n[r], o, a)
											: a >= 0
											? t[a]()
											: t[-a].unsubscribe(),
											(r += 2);
									} else n[r].call(t[n[r + 1]]);
								e[7] = null;
							}
						})(t, e),
						1 === e[1].type && Ue(e[11]) && e[11].destroy();
					const n = e[17];
					if (null !== n && Te(e[3])) {
						n !== e[3] && hi(n, e);
						const r = e[19];
						null !== r && r.detachView(t);
					}
				}
			}
			function mi(t, e, n) {
				let r = e.parent;
				for (; null != r && (3 === r.type || 4 === r.type); )
					r = (e = r).parent;
				if (null === r) return n[0];
				if (e && 4 === e.type && 4 & e.flags)
					return $e(e, n).parentNode;
				if (2 & r.flags) {
					const e = t.data,
						n = e[e[r.index].directiveStart].encapsulation;
					if (n !== ue.ShadowDom && n !== ue.Native) return null;
				}
				return $e(r, n);
			}
			function gi(t, e, n, r) {
				Ue(t) ? t.insertBefore(e, n, r) : e.insertBefore(n, r, !0);
			}
			function yi(t, e, n) {
				Ue(t) ? t.appendChild(e, n) : e.appendChild(n);
			}
			function _i(t, e, n, r) {
				null !== r ? gi(t, e, n, r) : yi(t, e, n);
			}
			function bi(t, e) {
				return Ue(t) ? t.parentNode(e) : e.parentNode;
			}
			function vi(t, e) {
				return 3 === t.type || 4 === t.type ? $e(t, e) : null;
			}
			function wi(t, e, n, r) {
				const s = mi(t, r, e);
				if (null != s) {
					const t = e[11],
						i = vi(r.parent || e[6], e);
					if (Array.isArray(n))
						for (let e = 0; e < n.length; e++) _i(t, s, n[e], i);
					else _i(t, s, n, i);
				}
			}
			function Si(t, e, n, r, s, i, o) {
				for (; null != n; ) {
					const a = r[n.index],
						l = n.type;
					o && 0 === e && (a && Xr(He(a), r), (n.flags |= 4)),
						64 != (64 & n.flags) &&
							(3 === l || 4 === l
								? (Si(t, e, n.child, r, s, i, !1),
								  ui(e, t, s, a, i))
								: 1 === l
								? xi(t, e, r, n, s, i)
								: ui(e, t, s, a, i)),
						(n = o ? n.projectionNext : n.next);
				}
			}
			function Ei(t, e, n, r, s, i) {
				Si(n, r, t.firstChild, e, s, i, !1);
			}
			function xi(t, e, n, r, s, i) {
				const o = n[16],
					a = o[6].projection[r.projection];
				if (Array.isArray(a))
					for (let l = 0; l < a.length; l++) ui(e, t, s, a[l], i);
				else Si(t, e, a, o[3], s, i, !0);
			}
			function Ci(t, e, n) {
				Ue(t) ? t.setAttribute(e, 'style', n) : (e.style.cssText = n);
			}
			function ki(t, e, n) {
				Ue(t)
					? '' === n
						? t.removeAttribute(e, 'class')
						: t.setAttribute(e, 'class', n)
					: (e.className = n);
			}
			class Ti {
				constructor(t, e) {
					(this._lView = t),
						(this._cdRefInjectingView = e),
						(this._appRef = null),
						(this._viewContainerRef = null);
				}
				get rootNodes() {
					const t = this._lView,
						e = t[1];
					return (function t(e, n, r, s, i = !1) {
						for (; null !== r; ) {
							const o = n[r.index];
							if ((null !== o && s.push(He(o)), Te(o)))
								for (let e = Ce; e < o.length; e++) {
									const n = o[e],
										r = n[1].firstChild;
									null !== r && t(n[1], n, r, s);
								}
							const a = r.type;
							if (3 === a || 4 === a) t(e, n, r.child, s);
							else if (1 === a) {
								const e = n[16],
									i = e[6].projection[r.projection];
								if (Array.isArray(i)) s.push(...i);
								else {
									const n = ds(e);
									t(n[1], n, i, s, !0);
								}
							}
							r = i ? r.projectionNext : r.next;
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
						t > -1 && this._viewContainerRef.detach(t),
							(this._viewContainerRef = null);
					}
					fi(this._lView[1], this._lView);
				}
				onDestroy(t) {
					Ms(this._lView[1], this._lView, null, t);
				}
				markForCheck() {
					ei(this._cdRefInjectingView || this._lView);
				}
				detach() {
					this._lView[2] &= -129;
				}
				reattach() {
					this._lView[2] |= 128;
				}
				detectChanges() {
					ni(this._lView[1], this._lView, this.context);
				}
				checkNoChanges() {
					!(function (t, e, n) {
						un(!0);
						try {
							ni(t, e, n);
						} finally {
							un(!1);
						}
					})(this._lView[1], this._lView, this.context);
				}
				attachToViewContainerRef(t) {
					if (this._appRef)
						throw new Error(
							'This view is already attached directly to the ApplicationRef!'
						);
					this._viewContainerRef = t;
				}
				detachFromAppRef() {
					var t;
					(this._appRef = null),
						Ei(
							this._lView[1],
							(t = this._lView),
							t[11],
							2,
							null,
							null
						);
				}
				attachToAppRef(t) {
					if (this._viewContainerRef)
						throw new Error(
							'This view is already attached to a ViewContainer!'
						);
					this._appRef = t;
				}
			}
			class Ai extends Ti {
				constructor(t) {
					super(t), (this._view = t);
				}
				detectChanges() {
					ri(this._view);
				}
				checkNoChanges() {
					!(function (t) {
						un(!0);
						try {
							ri(t);
						} finally {
							un(!1);
						}
					})(this._view);
				}
				get context() {
					return null;
				}
			}
			let Ii, Oi, Ri;
			function Pi(t, e, n) {
				return Ii || (Ii = class extends t {}), new Ii($e(e, n));
			}
			function Ni(t, e, n, r) {
				return (
					Oi ||
						(Oi = class extends t {
							constructor(t, e, n) {
								super(),
									(this._declarationView = t),
									(this._declarationTContainer = e),
									(this.elementRef = n);
							}
							createEmbeddedView(t) {
								const e = this._declarationTContainer.tViews,
									n = ks(
										this._declarationView,
										e,
										t,
										16,
										null,
										e.declTNode,
										null,
										null,
										null,
										null
									);
								n[17] = this._declarationView[
									this._declarationTContainer.index
								];
								const r = this._declarationView[19];
								return (
									null !== r &&
										(n[19] = r.createEmbeddedView(e)),
									As(e, n, t),
									new Ti(n)
								);
							}
						}),
					0 === n.type ? new Oi(r, n, Pi(e, n, r)) : null
				);
			}
			function Li(t, e, n, r) {
				let s;
				Ri ||
					(Ri = class extends t {
						constructor(t, e, n) {
							super(),
								(this._lContainer = t),
								(this._hostTNode = e),
								(this._hostView = n);
						}
						get element() {
							return Pi(e, this._hostTNode, this._hostView);
						}
						get injector() {
							return new lr(this._hostTNode, this._hostView);
						}
						get parentInjector() {
							const t = Jn(this._hostTNode, this._hostView);
							if (Bn(t)) {
								const e = Vn(t, this._hostView),
									n = Un(t);
								return new lr(e[1].data[n + 8], e);
							}
							return new lr(null, this._hostView);
						}
						clear() {
							for (; this.length > 0; )
								this.remove(this.length - 1);
						}
						get(t) {
							return (
								(null !== this._lContainer[8] &&
									this._lContainer[8][t]) ||
								null
							);
						}
						get length() {
							return this._lContainer.length - Ce;
						}
						createEmbeddedView(t, e, n) {
							const r = t.createEmbeddedView(e || {});
							return this.insert(r, n), r;
						}
						createComponent(t, e, n, r, s) {
							const i = n || this.parentInjector;
							if (!s && null == t.ngModule && i) {
								const t = i.get(te, null);
								t && (s = t);
							}
							const o = t.create(i, r, void 0, s);
							return this.insert(o.hostView, e), o;
						}
						insert(t, e) {
							const n = t._lView,
								r = n[1];
							if (t.destroyed)
								throw new Error(
									'Cannot insert a destroyed View in a ViewContainer!'
								);
							if ((this.allocateContainerIfNeeded(), Te(n[3]))) {
								const e = this.indexOf(t);
								if (-1 !== e) this.detach(e);
								else {
									const e = n[3],
										r = new Ri(e, e[6], e[3]);
									r.detach(r.indexOf(t));
								}
							}
							const s = this._adjustIndex(e),
								i = this._lContainer;
							!(function (t, e, n, r) {
								const s = Ce + r,
									i = n.length;
								r > 0 && (n[s - 1][4] = e),
									r < i - Ce
										? ((e[4] = n[s]), re(n, Ce + r, e))
										: (n.push(e), (e[4] = null)),
									(e[3] = n);
								const o = e[17];
								null !== o &&
									n !== o &&
									(function (t, e) {
										const n = t[9];
										e[16] !== e[3][3][16] && (t[2] = !0),
											null === n
												? (t[9] = [e])
												: n.push(e);
									})(o, e);
								const a = e[19];
								null !== a && a.insertView(t), (e[2] |= 128);
							})(r, n, i, s);
							const o = (function t(e, n) {
									const r = Ce + e + 1;
									if (r < n.length) {
										const e = n[r],
											s = e[1].firstChild;
										if (null !== s)
											return (function e(n, r) {
												if (null !== r) {
													const s = r.type;
													if (2 === s)
														return $e(r, n);
													if (0 === s)
														return t(
															-1,
															n[r.index]
														);
													if (3 === s || 4 === s) {
														const s = r.child;
														if (null !== s)
															return e(n, s);
														{
															const e =
																n[r.index];
															return Te(e)
																? t(-1, e)
																: He(e);
														}
													}
													{
														const t = n[16],
															s = t[6],
															i = ds(t),
															o =
																s.projection[
																	r.projection
																];
														return null != o
															? e(i, o)
															: e(n, r.next);
													}
												}
												return null;
											})(e, s);
									}
									return n[7];
								})(s, i),
								a = n[11],
								l = bi(a, i[7]);
							return (
								null !== l &&
									(function (t, e, n, r, s, i) {
										(r[0] = s),
											(r[6] = e),
											Ei(t, r, n, 1, s, i);
									})(r, i[6], a, n, l, o),
								t.attachToViewContainerRef(this),
								re(i[8], s, t),
								t
							);
						}
						move(t, e) {
							if (t.destroyed)
								throw new Error(
									'Cannot move a destroyed View in a ViewContainer!'
								);
							return this.insert(t, e);
						}
						indexOf(t) {
							const e = this._lContainer[8];
							return null !== e ? e.indexOf(t) : -1;
						}
						remove(t) {
							this.allocateContainerIfNeeded();
							const e = this._adjustIndex(t, -1),
								n = di(this._lContainer, e);
							n && (se(this._lContainer[8], e), fi(n[1], n));
						}
						detach(t) {
							this.allocateContainerIfNeeded();
							const e = this._adjustIndex(t, -1),
								n = di(this._lContainer, e);
							return n && null != se(this._lContainer[8], e)
								? new Ti(n)
								: null;
						}
						_adjustIndex(t, e = 0) {
							return null == t ? this.length + e : t;
						}
						allocateContainerIfNeeded() {
							null === this._lContainer[8] &&
								(this._lContainer[8] = []);
						}
					});
				const i = r[n.index];
				if (Te(i)) s = i;
				else {
					let t;
					if (3 === n.type) t = He(i);
					else if (((t = r[11].createComment('')), Pe(r))) {
						const e = r[11],
							s = $e(n, r);
						gi(
							e,
							bi(e, s),
							t,
							(function (t, e) {
								return Ue(t) ? t.nextSibling(e) : e.nextSibling;
							})(e, s)
						);
					} else wi(r[1], r, t, n);
					(r[n.index] = s = Ys(i, r, t, n)), ti(r, s);
				}
				return new Ri(s, n, r);
			}
			let Di = (() => {
				class t {}
				return (t.__NG_ELEMENT_ID__ = () => Mi()), t;
			})();
			const Mi = function (t = !1) {
					return (function (t, e, n) {
						if (!n && Ie(t)) {
							const n = We(t.index, e);
							return new Ti(n, n);
						}
						return 2 === t.type ||
							0 === t.type ||
							3 === t.type ||
							4 === t.type
							? new Ti(e[16], e)
							: null;
					})(sn(), en(), t);
				},
				Fi = Function,
				ji = new jt('Set Injector scope.'),
				zi = {},
				Bi = {},
				Ui = [];
			let Vi = void 0;
			function Hi() {
				return void 0 === Vi && (Vi = new Jt()), Vi;
			}
			function $i(t, e = null, n = null, r) {
				return new qi(t, n, e || Hi(), r);
			}
			class qi {
				constructor(t, e, n, r = null) {
					(this.parent = n),
						(this.records = new Map()),
						(this.injectorDefTypes = new Set()),
						(this.onDestroy = new Set()),
						(this._destroyed = !1);
					const s = [];
					e && ne(e, n => this.processProvider(n, t, e)),
						ne([t], t => this.processInjectorType(t, [], s)),
						this.records.set(zt, Ki(void 0, this));
					const i = this.records.get(ji);
					(this.scope = null != i ? i.value : null),
						(this.source =
							r || ('object' == typeof t ? null : vt(t)));
				}
				get destroyed() {
					return this._destroyed;
				}
				destroy() {
					this.assertNotDestroyed(), (this._destroyed = !0);
					try {
						this.onDestroy.forEach(t => t.ngOnDestroy());
					} finally {
						this.records.clear(),
							this.onDestroy.clear(),
							this.injectorDefTypes.clear();
					}
				}
				get(t, e = Bt, n = at.Default) {
					this.assertNotDestroyed();
					const r = Wt(this);
					try {
						if (!(n & at.SkipSelf)) {
							let e = this.records.get(t);
							if (void 0 === e) {
								const n =
									('function' == typeof (s = t) ||
										('object' == typeof s &&
											s instanceof jt)) &&
									dt(t);
								(e =
									n && this.injectableDefInScope(n)
										? Ki(Wi(t), zi)
										: null),
									this.records.set(t, e);
							}
							if (null != e) return this.hydrate(t, e);
						}
						return (n & at.Self ? Hi() : this.parent).get(
							t,
							(e = n & at.Optional && e === Bt ? null : e)
						);
					} catch (i) {
						if ('NullInjectorError' === i.name) {
							if (
								((i.ngTempTokenPath =
									i.ngTempTokenPath || []).unshift(vt(t)),
								r)
							)
								throw i;
							return (function (t, e, n, r) {
								const s = t.ngTempTokenPath;
								throw (
									(e[Vt] && s.unshift(e[Vt]),
									(t.message = (function (t, e, n, r = null) {
										t =
											t &&
											'\n' === t.charAt(0) &&
											'\u0275' == t.charAt(1)
												? t.substr(2)
												: t;
										let s = vt(e);
										if (Array.isArray(e))
											s = e.map(vt).join(' -> ');
										else if ('object' == typeof e) {
											let t = [];
											for (let n in e)
												if (e.hasOwnProperty(n)) {
													let r = e[n];
													t.push(
														n +
															':' +
															('string' ==
															typeof r
																? JSON.stringify(
																		r
																  )
																: vt(r))
													);
												}
											s = `{${t.join(', ')}}`;
										}
										return `${n}${
											r ? '(' + r + ')' : ''
										}[${s}]: ${t.replace(Ut, '\n  ')}`;
									})('\n' + t.message, s, n, r)),
									(t.ngTokenPath = s),
									(t.ngTempTokenPath = null),
									t)
								);
							})(i, t, 'R3InjectorError', this.source);
						}
						throw i;
					} finally {
						Wt(r);
					}
					var s;
				}
				_resolveInjectorDefTypes() {
					this.injectorDefTypes.forEach(t => this.get(t));
				}
				toString() {
					const t = [];
					return (
						this.records.forEach((e, n) => t.push(vt(n))),
						`R3Injector[${t.join(', ')}]`
					);
				}
				assertNotDestroyed() {
					if (this._destroyed)
						throw new Error('Injector has already been destroyed.');
				}
				processInjectorType(t, e, n) {
					if (!(t = xt(t))) return !1;
					let r = pt(t);
					const s = (null == r && t.ngModule) || void 0,
						i = void 0 === s ? t : s,
						o = -1 !== n.indexOf(i);
					if ((void 0 !== s && (r = pt(s)), null == r)) return !1;
					if (null != r.imports && !o) {
						let t;
						n.push(i);
						try {
							ne(r.imports, r => {
								this.processInjectorType(r, e, n) &&
									(void 0 === t && (t = []), t.push(r));
							});
						} finally {
						}
						if (void 0 !== t)
							for (let e = 0; e < t.length; e++) {
								const { ngModule: n, providers: r } = t[e];
								ne(r, t => this.processProvider(t, n, r || Ui));
							}
					}
					this.injectorDefTypes.add(i),
						this.records.set(i, Ki(r.factory, zi));
					const a = r.providers;
					if (null != a && !o) {
						const e = t;
						ne(a, t => this.processProvider(t, e, a));
					}
					return void 0 !== s && void 0 !== t.providers;
				}
				processProvider(t, e, n) {
					let r = Zi((t = xt(t))) ? t : xt(t && t.provide);
					const s = (function (t, e, n) {
						return Gi(t) ? Ki(void 0, t.useValue) : Ki(Qi(t), zi);
					})(t);
					if (Zi(t) || !0 !== t.multi) this.records.get(r);
					else {
						let e = this.records.get(r);
						e ||
							((e = Ki(void 0, zi, !0)),
							(e.factory = () => Xt(e.multi)),
							this.records.set(r, e)),
							(r = t),
							e.multi.push(t);
					}
					this.records.set(r, s);
				}
				hydrate(t, e) {
					var n;
					return (
						e.value === zi &&
							((e.value = Bi), (e.value = e.factory())),
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
							? 'any' === t.providedIn ||
							  t.providedIn === this.scope
							: this.injectorDefTypes.has(t.providedIn))
					);
				}
			}
			function Wi(t) {
				const e = dt(t),
					n = null !== e ? e.factory : Se(t);
				if (null !== n) return n;
				const r = pt(t);
				if (null !== r) return r.factory;
				if (t instanceof jt)
					throw new Error(
						`Token ${vt(t)} is missing a \u0275prov definition.`
					);
				if (t instanceof Function)
					return (function (t) {
						const e = t.length;
						if (e > 0) {
							const n = ie(e, '?');
							throw new Error(
								`Can't resolve all parameters for ${vt(
									t
								)}: (${n.join(', ')}).`
							);
						}
						const n = (function (t) {
							const e =
								t && (t[mt] || t[_t] || (t[yt] && t[yt]()));
							if (e) {
								const n = (function (t) {
									if (t.hasOwnProperty('name')) return t.name;
									const e = ('' + t).match(
										/^function\s*([^\s(]+)/
									);
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
			function Qi(t, e, n) {
				let r = void 0;
				if (Zi(t)) {
					const e = xt(t);
					return Se(e) || Wi(e);
				}
				if (Gi(t)) r = () => xt(t.useValue);
				else if ((s = t) && s.useFactory)
					r = () => t.useFactory(...Xt(t.deps || []));
				else if (
					(function (t) {
						return !(!t || !t.useExisting);
					})(t)
				)
					r = () => Gt(xt(t.useExisting));
				else {
					const e = xt(t && (t.useClass || t.provide));
					if (
						!(function (t) {
							return !!t.deps;
						})(t)
					)
						return Se(e) || Wi(e);
					r = () => new e(...Xt(t.deps));
				}
				var s;
				return r;
			}
			function Ki(t, e, n = !1) {
				return { factory: t, value: e, multi: n ? [] : void 0 };
			}
			function Gi(t) {
				return null !== t && 'object' == typeof t && Ht in t;
			}
			function Zi(t) {
				return 'function' == typeof t;
			}
			const Yi = function (t, e, n) {
				return (function (t, e = null, n = null, r) {
					const s = $i(t, e, n, r);
					return s._resolveInjectorDefTypes(), s;
				})({ name: n }, e, t, n);
			};
			let Xi = (() => {
				class t {
					static create(t, e) {
						return Array.isArray(t)
							? Yi(t, e, '')
							: Yi(t.providers, t.parent, t.name || '');
					}
				}
				return (
					(t.THROW_IF_NOT_FOUND = Bt),
					(t.NULL = new Jt()),
					(t.ɵprov = ut({
						token: t,
						providedIn: 'any',
						factory: () => Gt(zt),
					})),
					(t.__NG_ELEMENT_ID__ = -1),
					t
				);
			})();
			const Ji = new jt('AnalyzeForEntryComponents');
			function to(t, e, n) {
				let r = n ? t.styles : null,
					s = n ? t.classes : null,
					i = 0;
				if (null !== e)
					for (let o = 0; o < e.length; o++) {
						const t = e[o];
						'number' == typeof t
							? (i = t)
							: 1 == i
							? (s = wt(s, t))
							: 2 == i && (r = wt(r, t + ': ' + e[++o] + ';'));
					}
				n ? (t.styles = r) : (t.stylesWithoutHost = r),
					n ? (t.classes = s) : (t.classesWithoutHost = s);
			}
			function eo(t, e) {
				const n = Qe(t)[1],
					r = n.data.length - 1;
				Tn(n, { directiveStart: r, directiveEnd: r + 1 });
			}
			function no(t) {
				let e = Object.getPrototypeOf(t.type.prototype).constructor,
					n = !0;
				const r = [t];
				for (; e; ) {
					let s = void 0;
					if (Re(t)) s = e.ɵcmp || e.ɵdir;
					else {
						if (e.ɵcmp)
							throw new Error(
								'Directives cannot inherit Components'
							);
						s = e.ɵdir;
					}
					if (s) {
						if (n) {
							r.push(s);
							const e = t;
							(e.inputs = ro(t.inputs)),
								(e.declaredInputs = ro(t.declaredInputs)),
								(e.outputs = ro(t.outputs));
							const n = s.hostBindings;
							n && oo(t, n);
							const i = s.viewQuery,
								o = s.contentQueries;
							if (
								(i && so(t, i),
								o && io(t, o),
								ct(t.inputs, s.inputs),
								ct(t.declaredInputs, s.declaredInputs),
								ct(t.outputs, s.outputs),
								Re(s) && s.data.animation)
							) {
								const e = t.data;
								e.animation = (e.animation || []).concat(
									s.data.animation
								);
							}
						}
						const e = s.features;
						if (e)
							for (let r = 0; r < e.length; r++) {
								const s = e[r];
								s && s.ngInherit && s(t), s === no && (n = !1);
							}
					}
					e = Object.getPrototypeOf(e);
				}
				!(function (t) {
					let e = 0,
						n = null;
					for (let r = t.length - 1; r >= 0; r--) {
						const s = t[r];
						(s.hostVars = e += s.hostVars),
							(s.hostAttrs = jn(
								s.hostAttrs,
								(n = jn(n, s.hostAttrs))
							));
					}
				})(r);
			}
			function ro(t) {
				return t === he ? {} : t === de ? [] : t;
			}
			function so(t, e) {
				const n = t.viewQuery;
				t.viewQuery = n
					? (t, r) => {
							e(t, r), n(t, r);
					  }
					: e;
			}
			function io(t, e) {
				const n = t.contentQueries;
				t.contentQueries = n
					? (t, r, s) => {
							e(t, r, s), n(t, r, s);
					  }
					: e;
			}
			function oo(t, e) {
				const n = t.hostBindings;
				t.hostBindings = n
					? (t, r) => {
							e(t, r), n(t, r);
					  }
					: e;
			}
			let ao = null;
			function lo() {
				if (!ao) {
					const t = Ot.Symbol;
					if (t && t.iterator) ao = t.iterator;
					else {
						const t = Object.getOwnPropertyNames(Map.prototype);
						for (let e = 0; e < t.length; ++e) {
							const n = t[e];
							'entries' !== n &&
								'size' !== n &&
								Map.prototype[n] === Map.prototype.entries &&
								(ao = n);
						}
					}
				}
				return ao;
			}
			function co(t) {
				return (
					!!uo(t) &&
					(Array.isArray(t) || (!(t instanceof Map) && lo() in t))
				);
			}
			function uo(t) {
				return (
					null !== t &&
					('function' == typeof t || 'object' == typeof t)
				);
			}
			function ho(t, e, n) {
				return !Object.is(t[e], n) && ((t[e] = n), !0);
			}
			function fo(t, e, n, r) {
				const s = en();
				return (
					ho(s, hn(), e) &&
						(nn(),
						(function (t, e, n, r, s, i) {
							const o = $e(t, e),
								a = e[11];
							if (null == r)
								Ue(a)
									? a.removeAttribute(o, n, i)
									: o.removeAttribute(n);
							else {
								const e =
									null == s
										? Hn(r)
										: s(r, t.tagName || '', n);
								Ue(a)
									? a.setAttribute(o, n, e, i)
									: i
									? o.setAttributeNS(i, n, e)
									: o.setAttribute(n, e);
							}
						})(kn(), s, t, e, n, r)),
					fo
				);
			}
			function po(t, e, n, r, s, i, o, a) {
				const l = en(),
					c = nn(),
					u = t + xe,
					h = c.firstCreatePass
						? (function (t, e, n, r, s, i, o, a, l) {
								const c = e.consts,
									u = Ts(e, t, 0, o || null, Ze(c, a));
								zs(e, n, u, Ze(c, l)), Tn(e, u);
								const h = (u.tViews = Ds(
									2,
									u,
									r,
									s,
									i,
									e.directiveRegistry,
									e.pipeRegistry,
									null,
									e.schemas,
									c
								));
								return (
									null !== e.queries &&
										(e.queries.template(e, u),
										(h.queries = e.queries.embeddedTView(
											u
										))),
									u
								);
						  })(t, c, l, e, n, r, s, i, o)
						: c.data[u];
				on(h, !1);
				const d = l[11].createComment('');
				wi(c, l, d, h),
					Xr(d, l),
					ti(l, (l[u] = Ys(d, l, d, h))),
					Oe(h) && Ps(c, l, h),
					null != o && Ns(l, h, a);
			}
			function mo(t, e = at.Default) {
				const n = en();
				return null === n ? Gt(t, e) : er(sn(), n, xt(t), e);
			}
			function go(t) {
				return (function (t, e) {
					if ('class' === e) return t.classes;
					if ('style' === e) return t.styles;
					const n = t.attrs;
					if (n) {
						const t = n.length;
						let r = 0;
						for (; r < t; ) {
							const s = n[r];
							if (Mn(s)) break;
							if (0 === s) r += 2;
							else if ('number' == typeof s)
								for (r++; r < t && 'string' == typeof n[r]; )
									r++;
							else {
								if (s === e) return n[r + 1];
								r += 2;
							}
						}
					}
					return null;
				})(sn(), t);
			}
			function yo(t, e, n) {
				const r = en();
				return (
					ho(r, hn(), e) && js(nn(), kn(), r, t, e, r[11], n, !1), yo
				);
			}
			function _o(t, e, n, r, s) {
				const i = s ? 'class' : 'style';
				ci(t, n, e.inputs[i], i, r);
			}
			function bo(t, e, n, r) {
				const s = en(),
					i = nn(),
					o = xe + t,
					a = s[11],
					l = (s[o] = Cs(e, a, Je.lFrame.currentNamespace)),
					c = i.firstCreatePass
						? (function (t, e, n, r, s, i, o) {
								const a = e.consts,
									l = Ts(e, t, 2, s, Ze(a, i));
								return (
									zs(e, n, l, Ze(a, o)),
									null !== l.attrs && to(l, l.attrs, !1),
									null !== l.mergedAttrs &&
										to(l, l.mergedAttrs, !0),
									null !== e.queries &&
										e.queries.elementStart(e, l),
									l
								);
						  })(t, i, s, 0, e, n, r)
						: i.data[o];
				on(c, !0);
				const u = c.mergedAttrs;
				null !== u && Dn(a, l, u);
				const h = c.classes;
				null !== h && ki(a, l, h);
				const d = c.styles;
				null !== d && Ci(a, l, d),
					wi(i, s, l, c),
					0 === Je.lFrame.elementDepthCount && Xr(l, s),
					Je.lFrame.elementDepthCount++,
					Oe(c) &&
						(Ps(i, s, c),
						(function (t, e, n) {
							if (Ae(e)) {
								const r = e.directiveEnd;
								for (let s = e.directiveStart; s < r; s++) {
									const e = t.data[s];
									e.contentQueries &&
										e.contentQueries(1, n[s], s);
								}
							}
						})(i, c, s)),
					null !== r && Ns(s, c);
			}
			function vo() {
				let t = sn();
				an() ? ln() : ((t = t.parent), on(t, !1));
				const e = t;
				Je.lFrame.elementDepthCount--;
				const n = nn();
				n.firstCreatePass &&
					(Tn(n, t), Ae(t) && n.queries.elementEnd(t)),
					null != e.classesWithoutHost &&
						(function (t) {
							return 0 != (16 & t.flags);
						})(e) &&
						_o(n, e, en(), e.classesWithoutHost, !0),
					null != e.stylesWithoutHost &&
						(function (t) {
							return 0 != (32 & t.flags);
						})(e) &&
						_o(n, e, en(), e.stylesWithoutHost, !1);
			}
			function wo(t, e, n, r) {
				bo(t, e, n, r), vo();
			}
			function So() {
				return en();
			}
			function Eo(t) {
				return !!t && 'function' == typeof t.then;
			}
			function xo(t, e, n = !1, r) {
				const s = en(),
					i = nn(),
					o = sn();
				return ko(i, s, s[11], o, t, e, n, r), xo;
			}
			function Co(t, e, n = !1, r) {
				const s = sn(),
					i = en(),
					o = nn();
				return ko(o, i, ai(pn(o.data), s, i), s, t, e, n, r), Co;
			}
			function ko(t, e, n, r, s, i, o = !1, a) {
				const l = Oe(r),
					c = t.firstCreatePass && (t.cleanup || (t.cleanup = [])),
					u = oi(e);
				let h = !0;
				if (2 === r.type) {
					const d = $e(r, e),
						f = a ? a(d) : he,
						p = f.target || d,
						m = u.length,
						g = a ? t => a(He(t[r.index])).target : r.index;
					if (Ue(n)) {
						let o = null;
						if (
							(!a &&
								l &&
								(o = (function (t, e, n, r) {
									const s = t.cleanup;
									if (null != s)
										for (
											let i = 0;
											i < s.length - 1;
											i += 2
										) {
											const t = s[i];
											if (t === n && s[i + 1] === r) {
												const t = e[7],
													n = s[i + 2];
												return t.length > n
													? t[n]
													: null;
											}
											'string' == typeof t && (i += 2);
										}
									return null;
								})(t, e, s, r.index)),
							null !== o)
						)
							((
								o.__ngLastListenerFn__ || o
							).__ngNextListenerFn__ = i),
								(o.__ngLastListenerFn__ = i),
								(h = !1);
						else {
							i = Ao(r, e, i, !1);
							const t = n.listen(f.name || p, s, i);
							u.push(i, t), c && c.push(s, g, m, m + 1);
						}
					} else
						(i = Ao(r, e, i, !0)),
							p.addEventListener(s, i, o),
							u.push(i),
							c && c.push(s, g, m, o);
				}
				const d = r.outputs;
				let f;
				if (h && null !== d && (f = d[s])) {
					const t = f.length;
					if (t)
						for (let n = 0; n < t; n += 2) {
							const t = e[f[n]][f[n + 1]].subscribe(i),
								o = u.length;
							u.push(i, t), c && c.push(s, r.index, o, -(o + 1));
						}
				}
			}
			function To(t, e, n) {
				try {
					return !1 !== e(n);
				} catch (r) {
					return li(t, r), !1;
				}
			}
			function Ao(t, e, n, r) {
				return function s(i) {
					if (i === Function) return n;
					const o = 2 & t.flags ? We(t.index, e) : e;
					0 == (32 & e[2]) && ei(o);
					let a = To(e, n, i),
						l = s.__ngNextListenerFn__;
					for (; l; )
						(a = To(e, l, i) && a), (l = l.__ngNextListenerFn__);
					return (
						r &&
							!1 === a &&
							(i.preventDefault(), (i.returnValue = !1)),
						a
					);
				};
			}
			function Io(t = 1) {
				return (function (t) {
					return (Je.lFrame.contextLView = (function (t, e) {
						for (; t > 0; ) (e = e[15]), t--;
						return e;
					})(t, Je.lFrame.contextLView))[8];
				})(t);
			}
			function Oo(t, e) {
				let n = null;
				const r = (function (t) {
					const e = t.attrs;
					if (null != e) {
						const t = e.indexOf(5);
						if (0 == (1 & t)) return e[t + 1];
					}
					return null;
				})(t);
				for (let s = 0; s < e.length; s++) {
					const i = e[s];
					if ('*' !== i) {
						if (null === r ? as(t, i, !0) : ls(r, i)) return s;
					} else n = s;
				}
				return n;
			}
			function Ro(t) {
				const e = en()[16][6];
				if (!e.projection) {
					const n = (e.projection = ie(t ? t.length : 1, null)),
						r = n.slice();
					let s = e.child;
					for (; null !== s; ) {
						const e = t ? Oo(s, t) : 0;
						null !== e &&
							(r[e] ? (r[e].projectionNext = s) : (n[e] = s),
							(r[e] = s)),
							(s = s.next);
					}
				}
			}
			function Po(t, e = 0, n) {
				const r = en(),
					s = nn(),
					i = Ts(s, t, 1, null, n || null);
				null === i.projection && (i.projection = e),
					ln(),
					(function (t, e, n) {
						xi(
							e[11],
							0,
							e,
							n,
							mi(t, n, e),
							vi(n.parent || e[6], e)
						);
					})(s, r, i);
			}
			const No = [];
			function Lo(t, e, n, r, s) {
				const i = t[n + 1],
					o = null === e;
				let a = r ? bs(i) : ws(i),
					l = !1;
				for (; 0 !== a && (!1 === l || o); ) {
					const n = t[a + 1];
					Do(t[a], e) && ((l = !0), (t[a + 1] = r ? Es(n) : vs(n))),
						(a = r ? bs(n) : ws(n));
				}
				l && (t[n + 1] = r ? vs(i) : Es(i));
			}
			function Do(t, e) {
				return (
					null === t ||
					null == e ||
					(Array.isArray(t) ? t[1] : t) === e ||
					(!(!Array.isArray(t) || 'string' != typeof e) &&
						le(t, e) >= 0)
				);
			}
			function Mo(t, e, n) {
				return jo(t, e, n, !1), Mo;
			}
			function Fo(t, e) {
				return jo(t, e, null, !0), Fo;
			}
			function jo(t, e, n, r) {
				const s = en(),
					i = nn(),
					o = (function (t) {
						const e = Je.lFrame,
							n = e.bindingIndex;
						return (e.bindingIndex = e.bindingIndex + 2), n;
					})();
				i.firstUpdatePass &&
					(function (t, e, n, r) {
						const s = t.data;
						if (null === s[n + 1]) {
							const i = s[xn() + xe],
								o = (function (t, e) {
									return e >= t.expandoStartIndex;
								})(t, n);
							(function (t, e) {
								return 0 != (t.flags & (e ? 16 : 32));
							})(i, r) &&
								null === e &&
								!o &&
								(e = !1),
								(e = (function (t, e, n, r) {
									const s = pn(t);
									let i = r
										? e.residualClasses
										: e.residualStyles;
									if (null === s)
										0 ===
											(r
												? e.classBindings
												: e.styleBindings) &&
											((n = Bo(
												(n = zo(null, t, e, n, r)),
												e.attrs,
												r
											)),
											(i = null));
									else {
										const o = e.directiveStylingLast;
										if (-1 === o || t[o] !== s)
											if (
												((n = zo(s, t, e, n, r)),
												null === i)
											) {
												let n = (function (t, e, n) {
													const r = n
														? e.classBindings
														: e.styleBindings;
													if (0 !== ws(r))
														return t[bs(r)];
												})(t, e, r);
												void 0 !== n &&
													Array.isArray(n) &&
													((n = zo(
														null,
														t,
														e,
														n[1],
														r
													)),
													(n = Bo(n, e.attrs, r)),
													(function (t, e, n, r) {
														t[
															bs(
																n
																	? e.classBindings
																	: e.styleBindings
															)
														] = r;
													})(t, e, r, n));
											} else
												i = (function (t, e, n) {
													let r = void 0;
													const s = e.directiveEnd;
													for (
														let i =
															1 +
															e.directiveStylingLast;
														i < s;
														i++
													)
														r = Bo(
															r,
															t[i].hostAttrs,
															n
														);
													return Bo(r, e.attrs, n);
												})(t, e, r);
									}
									return (
										void 0 !== i &&
											(r
												? (e.residualClasses = i)
												: (e.residualStyles = i)),
										n
									);
								})(s, i, e, r)),
								(function (t, e, n, r, s, i) {
									let o = i
											? e.classBindings
											: e.styleBindings,
										a = bs(o),
										l = ws(o);
									t[r] = n;
									let c,
										u = !1;
									if (Array.isArray(n)) {
										const t = n;
										(c = t[1]),
											(null === c || le(t, c) > 0) &&
												(u = !0);
									} else c = n;
									if (s)
										if (0 !== l) {
											const e = bs(t[a + 1]);
											(t[r + 1] = _s(e, a)),
												0 !== e &&
													(t[e + 1] = Ss(
														t[e + 1],
														r
													)),
												(t[a + 1] =
													(131071 & t[a + 1]) |
													(r << 17));
										} else
											(t[r + 1] = _s(a, 0)),
												0 !== a &&
													(t[a + 1] = Ss(
														t[a + 1],
														r
													)),
												(a = r);
									else
										(t[r + 1] = _s(l, 0)),
											0 === a
												? (a = r)
												: (t[l + 1] = Ss(t[l + 1], r)),
											(l = r);
									u && (t[r + 1] = vs(t[r + 1])),
										Lo(t, c, r, !0),
										Lo(t, c, r, !1),
										(function (t, e, n, r, s) {
											const i = s
												? t.residualClasses
												: t.residualStyles;
											null != i &&
												'string' == typeof e &&
												le(i, e) >= 0 &&
												(n[r + 1] = Es(n[r + 1]));
										})(e, c, t, r, i),
										(o = _s(a, l)),
										i
											? (e.classBindings = o)
											: (e.styleBindings = o);
								})(s, i, e, n, o, r);
						}
					})(i, t, o, r),
					e !== hs &&
						ho(s, o, e) &&
						(function (t, e, n, r, s, i, o, a) {
							if (2 !== e.type) return;
							const l = t.data,
								c = l[a + 1];
							Vo(
								1 == (1 & c) ? Uo(l, e, n, s, ws(c), o) : void 0
							) ||
								(Vo(i) ||
									((function (t) {
										return 2 == (2 & t);
									})(c) &&
										(i = Uo(l, null, n, s, a, o))),
								(function (t, e, n, r, s) {
									const i = Ue(t);
									if (e)
										s
											? i
												? t.addClass(n, r)
												: n.classList.add(r)
											: i
											? t.removeClass(n, r)
											: n.classList.remove(r);
									else {
										const e =
											-1 == r.indexOf('-') ? void 0 : 2;
										null == s
											? i
												? t.removeStyle(n, r, e)
												: n.style.removeProperty(r)
											: i
											? t.setStyle(n, r, s, e)
											: n.style.setProperty(r, s);
									}
								})(
									r,
									o,
									(function (t, e) {
										return He(e[t + xe]);
									})(xn(), n),
									s,
									i
								));
						})(
							i,
							i.data[xn() + xe],
							s,
							s[11],
							t,
							(s[o + 1] = (function (t, e) {
								return (
									null == t ||
										('string' == typeof e
											? (t += e)
											: 'object' == typeof t &&
											  (t = vt(wr(t)))),
									t
								);
							})(e, n)),
							r,
							o
						);
			}
			function zo(t, e, n, r, s) {
				let i = null;
				const o = n.directiveEnd;
				let a = n.directiveStylingLast;
				for (
					-1 === a ? (a = n.directiveStart) : a++;
					a < o && ((i = e[a]), (r = Bo(r, i.hostAttrs, s)), i !== t);

				)
					a++;
				return null !== t && (n.directiveStylingLast = a), r;
			}
			function Bo(t, e, n) {
				const r = n ? 1 : 2;
				let s = -1;
				if (null !== e)
					for (let i = 0; i < e.length; i++) {
						const o = e[i];
						'number' == typeof o
							? (s = o)
							: s === r &&
							  (Array.isArray(t) ||
									(t = void 0 === t ? [] : ['', t]),
							  oe(t, o, !!n || e[++i]));
					}
				return void 0 === t ? null : t;
			}
			function Uo(t, e, n, r, s, i) {
				const o = null === e;
				let a = void 0;
				for (; s > 0; ) {
					const e = t[s],
						i = Array.isArray(e),
						l = i ? e[1] : e,
						c = null === l;
					let u = n[s + 1];
					u === hs && (u = c ? No : void 0);
					let h = c ? ae(u, r) : l === r ? u : void 0;
					if ((i && !Vo(h) && (h = ae(e, r)), Vo(h) && ((a = h), o)))
						return a;
					const d = t[s + 1];
					s = o ? bs(d) : ws(d);
				}
				if (null !== e) {
					let t = i ? e.residualClasses : e.residualStyles;
					null != t && (a = ae(t, r));
				}
				return a;
			}
			function Vo(t) {
				return void 0 !== t;
			}
			function Ho(t, e = '') {
				const n = en(),
					r = nn(),
					s = t + xe,
					i = r.firstCreatePass ? Ts(r, t, 2, null, null) : r.data[s],
					o = (n[s] = (function (t, e) {
						return Ue(e) ? e.createText(t) : e.createTextNode(t);
					})(e, n[11]));
				wi(r, n, o, i), on(i, !1);
			}
			function $o(t, e, n) {
				const r = en();
				return (
					ho(r, hn(), e) && js(nn(), kn(), r, t, e, r[11], n, !0), $o
				);
			}
			function qo(t, e, n) {
				const r = en();
				if (ho(r, hn(), e)) {
					const s = nn(),
						i = kn();
					js(s, i, r, t, e, ai(pn(s.data), i, r), n, !0);
				}
				return qo;
			}
			const Wo = void 0;
			var Qo = [
				'en',
				[['a', 'p'], ['AM', 'PM'], Wo],
				[['AM', 'PM'], Wo, Wo],
				[
					['S', 'M', 'T', 'W', 'T', 'F', 'S'],
					['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
					[
						'Sunday',
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
						'Saturday',
					],
					['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
				],
				Wo,
				[
					[
						'J',
						'F',
						'M',
						'A',
						'M',
						'J',
						'J',
						'A',
						'S',
						'O',
						'N',
						'D',
					],
					[
						'Jan',
						'Feb',
						'Mar',
						'Apr',
						'May',
						'Jun',
						'Jul',
						'Aug',
						'Sep',
						'Oct',
						'Nov',
						'Dec',
					],
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
				Wo,
				[
					['B', 'A'],
					['BC', 'AD'],
					['Before Christ', 'Anno Domini'],
				],
				0,
				[6, 0],
				['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
				['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
				['{1}, {0}', Wo, "{1} 'at' {0}", Wo],
				[
					'.',
					',',
					';',
					'%',
					'+',
					'-',
					'E',
					'\xd7',
					'\u2030',
					'\u221e',
					'NaN',
					':',
				],
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
			let Ko = {};
			function Go(t) {
				return (
					t in Ko ||
						(Ko[t] =
							Ot.ng &&
							Ot.ng.common &&
							Ot.ng.common.locales &&
							Ot.ng.common.locales[t]),
					Ko[t]
				);
			}
			var Zo = (function (t) {
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
			const Yo = 'en-US';
			let Xo = Yo;
			function Jo(t) {
				var e, n;
				(n = 'Expected localeId to be defined'),
					null == (e = t) &&
						(function (t, e, n, r) {
							throw new Error(
								'ASSERTION ERROR: ' +
									t +
									` [Expected=> null != ${e} <=Actual]`
							);
						})(n, e),
					'string' == typeof t &&
						(Xo = t.toLowerCase().replace(/_/g, '-'));
			}
			function ta(t, e, n, r, s) {
				if (((t = xt(t)), Array.isArray(t)))
					for (let i = 0; i < t.length; i++) ta(t[i], e, n, r, s);
				else {
					const i = nn(),
						o = en();
					let a = Zi(t) ? t : xt(t.provide),
						l = Qi(t);
					const c = sn(),
						u = 1048575 & c.providerIndexes,
						h = c.directiveStart,
						d = c.providerIndexes >> 20;
					if (Zi(t) || !t.multi) {
						const r = new Ln(l, s, mo),
							f = ra(a, e, s ? u : u + d, h);
						-1 === f
							? (tr(Zn(c, o), i, a),
							  ea(i, t, e.length),
							  e.push(a),
							  c.directiveStart++,
							  c.directiveEnd++,
							  s && (c.providerIndexes += 1048576),
							  n.push(r),
							  o.push(r))
							: ((n[f] = r), (o[f] = r));
					} else {
						const f = ra(a, e, u + d, h),
							p = ra(a, e, u, u + d),
							m = f >= 0 && n[f],
							g = p >= 0 && n[p];
						if ((s && !g) || (!s && !m)) {
							tr(Zn(c, o), i, a);
							const u = (function (t, e, n, r, s) {
								const i = new Ln(t, n, mo);
								return (
									(i.multi = []),
									(i.index = e),
									(i.componentProviders = 0),
									na(i, s, r && !n),
									i
								);
							})(s ? ia : sa, n.length, s, r, l);
							!s && g && (n[p].providerFactory = u),
								ea(i, t, e.length, 0),
								e.push(a),
								c.directiveStart++,
								c.directiveEnd++,
								s && (c.providerIndexes += 1048576),
								n.push(u),
								o.push(u);
						} else
							ea(
								i,
								t,
								f > -1 ? f : p,
								na(n[s ? p : f], l, !s && r)
							);
						!s && r && g && n[p].componentProviders++;
					}
				}
			}
			function ea(t, e, n, r) {
				const s = Zi(e);
				if (s || e.useClass) {
					const i = (e.useClass || e).prototype.ngOnDestroy;
					if (i) {
						const o = t.destroyHooks || (t.destroyHooks = []);
						if (!s && e.multi) {
							const t = o.indexOf(n);
							-1 === t ? o.push(n, [r, i]) : o[t + 1].push(r, i);
						} else o.push(n, i);
					}
				}
			}
			function na(t, e, n) {
				return n && t.componentProviders++, t.multi.push(e) - 1;
			}
			function ra(t, e, n, r) {
				for (let s = n; s < r; s++) if (e[s] === t) return s;
				return -1;
			}
			function sa(t, e, n, r) {
				return oa(this.multi, []);
			}
			function ia(t, e, n, r) {
				const s = this.multi;
				let i;
				if (this.providerFactory) {
					const t = this.providerFactory.componentProviders,
						e = ir(n, n[1], this.providerFactory.index, r);
					(i = e.slice(0, t)), oa(s, i);
					for (let n = t; n < e.length; n++) i.push(e[n]);
				} else (i = []), oa(s, i);
				return i;
			}
			function oa(t, e) {
				for (let n = 0; n < t.length; n++) e.push((0, t[n])());
				return e;
			}
			function aa(t, e = []) {
				return n => {
					n.providersResolver = (n, r) =>
						(function (t, e, n) {
							const r = nn();
							if (r.firstCreatePass) {
								const s = Re(t);
								ta(n, r.data, r.blueprint, s, !0),
									ta(e, r.data, r.blueprint, s, !1);
							}
						})(n, r ? r(t) : t, e);
				};
			}
			class la {}
			class ca {
				resolveComponentFactory(t) {
					throw (function (t) {
						const e = Error(
							`No component factory found for ${vt(
								t
							)}. Did you add it to @NgModule.entryComponents?`
						);
						return (e.ngComponent = t), e;
					})(t);
				}
			}
			let ua = (() => {
					class t {}
					return (t.NULL = new ca()), t;
				})(),
				ha = (() => {
					class t {
						constructor(t) {
							this.nativeElement = t;
						}
					}
					return (t.__NG_ELEMENT_ID__ = () => da(t)), t;
				})();
			const da = function (t) {
				return Pi(t, sn(), en());
			};
			class fa {}
			var pa = (function (t) {
				return (
					(t[(t.Important = 1)] = 'Important'),
					(t[(t.DashCase = 2)] = 'DashCase'),
					t
				);
			})({});
			let ma = (() => {
				class t {}
				return (
					(t.ɵprov = ut({
						token: t,
						providedIn: 'root',
						factory: () => null,
					})),
					t
				);
			})();
			class ga {
				constructor(t) {
					(this.full = t),
						(this.major = t.split('.')[0]),
						(this.minor = t.split('.')[1]),
						(this.patch = t.split('.').slice(2).join('.'));
				}
			}
			const ya = new ga('10.2.0');
			class _a {
				constructor() {}
				supports(t) {
					return co(t);
				}
				create(t) {
					return new va(t);
				}
			}
			const ba = (t, e) => e;
			class va {
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
						(this._trackByFn = t || ba);
				}
				forEachItem(t) {
					let e;
					for (e = this._itHead; null !== e; e = e._next) t(e);
				}
				forEachOperation(t) {
					let e = this._itHead,
						n = this._removalsHead,
						r = 0,
						s = null;
					for (; e || n; ) {
						const i =
								!n || (e && e.currentIndex < xa(n, r, s))
									? e
									: n,
							o = xa(i, r, s),
							a = i.currentIndex;
						if (i === n) r--, (n = n._nextRemoved);
						else if (((e = e._next), null == i.previousIndex)) r++;
						else {
							s || (s = []);
							const t = o - r,
								e = a - r;
							if (t != e) {
								for (let n = 0; n < t; n++) {
									const r = n < s.length ? s[n] : (s[n] = 0),
										i = r + n;
									e <= i && i < t && (s[n] = r + 1);
								}
								s[i.previousIndex] = e - t;
							}
						}
						o !== a && t(i, o, a);
					}
				}
				forEachPreviousItem(t) {
					let e;
					for (
						e = this._previousItHead;
						null !== e;
						e = e._nextPrevious
					)
						t(e);
				}
				forEachAddedItem(t) {
					let e;
					for (e = this._additionsHead; null !== e; e = e._nextAdded)
						t(e);
				}
				forEachMovedItem(t) {
					let e;
					for (e = this._movesHead; null !== e; e = e._nextMoved)
						t(e);
				}
				forEachRemovedItem(t) {
					let e;
					for (e = this._removalsHead; null !== e; e = e._nextRemoved)
						t(e);
				}
				forEachIdentityChange(t) {
					let e;
					for (
						e = this._identityChangesHead;
						null !== e;
						e = e._nextIdentityChange
					)
						t(e);
				}
				diff(t) {
					if ((null == t && (t = []), !co(t)))
						throw new Error(
							`Error trying to diff '${vt(
								t
							)}'. Only arrays and iterables are allowed`
						);
					return this.check(t) ? this : null;
				}
				onDestroy() {}
				check(t) {
					this._reset();
					let e,
						n,
						r,
						s = this._itHead,
						i = !1;
					if (Array.isArray(t)) {
						this.length = t.length;
						for (let e = 0; e < this.length; e++)
							(n = t[e]),
								(r = this._trackByFn(e, n)),
								null !== s && Object.is(s.trackById, r)
									? (i &&
											(s = this._verifyReinsertion(
												s,
												n,
												r,
												e
											)),
									  Object.is(s.item, n) ||
											this._addIdentityChange(s, n))
									: ((s = this._mismatch(s, n, r, e)),
									  (i = !0)),
								(s = s._next);
					} else
						(e = 0),
							(function (t, e) {
								if (Array.isArray(t))
									for (let n = 0; n < t.length; n++) e(t[n]);
								else {
									const n = t[lo()]();
									let r;
									for (; !(r = n.next()).done; ) e(r.value);
								}
							})(t, t => {
								(r = this._trackByFn(e, t)),
									null !== s && Object.is(s.trackById, r)
										? (i &&
												(s = this._verifyReinsertion(
													s,
													t,
													r,
													e
												)),
										  Object.is(s.item, t) ||
												this._addIdentityChange(s, t))
										: ((s = this._mismatch(s, t, r, e)),
										  (i = !0)),
									(s = s._next),
									e++;
							}),
							(this.length = e);
					return (
						this._truncate(s), (this.collection = t), this.isDirty
					);
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
						for (
							t = this._previousItHead = this._itHead;
							null !== t;
							t = t._next
						)
							t._nextPrevious = t._next;
						for (
							t = this._additionsHead;
							null !== t;
							t = t._nextAdded
						)
							t.previousIndex = t.currentIndex;
						for (
							this._additionsHead = this._additionsTail = null,
								t = this._movesHead;
							null !== t;
							t = t._nextMoved
						)
							t.previousIndex = t.currentIndex;
						(this._movesHead = this._movesTail = null),
							(this._removalsHead = this._removalsTail = null),
							(this._identityChangesHead = this._identityChangesTail = null);
					}
				}
				_mismatch(t, e, n, r) {
					let s;
					return (
						null === t
							? (s = this._itTail)
							: ((s = t._prev), this._remove(t)),
						null !==
						(t =
							null === this._linkedRecords
								? null
								: this._linkedRecords.get(n, r))
							? (Object.is(t.item, e) ||
									this._addIdentityChange(t, e),
							  this._moveAfter(t, s, r))
							: null !==
							  (t =
									null === this._unlinkedRecords
										? null
										: this._unlinkedRecords.get(n, null))
							? (Object.is(t.item, e) ||
									this._addIdentityChange(t, e),
							  this._reinsertAfter(t, s, r))
							: (t = this._addAfter(new wa(e, n), s, r)),
						t
					);
				}
				_verifyReinsertion(t, e, n, r) {
					let s =
						null === this._unlinkedRecords
							? null
							: this._unlinkedRecords.get(n, null);
					return (
						null !== s
							? (t = this._reinsertAfter(s, t._prev, r))
							: t.currentIndex != r &&
							  ((t.currentIndex = r), this._addToMoves(t, r)),
						t
					);
				}
				_truncate(t) {
					for (; null !== t; ) {
						const e = t._next;
						this._addToRemovals(this._unlink(t)), (t = e);
					}
					null !== this._unlinkedRecords &&
						this._unlinkedRecords.clear(),
						null !== this._additionsTail &&
							(this._additionsTail._nextAdded = null),
						null !== this._movesTail &&
							(this._movesTail._nextMoved = null),
						null !== this._itTail && (this._itTail._next = null),
						null !== this._removalsTail &&
							(this._removalsTail._nextRemoved = null),
						null !== this._identityChangesTail &&
							(this._identityChangesTail._nextIdentityChange = null);
				}
				_reinsertAfter(t, e, n) {
					null !== this._unlinkedRecords &&
						this._unlinkedRecords.remove(t);
					const r = t._prevRemoved,
						s = t._nextRemoved;
					return (
						null === r
							? (this._removalsHead = s)
							: (r._nextRemoved = s),
						null === s
							? (this._removalsTail = r)
							: (s._prevRemoved = r),
						this._insertAfter(t, e, n),
						this._addToMoves(t, n),
						t
					);
				}
				_moveAfter(t, e, n) {
					return (
						this._unlink(t),
						this._insertAfter(t, e, n),
						this._addToMoves(t, n),
						t
					);
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
					const r = null === e ? this._itHead : e._next;
					return (
						(t._next = r),
						(t._prev = e),
						null === r ? (this._itTail = t) : (r._prev = t),
						null === e ? (this._itHead = t) : (e._next = t),
						null === this._linkedRecords &&
							(this._linkedRecords = new Ea()),
						this._linkedRecords.put(t),
						(t.currentIndex = n),
						t
					);
				}
				_remove(t) {
					return this._addToRemovals(this._unlink(t));
				}
				_unlink(t) {
					null !== this._linkedRecords &&
						this._linkedRecords.remove(t);
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
								null === this._movesTail
									? (this._movesHead = t)
									: (this._movesTail._nextMoved = t)),
						t
					);
				}
				_addToRemovals(t) {
					return (
						null === this._unlinkedRecords &&
							(this._unlinkedRecords = new Ea()),
						this._unlinkedRecords.put(t),
						(t.currentIndex = null),
						(t._nextRemoved = null),
						null === this._removalsTail
							? ((this._removalsTail = this._removalsHead = t),
							  (t._prevRemoved = null))
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
			class wa {
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
			class Sa {
				constructor() {
					(this._head = null), (this._tail = null);
				}
				add(t) {
					null === this._head
						? ((this._head = this._tail = t),
						  (t._nextDup = null),
						  (t._prevDup = null))
						: ((this._tail._nextDup = t),
						  (t._prevDup = this._tail),
						  (t._nextDup = null),
						  (this._tail = t));
				}
				get(t, e) {
					let n;
					for (n = this._head; null !== n; n = n._nextDup)
						if (
							(null === e || e <= n.currentIndex) &&
							Object.is(n.trackById, t)
						)
							return n;
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
			class Ea {
				constructor() {
					this.map = new Map();
				}
				put(t) {
					const e = t.trackById;
					let n = this.map.get(e);
					n || ((n = new Sa()), this.map.set(e, n)), n.add(t);
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
			function xa(t, e, n) {
				const r = t.previousIndex;
				if (null === r) return r;
				let s = 0;
				return n && r < n.length && (s = n[r]), r + e + s;
			}
			class Ca {
				constructor() {}
				supports(t) {
					return t instanceof Map || uo(t);
				}
				create() {
					return new ka();
				}
			}
			class ka {
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
					return (
						null !== this._additionsHead ||
						null !== this._changesHead ||
						null !== this._removalsHead
					);
				}
				forEachItem(t) {
					let e;
					for (e = this._mapHead; null !== e; e = e._next) t(e);
				}
				forEachPreviousItem(t) {
					let e;
					for (
						e = this._previousMapHead;
						null !== e;
						e = e._nextPrevious
					)
						t(e);
				}
				forEachChangedItem(t) {
					let e;
					for (e = this._changesHead; null !== e; e = e._nextChanged)
						t(e);
				}
				forEachAddedItem(t) {
					let e;
					for (e = this._additionsHead; null !== e; e = e._nextAdded)
						t(e);
				}
				forEachRemovedItem(t) {
					let e;
					for (e = this._removalsHead; null !== e; e = e._nextRemoved)
						t(e);
				}
				diff(t) {
					if (t) {
						if (!(t instanceof Map || uo(t)))
							throw new Error(
								`Error trying to diff '${vt(
									t
								)}'. Only maps and objects are allowed`
							);
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
							if (e && e.key === n)
								this._maybeAddToChanges(e, t),
									(this._appendAfter = e),
									(e = e._next);
							else {
								const r = this._getOrCreateRecordForKey(n, t);
								e = this._insertBeforeOrAppend(e, r);
							}
						}),
						e)
					) {
						e._prev && (e._prev._next = null),
							(this._removalsHead = e);
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
						this._changesTail &&
							(this._changesTail._nextChanged = null),
						this._additionsTail &&
							(this._additionsTail._nextAdded = null),
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
							? ((this._appendAfter._next = e),
							  (e._prev = this._appendAfter))
							: (this._mapHead = e),
						(this._appendAfter = e),
						null
					);
				}
				_getOrCreateRecordForKey(t, e) {
					if (this._records.has(t)) {
						const n = this._records.get(t);
						this._maybeAddToChanges(n, e);
						const r = n._prev,
							s = n._next;
						return (
							r && (r._next = s),
							s && (s._prev = r),
							(n._next = null),
							(n._prev = null),
							n
						);
					}
					const n = new Ta(t);
					return (
						this._records.set(t, n),
						(n.currentValue = e),
						this._addToAdditions(n),
						n
					);
				}
				_reset() {
					if (this.isDirty) {
						let t;
						for (
							this._previousMapHead = this._mapHead,
								t = this._previousMapHead;
							null !== t;
							t = t._next
						)
							t._nextPrevious = t._next;
						for (
							t = this._changesHead;
							null !== t;
							t = t._nextChanged
						)
							t.previousValue = t.currentValue;
						for (
							t = this._additionsHead;
							null != t;
							t = t._nextAdded
						)
							t.previousValue = t.currentValue;
						(this._changesHead = this._changesTail = null),
							(this._additionsHead = this._additionsTail = null),
							(this._removalsHead = null);
					}
				}
				_maybeAddToChanges(t, e) {
					Object.is(e, t.currentValue) ||
						((t.previousValue = t.currentValue),
						(t.currentValue = e),
						this._addToChanges(t));
				}
				_addToAdditions(t) {
					null === this._additionsHead
						? (this._additionsHead = this._additionsTail = t)
						: ((this._additionsTail._nextAdded = t),
						  (this._additionsTail = t));
				}
				_addToChanges(t) {
					null === this._changesHead
						? (this._changesHead = this._changesTail = t)
						: ((this._changesTail._nextChanged = t),
						  (this._changesTail = t));
				}
				_forEach(t, e) {
					t instanceof Map
						? t.forEach(e)
						: Object.keys(t).forEach(n => e(t[n], n));
				}
			}
			class Ta {
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
			let Aa = (() => {
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
									if (!n)
										throw new Error(
											'Cannot extend IterableDiffers without a parent injector'
										);
									return t.create(e, n);
								},
								deps: [[t, new ot(), new st()]],
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
					return (
						(t.ɵprov = ut({
							token: t,
							providedIn: 'root',
							factory: () => new t([new _a()]),
						})),
						t
					);
				})(),
				Ia = (() => {
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
									if (!n)
										throw new Error(
											'Cannot extend KeyValueDiffers without a parent injector'
										);
									return t.create(e, n);
								},
								deps: [[t, new ot(), new st()]],
							};
						}
						find(t) {
							const e = this.factories.find(e => e.supports(t));
							if (e) return e;
							throw new Error(
								`Cannot find a differ supporting object '${t}'`
							);
						}
					}
					return (
						(t.ɵprov = ut({
							token: t,
							providedIn: 'root',
							factory: () => new t([new Ca()]),
						})),
						t
					);
				})();
			const Oa = [new Ca()],
				Ra = new Aa([new _a()]),
				Pa = new Ia(Oa);
			let Na = (() => {
				class t {}
				return (t.__NG_ELEMENT_ID__ = () => La(t, ha)), t;
			})();
			const La = function (t, e) {
				return Ni(t, e, sn(), en());
			};
			let Da = (() => {
				class t {}
				return (t.__NG_ELEMENT_ID__ = () => Ma(t, ha)), t;
			})();
			const Ma = function (t, e) {
					return Li(t, e, sn(), en());
				},
				Fa = {};
			class ja extends ua {
				constructor(t) {
					super(), (this.ngModule = t);
				}
				resolveComponentFactory(t) {
					const e = we(t);
					return new Ua(e, this.ngModule);
				}
			}
			function za(t) {
				const e = [];
				for (let n in t)
					t.hasOwnProperty(n) &&
						e.push({ propName: t[n], templateName: n });
				return e;
			}
			const Ba = new jt('SCHEDULER_TOKEN', {
				providedIn: 'root',
				factory: () => qn,
			});
			class Ua extends la {
				constructor(t, e) {
					super(),
						(this.componentDef = t),
						(this.ngModule = e),
						(this.componentType = t.type),
						(this.selector = t.selectors.map(us).join(',')),
						(this.ngContentSelectors = t.ngContentSelectors
							? t.ngContentSelectors
							: []),
						(this.isBoundToModule = !!e);
				}
				get inputs() {
					return za(this.componentDef.inputs);
				}
				get outputs() {
					return za(this.componentDef.outputs);
				}
				create(t, e, n, r) {
					const s = (r = r || this.ngModule)
							? (function (t, e) {
									return {
										get: (n, r, s) => {
											const i = t.get(n, Fa, s);
											return i !== Fa || r === Fa
												? i
												: e.get(n, r, s);
										},
									};
							  })(t, r.injector)
							: t,
						i = s.get(fa, Ve),
						o = s.get(ma, null),
						a = i.createRenderer(null, this.componentDef),
						l = this.componentDef.selectors[0][0] || 'div',
						c = n
							? (function (t, e, n) {
									if (Ue(t))
										return t.selectRootElement(
											e,
											n === ue.ShadowDom
										);
									let r =
										'string' == typeof e
											? t.querySelector(e)
											: e;
									return (r.textContent = ''), r;
							  })(a, n, this.componentDef.encapsulation)
							: Cs(
									l,
									i.createRenderer(null, this.componentDef),
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
						h = {
							components: [],
							scheduler: qn,
							clean: ii,
							playerHandler: null,
							flags: 0,
						},
						d = Ds(
							0,
							null,
							null,
							1,
							0,
							null,
							null,
							null,
							null,
							null
						),
						f = ks(null, d, h, u, null, null, i, a, o, s);
					let p, m;
					_n(f);
					try {
						const t = (function (t, e, n, r, s, i) {
							const o = n[1];
							n[20] = t;
							const a = Ts(o, 0, 2, null, null),
								l = (a.mergedAttrs = e.hostAttrs);
							null !== l &&
								(to(a, l, !0),
								null !== t &&
									(Dn(s, t, l),
									null !== a.classes && ki(s, t, a.classes),
									null !== a.styles && Ci(s, t, a.styles)));
							const c = r.createRenderer(t, e),
								u = ks(
									n,
									Ls(e),
									null,
									e.onPush ? 64 : 16,
									n[20],
									a,
									r,
									c,
									null,
									null
								);
							return (
								o.firstCreatePass &&
									(tr(Zn(a, n), o, e.type),
									$s(o, a),
									Ws(a, n.length, 1)),
								ti(n, u),
								(n[20] = u)
							);
						})(c, this.componentDef, f, i, a);
						if (c)
							if (n) Dn(a, c, ['ng-version', ya.full]);
							else {
								const { attrs: t, classes: e } = (function (t) {
									const e = [],
										n = [];
									let r = 1,
										s = 2;
									for (; r < t.length; ) {
										let i = t[r];
										if ('string' == typeof i)
											2 === s
												? '' !== i && e.push(i, t[++r])
												: 8 === s && n.push(i);
										else {
											if (!is(s)) break;
											s = i;
										}
										r++;
									}
									return { attrs: e, classes: n };
								})(this.componentDef.selectors[0]);
								t && Dn(a, c, t),
									e && e.length > 0 && ki(a, c, e.join(' '));
							}
						if (((m = qe(d, 0)), void 0 !== e)) {
							const t = (m.projection = []);
							for (
								let n = 0;
								n < this.ngContentSelectors.length;
								n++
							) {
								const r = e[n];
								t.push(null != r ? Array.from(r) : null);
							}
						}
						(p = (function (t, e, n, r, s) {
							const i = n[1],
								o = (function (t, e, n) {
									const r = sn();
									t.firstCreatePass &&
										(n.providersResolver &&
											n.providersResolver(n),
										Hs(t, r, 1),
										Qs(t, e, n));
									const s = ir(e, t, e.length - 1, r);
									Xr(s, e);
									const i = $e(r, e);
									return i && Xr(i, e), s;
								})(i, n, e);
							r.components.push(o),
								(t[8] = o),
								s && s.forEach(t => t(o, e)),
								e.contentQueries &&
									e.contentQueries(1, o, n.length - 1);
							const a = sn();
							if (
								i.firstCreatePass &&
								(null !== e.hostBindings ||
									null !== e.hostAttrs)
							) {
								Cn(a.index - xe);
								const t = n[1];
								Bs(t, e), Us(t, n, e.hostVars), Vs(e, o);
							}
							return o;
						})(t, this.componentDef, f, h, [eo])),
							As(d, f, null);
					} finally {
						En();
					}
					return new Va(this.componentType, p, Pi(ha, m, f), f, m);
				}
			}
			class Va extends class {} {
				constructor(t, e, n, r, s) {
					super(),
						(this.location = n),
						(this._rootLView = r),
						(this._tNode = s),
						(this.destroyCbs = []),
						(this.instance = e),
						(this.hostView = this.changeDetectorRef = new Ai(r)),
						(this.componentType = t);
				}
				get injector() {
					return new lr(this._tNode, this._rootLView);
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
			const Ha = new Map();
			class $a extends te {
				constructor(t, e) {
					super(),
						(this._parent = e),
						(this._bootstrapComponents = []),
						(this.injector = this),
						(this.destroyCbs = []),
						(this.componentFactoryResolver = new ja(this));
					const n = Ee(t),
						r = t[Dt] || null;
					r && Jo(r),
						(this._bootstrapComponents = Wn(n.bootstrap)),
						(this._r3Injector = $i(
							t,
							e,
							[
								{ provide: te, useValue: this },
								{
									provide: ua,
									useValue: this.componentFactoryResolver,
								},
							],
							vt(t)
						)),
						this._r3Injector._resolveInjectorDefTypes(),
						(this.instance = this.get(t));
				}
				get(t, e = Xi.THROW_IF_NOT_FOUND, n = at.Default) {
					return t === Xi || t === te || t === zt
						? this
						: this._r3Injector.get(t, e, n);
				}
				destroy() {
					const t = this._r3Injector;
					!t.destroyed && t.destroy(),
						this.destroyCbs.forEach(t => t()),
						(this.destroyCbs = null);
				}
				onDestroy(t) {
					this.destroyCbs.push(t);
				}
			}
			class qa extends ee {
				constructor(t) {
					super(),
						(this.moduleType = t),
						null !== Ee(t) &&
							(function t(e) {
								if (null !== e.ɵmod.id) {
									const t = e.ɵmod.id;
									(function (t, e, n) {
										if (e && e !== n)
											throw new Error(
												`Duplicate module registered for ${t} - ${vt(
													e
												)} vs ${vt(e.name)}`
											);
									})(t, Ha.get(t), e),
										Ha.set(t, e);
								}
								let n = e.ɵmod.imports;
								n instanceof Function && (n = n()),
									n && n.forEach(e => t(e));
							})(t);
				}
				create(t) {
					return new $a(this.moduleType, t);
				}
			}
			const Wa = class extends E {
				constructor(t = !1) {
					super(), (this.__isAsync = t);
				}
				emit(t) {
					super.next(t);
				}
				subscribe(t, e, n) {
					let r,
						s = t => null,
						i = () => null;
					t && 'object' == typeof t
						? ((r = this.__isAsync
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
								(i = this.__isAsync
									? () => {
											setTimeout(() => t.complete());
									  }
									: () => {
											t.complete();
									  }))
						: ((r = this.__isAsync
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
								(i = this.__isAsync
									? () => {
											setTimeout(() => n());
									  }
									: () => {
											n();
									  }));
					const o = super.subscribe(r, s, i);
					return t instanceof h && t.add(o), o;
				}
			};
			function Qa() {
				return this._results[lo()]();
			}
			class Ka {
				constructor() {
					(this.dirty = !0),
						(this._results = []),
						(this.changes = new Wa()),
						(this.length = 0);
					const t = lo(),
						e = Ka.prototype;
					e[t] || (e[t] = Qa);
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
						for (let r = 0; r < e.length; r++) {
							let s = e[r];
							Array.isArray(s)
								? (n === e && (n = e.slice(0, r)), t(s, n))
								: n !== e && n.push(s);
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
			class Ga {
				constructor(t) {
					(this.queryList = t), (this.matches = null);
				}
				clone() {
					return new Ga(this.queryList);
				}
				setDirty() {
					this.queryList.setDirty();
				}
			}
			class Za {
				constructor(t = []) {
					this.queries = t;
				}
				createEmbeddedView(t) {
					const e = t.queries;
					if (null !== e) {
						const n =
								null !== t.contentQueries
									? t.contentQueries[0]
									: e.length,
							r = [];
						for (let t = 0; t < n; t++) {
							const n = e.getByIndex(t);
							r.push(
								this.queries[n.indexInDeclarationView].clone()
							);
						}
						return new Za(r);
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
						null !== cl(t, e).matches && this.queries[e].setDirty();
				}
			}
			class Ya {
				constructor(t, e, n, r = null) {
					(this.predicate = t),
						(this.descendants = e),
						(this.isStatic = n),
						(this.read = r);
				}
			}
			class Xa {
				constructor(t = []) {
					this.queries = t;
				}
				elementStart(t, e) {
					for (let n = 0; n < this.queries.length; n++)
						this.queries[n].elementStart(t, e);
				}
				elementEnd(t) {
					for (let e = 0; e < this.queries.length; e++)
						this.queries[e].elementEnd(t);
				}
				embeddedTView(t) {
					let e = null;
					for (let n = 0; n < this.length; n++) {
						const r = null !== e ? e.length : 0,
							s = this.getByIndex(n).embeddedTView(t, r);
						s &&
							((s.indexInDeclarationView = n),
							null !== e ? e.push(s) : (e = [s]));
					}
					return null !== e ? new Xa(e) : null;
				}
				template(t, e) {
					for (let n = 0; n < this.queries.length; n++)
						this.queries[n].template(t, e);
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
			class Ja {
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
					this._declarationNodeIndex === t.index &&
						(this._appliesToNextNode = !1);
				}
				template(t, e) {
					this.elementStart(t, e);
				}
				embeddedTView(t, e) {
					return this.isApplyingToNode(t)
						? ((this.crossesNgTemplate = !0),
						  this.addMatch(-t.index, e),
						  new Ja(this.metadata))
						: null;
				}
				isApplyingToNode(t) {
					if (
						this._appliesToNextNode &&
						!1 === this.metadata.descendants
					) {
						const e = this._declarationNodeIndex;
						let n = t.parent;
						for (; null !== n && 3 === n.type && n.index !== e; )
							n = n.parent;
						return e === (null !== n ? n.index : -1);
					}
					return this._appliesToNextNode;
				}
				matchTNode(t, e) {
					const n = this.metadata.predicate;
					if (Array.isArray(n))
						for (let r = 0; r < n.length; r++) {
							const s = n[r];
							this.matchTNodeWithReadOption(t, e, tl(e, s)),
								this.matchTNodeWithReadOption(
									t,
									e,
									sr(e, t, s, !1, !1)
								);
						}
					else
						n === Na
							? 0 === e.type &&
							  this.matchTNodeWithReadOption(t, e, -1)
							: this.matchTNodeWithReadOption(
									t,
									e,
									sr(e, t, n, !1, !1)
							  );
				}
				matchTNodeWithReadOption(t, e, n) {
					if (null !== n) {
						const r = this.metadata.read;
						if (null !== r)
							if (
								r === ha ||
								r === Da ||
								(r === Na && 0 === e.type)
							)
								this.addMatch(e.index, -2);
							else {
								const n = sr(e, t, r, !1, !1);
								null !== n && this.addMatch(e.index, n);
							}
						else this.addMatch(e.index, n);
					}
				}
				addMatch(t, e) {
					null === this.matches
						? (this.matches = [t, e])
						: this.matches.push(t, e);
				}
			}
			function tl(t, e) {
				const n = t.localNames;
				if (null !== n)
					for (let r = 0; r < n.length; r += 2)
						if (n[r] === e) return n[r + 1];
				return null;
			}
			function el(t, e, n, r) {
				return -1 === n
					? (function (t, e) {
							return 2 === t.type || 3 === t.type
								? Pi(ha, t, e)
								: 0 === t.type
								? Ni(Na, ha, t, e)
								: null;
					  })(e, t)
					: -2 === n
					? (function (t, e, n) {
							return n === ha
								? Pi(ha, e, t)
								: n === Na
								? Ni(Na, ha, e, t)
								: n === Da
								? Li(Da, ha, e, t)
								: void 0;
					  })(t, e, r)
					: ir(t, t[1], n, e);
			}
			function nl(t, e, n, r) {
				const s = e[19].queries[r];
				if (null === s.matches) {
					const r = t.data,
						i = n.matches,
						o = [];
					for (let t = 0; t < i.length; t += 2) {
						const s = i[t];
						o.push(
							s < 0
								? null
								: el(e, r[s], i[t + 1], n.metadata.read)
						);
					}
					s.matches = o;
				}
				return s.matches;
			}
			function rl(t) {
				const e = en(),
					n = nn(),
					r = mn();
				gn(r + 1);
				const s = cl(n, r);
				if (t.dirty && Ke(e) === s.metadata.isStatic) {
					if (null === s.matches) t.reset([]);
					else {
						const i = s.crossesNgTemplate
							? (function t(e, n, r, s) {
									const i = e.queries.getByIndex(r),
										o = i.matches;
									if (null !== o) {
										const a = nl(e, n, i, r);
										for (let e = 0; e < o.length; e += 2) {
											const r = o[e];
											if (r > 0) s.push(a[e / 2]);
											else {
												const i = o[e + 1],
													a = n[-r];
												for (
													let e = Ce;
													e < a.length;
													e++
												) {
													const n = a[e];
													n[17] === n[3] &&
														t(n[1], n, i, s);
												}
												if (null !== a[9]) {
													const e = a[9];
													for (
														let n = 0;
														n < e.length;
														n++
													) {
														const r = e[n];
														t(r[1], r, i, s);
													}
												}
											}
										}
									}
									return s;
							  })(n, e, r, [])
							: nl(n, e, s, r);
						t.reset(i), t.notifyOnChanges();
					}
					return !0;
				}
				return !1;
			}
			function sl(t, e, n) {
				!(function (t, e, n, r, s, i) {
					t.firstCreatePass && ll(t, new Ya(n, r, false, s), -1),
						al(t, e);
				})(nn(), en(), t, e, n);
			}
			function il(t, e, n, r) {
				!(function (t, e, n, r, s, i, o, a) {
					t.firstCreatePass &&
						(ll(t, new Ya(n, r, false, s), o.index),
						(function (t, e) {
							const n =
								t.contentQueries || (t.contentQueries = []);
							e !==
								(t.contentQueries.length
									? n[n.length - 1]
									: -1) && n.push(t.queries.length - 1, e);
						})(t, a)),
						al(t, e);
				})(nn(), en(), e, n, r, 0, sn(), t);
			}
			function ol() {
				return (t = en()), (e = mn()), t[19].queries[e].queryList;
				var t, e;
			}
			function al(t, e) {
				const n = new Ka();
				Ms(t, e, n, n.destroy),
					null === e[19] && (e[19] = new Za()),
					e[19].queries.push(new Ga(n));
			}
			function ll(t, e, n) {
				null === t.queries && (t.queries = new Xa()),
					t.queries.track(new Ja(e, n));
			}
			function cl(t, e) {
				return t.queries.getByIndex(e);
			}
			const ul = new jt('Application Initializer');
			let hl = (() => {
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
								Eo(e) && t.push(e);
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
						return new (e || t)(Gt(ul, 8));
					}),
					(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const dl = new jt('AppId'),
				fl = {
					provide: dl,
					useFactory: function () {
						return `${pl()}${pl()}${pl()}`;
					},
					deps: [],
				};
			function pl() {
				return String.fromCharCode(97 + Math.floor(25 * Math.random()));
			}
			const ml = new jt('Platform Initializer'),
				gl = new jt('Platform ID'),
				yl = new jt('appBootstrapListener');
			let _l = (() => {
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
					(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const bl = new jt('LocaleId'),
				vl = new jt('DefaultCurrencyCode');
			class wl {
				constructor(t, e) {
					(this.ngModuleFactory = t), (this.componentFactories = e);
				}
			}
			const Sl = function (t) {
					return new qa(t);
				},
				El = Sl,
				xl = function (t) {
					return Promise.resolve(Sl(t));
				},
				Cl = function (t) {
					const e = Sl(t),
						n = Wn(Ee(t).declarations).reduce((t, e) => {
							const n = we(e);
							return n && t.push(new Ua(n)), t;
						}, []);
					return new wl(e, n);
				},
				kl = Cl,
				Tl = function (t) {
					return Promise.resolve(Cl(t));
				};
			let Al = (() => {
				class t {
					constructor() {
						(this.compileModuleSync = El),
							(this.compileModuleAsync = xl),
							(this.compileModuleAndAllComponentsSync = kl),
							(this.compileModuleAndAllComponentsAsync = Tl);
					}
					clearCache() {}
					clearCacheFor(t) {}
					getModuleId(t) {}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const Il = (() => Promise.resolve(0))();
			function Ol(t) {
				'undefined' == typeof Zone
					? Il.then(() => {
							t && t.apply(null, null);
					  })
					: Zone.current.scheduleMicroTask('scheduleMicrotask', t);
			}
			class Rl {
				constructor({
					enableLongStackTrace: t = !1,
					shouldCoalesceEventChangeDetection: e = !1,
				}) {
					if (
						((this.hasPendingMacrotasks = !1),
						(this.hasPendingMicrotasks = !1),
						(this.isStable = !0),
						(this.onUnstable = new Wa(!1)),
						(this.onMicrotaskEmpty = new Wa(!1)),
						(this.onStable = new Wa(!1)),
						(this.onError = new Wa(!1)),
						'undefined' == typeof Zone)
					)
						throw new Error(
							'In this configuration Angular requires Zone.js'
						);
					Zone.assertZonePatched();
					const n = this;
					(n._nesting = 0),
						(n._outer = n._inner = Zone.current),
						Zone.wtfZoneSpec &&
							(n._inner = n._inner.fork(Zone.wtfZoneSpec)),
						Zone.TaskTrackingZoneSpec &&
							(n._inner = n._inner.fork(
								new Zone.TaskTrackingZoneSpec()
							)),
						t &&
							Zone.longStackTraceZoneSpec &&
							(n._inner = n._inner.fork(
								Zone.longStackTraceZoneSpec
							)),
						(n.shouldCoalesceEventChangeDetection = e),
						(n.lastRequestAnimationFrameId = -1),
						(n.nativeRequestAnimationFrame = (function () {
							let t = Ot.requestAnimationFrame,
								e = Ot.cancelAnimationFrame;
							if ('undefined' != typeof Zone && t && e) {
								const n =
									t[Zone.__symbol__('OriginalDelegate')];
								n && (t = n);
								const r =
									e[Zone.__symbol__('OriginalDelegate')];
								r && (e = r);
							}
							return {
								nativeRequestAnimationFrame: t,
								nativeCancelAnimationFrame: e,
							};
						})().nativeRequestAnimationFrame),
						(function (t) {
							const e =
								!!t.shouldCoalesceEventChangeDetection &&
								t.nativeRequestAnimationFrame &&
								(() => {
									!(function (t) {
										-1 === t.lastRequestAnimationFrameId &&
											((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
												Ot,
												() => {
													t.fakeTopEventTask ||
														(t.fakeTopEventTask = Zone.root.scheduleEventTask(
															'fakeTopEventTask',
															() => {
																(t.lastRequestAnimationFrameId = -1),
																	Dl(t),
																	Ll(t);
															},
															void 0,
															() => {},
															() => {}
														)),
														t.fakeTopEventTask.invoke();
												}
											)),
											Dl(t));
									})(t);
								});
							t._inner = t._inner.fork({
								name: 'angular',
								properties: {
									isAngularZone: !0,
									maybeDelayChangeDetection: e,
								},
								onInvokeTask: (n, r, s, i, o, a) => {
									try {
										return Ml(t), n.invokeTask(s, i, o, a);
									} finally {
										e && 'eventTask' === i.type && e(),
											Fl(t);
									}
								},
								onInvoke: (e, n, r, s, i, o, a) => {
									try {
										return Ml(t), e.invoke(r, s, i, o, a);
									} finally {
										Fl(t);
									}
								},
								onHasTask: (e, n, r, s) => {
									e.hasTask(r, s),
										n === r &&
											('microTask' == s.change
												? ((t._hasPendingMicrotasks =
														s.microTask),
												  Dl(t),
												  Ll(t))
												: 'macroTask' == s.change &&
												  (t.hasPendingMacrotasks =
														s.macroTask));
								},
								onHandleError: (e, n, r, s) => (
									e.handleError(r, s),
									t.runOutsideAngular(() =>
										t.onError.emit(s)
									),
									!1
								),
							});
						})(n);
				}
				static isInAngularZone() {
					return !0 === Zone.current.get('isAngularZone');
				}
				static assertInAngularZone() {
					if (!Rl.isInAngularZone())
						throw new Error(
							'Expected to be in Angular Zone, but it is not!'
						);
				}
				static assertNotInAngularZone() {
					if (Rl.isInAngularZone())
						throw new Error(
							'Expected to not be in Angular Zone, but it is!'
						);
				}
				run(t, e, n) {
					return this._inner.run(t, e, n);
				}
				runTask(t, e, n, r) {
					const s = this._inner,
						i = s.scheduleEventTask(
							'NgZoneEvent: ' + r,
							t,
							Nl,
							Pl,
							Pl
						);
					try {
						return s.runTask(i, e, n);
					} finally {
						s.cancelTask(i);
					}
				}
				runGuarded(t, e, n) {
					return this._inner.runGuarded(t, e, n);
				}
				runOutsideAngular(t) {
					return this._outer.run(t);
				}
			}
			function Pl() {}
			const Nl = {};
			function Ll(t) {
				if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
					try {
						t._nesting++, t.onMicrotaskEmpty.emit(null);
					} finally {
						if ((t._nesting--, !t.hasPendingMicrotasks))
							try {
								t.runOutsideAngular(() =>
									t.onStable.emit(null)
								);
							} finally {
								t.isStable = !0;
							}
					}
			}
			function Dl(t) {
				t.hasPendingMicrotasks = !!(
					t._hasPendingMicrotasks ||
					(t.shouldCoalesceEventChangeDetection &&
						-1 !== t.lastRequestAnimationFrameId)
				);
			}
			function Ml(t) {
				t._nesting++,
					t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
			}
			function Fl(t) {
				t._nesting--, Ll(t);
			}
			class jl {
				constructor() {
					(this.hasPendingMicrotasks = !1),
						(this.hasPendingMacrotasks = !1),
						(this.isStable = !0),
						(this.onUnstable = new Wa()),
						(this.onMicrotaskEmpty = new Wa()),
						(this.onStable = new Wa()),
						(this.onError = new Wa());
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
				runTask(t, e, n, r) {
					return t.apply(e, n);
				}
			}
			let zl = (() => {
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
										'undefined' == typeof Zone
											? null
											: Zone.current.get(
													'TaskTrackingZone'
											  );
								});
						}
						_watchAngularEvents() {
							this._ngZone.onUnstable.subscribe({
								next: () => {
									(this._didWork = !0),
										(this._isZoneStable = !1);
								},
							}),
								this._ngZone.runOutsideAngular(() => {
									this._ngZone.onStable.subscribe({
										next: () => {
											Rl.assertNotInAngularZone(),
												Ol(() => {
													(this._isZoneStable = !0),
														this._runCallbacksIfReady();
												});
										},
									});
								});
						}
						increasePendingRequestCount() {
							return (
								(this._pendingCount += 1),
								(this._didWork = !0),
								this._pendingCount
							);
						}
						decreasePendingRequestCount() {
							if (
								((this._pendingCount -= 1),
								this._pendingCount < 0)
							)
								throw new Error(
									'pending async requests below zero'
								);
							return (
								this._runCallbacksIfReady(), this._pendingCount
							);
						}
						isStable() {
							return (
								this._isZoneStable &&
								0 === this._pendingCount &&
								!this._ngZone.hasPendingMacrotasks
							);
						}
						_runCallbacksIfReady() {
							if (this.isStable())
								Ol(() => {
									for (; 0 !== this._callbacks.length; ) {
										let t = this._callbacks.pop();
										clearTimeout(t.timeoutId),
											t.doneCb(this._didWork);
									}
									this._didWork = !1;
								});
							else {
								let t = this.getPendingTasks();
								(this._callbacks = this._callbacks.filter(
									e =>
										!e.updateCb ||
										!e.updateCb(t) ||
										(clearTimeout(e.timeoutId), !1)
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
							let r = -1;
							e &&
								e > 0 &&
								(r = setTimeout(() => {
									(this._callbacks = this._callbacks.filter(
										t => t.timeoutId !== r
									)),
										t(
											this._didWork,
											this.getPendingTasks()
										);
								}, e)),
								this._callbacks.push({
									doneCb: t,
									timeoutId: r,
									updateCb: n,
								});
						}
						whenStable(t, e, n) {
							if (n && !this.taskTrackingZone)
								throw new Error(
									'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
								);
							this.addCallback(t, e, n),
								this._runCallbacksIfReady();
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
							return new (e || t)(Gt(Rl));
						}),
						(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				Bl = (() => {
					class t {
						constructor() {
							(this._applications = new Map()),
								Hl.addToWindow(this);
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
							return Hl.findTestabilityInTree(this, t, e);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
						t
					);
				})();
			class Ul {
				addToWindow(t) {}
				findTestabilityInTree(t, e, n) {
					return null;
				}
			}
			let Vl,
				Hl = new Ul();
			const $l = new jt('AllowMultipleToken');
			class ql {
				constructor(t, e) {
					(this.name = t), (this.token = e);
				}
			}
			function Wl(t, e, n = []) {
				const r = 'Platform: ' + e,
					s = new jt(r);
				return (e = []) => {
					let i = Ql();
					if (!i || i.injector.get($l, !1))
						if (t)
							t(n.concat(e).concat({ provide: s, useValue: !0 }));
						else {
							const t = n
								.concat(e)
								.concat(
									{ provide: s, useValue: !0 },
									{ provide: ji, useValue: 'platform' }
								);
							!(function (t) {
								if (
									Vl &&
									!Vl.destroyed &&
									!Vl.injector.get($l, !1)
								)
									throw new Error(
										'There can be only one platform. Destroy the previous one to create a new one.'
									);
								Vl = t.get(Kl);
								const e = t.get(ml, null);
								e && e.forEach(t => t());
							})(Xi.create({ providers: t, name: r }));
						}
					return (function (t) {
						const e = Ql();
						if (!e) throw new Error('No platform exists!');
						if (!e.injector.get(t, null))
							throw new Error(
								'A platform with a different configuration has been created. Please destroy it first.'
							);
						return e;
					})(s);
				};
			}
			function Ql() {
				return Vl && !Vl.destroyed ? Vl : null;
			}
			let Kl = (() => {
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
											? new jl()
											: ('zone.js' === t ? void 0 : t) ||
											  new Rl({
													enableLongStackTrace: kr(),
													shouldCoalesceEventChangeDetection: e,
											  })),
									n
								);
							})(
								e ? e.ngZone : void 0,
								(e && e.ngZoneEventCoalescing) || !1
							),
							r = [{ provide: Rl, useValue: n }];
						return n.run(() => {
							const e = Xi.create({
									providers: r,
									parent: this.injector,
									name: t.moduleType.name,
								}),
								s = t.create(e),
								i = s.injector.get(pr, null);
							if (!i)
								throw new Error(
									'No ErrorHandler. Is platform module (BrowserModule) included?'
								);
							return (
								s.onDestroy(() => Yl(this._modules, s)),
								n.runOutsideAngular(() =>
									n.onError.subscribe({
										next: t => {
											i.handleError(t);
										},
									})
								),
								(function (t, e, n) {
									try {
										const r = n();
										return Eo(r)
											? r.catch(n => {
													throw (
														(e.runOutsideAngular(
															() =>
																t.handleError(n)
														),
														n)
													);
											  })
											: r;
									} catch (r) {
										throw (
											(e.runOutsideAngular(() =>
												t.handleError(r)
											),
											r)
										);
									}
								})(i, n, () => {
									const t = s.injector.get(hl);
									return (
										t.runInitializers(),
										t.donePromise.then(
											() => (
												Jo(
													s.injector.get(bl, Yo) || Yo
												),
												this._moduleDoBootstrap(s),
												s
											)
										)
									);
								})
							);
						});
					}
					bootstrapModule(t, e = []) {
						const n = Gl({}, e);
						return (function (t, e, n) {
							const r = new qa(n);
							return Promise.resolve(r);
						})(0, 0, t).then(t =>
							this.bootstrapModuleFactory(t, n)
						);
					}
					_moduleDoBootstrap(t) {
						const e = t.injector.get(Zl);
						if (t._bootstrapComponents.length > 0)
							t._bootstrapComponents.forEach(t => e.bootstrap(t));
						else {
							if (!t.instance.ngDoBootstrap)
								throw new Error(
									`The module ${vt(
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
						if (this._destroyed)
							throw new Error(
								'The platform has already been destroyed!'
							);
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
						return new (e || t)(Gt(Xi));
					}),
					(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			function Gl(t, e) {
				return Array.isArray(e)
					? e.reduce(Gl, t)
					: Object.assign(Object.assign({}, t), e);
			}
			let Zl = (() => {
				class t {
					constructor(t, e, n, r, s, i) {
						(this._zone = t),
							(this._console = e),
							(this._injector = n),
							(this._exceptionHandler = r),
							(this._componentFactoryResolver = s),
							(this._initStatus = i),
							(this._bootstrapListeners = []),
							(this._views = []),
							(this._runningTick = !1),
							(this._enforceNoNewChanges = !1),
							(this._stable = !0),
							(this.componentTypes = []),
							(this.components = []),
							(this._enforceNoNewChanges = kr()),
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
										Rl.assertNotInAngularZone(),
											Ol(() => {
												this._stable ||
													this._zone
														.hasPendingMacrotasks ||
													this._zone
														.hasPendingMicrotasks ||
													((this._stable = !0),
													t.next(!0));
											});
									});
								});
								const n = this._zone.onUnstable.subscribe(
									() => {
										Rl.assertInAngularZone(),
											this._stable &&
												((this._stable = !1),
												this._zone.runOutsideAngular(
													() => {
														t.next(!1);
													}
												));
									}
								);
								return () => {
									e.unsubscribe(), n.unsubscribe();
								};
							});
						this.isStable = q(o, a.pipe(J()));
					}
					bootstrap(t, e) {
						if (!this._initStatus.done)
							throw new Error(
								'Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.'
							);
						let n;
						(n =
							t instanceof la
								? t
								: this._componentFactoryResolver.resolveComponentFactory(
										t
								  )),
							this.componentTypes.push(n.componentType);
						const r = n.isBoundToModule
								? void 0
								: this._injector.get(te),
							s = n.create(Xi.NULL, [], e || n.selector, r);
						s.onDestroy(() => {
							this._unloadComponent(s);
						});
						const i = s.injector.get(zl, null);
						return (
							i &&
								s.injector
									.get(Bl)
									.registerApplication(
										s.location.nativeElement,
										i
									),
							this._loadComponent(s),
							kr() &&
								this._console.log(
									'Angular is running in development mode. Call enableProdMode() to enable production mode.'
								),
							s
						);
					}
					tick() {
						if (this._runningTick)
							throw new Error(
								'ApplicationRef.tick is called recursively'
							);
						try {
							this._runningTick = !0;
							for (let t of this._views) t.detectChanges();
							if (this._enforceNoNewChanges)
								for (let t of this._views) t.checkNoChanges();
						} catch (t) {
							this._zone.runOutsideAngular(() =>
								this._exceptionHandler.handleError(t)
							);
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
						Yl(this._views, e), e.detachFromAppRef();
					}
					_loadComponent(t) {
						this.attachView(t.hostView),
							this.tick(),
							this.components.push(t),
							this._injector
								.get(yl, [])
								.concat(this._bootstrapListeners)
								.forEach(e => e(t));
					}
					_unloadComponent(t) {
						this.detachView(t.hostView), Yl(this.components, t);
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
						return new (e || t)(
							Gt(Rl),
							Gt(_l),
							Gt(Xi),
							Gt(pr),
							Gt(ua),
							Gt(hl)
						);
					}),
					(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			function Yl(t, e) {
				const n = t.indexOf(e);
				n > -1 && t.splice(n, 1);
			}
			class Xl {}
			class Jl {}
			const tc = {
				factoryPathPrefix: '',
				factoryPathSuffix: '.ngfactory',
			};
			let ec = (() => {
				class t {
					constructor(t, e) {
						(this._compiler = t), (this._config = e || tc);
					}
					load(t) {
						return this.loadAndCompile(t);
					}
					loadAndCompile(t) {
						let [e, r] = t.split('#');
						return (
							void 0 === r && (r = 'default'),
							n('zn8P')(e)
								.then(t => t[r])
								.then(t => nc(t, e, r))
								.then(t => this._compiler.compileModuleAsync(t))
						);
					}
					loadFactory(t) {
						let [e, r] = t.split('#'),
							s = 'NgFactory';
						return (
							void 0 === r && ((r = 'default'), (s = '')),
							n('zn8P')(
								this._config.factoryPathPrefix +
									e +
									this._config.factoryPathSuffix
							)
								.then(t => t[r + s])
								.then(t => nc(t, e, r))
						);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Gt(Al), Gt(Jl, 8));
					}),
					(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			function nc(t, e, n) {
				if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
				return t;
			}
			const rc = Wl(null, 'core', [
					{ provide: gl, useValue: 'unknown' },
					{ provide: Kl, deps: [Xi] },
					{ provide: Bl, deps: [] },
					{ provide: _l, deps: [] },
				]),
				sc = [
					{
						provide: Zl,
						useClass: Zl,
						deps: [Rl, _l, Xi, pr, ua, hl],
					},
					{
						provide: Ba,
						deps: [Rl],
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
					{ provide: hl, useClass: hl, deps: [[new st(), ul]] },
					{ provide: Al, useClass: Al, deps: [] },
					fl,
					{
						provide: Aa,
						useFactory: function () {
							return Ra;
						},
						deps: [],
					},
					{
						provide: Ia,
						useFactory: function () {
							return Pa;
						},
						deps: [],
					},
					{
						provide: bl,
						useFactory: function (t) {
							return (
								Jo(
									(t =
										t ||
										('undefined' != typeof $localize &&
											$localize.locale) ||
										Yo)
								),
								t
							);
						},
						deps: [[new rt(bl), new st(), new ot()]],
					},
					{ provide: vl, useValue: 'USD' },
				];
			let ic = (() => {
					class t {
						constructor(t) {}
					}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)(Gt(Zl));
							},
							providers: sc,
						})),
						t
					);
				})(),
				oc = null;
			function ac() {
				return oc;
			}
			const lc = new jt('DocumentToken');
			let cc = (() => {
				class t {}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵprov = ut({
						factory: uc,
						token: t,
						providedIn: 'platform',
					})),
					t
				);
			})();
			function uc() {
				return Gt(dc);
			}
			const hc = new jt('Location Initialized');
			let dc = (() => {
				class t extends cc {
					constructor(t) {
						super(), (this._doc = t), this._init();
					}
					_init() {
						(this.location = ac().getLocation()),
							(this._history = ac().getHistory());
					}
					getBaseHrefFromDOM() {
						return ac().getBaseHref(this._doc);
					}
					onPopState(t) {
						ac()
							.getGlobalEventTarget(this._doc, 'window')
							.addEventListener('popstate', t, !1);
					}
					onHashChange(t) {
						ac()
							.getGlobalEventTarget(this._doc, 'window')
							.addEventListener('hashchange', t, !1);
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
						fc()
							? this._history.pushState(t, e, n)
							: (this.location.hash = n);
					}
					replaceState(t, e, n) {
						fc()
							? this._history.replaceState(t, e, n)
							: (this.location.hash = n);
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
						return new (e || t)(Gt(lc));
					}),
					(t.ɵprov = ut({
						factory: pc,
						token: t,
						providedIn: 'platform',
					})),
					t
				);
			})();
			function fc() {
				return !!window.history.pushState;
			}
			function pc() {
				return new dc(Gt(lc));
			}
			function mc(t, e) {
				if (0 == t.length) return e;
				if (0 == e.length) return t;
				let n = 0;
				return (
					t.endsWith('/') && n++,
					e.startsWith('/') && n++,
					2 == n ? t + e.substring(1) : 1 == n ? t + e : t + '/' + e
				);
			}
			function gc(t) {
				const e = t.match(/#|\?|$/),
					n = (e && e.index) || t.length;
				return t.slice(0, n - ('/' === t[n - 1] ? 1 : 0)) + t.slice(n);
			}
			function yc(t) {
				return t && '?' !== t[0] ? '?' + t : t;
			}
			let _c = (() => {
				class t {}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵprov = ut({
						factory: bc,
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			function bc(t) {
				const e = Gt(lc).location;
				return new wc(Gt(cc), (e && e.origin) || '');
			}
			const vc = new jt('appBaseHref');
			let wc = (() => {
					class t extends _c {
						constructor(t, e) {
							if (
								(super(),
								(this._platformLocation = t),
								null == e &&
									(e = this._platformLocation.getBaseHrefFromDOM()),
								null == e)
							)
								throw new Error(
									'No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.'
								);
							this._baseHref = e;
						}
						onPopState(t) {
							this._platformLocation.onPopState(t),
								this._platformLocation.onHashChange(t);
						}
						getBaseHref() {
							return this._baseHref;
						}
						prepareExternalUrl(t) {
							return mc(this._baseHref, t);
						}
						path(t = !1) {
							const e =
									this._platformLocation.pathname +
									yc(this._platformLocation.search),
								n = this._platformLocation.hash;
							return n && t ? `${e}${n}` : e;
						}
						pushState(t, e, n, r) {
							const s = this.prepareExternalUrl(n + yc(r));
							this._platformLocation.pushState(t, e, s);
						}
						replaceState(t, e, n, r) {
							const s = this.prepareExternalUrl(n + yc(r));
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
							return new (e || t)(Gt(cc), Gt(vc, 8));
						}),
						(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				Sc = (() => {
					class t extends _c {
						constructor(t, e) {
							super(),
								(this._platformLocation = t),
								(this._baseHref = ''),
								null != e && (this._baseHref = e);
						}
						onPopState(t) {
							this._platformLocation.onPopState(t),
								this._platformLocation.onHashChange(t);
						}
						getBaseHref() {
							return this._baseHref;
						}
						path(t = !1) {
							let e = this._platformLocation.hash;
							return (
								null == e && (e = '#'),
								e.length > 0 ? e.substring(1) : e
							);
						}
						prepareExternalUrl(t) {
							const e = mc(this._baseHref, t);
							return e.length > 0 ? '#' + e : e;
						}
						pushState(t, e, n, r) {
							let s = this.prepareExternalUrl(n + yc(r));
							0 == s.length &&
								(s = this._platformLocation.pathname),
								this._platformLocation.pushState(t, e, s);
						}
						replaceState(t, e, n, r) {
							let s = this.prepareExternalUrl(n + yc(r));
							0 == s.length &&
								(s = this._platformLocation.pathname),
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
							return new (e || t)(Gt(cc), Gt(vc, 8));
						}),
						(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				Ec = (() => {
					class t {
						constructor(t, e) {
							(this._subject = new Wa()),
								(this._urlChangeListeners = []),
								(this._platformStrategy = t);
							const n = this._platformStrategy.getBaseHref();
							(this._platformLocation = e),
								(this._baseHref = gc(Cc(n))),
								this._platformStrategy.onPopState(t => {
									this._subject.emit({
										url: this.path(!0),
										pop: !0,
										state: t.state,
										type: t.type,
									});
								});
						}
						path(t = !1) {
							return this.normalize(
								this._platformStrategy.path(t)
							);
						}
						getState() {
							return this._platformLocation.getState();
						}
						isCurrentPathEqualTo(t, e = '') {
							return this.path() == this.normalize(t + yc(e));
						}
						normalize(e) {
							return t.stripTrailingSlash(
								(function (t, e) {
									return t && e.startsWith(t)
										? e.substring(t.length)
										: e;
								})(this._baseHref, Cc(e))
							);
						}
						prepareExternalUrl(t) {
							return (
								t && '/' !== t[0] && (t = '/' + t),
								this._platformStrategy.prepareExternalUrl(t)
							);
						}
						go(t, e = '', n = null) {
							this._platformStrategy.pushState(n, '', t, e),
								this._notifyUrlChangeListeners(
									this.prepareExternalUrl(t + yc(e)),
									n
								);
						}
						replaceState(t, e = '', n = null) {
							this._platformStrategy.replaceState(n, '', t, e),
								this._notifyUrlChangeListeners(
									this.prepareExternalUrl(t + yc(e)),
									n
								);
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
									(this._urlChangeSubscription = this.subscribe(
										t => {
											this._notifyUrlChangeListeners(
												t.url,
												t.state
											);
										}
									));
						}
						_notifyUrlChangeListeners(t = '', e) {
							this._urlChangeListeners.forEach(n => n(t, e));
						}
						subscribe(t, e, n) {
							return this._subject.subscribe({
								next: t,
								error: e,
								complete: n,
							});
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Gt(_c), Gt(cc));
						}),
						(t.normalizeQueryParams = yc),
						(t.joinWithSlash = mc),
						(t.stripTrailingSlash = gc),
						(t.ɵprov = ut({
							factory: xc,
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})();
			function xc() {
				return new Ec(Gt(_c), Gt(cc));
			}
			function Cc(t) {
				return t.replace(/\/index.html$/, '');
			}
			var kc = (function (t) {
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
			class Tc {}
			let Ac = (() => {
					class t extends Tc {
						constructor(t) {
							super(), (this.locale = t);
						}
						getPluralCategory(t, e) {
							switch (
								(function (t) {
									return (function (t) {
										const e = (function (t) {
											return t
												.toLowerCase()
												.replace(/_/g, '-');
										})(t);
										let n = Go(e);
										if (n) return n;
										const r = e.split('-')[0];
										if (((n = Go(r)), n)) return n;
										if ('en' === r) return Qo;
										throw new Error(
											`Missing locale data for the locale "${t}".`
										);
									})(t)[Zo.PluralCase];
								})(e || this.locale)(t)
							) {
								case kc.Zero:
									return 'zero';
								case kc.One:
									return 'one';
								case kc.Two:
									return 'two';
								case kc.Few:
									return 'few';
								case kc.Many:
									return 'many';
								default:
									return 'other';
							}
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Gt(bl));
						}),
						(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				Ic = (() => {
					class t {
						constructor(t, e) {
							(this._viewContainer = t),
								(this._context = new Oc()),
								(this._thenTemplateRef = null),
								(this._elseTemplateRef = null),
								(this._thenViewRef = null),
								(this._elseViewRef = null),
								(this._thenTemplateRef = e);
						}
						set ngIf(t) {
							(this._context.$implicit = this._context.ngIf = t),
								this._updateView();
						}
						set ngIfThen(t) {
							Rc('ngIfThen', t),
								(this._thenTemplateRef = t),
								(this._thenViewRef = null),
								this._updateView();
						}
						set ngIfElse(t) {
							Rc('ngIfElse', t),
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
							return new (e || t)(mo(Da), mo(Na));
						}),
						(t.ɵdir = ve({
							type: t,
							selectors: [['', 'ngIf', '']],
							inputs: {
								ngIf: 'ngIf',
								ngIfThen: 'ngIfThen',
								ngIfElse: 'ngIfElse',
							},
						})),
						t
					);
				})();
			class Oc {
				constructor() {
					(this.$implicit = null), (this.ngIf = null);
				}
			}
			function Rc(t, e) {
				if (e && !e.createEmbeddedView)
					throw new Error(
						`${t} must be a TemplateRef, but received '${vt(e)}'.`
					);
			}
			let Pc = (() => {
				class t {}
				return (
					(t.ɵmod = _e({ type: t })),
					(t.ɵinj = ht({
						factory: function (e) {
							return new (e || t)();
						},
						providers: [{ provide: Tc, useClass: Ac }],
					})),
					t
				);
			})();
			function Nc(t) {
				return 'browser' === t;
			}
			function Lc(t) {
				return 'server' === t;
			}
			let Dc = (() => {
				class t {}
				return (
					(t.ɵprov = ut({
						token: t,
						providedIn: 'root',
						factory: () => new Mc(Gt(lc), window, Gt(pr)),
					})),
					t
				);
			})();
			class Mc {
				constructor(t, e, n) {
					(this.document = t),
						(this.window = e),
						(this.errorHandler = n),
						(this.offset = () => [0, 0]);
				}
				setOffset(t) {
					this.offset = Array.isArray(t) ? () => t : t;
				}
				getScrollPosition() {
					return this.supportsScrolling()
						? [this.window.scrollX, this.window.scrollY]
						: [0, 0];
				}
				scrollToPosition(t) {
					this.supportsScrolling() &&
						this.window.scrollTo(t[0], t[1]);
				}
				scrollToAnchor(t) {
					if (this.supportsScrolling()) {
						const e =
							this.document.getElementById(t) ||
							this.document.getElementsByName(t)[0];
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
						r = e.top + this.window.pageYOffset,
						s = this.offset();
					this.window.scrollTo(n - s[0], r - s[1]);
				}
				supportScrollRestoration() {
					try {
						if (!this.window || !this.window.scrollTo) return !1;
						const t =
							Fc(this.window.history) ||
							Fc(Object.getPrototypeOf(this.window.history));
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
			function Fc(t) {
				return Object.getOwnPropertyDescriptor(t, 'scrollRestoration');
			}
			class jc extends class extends class {} {
				constructor() {
					super();
				}
				supportsDOMEvents() {
					return !0;
				}
			} {
				static makeCurrent() {
					var t;
					(t = new jc()), oc || (oc = t);
				}
				getProperty(t, e) {
					return t[e];
				}
				log(t) {
					window.console &&
						window.console.log &&
						window.console.log(t);
				}
				logGroup(t) {
					window.console &&
						window.console.group &&
						window.console.group(t);
				}
				logGroupEnd() {
					window.console &&
						window.console.groupEnd &&
						window.console.groupEnd();
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
					return (e = e || this.getDefaultDocument()).createElement(
						t
					);
				}
				createHtmlDocument() {
					return document.implementation.createHTMLDocument(
						'fakeTitle'
					);
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
					return 'window' === e
						? window
						: 'document' === e
						? t
						: 'body' === e
						? t.body
						: null;
				}
				getHistory() {
					return window.history;
				}
				getLocation() {
					return window.location;
				}
				getBaseHref(t) {
					const e =
						Bc || ((Bc = document.querySelector('base')), Bc)
							? Bc.getAttribute('href')
							: null;
					return null == e
						? null
						: ((n = e),
						  zc || (zc = document.createElement('a')),
						  zc.setAttribute('href', n),
						  '/' === zc.pathname.charAt(0)
								? zc.pathname
								: '/' + zc.pathname);
					var n;
				}
				resetBaseElement() {
					Bc = null;
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
								[r, s] =
									-1 == t
										? [n, '']
										: [n.slice(0, t), n.slice(t + 1)];
							if (r.trim() === e) return decodeURIComponent(s);
						}
						return null;
					})(document.cookie, t);
				}
			}
			let zc,
				Bc = null;
			const Uc = new jt('TRANSITION_ID'),
				Vc = [
					{
						provide: ul,
						useFactory: function (t, e, n) {
							return () => {
								n.get(hl).donePromise.then(() => {
									const n = ac();
									Array.prototype.slice
										.apply(
											e.querySelectorAll(
												'style[ng-transition]'
											)
										)
										.filter(
											e =>
												e.getAttribute(
													'ng-transition'
												) === t
										)
										.forEach(t => n.remove(t));
								});
							};
						},
						deps: [Uc, lc, Xi],
						multi: !0,
					},
				];
			class Hc {
				static init() {
					var t;
					(t = new Hc()), (Hl = t);
				}
				addToWindow(t) {
					(Ot.getAngularTestability = (e, n = !0) => {
						const r = t.findTestabilityInTree(e, n);
						if (null == r)
							throw new Error(
								'Could not find testability for element.'
							);
						return r;
					}),
						(Ot.getAllAngularTestabilities = () =>
							t.getAllTestabilities()),
						(Ot.getAllAngularRootElements = () =>
							t.getAllRootElements()),
						Ot.frameworkStabilizers ||
							(Ot.frameworkStabilizers = []),
						Ot.frameworkStabilizers.push(t => {
							const e = Ot.getAllAngularTestabilities();
							let n = e.length,
								r = !1;
							const s = function (e) {
								(r = r || e), n--, 0 == n && t(r);
							};
							e.forEach(function (t) {
								t.whenStable(s);
							});
						});
				}
				findTestabilityInTree(t, e, n) {
					if (null == e) return null;
					const r = t.getTestability(e);
					return null != r
						? r
						: n
						? ac().isShadowRoot(e)
							? this.findTestabilityInTree(t, e.host, !0)
							: this.findTestabilityInTree(t, e.parentElement, !0)
						: null;
				}
			}
			const $c = new jt('EventManagerPlugins');
			let qc = (() => {
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
						return this._findPluginFor(e).addGlobalEventListener(
							t,
							e,
							n
						);
					}
					getZone() {
						return this._zone;
					}
					_findPluginFor(t) {
						const e = this._eventNameToPlugin.get(t);
						if (e) return e;
						const n = this._plugins;
						for (let r = 0; r < n.length; r++) {
							const e = n[r];
							if (e.supports(t))
								return this._eventNameToPlugin.set(t, e), e;
						}
						throw new Error(
							'No event manager plugin found for event ' + t
						);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Gt($c), Gt(Rl));
					}),
					(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			class Wc {
				constructor(t) {
					this._doc = t;
				}
				addGlobalEventListener(t, e, n) {
					const r = ac().getGlobalEventTarget(this._doc, t);
					if (!r)
						throw new Error(
							`Unsupported event target ${r} for event ${e}`
						);
					return this.addEventListener(r, e, n);
				}
			}
			let Qc = (() => {
					class t {
						constructor() {
							this._stylesSet = new Set();
						}
						addStyles(t) {
							const e = new Set();
							t.forEach(t => {
								this._stylesSet.has(t) ||
									(this._stylesSet.add(t), e.add(t));
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
						(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				Kc = (() => {
					class t extends Qc {
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
								(n.textContent = t),
									this._styleNodes.add(e.appendChild(n));
							});
						}
						addHost(t) {
							this._addStylesToHost(this._stylesSet, t),
								this._hostNodes.add(t);
						}
						removeHost(t) {
							this._hostNodes.delete(t);
						}
						onStylesAdded(t) {
							this._hostNodes.forEach(e =>
								this._addStylesToHost(t, e)
							);
						}
						ngOnDestroy() {
							this._styleNodes.forEach(t => ac().remove(t));
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Gt(lc));
						}),
						(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
						t
					);
				})();
			const Gc = {
					svg: 'http://www.w3.org/2000/svg',
					xhtml: 'http://www.w3.org/1999/xhtml',
					xlink: 'http://www.w3.org/1999/xlink',
					xml: 'http://www.w3.org/XML/1998/namespace',
					xmlns: 'http://www.w3.org/2000/xmlns/',
				},
				Zc = /%COMP%/g;
			function Yc(t, e, n) {
				for (let r = 0; r < e.length; r++) {
					let s = e[r];
					Array.isArray(s)
						? Yc(t, s, n)
						: ((s = s.replace(Zc, t)), n.push(s));
				}
				return n;
			}
			function Xc(t) {
				return e => {
					if ('__ngUnwrap__' === e) return t;
					!1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
				};
			}
			let Jc = (() => {
				class t {
					constructor(t, e, n) {
						(this.eventManager = t),
							(this.sharedStylesHost = e),
							(this.appId = n),
							(this.rendererByCompId = new Map()),
							(this.defaultRenderer = new tu(t));
					}
					createRenderer(t, e) {
						if (!t || !e) return this.defaultRenderer;
						switch (e.encapsulation) {
							case ue.Emulated: {
								let n = this.rendererByCompId.get(e.id);
								return (
									n ||
										((n = new eu(
											this.eventManager,
											this.sharedStylesHost,
											e,
											this.appId
										)),
										this.rendererByCompId.set(e.id, n)),
									n.applyToHost(t),
									n
								);
							}
							case ue.Native:
							case ue.ShadowDom:
								return new nu(
									this.eventManager,
									this.sharedStylesHost,
									t,
									e
								);
							default:
								if (!this.rendererByCompId.has(e.id)) {
									const t = Yc(e.id, e.styles, []);
									this.sharedStylesHost.addStyles(t),
										this.rendererByCompId.set(
											e.id,
											this.defaultRenderer
										);
								}
								return this.defaultRenderer;
						}
					}
					begin() {}
					end() {}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Gt(qc), Gt(Kc), Gt(dl));
					}),
					(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			class tu {
				constructor(t) {
					(this.eventManager = t), (this.data = Object.create(null));
				}
				destroy() {}
				createElement(t, e) {
					return e
						? document.createElementNS(Gc[e] || e, t)
						: document.createElement(t);
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
					let n =
						'string' == typeof t ? document.querySelector(t) : t;
					if (!n)
						throw new Error(
							`The selector "${t}" did not match any elements`
						);
					return e || (n.textContent = ''), n;
				}
				parentNode(t) {
					return t.parentNode;
				}
				nextSibling(t) {
					return t.nextSibling;
				}
				setAttribute(t, e, n, r) {
					if (r) {
						e = r + ':' + e;
						const s = Gc[r];
						s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
					} else t.setAttribute(e, n);
				}
				removeAttribute(t, e, n) {
					if (n) {
						const r = Gc[n];
						r
							? t.removeAttributeNS(r, e)
							: t.removeAttribute(`${n}:${e}`);
					} else t.removeAttribute(e);
				}
				addClass(t, e) {
					t.classList.add(e);
				}
				removeClass(t, e) {
					t.classList.remove(e);
				}
				setStyle(t, e, n, r) {
					r & pa.DashCase
						? t.style.setProperty(
								e,
								n,
								r & pa.Important ? 'important' : ''
						  )
						: (t.style[e] = n);
				}
				removeStyle(t, e, n) {
					n & pa.DashCase
						? t.style.removeProperty(e)
						: (t.style[e] = '');
				}
				setProperty(t, e, n) {
					t[e] = n;
				}
				setValue(t, e) {
					t.nodeValue = e;
				}
				listen(t, e, n) {
					return 'string' == typeof t
						? this.eventManager.addGlobalEventListener(t, e, Xc(n))
						: this.eventManager.addEventListener(t, e, Xc(n));
				}
			}
			class eu extends tu {
				constructor(t, e, n, r) {
					super(t), (this.component = n);
					const s = Yc(r + '-' + n.id, n.styles, []);
					e.addStyles(s),
						(this.contentAttr = '_ngcontent-%COMP%'.replace(
							Zc,
							r + '-' + n.id
						)),
						(this.hostAttr = '_nghost-%COMP%'.replace(
							Zc,
							r + '-' + n.id
						));
				}
				applyToHost(t) {
					super.setAttribute(t, this.hostAttr, '');
				}
				createElement(t, e) {
					const n = super.createElement(t, e);
					return super.setAttribute(n, this.contentAttr, ''), n;
				}
			}
			class nu extends tu {
				constructor(t, e, n, r) {
					super(t),
						(this.sharedStylesHost = e),
						(this.hostEl = n),
						(this.component = r),
						(this.shadowRoot =
							r.encapsulation === ue.ShadowDom
								? n.attachShadow({ mode: 'open' })
								: n.createShadowRoot()),
						this.sharedStylesHost.addHost(this.shadowRoot);
					const s = Yc(r.id, r.styles, []);
					for (let i = 0; i < s.length; i++) {
						const t = document.createElement('style');
						(t.textContent = s[i]), this.shadowRoot.appendChild(t);
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
					return this.nodeOrShadowRoot(
						super.parentNode(this.nodeOrShadowRoot(t))
					);
				}
			}
			let ru = (() => {
				class t extends Wc {
					constructor(t) {
						super(t);
					}
					supports(t) {
						return !0;
					}
					addEventListener(t, e, n) {
						return (
							t.addEventListener(e, n, !1),
							() => this.removeEventListener(t, e, n)
						);
					}
					removeEventListener(t, e, n) {
						return t.removeEventListener(e, n);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Gt(lc));
					}),
					(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const su = ['alt', 'control', 'meta', 'shift'],
				iu = {
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
				ou = {
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
				au = {
					alt: t => t.altKey,
					control: t => t.ctrlKey,
					meta: t => t.metaKey,
					shift: t => t.shiftKey,
				};
			let lu = (() => {
					class t extends Wc {
						constructor(t) {
							super(t);
						}
						supports(e) {
							return null != t.parseEventName(e);
						}
						addEventListener(e, n, r) {
							const s = t.parseEventName(n),
								i = t.eventCallback(
									s.fullKey,
									r,
									this.manager.getZone()
								);
							return this.manager
								.getZone()
								.runOutsideAngular(() =>
									ac().onAndCancel(e, s.domEventName, i)
								);
						}
						static parseEventName(e) {
							const n = e.toLowerCase().split('.'),
								r = n.shift();
							if (
								0 === n.length ||
								('keydown' !== r && 'keyup' !== r)
							)
								return null;
							const s = t._normalizeKey(n.pop());
							let i = '';
							if (
								(su.forEach(t => {
									const e = n.indexOf(t);
									e > -1 && (n.splice(e, 1), (i += t + '.'));
								}),
								(i += s),
								0 != n.length || 0 === s.length)
							)
								return null;
							const o = {};
							return (o.domEventName = r), (o.fullKey = i), o;
						}
						static getEventFullKey(t) {
							let e = '',
								n = (function (t) {
									let e = t.key;
									if (null == e) {
										if (((e = t.keyIdentifier), null == e))
											return 'Unidentified';
										e.startsWith('U+') &&
											((e = String.fromCharCode(
												parseInt(e.substring(2), 16)
											)),
											3 === t.location &&
												ou.hasOwnProperty(e) &&
												(e = ou[e]));
									}
									return iu[e] || e;
								})(t);
							return (
								(n = n.toLowerCase()),
								' ' === n
									? (n = 'space')
									: '.' === n && (n = 'dot'),
								su.forEach(r => {
									r != n && (0, au[r])(t) && (e += r + '.');
								}),
								(e += n),
								e
							);
						}
						static eventCallback(e, n, r) {
							return s => {
								t.getEventFullKey(s) === e &&
									r.runGuarded(() => n(s));
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
							return new (e || t)(Gt(lc));
						}),
						(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				cu = (() => {
					class t {}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵprov = ut({
							factory: function () {
								return Gt(uu);
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				uu = (() => {
					class t extends cu {
						constructor(t) {
							super(), (this._doc = t);
						}
						sanitize(t, e) {
							if (null == e) return null;
							switch (t) {
								case Zr.NONE:
									return e;
								case Zr.HTML:
									return Sr(e, 'HTML')
										? wr(e)
										: Kr(this._doc, String(e));
								case Zr.STYLE:
									return Sr(e, 'Style') ? wr(e) : e;
								case Zr.SCRIPT:
									if (Sr(e, 'Script')) return wr(e);
									throw new Error(
										'unsafe value used in a script context'
									);
								case Zr.URL:
									return (
										Er(e),
										Sr(e, 'URL') ? wr(e) : Rr(String(e))
									);
								case Zr.RESOURCE_URL:
									if (Sr(e, 'ResourceURL')) return wr(e);
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
							return new gr(t);
						}
						bypassSecurityTrustStyle(t) {
							return new yr(t);
						}
						bypassSecurityTrustScript(t) {
							return new _r(t);
						}
						bypassSecurityTrustUrl(t) {
							return new br(t);
						}
						bypassSecurityTrustResourceUrl(t) {
							return new vr(t);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Gt(lc));
						}),
						(t.ɵprov = ut({
							factory: function () {
								return (t = Gt(zt)), new uu(t.get(lc));
								var t;
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})();
			const hu = Wl(rc, 'browser', [
					{ provide: gl, useValue: 'browser' },
					{
						provide: ml,
						useValue: function () {
							jc.makeCurrent(), Hc.init();
						},
						multi: !0,
					},
					{
						provide: lc,
						useFactory: function () {
							return (
								(function (t) {
									ze = t;
								})(document),
								document
							);
						},
						deps: [],
					},
				]),
				du = [
					[],
					{ provide: ji, useValue: 'root' },
					{
						provide: pr,
						useFactory: function () {
							return new pr();
						},
						deps: [],
					},
					{
						provide: $c,
						useClass: ru,
						multi: !0,
						deps: [lc, Rl, gl],
					},
					{ provide: $c, useClass: lu, multi: !0, deps: [lc] },
					[],
					{ provide: Jc, useClass: Jc, deps: [qc, Kc, dl] },
					{ provide: fa, useExisting: Jc },
					{ provide: Qc, useExisting: Kc },
					{ provide: Kc, useClass: Kc, deps: [lc] },
					{ provide: zl, useClass: zl, deps: [Rl] },
					{ provide: qc, useClass: qc, deps: [$c, Rl] },
					[],
				];
			let fu,
				pu = (() => {
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
								providers: [
									{ provide: dl, useValue: e.appId },
									{ provide: Uc, useExisting: dl },
									Vc,
								],
							};
						}
					}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)(Gt(t, 12));
							},
							providers: du,
							imports: [Pc, ic],
						})),
						t
					);
				})();
			'undefined' != typeof window && window;
			try {
				fu = 'undefined' != typeof Intl && Intl.v8BreakIterator;
			} catch (Hw) {
				fu = !1;
			}
			let mu,
				gu,
				yu,
				_u,
				bu = (() => {
					class t {
						constructor(t) {
							(this._platformId = t),
								(this.isBrowser = this._platformId
									? Nc(this._platformId)
									: 'object' == typeof document &&
									  !!document),
								(this.EDGE =
									this.isBrowser &&
									/(edge)/i.test(navigator.userAgent)),
								(this.TRIDENT =
									this.isBrowser &&
									/(msie|trident)/i.test(
										navigator.userAgent
									)),
								(this.BLINK =
									this.isBrowser &&
									!(!window.chrome && !fu) &&
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
									/iPad|iPhone|iPod/.test(
										navigator.userAgent
									) &&
									!('MSStream' in window)),
								(this.FIREFOX =
									this.isBrowser &&
									/(firefox|minefield)/i.test(
										navigator.userAgent
									)),
								(this.ANDROID =
									this.isBrowser &&
									/android/i.test(navigator.userAgent) &&
									!this.TRIDENT),
								(this.SAFARI =
									this.isBrowser &&
									/safari/i.test(navigator.userAgent) &&
									this.WEBKIT);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Gt(gl));
						}),
						(t.ɵprov = ut({
							factory: function () {
								return new t(Gt(gl));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				vu = (() => {
					class t {}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)();
							},
						})),
						t
					);
				})();
			function wu(t) {
				return (function () {
					if (null == mu && 'undefined' != typeof window)
						try {
							window.addEventListener(
								'test',
								null,
								Object.defineProperty({}, 'passive', {
									get: () => (mu = !0),
								})
							);
						} finally {
							mu = mu || !1;
						}
					return mu;
				})()
					? t
					: !!t.capture;
			}
			function Su() {
				if ('object' != typeof document || !document) return 0;
				if (null == gu) {
					const t = document.createElement('div'),
						e = t.style;
					(t.dir = 'rtl'),
						(e.width = '1px'),
						(e.overflow = 'auto'),
						(e.visibility = 'hidden'),
						(e.pointerEvents = 'none'),
						(e.position = 'absolute');
					const n = document.createElement('div'),
						r = n.style;
					(r.width = '2px'),
						(r.height = '1px'),
						t.appendChild(n),
						document.body.appendChild(t),
						(gu = 0),
						0 === t.scrollLeft &&
							((t.scrollLeft = 1),
							(gu = 0 === t.scrollLeft ? 1 : 2)),
						t.parentNode.removeChild(t);
				}
				return gu;
			}
			function Eu(...t) {
				let e = t[t.length - 1];
				return C(e) ? (t.pop(), D(t, e)) : $(t);
			}
			function xu() {}
			function Cu(t, e, n) {
				return function (r) {
					return r.lift(new ku(t, e, n));
				};
			}
			class ku {
				constructor(t, e, n) {
					(this.nextOrObserver = t),
						(this.error = e),
						(this.complete = n);
				}
				call(t, e) {
					return e.subscribe(
						new Tu(
							t,
							this.nextOrObserver,
							this.error,
							this.complete
						)
					);
				}
			}
			class Tu extends p {
				constructor(t, e, n, s) {
					super(t),
						(this._tapNext = xu),
						(this._tapError = xu),
						(this._tapComplete = xu),
						(this._tapError = n || xu),
						(this._tapComplete = s || xu),
						r(e)
							? ((this._context = this), (this._tapNext = e))
							: e &&
							  ((this._context = e),
							  (this._tapNext = e.next || xu),
							  (this._tapError = e.error || xu),
							  (this._tapComplete = e.complete || xu));
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
			class Au extends h {
				constructor(t, e) {
					super();
				}
				schedule(t, e = 0) {
					return this;
				}
			}
			class Iu extends Au {
				constructor(t, e) {
					super(t, e),
						(this.scheduler = t),
						(this.work = e),
						(this.pending = !1);
				}
				schedule(t, e = 0) {
					if (this.closed) return this;
					this.state = t;
					const n = this.id,
						r = this.scheduler;
					return (
						null != n && (this.id = this.recycleAsyncId(r, n, e)),
						(this.pending = !0),
						(this.delay = e),
						(this.id =
							this.id || this.requestAsyncId(r, this.id, e)),
						this
					);
				}
				requestAsyncId(t, e, n = 0) {
					return setInterval(t.flush.bind(t, this), n);
				}
				recycleAsyncId(t, e, n = 0) {
					if (null !== n && this.delay === n && !1 === this.pending)
						return e;
					clearInterval(e);
				}
				execute(t, e) {
					if (this.closed)
						return new Error('executing a cancelled action');
					this.pending = !1;
					const n = this._execute(t, e);
					if (n) return n;
					!1 === this.pending &&
						null != this.id &&
						(this.id = this.recycleAsyncId(
							this.scheduler,
							this.id,
							null
						));
				}
				_execute(t, e) {
					let n = !1,
						r = void 0;
					try {
						this.work(t);
					} catch (s) {
						(n = !0), (r = (!!s && s) || new Error(s));
					}
					if (n) return this.unsubscribe(), r;
				}
				_unsubscribe() {
					const t = this.id,
						e = this.scheduler,
						n = e.actions,
						r = n.indexOf(this);
					(this.work = null),
						(this.state = null),
						(this.pending = !1),
						(this.scheduler = null),
						-1 !== r && n.splice(r, 1),
						null != t &&
							(this.id = this.recycleAsyncId(e, t, null)),
						(this.delay = null);
				}
			}
			let Ou = (() => {
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
			class Ru extends Ou {
				constructor(t, e = Ou.now) {
					super(t, () =>
						Ru.delegate && Ru.delegate !== this
							? Ru.delegate.now()
							: e()
					),
						(this.actions = []),
						(this.active = !1),
						(this.scheduled = void 0);
				}
				schedule(t, e = 0, n) {
					return Ru.delegate && Ru.delegate !== this
						? Ru.delegate.schedule(t, e, n)
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
			const Pu = new Ru(Iu);
			class Nu {
				constructor(t, e) {
					(this.dueTime = t), (this.scheduler = e);
				}
				call(t, e) {
					return e.subscribe(new Lu(t, this.dueTime, this.scheduler));
				}
			}
			class Lu extends p {
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
						this.add(
							(this.debouncedSubscription = this.scheduler.schedule(
								Du,
								this.dueTime,
								this
							))
						);
				}
				_complete() {
					this.debouncedNext(), this.destination.complete();
				}
				debouncedNext() {
					if ((this.clearDebounce(), this.hasValue)) {
						const { lastValue: t } = this;
						(this.lastValue = null),
							(this.hasValue = !1),
							this.destination.next(t);
					}
				}
				clearDebounce() {
					const t = this.debouncedSubscription;
					null !== t &&
						(this.remove(t),
						t.unsubscribe(),
						(this.debouncedSubscription = null));
				}
			}
			function Du(t) {
				t.debouncedNext();
			}
			function Mu(t, e) {
				return function (n) {
					return n.lift(new Fu(t, e));
				};
			}
			class Fu {
				constructor(t, e) {
					(this.predicate = t), (this.thisArg = e);
				}
				call(t, e) {
					return e.subscribe(new ju(t, this.predicate, this.thisArg));
				}
			}
			class ju extends p {
				constructor(t, e, n) {
					super(t),
						(this.predicate = e),
						(this.thisArg = n),
						(this.count = 0);
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
			const zu = (() => {
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
				Bu = new _(t => t.complete());
			function Uu(t) {
				return t
					? (function (t) {
							return new _(e => t.schedule(() => e.complete()));
					  })(t)
					: Bu;
			}
			function Vu(t) {
				return e => (0 === t ? Uu() : e.lift(new Hu(t)));
			}
			class Hu {
				constructor(t) {
					if (((this.total = t), this.total < 0)) throw new zu();
				}
				call(t, e) {
					return e.subscribe(new $u(t, this.total));
				}
			}
			class $u extends p {
				constructor(t, e) {
					super(t), (this.total = e), (this.count = 0);
				}
				_next(t) {
					const e = this.total,
						n = ++this.count;
					n <= e &&
						(this.destination.next(t),
						n === e &&
							(this.destination.complete(), this.unsubscribe()));
				}
			}
			function qu(t) {
				return null != t && '' + t != 'false';
			}
			function Wu(t, e = 0) {
				return (function (t) {
					return !isNaN(parseFloat(t)) && !isNaN(Number(t));
				})(t)
					? Number(t)
					: e;
			}
			function Qu(t) {
				return t instanceof ha ? t.nativeElement : t;
			}
			let Ku = (() => {
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
									('function' == typeof t.getClientRects &&
										t.getClientRects().length)
								);
							})(t) &&
							'visible' === getComputedStyle(t).visibility
						);
					}
					isTabbable(t) {
						if (!this._platform.isBrowser) return !1;
						const e = (function (t) {
							try {
								return t.frameElement;
							} catch (Hw) {
								return null;
							}
						})(
							((n = t).ownerDocument &&
								n.ownerDocument.defaultView) ||
								window
						);
						var n;
						if (e) {
							if (-1 === Zu(e)) return !1;
							if (!this.isVisible(e)) return !1;
						}
						let r = t.nodeName.toLowerCase(),
							s = Zu(t);
						return t.hasAttribute('contenteditable')
							? -1 !== s
							: 'iframe' !== r &&
									'object' !== r &&
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
									('audio' === r
										? !!t.hasAttribute('controls') &&
										  -1 !== s
										: 'video' === r
										? -1 !== s &&
										  (null !== s ||
												this._platform.FIREFOX ||
												t.hasAttribute('controls'))
										: t.tabIndex >= 0);
					}
					isFocusable(t, e) {
						return (
							(function (t) {
								return (
									!(function (t) {
										return (
											(function (t) {
												return (
													'input' ==
													t.nodeName.toLowerCase()
												);
											})(t) && 'hidden' == t.type
										);
									})(t) &&
									((function (t) {
										let e = t.nodeName.toLowerCase();
										return (
											'input' === e ||
											'select' === e ||
											'button' === e ||
											'textarea' === e
										);
									})(t) ||
										(function (t) {
											return (
												(function (t) {
													return (
														'a' ==
														t.nodeName.toLowerCase()
													);
												})(t) && t.hasAttribute('href')
											);
										})(t) ||
										t.hasAttribute('contenteditable') ||
										Gu(t))
								);
							})(t) &&
							!this.isDisabled(t) &&
							((null == e ? void 0 : e.ignoreVisibility) ||
								this.isVisible(t))
						);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Gt(bu));
					}),
					(t.ɵprov = ut({
						factory: function () {
							return new t(Gt(bu));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			function Gu(t) {
				if (!t.hasAttribute('tabindex') || void 0 === t.tabIndex)
					return !1;
				let e = t.getAttribute('tabindex');
				return '-32768' != e && !(!e || isNaN(parseInt(e, 10)));
			}
			function Zu(t) {
				if (!Gu(t)) return null;
				const e = parseInt(t.getAttribute('tabindex') || '', 10);
				return isNaN(e) ? -1 : e;
			}
			class Yu {
				constructor(t, e, n, r, s = !1) {
					(this._element = t),
						(this._checker = e),
						(this._ngZone = n),
						(this._document = r),
						(this._hasAttached = !1),
						(this.startAnchorListener = () =>
							this.focusLastTabbableElement()),
						(this.endAnchorListener = () =>
							this.focusFirstTabbableElement()),
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
						(t.removeEventListener(
							'focus',
							this.startAnchorListener
						),
						t.parentNode && t.parentNode.removeChild(t)),
						e &&
							(e.removeEventListener(
								'focus',
								this.endAnchorListener
							),
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
								this._startAnchor.addEventListener(
									'focus',
									this.startAnchorListener
								)),
								this._endAnchor ||
									((this._endAnchor = this._createAnchor()),
									this._endAnchor.addEventListener(
										'focus',
										this.endAnchorListener
									));
						}),
						this._element.parentNode &&
							(this._element.parentNode.insertBefore(
								this._startAnchor,
								this._element
							),
							this._element.parentNode.insertBefore(
								this._endAnchor,
								this._element.nextSibling
							),
							(this._hasAttached = !0)),
						this._hasAttached)
					);
				}
				focusInitialElementWhenReady() {
					return new Promise(t => {
						this._executeOnStable(() =>
							t(this.focusInitialElement())
						);
					});
				}
				focusFirstTabbableElementWhenReady() {
					return new Promise(t => {
						this._executeOnStable(() =>
							t(this.focusFirstTabbableElement())
						);
					});
				}
				focusLastTabbableElementWhenReady() {
					return new Promise(t => {
						this._executeOnStable(() =>
							t(this.focusLastTabbableElement())
						);
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
					const t = this._element.querySelector(
						'[cdk-focus-initial], [cdkFocusInitial]'
					);
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
					if (
						this._checker.isFocusable(t) &&
						this._checker.isTabbable(t)
					)
						return t;
					let e = t.children || t.childNodes;
					for (let n = 0; n < e.length; n++) {
						let t =
							e[n].nodeType === this._document.ELEMENT_NODE
								? this._getFirstTabbableElement(e[n])
								: null;
						if (t) return t;
					}
					return null;
				}
				_getLastTabbableElement(t) {
					if (
						this._checker.isFocusable(t) &&
						this._checker.isTabbable(t)
					)
						return t;
					let e = t.children || t.childNodes;
					for (let n = e.length - 1; n >= 0; n--) {
						let t =
							e[n].nodeType === this._document.ELEMENT_NODE
								? this._getLastTabbableElement(e[n])
								: null;
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
					t
						? e.setAttribute('tabindex', '0')
						: e.removeAttribute('tabindex');
				}
				toggleAnchors(t) {
					this._startAnchor &&
						this._endAnchor &&
						(this._toggleAnchorTabIndex(t, this._startAnchor),
						this._toggleAnchorTabIndex(t, this._endAnchor));
				}
				_executeOnStable(t) {
					this._ngZone.isStable
						? t()
						: this._ngZone.onStable.pipe(Vu(1)).subscribe(t);
				}
			}
			let Xu = (() => {
				class t {
					constructor(t, e, n) {
						(this._checker = t),
							(this._ngZone = e),
							(this._document = n);
					}
					create(t, e = !1) {
						return new Yu(
							t,
							this._checker,
							this._ngZone,
							this._document,
							e
						);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Gt(Ku), Gt(Rl), Gt(lc));
					}),
					(t.ɵprov = ut({
						factory: function () {
							return new t(Gt(Ku), Gt(Rl), Gt(lc));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			function Ju(t) {
				return 0 === t.buttons;
			}
			'undefined' != typeof Element && Element;
			const th = new jt('cdk-focus-monitor-default-options'),
				eh = wu({ passive: !0, capture: !0 });
			let nh = (() => {
				class t {
					constructor(t, e, n, r) {
						(this._ngZone = t),
							(this._platform = e),
							(this._origin = null),
							(this._windowFocused = !1),
							(this._elementInfo = new Map()),
							(this._monitoredElementCount = 0),
							(this._rootNodeFocusListenerCount = new Map()),
							(this._documentKeydownListener = () => {
								(this._lastTouchTarget = null),
									this._setOriginForCurrentEventQueue(
										'keyboard'
									);
							}),
							(this._documentMousedownListener = t => {
								if (!this._lastTouchTarget) {
									const e = Ju(t) ? 'keyboard' : 'mouse';
									this._setOriginForCurrentEventQueue(e);
								}
							}),
							(this._documentTouchstartListener = t => {
								null != this._touchTimeoutId &&
									clearTimeout(this._touchTimeoutId),
									(this._lastTouchTarget = rh(t)),
									(this._touchTimeoutId = setTimeout(
										() => (this._lastTouchTarget = null),
										650
									));
							}),
							(this._windowFocusListener = () => {
								(this._windowFocused = !0),
									(this._windowFocusTimeoutId = setTimeout(
										() => (this._windowFocused = !1)
									));
							}),
							(this._rootNodeFocusAndBlurListener = t => {
								const e = rh(t),
									n =
										'focus' === t.type
											? this._onFocus
											: this._onBlur;
								for (let r = e; r; r = r.parentElement)
									n.call(this, t, r);
							}),
							(this._document = n),
							(this._detectionMode =
								(null == r ? void 0 : r.detectionMode) || 0);
					}
					monitor(t, e = !1) {
						const n = Qu(t);
						if (!this._platform.isBrowser || 1 !== n.nodeType)
							return Eu(null);
						const r =
								(function (t) {
									if (
										(function () {
											if (null == _u) {
												const t =
													'undefined' !=
													typeof document
														? document.head
														: null;
												_u = !(
													!t ||
													(!t.createShadowRoot &&
														!t.attachShadow)
												);
											}
											return _u;
										})()
									) {
										const e = t.getRootNode
											? t.getRootNode()
											: null;
										if (
											'undefined' != typeof ShadowRoot &&
											ShadowRoot &&
											e instanceof ShadowRoot
										)
											return e;
									}
									return null;
								})(n) || this._getDocument(),
							s = this._elementInfo.get(n);
						if (s) return e && (s.checkChildren = !0), s.subject;
						const i = {
							checkChildren: e,
							subject: new E(),
							rootNode: r,
						};
						return (
							this._elementInfo.set(n, i),
							this._registerGlobalListeners(i),
							i.subject
						);
					}
					stopMonitoring(t) {
						const e = Qu(t),
							n = this._elementInfo.get(e);
						n &&
							(n.subject.complete(),
							this._setClasses(e),
							this._elementInfo.delete(e),
							this._removeGlobalListeners(n));
					}
					focusVia(t, e, n) {
						const r = Qu(t);
						this._setOriginForCurrentEventQueue(e),
							'function' == typeof r.focus && r.focus(n);
					}
					ngOnDestroy() {
						this._elementInfo.forEach((t, e) =>
							this.stopMonitoring(e)
						);
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
							this._toggleClass(
								t,
								'cdk-touch-focused',
								'touch' === e
							),
							this._toggleClass(
								t,
								'cdk-keyboard-focused',
								'keyboard' === e
							),
							this._toggleClass(
								t,
								'cdk-mouse-focused',
								'mouse' === e
							),
							this._toggleClass(
								t,
								'cdk-program-focused',
								'program' === e
							);
					}
					_setOriginForCurrentEventQueue(t) {
						this._ngZone.runOutsideAngular(() => {
							(this._origin = t),
								0 === this._detectionMode &&
									(this._originTimeoutId = setTimeout(
										() => (this._origin = null),
										1
									));
						});
					}
					_wasCausedByTouch(t) {
						const e = rh(t);
						return (
							this._lastTouchTarget instanceof Node &&
							e instanceof Node &&
							(e === this._lastTouchTarget ||
								e.contains(this._lastTouchTarget))
						);
					}
					_onFocus(t, e) {
						const n = this._elementInfo.get(e);
						if (!n || (!n.checkChildren && e !== rh(t))) return;
						const r = this._getFocusOrigin(t);
						this._setClasses(e, r),
							this._emitOrigin(n.subject, r),
							(this._lastFocusOrigin = r);
					}
					_onBlur(t, e) {
						const n = this._elementInfo.get(e);
						!n ||
							(n.checkChildren &&
								t.relatedTarget instanceof Node &&
								e.contains(t.relatedTarget)) ||
							(this._setClasses(e),
							this._emitOrigin(n.subject, null));
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
								e.addEventListener(
									'focus',
									this._rootNodeFocusAndBlurListener,
									eh
								),
									e.addEventListener(
										'blur',
										this._rootNodeFocusAndBlurListener,
										eh
									);
							}),
							this._rootNodeFocusListenerCount.set(e, n + 1),
							1 == ++this._monitoredElementCount &&
								this._ngZone.runOutsideAngular(() => {
									const t = this._getDocument(),
										e = this._getWindow();
									t.addEventListener(
										'keydown',
										this._documentKeydownListener,
										eh
									),
										t.addEventListener(
											'mousedown',
											this._documentMousedownListener,
											eh
										),
										t.addEventListener(
											'touchstart',
											this._documentTouchstartListener,
											eh
										),
										e.addEventListener(
											'focus',
											this._windowFocusListener
										);
								});
					}
					_removeGlobalListeners(t) {
						const e = t.rootNode;
						if (this._rootNodeFocusListenerCount.has(e)) {
							const t = this._rootNodeFocusListenerCount.get(e);
							t > 1
								? this._rootNodeFocusListenerCount.set(e, t - 1)
								: (e.removeEventListener(
										'focus',
										this._rootNodeFocusAndBlurListener,
										eh
								  ),
								  e.removeEventListener(
										'blur',
										this._rootNodeFocusAndBlurListener,
										eh
								  ),
								  this._rootNodeFocusListenerCount.delete(e));
						}
						if (!--this._monitoredElementCount) {
							const t = this._getDocument(),
								e = this._getWindow();
							t.removeEventListener(
								'keydown',
								this._documentKeydownListener,
								eh
							),
								t.removeEventListener(
									'mousedown',
									this._documentMousedownListener,
									eh
								),
								t.removeEventListener(
									'touchstart',
									this._documentTouchstartListener,
									eh
								),
								e.removeEventListener(
									'focus',
									this._windowFocusListener
								),
								clearTimeout(this._windowFocusTimeoutId),
								clearTimeout(this._touchTimeoutId),
								clearTimeout(this._originTimeoutId);
						}
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(
							Gt(Rl),
							Gt(bu),
							Gt(lc, 8),
							Gt(th, 8)
						);
					}),
					(t.ɵprov = ut({
						factory: function () {
							return new t(Gt(Rl), Gt(bu), Gt(lc, 8), Gt(th, 8));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			function rh(t) {
				return t.composedPath ? t.composedPath()[0] : t.target;
			}
			const sh = 'cdk-high-contrast-black-on-white',
				ih = 'cdk-high-contrast-white-on-black',
				oh = 'cdk-high-contrast-active';
			let ah = (() => {
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
							n =
								e && e.getComputedStyle
									? e.getComputedStyle(t)
									: null,
							r = ((n && n.backgroundColor) || '').replace(
								/ /g,
								''
							);
						switch ((this._document.body.removeChild(t), r)) {
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
							t.remove(oh), t.remove(sh), t.remove(ih);
							const e = this.getHighContrastMode();
							1 === e
								? (t.add(oh), t.add(sh))
								: 2 === e && (t.add(oh), t.add(ih));
						}
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Gt(bu), Gt(lc));
					}),
					(t.ɵprov = ut({
						factory: function () {
							return new t(Gt(bu), Gt(lc));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			const lh = new jt('cdk-dir-doc', {
				providedIn: 'root',
				factory: function () {
					return Zt(lc);
				},
			});
			let ch = (() => {
					class t {
						constructor(t) {
							if (
								((this.value = 'ltr'),
								(this.change = new Wa()),
								t)
							) {
								const e = t.documentElement
										? t.documentElement.dir
										: null,
									n = (t.body ? t.body.dir : null) || e;
								this.value =
									'ltr' === n || 'rtl' === n ? n : 'ltr';
							}
						}
						ngOnDestroy() {
							this.change.complete();
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Gt(lh, 8));
						}),
						(t.ɵprov = ut({
							factory: function () {
								return new t(Gt(lh, 8));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				uh = (() => {
					class t {}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)();
							},
						})),
						t
					);
				})();
			const hh = new ga('10.2.6');
			function dh() {
				return H(1);
			}
			function fh(...t) {
				return dh()(Eu(...t));
			}
			function ph(...t) {
				const e = t[t.length - 1];
				return C(e) ? (t.pop(), n => fh(t, n, e)) : e => fh(t, e);
			}
			class mh {}
			const gh = '*';
			function yh(t, e) {
				return { type: 7, name: t, definitions: e, options: {} };
			}
			function _h(t, e = null) {
				return { type: 4, styles: e, timings: t };
			}
			function bh(t, e = null) {
				return { type: 2, steps: t, options: e };
			}
			function vh(t) {
				return { type: 6, styles: t, offset: null };
			}
			function wh(t, e, n) {
				return { type: 0, name: t, styles: e, options: n };
			}
			function Sh(t, e, n = null) {
				return { type: 1, expr: t, animation: e, options: n };
			}
			function Eh(t) {
				Promise.resolve(null).then(t);
			}
			class xh {
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
						((this._finished = !0),
						this._onDoneFns.forEach(t => t()),
						(this._onDoneFns = []));
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
					this.hasStarted() ||
						(this._onStart(), this.triggerMicrotask()),
						(this._started = !0);
				}
				triggerMicrotask() {
					Eh(() => this._onFinish());
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
			class Ch {
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
						r = 0;
					const s = this.players.length;
					0 == s
						? Eh(() => this._onFinish())
						: this.players.forEach(t => {
								t.onDone(() => {
									++e == s && this._onFinish();
								}),
									t.onDestroy(() => {
										++n == s && this._onDestroy();
									}),
									t.onStart(() => {
										++r == s && this._onStart();
									});
						  }),
						(this.totalTime = this.players.reduce(
							(t, e) => Math.max(t, e.totalTime),
							0
						));
				}
				_onFinish() {
					this._finished ||
						((this._finished = !0),
						this._onDoneFns.forEach(t => t()),
						(this._onDoneFns = []));
				}
				init() {
					this.players.forEach(t => t.init());
				}
				onStart(t) {
					this._onStartFns.push(t);
				}
				_onStart() {
					this.hasStarted() ||
						((this._started = !0),
						this._onStartFns.forEach(t => t()),
						(this._onStartFns = []));
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
					this.parentPlayer || this.init(),
						this._onStart(),
						this.players.forEach(t => t.play());
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
						const n = t.totalTime
							? Math.min(1, e / t.totalTime)
							: 1;
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
			function kh() {
				return (
					'undefined' != typeof process &&
					'[object process]' === {}.toString.call(process)
				);
			}
			function Th(t) {
				switch (t.length) {
					case 0:
						return new xh();
					case 1:
						return t[0];
					default:
						return new Ch(t);
				}
			}
			function Ah(t, e, n, r, s = {}, i = {}) {
				const o = [],
					a = [];
				let l = -1,
					c = null;
				if (
					(r.forEach(t => {
						const n = t.offset,
							r = n == l,
							u = (r && c) || {};
						Object.keys(t).forEach(n => {
							let r = n,
								a = t[n];
							if ('offset' !== n)
								switch (
									((r = e.normalizePropertyName(r, o)), a)
								) {
									case '!':
										a = s[n];
										break;
									case gh:
										a = i[n];
										break;
									default:
										a = e.normalizeStyleValue(n, r, a, o);
								}
							u[r] = a;
						}),
							r || a.push(u),
							(c = u),
							(l = n);
					}),
					o.length)
				) {
					const t = '\n - ';
					throw new Error(
						`Unable to animate due to the following errors:${t}${o.join(
							t
						)}`
					);
				}
				return a;
			}
			function Ih(t, e, n, r) {
				switch (e) {
					case 'start':
						t.onStart(() => r(n && Oh(n, 'start', t)));
						break;
					case 'done':
						t.onDone(() => r(n && Oh(n, 'done', t)));
						break;
					case 'destroy':
						t.onDestroy(() => r(n && Oh(n, 'destroy', t)));
				}
			}
			function Oh(t, e, n) {
				const r = n.totalTime,
					s = Rh(
						t.element,
						t.triggerName,
						t.fromState,
						t.toState,
						e || t.phaseName,
						null == r ? t.totalTime : r,
						!!n.disabled
					),
					i = t._data;
				return null != i && (s._data = i), s;
			}
			function Rh(t, e, n, r, s = '', i = 0, o) {
				return {
					element: t,
					triggerName: e,
					fromState: n,
					toState: r,
					phaseName: s,
					totalTime: i,
					disabled: !!o,
				};
			}
			function Ph(t, e, n) {
				let r;
				return (
					t instanceof Map
						? ((r = t.get(e)), r || t.set(e, (r = n)))
						: ((r = t[e]), r || (r = t[e] = n)),
					r
				);
			}
			function Nh(t) {
				const e = t.indexOf(':');
				return [t.substring(1, e), t.substr(e + 1)];
			}
			let Lh = (t, e) => !1,
				Dh = (t, e) => !1,
				Mh = (t, e, n) => [];
			const Fh = kh();
			(Fh || 'undefined' != typeof Element) &&
				((Lh = (t, e) => t.contains(e)),
				(Dh = (() => {
					if (Fh || Element.prototype.matches)
						return (t, e) => t.matches(e);
					{
						const t = Element.prototype,
							e =
								t.matchesSelector ||
								t.mozMatchesSelector ||
								t.msMatchesSelector ||
								t.oMatchesSelector ||
								t.webkitMatchesSelector;
						return e ? (t, n) => e.apply(t, [n]) : Dh;
					}
				})()),
				(Mh = (t, e, n) => {
					let r = [];
					if (n) r.push(...t.querySelectorAll(e));
					else {
						const n = t.querySelector(e);
						n && r.push(n);
					}
					return r;
				}));
			let jh = null,
				zh = !1;
			function Bh(t) {
				jh ||
					((jh =
						('undefined' != typeof document
							? document.body
							: null) || {}),
					(zh = !!jh.style && 'WebkitAppearance' in jh.style));
				let e = !0;
				return (
					jh.style &&
						!(function (t) {
							return 'ebkit' == t.substring(1, 6);
						})(t) &&
						((e = t in jh.style), !e && zh) &&
						(e =
							'Webkit' +
								t.charAt(0).toUpperCase() +
								t.substr(1) in
							jh.style),
					e
				);
			}
			const Uh = Dh,
				Vh = Lh,
				Hh = Mh;
			function $h(t) {
				const e = {};
				return (
					Object.keys(t).forEach(n => {
						const r = n.replace(/([a-z])([A-Z])/g, '$1-$2');
						e[r] = t[n];
					}),
					e
				);
			}
			let qh = (() => {
					class t {
						validateStyleProperty(t) {
							return Bh(t);
						}
						matchesElement(t, e) {
							return Uh(t, e);
						}
						containsElement(t, e) {
							return Vh(t, e);
						}
						query(t, e, n) {
							return Hh(t, e, n);
						}
						computeStyle(t, e, n) {
							return n || '';
						}
						animate(t, e, n, r, s, i = [], o) {
							return new xh(n, r);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				Wh = (() => {
					class t {}
					return (t.NOOP = new qh()), t;
				})();
			const Qh = 'ng-enter',
				Kh = 'ng-leave',
				Gh = 'ng-trigger',
				Zh = '.ng-trigger',
				Yh = 'ng-animating',
				Xh = '.ng-animating';
			function Jh(t) {
				if ('number' == typeof t) return t;
				const e = t.match(/^(-?[\.\d]+)(m?s)/);
				return !e || e.length < 2 ? 0 : td(parseFloat(e[1]), e[2]);
			}
			function td(t, e) {
				switch (e) {
					case 's':
						return 1e3 * t;
					default:
						return t;
				}
			}
			function ed(t, e, n) {
				return t.hasOwnProperty('duration')
					? t
					: (function (t, e, n) {
							let r,
								s = 0,
								i = '';
							if ('string' == typeof t) {
								const n = t.match(
									/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
								);
								if (null === n)
									return (
										e.push(
											`The provided timing value "${t}" is invalid.`
										),
										{ duration: 0, delay: 0, easing: '' }
									);
								r = td(parseFloat(n[1]), n[2]);
								const o = n[3];
								null != o && (s = td(parseFloat(o), n[4]));
								const a = n[5];
								a && (i = a);
							} else r = t;
							if (!n) {
								let n = !1,
									i = e.length;
								r < 0 &&
									(e.push(
										'Duration values below 0 are not allowed for this animation step.'
									),
									(n = !0)),
									s < 0 &&
										(e.push(
											'Delay values below 0 are not allowed for this animation step.'
										),
										(n = !0)),
									n &&
										e.splice(
											i,
											0,
											`The provided timing value "${t}" is invalid.`
										);
							}
							return { duration: r, delay: s, easing: i };
					  })(t, e, n);
			}
			function nd(t, e = {}) {
				return (
					Object.keys(t).forEach(n => {
						e[n] = t[n];
					}),
					e
				);
			}
			function rd(t, e, n = {}) {
				if (e) for (let r in t) n[r] = t[r];
				else nd(t, n);
				return n;
			}
			function sd(t, e, n) {
				return n ? e + ':' + n + ';' : '';
			}
			function id(t) {
				let e = '';
				for (let n = 0; n < t.style.length; n++) {
					const r = t.style.item(n);
					e += sd(0, r, t.style.getPropertyValue(r));
				}
				for (const n in t.style)
					t.style.hasOwnProperty(n) &&
						!n.startsWith('_') &&
						(e += sd(
							0,
							n.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
							t.style[n]
						));
				t.setAttribute('style', e);
			}
			function od(t, e, n) {
				t.style &&
					(Object.keys(e).forEach(r => {
						const s = pd(r);
						n && !n.hasOwnProperty(r) && (n[r] = t.style[s]),
							(t.style[s] = e[r]);
					}),
					kh() && id(t));
			}
			function ad(t, e) {
				t.style &&
					(Object.keys(e).forEach(e => {
						const n = pd(e);
						t.style[n] = '';
					}),
					kh() && id(t));
			}
			function ld(t) {
				return Array.isArray(t) ? (1 == t.length ? t[0] : bh(t)) : t;
			}
			const cd = new RegExp('{{\\s*(.+?)\\s*}}', 'g');
			function ud(t) {
				let e = [];
				if ('string' == typeof t) {
					let n;
					for (; (n = cd.exec(t)); ) e.push(n[1]);
					cd.lastIndex = 0;
				}
				return e;
			}
			function hd(t, e, n) {
				const r = t.toString(),
					s = r.replace(cd, (t, r) => {
						let s = e[r];
						return (
							e.hasOwnProperty(r) ||
								(n.push(
									'Please provide a value for the animation param ' +
										r
								),
								(s = '')),
							s.toString()
						);
					});
				return s == r ? t : s;
			}
			function dd(t) {
				const e = [];
				let n = t.next();
				for (; !n.done; ) e.push(n.value), (n = t.next());
				return e;
			}
			const fd = /-+([a-z0-9])/g;
			function pd(t) {
				return t.replace(fd, (...t) => t[1].toUpperCase());
			}
			function md(t, e) {
				return 0 === t || 0 === e;
			}
			function gd(t, e, n) {
				const r = Object.keys(n);
				if (r.length && e.length) {
					let i = e[0],
						o = [];
					if (
						(r.forEach(t => {
							i.hasOwnProperty(t) || o.push(t), (i[t] = n[t]);
						}),
						o.length)
					)
						for (var s = 1; s < e.length; s++) {
							let n = e[s];
							o.forEach(function (e) {
								n[e] = _d(t, e);
							});
						}
				}
				return e;
			}
			function yd(t, e, n) {
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
						throw new Error(
							'Unable to resolve animation metadata node #' +
								e.type
						);
				}
			}
			function _d(t, e) {
				return window.getComputedStyle(t)[e];
			}
			const bd = '*';
			function vd(t, e) {
				const n = [];
				return (
					'string' == typeof t
						? t.split(/\s*,\s*/).forEach(t =>
								(function (t, e, n) {
									if (':' == t[0]) {
										const r = (function (t, e) {
											switch (t) {
												case ':enter':
													return 'void => *';
												case ':leave':
													return '* => void';
												case ':increment':
													return (t, e) =>
														parseFloat(e) >
														parseFloat(t);
												case ':decrement':
													return (t, e) =>
														parseFloat(e) <
														parseFloat(t);
												default:
													return (
														e.push(
															`The transition alias value "${t}" is not supported`
														),
														'* => *'
													);
											}
										})(t, n);
										if ('function' == typeof r)
											return void e.push(r);
										t = r;
									}
									const r = t.match(
										/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/
									);
									if (null == r || r.length < 4)
										return (
											n.push(
												`The provided transition expression "${t}" is not supported`
											),
											e
										);
									const s = r[1],
										i = r[2],
										o = r[3];
									e.push(Ed(s, o)),
										'<' != i[0] ||
											(s == bd && o == bd) ||
											e.push(Ed(o, s));
								})(t, n, e)
						  )
						: n.push(t),
					n
				);
			}
			const wd = new Set(['true', '1']),
				Sd = new Set(['false', '0']);
			function Ed(t, e) {
				const n = wd.has(t) || Sd.has(t),
					r = wd.has(e) || Sd.has(e);
				return (s, i) => {
					let o = t == bd || t == s,
						a = e == bd || e == i;
					return (
						!o &&
							n &&
							'boolean' == typeof s &&
							(o = s ? wd.has(t) : Sd.has(t)),
						!a &&
							r &&
							'boolean' == typeof i &&
							(a = i ? wd.has(e) : Sd.has(e)),
						o && a
					);
				};
			}
			const xd = new RegExp('s*:selfs*,?', 'g');
			function Cd(t, e, n) {
				return new kd(t).build(e, n);
			}
			class kd {
				constructor(t) {
					this._driver = t;
				}
				build(t, e) {
					const n = new Td(e);
					return (
						this._resetContextStyleTimingState(n),
						yd(this, ld(t), n)
					);
				}
				_resetContextStyleTimingState(t) {
					(t.currentQuerySelector = ''),
						(t.collectedStyles = {}),
						(t.collectedStyles[''] = {}),
						(t.currentTime = 0);
				}
				visitTrigger(t, e) {
					let n = (e.queryCount = 0),
						r = (e.depCount = 0);
					const s = [],
						i = [];
					return (
						'@' == t.name.charAt(0) &&
							e.errors.push(
								"animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"
							),
						t.definitions.forEach(t => {
							if (
								(this._resetContextStyleTimingState(e),
								0 == t.type)
							) {
								const n = t,
									r = n.name;
								r
									.toString()
									.split(/\s*,\s*/)
									.forEach(t => {
										(n.name = t),
											s.push(this.visitState(n, e));
									}),
									(n.name = r);
							} else if (1 == t.type) {
								const s = this.visitTransition(t, e);
								(n += s.queryCount),
									(r += s.depCount),
									i.push(s);
							} else
								e.errors.push(
									'only state() and transition() definitions can sit inside of a trigger()'
								);
						}),
						{
							type: 7,
							name: t.name,
							states: s,
							transitions: i,
							queryCount: n,
							depCount: r,
							options: null,
						}
					);
				}
				visitState(t, e) {
					const n = this.visitStyle(t.styles, e),
						r = (t.options && t.options.params) || null;
					if (n.containsDynamicStyles) {
						const s = new Set(),
							i = r || {};
						if (
							(n.styles.forEach(t => {
								if (Ad(t)) {
									const e = t;
									Object.keys(e).forEach(t => {
										ud(e[t]).forEach(t => {
											i.hasOwnProperty(t) || s.add(t);
										});
									});
								}
							}),
							s.size)
						) {
							const n = dd(s.values());
							e.errors.push(
								`state("${
									t.name
								}", ...) must define default values for all the following style substitutions: ${n.join(
									', '
								)}`
							);
						}
					}
					return {
						type: 0,
						name: t.name,
						style: n,
						options: r ? { params: r } : null,
					};
				}
				visitTransition(t, e) {
					(e.queryCount = 0), (e.depCount = 0);
					const n = yd(this, ld(t.animation), e);
					return {
						type: 1,
						matchers: vd(t.expr, e.errors),
						animation: n,
						queryCount: e.queryCount,
						depCount: e.depCount,
						options: Id(t.options),
					};
				}
				visitSequence(t, e) {
					return {
						type: 2,
						steps: t.steps.map(t => yd(this, t, e)),
						options: Id(t.options),
					};
				}
				visitGroup(t, e) {
					const n = e.currentTime;
					let r = 0;
					const s = t.steps.map(t => {
						e.currentTime = n;
						const s = yd(this, t, e);
						return (r = Math.max(r, e.currentTime)), s;
					});
					return (
						(e.currentTime = r),
						{ type: 3, steps: s, options: Id(t.options) }
					);
				}
				visitAnimate(t, e) {
					const n = (function (t, e) {
						let n = null;
						if (t.hasOwnProperty('duration')) n = t;
						else if ('number' == typeof t)
							return Od(ed(t, e).duration, 0, '');
						const r = t;
						if (
							r
								.split(/\s+/)
								.some(
									t =>
										'{' == t.charAt(0) && '{' == t.charAt(1)
								)
						) {
							const t = Od(0, 0, '');
							return (t.dynamic = !0), (t.strValue = r), t;
						}
						return (
							(n = n || ed(r, e)),
							Od(n.duration, n.delay, n.easing)
						);
					})(t.timings, e.errors);
					let r;
					e.currentAnimateTimings = n;
					let s = t.styles ? t.styles : vh({});
					if (5 == s.type) r = this.visitKeyframes(s, e);
					else {
						let s = t.styles,
							i = !1;
						if (!s) {
							i = !0;
							const t = {};
							n.easing && (t.easing = n.easing), (s = vh(t));
						}
						e.currentTime += n.duration + n.delay;
						const o = this.visitStyle(s, e);
						(o.isEmptyStep = i), (r = o);
					}
					return (
						(e.currentAnimateTimings = null),
						{ type: 4, timings: n, style: r, options: null }
					);
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
									? t == gh
										? n.push(t)
										: e.errors.push(
												`The provided style string value ${t} is not allowed.`
										  )
									: n.push(t);
						  })
						: n.push(t.styles);
					let r = !1,
						s = null;
					return (
						n.forEach(t => {
							if (Ad(t)) {
								const e = t,
									n = e.easing;
								if ((n && ((s = n), delete e.easing), !r))
									for (let t in e)
										if (
											e[t].toString().indexOf('{{') >= 0
										) {
											r = !0;
											break;
										}
							}
						}),
						{
							type: 6,
							styles: n,
							easing: s,
							offset: t.offset,
							containsDynamicStyles: r,
							options: null,
						}
					);
				}
				_validateStyleAst(t, e) {
					const n = e.currentAnimateTimings;
					let r = e.currentTime,
						s = e.currentTime;
					n && s > 0 && (s -= n.duration + n.delay),
						t.styles.forEach(t => {
							'string' != typeof t &&
								Object.keys(t).forEach(n => {
									if (!this._driver.validateStyleProperty(n))
										return void e.errors.push(
											`The provided animation property "${n}" is not a supported CSS property for animations`
										);
									const i =
											e.collectedStyles[
												e.currentQuerySelector
											],
										o = i[n];
									let a = !0;
									o &&
										(s != r &&
											s >= o.startTime &&
											r <= o.endTime &&
											(e.errors.push(
												`The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${s}ms" and "${r}ms"`
											),
											(a = !1)),
										(s = o.startTime)),
										a &&
											(i[n] = {
												startTime: s,
												endTime: r,
											}),
										e.options &&
											(function (t, e, n) {
												const r = e.params || {},
													s = ud(t);
												s.length &&
													s.forEach(t => {
														r.hasOwnProperty(t) ||
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
						return (
							e.errors.push(
								'keyframes() must be placed inside of a call to animate()'
							),
							n
						);
					let r = 0;
					const s = [];
					let i = !1,
						o = !1,
						a = 0;
					const l = t.steps.map(t => {
						const n = this._makeStyleAst(t, e);
						let l =
								null != n.offset
									? n.offset
									: (function (t) {
											if ('string' == typeof t)
												return null;
											let e = null;
											if (Array.isArray(t))
												t.forEach(t => {
													if (
														Ad(t) &&
														t.hasOwnProperty(
															'offset'
														)
													) {
														const n = t;
														(e = parseFloat(
															n.offset
														)),
															delete n.offset;
													}
												});
											else if (
												Ad(t) &&
												t.hasOwnProperty('offset')
											) {
												const n = t;
												(e = parseFloat(n.offset)),
													delete n.offset;
											}
											return e;
									  })(n.styles),
							c = 0;
						return (
							null != l && (r++, (c = n.offset = l)),
							(o = o || c < 0 || c > 1),
							(i = i || c < a),
							(a = c),
							s.push(c),
							n
						);
					});
					o &&
						e.errors.push(
							'Please ensure that all keyframe offsets are between 0 and 1'
						),
						i &&
							e.errors.push(
								'Please ensure that all keyframe offsets are in order'
							);
					const c = t.steps.length;
					let u = 0;
					r > 0 && r < c
						? e.errors.push(
								'Not all style() steps within the declared keyframes() contain offsets'
						  )
						: 0 == r && (u = 1 / (c - 1));
					const h = c - 1,
						d = e.currentTime,
						f = e.currentAnimateTimings,
						p = f.duration;
					return (
						l.forEach((t, r) => {
							const i = u > 0 ? (r == h ? 1 : u * r) : s[r],
								o = i * p;
							(e.currentTime = d + f.delay + o),
								(f.duration = o),
								this._validateStyleAst(t, e),
								(t.offset = i),
								n.styles.push(t);
						}),
						n
					);
				}
				visitReference(t, e) {
					return {
						type: 8,
						animation: yd(this, ld(t.animation), e),
						options: Id(t.options),
					};
				}
				visitAnimateChild(t, e) {
					return e.depCount++, { type: 9, options: Id(t.options) };
				}
				visitAnimateRef(t, e) {
					return {
						type: 10,
						animation: this.visitReference(t.animation, e),
						options: Id(t.options),
					};
				}
				visitQuery(t, e) {
					const n = e.currentQuerySelector,
						r = t.options || {};
					e.queryCount++, (e.currentQuery = t);
					const [s, i] = (function (t) {
						const e = !!t.split(/\s*,\s*/).find(t => ':self' == t);
						return (
							e && (t = t.replace(xd, '')),
							[
								(t = t
									.replace(/@\*/g, Zh)
									.replace(
										/@\w+/g,
										t => '.ng-trigger-' + t.substr(1)
									)
									.replace(/:animating/g, Xh)),
								e,
							]
						);
					})(t.selector);
					(e.currentQuerySelector = n.length ? n + ' ' + s : s),
						Ph(e.collectedStyles, e.currentQuerySelector, {});
					const o = yd(this, ld(t.animation), e);
					return (
						(e.currentQuery = null),
						(e.currentQuerySelector = n),
						{
							type: 11,
							selector: s,
							limit: r.limit || 0,
							optional: !!r.optional,
							includeSelf: i,
							animation: o,
							originalSelector: t.selector,
							options: Id(t.options),
						}
					);
				}
				visitStagger(t, e) {
					e.currentQuery ||
						e.errors.push(
							'stagger() can only be used inside of query()'
						);
					const n =
						'full' === t.timings
							? { duration: 0, delay: 0, easing: 'full' }
							: ed(t.timings, e.errors, !0);
					return {
						type: 12,
						animation: yd(this, ld(t.animation), e),
						timings: n,
						options: null,
					};
				}
			}
			class Td {
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
			function Ad(t) {
				return !Array.isArray(t) && 'object' == typeof t;
			}
			function Id(t) {
				var e;
				return (
					t
						? (t = nd(t)).params &&
						  (t.params = (e = t.params) ? nd(e) : null)
						: (t = {}),
					t
				);
			}
			function Od(t, e, n) {
				return { duration: t, delay: e, easing: n };
			}
			function Rd(t, e, n, r, s, i, o = null, a = !1) {
				return {
					type: 1,
					element: t,
					keyframes: e,
					preStyleProps: n,
					postStyleProps: r,
					duration: s,
					delay: i,
					totalTime: s + i,
					easing: o,
					subTimeline: a,
				};
			}
			class Pd {
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
			const Nd = new RegExp(':enter', 'g'),
				Ld = new RegExp(':leave', 'g');
			function Dd(t, e, n, r, s, i = {}, o = {}, a, l, c = []) {
				return new Md().buildKeyframes(t, e, n, r, s, i, o, a, l, c);
			}
			class Md {
				buildKeyframes(t, e, n, r, s, i, o, a, l, c = []) {
					l = l || new Pd();
					const u = new jd(t, e, l, r, s, c, []);
					(u.options = a),
						u.currentTimeline.setStyles([i], null, u.errors, a),
						yd(this, n, u);
					const h = u.timelines.filter(t => t.containsAnimation());
					if (h.length && Object.keys(o).length) {
						const t = h[h.length - 1];
						t.allowOnlyTimelineStyles() ||
							t.setStyles([o], null, u.errors, a);
					}
					return h.length
						? h.map(t => t.buildKeyframes())
						: [Rd(e, [], [], [], 0, 0, '', !1)];
				}
				visitTrigger(t, e) {}
				visitState(t, e) {}
				visitTransition(t, e) {}
				visitAnimateChild(t, e) {
					const n = e.subInstructions.consume(e.element);
					if (n) {
						const r = e.createSubContext(t.options),
							s = e.currentTimeline.currentTime,
							i = this._visitSubInstructions(n, r, r.options);
						s != i && e.transformIntoNewTimeline(i);
					}
					e.previousNode = t;
				}
				visitAnimateRef(t, e) {
					const n = e.createSubContext(t.options);
					n.transformIntoNewTimeline(),
						this.visitReference(t.animation, n),
						e.transformIntoNewTimeline(
							n.currentTimeline.currentTime
						),
						(e.previousNode = t);
				}
				_visitSubInstructions(t, e, n) {
					let r = e.currentTimeline.currentTime;
					const s = null != n.duration ? Jh(n.duration) : null,
						i = null != n.delay ? Jh(n.delay) : null;
					return (
						0 !== s &&
							t.forEach(t => {
								const n = e.appendInstructionToTimeline(
									t,
									s,
									i
								);
								r = Math.max(r, n.duration + n.delay);
							}),
						r
					);
				}
				visitReference(t, e) {
					e.updateOptions(t.options, !0),
						yd(this, t.animation, e),
						(e.previousNode = t);
				}
				visitSequence(t, e) {
					const n = e.subContextCount;
					let r = e;
					const s = t.options;
					if (
						s &&
						(s.params || s.delay) &&
						((r = e.createSubContext(s)),
						r.transformIntoNewTimeline(),
						null != s.delay)
					) {
						6 == r.previousNode.type &&
							(r.currentTimeline.snapshotCurrentStyles(),
							(r.previousNode = Fd));
						const t = Jh(s.delay);
						r.delayNextStep(t);
					}
					t.steps.length &&
						(t.steps.forEach(t => yd(this, t, r)),
						r.currentTimeline.applyStylesToKeyframe(),
						r.subContextCount > n && r.transformIntoNewTimeline()),
						(e.previousNode = t);
				}
				visitGroup(t, e) {
					const n = [];
					let r = e.currentTimeline.currentTime;
					const s =
						t.options && t.options.delay ? Jh(t.options.delay) : 0;
					t.steps.forEach(i => {
						const o = e.createSubContext(t.options);
						s && o.delayNextStep(s),
							yd(this, i, o),
							(r = Math.max(r, o.currentTimeline.currentTime)),
							n.push(o.currentTimeline);
					}),
						n.forEach(t =>
							e.currentTimeline.mergeTimelineCollectedStyles(t)
						),
						e.transformIntoNewTimeline(r),
						(e.previousNode = t);
				}
				_visitTiming(t, e) {
					if (t.dynamic) {
						const n = t.strValue;
						return ed(
							e.params ? hd(n, e.params, e.errors) : n,
							e.errors
						);
					}
					return {
						duration: t.duration,
						delay: t.delay,
						easing: t.easing,
					};
				}
				visitAnimate(t, e) {
					const n = (e.currentAnimateTimings = this._visitTiming(
							t.timings,
							e
						)),
						r = e.currentTimeline;
					n.delay &&
						(e.incrementTime(n.delay), r.snapshotCurrentStyles());
					const s = t.style;
					5 == s.type
						? this.visitKeyframes(s, e)
						: (e.incrementTime(n.duration),
						  this.visitStyle(s, e),
						  r.applyStylesToKeyframe()),
						(e.currentAnimateTimings = null),
						(e.previousNode = t);
				}
				visitStyle(t, e) {
					const n = e.currentTimeline,
						r = e.currentAnimateTimings;
					!r &&
						n.getCurrentStyleProperties().length &&
						n.forwardFrame();
					const s = (r && r.easing) || t.easing;
					t.isEmptyStep
						? n.applyEmptyStep(s)
						: n.setStyles(t.styles, s, e.errors, e.options),
						(e.previousNode = t);
				}
				visitKeyframes(t, e) {
					const n = e.currentAnimateTimings,
						r = e.currentTimeline.duration,
						s = n.duration,
						i = e.createSubContext().currentTimeline;
					(i.easing = n.easing),
						t.styles.forEach(t => {
							i.forwardTime((t.offset || 0) * s),
								i.setStyles(
									t.styles,
									t.easing,
									e.errors,
									e.options
								),
								i.applyStylesToKeyframe();
						}),
						e.currentTimeline.mergeTimelineCollectedStyles(i),
						e.transformIntoNewTimeline(r + s),
						(e.previousNode = t);
				}
				visitQuery(t, e) {
					const n = e.currentTimeline.currentTime,
						r = t.options || {},
						s = r.delay ? Jh(r.delay) : 0;
					s &&
						(6 === e.previousNode.type ||
							(0 == n &&
								e.currentTimeline.getCurrentStyleProperties()
									.length)) &&
						(e.currentTimeline.snapshotCurrentStyles(),
						(e.previousNode = Fd));
					let i = n;
					const o = e.invokeQuery(
						t.selector,
						t.originalSelector,
						t.limit,
						t.includeSelf,
						!!r.optional,
						e.errors
					);
					e.currentQueryTotal = o.length;
					let a = null;
					o.forEach((n, r) => {
						e.currentQueryIndex = r;
						const o = e.createSubContext(t.options, n);
						s && o.delayNextStep(s),
							n === e.element && (a = o.currentTimeline),
							yd(this, t.animation, o),
							o.currentTimeline.applyStylesToKeyframe(),
							(i = Math.max(i, o.currentTimeline.currentTime));
					}),
						(e.currentQueryIndex = 0),
						(e.currentQueryTotal = 0),
						e.transformIntoNewTimeline(i),
						a &&
							(e.currentTimeline.mergeTimelineCollectedStyles(a),
							e.currentTimeline.snapshotCurrentStyles()),
						(e.previousNode = t);
				}
				visitStagger(t, e) {
					const n = e.parentContext,
						r = e.currentTimeline,
						s = t.timings,
						i = Math.abs(s.duration),
						o = i * (e.currentQueryTotal - 1);
					let a = i * e.currentQueryIndex;
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
					yd(this, t.animation, e),
						(e.previousNode = t),
						(n.currentStaggerTime =
							r.currentTime -
							c +
							(r.startTime - n.currentTimeline.startTime));
				}
			}
			const Fd = {};
			class jd {
				constructor(t, e, n, r, s, i, o, a) {
					(this._driver = t),
						(this.element = e),
						(this.subInstructions = n),
						(this._enterClassName = r),
						(this._leaveClassName = s),
						(this.errors = i),
						(this.timelines = o),
						(this.parentContext = null),
						(this.currentAnimateTimings = null),
						(this.previousNode = Fd),
						(this.subContextCount = 0),
						(this.options = {}),
						(this.currentQueryIndex = 0),
						(this.currentQueryTotal = 0),
						(this.currentStaggerTime = 0),
						(this.currentTimeline =
							a || new zd(this._driver, e, 0)),
						o.push(this.currentTimeline);
				}
				get params() {
					return this.options.params;
				}
				updateOptions(t, e) {
					if (!t) return;
					const n = t;
					let r = this.options;
					null != n.duration && (r.duration = Jh(n.duration)),
						null != n.delay && (r.delay = Jh(n.delay));
					const s = n.params;
					if (s) {
						let t = r.params;
						t || (t = this.options.params = {}),
							Object.keys(s).forEach(n => {
								(e && t.hasOwnProperty(n)) ||
									(t[n] = hd(s[n], t, this.errors));
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
					const r = e || this.element,
						s = new jd(
							this._driver,
							r,
							this.subInstructions,
							this._enterClassName,
							this._leaveClassName,
							this.errors,
							this.timelines,
							this.currentTimeline.fork(r, n || 0)
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
						(this.previousNode = Fd),
						(this.currentTimeline = this.currentTimeline.fork(
							this.element,
							t
						)),
						this.timelines.push(this.currentTimeline),
						this.currentTimeline
					);
				}
				appendInstructionToTimeline(t, e, n) {
					const r = {
							duration: null != e ? e : t.duration,
							delay:
								this.currentTimeline.currentTime +
								(null != n ? n : 0) +
								t.delay,
							easing: '',
						},
						s = new Bd(
							this._driver,
							t.element,
							t.keyframes,
							t.preStyleProps,
							t.postStyleProps,
							r,
							t.stretchStartingKeyframe
						);
					return this.timelines.push(s), r;
				}
				incrementTime(t) {
					this.currentTimeline.forwardTime(
						this.currentTimeline.duration + t
					);
				}
				delayNextStep(t) {
					t > 0 && this.currentTimeline.delayNextStep(t);
				}
				invokeQuery(t, e, n, r, s, i) {
					let o = [];
					if ((r && o.push(this.element), t.length > 0)) {
						t = (t = t.replace(
							Nd,
							'.' + this._enterClassName
						)).replace(Ld, '.' + this._leaveClassName);
						let e = this._driver.query(this.element, t, 1 != n);
						0 !== n &&
							(e =
								n < 0
									? e.slice(e.length + n, e.length)
									: e.slice(0, n)),
							o.push(...e);
					}
					return (
						s ||
							0 != o.length ||
							i.push(
								`\`query("${e}")\` returned zero elements. (Use \`query("${e}", { optional: true })\` if you wish to allow this.)`
							),
						o
					);
				}
			}
			class zd {
				constructor(t, e, n, r) {
					(this._driver = t),
						(this.element = e),
						(this.startTime = n),
						(this._elementTimelineStylesLookup = r),
						(this.duration = 0),
						(this._previousKeyframe = {}),
						(this._currentKeyframe = {}),
						(this._keyframes = new Map()),
						(this._styleSummary = {}),
						(this._pendingStyles = {}),
						(this._backFill = {}),
						(this._currentEmptyStepKeyframe = null),
						this._elementTimelineStylesLookup ||
							(this._elementTimelineStylesLookup = new Map()),
						(this._localTimelineStyles = Object.create(
							this._backFill,
							{}
						)),
						(this._globalTimelineStyles = this._elementTimelineStylesLookup.get(
							e
						)),
						this._globalTimelineStyles ||
							((this._globalTimelineStyles = this._localTimelineStyles),
							this._elementTimelineStylesLookup.set(
								e,
								this._localTimelineStyles
							)),
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
					const e =
						1 == this._keyframes.size &&
						Object.keys(this._pendingStyles).length;
					this.duration || e
						? (this.forwardTime(this.currentTime + t),
						  e && this.snapshotCurrentStyles())
						: (this.startTime += t);
				}
				fork(t, e) {
					return (
						this.applyStylesToKeyframe(),
						new zd(
							this._driver,
							t,
							e || this.currentTime,
							this._elementTimelineStylesLookup
						)
					);
				}
				_loadKeyframe() {
					this._currentKeyframe &&
						(this._previousKeyframe = this._currentKeyframe),
						(this._currentKeyframe = this._keyframes.get(
							this.duration
						)),
						this._currentKeyframe ||
							((this._currentKeyframe = Object.create(
								this._backFill,
								{}
							)),
							this._keyframes.set(
								this.duration,
								this._currentKeyframe
							));
				}
				forwardFrame() {
					(this.duration += 1), this._loadKeyframe();
				}
				forwardTime(t) {
					this.applyStylesToKeyframe(),
						(this.duration = t),
						this._loadKeyframe();
				}
				_updateStyle(t, e) {
					(this._localTimelineStyles[t] = e),
						(this._globalTimelineStyles[t] = e),
						(this._styleSummary[t] = {
							time: this.currentTime,
							value: e,
						});
				}
				allowOnlyTimelineStyles() {
					return (
						this._currentEmptyStepKeyframe !== this._currentKeyframe
					);
				}
				applyEmptyStep(t) {
					t && (this._previousKeyframe.easing = t),
						Object.keys(this._globalTimelineStyles).forEach(t => {
							(this._backFill[t] =
								this._globalTimelineStyles[t] || gh),
								(this._currentKeyframe[t] = gh);
						}),
						(this._currentEmptyStepKeyframe = this._currentKeyframe);
				}
				setStyles(t, e, n, r) {
					e && (this._previousKeyframe.easing = e);
					const s = (r && r.params) || {},
						i = (function (t, e) {
							const n = {};
							let r;
							return (
								t.forEach(t => {
									'*' === t
										? ((r = r || Object.keys(e)),
										  r.forEach(t => {
												n[t] = gh;
										  }))
										: rd(t, !1, n);
								}),
								n
							);
						})(t, this._globalTimelineStyles);
					Object.keys(i).forEach(t => {
						const e = hd(i[t], s, n);
						(this._pendingStyles[t] = e),
							this._localTimelineStyles.hasOwnProperty(t) ||
								(this._backFill[
									t
								] = this._globalTimelineStyles.hasOwnProperty(t)
									? this._globalTimelineStyles[t]
									: gh),
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
								(this._currentKeyframe[
									t
								] = this._localTimelineStyles[t]);
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
							r = t._styleSummary[e];
						(!n || r.time > n.time) &&
							this._updateStyle(e, r.value);
					});
				}
				buildKeyframes() {
					this.applyStylesToKeyframe();
					const t = new Set(),
						e = new Set(),
						n = 1 === this._keyframes.size && 0 === this.duration;
					let r = [];
					this._keyframes.forEach((s, i) => {
						const o = rd(s, !0);
						Object.keys(o).forEach(n => {
							const r = o[n];
							'!' == r ? t.add(n) : r == gh && e.add(n);
						}),
							n || (o.offset = i / this.duration),
							r.push(o);
					});
					const s = t.size ? dd(t.values()) : [],
						i = e.size ? dd(e.values()) : [];
					if (n) {
						const t = r[0],
							e = nd(t);
						(t.offset = 0), (e.offset = 1), (r = [t, e]);
					}
					return Rd(
						this.element,
						r,
						s,
						i,
						this.duration,
						this.startTime,
						this.easing,
						!1
					);
				}
			}
			class Bd extends zd {
				constructor(t, e, n, r, s, i, o = !1) {
					super(t, e, i.delay),
						(this.element = e),
						(this.keyframes = n),
						(this.preStyleProps = r),
						(this.postStyleProps = s),
						(this._stretchStartingKeyframe = o),
						(this.timings = {
							duration: i.duration,
							delay: i.delay,
							easing: i.easing,
						});
				}
				containsAnimation() {
					return this.keyframes.length > 1;
				}
				buildKeyframes() {
					let t = this.keyframes,
						{ delay: e, duration: n, easing: r } = this.timings;
					if (this._stretchStartingKeyframe && e) {
						const s = [],
							i = n + e,
							o = e / i,
							a = rd(t[0], !1);
						(a.offset = 0), s.push(a);
						const l = rd(t[0], !1);
						(l.offset = Ud(o)), s.push(l);
						const c = t.length - 1;
						for (let r = 1; r <= c; r++) {
							let o = rd(t[r], !1);
							(o.offset = Ud((e + o.offset * n) / i)), s.push(o);
						}
						(n = i), (e = 0), (r = ''), (t = s);
					}
					return Rd(
						this.element,
						t,
						this.preStyleProps,
						this.postStyleProps,
						n,
						e,
						r,
						!0
					);
				}
			}
			function Ud(t, e = 3) {
				const n = Math.pow(10, e - 1);
				return Math.round(t * n) / n;
			}
			class Vd {}
			class Hd extends Vd {
				normalizePropertyName(t, e) {
					return pd(t);
				}
				normalizeStyleValue(t, e, n, r) {
					let s = '';
					const i = n.toString().trim();
					if ($d[e] && 0 !== n && '0' !== n)
						if ('number' == typeof n) s = 'px';
						else {
							const e = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
							e &&
								0 == e[1].length &&
								r.push(
									`Please provide a CSS unit value for ${t}:${n}`
								);
						}
					return i + s;
				}
			}
			const $d = (() =>
				(function (t) {
					const e = {};
					return t.forEach(t => (e[t] = !0)), e;
				})(
					'width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective'.split(
						','
					)
				))();
			function qd(t, e, n, r, s, i, o, a, l, c, u, h, d) {
				return {
					type: 0,
					element: t,
					triggerName: e,
					isRemovalTransition: s,
					fromState: n,
					fromStyles: i,
					toState: r,
					toStyles: o,
					timelines: a,
					queriedElements: l,
					preStyleProps: c,
					postStyleProps: u,
					totalTime: h,
					errors: d,
				};
			}
			const Wd = {};
			class Qd {
				constructor(t, e, n) {
					(this._triggerName = t),
						(this.ast = e),
						(this._stateStyles = n);
				}
				match(t, e, n, r) {
					return (function (t, e, n, r, s) {
						return t.some(t => t(e, n, r, s));
					})(this.ast.matchers, t, e, n, r);
				}
				buildStyles(t, e, n) {
					const r = this._stateStyles['*'],
						s = this._stateStyles[t],
						i = r ? r.buildStyles(e, n) : {};
					return s ? s.buildStyles(e, n) : i;
				}
				build(t, e, n, r, s, i, o, a, l, c) {
					const u = [],
						h = (this.ast.options && this.ast.options.params) || Wd,
						d = this.buildStyles(n, (o && o.params) || Wd, u),
						f = (a && a.params) || Wd,
						p = this.buildStyles(r, f, u),
						m = new Set(),
						g = new Map(),
						y = new Map(),
						_ = 'void' === r,
						b = { params: Object.assign(Object.assign({}, h), f) },
						v = c
							? []
							: Dd(t, e, this.ast.animation, s, i, d, p, b, l, u);
					let w = 0;
					if (
						(v.forEach(t => {
							w = Math.max(t.duration + t.delay, w);
						}),
						u.length)
					)
						return qd(
							e,
							this._triggerName,
							n,
							r,
							_,
							d,
							p,
							[],
							[],
							g,
							y,
							w,
							u
						);
					v.forEach(t => {
						const n = t.element,
							r = Ph(g, n, {});
						t.preStyleProps.forEach(t => (r[t] = !0));
						const s = Ph(y, n, {});
						t.postStyleProps.forEach(t => (s[t] = !0)),
							n !== e && m.add(n);
					});
					const S = dd(m.values());
					return qd(
						e,
						this._triggerName,
						n,
						r,
						_,
						d,
						p,
						v,
						S,
						g,
						y,
						w
					);
				}
			}
			class Kd {
				constructor(t, e) {
					(this.styles = t), (this.defaultParams = e);
				}
				buildStyles(t, e) {
					const n = {},
						r = nd(this.defaultParams);
					return (
						Object.keys(t).forEach(e => {
							const n = t[e];
							null != n && (r[e] = n);
						}),
						this.styles.styles.forEach(t => {
							if ('string' != typeof t) {
								const s = t;
								Object.keys(s).forEach(t => {
									let i = s[t];
									i.length > 1 && (i = hd(i, r, e)),
										(n[t] = i);
								});
							}
						}),
						n
					);
				}
			}
			class Gd {
				constructor(t, e) {
					(this.name = t),
						(this.ast = e),
						(this.transitionFactories = []),
						(this.states = {}),
						e.states.forEach(t => {
							this.states[t.name] = new Kd(
								t.style,
								(t.options && t.options.params) || {}
							);
						}),
						Zd(this.states, 'true', '1'),
						Zd(this.states, 'false', '0'),
						e.transitions.forEach(e => {
							this.transitionFactories.push(
								new Qd(t, e, this.states)
							);
						}),
						(this.fallbackTransition = new Qd(
							t,
							{
								type: 1,
								animation: {
									type: 2,
									steps: [],
									options: null,
								},
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
				matchTransition(t, e, n, r) {
					return (
						this.transitionFactories.find(s =>
							s.match(t, e, n, r)
						) || null
					);
				}
				matchStyles(t, e, n) {
					return this.fallbackTransition.buildStyles(t, e, n);
				}
			}
			function Zd(t, e, n) {
				t.hasOwnProperty(e)
					? t.hasOwnProperty(n) || (t[n] = t[e])
					: t.hasOwnProperty(n) && (t[e] = t[n]);
			}
			const Yd = new Pd();
			class Xd {
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
						r = Cd(this._driver, e, n);
					if (n.length)
						throw new Error(
							'Unable to build the animation due to the following errors: ' +
								n.join('\n')
						);
					this._animations[t] = r;
				}
				_buildPlayer(t, e, n) {
					const r = t.element,
						s = Ah(0, this._normalizer, 0, t.keyframes, e, n);
					return this._driver.animate(
						r,
						s,
						t.duration,
						t.delay,
						t.easing,
						[],
						!0
					);
				}
				create(t, e, n = {}) {
					const r = [],
						s = this._animations[t];
					let i;
					const o = new Map();
					if (
						(s
							? ((i = Dd(
									this._driver,
									e,
									s,
									Qh,
									Kh,
									{},
									{},
									n,
									Yd,
									r
							  )),
							  i.forEach(t => {
									const e = Ph(o, t.element, {});
									t.postStyleProps.forEach(
										t => (e[t] = null)
									);
							  }))
							: (r.push(
									"The requested animation doesn't exist or has already been destroyed"
							  ),
							  (i = [])),
						r.length)
					)
						throw new Error(
							'Unable to create the animation due to the following errors: ' +
								r.join('\n')
						);
					o.forEach((t, e) => {
						Object.keys(t).forEach(n => {
							t[n] = this._driver.computeStyle(e, n, gh);
						});
					});
					const a = Th(
						i.map(t => {
							const e = o.get(t.element);
							return this._buildPlayer(t, {}, e);
						})
					);
					return (
						(this._playersById[t] = a),
						a.onDestroy(() => this.destroy(t)),
						this.players.push(a),
						a
					);
				}
				destroy(t) {
					const e = this._getPlayer(t);
					e.destroy(), delete this._playersById[t];
					const n = this.players.indexOf(e);
					n >= 0 && this.players.splice(n, 1);
				}
				_getPlayer(t) {
					const e = this._playersById[t];
					if (!e)
						throw new Error(
							'Unable to find the timeline player referenced by ' +
								t
						);
					return e;
				}
				listen(t, e, n, r) {
					const s = Rh(e, '', '', '');
					return Ih(this._getPlayer(t), n, s, r), () => {};
				}
				command(t, e, n, r) {
					if ('register' == n) return void this.register(t, r[0]);
					if ('create' == n)
						return void this.create(t, e, r[0] || {});
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
							s.setPosition(parseFloat(r[0]));
							break;
						case 'destroy':
							this.destroy(t);
					}
				}
			}
			const Jd = 'ng-animate-queued',
				tf = 'ng-animate-disabled',
				ef = '.ng-animate-disabled',
				nf = [],
				rf = {
					namespaceId: '',
					setForRemoval: !1,
					setForMove: !1,
					hasAnimation: !1,
					removedBeforeQueried: !1,
				},
				sf = {
					namespaceId: '',
					setForMove: !1,
					setForRemoval: !1,
					hasAnimation: !1,
					removedBeforeQueried: !0,
				};
			class of {
				constructor(t, e = '') {
					this.namespaceId = e;
					const n = t && t.hasOwnProperty('value');
					if (
						((this.value =
							null != (r = n ? t.value : t) ? r : null),
						n)
					) {
						const e = nd(t);
						delete e.value, (this.options = e);
					} else this.options = {};
					var r;
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
			const af = 'void',
				lf = new of(af);
			class cf {
				constructor(t, e, n) {
					(this.id = t),
						(this.hostElement = e),
						(this._engine = n),
						(this.players = []),
						(this._triggers = {}),
						(this._queue = []),
						(this._elementListeners = new Map()),
						(this._hostClassName = 'ng-tns-' + t),
						gf(e, this._hostClassName);
				}
				listen(t, e, n, r) {
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
					const i = Ph(this._elementListeners, t, []),
						o = { name: e, phase: n, callback: r };
					i.push(o);
					const a = Ph(this._engine.statesByElement, t, {});
					return (
						a.hasOwnProperty(e) ||
							(gf(t, Gh), gf(t, 'ng-trigger-' + e), (a[e] = lf)),
						() => {
							this._engine.afterFlush(() => {
								const t = i.indexOf(o);
								t >= 0 && i.splice(t, 1),
									this._triggers[e] || delete a[e];
							});
						}
					);
				}
				register(t, e) {
					return !this._triggers[t] && ((this._triggers[t] = e), !0);
				}
				_getTrigger(t) {
					const e = this._triggers[t];
					if (!e)
						throw new Error(
							`The provided animation trigger "${t}" has not been registered!`
						);
					return e;
				}
				trigger(t, e, n, r = !0) {
					const s = this._getTrigger(e),
						i = new hf(this.id, e, t);
					let o = this._engine.statesByElement.get(t);
					o ||
						(gf(t, Gh),
						gf(t, 'ng-trigger-' + e),
						this._engine.statesByElement.set(t, (o = {})));
					let a = o[e];
					const l = new of(n, this.id);
					if (
						(!(n && n.hasOwnProperty('value')) &&
							a &&
							l.absorbOptions(a.options),
						(o[e] = l),
						a || (a = lf),
						l.value !== af && a.value === l.value)
					) {
						if (
							!(function (t, e) {
								const n = Object.keys(t),
									r = Object.keys(e);
								if (n.length != r.length) return !1;
								for (let s = 0; s < n.length; s++) {
									const r = n[s];
									if (!e.hasOwnProperty(r) || t[r] !== e[r])
										return !1;
								}
								return !0;
							})(a.params, l.params)
						) {
							const e = [],
								n = s.matchStyles(a.value, a.params, e),
								r = s.matchStyles(l.value, l.params, e);
							e.length
								? this._engine.reportError(e)
								: this._engine.afterFlush(() => {
										ad(t, n), od(t, r);
								  });
						}
						return;
					}
					const c = Ph(this._engine.playersByElement, t, []);
					c.forEach(t => {
						t.namespaceId == this.id &&
							t.triggerName == e &&
							t.queued &&
							t.destroy();
					});
					let u = s.matchTransition(a.value, l.value, t, l.params),
						h = !1;
					if (!u) {
						if (!r) return;
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
							player: i,
							isFallbackTransition: h,
						}),
						h ||
							(gf(t, Jd),
							i.onStart(() => {
								yf(t, Jd);
							})),
						i.onDone(() => {
							let e = this.players.indexOf(i);
							e >= 0 && this.players.splice(e, 1);
							const n = this._engine.playersByElement.get(t);
							if (n) {
								let t = n.indexOf(i);
								t >= 0 && n.splice(t, 1);
							}
						}),
						this.players.push(i),
						c.push(i),
						i
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
					this._engine.statesByElement.delete(t),
						this._elementListeners.delete(t);
					const e = this._engine.playersByElement.get(t);
					e &&
						(e.forEach(t => t.destroy()),
						this._engine.playersByElement.delete(t));
				}
				_signalRemovalForInnerTriggers(t, e) {
					const n = this._engine.driver.query(t, Zh, !0);
					n.forEach(t => {
						if (t.__ng_removed) return;
						const n = this._engine.fetchNamespacesByElement(t);
						n.size
							? n.forEach(n =>
									n.triggerLeaveAnimation(t, e, !1, !0)
							  )
							: this.clearElementCache(t);
					}),
						this._engine.afterFlushAnimationsDone(() =>
							n.forEach(t => this.clearElementCache(t))
						);
				}
				triggerLeaveAnimation(t, e, n, r) {
					const s = this._engine.statesByElement.get(t);
					if (s) {
						const i = [];
						if (
							(Object.keys(s).forEach(e => {
								if (this._triggers[e]) {
									const n = this.trigger(t, e, af, r);
									n && i.push(n);
								}
							}),
							i.length)
						)
							return (
								this._engine.markElementAsRemoved(
									this.id,
									t,
									!0,
									e
								),
								n &&
									Th(i).onDone(() =>
										this._engine.processLeaveNode(t)
									),
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
							const r = e.name;
							if (n.has(r)) return;
							n.add(r);
							const s = this._triggers[r].fallbackTransition,
								i =
									this._engine.statesByElement.get(t)[r] ||
									lf,
								o = new of(af),
								a = new hf(this.id, r, t);
							this._engine.totalQueuedPlayers++,
								this._queue.push({
									element: t,
									triggerName: r,
									transition: s,
									fromState: i,
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
						(t.childElementCount &&
							this._signalRemovalForInnerTriggers(t, e),
						this.triggerLeaveAnimation(t, e, !0))
					)
						return;
					let r = !1;
					if (n.totalAnimations) {
						const e = n.players.length
							? n.playersByQueriedElement.get(t)
							: [];
						if (e && e.length) r = !0;
						else {
							let e = t;
							for (; (e = e.parentNode); )
								if (n.statesByElement.get(e)) {
									r = !0;
									break;
								}
						}
					}
					if ((this.prepareLeaveAnimationListeners(t), r))
						n.markElementAsRemoved(this.id, t, !1, e);
					else {
						const r = t.__ng_removed;
						(r && r !== rf) ||
							(n.afterFlush(() => this.clearElementCache(t)),
							n.destroyInnerAnimations(t),
							n._onRemovalComplete(t, e));
					}
				}
				insertNode(t, e) {
					gf(t, this._hostClassName);
				}
				drainQueuedTransitions(t) {
					const e = [];
					return (
						this._queue.forEach(n => {
							const r = n.player;
							if (r.destroyed) return;
							const s = n.element,
								i = this._elementListeners.get(s);
							i &&
								i.forEach(e => {
									if (e.name == n.triggerName) {
										const r = Rh(
											s,
											n.triggerName,
											n.fromState.value,
											n.toState.value
										);
										(r._data = t),
											Ih(
												n.player,
												e.phase,
												r,
												e.callback
											);
									}
								}),
								r.markedForDestroy
									? this._engine.afterFlush(() => {
											r.destroy();
									  })
									: e.push(n);
						}),
						(this._queue = []),
						e.sort((t, e) => {
							const n = t.transition.ast.depCount,
								r = e.transition.ast.depCount;
							return 0 == n || 0 == r
								? n - r
								: this._engine.driver.containsElement(
										t.element,
										e.element
								  )
								? 1
								: -1;
						})
					);
				}
				destroy(t) {
					this.players.forEach(t => t.destroy()),
						this._signalRemovalForInnerTriggers(
							this.hostElement,
							t
						);
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
			class uf {
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
					const n = new cf(t, e, this);
					return (
						e.parentNode
							? this._balanceNamespaceList(n, e)
							: (this.newHostElements.set(e, n),
							  this.collectEnterElement(e)),
						(this._namespaceLookup[t] = n)
					);
				}
				_balanceNamespaceList(t, e) {
					const n = this._namespaceList.length - 1;
					if (n >= 0) {
						let r = !1;
						for (let s = n; s >= 0; s--)
							if (
								this.driver.containsElement(
									this._namespaceList[s].hostElement,
									e
								)
							) {
								this._namespaceList.splice(s + 1, 0, t),
									(r = !0);
								break;
							}
						r || this._namespaceList.splice(0, 0, t);
					} else this._namespaceList.push(t);
					return this.namespacesByHostElement.set(e, t), t;
				}
				register(t, e) {
					let n = this._namespaceLookup[t];
					return n || (n = this.createNamespace(t, e)), n;
				}
				registerTrigger(t, e, n) {
					let r = this._namespaceLookup[t];
					r && r.register(e, n) && this.totalAnimations++;
				}
				destroy(t, e) {
					if (!t) return;
					const n = this._fetchNamespace(t);
					this.afterFlush(() => {
						this.namespacesByHostElement.delete(n.hostElement),
							delete this._namespaceLookup[t];
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
						for (let r = 0; r < t.length; r++) {
							const s = n[t[r]].namespaceId;
							if (s) {
								const t = this._fetchNamespace(s);
								t && e.add(t);
							}
						}
					}
					return e;
				}
				trigger(t, e, n, r) {
					if (df(e)) {
						const s = this._fetchNamespace(t);
						if (s) return s.trigger(e, n, r), !0;
					}
					return !1;
				}
				insertNode(t, e, n, r) {
					if (!df(e)) return;
					const s = e.__ng_removed;
					if (s && s.setForRemoval) {
						(s.setForRemoval = !1), (s.setForMove = !0);
						const t = this.collectedLeaveElements.indexOf(e);
						t >= 0 && this.collectedLeaveElements.splice(t, 1);
					}
					if (t) {
						const r = this._fetchNamespace(t);
						r && r.insertNode(e, n);
					}
					r && this.collectEnterElement(e);
				}
				collectEnterElement(t) {
					this.collectedEnterElements.push(t);
				}
				markElementAsDisabled(t, e) {
					e
						? this.disabledNodes.has(t) ||
						  (this.disabledNodes.add(t), gf(t, tf))
						: this.disabledNodes.has(t) &&
						  (this.disabledNodes.delete(t), yf(t, tf));
				}
				removeNode(t, e, n, r) {
					if (df(e)) {
						const s = t ? this._fetchNamespace(t) : null;
						if (
							(s
								? s.removeNode(e, r)
								: this.markElementAsRemoved(t, e, !1, r),
							n)
						) {
							const n = this.namespacesByHostElement.get(e);
							n && n.id !== t && n.removeNode(e, r);
						}
					} else this._onRemovalComplete(e, r);
				}
				markElementAsRemoved(t, e, n, r) {
					this.collectedLeaveElements.push(e),
						(e.__ng_removed = {
							namespaceId: t,
							setForRemoval: r,
							hasAnimation: n,
							removedBeforeQueried: !1,
						});
				}
				listen(t, e, n, r, s) {
					return df(e)
						? this._fetchNamespace(t).listen(e, n, r, s)
						: () => {};
				}
				_buildInstruction(t, e, n, r, s) {
					return t.transition.build(
						this.driver,
						t.element,
						t.fromState.value,
						t.toState.value,
						n,
						r,
						t.fromState.options,
						t.toState.options,
						e,
						s
					);
				}
				destroyInnerAnimations(t) {
					let e = this.driver.query(t, Zh, !0);
					e.forEach(t => this.destroyActiveAnimationsForElement(t)),
						0 != this.playersByQueriedElement.size &&
							((e = this.driver.query(t, Xh, !0)),
							e.forEach(t =>
								this.finishActiveQueriedAnimationOnElement(t)
							));
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
						if (this.players.length)
							return Th(this.players).onDone(() => t());
						t();
					});
				}
				processLeaveNode(t) {
					const e = t.__ng_removed;
					if (e && e.setForRemoval) {
						if (((t.__ng_removed = rf), e.namespaceId)) {
							this.destroyInnerAnimations(t);
							const n = this._fetchNamespace(e.namespaceId);
							n && n.clearElementCache(t);
						}
						this._onRemovalComplete(t, e.setForRemoval);
					}
					this.driver.matchesElement(t, ef) &&
						this.markElementAsDisabled(t, !1),
						this.driver.query(t, ef, !0).forEach(t => {
							this.markElementAsDisabled(t, !1);
						});
				}
				flush(t = -1) {
					let e = [];
					if (
						(this.newHostElements.size &&
							(this.newHostElements.forEach((t, e) =>
								this._balanceNamespaceList(t, e)
							),
							this.newHostElements.clear()),
						this.totalAnimations &&
							this.collectedEnterElements.length)
					)
						for (
							let n = 0;
							n < this.collectedEnterElements.length;
							n++
						)
							gf(
								this.collectedEnterElements[n],
								'ng-star-inserted'
							);
					if (
						this._namespaceList.length &&
						(this.totalQueuedPlayers ||
							this.collectedLeaveElements.length)
					) {
						const n = [];
						try {
							e = this._flushAnimations(n, t);
						} finally {
							for (let t = 0; t < n.length; t++) n[t]();
						}
					} else
						for (
							let n = 0;
							n < this.collectedLeaveElements.length;
							n++
						)
							this.processLeaveNode(
								this.collectedLeaveElements[n]
							);
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
								? Th(e).onDone(() => {
										t.forEach(t => t());
								  })
								: t.forEach(t => t());
					}
				}
				reportError(t) {
					throw new Error(
						'Unable to process animations due to the following failed trigger transitions\n ' +
							t.join('\n')
					);
				}
				_flushAnimations(t, e) {
					const n = new Pd(),
						r = [],
						s = new Map(),
						i = [],
						o = new Map(),
						a = new Map(),
						l = new Map(),
						c = new Set();
					this.disabledNodes.forEach(t => {
						c.add(t);
						const e = this.driver.query(
							t,
							'.ng-animate-queued',
							!0
						);
						for (let n = 0; n < e.length; n++) c.add(e[n]);
					});
					const u = this.bodyNode,
						h = Array.from(this.statesByElement.keys()),
						d = mf(h, this.collectedEnterElements),
						f = new Map();
					let p = 0;
					d.forEach((t, e) => {
						const n = Qh + p++;
						f.set(e, n), t.forEach(t => gf(t, n));
					});
					const m = [],
						g = new Set(),
						y = new Set();
					for (
						let O = 0;
						O < this.collectedLeaveElements.length;
						O++
					) {
						const t = this.collectedLeaveElements[O],
							e = t.__ng_removed;
						e &&
							e.setForRemoval &&
							(m.push(t),
							g.add(t),
							e.hasAnimation
								? this.driver
										.query(t, '.ng-star-inserted', !0)
										.forEach(t => g.add(t))
								: y.add(t));
					}
					const _ = new Map(),
						b = mf(h, Array.from(g));
					b.forEach((t, e) => {
						const n = Kh + p++;
						_.set(e, n), t.forEach(t => gf(t, n));
					}),
						t.push(() => {
							d.forEach((t, e) => {
								const n = f.get(e);
								t.forEach(t => yf(t, n));
							}),
								b.forEach((t, e) => {
									const n = _.get(e);
									t.forEach(t => yf(t, n));
								}),
								m.forEach(t => {
									this.processLeaveNode(t);
								});
						});
					const v = [],
						w = [];
					for (let O = this._namespaceList.length - 1; O >= 0; O--)
						this._namespaceList[O].drainQueuedTransitions(
							e
						).forEach(t => {
							const e = t.player,
								s = t.element;
							if (
								(v.push(e), this.collectedEnterElements.length)
							) {
								const t = s.__ng_removed;
								if (t && t.setForMove) return void e.destroy();
							}
							const c = !u || !this.driver.containsElement(u, s),
								h = _.get(s),
								d = f.get(s),
								p = this._buildInstruction(t, n, d, h, c);
							if (p.errors && p.errors.length) w.push(p);
							else {
								if (c)
									return (
										e.onStart(() => ad(s, p.fromStyles)),
										e.onDestroy(() => od(s, p.toStyles)),
										void r.push(e)
									);
								if (t.isFallbackTransition)
									return (
										e.onStart(() => ad(s, p.fromStyles)),
										e.onDestroy(() => od(s, p.toStyles)),
										void r.push(e)
									);
								p.timelines.forEach(
									t => (t.stretchStartingKeyframe = !0)
								),
									n.append(s, p.timelines),
									i.push({
										instruction: p,
										player: e,
										element: s,
									}),
									p.queriedElements.forEach(t =>
										Ph(o, t, []).push(e)
									),
									p.preStyleProps.forEach((t, e) => {
										const n = Object.keys(t);
										if (n.length) {
											let t = a.get(e);
											t || a.set(e, (t = new Set())),
												n.forEach(e => t.add(e));
										}
									}),
									p.postStyleProps.forEach((t, e) => {
										const n = Object.keys(t);
										let r = l.get(e);
										r || l.set(e, (r = new Set())),
											n.forEach(t => r.add(t));
									});
							}
						});
					if (w.length) {
						const t = [];
						w.forEach(e => {
							t.push(`@${e.triggerName} has failed due to:\n`),
								e.errors.forEach(e => t.push(`- ${e}\n`));
						}),
							v.forEach(t => t.destroy()),
							this.reportError(t);
					}
					const S = new Map(),
						E = new Map();
					i.forEach(t => {
						const e = t.element;
						n.has(e) &&
							(E.set(e, e),
							this._beforeAnimationBuild(
								t.player.namespaceId,
								t.instruction,
								S
							));
					}),
						r.forEach(t => {
							const e = t.element;
							this._getPreviousPlayers(
								e,
								!1,
								t.namespaceId,
								t.triggerName,
								null
							).forEach(t => {
								Ph(S, e, []).push(t), t.destroy();
							});
						});
					const x = m.filter(t => bf(t, a, l)),
						C = new Map();
					pf(C, this.driver, y, l, gh).forEach(t => {
						bf(t, a, l) && x.push(t);
					});
					const k = new Map();
					d.forEach((t, e) => {
						pf(k, this.driver, new Set(t), a, '!');
					}),
						x.forEach(t => {
							const e = C.get(t),
								n = k.get(t);
							C.set(t, Object.assign(Object.assign({}, e), n));
						});
					const T = [],
						A = [],
						I = {};
					i.forEach(t => {
						const { element: e, player: i, instruction: o } = t;
						if (n.has(e)) {
							if (c.has(e))
								return (
									i.onDestroy(() => od(e, o.toStyles)),
									(i.disabled = !0),
									i.overrideTotalTime(o.totalTime),
									void r.push(i)
								);
							let t = I;
							if (E.size > 1) {
								let n = e;
								const r = [];
								for (; (n = n.parentNode); ) {
									const e = E.get(n);
									if (e) {
										t = e;
										break;
									}
									r.push(n);
								}
								r.forEach(e => E.set(e, t));
							}
							const n = this._buildAnimation(
								i.namespaceId,
								o,
								S,
								s,
								k,
								C
							);
							if ((i.setRealPlayer(n), t === I)) T.push(i);
							else {
								const e = this.playersByElement.get(t);
								e && e.length && (i.parentPlayer = Th(e)),
									r.push(i);
							}
						} else
							ad(e, o.fromStyles),
								i.onDestroy(() => od(e, o.toStyles)),
								A.push(i),
								c.has(e) && r.push(i);
					}),
						A.forEach(t => {
							const e = s.get(t.element);
							if (e && e.length) {
								const n = Th(e);
								t.setRealPlayer(n);
							}
						}),
						r.forEach(t => {
							t.parentPlayer
								? t.syncPlayerEvents(t.parentPlayer)
								: t.destroy();
						});
					for (let O = 0; O < m.length; O++) {
						const t = m[O],
							e = t.__ng_removed;
						if ((yf(t, Kh), e && e.hasAnimation)) continue;
						let n = [];
						if (o.size) {
							let e = o.get(t);
							e && e.length && n.push(...e);
							let r = this.driver.query(t, Xh, !0);
							for (let t = 0; t < r.length; t++) {
								let e = o.get(r[t]);
								e && e.length && n.push(...e);
							}
						}
						const r = n.filter(t => !t.destroyed);
						r.length ? _f(this, t, r) : this.processLeaveNode(t);
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
					const r = e.__ng_removed;
					return (
						r && r.setForRemoval && (n = !0),
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
				_getPreviousPlayers(t, e, n, r, s) {
					let i = [];
					if (e) {
						const e = this.playersByQueriedElement.get(t);
						e && (i = e);
					} else {
						const e = this.playersByElement.get(t);
						if (e) {
							const t = !s || s == af;
							e.forEach(e => {
								e.queued ||
									((t || e.triggerName == r) && i.push(e));
							});
						}
					}
					return (
						(n || r) &&
							(i = i.filter(
								t =>
									!(
										(n && n != t.namespaceId) ||
										(r && r != t.triggerName)
									)
							)),
						i
					);
				}
				_beforeAnimationBuild(t, e, n) {
					const r = e.element,
						s = e.isRemovalTransition ? void 0 : t,
						i = e.isRemovalTransition ? void 0 : e.triggerName;
					for (const o of e.timelines) {
						const t = o.element,
							a = t !== r,
							l = Ph(n, t, []);
						this._getPreviousPlayers(t, a, s, i, e.toState).forEach(
							t => {
								const e = t.getRealPlayer();
								e.beforeDestroy && e.beforeDestroy(),
									t.destroy(),
									l.push(t);
							}
						);
					}
					ad(r, e.fromStyles);
				}
				_buildAnimation(t, e, n, r, s, i) {
					const o = e.triggerName,
						a = e.element,
						l = [],
						c = new Set(),
						u = new Set(),
						h = e.timelines.map(e => {
							const h = e.element;
							c.add(h);
							const d = h.__ng_removed;
							if (d && d.removedBeforeQueried)
								return new xh(e.duration, e.delay);
							const f = h !== a,
								p = (function (t) {
									const e = [];
									return (
										(function t(e, n) {
											for (let r = 0; r < e.length; r++) {
												const s = e[r];
												s instanceof Ch
													? t(s.players, n)
													: n.push(s);
											}
										})(t, e),
										e
									);
								})(
									(n.get(h) || nf).map(t => t.getRealPlayer())
								).filter(t => !!t.element && t.element === h),
								m = s.get(h),
								g = i.get(h),
								y = Ah(
									0,
									this._normalizer,
									0,
									e.keyframes,
									m,
									g
								),
								_ = this._buildPlayer(e, y, p);
							if ((e.subTimeline && r && u.add(h), f)) {
								const e = new hf(t, o, h);
								e.setRealPlayer(_), l.push(e);
							}
							return _;
						});
					l.forEach(t => {
						Ph(this.playersByQueriedElement, t.element, []).push(t),
							t.onDone(() =>
								(function (t, e, n) {
									let r;
									if (t instanceof Map) {
										if (((r = t.get(e)), r)) {
											if (r.length) {
												const t = r.indexOf(n);
												r.splice(t, 1);
											}
											0 == r.length && t.delete(e);
										}
									} else if (((r = t[e]), r)) {
										if (r.length) {
											const t = r.indexOf(n);
											r.splice(t, 1);
										}
										0 == r.length && delete t[e];
									}
									return r;
								})(this.playersByQueriedElement, t.element, t)
							);
					}),
						c.forEach(t => gf(t, Yh));
					const d = Th(h);
					return (
						d.onDestroy(() => {
							c.forEach(t => yf(t, Yh)), od(a, e.toStyles);
						}),
						u.forEach(t => {
							Ph(r, t, []).push(d);
						}),
						d
					);
				}
				_buildPlayer(t, e, n) {
					return e.length > 0
						? this.driver.animate(
								t.element,
								e,
								t.duration,
								t.delay,
								t.easing,
								n
						  )
						: new xh(t.duration, t.delay);
				}
			}
			class hf {
				constructor(t, e, n) {
					(this.namespaceId = t),
						(this.triggerName = e),
						(this.element = n),
						(this._player = new xh()),
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
							this._queuedCallbacks[e].forEach(n =>
								Ih(t, e, void 0, n)
							);
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
					e.triggerCallback &&
						t.onStart(() => e.triggerCallback('start')),
						t.onDone(() => this.finish()),
						t.onDestroy(() => this.destroy());
				}
				_queueEvent(t, e) {
					Ph(this._queuedCallbacks, t, []).push(e);
				}
				onDone(t) {
					this.queued && this._queueEvent('done', t),
						this._player.onDone(t);
				}
				onStart(t) {
					this.queued && this._queueEvent('start', t),
						this._player.onStart(t);
				}
				onDestroy(t) {
					this.queued && this._queueEvent('destroy', t),
						this._player.onDestroy(t);
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
			function df(t) {
				return t && 1 === t.nodeType;
			}
			function ff(t, e) {
				const n = t.style.display;
				return (t.style.display = null != e ? e : 'none'), n;
			}
			function pf(t, e, n, r, s) {
				const i = [];
				n.forEach(t => i.push(ff(t)));
				const o = [];
				r.forEach((n, r) => {
					const i = {};
					n.forEach(t => {
						const n = (i[t] = e.computeStyle(r, t, s));
						(n && 0 != n.length) ||
							((r.__ng_removed = sf), o.push(r));
					}),
						t.set(r, i);
				});
				let a = 0;
				return n.forEach(t => ff(t, i[a++])), o;
			}
			function mf(t, e) {
				const n = new Map();
				if ((t.forEach(t => n.set(t, [])), 0 == e.length)) return n;
				const r = new Set(e),
					s = new Map();
				return (
					e.forEach(t => {
						const e = (function t(e) {
							if (!e) return 1;
							let i = s.get(e);
							if (i) return i;
							const o = e.parentNode;
							return (
								(i = n.has(o) ? o : r.has(o) ? 1 : t(o)),
								s.set(e, i),
								i
							);
						})(t);
						1 !== e && n.get(e).push(t);
					}),
					n
				);
			}
			function gf(t, e) {
				if (t.classList) t.classList.add(e);
				else {
					let n = t.$$classes;
					n || (n = t.$$classes = {}), (n[e] = !0);
				}
			}
			function yf(t, e) {
				if (t.classList) t.classList.remove(e);
				else {
					let n = t.$$classes;
					n && delete n[e];
				}
			}
			function _f(t, e, n) {
				Th(n).onDone(() => t.processLeaveNode(e));
			}
			function bf(t, e, n) {
				const r = n.get(t);
				if (!r) return !1;
				let s = e.get(t);
				return (
					s ? r.forEach(t => s.add(t)) : e.set(t, r), n.delete(t), !0
				);
			}
			class vf {
				constructor(t, e, n) {
					(this.bodyNode = t),
						(this._driver = e),
						(this._triggerCache = {}),
						(this.onRemovalComplete = (t, e) => {}),
						(this._transitionEngine = new uf(t, e, n)),
						(this._timelineEngine = new Xd(t, e, n)),
						(this._transitionEngine.onRemovalComplete = (t, e) =>
							this.onRemovalComplete(t, e));
				}
				registerTrigger(t, e, n, r, s) {
					const i = t + '-' + r;
					let o = this._triggerCache[i];
					if (!o) {
						const t = [],
							e = Cd(this._driver, s, t);
						if (t.length)
							throw new Error(
								`The animation trigger "${r}" has failed to build due to the following errors:\n - ${t.join(
									'\n - '
								)}`
							);
						(o = (function (t, e) {
							return new Gd(t, e);
						})(r, e)),
							(this._triggerCache[i] = o);
					}
					this._transitionEngine.registerTrigger(e, r, o);
				}
				register(t, e) {
					this._transitionEngine.register(t, e);
				}
				destroy(t, e) {
					this._transitionEngine.destroy(t, e);
				}
				onInsert(t, e, n, r) {
					this._transitionEngine.insertNode(t, e, n, r);
				}
				onRemove(t, e, n, r) {
					this._transitionEngine.removeNode(t, e, r || !1, n);
				}
				disableAnimations(t, e) {
					this._transitionEngine.markElementAsDisabled(t, e);
				}
				process(t, e, n, r) {
					if ('@' == n.charAt(0)) {
						const [t, s] = Nh(n);
						this._timelineEngine.command(t, e, s, r);
					} else this._transitionEngine.trigger(t, e, n, r);
				}
				listen(t, e, n, r, s) {
					if ('@' == n.charAt(0)) {
						const [t, r] = Nh(n);
						return this._timelineEngine.listen(t, e, r, s);
					}
					return this._transitionEngine.listen(t, e, n, r, s);
				}
				flush(t = -1) {
					this._transitionEngine.flush(t);
				}
				get players() {
					return this._transitionEngine.players.concat(
						this._timelineEngine.players
					);
				}
				whenRenderingDone() {
					return this._transitionEngine.whenRenderingDone();
				}
			}
			function wf(t, e) {
				let n = null,
					r = null;
				return (
					Array.isArray(e) && e.length
						? ((n = Ef(e[0])),
						  e.length > 1 && (r = Ef(e[e.length - 1])))
						: e && (n = Ef(e)),
					n || r ? new Sf(t, n, r) : null
				);
			}
			let Sf = (() => {
				class t {
					constructor(e, n, r) {
						(this._element = e),
							(this._startStyles = n),
							(this._endStyles = r),
							(this._state = 0);
						let s = t.initialStylesByElement.get(e);
						s || t.initialStylesByElement.set(e, (s = {})),
							(this._initialStyles = s);
					}
					start() {
						this._state < 1 &&
							(this._startStyles &&
								od(
									this._element,
									this._startStyles,
									this._initialStyles
								),
							(this._state = 1));
					}
					finish() {
						this.start(),
							this._state < 2 &&
								(od(this._element, this._initialStyles),
								this._endStyles &&
									(od(this._element, this._endStyles),
									(this._endStyles = null)),
								(this._state = 1));
					}
					destroy() {
						this.finish(),
							this._state < 3 &&
								(t.initialStylesByElement.delete(this._element),
								this._startStyles &&
									(ad(this._element, this._startStyles),
									(this._endStyles = null)),
								this._endStyles &&
									(ad(this._element, this._endStyles),
									(this._endStyles = null)),
								od(this._element, this._initialStyles),
								(this._state = 3));
					}
				}
				return (t.initialStylesByElement = new WeakMap()), t;
			})();
			function Ef(t) {
				let e = null;
				const n = Object.keys(t);
				for (let r = 0; r < n.length; r++) {
					const s = n[r];
					xf(s) && ((e = e || {}), (e[s] = t[s]));
				}
				return e;
			}
			function xf(t) {
				return 'display' === t || 'position' === t;
			}
			const Cf = 'animation',
				kf = 'animationend';
			class Tf {
				constructor(t, e, n, r, s, i, o) {
					(this._element = t),
						(this._name = e),
						(this._duration = n),
						(this._delay = r),
						(this._easing = s),
						(this._fillMode = i),
						(this._onDoneFn = o),
						(this._finished = !1),
						(this._destroyed = !1),
						(this._startTime = 0),
						(this._position = 0),
						(this._eventFn = t => this._handleCallback(t));
				}
				apply() {
					!(function (t, e) {
						const n = Nf(t, '').trim();
						n.length &&
							((function (t, e) {
								let n = 0;
								for (let r = 0; r < t.length; r++)
									',' === t.charAt(r) && n++;
							})(n),
							(e = `${n}, ${e}`)),
							Pf(t, '', e);
					})(
						this._element,
						`${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`
					),
						Rf(this._element, this._eventFn, !1),
						(this._startTime = Date.now());
				}
				pause() {
					Af(this._element, this._name, 'paused');
				}
				resume() {
					Af(this._element, this._name, 'running');
				}
				setPosition(t) {
					const e = If(this._element, this._name);
					(this._position = t * this._duration),
						Pf(this._element, 'Delay', `-${this._position}ms`, e);
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
					this._finished ||
						((this._finished = !0),
						this._onDoneFn(),
						Rf(this._element, this._eventFn, !0));
				}
				destroy() {
					this._destroyed ||
						((this._destroyed = !0),
						this.finish(),
						(function (t, e) {
							const n = Nf(t, '').split(','),
								r = Of(n, e);
							r >= 0 && (n.splice(r, 1), Pf(t, '', n.join(',')));
						})(this._element, this._name));
				}
			}
			function Af(t, e, n) {
				Pf(t, 'PlayState', n, If(t, e));
			}
			function If(t, e) {
				const n = Nf(t, '');
				return n.indexOf(',') > 0 ? Of(n.split(','), e) : Of([n], e);
			}
			function Of(t, e) {
				for (let n = 0; n < t.length; n++)
					if (t[n].indexOf(e) >= 0) return n;
				return -1;
			}
			function Rf(t, e, n) {
				n ? t.removeEventListener(kf, e) : t.addEventListener(kf, e);
			}
			function Pf(t, e, n, r) {
				const s = Cf + e;
				if (null != r) {
					const e = t.style[s];
					if (e.length) {
						const t = e.split(',');
						(t[r] = n), (n = t.join(','));
					}
				}
				t.style[s] = n;
			}
			function Nf(t, e) {
				return t.style[Cf + e];
			}
			class Lf {
				constructor(t, e, n, r, s, i, o, a) {
					(this.element = t),
						(this.keyframes = e),
						(this.animationName = n),
						(this._duration = r),
						(this._delay = s),
						(this._finalStyles = o),
						(this._specialStyles = a),
						(this._onDoneFns = []),
						(this._onStartFns = []),
						(this._onDestroyFns = []),
						(this._started = !1),
						(this.currentSnapshot = {}),
						(this._state = 0),
						(this.easing = i || 'linear'),
						(this.totalTime = r + s),
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
							this._specialStyles &&
								this._specialStyles.destroy(),
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
					this._state >= 1 ||
						((this._state = 1),
						this._styler.apply(),
						this._delay && this._styler.pause());
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
					this._styler.destroy(),
						this._buildStyler(),
						this._styler.apply();
				}
				_buildStyler() {
					this._styler = new Tf(
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
							'offset' != n &&
								(t[n] = e
									? this._finalStyles[n]
									: _d(this.element, n));
						});
					}
					this.currentSnapshot = t;
				}
			}
			class Df extends xh {
				constructor(t, e) {
					super(),
						(this.element = t),
						(this._startingStyles = {}),
						(this.__initialized = !1),
						(this._styles = $h(e));
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
						Object.keys(this._styles).forEach(t =>
							this.element.style.setProperty(t, this._styles[t])
						),
						super.play());
				}
				destroy() {
					this._startingStyles &&
						(Object.keys(this._startingStyles).forEach(t => {
							const e = this._startingStyles[t];
							e
								? this.element.style.setProperty(t, e)
								: this.element.style.removeProperty(t);
						}),
						(this._startingStyles = null),
						super.destroy());
				}
			}
			class Mf {
				constructor() {
					(this._count = 0),
						(this._head = document.querySelector('head')),
						(this._warningIssued = !1);
				}
				validateStyleProperty(t) {
					return Bh(t);
				}
				matchesElement(t, e) {
					return Uh(t, e);
				}
				containsElement(t, e) {
					return Vh(t, e);
				}
				query(t, e, n) {
					return Hh(t, e, n);
				}
				computeStyle(t, e, n) {
					return window.getComputedStyle(t)[e];
				}
				buildKeyframeElement(t, e, n) {
					n = n.map(t => $h(t));
					let r = `@keyframes ${e} {\n`,
						s = '';
					n.forEach(t => {
						s = ' ';
						const e = parseFloat(t.offset);
						(r += `${s}${100 * e}% {\n`),
							(s += ' '),
							Object.keys(t).forEach(e => {
								const n = t[e];
								switch (e) {
									case 'offset':
										return;
									case 'easing':
										return void (
											n &&
											(r += `${s}animation-timing-function: ${n};\n`)
										);
									default:
										return void (r += `${s}${e}: ${n};\n`);
								}
							}),
							(r += s + '}\n');
					}),
						(r += '}\n');
					const i = document.createElement('style');
					return (i.textContent = r), i;
				}
				animate(t, e, n, r, s, i = [], o) {
					o && this._notifyFaultyScrubber();
					const a = i.filter(t => t instanceof Lf),
						l = {};
					md(n, r) &&
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
										'offset' != n &&
											'easing' != n &&
											(e[n] = t[n]);
									});
								}),
							e
						);
					})((e = gd(t, e, l)));
					if (0 == n) return new Df(t, c);
					const u = 'gen_css_kf_' + this._count++,
						h = this.buildKeyframeElement(t, u, e);
					document.querySelector('head').appendChild(h);
					const d = wf(t, e),
						f = new Lf(t, e, u, n, r, s, c, d);
					return (
						f.onDestroy(() => {
							var t;
							(t = h).parentNode.removeChild(t);
						}),
						f
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
			class Ff {
				constructor(t, e, n, r) {
					(this.element = t),
						(this.keyframes = e),
						(this.options = n),
						(this._specialStyles = r),
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
						((this._finished = !0),
						this._onDoneFns.forEach(t => t()),
						(this._onDoneFns = []));
				}
				init() {
					this._buildPlayer(), this._preparePlayerBeforeStart();
				}
				_buildPlayer() {
					if (this._initialized) return;
					this._initialized = !0;
					const t = this.keyframes;
					(this.domPlayer = this._triggerWebAnimation(
						this.element,
						t,
						this.options
					)),
						(this._finalKeyframe = t.length ? t[t.length - 1] : {}),
						this.domPlayer.addEventListener('finish', () =>
							this._onFinish()
						);
				}
				_preparePlayerBeforeStart() {
					this._delay
						? this._resetDomPlayerState()
						: this.domPlayer.pause();
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
					this._resetDomPlayerState(),
						(this._destroyed = !1),
						(this._finished = !1),
						(this._started = !1);
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
							'offset' != e &&
								(t[e] = this._finished
									? this._finalKeyframe[e]
									: _d(this.element, e));
						}),
						(this.currentSnapshot = t);
				}
				triggerCallback(t) {
					const e = 'start' == t ? this._onStartFns : this._onDoneFns;
					e.forEach(t => t()), (e.length = 0);
				}
			}
			class jf {
				constructor() {
					(this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(
						zf().toString()
					)),
						(this._cssKeyframesDriver = new Mf());
				}
				validateStyleProperty(t) {
					return Bh(t);
				}
				matchesElement(t, e) {
					return Uh(t, e);
				}
				containsElement(t, e) {
					return Vh(t, e);
				}
				query(t, e, n) {
					return Hh(t, e, n);
				}
				computeStyle(t, e, n) {
					return window.getComputedStyle(t)[e];
				}
				overrideWebAnimationsSupport(t) {
					this._isNativeImpl = t;
				}
				animate(t, e, n, r, s, i = [], o) {
					if (!o && !this._isNativeImpl)
						return this._cssKeyframesDriver.animate(
							t,
							e,
							n,
							r,
							s,
							i
						);
					const a = {
						duration: n,
						delay: r,
						fill: 0 == r ? 'both' : 'forwards',
					};
					s && (a.easing = s);
					const l = {},
						c = i.filter(t => t instanceof Ff);
					md(n, r) &&
						c.forEach(t => {
							let e = t.currentSnapshot;
							Object.keys(e).forEach(t => (l[t] = e[t]));
						});
					const u = wf(
						t,
						(e = gd(t, (e = e.map(t => rd(t, !1))), l))
					);
					return new Ff(t, e, a, u);
				}
			}
			function zf() {
				return (
					('undefined' != typeof window &&
						void 0 !== window.document &&
						Element.prototype.animate) ||
					{}
				);
			}
			let Bf = (() => {
				class t extends mh {
					constructor(t, e) {
						super(),
							(this._nextAnimationId = 0),
							(this._renderer = t.createRenderer(e.body, {
								id: '0',
								encapsulation: ue.None,
								styles: [],
								data: { animation: [] },
							}));
					}
					build(t) {
						const e = this._nextAnimationId.toString();
						this._nextAnimationId++;
						const n = Array.isArray(t) ? bh(t) : t;
						return (
							Hf(this._renderer, null, e, 'register', [n]),
							new Uf(e, this._renderer)
						);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Gt(fa), Gt(lc));
					}),
					(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			class Uf extends class {} {
				constructor(t, e) {
					super(), (this._id = t), (this._renderer = e);
				}
				create(t, e) {
					return new Vf(this._id, t, e || {}, this._renderer);
				}
			}
			class Vf {
				constructor(t, e, n, r) {
					(this.id = t),
						(this.element = e),
						(this._renderer = r),
						(this.parentPlayer = null),
						(this._started = !1),
						(this.totalTime = 0),
						this._command('create', n);
				}
				_listen(t, e) {
					return this._renderer.listen(
						this.element,
						`@@${this.id}:${t}`,
						e
					);
				}
				_command(t, ...e) {
					return Hf(this._renderer, this.element, this.id, t, e);
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
			function Hf(t, e, n, r, s) {
				return t.setProperty(e, `@@${n}:${r}`, s);
			}
			const $f = '@',
				qf = '@.disabled';
			let Wf = (() => {
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
								e &&
									e.parentNode(t) &&
									e.removeChild(t.parentNode, t);
							});
					}
					createRenderer(t, e) {
						const n = this.delegate.createRenderer(t, e);
						if (!(t && e && e.data && e.data.animation)) {
							let t = this._rendererCache.get(n);
							return (
								t ||
									((t = new Qf('', n, this.engine)),
									this._rendererCache.set(n, t)),
								t
							);
						}
						const r = e.id,
							s = e.id + '-' + this._currentId;
						this._currentId++, this.engine.register(s, t);
						const i = e => {
							Array.isArray(e)
								? e.forEach(i)
								: this.engine.registerTrigger(
										r,
										s,
										t,
										e.name,
										e
								  );
						};
						return (
							e.data.animation.forEach(i),
							new Kf(this, s, n, this.engine)
						);
					}
					begin() {
						this._cdRecurDepth++,
							this.delegate.begin && this.delegate.begin();
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
											this._animationCallbacksBuffer.forEach(
												t => {
													const [e, n] = t;
													e(n);
												}
											),
												(this._animationCallbacksBuffer = []);
										});
									}),
							  this._animationCallbacksBuffer.push([e, n]));
					}
					end() {
						this._cdRecurDepth--,
							0 == this._cdRecurDepth &&
								this._zone.runOutsideAngular(() => {
									this._scheduleCountTask(),
										this.engine.flush(this._microtaskId);
								}),
							this.delegate.end && this.delegate.end();
					}
					whenRenderingDone() {
						return this.engine.whenRenderingDone();
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Gt(fa), Gt(vf), Gt(Rl));
					}),
					(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			class Qf {
				constructor(t, e, n) {
					(this.namespaceId = t),
						(this.delegate = e),
						(this.engine = n),
						(this.destroyNode = this.delegate.destroyNode
							? t => e.destroyNode(t)
							: null);
				}
				get data() {
					return this.delegate.data;
				}
				destroy() {
					this.engine.destroy(this.namespaceId, this.delegate),
						this.delegate.destroy();
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
					this.delegate.appendChild(t, e),
						this.engine.onInsert(this.namespaceId, e, t, !1);
				}
				insertBefore(t, e, n) {
					this.delegate.insertBefore(t, e, n),
						this.engine.onInsert(this.namespaceId, e, t, !0);
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
				setAttribute(t, e, n, r) {
					this.delegate.setAttribute(t, e, n, r);
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
				setStyle(t, e, n, r) {
					this.delegate.setStyle(t, e, n, r);
				}
				removeStyle(t, e, n) {
					this.delegate.removeStyle(t, e, n);
				}
				setProperty(t, e, n) {
					e.charAt(0) == $f && e == qf
						? this.disableAnimations(t, !!n)
						: this.delegate.setProperty(t, e, n);
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
			class Kf extends Qf {
				constructor(t, e, n, r) {
					super(e, n, r), (this.factory = t), (this.namespaceId = e);
				}
				setProperty(t, e, n) {
					e.charAt(0) == $f
						? '.' == e.charAt(1) && e == qf
							? this.disableAnimations(
									t,
									(n = void 0 === n || !!n)
							  )
							: this.engine.process(
									this.namespaceId,
									t,
									e.substr(1),
									n
							  )
						: this.delegate.setProperty(t, e, n);
				}
				listen(t, e, n) {
					if (e.charAt(0) == $f) {
						const r = (function (t) {
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
							i = '';
						return (
							s.charAt(0) != $f &&
								([s, i] = (function (t) {
									const e = t.indexOf('.');
									return [t.substring(0, e), t.substr(e + 1)];
								})(s)),
							this.engine.listen(this.namespaceId, r, s, i, t => {
								this.factory.scheduleListenerCallback(
									t._data || -1,
									n,
									t
								);
							})
						);
					}
					return this.delegate.listen(t, e, n);
				}
			}
			let Gf = (() => {
				class t extends vf {
					constructor(t, e, n) {
						super(t.body, e, n);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Gt(lc), Gt(Wh), Gt(Vd));
					}),
					(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const Zf = new jt('AnimationModuleType'),
				Yf = [
					{
						provide: Wh,
						useFactory: function () {
							return 'function' == typeof zf()
								? new jf()
								: new Mf();
						},
					},
					{ provide: Zf, useValue: 'BrowserAnimations' },
					{ provide: mh, useClass: Bf },
					{
						provide: Vd,
						useFactory: function () {
							return new Hd();
						},
					},
					{ provide: vf, useClass: Gf },
					{
						provide: fa,
						useFactory: function (t, e, n) {
							return new Wf(t, e, n);
						},
						deps: [Jc, vf, Rl],
					},
				];
			let Xf = (() => {
				class t {}
				return (
					(t.ɵmod = _e({ type: t })),
					(t.ɵinj = ht({
						factory: function (e) {
							return new (e || t)();
						},
						providers: Yf,
						imports: [pu],
					})),
					t
				);
			})();
			const Jf = new ga('10.2.6'),
				tp = new jt('mat-sanity-checks', {
					providedIn: 'root',
					factory: function () {
						return !0;
					},
				});
			let ep,
				np = (() => {
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
								e =
									(null == t ? void 0 : t.defaultView) ||
									window;
							return 'object' == typeof e && e ? e : null;
						}
						_checksAreEnabled() {
							return kr() && !this._isTestEnv();
						}
						_isTestEnv() {
							const t = this._getWindow();
							return t && (t.__karma__ || t.jasmine);
						}
						_checkDoctypeIsDefined() {
							const t =
									this._checksAreEnabled() &&
									(!0 === this._sanityChecks ||
										this._sanityChecks.doctype),
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
									!this._checksAreEnabled() ||
									!1 === this._sanityChecks ||
									!this._sanityChecks.theme,
								e = this._getDocument();
							if (
								t ||
								!e ||
								!e.body ||
								'function' != typeof getComputedStyle
							)
								return;
							const n = e.createElement('div');
							n.classList.add('mat-theme-loaded-marker'),
								e.body.appendChild(n);
							const r = getComputedStyle(n);
							r &&
								'none' !== r.display &&
								console.warn(
									'Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming'
								),
								e.body.removeChild(n);
						}
						_checkCdkVersionMatch() {
							this._checksAreEnabled() &&
								(!0 === this._sanityChecks ||
									this._sanityChecks.version) &&
								Jf.full !== hh.full &&
								console.warn(
									'The Angular Material version (' +
										Jf.full +
										') does not match the Angular CDK version (' +
										hh.full +
										').\nPlease ensure the versions of these two packages exactly match.'
								);
						}
					}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)(
									Gt(ah),
									Gt(tp, 8),
									Gt(lc, 8)
								);
							},
							imports: [[uh], uh],
						})),
						t
					);
				})();
			function rp(t) {
				return class extends t {
					constructor(...t) {
						super(...t), (this._disabled = !1);
					}
					get disabled() {
						return this._disabled;
					}
					set disabled(t) {
						this._disabled = qu(t);
					}
				};
			}
			function sp(t, e) {
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
							(this._color &&
								this._elementRef.nativeElement.classList.remove(
									'mat-' + this._color
								),
							e &&
								this._elementRef.nativeElement.classList.add(
									'mat-' + e
								),
							(this._color = e));
					}
				};
			}
			function ip(t) {
				return class extends t {
					constructor(...t) {
						super(...t), (this._disableRipple = !1);
					}
					get disableRipple() {
						return this._disableRipple;
					}
					set disableRipple(t) {
						this._disableRipple = qu(t);
					}
				};
			}
			try {
				ep = 'undefined' != typeof Intl;
			} catch (Hw) {
				ep = !1;
			}
			let op = (() => {
				class t {}
				return (
					(t.ɵmod = _e({ type: t })),
					(t.ɵinj = ht({
						factory: function (e) {
							return new (e || t)();
						},
						imports: [[np], np],
					})),
					t
				);
			})();
			class ap {
				constructor(t, e, n) {
					(this._renderer = t),
						(this.element = e),
						(this.config = n),
						(this.state = 3);
				}
				fadeOut() {
					this._renderer.fadeOutRipple(this);
				}
			}
			const lp = { enterDuration: 450, exitDuration: 400 },
				cp = wu({ passive: !0 }),
				up = ['mousedown', 'touchstart'],
				hp = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];
			class dp {
				constructor(t, e, n, r) {
					(this._target = t),
						(this._ngZone = e),
						(this._isPointerDown = !1),
						(this._activeRipples = new Set()),
						(this._pointerUpEventsRegistered = !1),
						r.isBrowser && (this._containerElement = Qu(n));
				}
				fadeInRipple(t, e, n = {}) {
					const r = (this._containerRect =
							this._containerRect ||
							this._containerElement.getBoundingClientRect()),
						s = Object.assign(Object.assign({}, lp), n.animation);
					n.centered &&
						((t = r.left + r.width / 2),
						(e = r.top + r.height / 2));
					const i =
							n.radius ||
							(function (t, e, n) {
								const r = Math.max(
										Math.abs(t - n.left),
										Math.abs(t - n.right)
									),
									s = Math.max(
										Math.abs(e - n.top),
										Math.abs(e - n.bottom)
									);
								return Math.sqrt(r * r + s * s);
							})(t, e, r),
						o = t - r.left,
						a = e - r.top,
						l = s.enterDuration,
						c = document.createElement('div');
					c.classList.add('mat-ripple-element'),
						(c.style.left = o - i + 'px'),
						(c.style.top = a - i + 'px'),
						(c.style.height = 2 * i + 'px'),
						(c.style.width = 2 * i + 'px'),
						null != n.color && (c.style.backgroundColor = n.color),
						(c.style.transitionDuration = l + 'ms'),
						this._containerElement.appendChild(c),
						window.getComputedStyle(c).getPropertyValue('opacity'),
						(c.style.transform = 'scale(1)');
					const u = new ap(this, c, n);
					return (
						(u.state = 0),
						this._activeRipples.add(u),
						n.persistent || (this._mostRecentTransientRipple = u),
						this._runTimeoutOutsideZone(() => {
							const t = u === this._mostRecentTransientRipple;
							(u.state = 1),
								n.persistent ||
									(t && this._isPointerDown) ||
									u.fadeOut();
						}, l),
						u
					);
				}
				fadeOutRipple(t) {
					const e = this._activeRipples.delete(t);
					if (
						(t === this._mostRecentTransientRipple &&
							(this._mostRecentTransientRipple = null),
						this._activeRipples.size ||
							(this._containerRect = null),
						!e)
					)
						return;
					const n = t.element,
						r = Object.assign(
							Object.assign({}, lp),
							t.config.animation
						);
					(n.style.transitionDuration = r.exitDuration + 'ms'),
						(n.style.opacity = '0'),
						(t.state = 2),
						this._runTimeoutOutsideZone(() => {
							(t.state = 3), n.parentNode.removeChild(n);
						}, r.exitDuration);
				}
				fadeOutAll() {
					this._activeRipples.forEach(t => t.fadeOut());
				}
				setupTriggerEvents(t) {
					const e = Qu(t);
					e &&
						e !== this._triggerElement &&
						(this._removeTriggerEvents(),
						(this._triggerElement = e),
						this._registerEvents(up));
				}
				handleEvent(t) {
					'mousedown' === t.type
						? this._onMousedown(t)
						: 'touchstart' === t.type
						? this._onTouchStart(t)
						: this._onPointerUp(),
						this._pointerUpEventsRegistered ||
							(this._registerEvents(hp),
							(this._pointerUpEventsRegistered = !0));
				}
				_onMousedown(t) {
					const e = Ju(t),
						n =
							this._lastTouchStartEvent &&
							Date.now() < this._lastTouchStartEvent + 800;
					this._target.rippleDisabled ||
						e ||
						n ||
						((this._isPointerDown = !0),
						this.fadeInRipple(
							t.clientX,
							t.clientY,
							this._target.rippleConfig
						));
				}
				_onTouchStart(t) {
					if (!this._target.rippleDisabled) {
						(this._lastTouchStartEvent = Date.now()),
							(this._isPointerDown = !0);
						const e = t.changedTouches;
						for (let t = 0; t < e.length; t++)
							this.fadeInRipple(
								e[t].clientX,
								e[t].clientY,
								this._target.rippleConfig
							);
					}
				}
				_onPointerUp() {
					this._isPointerDown &&
						((this._isPointerDown = !1),
						this._activeRipples.forEach(t => {
							!t.config.persistent &&
								(1 === t.state ||
									(t.config.terminateOnPointerUp &&
										0 === t.state)) &&
								t.fadeOut();
						}));
				}
				_runTimeoutOutsideZone(t, e = 0) {
					this._ngZone.runOutsideAngular(() => setTimeout(t, e));
				}
				_registerEvents(t) {
					this._ngZone.runOutsideAngular(() => {
						t.forEach(t => {
							this._triggerElement.addEventListener(t, this, cp);
						});
					});
				}
				_removeTriggerEvents() {
					this._triggerElement &&
						(up.forEach(t => {
							this._triggerElement.removeEventListener(
								t,
								this,
								cp
							);
						}),
						this._pointerUpEventsRegistered &&
							hp.forEach(t => {
								this._triggerElement.removeEventListener(
									t,
									this,
									cp
								);
							}));
				}
			}
			const fp = new jt('mat-ripple-global-options');
			let pp = (() => {
					class t {
						constructor(t, e, n, r, s) {
							(this._elementRef = t),
								(this._animationMode = s),
								(this.radius = 0),
								(this._disabled = !1),
								(this._isInitialized = !1),
								(this._globalOptions = r || {}),
								(this._rippleRenderer = new dp(this, e, t, n));
						}
						get disabled() {
							return this._disabled;
						}
						set disabled(t) {
							(this._disabled = t),
								this._setupTriggerEventsIfEnabled();
						}
						get trigger() {
							return (
								this._trigger || this._elementRef.nativeElement
							);
						}
						set trigger(t) {
							(this._trigger = t),
								this._setupTriggerEventsIfEnabled();
						}
						ngOnInit() {
							(this._isInitialized = !0),
								this._setupTriggerEventsIfEnabled();
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
										Object.assign(
											{},
											this._globalOptions.animation
										),
										'NoopAnimations' === this._animationMode
											? {
													enterDuration: 0,
													exitDuration: 0,
											  }
											: {}
									),
									this.animation
								),
								terminateOnPointerUp: this._globalOptions
									.terminateOnPointerUp,
							};
						}
						get rippleDisabled() {
							return (
								this.disabled || !!this._globalOptions.disabled
							);
						}
						_setupTriggerEventsIfEnabled() {
							!this.disabled &&
								this._isInitialized &&
								this._rippleRenderer.setupTriggerEvents(
									this.trigger
								);
						}
						launch(t, e = 0, n) {
							return 'number' == typeof t
								? this._rippleRenderer.fadeInRipple(
										t,
										e,
										Object.assign(
											Object.assign(
												{},
												this.rippleConfig
											),
											n
										)
								  )
								: this._rippleRenderer.fadeInRipple(
										0,
										0,
										Object.assign(
											Object.assign(
												{},
												this.rippleConfig
											),
											t
										)
								  );
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(
								mo(ha),
								mo(Rl),
								mo(bu),
								mo(fp, 8),
								mo(Zf, 8)
							);
						}),
						(t.ɵdir = ve({
							type: t,
							selectors: [
								['', 'mat-ripple', ''],
								['', 'matRipple', ''],
							],
							hostAttrs: [1, 'mat-ripple'],
							hostVars: 2,
							hostBindings: function (t, e) {
								2 & t &&
									Fo('mat-ripple-unbounded', e.unbounded);
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
				mp = (() => {
					class t {}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[np, vu], np],
						})),
						t
					);
				})(),
				gp = (() => {
					class t {}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)();
							},
						})),
						t
					);
				})();
			function yp(t, e) {
				return new _(n => {
					const r = t.length;
					if (0 === r) return void n.complete();
					const s = new Array(r);
					let i = 0,
						o = 0;
					for (let a = 0; a < r; a++) {
						const l = M(t[a]);
						let c = !1;
						n.add(
							l.subscribe({
								next: t => {
									c || ((c = !0), o++), (s[a] = t);
								},
								error: t => n.error(t),
								complete: () => {
									i++,
										(i !== r && c) ||
											(o === r &&
												n.next(
													e
														? e.reduce(
																(t, e, n) => (
																	(t[e] =
																		s[n]),
																	t
																),
																{}
														  )
														: s
												),
											n.complete());
								},
							})
						);
					}
				});
			}
			function _p(t) {
				return function (e) {
					const n = new bp(t),
						r = e.lift(n);
					return (n.caught = r);
				};
			}
			class bp {
				constructor(t) {
					this.selector = t;
				}
				call(t, e) {
					return e.subscribe(new vp(t, this.selector, this.caught));
				}
			}
			class vp extends j {
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
						const r = new F(this);
						this.add(r);
						const s = z(n, r);
						s !== r && this.add(s);
					}
				}
			}
			function wp(t) {
				return e => e.lift(new Sp(t));
			}
			class Sp {
				constructor(t) {
					this.callback = t;
				}
				call(t, e) {
					return e.subscribe(new Ep(t, this.callback));
				}
			}
			class Ep extends p {
				constructor(t, e) {
					super(t), this.add(new h(e));
				}
			}
			function xp(t, e) {
				return B(t, e, 1);
			}
			class Cp {}
			class kp {
				constructor(t) {
					(this.normalizedNames = new Map()),
						(this.lazyUpdate = null),
						t
							? (this.lazyInit =
									'string' == typeof t
										? () => {
												(this.headers = new Map()),
													t.split('\n').forEach(t => {
														const e = t.indexOf(
															':'
														);
														if (e > 0) {
															const n = t.slice(
																	0,
																	e
																),
																r = n.toLowerCase(),
																s = t
																	.slice(
																		e + 1
																	)
																	.trim();
															this.maybeSetNormalizedName(
																n,
																r
															),
																this.headers.has(
																	r
																)
																	? this.headers
																			.get(
																				r
																			)
																			.push(
																				s
																			)
																	: this.headers.set(
																			r,
																			[s]
																	  );
														}
													});
										  }
										: () => {
												(this.headers = new Map()),
													Object.keys(t).forEach(
														e => {
															let n = t[e];
															const r = e.toLowerCase();
															'string' ==
																typeof n &&
																(n = [n]),
																n.length > 0 &&
																	(this.headers.set(
																		r,
																		n
																	),
																	this.maybeSetNormalizedName(
																		e,
																		r
																	));
														}
													);
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
					return (
						this.init(), Array.from(this.normalizedNames.values())
					);
				}
				getAll(t) {
					return (
						this.init(), this.headers.get(t.toLowerCase()) || null
					);
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
					this.normalizedNames.has(e) ||
						this.normalizedNames.set(e, t);
				}
				init() {
					this.lazyInit &&
						(this.lazyInit instanceof kp
							? this.copyFrom(this.lazyInit)
							: this.lazyInit(),
						(this.lazyInit = null),
						this.lazyUpdate &&
							(this.lazyUpdate.forEach(t => this.applyUpdate(t)),
							(this.lazyUpdate = null)));
				}
				copyFrom(t) {
					t.init(),
						Array.from(t.headers.keys()).forEach(e => {
							this.headers.set(e, t.headers.get(e)),
								this.normalizedNames.set(
									e,
									t.normalizedNames.get(e)
								);
						});
				}
				clone(t) {
					const e = new kp();
					return (
						(e.lazyInit =
							this.lazyInit && this.lazyInit instanceof kp
								? this.lazyInit
								: this),
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
							if (
								('string' == typeof n && (n = [n]),
								0 === n.length)
							)
								return;
							this.maybeSetNormalizedName(t.name, e);
							const r =
								('a' === t.op ? this.headers.get(e) : void 0) ||
								[];
							r.push(...n), this.headers.set(e, r);
							break;
						case 'd':
							const s = t.value;
							if (s) {
								let t = this.headers.get(e);
								if (!t) return;
								(t = t.filter(t => -1 === s.indexOf(t))),
									0 === t.length
										? (this.headers.delete(e),
										  this.normalizedNames.delete(e))
										: this.headers.set(e, t);
							} else
								this.headers.delete(e),
									this.normalizedNames.delete(e);
					}
				}
				forEach(t) {
					this.init(),
						Array.from(this.normalizedNames.keys()).forEach(e =>
							t(this.normalizedNames.get(e), this.headers.get(e))
						);
				}
			}
			class Tp {
				encodeKey(t) {
					return Ap(t);
				}
				encodeValue(t) {
					return Ap(t);
				}
				decodeKey(t) {
					return decodeURIComponent(t);
				}
				decodeValue(t) {
					return decodeURIComponent(t);
				}
			}
			function Ap(t) {
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
			class Ip {
				constructor(t = {}) {
					if (
						((this.updates = null),
						(this.cloneFrom = null),
						(this.encoder = t.encoder || new Tp()),
						t.fromString)
					) {
						if (t.fromObject)
							throw new Error(
								'Cannot specify both fromString and fromObject.'
							);
						this.map = (function (t, e) {
							const n = new Map();
							return (
								t.length > 0 &&
									t.split('&').forEach(t => {
										const r = t.indexOf('='),
											[s, i] =
												-1 == r
													? [e.decodeKey(t), '']
													: [
															e.decodeKey(
																t.slice(0, r)
															),
															e.decodeValue(
																t.slice(r + 1)
															),
													  ],
											o = n.get(s) || [];
										o.push(i), n.set(s, o);
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
									.map(
										t =>
											e +
											'=' +
											this.encoder.encodeValue(t)
									)
									.join('&');
							})
							.filter(t => '' !== t)
							.join('&')
					);
				}
				clone(t) {
					const e = new Ip({ encoder: this.encoder });
					return (
						(e.cloneFrom = this.cloneFrom || this),
						(e.updates = (this.updates || []).concat([t])),
						e
					);
				}
				init() {
					null === this.map && (this.map = new Map()),
						null !== this.cloneFrom &&
							(this.cloneFrom.init(),
							this.cloneFrom
								.keys()
								.forEach(t =>
									this.map.set(t, this.cloneFrom.map.get(t))
								),
							this.updates.forEach(t => {
								switch (t.op) {
									case 'a':
									case 's':
										const e =
											('a' === t.op
												? this.map.get(t.param)
												: void 0) || [];
										e.push(t.value),
											this.map.set(t.param, e);
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
												e.length > 0
													? this.map.set(t.param, e)
													: this.map.delete(t.param);
										}
								}
							}),
							(this.cloneFrom = this.updates = null));
				}
			}
			function Op(t) {
				return (
					'undefined' != typeof ArrayBuffer &&
					t instanceof ArrayBuffer
				);
			}
			function Rp(t) {
				return 'undefined' != typeof Blob && t instanceof Blob;
			}
			function Pp(t) {
				return 'undefined' != typeof FormData && t instanceof FormData;
			}
			class Np {
				constructor(t, e, n, r) {
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
						})(this.method) || r
							? ((this.body = void 0 !== n ? n : null), (s = r))
							: (s = n),
						s &&
							((this.reportProgress = !!s.reportProgress),
							(this.withCredentials = !!s.withCredentials),
							s.responseType &&
								(this.responseType = s.responseType),
							s.headers && (this.headers = s.headers),
							s.params && (this.params = s.params)),
						this.headers || (this.headers = new kp()),
						this.params)
					) {
						const t = this.params.toString();
						if (0 === t.length) this.urlWithParams = e;
						else {
							const n = e.indexOf('?');
							this.urlWithParams =
								e +
								(-1 === n ? '?' : n < e.length - 1 ? '&' : '') +
								t;
						}
					} else (this.params = new Ip()), (this.urlWithParams = e);
				}
				serializeBody() {
					return null === this.body
						? null
						: Op(this.body) ||
						  Rp(this.body) ||
						  Pp(this.body) ||
						  'string' == typeof this.body
						? this.body
						: this.body instanceof Ip
						? this.body.toString()
						: 'object' == typeof this.body ||
						  'boolean' == typeof this.body ||
						  Array.isArray(this.body)
						? JSON.stringify(this.body)
						: this.body.toString();
				}
				detectContentTypeHeader() {
					return null === this.body || Pp(this.body)
						? null
						: Rp(this.body)
						? this.body.type || null
						: Op(this.body)
						? null
						: 'string' == typeof this.body
						? 'text/plain'
						: this.body instanceof Ip
						? 'application/x-www-form-urlencoded;charset=UTF-8'
						: 'object' == typeof this.body ||
						  'number' == typeof this.body ||
						  Array.isArray(this.body)
						? 'application/json'
						: null;
				}
				clone(t = {}) {
					const e = t.method || this.method,
						n = t.url || this.url,
						r = t.responseType || this.responseType,
						s = void 0 !== t.body ? t.body : this.body,
						i =
							void 0 !== t.withCredentials
								? t.withCredentials
								: this.withCredentials,
						o =
							void 0 !== t.reportProgress
								? t.reportProgress
								: this.reportProgress;
					let a = t.headers || this.headers,
						l = t.params || this.params;
					return (
						void 0 !== t.setHeaders &&
							(a = Object.keys(t.setHeaders).reduce(
								(e, n) => e.set(n, t.setHeaders[n]),
								a
							)),
						t.setParams &&
							(l = Object.keys(t.setParams).reduce(
								(e, n) => e.set(n, t.setParams[n]),
								l
							)),
						new Np(e, n, s, {
							params: l,
							headers: a,
							reportProgress: o,
							responseType: r,
							withCredentials: i,
						})
					);
				}
			}
			var Lp = (function (t) {
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
			class Dp extends class {
				constructor(t, e = 200, n = 'OK') {
					(this.headers = t.headers || new kp()),
						(this.status = void 0 !== t.status ? t.status : e),
						(this.statusText = t.statusText || n),
						(this.url = t.url || null),
						(this.ok = this.status >= 200 && this.status < 300);
				}
			} {
				constructor(t = {}) {
					super(t),
						(this.type = Lp.Response),
						(this.body = void 0 !== t.body ? t.body : null);
				}
				clone(t = {}) {
					return new Dp({
						body: void 0 !== t.body ? t.body : this.body,
						headers: t.headers || this.headers,
						status: void 0 !== t.status ? t.status : this.status,
						statusText: t.statusText || this.statusText,
						url: t.url || this.url || void 0,
					});
				}
			}
			function Mp(t, e) {
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
			let Fp = (() => {
				class t {
					constructor(t) {
						this.handler = t;
					}
					request(t, e, n = {}) {
						let r;
						if (t instanceof Np) r = t;
						else {
							let s = void 0;
							s =
								n.headers instanceof kp
									? n.headers
									: new kp(n.headers);
							let i = void 0;
							n.params &&
								(i =
									n.params instanceof Ip
										? n.params
										: new Ip({ fromObject: n.params })),
								(r = new Np(
									t,
									e,
									void 0 !== n.body ? n.body : null,
									{
										headers: s,
										params: i,
										reportProgress: n.reportProgress,
										responseType: n.responseType || 'json',
										withCredentials: n.withCredentials,
									}
								));
						}
						const s = Eu(r).pipe(xp(t => this.handler.handle(t)));
						if (t instanceof Np || 'events' === n.observe) return s;
						const i = s.pipe(Mu(t => t instanceof Dp));
						switch (n.observe || 'body') {
							case 'body':
								switch (r.responseType) {
									case 'arraybuffer':
										return i.pipe(
											k(t => {
												if (
													null !== t.body &&
													!(
														t.body instanceof
														ArrayBuffer
													)
												)
													throw new Error(
														'Response is not an ArrayBuffer.'
													);
												return t.body;
											})
										);
									case 'blob':
										return i.pipe(
											k(t => {
												if (
													null !== t.body &&
													!(t.body instanceof Blob)
												)
													throw new Error(
														'Response is not a Blob.'
													);
												return t.body;
											})
										);
									case 'text':
										return i.pipe(
											k(t => {
												if (
													null !== t.body &&
													'string' != typeof t.body
												)
													throw new Error(
														'Response is not a string.'
													);
												return t.body;
											})
										);
									case 'json':
									default:
										return i.pipe(k(t => t.body));
								}
							case 'response':
								return i;
							default:
								throw new Error(
									`Unreachable: unhandled observe type ${n.observe}}`
								);
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
							params: new Ip().append(e, 'JSONP_CALLBACK'),
							observe: 'body',
							responseType: 'json',
						});
					}
					options(t, e = {}) {
						return this.request('OPTIONS', t, e);
					}
					patch(t, e, n = {}) {
						return this.request('PATCH', t, Mp(n, e));
					}
					post(t, e, n = {}) {
						return this.request('POST', t, Mp(n, e));
					}
					put(t, e, n = {}) {
						return this.request('PUT', t, Mp(n, e));
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Gt(Cp));
					}),
					(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			const jp = ['*'];
			function zp(t) {
				return Error(`Unable to find icon with the name "${t}"`);
			}
			function Bp(t) {
				return Error(
					`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`
				);
			}
			function Up(t) {
				return Error(
					`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`
				);
			}
			class Vp {
				constructor(t, e, n) {
					(this.url = t), (this.svgText = e), (this.options = n);
				}
			}
			let Hp = (() => {
				class t {
					constructor(t, e, n, r) {
						(this._httpClient = t),
							(this._sanitizer = e),
							(this._errorHandler = r),
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
					addSvgIconInNamespace(t, e, n, r) {
						return this._addSvgIconConfig(t, e, new Vp(n, null, r));
					}
					addSvgIconLiteralInNamespace(t, e, n, r) {
						const s = this._sanitizer.sanitize(Zr.HTML, n);
						if (!s) throw Up(n);
						return this._addSvgIconConfig(t, e, new Vp('', s, r));
					}
					addSvgIconSet(t, e) {
						return this.addSvgIconSetInNamespace('', t, e);
					}
					addSvgIconSetLiteral(t, e) {
						return this.addSvgIconSetLiteralInNamespace('', t, e);
					}
					addSvgIconSetInNamespace(t, e, n) {
						return this._addSvgIconSetConfig(t, new Vp(e, null, n));
					}
					addSvgIconSetLiteralInNamespace(t, e, n) {
						const r = this._sanitizer.sanitize(Zr.HTML, e);
						if (!r) throw Up(e);
						return this._addSvgIconSetConfig(t, new Vp('', r, n));
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
						const e = this._sanitizer.sanitize(Zr.RESOURCE_URL, t);
						if (!e) throw Bp(t);
						const n = this._cachedIconsByUrl.get(e);
						return n
							? Eu($p(n))
							: this._loadSvgIconFromConfig(new Vp(t, null)).pipe(
									Cu(t => this._cachedIconsByUrl.set(e, t)),
									k(t => $p(t))
							  );
					}
					getNamedSvgIcon(t, e = '') {
						const n = qp(e, t),
							r = this._svgIconConfigs.get(n);
						if (r) return this._getSvgFromConfig(r);
						const s = this._iconSetConfigs.get(e);
						return s
							? this._getSvgFromIconSetConfigs(t, s)
							: ((i = zp(n)), new _(t => t.error(i)));
						var i;
					}
					ngOnDestroy() {
						this._svgIconConfigs.clear(),
							this._iconSetConfigs.clear(),
							this._cachedIconsByUrl.clear();
					}
					_getSvgFromConfig(t) {
						return t.svgText
							? Eu($p(this._svgElementFromConfig(t)))
							: this._loadSvgIconFromConfig(t).pipe(
									k(t => $p(t))
							  );
					}
					_getSvgFromIconSetConfigs(t, e) {
						const n = this._extractIconWithNameFromAnySet(t, e);
						return n
							? Eu(n)
							: (function (...t) {
									if (1 === t.length) {
										const e = t[0];
										if (l(e)) return yp(e, null);
										if (
											c(e) &&
											Object.getPrototypeOf(e) ===
												Object.prototype
										) {
											const t = Object.keys(e);
											return yp(
												t.map(t => e[t]),
												t
											);
										}
									}
									if ('function' == typeof t[t.length - 1]) {
										const e = t.pop();
										return yp(
											(t =
												1 === t.length && l(t[0])
													? t[0]
													: t),
											null
										).pipe(k(t => e(...t)));
									}
									return yp(t, null);
							  })(
									e
										.filter(t => !t.svgText)
										.map(t =>
											this._loadSvgIconSetFromConfig(
												t
											).pipe(
												_p(e => {
													const n = this._sanitizer.sanitize(
														Zr.RESOURCE_URL,
														t.url
													);
													return (
														this._errorHandler.handleError(
															new Error(
																`Loading icon set URL: ${n} failed: ${e.message}`
															)
														),
														Eu(null)
													);
												})
											)
										)
							  ).pipe(
									k(() => {
										const n = this._extractIconWithNameFromAnySet(
											t,
											e
										);
										if (!n) throw zp(t);
										return n;
									})
							  );
					}
					_extractIconWithNameFromAnySet(t, e) {
						for (let n = e.length - 1; n >= 0; n--) {
							const r = e[n];
							if (r.svgText && r.svgText.indexOf(t) > -1) {
								const e = this._svgElementFromConfig(r),
									n = this._extractSvgIconFromSet(
										e,
										t,
										r.options
									);
								if (n) return n;
							}
						}
						return null;
					}
					_loadSvgIconFromConfig(t) {
						return this._fetchIcon(t).pipe(
							Cu(e => (t.svgText = e)),
							k(() => this._svgElementFromConfig(t))
						);
					}
					_loadSvgIconSetFromConfig(t) {
						return t.svgText
							? Eu(null)
							: this._fetchIcon(t).pipe(Cu(e => (t.svgText = e)));
					}
					_extractSvgIconFromSet(t, e, n) {
						const r = t.querySelector(`[id="${e}"]`);
						if (!r) return null;
						const s = r.cloneNode(!0);
						if (
							(s.removeAttribute('id'),
							'svg' === s.nodeName.toLowerCase())
						)
							return this._setSvgAttributes(s, n);
						if ('symbol' === s.nodeName.toLowerCase())
							return this._setSvgAttributes(
								this._toSvgElement(s),
								n
							);
						const i = this._svgElementFromString('<svg></svg>');
						return i.appendChild(s), this._setSvgAttributes(i, n);
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
						for (let r = 0; r < n.length; r++) {
							const { name: t, value: s } = n[r];
							'id' !== t && e.setAttribute(t, s);
						}
						for (let r = 0; r < t.childNodes.length; r++)
							t.childNodes[r].nodeType ===
								this._document.ELEMENT_NODE &&
								e.appendChild(t.childNodes[r].cloneNode(!0));
						return e;
					}
					_setSvgAttributes(t, e) {
						return (
							t.setAttribute('fit', ''),
							t.setAttribute('height', '100%'),
							t.setAttribute('width', '100%'),
							t.setAttribute(
								'preserveAspectRatio',
								'xMidYMid meet'
							),
							t.setAttribute('focusable', 'false'),
							e &&
								e.viewBox &&
								t.setAttribute('viewBox', e.viewBox),
							t
						);
					}
					_fetchIcon(t) {
						var e;
						const { url: n, options: r } = t,
							s =
								null !==
									(e =
										null == r
											? void 0
											: r.withCredentials) &&
								void 0 !== e &&
								e;
						if (!this._httpClient)
							throw Error(
								'Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports.'
							);
						if (null == n)
							throw Error(`Cannot fetch icon from URL "${n}".`);
						const i = this._sanitizer.sanitize(Zr.RESOURCE_URL, n);
						if (!i) throw Bp(n);
						const o = this._inProgressUrlFetches.get(i);
						if (o) return o;
						const a = this._httpClient
							.get(i, {
								responseType: 'text',
								withCredentials: s,
							})
							.pipe(
								wp(() => this._inProgressUrlFetches.delete(i)),
								J()
							);
						return this._inProgressUrlFetches.set(i, a), a;
					}
					_addSvgIconConfig(t, e, n) {
						return this._svgIconConfigs.set(qp(t, e), n), this;
					}
					_addSvgIconSetConfig(t, e) {
						const n = this._iconSetConfigs.get(t);
						return (
							n ? n.push(e) : this._iconSetConfigs.set(t, [e]),
							this
						);
					}
					_svgElementFromConfig(t) {
						if (!t.svgElement) {
							const e = this._svgElementFromString(t.svgText);
							this._setSvgAttributes(e, t.options),
								(t.svgElement = e);
						}
						return t.svgElement;
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(
							Gt(Fp, 8),
							Gt(cu),
							Gt(lc, 8),
							Gt(pr)
						);
					}),
					(t.ɵprov = ut({
						factory: function () {
							return new t(Gt(Fp, 8), Gt(cu), Gt(lc, 8), Gt(pr));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			function $p(t) {
				return t.cloneNode(!0);
			}
			function qp(t, e) {
				return t + ':' + e;
			}
			class Wp {
				constructor(t) {
					this._elementRef = t;
				}
			}
			const Qp = sp(Wp),
				Kp = new jt('mat-icon-location', {
					providedIn: 'root',
					factory: function () {
						const t = Zt(lc),
							e = t ? t.location : null;
						return {
							getPathname: () => (e ? e.pathname + e.search : ''),
						};
					},
				}),
				Gp = [
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
				Zp = Gp.map(t => `[${t}]`).join(', '),
				Yp = /^url\(['"]?#(.*?)['"]?\)$/;
			let Xp = (() => {
					class t extends Qp {
						constructor(t, e, n, r, s) {
							super(t),
								(this._iconRegistry = e),
								(this._location = r),
								(this._errorHandler = s),
								(this._inline = !1),
								(this._currentIconFetch = h.EMPTY),
								n ||
									t.nativeElement.setAttribute(
										'aria-hidden',
										'true'
									);
						}
						get inline() {
							return this._inline;
						}
						set inline(t) {
							this._inline = qu(t);
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
							if (
								((this._svgNamespace = null),
								(this._svgName = null),
								e)
							)
								if (
									(this._currentIconFetch.unsubscribe(),
									this.svgIcon)
								) {
									const [t, e] = this._splitIconName(
										this.svgIcon
									);
									t && (this._svgNamespace = t),
										e && (this._svgName = e),
										(this._currentIconFetch = this._iconRegistry
											.getNamedSvgIcon(e, t)
											.pipe(Vu(1))
											.subscribe(
												t => this._setSvgElement(t),
												n => {
													this._errorHandler.handleError(
														new Error(
															`Error retrieving icon ${t}:${e}! ${n.message}`
														)
													);
												}
											));
								} else
									e.previousValue && this._clearSvgElement();
							this._usingFontIcon() &&
								this._updateFontIconClasses();
						}
						ngOnInit() {
							this._usingFontIcon() &&
								this._updateFontIconClasses();
						}
						ngAfterViewChecked() {
							const t = this._elementsWithExternalReferences;
							if (t && t.size) {
								const t = this._location.getPathname();
								t !== this._previousPath &&
									((this._previousPath = t),
									this._prependPathToReferences(t));
							}
						}
						ngOnDestroy() {
							this._currentIconFetch.unsubscribe(),
								this._elementsWithExternalReferences &&
									this._elementsWithExternalReferences.clear();
						}
						_usingFontIcon() {
							return !this.svgIcon;
						}
						_setSvgElement(t) {
							this._clearSvgElement();
							const e = t.querySelectorAll('style');
							for (let r = 0; r < e.length; r++)
								e[r].textContent += ' ';
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
								this._elementsWithExternalReferences &&
								this._elementsWithExternalReferences.clear();
								e--;

							) {
								const n = t.childNodes[e];
								(1 === n.nodeType &&
									'svg' !== n.nodeName.toLowerCase()) ||
									t.removeChild(n);
							}
						}
						_updateFontIconClasses() {
							if (!this._usingFontIcon()) return;
							const t = this._elementRef.nativeElement,
								e = this.fontSet
									? this._iconRegistry.classNameForFontAlias(
											this.fontSet
									  )
									: this._iconRegistry.getDefaultFontSetClass();
							e != this._previousFontSetClass &&
								(this._previousFontSetClass &&
									t.classList.remove(
										this._previousFontSetClass
									),
								e && t.classList.add(e),
								(this._previousFontSetClass = e)),
								this.fontIcon != this._previousFontIconClass &&
									(this._previousFontIconClass &&
										t.classList.remove(
											this._previousFontIconClass
										),
									this.fontIcon &&
										t.classList.add(this.fontIcon),
									(this._previousFontIconClass = this.fontIcon));
						}
						_cleanupFontValue(t) {
							return 'string' == typeof t
								? t.trim().split(' ')[0]
								: t;
						}
						_prependPathToReferences(t) {
							const e = this._elementsWithExternalReferences;
							e &&
								e.forEach((e, n) => {
									e.forEach(e => {
										n.setAttribute(
											e.name,
											`url('${t}#${e.value}')`
										);
									});
								});
						}
						_cacheChildrenWithExternalReferences(t) {
							const e = t.querySelectorAll(Zp),
								n = (this._elementsWithExternalReferences =
									this._elementsWithExternalReferences ||
									new Map());
							for (let r = 0; r < e.length; r++)
								Gp.forEach(t => {
									const s = e[r],
										i = s.getAttribute(t),
										o = i ? i.match(Yp) : null;
									if (o) {
										let e = n.get(s);
										e || ((e = []), n.set(s, e)),
											e.push({ name: t, value: o[1] });
									}
								});
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(
								mo(ha),
								mo(Hp),
								go('aria-hidden'),
								mo(Kp),
								mo(pr)
							);
						}),
						(t.ɵcmp = pe({
							type: t,
							selectors: [['mat-icon']],
							hostAttrs: [
								'role',
								'img',
								1,
								'mat-icon',
								'notranslate',
							],
							hostVars: 7,
							hostBindings: function (t, e) {
								2 & t &&
									(fo(
										'data-mat-icon-type',
										e._usingFontIcon() ? 'font' : 'svg'
									)(
										'data-mat-icon-name',
										e._svgName || e.fontIcon
									)(
										'data-mat-icon-namespace',
										e._svgNamespace || e.fontSet
									),
									Fo('mat-icon-inline', e.inline)(
										'mat-icon-no-color',
										'primary' !== e.color &&
											'accent' !== e.color &&
											'warn' !== e.color
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
							features: [no, Le],
							ngContentSelectors: jp,
							decls: 1,
							vars: 0,
							template: function (t, e) {
								1 & t && (Ro(), Po(0));
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
				Jp = (() => {
					class t {}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[np], np],
						})),
						t
					);
				})(),
				tm = (() => {
					class t {}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[np], np],
						})),
						t
					);
				})();
			const em = ['mat-button', ''],
				nm = ['*'],
				rm =
					'.mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:block;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}.cdk-high-contrast-active .mat-button-base.cdk-keyboard-focused,.cdk-high-contrast-active .mat-button-base.cdk-program-focused{outline:solid 3px}\n',
				sm = [
					'mat-button',
					'mat-flat-button',
					'mat-icon-button',
					'mat-raised-button',
					'mat-stroked-button',
					'mat-mini-fab',
					'mat-fab',
				];
			class im {
				constructor(t) {
					this._elementRef = t;
				}
			}
			const om = sp(rp(ip(im)));
			let am = (() => {
					class t extends om {
						constructor(t, e, n) {
							super(t),
								(this._focusMonitor = e),
								(this._animationMode = n),
								(this.isRoundButton = this._hasHostAttributes(
									'mat-fab',
									'mat-mini-fab'
								)),
								(this.isIconButton = this._hasHostAttributes(
									'mat-icon-button'
								));
							for (const r of sm)
								this._hasHostAttributes(r) &&
									this._getHostElement().classList.add(r);
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
							this._focusMonitor.focusVia(
								this._getHostElement(),
								t,
								e
							);
						}
						_getHostElement() {
							return this._elementRef.nativeElement;
						}
						_isRippleDisabled() {
							return this.disableRipple || this.disabled;
						}
						_hasHostAttributes(...t) {
							return t.some(t =>
								this._getHostElement().hasAttribute(t)
							);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(mo(ha), mo(nh), mo(Zf, 8));
						}),
						(t.ɵcmp = pe({
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
								1 & t && sl(pp, !0),
									2 & t &&
										rl((n = ol())) &&
										(e.ripple = n.first);
							},
							hostAttrs: [1, 'mat-focus-indicator'],
							hostVars: 5,
							hostBindings: function (t, e) {
								2 & t &&
									(fo('disabled', e.disabled || null),
									Fo(
										'_mat-animation-noopable',
										'NoopAnimations' === e._animationMode
									)('mat-button-disabled', e.disabled));
							},
							inputs: {
								disabled: 'disabled',
								disableRipple: 'disableRipple',
								color: 'color',
							},
							exportAs: ['matButton'],
							features: [no],
							attrs: em,
							ngContentSelectors: nm,
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
								1 & t &&
									(Ro(),
									bo(0, 'span', 0),
									Po(1),
									vo(),
									wo(2, 'span', 1),
									wo(3, 'span', 2)),
									2 & t &&
										(gs(2),
										Fo(
											'mat-button-ripple-round',
											e.isRoundButton || e.isIconButton
										),
										yo(
											'matRippleDisabled',
											e._isRippleDisabled()
										)('matRippleCentered', e.isIconButton)(
											'matRippleTrigger',
											e._getHostElement()
										));
							},
							directives: [pp],
							styles: [rm],
							encapsulation: 2,
							changeDetection: 0,
						})),
						t
					);
				})(),
				lm = (() => {
					class t extends am {
						constructor(t, e, n) {
							super(e, t, n);
						}
						_haltDisabledEvents(t) {
							this.disabled &&
								(t.preventDefault(),
								t.stopImmediatePropagation());
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(mo(nh), mo(ha), mo(Zf, 8));
						}),
						(t.ɵcmp = pe({
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
									xo('click', function (t) {
										return e._haltDisabledEvents(t);
									}),
									2 & t &&
										(fo(
											'tabindex',
											e.disabled ? -1 : e.tabIndex || 0
										)('disabled', e.disabled || null)(
											'aria-disabled',
											e.disabled.toString()
										),
										Fo(
											'_mat-animation-noopable',
											'NoopAnimations' ===
												e._animationMode
										)('mat-button-disabled', e.disabled));
							},
							inputs: {
								disabled: 'disabled',
								disableRipple: 'disableRipple',
								color: 'color',
								tabIndex: 'tabIndex',
							},
							exportAs: ['matButton', 'matAnchor'],
							features: [no],
							attrs: em,
							ngContentSelectors: nm,
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
								1 & t &&
									(Ro(),
									bo(0, 'span', 0),
									Po(1),
									vo(),
									wo(2, 'span', 1),
									wo(3, 'span', 2)),
									2 & t &&
										(gs(2),
										Fo(
											'mat-button-ripple-round',
											e.isRoundButton || e.isIconButton
										),
										yo(
											'matRippleDisabled',
											e._isRippleDisabled()
										)('matRippleCentered', e.isIconButton)(
											'matRippleTrigger',
											e._getHostElement()
										));
							},
							directives: [pp],
							styles: [rm],
							encapsulation: 2,
							changeDetection: 0,
						})),
						t
					);
				})(),
				cm = (() => {
					class t {}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[mp, np], np],
						})),
						t
					);
				})();
			function um(t) {
				return e => e.lift(new hm(t));
			}
			class hm {
				constructor(t) {
					this.notifier = t;
				}
				call(t, e) {
					const n = new dm(t),
						r = z(this.notifier, new F(n));
					return r && !n.seenValue ? (n.add(r), e.subscribe(n)) : n;
				}
			}
			class dm extends j {
				constructor(t) {
					super(t), (this.seenValue = !1);
				}
				notifyNext() {
					(this.seenValue = !0), this.complete();
				}
				notifyComplete() {}
			}
			let fm = (() => {
					class t {}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[np], np],
						})),
						t
					);
				})(),
				pm = (() => {
					class t {}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[op, mp, np, gp, Pc], op, np, gp, fm],
						})),
						t
					);
				})();
			class mm extends E {
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
					if (this.closed) throw new v();
					return this._value;
				}
				next(t) {
					super.next((this._value = t));
				}
			}
			function gm(t, e, n, s) {
				return (
					r(n) && ((s = n), (n = void 0)),
					s
						? gm(t, e, n).pipe(k(t => (l(t) ? s(...t) : s(t))))
						: new _(r => {
								!(function t(e, n, r, s, i) {
									let o;
									if (
										(function (t) {
											return (
												t &&
												'function' ==
													typeof t.addEventListener &&
												'function' ==
													typeof t.removeEventListener
											);
										})(e)
									) {
										const t = e;
										e.addEventListener(n, r, i),
											(o = () =>
												t.removeEventListener(n, r, i));
									} else if (
										(function (t) {
											return (
												t &&
												'function' == typeof t.on &&
												'function' == typeof t.off
											);
										})(e)
									) {
										const t = e;
										e.on(n, r), (o = () => t.off(n, r));
									} else if (
										(function (t) {
											return (
												t &&
												'function' ==
													typeof t.addListener &&
												'function' ==
													typeof t.removeListener
											);
										})(e)
									) {
										const t = e;
										e.addListener(n, r),
											(o = () => t.removeListener(n, r));
									} else {
										if (!e || !e.length)
											throw new TypeError(
												'Invalid event target'
											);
										for (
											let o = 0, a = e.length;
											o < a;
											o++
										)
											t(e[o], n, r, s, i);
									}
									s.add(o);
								})(
									t,
									e,
									function (t) {
										r.next(
											arguments.length > 1
												? Array.prototype.slice.call(
														arguments
												  )
												: t
										);
									},
									r,
									n
								);
						  })
				);
			}
			function ym(t, e) {
				return 'function' == typeof e
					? n =>
							n.pipe(
								ym((n, r) =>
									M(t(n, r)).pipe(k((t, s) => e(n, t, r, s)))
								)
							)
					: e => e.lift(new _m(t));
			}
			class _m {
				constructor(t) {
					this.project = t;
				}
				call(t, e) {
					return e.subscribe(new bm(t, this.project));
				}
			}
			class bm extends j {
				constructor(t, e) {
					super(t), (this.project = e), (this.index = 0);
				}
				_next(t) {
					let e;
					const n = this.index++;
					try {
						e = this.project(t, n);
					} catch (r) {
						return void this.destination.error(r);
					}
					this._innerSub(e);
				}
				_innerSub(t) {
					const e = this.innerSubscription;
					e && e.unsubscribe();
					const n = new F(this),
						r = this.destination;
					r.add(n),
						(this.innerSubscription = z(t, n)),
						this.innerSubscription !== n &&
							r.add(this.innerSubscription);
				}
				_complete() {
					const { innerSubscription: t } = this;
					(t && !t.closed) || super._complete(), this.unsubscribe();
				}
				_unsubscribe() {
					this.innerSubscription = void 0;
				}
				notifyComplete() {
					(this.innerSubscription = void 0),
						this.isStopped && super._complete();
				}
				notifyNext(t) {
					this.destination.next(t);
				}
			}
			const vm = {
					provide: yl,
					useFactory: function (t, e) {
						return () => {
							if (Nc(e)) {
								const e = Array.from(
										t.querySelectorAll(`[class*=${wm}]`)
									),
									n = /\bflex-layout-.+?\b/g;
								e.forEach(t => {
									t.classList.contains(wm + 'ssr') &&
									t.parentNode
										? t.parentNode.removeChild(t)
										: t.className.replace(n, '');
								});
							}
						};
					},
					deps: [lc, gl],
					multi: !0,
				},
				wm = 'flex-layout-';
			let Sm = (() => {
				class t {}
				return (
					(t.ɵmod = _e({ type: t })),
					(t.ɵinj = ht({
						factory: function (e) {
							return new (e || t)();
						},
						providers: [vm],
					})),
					t
				);
			})();
			class Em {
				constructor(t = !1, e = 'all', n = '', r = '', s = 0) {
					(this.matches = t),
						(this.mediaQuery = e),
						(this.mqAlias = n),
						(this.suffix = r),
						(this.priority = s),
						(this.property = '');
				}
				clone() {
					return new Em(
						this.matches,
						this.mediaQuery,
						this.mqAlias,
						this.suffix
					);
				}
			}
			let xm = (() => {
				class t {
					constructor() {
						this.stylesheet = new Map();
					}
					addStyleToElement(t, e, n) {
						const r = this.stylesheet.get(t);
						r
							? r.set(e, n)
							: this.stylesheet.set(t, new Map([[e, n]]));
					}
					clearStyles() {
						this.stylesheet.clear();
					}
					getStyleForElement(t, e) {
						const n = this.stylesheet.get(t);
						let r = '';
						if (n) {
							const t = n.get(e);
							('number' != typeof t && 'string' != typeof t) ||
								(r = t + '');
						}
						return r;
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵprov = ut({
						factory: function () {
							return new t();
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			const Cm = {
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
				km = new jt(
					'Flex Layout token, config options for the library',
					{ providedIn: 'root', factory: () => Cm }
				),
				Tm = new jt('FlexLayoutServerLoaded', {
					providedIn: 'root',
					factory: () => !1,
				}),
				Am = new jt(
					'Flex Layout token, collect all breakpoints into one provider',
					{ providedIn: 'root', factory: () => null }
				);
			function Im(t, e) {
				return (
					(t = t ? t.clone() : new Em()),
					e &&
						((t.mqAlias = e.alias),
						(t.mediaQuery = e.mediaQuery),
						(t.suffix = e.suffix),
						(t.priority = e.priority)),
					t
				);
			}
			const Om = 'inline',
				Rm = ['row', 'column', 'row-reverse', 'column-reverse'];
			function Pm(t) {
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
			let Nm = (() => {
				class t {
					constructor(t, e, n, r) {
						(this.elementRef = t),
							(this.styleBuilder = e),
							(this.styler = n),
							(this.marshal = r),
							(this.DIRECTIVE_KEY = ''),
							(this.inputs = []),
							(this.mru = {}),
							(this.destroySubject = new E()),
							(this.styleCache = new Map());
					}
					get parentElement() {
						return this.elementRef.nativeElement.parentElement;
					}
					get nativeElement() {
						return this.elementRef.nativeElement;
					}
					get activatedValue() {
						return this.marshal.getValue(
							this.nativeElement,
							this.DIRECTIVE_KEY
						);
					}
					set activatedValue(t) {
						this.marshal.setValue(
							this.nativeElement,
							this.DIRECTIVE_KEY,
							t,
							this.marshal.activatedAlias
						);
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
							r = n.shouldCache;
						let s = this.styleCache.get(t);
						(s && r) ||
							((s = n.buildStyles(t, e)),
							r && this.styleCache.set(t, s)),
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
						this.marshal.triggerUpdate(
							this.nativeElement,
							this.DIRECTIVE_KEY
						);
					}
					getFlexFlowDirection(t, e = !1) {
						if (t) {
							const [n, r] = this.styler.getFlowDirection(t);
							if (!r && e) {
								const e = (function (t) {
									let [e, n, r] = (function (t) {
										t = t ? t.toLowerCase() : '';
										let [e, n, r] = t.split(' ');
										return (
											Rm.find(t => t === e) ||
												(e = Rm[0]),
											n === Om &&
												((n = r !== Om ? r : ''),
												(r = Om)),
											[e, Pm(n), !!r]
										);
									})(t);
									return (function (t, e = null, n = !1) {
										return {
											display: n ? 'inline-flex' : 'flex',
											'box-sizing': 'border-box',
											'flex-direction': t,
											'flex-wrap': e || null,
										};
									})(e, n, r);
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
						this.marshal.setValue(
							this.nativeElement,
							this.DIRECTIVE_KEY,
							t,
							e
						);
					}
					updateWithValue(t) {
						this.currentValue !== t &&
							(this.addStyles(t), (this.currentValue = t));
					}
				}
				return (
					(t.ɵfac = function (t) {
						!(function () {
							throw new Error('invalid');
						})();
					}),
					(t.ɵdir = ve({ type: t, features: [Le] })),
					t
				);
			})();
			const Lm = [
					{
						alias: 'xs',
						mediaQuery:
							'screen and (min-width: 0px) and (max-width: 599.9px)',
						priority: 1e3,
					},
					{
						alias: 'sm',
						mediaQuery:
							'screen and (min-width: 600px) and (max-width: 959.9px)',
						priority: 900,
					},
					{
						alias: 'md',
						mediaQuery:
							'screen and (min-width: 960px) and (max-width: 1279.9px)',
						priority: 800,
					},
					{
						alias: 'lg',
						mediaQuery:
							'screen and (min-width: 1280px) and (max-width: 1919.9px)',
						priority: 700,
					},
					{
						alias: 'xl',
						mediaQuery:
							'screen and (min-width: 1920px) and (max-width: 4999.9px)',
						priority: 600,
					},
					{
						alias: 'lt-sm',
						overlapping: !0,
						mediaQuery: 'screen and (max-width: 599.9px)',
						priority: 950,
					},
					{
						alias: 'lt-md',
						overlapping: !0,
						mediaQuery: 'screen and (max-width: 959.9px)',
						priority: 850,
					},
					{
						alias: 'lt-lg',
						overlapping: !0,
						mediaQuery: 'screen and (max-width: 1279.9px)',
						priority: 750,
					},
					{
						alias: 'lt-xl',
						overlapping: !0,
						priority: 650,
						mediaQuery: 'screen and (max-width: 1919.9px)',
					},
					{
						alias: 'gt-xs',
						overlapping: !0,
						mediaQuery: 'screen and (min-width: 600px)',
						priority: -950,
					},
					{
						alias: 'gt-sm',
						overlapping: !0,
						mediaQuery: 'screen and (min-width: 960px)',
						priority: -850,
					},
					{
						alias: 'gt-md',
						overlapping: !0,
						mediaQuery: 'screen and (min-width: 1280px)',
						priority: -750,
					},
					{
						alias: 'gt-lg',
						overlapping: !0,
						mediaQuery: 'screen and (min-width: 1920px)',
						priority: -650,
					},
				],
				Dm = '(orientation: portrait) and (max-width: 599.9px)',
				Mm = '(orientation: landscape) and (max-width: 959.9px)',
				Fm =
					'(orientation: portrait) and (min-width: 600px) and (max-width: 839.9px)',
				jm =
					'(orientation: landscape) and (min-width: 960px) and (max-width: 1279.9px)',
				zm = '(orientation: portrait) and (min-width: 840px)',
				Bm = '(orientation: landscape) and (min-width: 1280px)',
				Um = {
					HANDSET: `${Dm}, ${Mm}`,
					TABLET: `${Fm} , ${jm}`,
					WEB: `${zm}, ${Bm} `,
					HANDSET_PORTRAIT: '' + Dm,
					TABLET_PORTRAIT: Fm + ' ',
					WEB_PORTRAIT: '' + zm,
					HANDSET_LANDSCAPE: '' + Mm,
					TABLET_LANDSCAPE: '' + jm,
					WEB_LANDSCAPE: '' + Bm,
				},
				Vm = [
					{ alias: 'handset', priority: 2e3, mediaQuery: Um.HANDSET },
					{
						alias: 'handset.landscape',
						priority: 2e3,
						mediaQuery: Um.HANDSET_LANDSCAPE,
					},
					{
						alias: 'handset.portrait',
						priority: 2e3,
						mediaQuery: Um.HANDSET_PORTRAIT,
					},
					{ alias: 'tablet', priority: 2100, mediaQuery: Um.TABLET },
					{
						alias: 'tablet.landscape',
						priority: 2100,
						mediaQuery: Um.TABLET_LANDSCAPE,
					},
					{
						alias: 'tablet.portrait',
						priority: 2100,
						mediaQuery: Um.TABLET_PORTRAIT,
					},
					{
						alias: 'web',
						priority: 2200,
						mediaQuery: Um.WEB,
						overlapping: !0,
					},
					{
						alias: 'web.landscape',
						priority: 2200,
						mediaQuery: Um.WEB_LANDSCAPE,
						overlapping: !0,
					},
					{
						alias: 'web.portrait',
						priority: 2200,
						mediaQuery: Um.WEB_PORTRAIT,
						overlapping: !0,
					},
				],
				Hm = /(\.|-|_)/g;
			function $m(t) {
				let e = t.length > 0 ? t.charAt(0) : '',
					n = t.length > 1 ? t.slice(1) : '';
				return e.toUpperCase() + n;
			}
			const qm = new jt('Token (@angular/flex-layout) Breakpoints', {
				providedIn: 'root',
				factory: () => {
					const t = Zt(Am),
						e = Zt(km),
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
												throw TypeError(
													'Cannot convert undefined or null to object'
												);
											for (let n of e)
												if (null != n)
													for (let e in n)
														n.hasOwnProperty(e) &&
															(t[e] = n[e]);
									  })(n[t.alias], t)
									: (n[t.alias] = t);
							}),
							(r = Object.keys(n).map(t => n[t])).forEach(t => {
								t.suffix ||
									((t.suffix = t.alias
										.replace(Hm, '|')
										.split('|')
										.map($m)
										.join('')),
									(t.overlapping = !!t.overlapping));
							}),
							r
						);
						var r;
					})(
						(e.disableDefaultBps ? [] : Lm).concat(
							e.addOrientationBps ? Vm : []
						),
						n
					);
				},
			});
			function Wm(t, e) {
				return ((e && e.priority) || 0) - ((t && t.priority) || 0);
			}
			function Qm(t, e) {
				return (t.priority || 0) - (e.priority || 0);
			}
			let Km = (() => {
					class t {
						constructor(t) {
							(this.findByMap = new Map()),
								(this.items = [...t].sort(Qm));
						}
						findByAlias(t) {
							return t
								? this.findWithPredicate(t, e => e.alias == t)
								: null;
						}
						findByQuery(t) {
							return this.findWithPredicate(
								t,
								e => e.mediaQuery == t
							);
						}
						get overlappings() {
							return this.items.filter(t => 1 == t.overlapping);
						}
						get aliases() {
							return this.items.map(t => t.alias);
						}
						get suffixes() {
							return this.items.map(t =>
								t.suffix ? t.suffix : ''
							);
						}
						findWithPredicate(t, e) {
							let n = this.findByMap.get(t);
							return (
								n ||
									((n = this.items.find(e) || null),
									this.findByMap.set(t, n)),
								n || null
							);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Gt(qm));
						}),
						(t.ɵprov = ut({
							factory: function () {
								return new t(Gt(qm));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				Gm = (() => {
					class t {
						constructor(t, e, n) {
							(this._zone = t),
								(this._platformId = e),
								(this._document = n),
								(this.source = new mm(new Em(!0))),
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
							return e
								? e.matches
								: this.registerQuery(t).some(t => t.matches);
						}
						observe(t, e = !1) {
							if (t && t.length) {
								const n = this._observable$.pipe(
									Mu(n => !e || t.indexOf(n.mediaQuery) > -1)
								);
								return q(
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
									const n = t.filter(t => !Zm[t]);
									if (n.length > 0) {
										const t = n.join(', ');
										try {
											const r = e.createElement('style');
											r.setAttribute('type', 'text/css'),
												r.styleSheet ||
													r.appendChild(
														e.createTextNode(
															`\n/*\n  @angular/flex-layout - workaround for possible browser quirk with mediaQuery listeners\n  see http://bit.ly/2sd4HMP\n*/\n@media ${t} {.fx-query-test{ }}\n`
														)
													),
												e.head.appendChild(r),
												n.forEach(t => (Zm[t] = r));
										} catch (r) {
											console.error(r);
										}
									}
								})(e, this._document),
								e.forEach(t => {
									const e = e => {
										this._zone.run(() =>
											this.source.next(
												new Em(e.matches, t)
											)
										);
									};
									let r = this.registry.get(t);
									r ||
										((r = this.buildMQL(t)),
										r.addListener(e),
										this.pendingRemoveListenerFns.push(() =>
											r.removeListener(e)
										),
										this.registry.set(t, r)),
										r.matches && n.push(new Em(!0, t));
								}),
								n
							);
						}
						ngOnDestroy() {
							let t;
							for (; (t = this.pendingRemoveListenerFns.pop()); )
								t();
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
							})(t, Nc(this._platformId));
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Gt(Rl), Gt(gl), Gt(lc));
						}),
						(t.ɵprov = ut({
							factory: function () {
								return new t(Gt(Rl), Gt(gl), Gt(lc));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})();
			const Zm = {},
				Ym = 'print',
				Xm = { alias: Ym, mediaQuery: Ym, priority: 1e3 };
			let Jm = (() => {
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
							(this.queue = new tg()),
							(this.deactivations = []);
					}
					withPrintQuery(t) {
						return [...t, Ym];
					}
					isPrintEvent(t) {
						return t.mediaQuery.startsWith(Ym);
					}
					get printAlias() {
						return this.layoutConfig.printWithBreakpoints || [];
					}
					get printBreakPoints() {
						return this.printAlias
							.map(t => this.breakpoints.findByAlias(t))
							.filter(t => null !== t);
					}
					getEventBreakpoints({ mediaQuery: t }) {
						const e = this.breakpoints.findByQuery(t);
						return (e
							? [...this.printBreakPoints, e]
							: this.printBreakPoints
						).sort(Wm);
					}
					updateEvent(t) {
						let e = this.breakpoints.findByQuery(t.mediaQuery);
						return (
							this.isPrintEvent(t) &&
								((e = this.getEventBreakpoints(t)[0]),
								(t.mediaQuery = e ? e.mediaQuery : '')),
							Im(t, e)
						);
					}
					registerBeforeAfterPrintHooks(t) {
						if (
							!this._document.defaultView ||
							this.registeredBeforeAfterPrintHooks
						)
							return;
						this.registeredBeforeAfterPrintHooks = !0;
						const e = () => {
								this.isPrinting ||
									((this.isPrintingBeforeAfterEvent = !0),
									this.startPrinting(
										t,
										this.getEventBreakpoints(new Em(!0, Ym))
									),
									t.updateStyles());
							},
							n = () => {
								(this.isPrintingBeforeAfterEvent = !1),
									this.isPrinting &&
										(this.stopPrinting(t),
										t.updateStyles());
							};
						this._document.defaultView.addEventListener(
							'beforeprint',
							e
						),
							this._document.defaultView.addEventListener(
								'afterprint',
								n
							),
							this.beforePrintEventListeners.push(e),
							this.afterPrintEventListeners.push(n);
					}
					interceptEvents(t) {
						return (
							this.registerBeforeAfterPrintHooks(t),
							e => {
								this.isPrintEvent(e)
									? e.matches && !this.isPrinting
										? (this.startPrinting(
												t,
												this.getEventBreakpoints(e)
										  ),
										  t.updateStyles())
										: e.matches ||
										  !this.isPrinting ||
										  this.isPrintingBeforeAfterEvent ||
										  (this.stopPrinting(t),
										  t.updateStyles())
									: this.collectActivations(e);
							}
						);
					}
					blockPropagation() {
						return t => !(this.isPrinting || this.isPrintEvent(t));
					}
					startPrinting(t, e) {
						(this.isPrinting = !0),
							(t.activatedBreakpoints = this.queue.addPrintBreakpoints(
								e
							));
					}
					stopPrinting(t) {
						(t.activatedBreakpoints = this.deactivations),
							(this.deactivations = []),
							this.queue.clear(),
							(this.isPrinting = !1);
					}
					collectActivations(t) {
						if (!this.isPrinting || this.isPrintingBeforeAfterEvent)
							if (t.matches)
								this.isPrintingBeforeAfterEvent ||
									(this.deactivations = []);
							else {
								const e = this.breakpoints.findByQuery(
									t.mediaQuery
								);
								e &&
									(this.deactivations.push(e),
									this.deactivations.sort(Wm));
							}
					}
					ngOnDestroy() {
						this.beforePrintEventListeners.forEach(t =>
							this._document.defaultView.removeEventListener(
								'beforeprint',
								t
							)
						),
							this.afterPrintEventListeners.forEach(t =>
								this._document.defaultView.removeEventListener(
									'afterprint',
									t
								)
							);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Gt(Km), Gt(km), Gt(lc));
					}),
					(t.ɵprov = ut({
						factory: function () {
							return new t(Gt(Km), Gt(km), Gt(lc));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			class tg {
				constructor() {
					this.printBreakpoints = [];
				}
				addPrintBreakpoints(t) {
					return (
						t.push(Xm),
						t.sort(Wm),
						t.forEach(t => this.addBreakpoint(t)),
						this.printBreakpoints
					);
				}
				addBreakpoint(t) {
					t &&
						void 0 ===
							this.printBreakpoints.find(
								e => e.mediaQuery === t.mediaQuery
							) &&
						(this.printBreakpoints = (function (t) {
							return !!t && t.mediaQuery.startsWith(Ym);
						})(t)
							? [t, ...this.printBreakpoints]
							: [...this.printBreakpoints, t]);
				}
				clear() {
					this.printBreakpoints = [];
				}
			}
			function eg(t) {
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
							(n = n || 'row'),
								(t['-webkit-flex-direction'] = n),
								(t['flex-direction'] = n);
							break;
						case 'order':
							t.order = t['-webkit-' + e] = isNaN(+n) ? '0' : n;
					}
				}
				return t;
			}
			let ng = (() => {
				class t {
					constructor(t, e, n, r) {
						(this._serverStylesheet = t),
							(this._serverModuleLoaded = e),
							(this._platformId = n),
							(this.layoutConfig = r);
					}
					applyStyleToElement(t, e, n = null) {
						let r = {};
						'string' == typeof e && ((r[e] = n), (e = r)),
							(r = this.layoutConfig.disableVendorPrefixes
								? e
								: eg(e)),
							this._applyMultiValueStyleToElement(r, t);
					}
					applyStyleToElements(t, e = []) {
						const n = this.layoutConfig.disableVendorPrefixes
							? t
							: eg(t);
						e.forEach(t => {
							this._applyMultiValueStyleToElement(n, t);
						});
					}
					getFlowDirection(t) {
						const e = 'flex-direction';
						let n = this.lookupStyle(t, e);
						return [
							n || 'row',
							this.lookupInlineStyle(t, e) ||
							(Lc(this._platformId) && this._serverModuleLoaded)
								? n
								: '',
						];
					}
					hasWrap(t) {
						return 'wrap' === this.lookupStyle(t, 'flex-wrap');
					}
					lookupAttributeValue(t, e) {
						return t.getAttribute(e) || '';
					}
					lookupInlineStyle(t, e) {
						return Nc(this._platformId)
							? t.style.getPropertyValue(e)
							: this._getServerStyle(t, e);
					}
					lookupStyle(t, e, n = !1) {
						let r = '';
						return (
							t &&
								((r = this.lookupInlineStyle(t, e)) ||
									(Nc(this._platformId)
										? n ||
										  (r = getComputedStyle(
												t
										  ).getPropertyValue(e))
										: this._serverModuleLoaded &&
										  (r = this._serverStylesheet.getStyleForElement(
												t,
												e
										  )))),
							r ? r.trim() : ''
						);
					}
					_applyMultiValueStyleToElement(t, e) {
						Object.keys(t)
							.sort()
							.forEach(n => {
								const r = t[n],
									s = Array.isArray(r) ? r : [r];
								s.sort();
								for (let t of s)
									(t = t ? t + '' : ''),
										Nc(this._platformId) ||
										!this._serverModuleLoaded
											? Nc(this._platformId)
												? e.style.setProperty(n, t)
												: this._setServerStyle(e, n, t)
											: this._serverStylesheet.addStyleToElement(
													e,
													n,
													t
											  );
							});
					}
					_setServerStyle(t, e, n) {
						e = e.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
						const r = this._readStyleAttribute(t);
						(r[e] = n || ''), this._writeStyleAttribute(t, r);
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
								const r = t[n].trim();
								if (r.length > 0) {
									const t = r.indexOf(':');
									if (-1 === t)
										throw new Error(
											'Invalid CSS style: ' + r
										);
									e[r.substr(0, t).trim()] = r
										.substr(t + 1)
										.trim();
								}
							}
						}
						return e;
					}
					_writeStyleAttribute(t, e) {
						let n = '';
						for (const r in e) e[r] && (n += r + ':' + e[r] + ';');
						t.setAttribute('style', n);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Gt(xm), Gt(Tm), Gt(gl), Gt(km));
					}),
					(t.ɵprov = ut({
						factory: function () {
							return new t(Gt(xm), Gt(Tm), Gt(gl), Gt(km));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			class rg {
				constructor() {
					this.shouldCache = !0;
				}
				sideEffect(t, e, n) {}
			}
			let sg = (() => {
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
							(this.subject = new E()),
							this.observeActivations();
					}
					get activatedAlias() {
						return this.activatedBreakpoints[0]
							? this.activatedBreakpoints[0].alias
							: '';
					}
					onMediaChange(t) {
						const e = this.findByQuery(t.mediaQuery);
						e &&
							((t = Im(t, e)).matches &&
							-1 === this.activatedBreakpoints.indexOf(e)
								? (this.activatedBreakpoints.push(e),
								  this.activatedBreakpoints.sort(Wm),
								  this.updateStyles())
								: t.matches ||
								  -1 === this.activatedBreakpoints.indexOf(e) ||
								  (this.activatedBreakpoints.splice(
										this.activatedBreakpoints.indexOf(e),
										1
								  ),
								  this.activatedBreakpoints.sort(Wm),
								  this.updateStyles()));
					}
					init(t, e, n, r, s = []) {
						ig(this.updateMap, t, e, n),
							ig(this.clearMap, t, e, r),
							this.buildElementKeyMap(t, e),
							this.watchExtraTriggers(t, e, s);
					}
					getValue(t, e, n) {
						const r = this.elementMap.get(t);
						if (r) {
							const t =
								void 0 !== n
									? r.get(n)
									: this.getActivatedValues(r, e);
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
					setValue(t, e, n, r) {
						let s = this.elementMap.get(t);
						if (s) {
							const i = (s.get(r) || new Map()).set(e, n);
							s.set(r, i), this.elementMap.set(t, s);
						} else
							(s = new Map().set(r, new Map().set(e, n))),
								this.elementMap.set(t, s);
						const i = this.getValue(t, e);
						void 0 !== i && this.updateElement(t, e, i);
					}
					trackValue(t, e) {
						return this.subject
							.asObservable()
							.pipe(Mu(n => n.element === t && n.key === e));
					}
					updateStyles() {
						this.elementMap.forEach((t, e) => {
							const n = new Set(this.elementKeyMap.get(e));
							let r = this.getActivatedValues(t);
							r &&
								r.forEach((t, r) => {
									this.updateElement(e, r, t), n.delete(r);
								}),
								n.forEach(n => {
									if (
										((r = this.getActivatedValues(t, n)), r)
									) {
										const t = r.get(n);
										this.updateElement(e, n, t);
									} else this.clearElement(e, n);
								});
						});
					}
					clearElement(t, e) {
						const n = this.clearMap.get(t);
						if (n) {
							const r = n.get(e);
							r &&
								(r(),
								this.subject.next({
									element: t,
									key: e,
									value: '',
								}));
						}
					}
					updateElement(t, e, n) {
						const r = this.updateMap.get(t);
						if (r) {
							const s = r.get(e);
							s &&
								(s(n),
								this.subject.next({
									element: t,
									key: e,
									value: n,
								}));
						}
					}
					releaseElement(t) {
						const e = this.watcherMap.get(t);
						e &&
							(e.forEach(t => t.unsubscribe()),
							this.watcherMap.delete(t));
						const n = this.elementMap.get(t);
						n &&
							(n.forEach((t, e) => n.delete(e)),
							this.elementMap.delete(t));
					}
					triggerUpdate(t, e) {
						const n = this.elementMap.get(t);
						if (n) {
							const r = this.getActivatedValues(n, e);
							r &&
								(e
									? this.updateElement(t, e, r.get(e))
									: r.forEach((e, n) =>
											this.updateElement(t, n, e)
									  ));
						}
					}
					buildElementKeyMap(t, e) {
						let n = this.elementKeyMap.get(t);
						n || ((n = new Set()), this.elementKeyMap.set(t, n)),
							n.add(e);
					}
					watchExtraTriggers(t, e, n) {
						if (n && n.length) {
							let r = this.watcherMap.get(t);
							if (
								(r ||
									((r = new Map()),
									this.watcherMap.set(t, r)),
								!r.get(e))
							) {
								const s = q(...n).subscribe(() => {
									const n = this.getValue(t, e);
									this.updateElement(t, e, n);
								});
								r.set(e, s);
							}
						}
					}
					findByQuery(t) {
						return this.breakpoints.findByQuery(t);
					}
					getActivatedValues(t, e) {
						for (
							let r = 0;
							r < this.activatedBreakpoints.length;
							r++
						) {
							const n = t.get(this.activatedBreakpoints[r].alias);
							if (
								n &&
								(void 0 === e || (n.has(e) && null != n.get(e)))
							)
								return n;
						}
						const n = t.get('');
						return void 0 === e || (n && n.has(e)) ? n : void 0;
					}
					observeActivations() {
						const t = this.breakpoints.items.map(t => t.mediaQuery);
						this.matchMedia
							.observe(this.hook.withPrintQuery(t))
							.pipe(
								Cu(this.hook.interceptEvents(this)),
								Mu(this.hook.blockPropagation())
							)
							.subscribe(this.onMediaChange.bind(this));
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Gt(Gm), Gt(Km), Gt(Jm));
					}),
					(t.ɵprov = ut({
						factory: function () {
							return new t(Gt(Gm), Gt(Km), Gt(Jm));
						},
						token: t,
						providedIn: 'root',
					})),
					t
				);
			})();
			function ig(t, e, n, r) {
				if (void 0 !== r) {
					let s = t.get(e);
					s || ((s = new Map()), t.set(e, s)), s.set(n, r);
				}
			}
			let og = (() => {
				class t {}
				return (
					(t.ɵmod = _e({ type: t })),
					(t.ɵinj = ht({
						factory: function (e) {
							return new (e || t)();
						},
						imports: [[Sm]],
					})),
					t
				);
			})();
			const ag = 'inline',
				lg = ['row', 'column', 'row-reverse', 'column-reverse'];
			function cg(t) {
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
			let ug = (() => {
				class t extends rg {
					buildStyles(t) {
						return (function (t) {
							let [e, n, r] = (function (t) {
								t = t ? t.toLowerCase() : '';
								let [e, n, r] = t.split(' ');
								return (
									lg.find(t => t === e) || (e = lg[0]),
									n === ag &&
										((n = r !== ag ? r : ''), (r = ag)),
									[e, cg(n), !!r]
								);
							})(t);
							return (function (t, e = null, n = !1) {
								return {
									display: n ? 'inline-flex' : 'flex',
									'box-sizing': 'border-box',
									'flex-direction': t,
									'flex-wrap': e || null,
								};
							})(e, n, r);
						})(t);
					}
				}
				(t.ɵfac = function (n) {
					return e(n || t);
				}),
					(t.ɵprov = ut({
						factory: function () {
							return new t();
						},
						token: t,
						providedIn: 'root',
					}));
				const e = ur(t);
				return t;
			})();
			const hg = [
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
			let dg = (() => {
					class t extends Nm {
						constructor(t, e, n, r) {
							super(t, n, e, r),
								(this.DIRECTIVE_KEY = 'layout'),
								(this.styleCache = pg),
								this.init();
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(mo(ha), mo(ng), mo(ug), mo(sg));
						}),
						(t.ɵdir = ve({ type: t, features: [no] })),
						t
					);
				})(),
				fg = (() => {
					class t extends dg {
						constructor() {
							super(...arguments), (this.inputs = hg);
						}
					}
					(t.ɵfac = function (n) {
						return e(n || t);
					}),
						(t.ɵdir = ve({
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
							features: [no],
						}));
					const e = ur(t);
					return t;
				})();
			const pg = new Map(),
				mg = {
					margin: 0,
					width: '100%',
					height: '100%',
					'min-width': '100%',
					'min-height': '100%',
				};
			let gg = (() => {
					class t extends rg {
						buildStyles(t) {
							return mg;
						}
					}
					(t.ɵfac = function (n) {
						return e(n || t);
					}),
						(t.ɵprov = ut({
							factory: function () {
								return new t();
							},
							token: t,
							providedIn: 'root',
						}));
					const e = ur(t);
					return t;
				})(),
				yg = (() => {
					class t extends Nm {
						constructor(t, e, n, r) {
							super(t, n, e, r),
								(this.styleCache = _g),
								this.addStyles('');
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(mo(ha), mo(ng), mo(gg), mo(sg));
						}),
						(t.ɵdir = ve({
							type: t,
							selectors: [
								['', 'fxFill', ''],
								['', 'fxFlexFill', ''],
							],
							features: [no],
						})),
						t
					);
				})();
			const _g = new Map();
			let bg = (() => {
					class t {}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[Sm, uh]],
						})),
						t
					);
				})(),
				vg = (() => {
					class t {}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[Sm]],
						})),
						t
					);
				})(),
				wg = (() => {
					class t {
						constructor(t, e) {
							Lc(e) &&
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
											{
												provide: km,
												useValue: Object.assign(
													Object.assign({}, Cm),
													e
												),
											},
											{
												provide: Am,
												useValue: n,
												multi: !0,
											},
											{ provide: Tm, useValue: !0 },
									  ]
									: [
											{
												provide: km,
												useValue: Object.assign(
													Object.assign({}, Cm),
													e
												),
											},
											{
												provide: Am,
												useValue: n,
												multi: !0,
											},
									  ],
							};
						}
					}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)(Gt(Tm), Gt(gl));
							},
							imports: [[bg, og, vg], bg, og, vg],
						})),
						t
					);
				})();
			class Sg {
				constructor(t, e) {
					(this.compare = t), (this.keySelector = e);
				}
				call(t, e) {
					return e.subscribe(
						new Eg(t, this.compare, this.keySelector)
					);
				}
			}
			class Eg extends p {
				constructor(t, e, n) {
					super(t),
						(this.keySelector = n),
						(this.hasKey = !1),
						'function' == typeof e && (this.compare = e);
				}
				compare(t, e) {
					return t === e;
				}
				_next(t) {
					let e;
					try {
						const { keySelector: n } = this;
						e = n ? n(t) : t;
					} catch (r) {
						return this.destination.error(r);
					}
					let n = !1;
					if (this.hasKey)
						try {
							const { compare: t } = this;
							n = t(this.key, e);
						} catch (r) {
							return this.destination.error(r);
						}
					else this.hasKey = !0;
					n || ((this.key = e), this.destination.next(t));
				}
			}
			class xg {
				constructor(t) {
					this.durationSelector = t;
				}
				call(t, e) {
					return e.subscribe(new Cg(t, this.durationSelector));
				}
			}
			class Cg extends j {
				constructor(t, e) {
					super(t), (this.durationSelector = e), (this.hasValue = !1);
				}
				_next(t) {
					if (
						((this.value = t),
						(this.hasValue = !0),
						!this.throttled)
					) {
						let n;
						try {
							const { durationSelector: e } = this;
							n = e(t);
						} catch (e) {
							return this.destination.error(e);
						}
						const r = z(n, new F(this));
						!r || r.closed
							? this.clearThrottle()
							: this.add((this.throttled = r));
					}
				}
				clearThrottle() {
					const { value: t, hasValue: e, throttled: n } = this;
					n &&
						(this.remove(n),
						(this.throttled = void 0),
						n.unsubscribe()),
						e &&
							((this.value = void 0),
							(this.hasValue = !1),
							this.destination.next(t));
				}
				notifyNext() {
					this.clearThrottle();
				}
				notifyComplete() {
					this.clearThrottle();
				}
			}
			function kg(t) {
				return !l(t) && t - parseFloat(t) + 1 >= 0;
			}
			function Tg(t) {
				const { index: e, period: n, subscriber: r } = t;
				if ((r.next(e), !r.closed)) {
					if (-1 === n) return r.complete();
					(t.index = e + 1), this.schedule(t, n);
				}
			}
			function Ag(t, e = Pu) {
				return (
					(n = () =>
						(function (t = 0, e, n) {
							let r = -1;
							return (
								kg(e)
									? (r = Number(e) < 1 ? 1 : Number(e))
									: C(e) && (n = e),
								C(n) || (n = Pu),
								new _(e => {
									const s = kg(t) ? t : +t - n.now();
									return n.schedule(Tg, s, {
										index: 0,
										period: r,
										subscriber: e,
									});
								})
							);
						})(t, e)),
					function (t) {
						return t.lift(new xg(n));
					}
				);
				var n;
			}
			let Ig = (() => {
					class t {
						constructor(t, e, n) {
							(this._ngZone = t),
								(this._platform = e),
								(this._scrolled = new E()),
								(this._globalSubscription = null),
								(this._scrolledCount = 0),
								(this.scrollContainers = new Map()),
								(this._document = n);
						}
						register(t) {
							this.scrollContainers.has(t) ||
								this.scrollContainers.set(
									t,
									t
										.elementScrolled()
										.subscribe(() => this._scrolled.next(t))
								);
						}
						deregister(t) {
							const e = this.scrollContainers.get(t);
							e &&
								(e.unsubscribe(),
								this.scrollContainers.delete(t));
						}
						scrolled(t = 20) {
							return this._platform.isBrowser
								? new _(e => {
										this._globalSubscription ||
											this._addGlobalListener();
										const n =
											t > 0
												? this._scrolled
														.pipe(Ag(t))
														.subscribe(e)
												: this._scrolled.subscribe(e);
										return (
											this._scrolledCount++,
											() => {
												n.unsubscribe(),
													this._scrolledCount--,
													this._scrolledCount ||
														this._removeGlobalListener();
											}
										);
								  })
								: Eu();
						}
						ngOnDestroy() {
							this._removeGlobalListener(),
								this.scrollContainers.forEach((t, e) =>
									this.deregister(e)
								),
								this._scrolled.complete();
						}
						ancestorScrolled(t, e) {
							const n = this.getAncestorScrollContainers(t);
							return this.scrolled(e).pipe(
								Mu(t => !t || n.indexOf(t) > -1)
							);
						}
						getAncestorScrollContainers(t) {
							const e = [];
							return (
								this.scrollContainers.forEach((n, r) => {
									this._scrollableContainsElement(r, t) &&
										e.push(r);
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
								r = t.getElementRef().nativeElement;
							do {
								if (n == r) return !0;
							} while ((n = n.parentElement));
							return !1;
						}
						_addGlobalListener() {
							this._globalSubscription = this._ngZone.runOutsideAngular(
								() =>
									gm(
										this._getWindow().document,
										'scroll'
									).subscribe(() => this._scrolled.next())
							);
						}
						_removeGlobalListener() {
							this._globalSubscription &&
								(this._globalSubscription.unsubscribe(),
								(this._globalSubscription = null));
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Gt(Rl), Gt(bu), Gt(lc, 8));
						}),
						(t.ɵprov = ut({
							factory: function () {
								return new t(Gt(Rl), Gt(bu), Gt(lc, 8));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				Og = (() => {
					class t {
						constructor(t, e, n, r) {
							(this.elementRef = t),
								(this.scrollDispatcher = e),
								(this.ngZone = n),
								(this.dir = r),
								(this._destroyed = new E()),
								(this._elementScrolled = new _(t =>
									this.ngZone.runOutsideAngular(() =>
										gm(
											this.elementRef.nativeElement,
											'scroll'
										)
											.pipe(um(this._destroyed))
											.subscribe(t)
									)
								));
						}
						ngOnInit() {
							this.scrollDispatcher.register(this);
						}
						ngOnDestroy() {
							this.scrollDispatcher.deregister(this),
								this._destroyed.next(),
								this._destroyed.complete();
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
								null == t.right &&
									(t.right = n ? t.start : t.end),
								null != t.bottom &&
									(t.top =
										e.scrollHeight -
										e.clientHeight -
										t.bottom),
								n && 0 != Su()
									? (null != t.left &&
											(t.right =
												e.scrollWidth -
												e.clientWidth -
												t.left),
									  2 == Su()
											? (t.left = t.right)
											: 1 == Su() &&
											  (t.left = t.right
													? -t.right
													: t.right))
									: null != t.right &&
									  (t.left =
											e.scrollWidth -
											e.clientWidth -
											t.right),
								this._applyScrollToOptions(t);
						}
						_applyScrollToOptions(t) {
							const e = this.elementRef.nativeElement;
							!(function () {
								if (null == yu)
									if (
										(('object' == typeof document &&
											document) ||
											(yu = !1),
										'scrollBehavior' in
											document.documentElement.style)
									)
										yu = !0;
									else {
										const t = Element.prototype.scrollTo;
										yu =
											!!t &&
											!/\{\s*\[native code\]\s*\}/.test(
												t.toString()
											);
									}
								return yu;
							})()
								? (null != t.top && (e.scrollTop = t.top),
								  null != t.left && (e.scrollLeft = t.left))
								: e.scrollTo(t);
						}
						measureScrollOffset(t) {
							const e = 'left',
								n = 'right',
								r = this.elementRef.nativeElement;
							if ('top' == t) return r.scrollTop;
							if ('bottom' == t)
								return (
									r.scrollHeight -
									r.clientHeight -
									r.scrollTop
								);
							const s = this.dir && 'rtl' == this.dir.value;
							return (
								'start' == t
									? (t = s ? n : e)
									: 'end' == t && (t = s ? e : n),
								s && 2 == Su()
									? t == e
										? r.scrollWidth -
										  r.clientWidth -
										  r.scrollLeft
										: r.scrollLeft
									: s && 1 == Su()
									? t == e
										? r.scrollLeft +
										  r.scrollWidth -
										  r.clientWidth
										: -r.scrollLeft
									: t == e
									? r.scrollLeft
									: r.scrollWidth -
									  r.clientWidth -
									  r.scrollLeft
							);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(
								mo(ha),
								mo(Ig),
								mo(Rl),
								mo(ch, 8)
							);
						}),
						(t.ɵdir = ve({
							type: t,
							selectors: [
								['', 'cdk-scrollable', ''],
								['', 'cdkScrollable', ''],
							],
						})),
						t
					);
				})(),
				Rg = (() => {
					class t {
						constructor(t, e, n) {
							(this._platform = t),
								(this._change = new E()),
								(this._changeListener = t => {
									this._change.next(t);
								}),
								(this._document = n),
								e.runOutsideAngular(() => {
									if (t.isBrowser) {
										const t = this._getWindow();
										t.addEventListener(
											'resize',
											this._changeListener
										),
											t.addEventListener(
												'orientationchange',
												this._changeListener
											);
									}
									this.change().subscribe(() =>
										this._updateViewportSize()
									);
								});
						}
						ngOnDestroy() {
							if (this._platform.isBrowser) {
								const t = this._getWindow();
								t.removeEventListener(
									'resize',
									this._changeListener
								),
									t.removeEventListener(
										'orientationchange',
										this._changeListener
									);
							}
							this._change.complete();
						}
						getViewportSize() {
							this._viewportSize || this._updateViewportSize();
							const t = {
								width: this._viewportSize.width,
								height: this._viewportSize.height,
							};
							return (
								this._platform.isBrowser ||
									(this._viewportSize = null),
								t
							);
						}
						getViewportRect() {
							const t = this.getViewportScrollPosition(),
								{
									width: e,
									height: n,
								} = this.getViewportSize();
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
							if (!this._platform.isBrowser)
								return { top: 0, left: 0 };
							const t = this._getDocument(),
								e = this._getWindow(),
								n = t.documentElement,
								r = n.getBoundingClientRect();
							return {
								top:
									-r.top ||
									t.body.scrollTop ||
									e.scrollY ||
									n.scrollTop ||
									0,
								left:
									-r.left ||
									t.body.scrollLeft ||
									e.scrollX ||
									n.scrollLeft ||
									0,
							};
						}
						change(t = 20) {
							return t > 0
								? this._change.pipe(Ag(t))
								: this._change;
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
							return new (e || t)(Gt(bu), Gt(Rl), Gt(lc, 8));
						}),
						(t.ɵprov = ut({
							factory: function () {
								return new t(Gt(bu), Gt(Rl), Gt(lc, 8));
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				Pg = (() => {
					class t {}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)();
							},
						})),
						t
					);
				})();
			function Ng(t) {
				return e => e.lift(new Lg(t));
			}
			class Lg {
				constructor(t) {
					this.value = t;
				}
				call(t, e) {
					return e.subscribe(new Dg(t, this.value));
				}
			}
			class Dg extends p {
				constructor(t, e) {
					super(t), (this.value = e);
				}
				_next(t) {
					this.destination.next(this.value);
				}
			}
			const Mg = ['*'];
			function Fg(t, e) {
				if (1 & t) {
					const t = So();
					bo(0, 'div', 2),
						xo('click', function () {
							return rn(t), Io()._onBackdropClicked();
						}),
						vo();
				}
				2 & t && Fo('mat-drawer-shown', Io()._isShowingBackdrop());
			}
			function jg(t, e) {
				1 & t && (bo(0, 'mat-drawer-content'), Po(1, 2), vo());
			}
			const zg = [[['mat-drawer']], [['mat-drawer-content']], '*'],
				Bg = ['mat-drawer', 'mat-drawer-content', '*'];
			function Ug(t, e) {
				if (1 & t) {
					const t = So();
					bo(0, 'div', 2),
						xo('click', function () {
							return rn(t), Io()._onBackdropClicked();
						}),
						vo();
				}
				2 & t && Fo('mat-drawer-shown', Io()._isShowingBackdrop());
			}
			function Vg(t, e) {
				1 & t && (bo(0, 'mat-sidenav-content', 3), Po(1, 2), vo());
			}
			const Hg = [[['mat-sidenav']], [['mat-sidenav-content']], '*'],
				$g = ['mat-sidenav', 'mat-sidenav-content', '*'],
				qg =
					'.mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer{transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}\n',
				Wg = {
					transformDrawer: yh('transform', [
						wh(
							'open, open-instant',
							vh({ transform: 'none', visibility: 'visible' })
						),
						wh(
							'void',
							vh({ 'box-shadow': 'none', visibility: 'hidden' })
						),
						Sh('void => open-instant', _h('0ms')),
						Sh(
							'void <=> open, open-instant => void',
							_h('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
						),
					]),
				},
				Qg = new jt('MAT_DRAWER_DEFAULT_AUTOSIZE', {
					providedIn: 'root',
					factory: function () {
						return !1;
					},
				}),
				Kg = new jt('MAT_DRAWER_CONTAINER');
			let Gg = (() => {
					class t extends Og {
						constructor(t, e, n, r, s) {
							super(n, r, s),
								(this._changeDetectorRef = t),
								(this._container = e);
						}
						ngAfterContentInit() {
							this._container._contentMarginChanges.subscribe(
								() => {
									this._changeDetectorRef.markForCheck();
								}
							);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(
								mo(Di),
								mo(Et(() => Yg)),
								mo(ha),
								mo(Ig),
								mo(Rl)
							);
						}),
						(t.ɵcmp = pe({
							type: t,
							selectors: [['mat-drawer-content']],
							hostAttrs: [1, 'mat-drawer-content'],
							hostVars: 4,
							hostBindings: function (t, e) {
								2 & t &&
									Mo(
										'margin-left',
										e._container._contentMargins.left,
										'px'
									)(
										'margin-right',
										e._container._contentMargins.right,
										'px'
									);
							},
							features: [no],
							ngContentSelectors: Mg,
							decls: 1,
							vars: 0,
							template: function (t, e) {
								1 & t && (Ro(), Po(0));
							},
							encapsulation: 2,
							changeDetection: 0,
						})),
						t
					);
				})(),
				Zg = (() => {
					class t {
						constructor(t, e, n, r, s, i, o) {
							(this._elementRef = t),
								(this._focusTrapFactory = e),
								(this._focusMonitor = n),
								(this._platform = r),
								(this._ngZone = s),
								(this._doc = i),
								(this._container = o),
								(this._elementFocusedBeforeDrawerWasOpened = null),
								(this._enableAnimations = !1),
								(this._position = 'start'),
								(this._mode = 'over'),
								(this._disableClose = !1),
								(this._opened = !1),
								(this._animationStarted = new E()),
								(this._animationEnd = new E()),
								(this._animationState = 'void'),
								(this.openedChange = new Wa(!0)),
								(this._openedStream = this.openedChange.pipe(
									Mu(t => t),
									k(() => {})
								)),
								(this.openedStart = this._animationStarted.pipe(
									Mu(
										t =>
											t.fromState !== t.toState &&
											0 === t.toState.indexOf('open')
									),
									Ng(void 0)
								)),
								(this._closedStream = this.openedChange.pipe(
									Mu(t => !t),
									k(() => {})
								)),
								(this.closedStart = this._animationStarted.pipe(
									Mu(
										t =>
											t.fromState !== t.toState &&
											'void' === t.toState
									),
									Ng(void 0)
								)),
								(this._destroyed = new E()),
								(this.onPositionChanged = new Wa()),
								(this._modeChanged = new E()),
								this.openedChange.subscribe(t => {
									t
										? (this._doc &&
												(this._elementFocusedBeforeDrawerWasOpened = this._doc.activeElement),
										  this._takeFocus())
										: this._isFocusWithinDrawer() &&
										  this._restoreFocus();
								}),
								this._ngZone.runOutsideAngular(() => {
									gm(
										this._elementRef.nativeElement,
										'keydown'
									)
										.pipe(
											Mu(
												t =>
													27 === t.keyCode &&
													!this.disableClose &&
													!(function (t, ...e) {
														return e.length
															? e.some(e => t[e])
															: t.altKey ||
																	t.shiftKey ||
																	t.ctrlKey ||
																	t.metaKey;
													})(t)
											),
											um(this._destroyed)
										)
										.subscribe(t =>
											this._ngZone.run(() => {
												this.close(),
													t.stopPropagation(),
													t.preventDefault();
											})
										);
								}),
								this._animationEnd
									.pipe(
										(function (t, e) {
											return e =>
												e.lift(new Sg(t, undefined));
										})(
											(t, e) =>
												t.fromState === e.fromState &&
												t.toState === e.toState
										)
									)
									.subscribe(t => {
										const { fromState: e, toState: n } = t;
										((0 === n.indexOf('open') &&
											'void' === e) ||
											('void' === n &&
												0 === e.indexOf('open'))) &&
											this.openedChange.emit(
												this._opened
											);
									});
						}
						get position() {
							return this._position;
						}
						set position(t) {
							(t = 'end' === t ? 'end' : 'start') !=
								this._position &&
								((this._position = t),
								this.onPositionChanged.emit());
						}
						get mode() {
							return this._mode;
						}
						set mode(t) {
							(this._mode = t),
								this._updateFocusTrapState(),
								this._modeChanged.next();
						}
						get disableClose() {
							return this._disableClose;
						}
						set disableClose(t) {
							this._disableClose = qu(t);
						}
						get autoFocus() {
							const t = this._autoFocus;
							return null == t ? 'side' !== this.mode : t;
						}
						set autoFocus(t) {
							this._autoFocus = qu(t);
						}
						get opened() {
							return this._opened;
						}
						set opened(t) {
							this.toggle(qu(t));
						}
						_takeFocus() {
							this.autoFocus &&
								this._focusTrap &&
								this._focusTrap
									.focusInitialElementWhenReady()
									.then(t => {
										t ||
											'function' !=
												typeof this._elementRef
													.nativeElement.focus ||
											this._elementRef.nativeElement.focus();
									});
						}
						_restoreFocus() {
							this.autoFocus &&
								(this._elementFocusedBeforeDrawerWasOpened
									? this._focusMonitor.focusVia(
											this
												._elementFocusedBeforeDrawerWasOpened,
											this._openedVia
									  )
									: this._elementRef.nativeElement.blur(),
								(this._elementFocusedBeforeDrawerWasOpened = null),
								(this._openedVia = null));
						}
						_isFocusWithinDrawer() {
							var t;
							const e =
								null === (t = this._doc) || void 0 === t
									? void 0
									: t.activeElement;
							return (
								!!e &&
								this._elementRef.nativeElement.contains(e)
							);
						}
						ngAfterContentInit() {
							(this._focusTrap = this._focusTrapFactory.create(
								this._elementRef.nativeElement
							)),
								this._updateFocusTrapState();
						}
						ngAfterContentChecked() {
							this._platform.isBrowser &&
								(this._enableAnimations = !0);
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
							return this._setOpen(
								t,
								!t && this._isFocusWithinDrawer(),
								e
							);
						}
						_setOpen(t, e, n = 'program') {
							return (
								(this._opened = t),
								t
									? ((this._animationState = this
											._enableAnimations
											? 'open'
											: 'open-instant'),
									  (this._openedVia = n))
									: ((this._animationState = 'void'),
									  e && this._restoreFocus()),
								this._updateFocusTrapState(),
								new Promise(t => {
									this.openedChange
										.pipe(Vu(1))
										.subscribe(e =>
											t(e ? 'open' : 'close')
										);
								})
							);
						}
						_getWidth() {
							return (
								(this._elementRef.nativeElement &&
									this._elementRef.nativeElement
										.offsetWidth) ||
								0
							);
						}
						_updateFocusTrapState() {
							this._focusTrap &&
								(this._focusTrap.enabled =
									this.opened && 'side' !== this.mode);
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
							return new (e || t)(
								mo(ha),
								mo(Xu),
								mo(nh),
								mo(bu),
								mo(Rl),
								mo(lc, 8),
								mo(Kg, 8)
							);
						}),
						(t.ɵcmp = pe({
							type: t,
							selectors: [['mat-drawer']],
							hostAttrs: ['tabIndex', '-1', 1, 'mat-drawer'],
							hostVars: 12,
							hostBindings: function (t, e) {
								1 & t &&
									Co('@transform.start', function (t) {
										return e._animationStartListener(t);
									})('@transform.done', function (t) {
										return e._animationDoneListener(t);
									}),
									2 & t &&
										(fo('align', null),
										qo('@transform', e._animationState),
										Fo(
											'mat-drawer-end',
											'end' === e.position
										)('mat-drawer-over', 'over' === e.mode)(
											'mat-drawer-push',
											'push' === e.mode
										)('mat-drawer-side', 'side' === e.mode)(
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
							ngContentSelectors: Mg,
							decls: 2,
							vars: 0,
							consts: [[1, 'mat-drawer-inner-container']],
							template: function (t, e) {
								1 & t && (Ro(), bo(0, 'div', 0), Po(1), vo());
							},
							encapsulation: 2,
							data: { animation: [Wg.transformDrawer] },
							changeDetection: 0,
						})),
						t
					);
				})(),
				Yg = (() => {
					class t {
						constructor(t, e, n, r, s, i = !1, o) {
							(this._dir = t),
								(this._element = e),
								(this._ngZone = n),
								(this._changeDetectorRef = r),
								(this._animationMode = o),
								(this._drawers = new Ka()),
								(this.backdropClick = new Wa()),
								(this._destroyed = new E()),
								(this._doCheckSubject = new E()),
								(this._contentMargins = {
									left: null,
									right: null,
								}),
								(this._contentMarginChanges = new E()),
								t &&
									t.change
										.pipe(um(this._destroyed))
										.subscribe(() => {
											this._validateDrawers(),
												this.updateContentMargins();
										}),
								s
									.change()
									.pipe(um(this._destroyed))
									.subscribe(() =>
										this.updateContentMargins()
									),
								(this._autosize = i);
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
							this._autosize = qu(t);
						}
						get hasBackdrop() {
							return null == this._backdropOverride
								? !this._start ||
										'side' !== this._start.mode ||
										!this._end ||
										'side' !== this._end.mode
								: this._backdropOverride;
						}
						set hasBackdrop(t) {
							this._backdropOverride = null == t ? null : qu(t);
						}
						get scrollable() {
							return this._userContent || this._content;
						}
						ngAfterContentInit() {
							this._allDrawers.changes
								.pipe(ph(this._allDrawers), um(this._destroyed))
								.subscribe(t => {
									this._drawers.reset(
										t.filter(
											t =>
												!t._container ||
												t._container === this
										)
									),
										this._drawers.notifyOnChanges();
								}),
								this._drawers.changes
									.pipe(ph(null))
									.subscribe(() => {
										this._validateDrawers(),
											this._drawers.forEach(t => {
												this._watchDrawerToggle(t),
													this._watchDrawerPosition(
														t
													),
													this._watchDrawerMode(t);
											}),
											(!this._drawers.length ||
												this._isDrawerOpen(
													this._start
												) ||
												this._isDrawerOpen(
													this._end
												)) &&
												this.updateContentMargins(),
											this._changeDetectorRef.markForCheck();
									}),
								this._ngZone.runOutsideAngular(() => {
									this._doCheckSubject
										.pipe(
											(function (t, e = Pu) {
												return n =>
													n.lift(new Nu(t, e));
											})(10),
											um(this._destroyed)
										)
										.subscribe(() =>
											this.updateContentMargins()
										);
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
								if ('side' == this._left.mode)
									t += this._left._getWidth();
								else if ('push' == this._left.mode) {
									const n = this._left._getWidth();
									(t += n), (e -= n);
								}
							if (this._right && this._right.opened)
								if ('side' == this._right.mode)
									e += this._right._getWidth();
								else if ('push' == this._right.mode) {
									const n = this._right._getWidth();
									(e += n), (t -= n);
								}
							(t = t || null),
								(e = e || null),
								(t === this._contentMargins.left &&
									e === this._contentMargins.right) ||
									((this._contentMargins = {
										left: t,
										right: e,
									}),
									this._ngZone.run(() =>
										this._contentMarginChanges.next(
											this._contentMargins
										)
									));
						}
						ngDoCheck() {
							this._autosize &&
								this._isPushed() &&
								this._ngZone.runOutsideAngular(() =>
									this._doCheckSubject.next()
								);
						}
						_watchDrawerToggle(t) {
							t._animationStarted
								.pipe(
									Mu(t => t.fromState !== t.toState),
									um(this._drawers.changes)
								)
								.subscribe(t => {
									'open-instant' !== t.toState &&
										'NoopAnimations' !==
											this._animationMode &&
										this._element.nativeElement.classList.add(
											'mat-drawer-transition'
										),
										this.updateContentMargins(),
										this._changeDetectorRef.markForCheck();
								}),
								'side' !== t.mode &&
									t.openedChange
										.pipe(um(this._drawers.changes))
										.subscribe(() =>
											this._setContainerClass(t.opened)
										);
						}
						_watchDrawerPosition(t) {
							t &&
								t.onPositionChanged
									.pipe(um(this._drawers.changes))
									.subscribe(() => {
										this._ngZone.onMicrotaskEmpty
											.pipe(Vu(1))
											.subscribe(() => {
												this._validateDrawers();
											});
									});
						}
						_watchDrawerMode(t) {
							t &&
								t._modeChanged
									.pipe(
										um(
											q(
												this._drawers.changes,
												this._destroyed
											)
										)
									)
									.subscribe(() => {
										this.updateContentMargins(),
											this._changeDetectorRef.markForCheck();
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
									'end' == t.position
										? (this._end = t)
										: (this._start = t);
								}),
								(this._right = this._left = null),
								this._dir && 'rtl' === this._dir.value
									? ((this._left = this._end),
									  (this._right = this._start))
									: ((this._left = this._start),
									  (this._right = this._end));
						}
						_isPushed() {
							return (
								(this._isDrawerOpen(this._start) &&
									'over' != this._start.mode) ||
								(this._isDrawerOpen(this._end) &&
									'over' != this._end.mode)
							);
						}
						_onBackdropClicked() {
							this.backdropClick.emit(),
								this._closeModalDrawersViaBackdrop();
						}
						_closeModalDrawersViaBackdrop() {
							[this._start, this._end]
								.filter(
									t =>
										t &&
										!t.disableClose &&
										this._canHaveBackdrop(t)
								)
								.forEach(t => t._closeViaBackdropClick());
						}
						_isShowingBackdrop() {
							return (
								(this._isDrawerOpen(this._start) &&
									this._canHaveBackdrop(this._start)) ||
								(this._isDrawerOpen(this._end) &&
									this._canHaveBackdrop(this._end))
							);
						}
						_canHaveBackdrop(t) {
							return (
								'side' !== t.mode || !!this._backdropOverride
							);
						}
						_isDrawerOpen(t) {
							return null != t && t.opened;
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(
								mo(ch, 8),
								mo(ha),
								mo(Rl),
								mo(Di),
								mo(Rg),
								mo(Qg),
								mo(Zf, 8)
							);
						}),
						(t.ɵcmp = pe({
							type: t,
							selectors: [['mat-drawer-container']],
							contentQueries: function (t, e, n) {
								var r;
								1 & t && (il(n, Gg, !0), il(n, Zg, !0)),
									2 & t &&
										(rl((r = ol())) &&
											(e._content = r.first),
										rl((r = ol())) && (e._allDrawers = r));
							},
							viewQuery: function (t, e) {
								var n;
								1 & t && sl(Gg, !0),
									2 & t &&
										rl((n = ol())) &&
										(e._userContent = n.first);
							},
							hostAttrs: [1, 'mat-drawer-container'],
							hostVars: 2,
							hostBindings: function (t, e) {
								2 & t &&
									Fo(
										'mat-drawer-container-explicit-backdrop',
										e._backdropOverride
									);
							},
							inputs: {
								autosize: 'autosize',
								hasBackdrop: 'hasBackdrop',
							},
							outputs: { backdropClick: 'backdropClick' },
							exportAs: ['matDrawerContainer'],
							features: [aa([{ provide: Kg, useExisting: t }])],
							ngContentSelectors: Bg,
							decls: 4,
							vars: 2,
							consts: [
								[
									'class',
									'mat-drawer-backdrop',
									3,
									'mat-drawer-shown',
									'click',
									4,
									'ngIf',
								],
								[4, 'ngIf'],
								[1, 'mat-drawer-backdrop', 3, 'click'],
							],
							template: function (t, e) {
								1 & t &&
									(Ro(zg),
									po(0, Fg, 1, 2, 'div', 0),
									Po(1),
									Po(2, 1),
									po(3, jg, 2, 0, 'mat-drawer-content', 1)),
									2 & t &&
										(yo('ngIf', e.hasBackdrop),
										gs(3),
										yo('ngIf', !e._content));
							},
							directives: [Ic, Gg],
							styles: [qg],
							encapsulation: 2,
							changeDetection: 0,
						})),
						t
					);
				})(),
				Xg = (() => {
					class t extends Gg {
						constructor(t, e, n, r, s) {
							super(t, e, n, r, s);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(
								mo(Di),
								mo(Et(() => ey)),
								mo(ha),
								mo(Ig),
								mo(Rl)
							);
						}),
						(t.ɵcmp = pe({
							type: t,
							selectors: [['mat-sidenav-content']],
							hostAttrs: [
								1,
								'mat-drawer-content',
								'mat-sidenav-content',
							],
							hostVars: 4,
							hostBindings: function (t, e) {
								2 & t &&
									Mo(
										'margin-left',
										e._container._contentMargins.left,
										'px'
									)(
										'margin-right',
										e._container._contentMargins.right,
										'px'
									);
							},
							features: [no],
							ngContentSelectors: Mg,
							decls: 1,
							vars: 0,
							template: function (t, e) {
								1 & t && (Ro(), Po(0));
							},
							encapsulation: 2,
							changeDetection: 0,
						})),
						t
					);
				})(),
				Jg = (() => {
					class t extends Zg {
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
							this._fixedInViewport = qu(t);
						}
						get fixedTopGap() {
							return this._fixedTopGap;
						}
						set fixedTopGap(t) {
							this._fixedTopGap = Wu(t);
						}
						get fixedBottomGap() {
							return this._fixedBottomGap;
						}
						set fixedBottomGap(t) {
							this._fixedBottomGap = Wu(t);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return ty(e || t);
						}),
						(t.ɵcmp = pe({
							type: t,
							selectors: [['mat-sidenav']],
							hostAttrs: [
								'tabIndex',
								'-1',
								1,
								'mat-drawer',
								'mat-sidenav',
							],
							hostVars: 17,
							hostBindings: function (t, e) {
								2 & t &&
									(fo('align', null),
									Mo(
										'top',
										e.fixedInViewport
											? e.fixedTopGap
											: null,
										'px'
									)(
										'bottom',
										e.fixedInViewport
											? e.fixedBottomGap
											: null,
										'px'
									),
									Fo('mat-drawer-end', 'end' === e.position)(
										'mat-drawer-over',
										'over' === e.mode
									)('mat-drawer-push', 'push' === e.mode)(
										'mat-drawer-side',
										'side' === e.mode
									)('mat-drawer-opened', e.opened)(
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
							features: [no],
							ngContentSelectors: Mg,
							decls: 2,
							vars: 0,
							consts: [[1, 'mat-drawer-inner-container']],
							template: function (t, e) {
								1 & t && (Ro(), bo(0, 'div', 0), Po(1), vo());
							},
							encapsulation: 2,
							data: { animation: [Wg.transformDrawer] },
							changeDetection: 0,
						})),
						t
					);
				})();
			const ty = ur(Jg);
			let ey = (() => {
				class t extends Yg {}
				return (
					(t.ɵfac = function (e) {
						return ny(e || t);
					}),
					(t.ɵcmp = pe({
						type: t,
						selectors: [['mat-sidenav-container']],
						contentQueries: function (t, e, n) {
							var r;
							1 & t && (il(n, Xg, !0), il(n, Jg, !0)),
								2 & t &&
									(rl((r = ol())) && (e._content = r.first),
									rl((r = ol())) && (e._allDrawers = r));
						},
						hostAttrs: [
							1,
							'mat-drawer-container',
							'mat-sidenav-container',
						],
						hostVars: 2,
						hostBindings: function (t, e) {
							2 & t &&
								Fo(
									'mat-drawer-container-explicit-backdrop',
									e._backdropOverride
								);
						},
						exportAs: ['matSidenavContainer'],
						features: [aa([{ provide: Kg, useExisting: t }]), no],
						ngContentSelectors: $g,
						decls: 4,
						vars: 2,
						consts: [
							[
								'class',
								'mat-drawer-backdrop',
								3,
								'mat-drawer-shown',
								'click',
								4,
								'ngIf',
							],
							['cdkScrollable', '', 4, 'ngIf'],
							[1, 'mat-drawer-backdrop', 3, 'click'],
							['cdkScrollable', ''],
						],
						template: function (t, e) {
							1 & t &&
								(Ro(Hg),
								po(0, Ug, 1, 2, 'div', 0),
								Po(1),
								Po(2, 1),
								po(3, Vg, 2, 0, 'mat-sidenav-content', 1)),
								2 & t &&
									(yo('ngIf', e.hasBackdrop),
									gs(3),
									yo('ngIf', !e._content));
						},
						directives: [Ic, Xg, Og],
						styles: [qg],
						encapsulation: 2,
						changeDetection: 0,
					})),
					t
				);
			})();
			const ny = ur(ey);
			let ry = (() => {
				class t {}
				return (
					(t.ɵmod = _e({ type: t })),
					(t.ɵinj = ht({
						factory: function (e) {
							return new (e || t)();
						},
						imports: [[Pc, np, vu, Pg], Pg, np],
					})),
					t
				);
			})();
			var sy = {
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
				iy = {
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
			function oy(t) {
				return (oy =
					'function' == typeof Symbol &&
					'symbol' == typeof Symbol.iterator
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
			function ay(t, e, n) {
				return (
					e in t
						? Object.defineProperty(t, e, {
								value: n,
								enumerable: !0,
								configurable: !0,
								writable: !0,
						  })
						: (t[e] = n),
					t
				);
			}
			function ly(t) {
				for (var e = 1; e < arguments.length; e++) {
					var n = null != arguments[e] ? arguments[e] : {},
						r = Object.keys(n);
					'function' == typeof Object.getOwnPropertySymbols &&
						(r = r.concat(
							Object.getOwnPropertySymbols(n).filter(function (
								t
							) {
								return Object.getOwnPropertyDescriptor(n, t)
									.enumerable;
							})
						)),
						r.forEach(function (e) {
							ay(t, e, n[e]);
						});
				}
				return t;
			}
			function cy(t, e) {
				return (
					(function (t) {
						if (Array.isArray(t)) return t;
					})(t) ||
					(function (t, e) {
						var n = [],
							r = !0,
							s = !1,
							i = void 0;
						try {
							for (
								var o, a = t[Symbol.iterator]();
								!(r = (o = a.next()).done) &&
								(n.push(o.value), !e || n.length !== e);
								r = !0
							);
						} catch (l) {
							(s = !0), (i = l);
						} finally {
							try {
								r || null == a.return || a.return();
							} finally {
								if (s) throw i;
							}
						}
						return n;
					})(t, e) ||
					(function () {
						throw new TypeError(
							'Invalid attempt to destructure non-iterable instance'
						);
					})()
				);
			}
			var uy = {},
				hy = {};
			try {
				'undefined' != typeof window && (uy = window),
					'undefined' != typeof document && (hy = document),
					'undefined' != typeof MutationObserver && MutationObserver,
					'undefined' != typeof performance && performance;
			} catch ($w) {}
			var dy = (uy.navigator || {}).userAgent,
				fy = void 0 === dy ? '' : dy,
				py = uy,
				my = hy,
				gy =
					!!my.documentElement &&
					!!my.head &&
					'function' == typeof my.addEventListener &&
					'function' == typeof my.createElement,
				yy =
					(~fy.indexOf('MSIE') || fy.indexOf('Trident/'),
					'svg-inline--fa'),
				_y = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				by = _y.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
				vy = {
					GROUP: 'group',
					SWAP_OPACITY: 'swap-opacity',
					PRIMARY: 'primary',
					SECONDARY: 'secondary',
				},
				wy =
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
						vy.GROUP,
						vy.SWAP_OPACITY,
						vy.PRIMARY,
						vy.SECONDARY,
					]
						.concat(
							_y.map(function (t) {
								return ''.concat(t, 'x');
							})
						)
						.concat(
							by.map(function (t) {
								return 'w-'.concat(t);
							})
						),
					py.FontAwesomeConfig || {});
			my &&
				'function' == typeof my.querySelector &&
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
					var e = cy(t, 2),
						n = e[1],
						r = (function (t) {
							return (
								'' === t ||
								('false' !== t && ('true' === t || t))
							);
						})(
							(function (t) {
								var e = my.querySelector('script[' + t + ']');
								if (e) return e.getAttribute(t);
							})(e[0])
						);
					null != r && (wy[n] = r);
				});
			var Sy = ly(
				{},
				{
					familyPrefix: 'fa',
					replacementClass: yy,
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
				wy
			);
			Sy.autoReplaceSvg || (Sy.observeMutations = !1);
			var Ey = ly({}, Sy);
			py.FontAwesomeConfig = Ey;
			var xy = py || {};
			xy.___FONT_AWESOME___ || (xy.___FONT_AWESOME___ = {}),
				xy.___FONT_AWESOME___.styles ||
					(xy.___FONT_AWESOME___.styles = {}),
				xy.___FONT_AWESOME___.hooks ||
					(xy.___FONT_AWESOME___.hooks = {}),
				xy.___FONT_AWESOME___.shims ||
					(xy.___FONT_AWESOME___.shims = []);
			var Cy = xy.___FONT_AWESOME___,
				ky = [];
			gy &&
				((my.documentElement.doScroll
					? /^loaded|^c/
					: /^loaded|^i|^c/
				).test(my.readyState) ||
					my.addEventListener('DOMContentLoaded', function t() {
						my.removeEventListener('DOMContentLoaded', t),
							ky.map(function (t) {
								return t();
							});
					}));
			var Ty,
				Ay = 'pending',
				Iy = 'settled',
				Oy = 'fulfilled',
				Ry = 'rejected',
				Py = function () {},
				Ny =
					'undefined' != typeof global &&
					void 0 !== global.process &&
					'function' == typeof global.process.emit,
				Ly =
					'undefined' == typeof setImmediate
						? setTimeout
						: setImmediate,
				Dy = [];
			function My() {
				for (var t = 0; t < Dy.length; t++) Dy[t][0](Dy[t][1]);
				(Dy = []), (Ty = !1);
			}
			function Fy(t, e) {
				Dy.push([t, e]), Ty || ((Ty = !0), Ly(My, 0));
			}
			function jy(t) {
				var e = t.owner,
					n = e._state,
					r = e._data,
					s = t[n],
					i = t.then;
				if ('function' == typeof s) {
					n = Oy;
					try {
						r = s(r);
					} catch ($w) {
						Vy(i, $w);
					}
				}
				zy(i, r) || (n === Oy && By(i, r), n === Ry && Vy(i, r));
			}
			function zy(t, e) {
				var n;
				try {
					if (t === e)
						throw new TypeError(
							'A promises callback cannot return that same promise.'
						);
					if (e && ('function' == typeof e || 'object' === oy(e))) {
						var r = e.then;
						if ('function' == typeof r)
							return (
								r.call(
									e,
									function (r) {
										n ||
											((n = !0),
											e === r ? Uy(t, r) : By(t, r));
									},
									function (e) {
										n || ((n = !0), Vy(t, e));
									}
								),
								!0
							);
					}
				} catch ($w) {
					return n || Vy(t, $w), !0;
				}
				return !1;
			}
			function By(t, e) {
				(t !== e && zy(t, e)) || Uy(t, e);
			}
			function Uy(t, e) {
				t._state === Ay && ((t._state = Iy), (t._data = e), Fy($y, t));
			}
			function Vy(t, e) {
				t._state === Ay && ((t._state = Iy), (t._data = e), Fy(qy, t));
			}
			function Hy(t) {
				t._then = t._then.forEach(jy);
			}
			function $y(t) {
				(t._state = Oy), Hy(t);
			}
			function qy(t) {
				(t._state = Ry),
					Hy(t),
					!t._handled &&
						Ny &&
						global.process.emit('unhandledRejection', t._data, t);
			}
			function Wy(t) {
				global.process.emit('rejectionHandled', t);
			}
			function Qy(t) {
				if ('function' != typeof t)
					throw new TypeError(
						'Promise resolver ' + t + ' is not a function'
					);
				if (this instanceof Qy == 0)
					throw new TypeError(
						"Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
					);
				(this._then = []),
					(function (t, e) {
						function n(t) {
							Vy(e, t);
						}
						try {
							t(function (t) {
								By(e, t);
							}, n);
						} catch ($w) {
							n($w);
						}
					})(t, this);
			}
			(Qy.prototype = {
				constructor: Qy,
				_state: Ay,
				_then: null,
				_data: void 0,
				_handled: !1,
				then: function (t, e) {
					var n = {
						owner: this,
						then: new this.constructor(Py),
						fulfilled: t,
						rejected: e,
					};
					return (
						(!e && !t) ||
							this._handled ||
							((this._handled = !0),
							this._state === Ry && Ny && Fy(Wy, this)),
						this._state === Oy || this._state === Ry
							? Fy(jy, n)
							: this._then.push(n),
						n.then
					);
				},
				catch: function (t) {
					return this.then(null, t);
				},
			}),
				(Qy.all = function (t) {
					if (!Array.isArray(t))
						throw new TypeError(
							'You must pass an array to Promise.all().'
						);
					return new Qy(function (e, n) {
						var r = [],
							s = 0;
						function i(t) {
							return (
								s++,
								function (n) {
									(r[t] = n), --s || e(r);
								}
							);
						}
						for (var o, a = 0; a < t.length; a++)
							(o = t[a]) && 'function' == typeof o.then
								? o.then(i(a), n)
								: (r[a] = o);
						s || e(r);
					});
				}),
				(Qy.race = function (t) {
					if (!Array.isArray(t))
						throw new TypeError(
							'You must pass an array to Promise.race().'
						);
					return new Qy(function (e, n) {
						for (var r, s = 0; s < t.length; s++)
							(r = t[s]) && 'function' == typeof r.then
								? r.then(e, n)
								: e(r);
					});
				}),
				(Qy.resolve = function (t) {
					return t && 'object' === oy(t) && t.constructor === Qy
						? t
						: new Qy(function (e) {
								e(t);
						  });
				}),
				(Qy.reject = function (t) {
					return new Qy(function (e, n) {
						n(t);
					});
				});
			var Ky = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 };
			function Gy() {
				for (var t = 12, e = ''; t-- > 0; )
					e += '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'[
						(62 * Math.random()) | 0
					];
				return e;
			}
			function Zy(t) {
				return ''
					.concat(t)
					.replace(/&/g, '&amp;')
					.replace(/"/g, '&quot;')
					.replace(/'/g, '&#39;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;');
			}
			function Yy(t) {
				return Object.keys(t || {}).reduce(function (e, n) {
					return e + ''.concat(n, ': ').concat(t[n], ';');
				}, '');
			}
			function Xy(t) {
				return (
					t.size !== Ky.size ||
					t.x !== Ky.x ||
					t.y !== Ky.y ||
					t.rotate !== Ky.rotate ||
					t.flipX ||
					t.flipY
				);
			}
			function Jy(t) {
				var e = t.transform,
					n = t.iconWidth,
					r = {
						transform: 'translate('.concat(
							t.containerWidth / 2,
							' 256)'
						),
					},
					s = 'translate('
						.concat(32 * e.x, ', ')
						.concat(32 * e.y, ') '),
					i = 'scale('
						.concat((e.size / 16) * (e.flipX ? -1 : 1), ', ')
						.concat((e.size / 16) * (e.flipY ? -1 : 1), ') '),
					o = 'rotate('.concat(e.rotate, ' 0 0)');
				return {
					outer: r,
					inner: {
						transform: ''.concat(s, ' ').concat(i, ' ').concat(o),
					},
					path: {
						transform: 'translate('.concat((n / 2) * -1, ' -256)'),
					},
				};
			}
			var t_ = { x: 0, y: 0, width: '100%', height: '100%' };
			function e_(t) {
				var e =
					!(arguments.length > 1 && void 0 !== arguments[1]) ||
					arguments[1];
				return (
					t.attributes &&
						(t.attributes.fill || e) &&
						(t.attributes.fill = 'black'),
					t
				);
			}
			function n_(t) {
				var e = t.icons,
					n = e.main,
					r = e.mask,
					s = t.prefix,
					i = t.iconName,
					o = t.transform,
					a = t.symbol,
					l = t.title,
					c = t.maskId,
					u = t.titleId,
					h = t.extra,
					d = t.watchable,
					f = void 0 !== d && d,
					p = r.found ? r : n,
					m = p.width,
					g = p.height,
					y = 'fak' === s,
					_ = y ? '' : 'fa-w-'.concat(Math.ceil((m / g) * 16)),
					b = [
						Ey.replacementClass,
						i ? ''.concat(Ey.familyPrefix, '-').concat(i) : '',
						_,
					]
						.filter(function (t) {
							return -1 === h.classes.indexOf(t);
						})
						.filter(function (t) {
							return '' !== t || !!t;
						})
						.concat(h.classes)
						.join(' '),
					v = {
						children: [],
						attributes: ly({}, h.attributes, {
							'data-prefix': s,
							'data-icon': i,
							class: b,
							role: h.attributes.role || 'img',
							xmlns: 'http://www.w3.org/2000/svg',
							viewBox: '0 0 '.concat(m, ' ').concat(g),
						}),
					},
					w =
						y && !~h.classes.indexOf('fa-fw')
							? { width: ''.concat((m / g) * 16 * 0.0625, 'em') }
							: {};
				f && (v.attributes['data-fa-i2svg'] = ''),
					l &&
						v.children.push({
							tag: 'title',
							attributes: {
								id:
									v.attributes['aria-labelledby'] ||
									'title-'.concat(u || Gy()),
							},
							children: [l],
						});
				var S = ly({}, v, {
						prefix: s,
						iconName: i,
						main: n,
						mask: r,
						maskId: c,
						transform: o,
						symbol: a,
						styles: ly({}, w, h.styles),
					}),
					E =
						r.found && n.found
							? (function (t) {
									var e,
										n = t.children,
										r = t.attributes,
										s = t.main,
										i = t.mask,
										o = t.maskId,
										a = s.icon,
										l = i.icon,
										c = Jy({
											transform: t.transform,
											containerWidth: i.width,
											iconWidth: s.width,
										}),
										u = {
											tag: 'rect',
											attributes: ly({}, t_, {
												fill: 'white',
											}),
										},
										h = a.children
											? { children: a.children.map(e_) }
											: {},
										d = {
											tag: 'g',
											attributes: ly({}, c.inner),
											children: [
												e_(
													ly(
														{
															tag: a.tag,
															attributes: ly(
																{},
																a.attributes,
																c.path
															),
														},
														h
													)
												),
											],
										},
										f = {
											tag: 'g',
											attributes: ly({}, c.outer),
											children: [d],
										},
										p = 'mask-'.concat(o || Gy()),
										m = 'clip-'.concat(o || Gy()),
										g = {
											tag: 'mask',
											attributes: ly({}, t_, {
												id: p,
												maskUnits: 'userSpaceOnUse',
												maskContentUnits:
													'userSpaceOnUse',
											}),
											children: [u, f],
										},
										y = {
											tag: 'defs',
											children: [
												{
													tag: 'clipPath',
													attributes: { id: m },
													children:
														((e = l),
														'g' === e.tag
															? e.children
															: [e]),
												},
												g,
											],
										};
									return (
										n.push(y, {
											tag: 'rect',
											attributes: ly(
												{
													fill: 'currentColor',
													'clip-path': 'url(#'.concat(
														m,
														')'
													),
													mask: 'url(#'.concat(
														p,
														')'
													),
												},
												t_
											),
										}),
										{ children: n, attributes: r }
									);
							  })(S)
							: (function (t) {
									var e = t.children,
										n = t.attributes,
										r = t.main,
										s = t.transform,
										i = Yy(t.styles);
									if (
										(i.length > 0 && (n.style = i), Xy(s))
									) {
										var o = Jy({
											transform: s,
											containerWidth: r.width,
											iconWidth: r.width,
										});
										e.push({
											tag: 'g',
											attributes: ly({}, o.outer),
											children: [
												{
													tag: 'g',
													attributes: ly({}, o.inner),
													children: [
														{
															tag: r.icon.tag,
															children:
																r.icon.children,
															attributes: ly(
																{},
																r.icon
																	.attributes,
																o.path
															),
														},
													],
												},
											],
										});
									} else e.push(r.icon);
									return { children: e, attributes: n };
							  })(S),
					x = E.attributes;
				return (
					(S.children = E.children),
					(S.attributes = x),
					a
						? (function (t) {
								var e = t.iconName,
									n = t.children,
									r = t.symbol;
								return [
									{
										tag: 'svg',
										attributes: { style: 'display: none;' },
										children: [
											{
												tag: 'symbol',
												attributes: ly(
													{},
													t.attributes,
													{
														id:
															!0 === r
																? ''
																		.concat(
																			t.prefix,
																			'-'
																		)
																		.concat(
																			Ey.familyPrefix,
																			'-'
																		)
																		.concat(
																			e
																		)
																: r,
													}
												),
												children: n,
											},
										],
									},
								];
						  })(S)
						: (function (t) {
								var e = t.children,
									n = t.main,
									r = t.mask,
									s = t.attributes,
									i = t.styles,
									o = t.transform;
								if (Xy(o) && n.found && !r.found) {
									var a = {
										x: n.width / n.height / 2,
										y: 0.5,
									};
									s.style = Yy(
										ly({}, i, {
											'transform-origin': ''
												.concat(a.x + o.x / 16, 'em ')
												.concat(a.y + o.y / 16, 'em'),
										})
									);
								}
								return [
									{ tag: 'svg', attributes: s, children: e },
								];
						  })(S)
				);
			}
			var r_ = function (t, e, n, r) {
				var s,
					i,
					o,
					a = Object.keys(t),
					l = a.length,
					c =
						void 0 !== r
							? (function (t, e) {
									return function (n, r, s, i) {
										return t.call(e, n, r, s, i);
									};
							  })(e, r)
							: e;
				for (
					void 0 === n
						? ((s = 1), (o = t[a[0]]))
						: ((s = 0), (o = n));
					s < l;
					s++
				)
					o = c(o, t[(i = a[s])], i, t);
				return o;
			};
			function s_(t, e) {
				var n =
						arguments.length > 2 && void 0 !== arguments[2]
							? arguments[2]
							: {},
					r = n.skipHooks,
					s = void 0 !== r && r,
					i = Object.keys(e).reduce(function (t, n) {
						var r = e[n];
						return (
							r.icon ? (t[r.iconName] = r.icon) : (t[n] = r), t
						);
					}, {});
				'function' != typeof Cy.hooks.addPack || s
					? (Cy.styles[t] = ly({}, Cy.styles[t] || {}, i))
					: Cy.hooks.addPack(t, i),
					'fas' === t && s_('fa', e);
			}
			var i_ = Cy.styles,
				o_ = Cy.shims,
				a_ = function () {
					var t = function (t) {
						return r_(
							i_,
							function (e, n, r) {
								return (e[r] = r_(n, t, {})), e;
							},
							{}
						);
					};
					t(function (t, e, n) {
						return e[3] && (t[e[3]] = n), t;
					}),
						t(function (t, e, n) {
							var r = e[2];
							return (
								(t[n] = n),
								r.forEach(function (e) {
									t[e] = n;
								}),
								t
							);
						});
					var e = 'far' in i_;
					r_(
						o_,
						function (t, n) {
							var r = n[1];
							return (
								'far' !== r || e || (r = 'fas'),
								(t[n[0]] = { prefix: r, iconName: n[2] }),
								t
							);
						},
						{}
					);
				};
			function l_(t, e, n) {
				if (t && t[e] && t[e][n])
					return { prefix: e, iconName: n, icon: t[e][n] };
			}
			function c_(t) {
				var e = t.tag,
					n = t.attributes,
					r = void 0 === n ? {} : n,
					s = t.children,
					i = void 0 === s ? [] : s;
				return 'string' == typeof t
					? Zy(t)
					: '<'
							.concat(e, ' ')
							.concat(
								(function (t) {
									return Object.keys(t || {})
										.reduce(function (e, n) {
											return (
												e +
												''
													.concat(n, '="')
													.concat(Zy(t[n]), '" ')
											);
										}, '')
										.trim();
								})(r),
								'>'
							)
							.concat(i.map(c_).join(''), '</')
							.concat(e, '>');
			}
			function u_(t) {
				(this.name = 'MissingIcon'),
					(this.message = t || 'Icon unavailable'),
					(this.stack = new Error().stack);
			}
			a_(),
				((u_.prototype = Object.create(
					Error.prototype
				)).constructor = u_);
			var h_ = { fill: 'currentColor' },
				d_ = {
					attributeType: 'XML',
					repeatCount: 'indefinite',
					dur: '2s',
				},
				f_ =
					(ly({}, h_, {
						d:
							'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z',
					}),
					ly({}, d_, { attributeName: 'opacity' }));
			function p_(t) {
				var e = t[0],
					n = t[1],
					r = cy(t.slice(4), 1)[0];
				return {
					found: !0,
					width: e,
					height: n,
					icon: Array.isArray(r)
						? {
								tag: 'g',
								attributes: {
									class: ''
										.concat(Ey.familyPrefix, '-')
										.concat(vy.GROUP),
								},
								children: [
									{
										tag: 'path',
										attributes: {
											class: ''
												.concat(Ey.familyPrefix, '-')
												.concat(vy.SECONDARY),
											fill: 'currentColor',
											d: r[0],
										},
									},
									{
										tag: 'path',
										attributes: {
											class: ''
												.concat(Ey.familyPrefix, '-')
												.concat(vy.PRIMARY),
											fill: 'currentColor',
											d: r[1],
										},
									},
								],
						  }
						: {
								tag: 'path',
								attributes: { fill: 'currentColor', d: r },
						  },
				};
			}
			function m_() {
				Ey.autoAddCss &&
					!v_ &&
					((function (t) {
						if (t && gy) {
							var e = my.createElement('style');
							e.setAttribute('type', 'text/css'),
								(e.innerHTML = t);
							for (
								var n = my.head.childNodes,
									r = null,
									s = n.length - 1;
								s > -1;
								s--
							) {
								var i = n[s],
									o = (i.tagName || '').toUpperCase();
								['STYLE', 'LINK'].indexOf(o) > -1 && (r = i);
							}
							my.head.insertBefore(e, r);
						}
					})(
						(function () {
							var t = 'fa',
								e = yy,
								n = Ey.familyPrefix,
								r = Ey.replacementClass,
								s =
									'svg:not(:root).svg-inline--fa {\n  overflow: visible;\n}\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.225em;\n}\n.svg-inline--fa.fa-w-1 {\n  width: 0.0625em;\n}\n.svg-inline--fa.fa-w-2 {\n  width: 0.125em;\n}\n.svg-inline--fa.fa-w-3 {\n  width: 0.1875em;\n}\n.svg-inline--fa.fa-w-4 {\n  width: 0.25em;\n}\n.svg-inline--fa.fa-w-5 {\n  width: 0.3125em;\n}\n.svg-inline--fa.fa-w-6 {\n  width: 0.375em;\n}\n.svg-inline--fa.fa-w-7 {\n  width: 0.4375em;\n}\n.svg-inline--fa.fa-w-8 {\n  width: 0.5em;\n}\n.svg-inline--fa.fa-w-9 {\n  width: 0.5625em;\n}\n.svg-inline--fa.fa-w-10 {\n  width: 0.625em;\n}\n.svg-inline--fa.fa-w-11 {\n  width: 0.6875em;\n}\n.svg-inline--fa.fa-w-12 {\n  width: 0.75em;\n}\n.svg-inline--fa.fa-w-13 {\n  width: 0.8125em;\n}\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-15 {\n  width: 0.9375em;\n}\n.svg-inline--fa.fa-w-16 {\n  width: 1em;\n}\n.svg-inline--fa.fa-w-17 {\n  width: 1.0625em;\n}\n.svg-inline--fa.fa-w-18 {\n  width: 1.125em;\n}\n.svg-inline--fa.fa-w-19 {\n  width: 1.1875em;\n}\n.svg-inline--fa.fa-w-20 {\n  width: 1.25em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-border {\n  height: 1.5em;\n}\n.svg-inline--fa.fa-li {\n  width: 2em;\n}\n.svg-inline--fa.fa-fw {\n  width: 1.25em;\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: 0.25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-lg {\n  font-size: 1.3333333333em;\n  line-height: 0.75em;\n  vertical-align: -0.0667em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit;\n}\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: 0.1em;\n  padding: 0.2em 0.25em 0.15em;\n}\n\n.fa-pull-left {\n  float: left;\n}\n\n.fa-pull-right {\n  float: right;\n}\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: 0.3em;\n}\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: 0.3em;\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear;\n}\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8);\n}\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical,\n:root .fa-flip-both {\n  -webkit-filter: none;\n          filter: none;\n}\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: #fff;\n}\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n}\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse {\n  color: #fff;\n}';
							if (n !== t || r !== e) {
								var i = new RegExp('\\.'.concat(t, '\\-'), 'g'),
									o = new RegExp(
										'\\--'.concat(t, '\\-'),
										'g'
									),
									a = new RegExp('\\.'.concat(e), 'g');
								s = s
									.replace(i, '.'.concat(n, '-'))
									.replace(o, '--'.concat(n, '-'))
									.replace(a, '.'.concat(r));
							}
							return s;
						})()
					),
					(v_ = !0));
			}
			function g_(t, e) {
				return (
					Object.defineProperty(t, 'abstract', { get: e }),
					Object.defineProperty(t, 'html', {
						get: function () {
							return t.abstract.map(function (t) {
								return c_(t);
							});
						},
					}),
					Object.defineProperty(t, 'node', {
						get: function () {
							if (gy) {
								var e = my.createElement('div');
								return (e.innerHTML = t.html), e.children;
							}
						},
					}),
					t
				);
			}
			function y_(t) {
				var e = t.prefix,
					n = void 0 === e ? 'fa' : e,
					r = t.iconName;
				if (r) return l_(b_.definitions, n, r) || l_(Cy.styles, n, r);
			}
			ly({}, h_, { cx: '256', cy: '364', r: '28' }),
				ly({}, d_, {
					attributeName: 'r',
					values: '28;14;28;28;14;28;',
				}),
				ly({}, f_, { values: '1;0;1;1;0;1;' }),
				ly({}, h_, {
					opacity: '1',
					d:
						'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z',
				}),
				ly({}, f_, { values: '1;0;0;0;0;1;' }),
				ly({}, h_, {
					opacity: '0',
					d:
						'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z',
				}),
				ly({}, f_, { values: '0;0;1;1;0;0;' });
			var __,
				b_ = new ((function () {
					function t() {
						!(function (t, e) {
							if (!(t instanceof e))
								throw new TypeError(
									'Cannot call a class as a function'
								);
						})(this, t),
							(this.definitions = {});
					}
					var e;
					return (
						(e = [
							{
								key: 'add',
								value: function () {
									for (
										var t = this,
											e = arguments.length,
											n = new Array(e),
											r = 0;
										r < e;
										r++
									)
										n[r] = arguments[r];
									var s = n.reduce(this._pullDefinitions, {});
									Object.keys(s).forEach(function (e) {
										(t.definitions[e] = ly(
											{},
											t.definitions[e] || {},
											s[e]
										)),
											s_(e, s[e]),
											a_();
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
									var n =
										e.prefix && e.iconName && e.icon
											? { 0: e }
											: e;
									return (
										Object.keys(n).map(function (e) {
											var r = n[e],
												s = r.prefix,
												i = r.iconName,
												o = r.icon;
											t[s] || (t[s] = {}), (t[s][i] = o);
										}),
										t
									);
								},
							},
						]) &&
							(function (t, e) {
								for (var n = 0; n < e.length; n++) {
									var r = e[n];
									(r.enumerable = r.enumerable || !1),
										(r.configurable = !0),
										'value' in r && (r.writable = !0),
										Object.defineProperty(t, r.key, r);
								}
							})(t.prototype, e),
						t
					);
				})())(),
				v_ = !1,
				w_ =
					((__ = function (t) {
						var e =
								arguments.length > 1 && void 0 !== arguments[1]
									? arguments[1]
									: {},
							n = e.transform,
							r = void 0 === n ? Ky : n,
							s = e.symbol,
							i = void 0 !== s && s,
							o = e.mask,
							a = void 0 === o ? null : o,
							l = e.maskId,
							c = void 0 === l ? null : l,
							u = e.title,
							h = void 0 === u ? null : u,
							d = e.titleId,
							f = void 0 === d ? null : d,
							p = e.classes,
							m = void 0 === p ? [] : p,
							g = e.attributes,
							y = void 0 === g ? {} : g,
							_ = e.styles,
							b = void 0 === _ ? {} : _;
						if (t) {
							var v = t.prefix,
								w = t.iconName,
								S = t.icon;
							return g_(ly({ type: 'icon' }, t), function () {
								return (
									m_(),
									Ey.autoA11y &&
										(h
											? (y['aria-labelledby'] = ''
													.concat(
														Ey.replacementClass,
														'-title-'
													)
													.concat(f || Gy()))
											: ((y['aria-hidden'] = 'true'),
											  (y.focusable = 'false'))),
									n_({
										icons: {
											main: p_(S),
											mask: a
												? p_(a.icon)
												: {
														found: !1,
														width: null,
														height: null,
														icon: {},
												  },
										},
										prefix: v,
										iconName: w,
										transform: ly({}, Ky, r),
										symbol: i,
										title: h,
										maskId: c,
										titleId: f,
										extra: {
											attributes: y,
											styles: b,
											classes: m,
										},
									})
								);
							});
						}
					}),
					function (t) {
						var e =
								arguments.length > 1 && void 0 !== arguments[1]
									? arguments[1]
									: {},
							n = (t || {}).icon ? t : y_(t || {}),
							r = e.mask;
						return (
							r && (r = (r || {}).icon ? r : y_(r || {})),
							__(n, ly({}, e, { mask: r }))
						);
					});
			let S_ = (() => {
					class t {
						constructor() {
							(this.defaultPrefix = 'fas'),
								(this.fallbackIcon = null),
								(this.globalLibrary = !1);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵprov = ut({
							factory: function () {
								return new t();
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})(),
				E_ = (() => {
					class t {
						constructor() {
							this.definitions = {};
						}
						addIcons(...t) {
							for (const e of t)
								e.prefix in this.definitions ||
									(this.definitions[e.prefix] = {}),
									(this.definitions[e.prefix][
										e.iconName
									] = e);
						}
						addIconPacks(...t) {
							for (const e of t) {
								const t = Object.keys(e).map(t => e[t]);
								this.addIcons(...t);
							}
						}
						getIconDefinition(t, e) {
							return t in this.definitions &&
								e in this.definitions[t]
								? this.definitions[t][e]
								: null;
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵprov = ut({
							factory: function () {
								return new t();
							},
							token: t,
							providedIn: 'root',
						})),
						t
					);
				})();
			const x_ = t => {
				const e = {
					'fa-spin': t.spin,
					'fa-pulse': t.pulse,
					'fa-fw': t.fixedWidth,
					'fa-border': t.border,
					'fa-inverse': t.inverse,
					'fa-layers-counter': t.counter,
					'fa-flip-horizontal':
						'horizontal' === t.flip || 'both' === t.flip,
					'fa-flip-vertical':
						'vertical' === t.flip || 'both' === t.flip,
					['fa-' + t.size]: null !== t.size,
					['fa-rotate-' + t.rotate]: null !== t.rotate,
					['fa-pull-' + t.pull]: null !== t.pull,
					['fa-stack-' + t.stackItemSize]: null != t.stackItemSize,
				};
				return Object.keys(e)
					.map(t => (e[t] ? t : null))
					.filter(t => t);
			};
			let C_ = (() => {
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
						(t.ɵdir = ve({
							type: t,
							selectors: [
								['fa-icon', 'stackItemSize', ''],
								['fa-duotone-icon', 'stackItemSize', ''],
							],
							inputs: {
								stackItemSize: 'stackItemSize',
								size: 'size',
							},
							features: [Le],
						})),
						t
					);
				})(),
				k_ = (() => {
					class t {
						constructor(t, e, n, r) {
							(this.sanitizer = t),
								(this.config = e),
								(this.iconLibrary = n),
								(this.stackItem = r),
								(this.classes = []);
						}
						ngOnChanges(t) {
							if (
								null == this.icon &&
								null == this.config.fallbackIcon
							)
								return (() => {
									throw new Error(
										'Property `icon` is required for `fa-icon`/`fa-duotone-icon` components.'
									);
								})();
							let e = null;
							if (
								((e =
									null == this.icon
										? this.config.fallbackIcon
										: this.icon),
								t)
							) {
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
								return void 0 !== (n = t).prefix &&
									void 0 !== n.iconName
									? t
									: Array.isArray(t) && 2 === t.length
									? { prefix: t[0], iconName: t[1] }
									: 'string' == typeof t
									? { prefix: e, iconName: t }
									: void 0;
								var n;
							})(t, this.config.defaultPrefix);
							if ('icon' in e) return e;
							const n = this.iconLibrary.getIconDefinition(
								e.prefix,
								e.iconName
							);
							if (null != n) return n;
							const r = y_(e);
							if (null != r) {
								const t =
									'Global icon library is deprecated. Consult https://github.com/FortAwesome/angular-fontawesome/blob/master/UPGRADING.md for the migration instructions.';
								if ('unset' === this.config.globalLibrary)
									console.error('FontAwesome: ' + t);
								else if (!this.config.globalLibrary)
									throw new Error(t);
								return r;
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
										'boolean' == typeof this.fixedWidth
											? this.fixedWidth
											: this.config.fixedWidth,
									stackItemSize:
										null != this.stackItem
											? this.stackItem.stackItemSize
											: null,
								},
								e =
									'string' == typeof this.transform
										? (function (t) {
												var e = {
													size: 16,
													x: 0,
													y: 0,
													flipX: !1,
													flipY: !1,
													rotate: 0,
												};
												return t
													? t
															.toLowerCase()
															.split(' ')
															.reduce(function (
																t,
																e
															) {
																var n = e
																		.toLowerCase()
																		.split(
																			'-'
																		),
																	r = n[0],
																	s = n
																		.slice(
																			1
																		)
																		.join(
																			'-'
																		);
																if (
																	r &&
																	'h' === s
																)
																	return (
																		(t.flipX = !0),
																		t
																	);
																if (
																	r &&
																	'v' === s
																)
																	return (
																		(t.flipY = !0),
																		t
																	);
																if (
																	((s = parseFloat(
																		s
																	)),
																	isNaN(s))
																)
																	return t;
																switch (r) {
																	case 'grow':
																		t.size =
																			t.size +
																			s;
																		break;
																	case 'shrink':
																		t.size =
																			t.size -
																			s;
																		break;
																	case 'left':
																		t.x =
																			t.x -
																			s;
																		break;
																	case 'right':
																		t.x =
																			t.x +
																			s;
																		break;
																	case 'up':
																		t.y =
																			t.y -
																			s;
																		break;
																	case 'down':
																		t.y =
																			t.y +
																			s;
																		break;
																	case 'rotate':
																		t.rotate =
																			t.rotate +
																			s;
																}
																return t;
															},
															e)
													: e;
										  })(this.transform)
										: this.transform;
							return {
								title: this.title,
								transform: e,
								classes: [...x_(t), ...this.classes],
								mask:
									null != this.mask
										? this.findIconDefinition(this.mask)
										: null,
								styles: null != this.styles ? this.styles : {},
								symbol: this.symbol,
								attributes: { role: this.a11yRole },
							};
						}
						renderIcon(t, e) {
							const n = w_(t, e);
							this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(
								n.html.join('\n')
							);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(
								mo(cu),
								mo(S_),
								mo(E_),
								mo(C_, 8)
							);
						}),
						(t.ɵcmp = pe({
							type: t,
							selectors: [['fa-icon']],
							hostAttrs: [1, 'ng-fa-icon'],
							hostVars: 2,
							hostBindings: function (t, e) {
								2 & t &&
									($o('innerHTML', e.renderedIconHTML, Yr),
									fo('title', e.title));
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
							features: [Le],
							decls: 0,
							vars: 0,
							template: function (t, e) {},
							encapsulation: 2,
						})),
						t
					);
				})(),
				T_ = (() => {
					class t {}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)();
							},
						})),
						t
					);
				})();
			class A_ extends p {
				notifyNext(t, e, n, r, s) {
					this.destination.next(e);
				}
				notifyError(t, e) {
					this.destination.error(t);
				}
				notifyComplete(t) {
					this.destination.complete();
				}
			}
			class I_ extends p {
				constructor(t, e, n) {
					super(),
						(this.parent = t),
						(this.outerValue = e),
						(this.outerIndex = n),
						(this.index = 0);
				}
				_next(t) {
					this.parent.notifyNext(
						this.outerValue,
						t,
						this.outerIndex,
						this.index++,
						this
					);
				}
				_error(t) {
					this.parent.notifyError(t, this), this.unsubscribe();
				}
				_complete() {
					this.parent.notifyComplete(this), this.unsubscribe();
				}
			}
			function O_(t, e, n, r, s = new I_(t, n, r)) {
				if (!s.closed) return e instanceof _ ? e.subscribe(s) : L(e)(s);
			}
			const R_ = {};
			class P_ {
				constructor(t) {
					this.resultSelector = t;
				}
				call(t, e) {
					return e.subscribe(new N_(t, this.resultSelector));
				}
			}
			class N_ extends A_ {
				constructor(t, e) {
					super(t),
						(this.resultSelector = e),
						(this.active = 0),
						(this.values = []),
						(this.observables = []);
				}
				_next(t) {
					this.values.push(R_), this.observables.push(t);
				}
				_complete() {
					const t = this.observables,
						e = t.length;
					if (0 === e) this.destination.complete();
					else {
						(this.active = e), (this.toRespond = e);
						for (let n = 0; n < e; n++)
							this.add(O_(this, t[n], void 0, n));
					}
				}
				notifyComplete(t) {
					0 == (this.active -= 1) && this.destination.complete();
				}
				notifyNext(t, e, n) {
					const r = this.values,
						s = this.toRespond
							? r[n] === R_
								? --this.toRespond
								: this.toRespond
							: 0;
					(r[n] = e),
						0 === s &&
							(this.resultSelector
								? this._tryResultSelector(r)
								: this.destination.next(r.slice()));
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
			const L_ = (() => {
				function t() {
					return (
						Error.call(this),
						(this.message = 'no elements in sequence'),
						(this.name = 'EmptyError'),
						this
					);
				}
				return (t.prototype = Object.create(Error.prototype)), t;
			})();
			function D_(t) {
				return new _(e => {
					let n;
					try {
						n = t();
					} catch (r) {
						return void e.error(r);
					}
					return (n ? M(n) : Uu()).subscribe(e);
				});
			}
			function M_(t) {
				return function (e) {
					return 0 === t ? Uu() : e.lift(new F_(t));
				};
			}
			class F_ {
				constructor(t) {
					if (((this.total = t), this.total < 0)) throw new zu();
				}
				call(t, e) {
					return e.subscribe(new j_(t, this.total));
				}
			}
			class j_ extends p {
				constructor(t, e) {
					super(t),
						(this.total = e),
						(this.ring = new Array()),
						(this.count = 0);
				}
				_next(t) {
					const e = this.ring,
						n = this.total,
						r = this.count++;
					e.length < n ? e.push(t) : (e[r % n] = t);
				}
				_complete() {
					const t = this.destination;
					let e = this.count;
					if (e > 0) {
						const n =
								this.count >= this.total
									? this.total
									: this.count,
							r = this.ring;
						for (let s = 0; s < n; s++) {
							const s = e++ % n;
							t.next(r[s]);
						}
					}
					t.complete();
				}
			}
			function z_(t = V_) {
				return e => e.lift(new B_(t));
			}
			class B_ {
				constructor(t) {
					this.errorFactory = t;
				}
				call(t, e) {
					return e.subscribe(new U_(t, this.errorFactory));
				}
			}
			class U_ extends p {
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
						} catch ($w) {
							t = $w;
						}
						this.destination.error(t);
					}
				}
			}
			function V_() {
				return new L_();
			}
			function H_(t = null) {
				return e => e.lift(new $_(t));
			}
			class $_ {
				constructor(t) {
					this.defaultValue = t;
				}
				call(t, e) {
					return e.subscribe(new q_(t, this.defaultValue));
				}
			}
			class q_ extends p {
				constructor(t, e) {
					super(t), (this.defaultValue = e), (this.isEmpty = !0);
				}
				_next(t) {
					(this.isEmpty = !1), this.destination.next(t);
				}
				_complete() {
					this.isEmpty && this.destination.next(this.defaultValue),
						this.destination.complete();
				}
			}
			class W_ {
				constructor(t, e, n = !1) {
					(this.accumulator = t), (this.seed = e), (this.hasSeed = n);
				}
				call(t, e) {
					return e.subscribe(
						new Q_(t, this.accumulator, this.seed, this.hasSeed)
					);
				}
			}
			class Q_ extends p {
				constructor(t, e, n, r) {
					super(t),
						(this.accumulator = e),
						(this._seed = n),
						(this.hasSeed = r),
						(this.index = 0);
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
					} catch (r) {
						this.destination.error(r);
					}
					(this.seed = n), this.destination.next(n);
				}
			}
			function K_(t, e) {
				const n = arguments.length >= 2;
				return r =>
					r.pipe(
						t ? Mu((e, n) => t(e, n, r)) : y,
						Vu(1),
						n ? H_(e) : z_(() => new L_())
					);
			}
			class G_ {
				constructor(t, e) {
					(this.id = t), (this.url = e);
				}
			}
			class Z_ extends G_ {
				constructor(t, e, n = 'imperative', r = null) {
					super(t, e),
						(this.navigationTrigger = n),
						(this.restoredState = r);
				}
				toString() {
					return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
				}
			}
			class Y_ extends G_ {
				constructor(t, e, n) {
					super(t, e), (this.urlAfterRedirects = n);
				}
				toString() {
					return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
				}
			}
			class X_ extends G_ {
				constructor(t, e, n) {
					super(t, e), (this.reason = n);
				}
				toString() {
					return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
				}
			}
			class J_ extends G_ {
				constructor(t, e, n) {
					super(t, e), (this.error = n);
				}
				toString() {
					return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
				}
			}
			class tb extends G_ {
				constructor(t, e, n, r) {
					super(t, e), (this.urlAfterRedirects = n), (this.state = r);
				}
				toString() {
					return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class eb extends G_ {
				constructor(t, e, n, r) {
					super(t, e), (this.urlAfterRedirects = n), (this.state = r);
				}
				toString() {
					return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class nb extends G_ {
				constructor(t, e, n, r, s) {
					super(t, e),
						(this.urlAfterRedirects = n),
						(this.state = r),
						(this.shouldActivate = s);
				}
				toString() {
					return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
				}
			}
			class rb extends G_ {
				constructor(t, e, n, r) {
					super(t, e), (this.urlAfterRedirects = n), (this.state = r);
				}
				toString() {
					return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class sb extends G_ {
				constructor(t, e, n, r) {
					super(t, e), (this.urlAfterRedirects = n), (this.state = r);
				}
				toString() {
					return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
				}
			}
			class ib {
				constructor(t) {
					this.route = t;
				}
				toString() {
					return `RouteConfigLoadStart(path: ${this.route.path})`;
				}
			}
			class ob {
				constructor(t) {
					this.route = t;
				}
				toString() {
					return `RouteConfigLoadEnd(path: ${this.route.path})`;
				}
			}
			class ab {
				constructor(t) {
					this.snapshot = t;
				}
				toString() {
					return `ChildActivationStart(path: '${
						(this.snapshot.routeConfig &&
							this.snapshot.routeConfig.path) ||
						''
					}')`;
				}
			}
			class lb {
				constructor(t) {
					this.snapshot = t;
				}
				toString() {
					return `ChildActivationEnd(path: '${
						(this.snapshot.routeConfig &&
							this.snapshot.routeConfig.path) ||
						''
					}')`;
				}
			}
			class cb {
				constructor(t) {
					this.snapshot = t;
				}
				toString() {
					return `ActivationStart(path: '${
						(this.snapshot.routeConfig &&
							this.snapshot.routeConfig.path) ||
						''
					}')`;
				}
			}
			class ub {
				constructor(t) {
					this.snapshot = t;
				}
				toString() {
					return `ActivationEnd(path: '${
						(this.snapshot.routeConfig &&
							this.snapshot.routeConfig.path) ||
						''
					}')`;
				}
			}
			class hb {
				constructor(t, e, n) {
					(this.routerEvent = t),
						(this.position = e),
						(this.anchor = n);
				}
				toString() {
					return `Scroll(anchor: '${this.anchor}', position: '${
						this.position
							? `${this.position[0]}, ${this.position[1]}`
							: null
					}')`;
				}
			}
			const db = 'primary';
			class fb {
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
			function pb(t) {
				return new fb(t);
			}
			function mb(t) {
				const e = Error('NavigationCancelingError: ' + t);
				return (e.ngNavigationCancelingError = !0), e;
			}
			function gb(t, e, n) {
				const r = n.path.split('/');
				if (r.length > t.length) return null;
				if (
					'full' === n.pathMatch &&
					(e.hasChildren() || r.length < t.length)
				)
					return null;
				const s = {};
				for (let i = 0; i < r.length; i++) {
					const e = r[i],
						n = t[i];
					if (e.startsWith(':')) s[e.substring(1)] = n;
					else if (e !== n.path) return null;
				}
				return { consumed: t.slice(0, r.length), posParams: s };
			}
			function yb(t, e) {
				const n = Object.keys(t),
					r = Object.keys(e);
				if (!n || !r || n.length != r.length) return !1;
				let s;
				for (let i = 0; i < n.length; i++)
					if (((s = n[i]), !_b(t[s], e[s]))) return !1;
				return !0;
			}
			function _b(t, e) {
				if (Array.isArray(t) && Array.isArray(e)) {
					if (t.length !== e.length) return !1;
					const n = [...t].sort(),
						r = [...e].sort();
					return n.every((t, e) => r[e] === t);
				}
				return t === e;
			}
			function bb(t) {
				return Array.prototype.concat.apply([], t);
			}
			function vb(t) {
				return t.length > 0 ? t[t.length - 1] : null;
			}
			function wb(t, e) {
				for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
			}
			function Sb(t) {
				return (e = t) && 'function' == typeof e.subscribe
					? t
					: Eo(t)
					? M(Promise.resolve(t))
					: Eu(t);
				var e;
			}
			function Eb(t, e, n) {
				return n
					? (function (t, e) {
							return yb(t, e);
					  })(t.queryParams, e.queryParams) &&
							(function t(e, n) {
								if (!Tb(e.segments, n.segments)) return !1;
								if (e.numberOfChildren !== n.numberOfChildren)
									return !1;
								for (const r in n.children) {
									if (!e.children[r]) return !1;
									if (!t(e.children[r], n.children[r]))
										return !1;
								}
								return !0;
							})(t.root, e.root)
					: (function (t, e) {
							return (
								Object.keys(e).length <=
									Object.keys(t).length &&
								Object.keys(e).every(n => _b(t[n], e[n]))
							);
					  })(t.queryParams, e.queryParams) &&
							(function t(e, n) {
								return (function e(n, r, s) {
									if (n.segments.length > s.length)
										return (
											!!Tb(
												n.segments.slice(0, s.length),
												s
											) && !r.hasChildren()
										);
									if (n.segments.length === s.length) {
										if (!Tb(n.segments, s)) return !1;
										for (const e in r.children) {
											if (!n.children[e]) return !1;
											if (
												!t(n.children[e], r.children[e])
											)
												return !1;
										}
										return !0;
									}
									{
										const t = s.slice(0, n.segments.length),
											i = s.slice(n.segments.length);
										return (
											!!Tb(n.segments, t) &&
											!!n.children.primary &&
											e(n.children.primary, r, i)
										);
									}
								})(e, n, n.segments);
							})(t.root, e.root);
			}
			class xb {
				constructor(t, e, n) {
					(this.root = t),
						(this.queryParams = e),
						(this.fragment = n);
				}
				get queryParamMap() {
					return (
						this._queryParamMap ||
							(this._queryParamMap = pb(this.queryParams)),
						this._queryParamMap
					);
				}
				toString() {
					return Rb.serialize(this);
				}
			}
			class Cb {
				constructor(t, e) {
					(this.segments = t),
						(this.children = e),
						(this.parent = null),
						wb(e, (t, e) => (t.parent = this));
				}
				hasChildren() {
					return this.numberOfChildren > 0;
				}
				get numberOfChildren() {
					return Object.keys(this.children).length;
				}
				toString() {
					return Pb(this);
				}
			}
			class kb {
				constructor(t, e) {
					(this.path = t), (this.parameters = e);
				}
				get parameterMap() {
					return (
						this._parameterMap ||
							(this._parameterMap = pb(this.parameters)),
						this._parameterMap
					);
				}
				toString() {
					return jb(this);
				}
			}
			function Tb(t, e) {
				return (
					t.length === e.length &&
					t.every((t, n) => t.path === e[n].path)
				);
			}
			function Ab(t, e) {
				let n = [];
				return (
					wb(t.children, (t, r) => {
						r === db && (n = n.concat(e(t, r)));
					}),
					wb(t.children, (t, r) => {
						r !== db && (n = n.concat(e(t, r)));
					}),
					n
				);
			}
			class Ib {}
			class Ob {
				parse(t) {
					const e = new Hb(t);
					return new xb(
						e.parseRootSegment(),
						e.parseQueryParams(),
						e.parseFragment()
					);
				}
				serialize(t) {
					return `${
						'/' +
						(function t(e, n) {
							if (!e.hasChildren()) return Pb(e);
							if (n) {
								const n = e.children.primary
										? t(e.children.primary, !1)
										: '',
									r = [];
								return (
									wb(e.children, (e, n) => {
										n !== db && r.push(`${n}:${t(e, !1)}`);
									}),
									r.length > 0 ? `${n}(${r.join('//')})` : n
								);
							}
							{
								const n = Ab(e, (n, r) =>
									r === db
										? [t(e.children.primary, !1)]
										: [`${r}:${t(n, !1)}`]
								);
								return 1 === Object.keys(e.children).length &&
									null != e.children.primary
									? `${Pb(e)}/${n[0]}`
									: `${Pb(e)}/(${n.join('//')})`;
							}
						})(t.root, !0)
					}${(function (t) {
						const e = Object.keys(t).map(e => {
							const n = t[e];
							return Array.isArray(n)
								? n.map(t => `${Lb(e)}=${Lb(t)}`).join('&')
								: `${Lb(e)}=${Lb(n)}`;
						});
						return e.length ? '?' + e.join('&') : '';
					})(t.queryParams)}${
						'string' == typeof t.fragment
							? '#' + encodeURI(t.fragment)
							: ''
					}`;
				}
			}
			const Rb = new Ob();
			function Pb(t) {
				return t.segments.map(t => jb(t)).join('/');
			}
			function Nb(t) {
				return encodeURIComponent(t)
					.replace(/%40/g, '@')
					.replace(/%3A/gi, ':')
					.replace(/%24/g, '$')
					.replace(/%2C/gi, ',');
			}
			function Lb(t) {
				return Nb(t).replace(/%3B/gi, ';');
			}
			function Db(t) {
				return Nb(t)
					.replace(/\(/g, '%28')
					.replace(/\)/g, '%29')
					.replace(/%26/gi, '&');
			}
			function Mb(t) {
				return decodeURIComponent(t);
			}
			function Fb(t) {
				return Mb(t.replace(/\+/g, '%20'));
			}
			function jb(t) {
				return `${Db(t.path)}${
					((e = t.parameters),
					Object.keys(e)
						.map(t => `;${Db(t)}=${Db(e[t])}`)
						.join(''))
				}`;
				var e;
			}
			const zb = /^[^\/()?;=#]+/;
			function Bb(t) {
				const e = t.match(zb);
				return e ? e[0] : '';
			}
			const Ub = /^[^=?&#]+/,
				Vb = /^[^?&#]+/;
			class Hb {
				constructor(t) {
					(this.url = t), (this.remaining = t);
				}
				parseRootSegment() {
					return (
						this.consumeOptional('/'),
						'' === this.remaining ||
						this.peekStartsWith('?') ||
						this.peekStartsWith('#')
							? new Cb([], {})
							: new Cb([], this.parseChildren())
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
					return this.consumeOptional('#')
						? decodeURIComponent(this.remaining)
						: null;
				}
				parseChildren() {
					if ('' === this.remaining) return {};
					this.consumeOptional('/');
					const t = [];
					for (
						this.peekStartsWith('(') || t.push(this.parseSegment());
						this.peekStartsWith('/') &&
						!this.peekStartsWith('//') &&
						!this.peekStartsWith('/(');

					)
						this.capture('/'), t.push(this.parseSegment());
					let e = {};
					this.peekStartsWith('/(') &&
						(this.capture('/'), (e = this.parseParens(!0)));
					let n = {};
					return (
						this.peekStartsWith('(') && (n = this.parseParens(!1)),
						(t.length > 0 || Object.keys(e).length > 0) &&
							(n.primary = new Cb(t, e)),
						n
					);
				}
				parseSegment() {
					const t = Bb(this.remaining);
					if ('' === t && this.peekStartsWith(';'))
						throw new Error(
							`Empty path url segment cannot have parameters: '${this.remaining}'.`
						);
					return (
						this.capture(t), new kb(Mb(t), this.parseMatrixParams())
					);
				}
				parseMatrixParams() {
					const t = {};
					for (; this.consumeOptional(';'); ) this.parseParam(t);
					return t;
				}
				parseParam(t) {
					const e = Bb(this.remaining);
					if (!e) return;
					this.capture(e);
					let n = '';
					if (this.consumeOptional('=')) {
						const t = Bb(this.remaining);
						t && ((n = t), this.capture(n));
					}
					t[Mb(e)] = Mb(n);
				}
				parseQueryParam(t) {
					const e = (function (t) {
						const e = t.match(Ub);
						return e ? e[0] : '';
					})(this.remaining);
					if (!e) return;
					this.capture(e);
					let n = '';
					if (this.consumeOptional('=')) {
						const t = (function (t) {
							const e = t.match(Vb);
							return e ? e[0] : '';
						})(this.remaining);
						t && ((n = t), this.capture(n));
					}
					const r = Fb(e),
						s = Fb(n);
					if (t.hasOwnProperty(r)) {
						let e = t[r];
						Array.isArray(e) || ((e = [e]), (t[r] = e)), e.push(s);
					} else t[r] = s;
				}
				parseParens(t) {
					const e = {};
					for (
						this.capture('(');
						!this.consumeOptional(')') && this.remaining.length > 0;

					) {
						const n = Bb(this.remaining),
							r = this.remaining[n.length];
						if ('/' !== r && ')' !== r && ';' !== r)
							throw new Error(`Cannot parse url '${this.url}'`);
						let s = void 0;
						n.indexOf(':') > -1
							? ((s = n.substr(0, n.indexOf(':'))),
							  this.capture(s),
							  this.capture(':'))
							: t && (s = db);
						const i = this.parseChildren();
						(e[s] =
							1 === Object.keys(i).length
								? i.primary
								: new Cb([], i)),
							this.consumeOptional('//');
					}
					return e;
				}
				peekStartsWith(t) {
					return this.remaining.startsWith(t);
				}
				consumeOptional(t) {
					return (
						!!this.peekStartsWith(t) &&
						((this.remaining = this.remaining.substring(t.length)),
						!0)
					);
				}
				capture(t) {
					if (!this.consumeOptional(t))
						throw new Error(`Expected "${t}".`);
				}
			}
			class $b {
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
					const e = qb(t, this._root);
					return e ? e.children.map(t => t.value) : [];
				}
				firstChild(t) {
					const e = qb(t, this._root);
					return e && e.children.length > 0
						? e.children[0].value
						: null;
				}
				siblings(t) {
					const e = Wb(t, this._root);
					return e.length < 2
						? []
						: e[e.length - 2].children
								.map(t => t.value)
								.filter(e => e !== t);
				}
				pathFromRoot(t) {
					return Wb(t, this._root).map(t => t.value);
				}
			}
			function qb(t, e) {
				if (t === e.value) return e;
				for (const n of e.children) {
					const e = qb(t, n);
					if (e) return e;
				}
				return null;
			}
			function Wb(t, e) {
				if (t === e.value) return [e];
				for (const n of e.children) {
					const r = Wb(t, n);
					if (r.length) return r.unshift(e), r;
				}
				return [];
			}
			class Qb {
				constructor(t, e) {
					(this.value = t), (this.children = e);
				}
				toString() {
					return `TreeNode(${this.value})`;
				}
			}
			function Kb(t) {
				const e = {};
				return t && t.children.forEach(t => (e[t.value.outlet] = t)), e;
			}
			class Gb extends $b {
				constructor(t, e) {
					super(t), (this.snapshot = e), ev(this, t);
				}
				toString() {
					return this.snapshot.toString();
				}
			}
			function Zb(t, e) {
				const n = (function (t, e) {
						const n = new Jb(
							[],
							{},
							{},
							'',
							{},
							db,
							e,
							null,
							t.root,
							-1,
							{}
						);
						return new tv('', new Qb(n, []));
					})(t, e),
					r = new mm([new kb('', {})]),
					s = new mm({}),
					i = new mm({}),
					o = new mm({}),
					a = new mm(''),
					l = new Yb(r, s, o, a, i, db, e, n.root);
				return (l.snapshot = n.root), new Gb(new Qb(l, []), n);
			}
			class Yb {
				constructor(t, e, n, r, s, i, o, a) {
					(this.url = t),
						(this.params = e),
						(this.queryParams = n),
						(this.fragment = r),
						(this.data = s),
						(this.outlet = i),
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
					return (
						this._paramMap ||
							(this._paramMap = this.params.pipe(k(t => pb(t)))),
						this._paramMap
					);
				}
				get queryParamMap() {
					return (
						this._queryParamMap ||
							(this._queryParamMap = this.queryParams.pipe(
								k(t => pb(t))
							)),
						this._queryParamMap
					);
				}
				toString() {
					return this.snapshot
						? this.snapshot.toString()
						: `Future(${this._futureSnapshot})`;
				}
			}
			function Xb(t, e = 'emptyOnly') {
				const n = t.pathFromRoot;
				let r = 0;
				if ('always' !== e)
					for (r = n.length - 1; r >= 1; ) {
						const t = n[r],
							e = n[r - 1];
						if (t.routeConfig && '' === t.routeConfig.path) r--;
						else {
							if (e.component) break;
							r--;
						}
					}
				return (function (t) {
					return t.reduce(
						(t, e) => ({
							params: Object.assign(
								Object.assign({}, t.params),
								e.params
							),
							data: Object.assign(
								Object.assign({}, t.data),
								e.data
							),
							resolve: Object.assign(
								Object.assign({}, t.resolve),
								e._resolvedData
							),
						}),
						{ params: {}, data: {}, resolve: {} }
					);
				})(n.slice(r));
			}
			class Jb {
				constructor(t, e, n, r, s, i, o, a, l, c, u) {
					(this.url = t),
						(this.params = e),
						(this.queryParams = n),
						(this.fragment = r),
						(this.data = s),
						(this.outlet = i),
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
					return (
						this._paramMap || (this._paramMap = pb(this.params)),
						this._paramMap
					);
				}
				get queryParamMap() {
					return (
						this._queryParamMap ||
							(this._queryParamMap = pb(this.queryParams)),
						this._queryParamMap
					);
				}
				toString() {
					return `Route(url:'${this.url
						.map(t => t.toString())
						.join('/')}', path:'${
						this.routeConfig ? this.routeConfig.path : ''
					}')`;
				}
			}
			class tv extends $b {
				constructor(t, e) {
					super(e), (this.url = t), ev(this, e);
				}
				toString() {
					return nv(this._root);
				}
			}
			function ev(t, e) {
				(e.value._routerState = t), e.children.forEach(e => ev(t, e));
			}
			function nv(t) {
				const e =
					t.children.length > 0
						? ` { ${t.children.map(nv).join(', ')} } `
						: '';
				return `${t.value}${e}`;
			}
			function rv(t) {
				if (t.snapshot) {
					const e = t.snapshot,
						n = t._futureSnapshot;
					(t.snapshot = n),
						yb(e.queryParams, n.queryParams) ||
							t.queryParams.next(n.queryParams),
						e.fragment !== n.fragment &&
							t.fragment.next(n.fragment),
						yb(e.params, n.params) || t.params.next(n.params),
						(function (t, e) {
							if (t.length !== e.length) return !1;
							for (let n = 0; n < t.length; ++n)
								if (!yb(t[n], e[n])) return !1;
							return !0;
						})(e.url, n.url) || t.url.next(n.url),
						yb(e.data, n.data) || t.data.next(n.data);
				} else
					(t.snapshot = t._futureSnapshot),
						t.data.next(t._futureSnapshot.data);
			}
			function sv(t, e) {
				var n, r;
				return (
					yb(t.params, e.params) &&
					Tb((n = t.url), (r = e.url)) &&
					n.every((t, e) => yb(t.parameters, r[e].parameters)) &&
					!(!t.parent != !e.parent) &&
					(!t.parent || sv(t.parent, e.parent))
				);
			}
			function iv(t) {
				return (
					'object' == typeof t &&
					null != t &&
					!t.outlets &&
					!t.segmentPath
				);
			}
			function ov(t, e, n, r, s) {
				let i = {};
				return (
					r &&
						wb(r, (t, e) => {
							i[e] = Array.isArray(t)
								? t.map(t => '' + t)
								: '' + t;
						}),
					new xb(
						n.root === t
							? e
							: (function t(e, n, r) {
									const s = {};
									return (
										wb(e.children, (e, i) => {
											s[i] = e === n ? r : t(e, n, r);
										}),
										new Cb(e.segments, s)
									);
							  })(n.root, t, e),
						i,
						s
					)
				);
			}
			class av {
				constructor(t, e, n) {
					if (
						((this.isAbsolute = t),
						(this.numberOfDoubleDots = e),
						(this.commands = n),
						t && n.length > 0 && iv(n[0]))
					)
						throw new Error(
							'Root segment cannot have matrix parameters'
						);
					const r = n.find(
						t => 'object' == typeof t && null != t && t.outlets
					);
					if (r && r !== vb(n))
						throw new Error(
							'{outlets:{}} has to be the last command'
						);
				}
				toRoot() {
					return (
						this.isAbsolute &&
						1 === this.commands.length &&
						'/' == this.commands[0]
					);
				}
			}
			class lv {
				constructor(t, e, n) {
					(this.segmentGroup = t),
						(this.processChildren = e),
						(this.index = n);
				}
			}
			function cv(t) {
				return 'object' == typeof t && null != t && t.outlets
					? t.outlets.primary
					: '' + t;
			}
			function uv(t, e, n) {
				if (
					(t || (t = new Cb([], {})),
					0 === t.segments.length && t.hasChildren())
				)
					return hv(t, e, n);
				const r = (function (t, e, n) {
						let r = 0,
							s = e;
						const i = { match: !1, pathIndex: 0, commandIndex: 0 };
						for (; s < t.segments.length; ) {
							if (r >= n.length) return i;
							const e = t.segments[s],
								o = cv(n[r]),
								a = r < n.length - 1 ? n[r + 1] : null;
							if (s > 0 && void 0 === o) break;
							if (
								o &&
								a &&
								'object' == typeof a &&
								void 0 === a.outlets
							) {
								if (!mv(o, a, e)) return i;
								r += 2;
							} else {
								if (!mv(o, {}, e)) return i;
								r++;
							}
							s++;
						}
						return { match: !0, pathIndex: s, commandIndex: r };
					})(t, e, n),
					s = n.slice(r.commandIndex);
				if (r.match && r.pathIndex < t.segments.length) {
					const e = new Cb(t.segments.slice(0, r.pathIndex), {});
					return (
						(e.children.primary = new Cb(
							t.segments.slice(r.pathIndex),
							t.children
						)),
						hv(e, 0, s)
					);
				}
				return r.match && 0 === s.length
					? new Cb(t.segments, {})
					: r.match && !t.hasChildren()
					? dv(t, e, n)
					: r.match
					? hv(t, 0, s)
					: dv(t, e, n);
			}
			function hv(t, e, n) {
				if (0 === n.length) return new Cb(t.segments, {});
				{
					const r = (function (t) {
							return 'object' == typeof t[0] &&
								null !== t[0] &&
								t[0].outlets
								? t[0].outlets
								: { [db]: t };
						})(n),
						s = {};
					return (
						wb(r, (n, r) => {
							null !== n && (s[r] = uv(t.children[r], e, n));
						}),
						wb(t.children, (t, e) => {
							void 0 === r[e] && (s[e] = t);
						}),
						new Cb(t.segments, s)
					);
				}
			}
			function dv(t, e, n) {
				const r = t.segments.slice(0, e);
				let s = 0;
				for (; s < n.length; ) {
					if (
						'object' == typeof n[s] &&
						null !== n[s] &&
						void 0 !== n[s].outlets
					) {
						const t = fv(n[s].outlets);
						return new Cb(r, t);
					}
					if (0 === s && iv(n[0])) {
						r.push(new kb(t.segments[e].path, n[0])), s++;
						continue;
					}
					const i = cv(n[s]),
						o = s < n.length - 1 ? n[s + 1] : null;
					i && o && iv(o)
						? (r.push(new kb(i, pv(o))), (s += 2))
						: (r.push(new kb(i, {})), s++);
				}
				return new Cb(r, {});
			}
			function fv(t) {
				const e = {};
				return (
					wb(t, (t, n) => {
						null !== t && (e[n] = dv(new Cb([], {}), 0, t));
					}),
					e
				);
			}
			function pv(t) {
				const e = {};
				return wb(t, (t, n) => (e[n] = '' + t)), e;
			}
			function mv(t, e, n) {
				return t == n.path && yb(e, n.parameters);
			}
			class gv {
				constructor(t, e, n, r) {
					(this.routeReuseStrategy = t),
						(this.futureState = e),
						(this.currState = n),
						(this.forwardEvent = r);
				}
				activate(t) {
					const e = this.futureState._root,
						n = this.currState ? this.currState._root : null;
					this.deactivateChildRoutes(e, n, t),
						rv(this.futureState.root),
						this.activateChildRoutes(e, n, t);
				}
				deactivateChildRoutes(t, e, n) {
					const r = Kb(e);
					t.children.forEach(t => {
						const e = t.value.outlet;
						this.deactivateRoutes(t, r[e], n), delete r[e];
					}),
						wb(r, (t, e) => {
							this.deactivateRouteAndItsChildren(t, n);
						});
				}
				deactivateRoutes(t, e, n) {
					const r = t.value,
						s = e ? e.value : null;
					if (r === s)
						if (r.component) {
							const s = n.getContext(r.outlet);
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
							r = n.children.onOutletDeactivated();
						this.routeReuseStrategy.store(t.value.snapshot, {
							componentRef: e,
							route: t,
							contexts: r,
						});
					}
				}
				deactivateRouteAndOutlet(t, e) {
					const n = e.getContext(t.value.outlet);
					if (n) {
						const r = Kb(t),
							s = t.value.component ? n.children : e;
						wb(r, (t, e) =>
							this.deactivateRouteAndItsChildren(t, s)
						),
							n.outlet &&
								(n.outlet.deactivate(),
								n.children.onOutletDeactivated());
					}
				}
				activateChildRoutes(t, e, n) {
					const r = Kb(e);
					t.children.forEach(t => {
						this.activateRoutes(t, r[t.value.outlet], n),
							this.forwardEvent(new ub(t.value.snapshot));
					}),
						t.children.length &&
							this.forwardEvent(new lb(t.value.snapshot));
				}
				activateRoutes(t, e, n) {
					const r = t.value,
						s = e ? e.value : null;
					if ((rv(r), r === s))
						if (r.component) {
							const s = n.getOrCreateContext(r.outlet);
							this.activateChildRoutes(t, e, s.children);
						} else this.activateChildRoutes(t, e, n);
					else if (r.component) {
						const e = n.getOrCreateContext(r.outlet);
						if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
							const t = this.routeReuseStrategy.retrieve(
								r.snapshot
							);
							this.routeReuseStrategy.store(r.snapshot, null),
								e.children.onOutletReAttached(t.contexts),
								(e.attachRef = t.componentRef),
								(e.route = t.route.value),
								e.outlet &&
									e.outlet.attach(
										t.componentRef,
										t.route.value
									),
								yv(t.route);
						} else {
							const n = (function (t) {
									for (let e = t.parent; e; e = e.parent) {
										const t = e.routeConfig;
										if (t && t._loadedConfig)
											return t._loadedConfig;
										if (t && t.component) return null;
									}
									return null;
								})(r.snapshot),
								s = n
									? n.module.componentFactoryResolver
									: null;
							(e.attachRef = null),
								(e.route = r),
								(e.resolver = s),
								e.outlet && e.outlet.activateWith(r, s),
								this.activateChildRoutes(t, null, e.children);
						}
					} else this.activateChildRoutes(t, null, n);
				}
			}
			function yv(t) {
				rv(t.value), t.children.forEach(yv);
			}
			class _v {
				constructor(t, e) {
					(this.routes = t), (this.module = e);
				}
			}
			function bv(t) {
				return 'function' == typeof t;
			}
			function vv(t) {
				return t instanceof xb;
			}
			const wv = Symbol('INITIAL_VALUE');
			function Sv() {
				return ym(t =>
					(function (...t) {
						let e = void 0,
							n = void 0;
						return (
							C(t[t.length - 1]) && (n = t.pop()),
							'function' == typeof t[t.length - 1] &&
								(e = t.pop()),
							1 === t.length && l(t[0]) && (t = t[0]),
							$(t, n).lift(new P_(e))
						);
					})(...t.map(t => t.pipe(Vu(1), ph(wv)))).pipe(
						(function (t, e) {
							let n = !1;
							return (
								arguments.length >= 2 && (n = !0),
								function (r) {
									return r.lift(new W_(t, e, n));
								}
							);
						})((t, e) => {
							let n = !1;
							return e.reduce((t, r, s) => {
								if (t !== wv) return t;
								if ((r === wv && (n = !0), !n)) {
									if (!1 === r) return r;
									if (s === e.length - 1 || vv(r)) return r;
								}
								return t;
							}, t);
						}, wv),
						Mu(t => t !== wv),
						k(t => (vv(t) ? t : !0 === t)),
						Vu(1)
					)
				);
			}
			class Ev {
				constructor(t) {
					this.segmentGroup = t || null;
				}
			}
			class xv {
				constructor(t) {
					this.urlTree = t;
				}
			}
			function Cv(t) {
				return new _(e => e.error(new Ev(t)));
			}
			function kv(t) {
				return new _(e => e.error(new xv(t)));
			}
			function Tv(t) {
				return new _(e =>
					e.error(
						new Error(
							`Only absolute redirects can have named outlets. redirectTo: '${t}'`
						)
					)
				);
			}
			class Av {
				constructor(t, e, n, r, s) {
					(this.configLoader = e),
						(this.urlSerializer = n),
						(this.urlTree = r),
						(this.config = s),
						(this.allowRedirects = !0),
						(this.ngModule = t.get(te));
				}
				apply() {
					return this.expandSegmentGroup(
						this.ngModule,
						this.config,
						this.urlTree.root,
						db
					)
						.pipe(
							k(t =>
								this.createUrlTree(
									t,
									this.urlTree.queryParams,
									this.urlTree.fragment
								)
							)
						)
						.pipe(
							_p(t => {
								if (t instanceof xv)
									return (
										(this.allowRedirects = !1),
										this.match(t.urlTree)
									);
								if (t instanceof Ev) throw this.noMatchError(t);
								throw t;
							})
						);
				}
				match(t) {
					return this.expandSegmentGroup(
						this.ngModule,
						this.config,
						t.root,
						db
					)
						.pipe(
							k(e =>
								this.createUrlTree(e, t.queryParams, t.fragment)
							)
						)
						.pipe(
							_p(t => {
								if (t instanceof Ev) throw this.noMatchError(t);
								throw t;
							})
						);
				}
				noMatchError(t) {
					return new Error(
						`Cannot match any routes. URL Segment: '${t.segmentGroup}'`
					);
				}
				createUrlTree(t, e, n) {
					const r =
						t.segments.length > 0 ? new Cb([], { [db]: t }) : t;
					return new xb(r, e, n);
				}
				expandSegmentGroup(t, e, n, r) {
					return 0 === n.segments.length && n.hasChildren()
						? this.expandChildren(t, e, n).pipe(
								k(t => new Cb([], t))
						  )
						: this.expandSegment(t, n, e, n.segments, r, !0);
				}
				expandChildren(t, e, n) {
					return (function (t, e) {
						if (0 === Object.keys(t).length) return Eu({});
						const n = [],
							r = [],
							s = {};
						return (
							wb(t, (t, i) => {
								const o = e(i, t).pipe(k(t => (s[i] = t)));
								i === db ? n.push(o) : r.push(o);
							}),
							Eu.apply(null, n.concat(r)).pipe(
								dh(),
								(function (t, e) {
									const n = arguments.length >= 2;
									return r =>
										r.pipe(
											t ? Mu((e, n) => t(e, n, r)) : y,
											M_(1),
											n ? H_(e) : z_(() => new L_())
										);
								})(),
								k(() => s)
							)
						);
					})(n.children, (n, r) =>
						this.expandSegmentGroup(t, e, r, n)
					);
				}
				expandSegment(t, e, n, r, s, i) {
					return Eu(...n).pipe(
						xp(o =>
							this.expandSegmentAgainstRoute(
								t,
								e,
								n,
								o,
								r,
								s,
								i
							).pipe(
								_p(t => {
									if (t instanceof Ev) return Eu(null);
									throw t;
								})
							)
						),
						K_(t => !!t),
						_p((t, n) => {
							if (t instanceof L_ || 'EmptyError' === t.name) {
								if (this.noLeftoversInUrl(e, r, s))
									return Eu(new Cb([], {}));
								throw new Ev(e);
							}
							throw t;
						})
					);
				}
				noLeftoversInUrl(t, e, n) {
					return 0 === e.length && !t.children[n];
				}
				expandSegmentAgainstRoute(t, e, n, r, s, i, o) {
					return Pv(r) !== i
						? Cv(e)
						: void 0 === r.redirectTo
						? this.matchSegmentAgainstRoute(t, e, r, s)
						: o && this.allowRedirects
						? this.expandSegmentAgainstRouteUsingRedirect(
								t,
								e,
								n,
								r,
								s,
								i
						  )
						: Cv(e);
				}
				expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
					return '**' === r.path
						? this.expandWildCardWithParamsAgainstRouteUsingRedirect(
								t,
								n,
								r,
								i
						  )
						: this.expandRegularSegmentAgainstRouteUsingRedirect(
								t,
								e,
								n,
								r,
								s,
								i
						  );
				}
				expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
					const s = this.applyRedirectCommands([], n.redirectTo, {});
					return n.redirectTo.startsWith('/')
						? kv(s)
						: this.lineralizeSegments(n, s).pipe(
								B(n => {
									const s = new Cb(n, {});
									return this.expandSegment(
										t,
										s,
										e,
										n,
										r,
										!1
									);
								})
						  );
				}
				expandRegularSegmentAgainstRouteUsingRedirect(
					t,
					e,
					n,
					r,
					s,
					i
				) {
					const {
						matched: o,
						consumedSegments: a,
						lastChild: l,
						positionalParamSegments: c,
					} = Iv(e, r, s);
					if (!o) return Cv(e);
					const u = this.applyRedirectCommands(a, r.redirectTo, c);
					return r.redirectTo.startsWith('/')
						? kv(u)
						: this.lineralizeSegments(r, u).pipe(
								B(r =>
									this.expandSegment(
										t,
										e,
										n,
										r.concat(s.slice(l)),
										i,
										!1
									)
								)
						  );
				}
				matchSegmentAgainstRoute(t, e, n, r) {
					if ('**' === n.path)
						return n.loadChildren
							? this.configLoader
									.load(t.injector, n)
									.pipe(
										k(
											t => (
												(n._loadedConfig = t),
												new Cb(r, {})
											)
										)
									)
							: Eu(new Cb(r, {}));
					const {
						matched: s,
						consumedSegments: i,
						lastChild: o,
					} = Iv(e, n, r);
					if (!s) return Cv(e);
					const a = r.slice(o);
					return this.getChildConfig(t, n, r).pipe(
						B(t => {
							const n = t.module,
								r = t.routes,
								{
									segmentGroup: s,
									slicedSegments: o,
								} = (function (t, e, n, r) {
									return n.length > 0 &&
										(function (t, e, n) {
											return n.some(
												n => Rv(t, e, n) && Pv(n) !== db
											);
										})(t, n, r)
										? {
												segmentGroup: Ov(
													new Cb(
														e,
														(function (t, e) {
															const n = {};
															n.primary = e;
															for (const r of t)
																'' === r.path &&
																	Pv(r) !==
																		db &&
																	(n[
																		Pv(r)
																	] = new Cb(
																		[],
																		{}
																	));
															return n;
														})(
															r,
															new Cb(
																n,
																t.children
															)
														)
													)
												),
												slicedSegments: [],
										  }
										: 0 === n.length &&
										  (function (t, e, n) {
												return n.some(n => Rv(t, e, n));
										  })(t, n, r)
										? {
												segmentGroup: Ov(
													new Cb(
														t.segments,
														(function (t, e, n, r) {
															const s = {};
															for (const i of n)
																Rv(t, e, i) &&
																	!r[Pv(i)] &&
																	(s[
																		Pv(i)
																	] = new Cb(
																		[],
																		{}
																	));
															return Object.assign(
																Object.assign(
																	{},
																	r
																),
																s
															);
														})(t, n, r, t.children)
													)
												),
												slicedSegments: n,
										  }
										: {
												segmentGroup: t,
												slicedSegments: n,
										  };
								})(e, i, a, r);
							return 0 === o.length && s.hasChildren()
								? this.expandChildren(n, r, s).pipe(
										k(t => new Cb(i, t))
								  )
								: 0 === r.length && 0 === o.length
								? Eu(new Cb(i, {}))
								: this.expandSegment(n, s, r, o, db, !0).pipe(
										k(
											t =>
												new Cb(
													i.concat(t.segments),
													t.children
												)
										)
								  );
						})
					);
				}
				getChildConfig(t, e, n) {
					return e.children
						? Eu(new _v(e.children, t))
						: e.loadChildren
						? void 0 !== e._loadedConfig
							? Eu(e._loadedConfig)
							: this.runCanLoadGuards(t.injector, e, n).pipe(
									B(n =>
										n
											? this.configLoader
													.load(t.injector, e)
													.pipe(
														k(
															t => (
																(e._loadedConfig = t),
																t
															)
														)
													)
											: (function (t) {
													return new _(e =>
														e.error(
															mb(
																`Cannot load children because the guard of the route "path: '${t.path}'" returned false`
															)
														)
													);
											  })(e)
									)
							  )
						: Eu(new _v([], t));
				}
				runCanLoadGuards(t, e, n) {
					const r = e.canLoad;
					return r && 0 !== r.length
						? Eu(
								r.map(r => {
									const s = t.get(r);
									let i;
									if (
										(function (t) {
											return t && bv(t.canLoad);
										})(s)
									)
										i = s.canLoad(e, n);
									else {
										if (!bv(s))
											throw new Error(
												'Invalid CanLoad guard'
											);
										i = s(e, n);
									}
									return Sb(i);
								})
						  ).pipe(
								Sv(),
								Cu(t => {
									if (!vv(t)) return;
									const e = mb(
										`Redirecting to "${this.urlSerializer.serialize(
											t
										)}"`
									);
									throw ((e.url = t), e);
								}),
								k(t => !0 === t)
						  )
						: Eu(!0);
				}
				lineralizeSegments(t, e) {
					let n = [],
						r = e.root;
					for (;;) {
						if (
							((n = n.concat(r.segments)),
							0 === r.numberOfChildren)
						)
							return Eu(n);
						if (r.numberOfChildren > 1 || !r.children.primary)
							return Tv(t.redirectTo);
						r = r.children.primary;
					}
				}
				applyRedirectCommands(t, e, n) {
					return this.applyRedirectCreatreUrlTree(
						e,
						this.urlSerializer.parse(e),
						t,
						n
					);
				}
				applyRedirectCreatreUrlTree(t, e, n, r) {
					const s = this.createSegmentGroup(t, e.root, n, r);
					return new xb(
						s,
						this.createQueryParams(
							e.queryParams,
							this.urlTree.queryParams
						),
						e.fragment
					);
				}
				createQueryParams(t, e) {
					const n = {};
					return (
						wb(t, (t, r) => {
							if ('string' == typeof t && t.startsWith(':')) {
								const s = t.substring(1);
								n[r] = e[s];
							} else n[r] = t;
						}),
						n
					);
				}
				createSegmentGroup(t, e, n, r) {
					const s = this.createSegments(t, e.segments, n, r);
					let i = {};
					return (
						wb(e.children, (e, s) => {
							i[s] = this.createSegmentGroup(t, e, n, r);
						}),
						new Cb(s, i)
					);
				}
				createSegments(t, e, n, r) {
					return e.map(e =>
						e.path.startsWith(':')
							? this.findPosParam(t, e, r)
							: this.findOrReturn(e, n)
					);
				}
				findPosParam(t, e, n) {
					const r = n[e.path.substring(1)];
					if (!r)
						throw new Error(
							`Cannot redirect to '${t}'. Cannot find '${e.path}'.`
						);
					return r;
				}
				findOrReturn(t, e) {
					let n = 0;
					for (const r of e) {
						if (r.path === t.path) return e.splice(n), r;
						n++;
					}
					return t;
				}
			}
			function Iv(t, e, n) {
				if ('' === e.path)
					return 'full' === e.pathMatch &&
						(t.hasChildren() || n.length > 0)
						? {
								matched: !1,
								consumedSegments: [],
								lastChild: 0,
								positionalParamSegments: {},
						  }
						: {
								matched: !0,
								consumedSegments: [],
								lastChild: 0,
								positionalParamSegments: {},
						  };
				const r = (e.matcher || gb)(n, t, e);
				return r
					? {
							matched: !0,
							consumedSegments: r.consumed,
							lastChild: r.consumed.length,
							positionalParamSegments: r.posParams,
					  }
					: {
							matched: !1,
							consumedSegments: [],
							lastChild: 0,
							positionalParamSegments: {},
					  };
			}
			function Ov(t) {
				if (1 === t.numberOfChildren && t.children.primary) {
					const e = t.children.primary;
					return new Cb(t.segments.concat(e.segments), e.children);
				}
				return t;
			}
			function Rv(t, e, n) {
				return (
					(!(t.hasChildren() || e.length > 0) ||
						'full' !== n.pathMatch) &&
					'' === n.path &&
					void 0 !== n.redirectTo
				);
			}
			function Pv(t) {
				return t.outlet || db;
			}
			class Nv {
				constructor(t) {
					(this.path = t),
						(this.route = this.path[this.path.length - 1]);
				}
			}
			class Lv {
				constructor(t, e) {
					(this.component = t), (this.route = e);
				}
			}
			function Dv(t, e, n) {
				const r = t._root;
				return (function t(
					e,
					n,
					r,
					s,
					i = { canDeactivateChecks: [], canActivateChecks: [] }
				) {
					const o = Kb(n);
					return (
						e.children.forEach(e => {
							!(function (
								e,
								n,
								r,
								s,
								i = {
									canDeactivateChecks: [],
									canActivateChecks: [],
								}
							) {
								const o = e.value,
									a = n ? n.value : null,
									l = r ? r.getContext(e.value.outlet) : null;
								if (a && o.routeConfig === a.routeConfig) {
									const c = (function (t, e, n) {
										if ('function' == typeof n)
											return n(t, e);
										switch (n) {
											case 'pathParamsChange':
												return !Tb(t.url, e.url);
											case 'pathParamsOrQueryParamsChange':
												return (
													!Tb(t.url, e.url) ||
													!yb(
														t.queryParams,
														e.queryParams
													)
												);
											case 'always':
												return !0;
											case 'paramsOrQueryParamsChange':
												return (
													!sv(t, e) ||
													!yb(
														t.queryParams,
														e.queryParams
													)
												);
											case 'paramsChange':
											default:
												return !sv(t, e);
										}
									})(
										a,
										o,
										o.routeConfig.runGuardsAndResolvers
									);
									c
										? i.canActivateChecks.push(new Nv(s))
										: ((o.data = a.data),
										  (o._resolvedData = a._resolvedData)),
										t(
											e,
											n,
											o.component
												? l
													? l.children
													: null
												: r,
											s,
											i
										),
										c &&
											l &&
											l.outlet &&
											l.outlet.isActivated &&
											i.canDeactivateChecks.push(
												new Lv(l.outlet.component, a)
											);
								} else
									a && Fv(n, l, i),
										i.canActivateChecks.push(new Nv(s)),
										t(
											e,
											null,
											o.component
												? l
													? l.children
													: null
												: r,
											s,
											i
										);
							})(e, o[e.value.outlet], r, s.concat([e.value]), i),
								delete o[e.value.outlet];
						}),
						wb(o, (t, e) => Fv(t, r.getContext(e), i)),
						i
					);
				})(r, e ? e._root : null, n, [r.value]);
			}
			function Mv(t, e, n) {
				const r = (function (t) {
					if (!t) return null;
					for (let e = t.parent; e; e = e.parent) {
						const t = e.routeConfig;
						if (t && t._loadedConfig) return t._loadedConfig;
					}
					return null;
				})(e);
				return (r ? r.module.injector : n).get(t);
			}
			function Fv(t, e, n) {
				const r = Kb(t),
					s = t.value;
				wb(r, (t, r) => {
					Fv(
						t,
						s.component ? (e ? e.children.getContext(r) : null) : e,
						n
					);
				}),
					n.canDeactivateChecks.push(
						new Lv(
							s.component && e && e.outlet && e.outlet.isActivated
								? e.outlet.component
								: null,
							s
						)
					);
			}
			function jv(t, e) {
				return null !== t && e && e(new cb(t)), Eu(!0);
			}
			function zv(t, e) {
				return null !== t && e && e(new ab(t)), Eu(!0);
			}
			function Bv(t, e, n) {
				const r = e.routeConfig ? e.routeConfig.canActivate : null;
				return r && 0 !== r.length
					? Eu(
							r.map(r =>
								D_(() => {
									const s = Mv(r, e, n);
									let i;
									if (
										(function (t) {
											return t && bv(t.canActivate);
										})(s)
									)
										i = Sb(s.canActivate(e, t));
									else {
										if (!bv(s))
											throw new Error(
												'Invalid CanActivate guard'
											);
										i = Sb(s(e, t));
									}
									return i.pipe(K_());
								})
							)
					  ).pipe(Sv())
					: Eu(!0);
			}
			function Uv(t, e, n) {
				const r = e[e.length - 1],
					s = e
						.slice(0, e.length - 1)
						.reverse()
						.map(t =>
							(function (t) {
								const e = t.routeConfig
									? t.routeConfig.canActivateChild
									: null;
								return e && 0 !== e.length
									? { node: t, guards: e }
									: null;
							})(t)
						)
						.filter(t => null !== t)
						.map(e =>
							D_(() =>
								Eu(
									e.guards.map(s => {
										const i = Mv(s, e.node, n);
										let o;
										if (
											(function (t) {
												return (
													t && bv(t.canActivateChild)
												);
											})(i)
										)
											o = Sb(i.canActivateChild(r, t));
										else {
											if (!bv(i))
												throw new Error(
													'Invalid CanActivateChild guard'
												);
											o = Sb(i(r, t));
										}
										return o.pipe(K_());
									})
								).pipe(Sv())
							)
						);
				return Eu(s).pipe(Sv());
			}
			class Vv {}
			class Hv {
				constructor(t, e, n, r, s, i) {
					(this.rootComponentType = t),
						(this.config = e),
						(this.urlTree = n),
						(this.url = r),
						(this.paramsInheritanceStrategy = s),
						(this.relativeLinkResolution = i);
				}
				recognize() {
					try {
						const t = Wv(
								this.urlTree.root,
								[],
								[],
								this.config,
								this.relativeLinkResolution
							).segmentGroup,
							e = this.processSegmentGroup(this.config, t, db),
							n = new Jb(
								[],
								Object.freeze({}),
								Object.freeze(
									Object.assign({}, this.urlTree.queryParams)
								),
								this.urlTree.fragment,
								{},
								db,
								this.rootComponentType,
								null,
								this.urlTree.root,
								-1,
								{}
							),
							r = new Qb(n, e),
							s = new tv(this.url, r);
						return this.inheritParamsAndData(s._root), Eu(s);
					} catch ($w) {
						return new _(e => e.error($w));
					}
				}
				inheritParamsAndData(t) {
					const e = t.value,
						n = Xb(e, this.paramsInheritanceStrategy);
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
					const n = Ab(e, (e, n) =>
						this.processSegmentGroup(t, e, n)
					);
					return (
						(function (t) {
							const e = {};
							t.forEach(t => {
								const n = e[t.value.outlet];
								if (n) {
									const e = n.url
											.map(t => t.toString())
											.join('/'),
										r = t.value.url
											.map(t => t.toString())
											.join('/');
									throw new Error(
										`Two segments cannot have the same outlet name: '${e}' and '${r}'.`
									);
								}
								e[t.value.outlet] = t.value;
							});
						})(n),
						n.sort((t, e) =>
							t.value.outlet === db
								? -1
								: e.value.outlet === db
								? 1
								: t.value.outlet.localeCompare(e.value.outlet)
						),
						n
					);
				}
				processSegment(t, e, n, r) {
					for (const s of t)
						try {
							return this.processSegmentAgainstRoute(s, e, n, r);
						} catch ($w) {
							if (!($w instanceof Vv)) throw $w;
						}
					if (this.noLeftoversInUrl(e, n, r)) return [];
					throw new Vv();
				}
				noLeftoversInUrl(t, e, n) {
					return 0 === e.length && !t.children[n];
				}
				processSegmentAgainstRoute(t, e, n, r) {
					if (t.redirectTo) throw new Vv();
					if ((t.outlet || db) !== r) throw new Vv();
					let s,
						i = [],
						o = [];
					if ('**' === t.path) {
						const i = n.length > 0 ? vb(n).parameters : {};
						s = new Jb(
							n,
							i,
							Object.freeze(
								Object.assign({}, this.urlTree.queryParams)
							),
							this.urlTree.fragment,
							Gv(t),
							r,
							t.component,
							t,
							$v(e),
							qv(e) + n.length,
							Zv(t)
						);
					} else {
						const a = (function (t, e, n) {
							if ('' === e.path) {
								if (
									'full' === e.pathMatch &&
									(t.hasChildren() || n.length > 0)
								)
									throw new Vv();
								return {
									consumedSegments: [],
									lastChild: 0,
									parameters: {},
								};
							}
							const r = (e.matcher || gb)(n, t, e);
							if (!r) throw new Vv();
							const s = {};
							wb(r.posParams, (t, e) => {
								s[e] = t.path;
							});
							const i =
								r.consumed.length > 0
									? Object.assign(
											Object.assign({}, s),
											r.consumed[r.consumed.length - 1]
												.parameters
									  )
									: s;
							return {
								consumedSegments: r.consumed,
								lastChild: r.consumed.length,
								parameters: i,
							};
						})(e, t, n);
						(i = a.consumedSegments),
							(o = n.slice(a.lastChild)),
							(s = new Jb(
								i,
								a.parameters,
								Object.freeze(
									Object.assign({}, this.urlTree.queryParams)
								),
								this.urlTree.fragment,
								Gv(t),
								r,
								t.component,
								t,
								$v(e),
								qv(e) + i.length,
								Zv(t)
							));
					}
					const a = (function (t) {
							return t.children
								? t.children
								: t.loadChildren
								? t._loadedConfig.routes
								: [];
						})(t),
						{ segmentGroup: l, slicedSegments: c } = Wv(
							e,
							i,
							o,
							a,
							this.relativeLinkResolution
						);
					if (0 === c.length && l.hasChildren()) {
						const t = this.processChildren(a, l);
						return [new Qb(s, t)];
					}
					if (0 === a.length && 0 === c.length)
						return [new Qb(s, [])];
					const u = this.processSegment(a, l, c, db);
					return [new Qb(s, u)];
				}
			}
			function $v(t) {
				let e = t;
				for (; e._sourceSegment; ) e = e._sourceSegment;
				return e;
			}
			function qv(t) {
				let e = t,
					n = e._segmentIndexShift ? e._segmentIndexShift : 0;
				for (; e._sourceSegment; )
					(e = e._sourceSegment),
						(n += e._segmentIndexShift ? e._segmentIndexShift : 0);
				return n - 1;
			}
			function Wv(t, e, n, r, s) {
				if (
					n.length > 0 &&
					(function (t, e, n) {
						return n.some(n => Qv(t, e, n) && Kv(n) !== db);
					})(t, n, r)
				) {
					const s = new Cb(
						e,
						(function (t, e, n, r) {
							const s = {};
							(s.primary = r),
								(r._sourceSegment = t),
								(r._segmentIndexShift = e.length);
							for (const i of n)
								if ('' === i.path && Kv(i) !== db) {
									const n = new Cb([], {});
									(n._sourceSegment = t),
										(n._segmentIndexShift = e.length),
										(s[Kv(i)] = n);
								}
							return s;
						})(t, e, r, new Cb(n, t.children))
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
						return n.some(n => Qv(t, e, n));
					})(t, n, r)
				) {
					const i = new Cb(
						t.segments,
						(function (t, e, n, r, s, i) {
							const o = {};
							for (const a of r)
								if (Qv(t, n, a) && !s[Kv(a)]) {
									const n = new Cb([], {});
									(n._sourceSegment = t),
										(n._segmentIndexShift =
											'legacy' === i
												? t.segments.length
												: e.length),
										(o[Kv(a)] = n);
								}
							return Object.assign(Object.assign({}, s), o);
						})(t, e, n, r, t.children, s)
					);
					return (
						(i._sourceSegment = t),
						(i._segmentIndexShift = e.length),
						{ segmentGroup: i, slicedSegments: n }
					);
				}
				const i = new Cb(t.segments, t.children);
				return (
					(i._sourceSegment = t),
					(i._segmentIndexShift = e.length),
					{ segmentGroup: i, slicedSegments: n }
				);
			}
			function Qv(t, e, n) {
				return (
					(!(t.hasChildren() || e.length > 0) ||
						'full' !== n.pathMatch) &&
					'' === n.path &&
					void 0 === n.redirectTo
				);
			}
			function Kv(t) {
				return t.outlet || db;
			}
			function Gv(t) {
				return t.data || {};
			}
			function Zv(t) {
				return t.resolve || {};
			}
			function Yv(t) {
				return function (e) {
					return e.pipe(
						ym(e => {
							const n = t(e);
							return n ? M(n).pipe(k(() => e)) : M([e]);
						})
					);
				};
			}
			class Xv extends class {
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
			let Jv = (() => {
				class t {}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)();
					}),
					(t.ɵcmp = pe({
						type: t,
						selectors: [['ng-component']],
						decls: 1,
						vars: 0,
						template: function (t, e) {
							1 & t && wo(0, 'router-outlet');
						},
						directives: function () {
							return [fw];
						},
						encapsulation: 2,
					})),
					t
				);
			})();
			function tw(t, e = '') {
				for (let n = 0; n < t.length; n++) {
					const r = t[n];
					ew(r, nw(e, r));
				}
			}
			function ew(t, e) {
				if (!t)
					throw new Error(
						`\n      Invalid configuration of route '${e}': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    `
					);
				if (Array.isArray(t))
					throw new Error(
						`Invalid configuration of route '${e}': Array cannot be specified`
					);
				if (
					!t.component &&
					!t.children &&
					!t.loadChildren &&
					t.outlet &&
					t.outlet !== db
				)
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
					throw new Error(
						`Invalid configuration of route '${e}': path and matcher cannot be used together`
					);
				if (
					void 0 === t.redirectTo &&
					!t.component &&
					!t.children &&
					!t.loadChildren
				)
					throw new Error(
						`Invalid configuration of route '${e}'. One of the following must be provided: component, redirectTo, children or loadChildren`
					);
				if (void 0 === t.path && void 0 === t.matcher)
					throw new Error(
						`Invalid configuration of route '${e}': routes must have either a path or a matcher specified`
					);
				if ('string' == typeof t.path && '/' === t.path.charAt(0))
					throw new Error(
						`Invalid configuration of route '${e}': path cannot start with a slash`
					);
				if (
					'' === t.path &&
					void 0 !== t.redirectTo &&
					void 0 === t.pathMatch
				)
					throw new Error(
						`Invalid configuration of route '{path: "${e}", redirectTo: "${t.redirectTo}"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`
					);
				if (
					void 0 !== t.pathMatch &&
					'full' !== t.pathMatch &&
					'prefix' !== t.pathMatch
				)
					throw new Error(
						`Invalid configuration of route '${e}': pathMatch can only be set to 'prefix' or 'full'`
					);
				t.children && tw(t.children, e);
			}
			function nw(t, e) {
				return e
					? t || e.path
						? t && !e.path
							? t + '/'
							: !t && e.path
							? e.path
							: `${t}/${e.path}`
						: ''
					: t;
			}
			function rw(t) {
				const e = t.children && t.children.map(rw),
					n = e
						? Object.assign(Object.assign({}, t), { children: e })
						: Object.assign({}, t);
				return (
					!n.component &&
						(e || n.loadChildren) &&
						n.outlet &&
						n.outlet !== db &&
						(n.component = Jv),
					n
				);
			}
			const sw = new jt('ROUTES');
			class iw {
				constructor(t, e, n, r) {
					(this.loader = t),
						(this.compiler = e),
						(this.onLoadStartListener = n),
						(this.onLoadEndListener = r);
				}
				load(t, e) {
					return (
						this.onLoadStartListener && this.onLoadStartListener(e),
						this.loadModuleFactory(e.loadChildren).pipe(
							k(n => {
								this.onLoadEndListener &&
									this.onLoadEndListener(e);
								const r = n.create(t);
								return new _v(
									bb(r.injector.get(sw)).map(rw),
									r
								);
							})
						)
					);
				}
				loadModuleFactory(t) {
					return 'string' == typeof t
						? M(this.loader.load(t))
						: Sb(t()).pipe(
								B(t =>
									t instanceof ee
										? Eu(t)
										: M(this.compiler.compileModuleAsync(t))
								)
						  );
				}
			}
			class ow {
				constructor() {
					(this.outlet = null),
						(this.route = null),
						(this.resolver = null),
						(this.children = new aw()),
						(this.attachRef = null);
				}
			}
			class aw {
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
					return e || ((e = new ow()), this.contexts.set(t, e)), e;
				}
				getContext(t) {
					return this.contexts.get(t) || null;
				}
			}
			class lw {
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
			function cw(t) {
				throw t;
			}
			function uw(t, e, n) {
				return e.parse('/');
			}
			function hw(t, e) {
				return Eu(null);
			}
			let dw = (() => {
					class t {
						constructor(t, e, n, r, s, i, o, a) {
							(this.rootComponentType = t),
								(this.urlSerializer = e),
								(this.rootContexts = n),
								(this.location = r),
								(this.config = a),
								(this.lastSuccessfulNavigation = null),
								(this.currentNavigation = null),
								(this.lastLocationChangeInfo = null),
								(this.navigationId = 0),
								(this.isNgZoneEnabled = !1),
								(this.events = new E()),
								(this.errorHandler = cw),
								(this.malformedUriErrorHandler = uw),
								(this.navigated = !1),
								(this.lastSuccessfulId = -1),
								(this.hooks = {
									beforePreactivation: hw,
									afterPreactivation: hw,
								}),
								(this.urlHandlingStrategy = new lw()),
								(this.routeReuseStrategy = new Xv()),
								(this.onSameUrlNavigation = 'ignore'),
								(this.paramsInheritanceStrategy = 'emptyOnly'),
								(this.urlUpdateStrategy = 'deferred'),
								(this.relativeLinkResolution = 'legacy'),
								(this.ngModule = s.get(te)),
								(this.console = s.get(_l));
							const l = s.get(Rl);
							(this.isNgZoneEnabled = l instanceof Rl),
								this.resetConfig(a),
								(this.currentUrlTree = new xb(
									new Cb([], {}),
									{},
									null
								)),
								(this.rawUrlTree = this.currentUrlTree),
								(this.browserUrlTree = this.currentUrlTree),
								(this.configLoader = new iw(
									i,
									o,
									t => this.triggerEvent(new ib(t)),
									t => this.triggerEvent(new ob(t))
								)),
								(this.routerState = Zb(
									this.currentUrlTree,
									this.rootComponentType
								)),
								(this.transitions = new mm({
									id: 0,
									currentUrlTree: this.currentUrlTree,
									currentRawUrl: this.currentUrlTree,
									extractedUrl: this.urlHandlingStrategy.extract(
										this.currentUrlTree
									),
									urlAfterRedirects: this.urlHandlingStrategy.extract(
										this.currentUrlTree
									),
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
									guards: {
										canActivateChecks: [],
										canDeactivateChecks: [],
									},
									guardsResult: null,
								})),
								(this.navigations = this.setupNavigations(
									this.transitions
								)),
								this.processNavigations();
						}
						setupNavigations(t) {
							const e = this.events;
							return t.pipe(
								Mu(t => 0 !== t.id),
								k(t =>
									Object.assign(Object.assign({}, t), {
										extractedUrl: this.urlHandlingStrategy.extract(
											t.rawUrl
										),
									})
								),
								ym(t => {
									let n = !1,
										r = !1;
									return Eu(t).pipe(
										Cu(t => {
											this.currentNavigation = {
												id: t.id,
												initialUrl: t.currentRawUrl,
												extractedUrl: t.extractedUrl,
												trigger: t.source,
												extras: t.extras,
												previousNavigation: this
													.lastSuccessfulNavigation
													? Object.assign(
															Object.assign(
																{},
																this
																	.lastSuccessfulNavigation
															),
															{
																previousNavigation: null,
															}
													  )
													: null,
											};
										}),
										ym(t => {
											const n =
												!this.navigated ||
												t.extractedUrl.toString() !==
													this.browserUrlTree.toString();
											if (
												('reload' ===
													this.onSameUrlNavigation ||
													n) &&
												this.urlHandlingStrategy.shouldProcessUrl(
													t.rawUrl
												)
											)
												return Eu(t).pipe(
													ym(t => {
														const n = this.transitions.getValue();
														return (
															e.next(
																new Z_(
																	t.id,
																	this.serializeUrl(
																		t.extractedUrl
																	),
																	t.source,
																	t.restoredState
																)
															),
															n !==
															this.transitions.getValue()
																? Bu
																: [t]
														);
													}),
													ym(t => Promise.resolve(t)),
													((r = this.ngModule
														.injector),
													(s = this.configLoader),
													(i = this.urlSerializer),
													(o = this.config),
													function (t) {
														return t.pipe(
															ym(t =>
																(function (
																	t,
																	e,
																	n,
																	r,
																	s
																) {
																	return new Av(
																		t,
																		e,
																		n,
																		r,
																		s
																	).apply();
																})(
																	r,
																	s,
																	i,
																	t.extractedUrl,
																	o
																).pipe(
																	k(e =>
																		Object.assign(
																			Object.assign(
																				{},
																				t
																			),
																			{
																				urlAfterRedirects: e,
																			}
																		)
																	)
																)
															)
														);
													}),
													Cu(t => {
														this.currentNavigation = Object.assign(
															Object.assign(
																{},
																this
																	.currentNavigation
															),
															{
																finalUrl:
																	t.urlAfterRedirects,
															}
														);
													}),
													(function (t, e, n, r, s) {
														return function (i) {
															return i.pipe(
																B(i =>
																	(function (
																		t,
																		e,
																		n,
																		r,
																		s = 'emptyOnly',
																		i = 'legacy'
																	) {
																		return new Hv(
																			t,
																			e,
																			n,
																			r,
																			s,
																			i
																		).recognize();
																	})(
																		t,
																		e,
																		i.urlAfterRedirects,
																		n(
																			i.urlAfterRedirects
																		),
																		r,
																		s
																	).pipe(
																		k(t =>
																			Object.assign(
																				Object.assign(
																					{},
																					i
																				),
																				{
																					targetSnapshot: t,
																				}
																			)
																		)
																	)
																)
															);
														};
													})(
														this.rootComponentType,
														this.config,
														t =>
															this.serializeUrl(
																t
															),
														this
															.paramsInheritanceStrategy,
														this
															.relativeLinkResolution
													),
													Cu(t => {
														'eager' ===
															this
																.urlUpdateStrategy &&
															(t.extras
																.skipLocationChange ||
																this.setBrowserUrl(
																	t.urlAfterRedirects,
																	!!t.extras
																		.replaceUrl,
																	t.id,
																	t.extras
																		.state
																),
															(this.browserUrlTree =
																t.urlAfterRedirects));
													}),
													Cu(t => {
														const n = new tb(
															t.id,
															this.serializeUrl(
																t.extractedUrl
															),
															this.serializeUrl(
																t.urlAfterRedirects
															),
															t.targetSnapshot
														);
														e.next(n);
													})
												);
											var r, s, i, o;
											if (
												n &&
												this.rawUrlTree &&
												this.urlHandlingStrategy.shouldProcessUrl(
													this.rawUrlTree
												)
											) {
												const {
														id: n,
														extractedUrl: r,
														source: s,
														restoredState: i,
														extras: o,
													} = t,
													a = new Z_(
														n,
														this.serializeUrl(r),
														s,
														i
													);
												e.next(a);
												const l = Zb(
													r,
													this.rootComponentType
												).snapshot;
												return Eu(
													Object.assign(
														Object.assign({}, t),
														{
															targetSnapshot: l,
															urlAfterRedirects: r,
															extras: Object.assign(
																Object.assign(
																	{},
																	o
																),
																{
																	skipLocationChange: !1,
																	replaceUrl: !1,
																}
															),
														}
													)
												);
											}
											return (
												(this.rawUrlTree = t.rawUrl),
												(this.browserUrlTree =
													t.urlAfterRedirects),
												t.resolve(null),
												Bu
											);
										}),
										Yv(t => {
											const {
												targetSnapshot: e,
												id: n,
												extractedUrl: r,
												rawUrl: s,
												extras: {
													skipLocationChange: i,
													replaceUrl: o,
												},
											} = t;
											return this.hooks.beforePreactivation(
												e,
												{
													navigationId: n,
													appliedUrlTree: r,
													rawUrlTree: s,
													skipLocationChange: !!i,
													replaceUrl: !!o,
												}
											);
										}),
										Cu(t => {
											const e = new eb(
												t.id,
												this.serializeUrl(
													t.extractedUrl
												),
												this.serializeUrl(
													t.urlAfterRedirects
												),
												t.targetSnapshot
											);
											this.triggerEvent(e);
										}),
										k(t =>
											Object.assign(
												Object.assign({}, t),
												{
													guards: Dv(
														t.targetSnapshot,
														t.currentSnapshot,
														this.rootContexts
													),
												}
											)
										),
										(function (t, e) {
											return function (n) {
												return n.pipe(
													B(n => {
														const {
															targetSnapshot: r,
															currentSnapshot: s,
															guards: {
																canActivateChecks: i,
																canDeactivateChecks: o,
															},
														} = n;
														return 0 === o.length &&
															0 === i.length
															? Eu(
																	Object.assign(
																		Object.assign(
																			{},
																			n
																		),
																		{
																			guardsResult: !0,
																		}
																	)
															  )
															: (function (
																	t,
																	e,
																	n,
																	r
															  ) {
																	return M(
																		t
																	).pipe(
																		B(t =>
																			(function (
																				t,
																				e,
																				n,
																				r,
																				s
																			) {
																				const i =
																					e &&
																					e.routeConfig
																						? e
																								.routeConfig
																								.canDeactivate
																						: null;
																				return i &&
																					0 !==
																						i.length
																					? Eu(
																							i.map(
																								i => {
																									const o = Mv(
																										i,
																										e,
																										s
																									);
																									let a;
																									if (
																										(function (
																											t
																										) {
																											return (
																												t &&
																												bv(
																													t.canDeactivate
																												)
																											);
																										})(
																											o
																										)
																									)
																										a = Sb(
																											o.canDeactivate(
																												t,
																												e,
																												n,
																												r
																											)
																										);
																									else {
																										if (
																											!bv(
																												o
																											)
																										)
																											throw new Error(
																												'Invalid CanDeactivate guard'
																											);
																										a = Sb(
																											o(
																												t,
																												e,
																												n,
																												r
																											)
																										);
																									}
																									return a.pipe(
																										K_()
																									);
																								}
																							)
																					  ).pipe(
																							Sv()
																					  )
																					: Eu(
																							!0
																					  );
																			})(
																				t.component,
																				t.route,
																				n,
																				e,
																				r
																			)
																		),
																		K_(
																			t =>
																				!0 !==
																				t,
																			!0
																		)
																	);
															  })(
																	o,
																	r,
																	s,
																	t
															  ).pipe(
																	B(n =>
																		n &&
																		'boolean' ==
																			typeof n
																			? (function (
																					t,
																					e,
																					n,
																					r
																			  ) {
																					return M(
																						e
																					).pipe(
																						xp(
																							e =>
																								M(
																									[
																										zv(
																											e
																												.route
																												.parent,
																											r
																										),
																										jv(
																											e.route,
																											r
																										),
																										Uv(
																											t,
																											e.path,
																											n
																										),
																										Bv(
																											t,
																											e.route,
																											n
																										),
																									]
																								).pipe(
																									dh(),
																									K_(
																										t =>
																											!0 !==
																											t,
																										!0
																									)
																								)
																						),
																						K_(
																							t =>
																								!0 !==
																								t,
																							!0
																						)
																					);
																			  })(
																					r,
																					i,
																					t,
																					e
																			  )
																			: Eu(
																					n
																			  )
																	),
																	k(t =>
																		Object.assign(
																			Object.assign(
																				{},
																				n
																			),
																			{
																				guardsResult: t,
																			}
																		)
																	)
															  );
													})
												);
											};
										})(this.ngModule.injector, t =>
											this.triggerEvent(t)
										),
										Cu(t => {
											if (vv(t.guardsResult)) {
												const e = mb(
													`Redirecting to "${this.serializeUrl(
														t.guardsResult
													)}"`
												);
												throw (
													((e.url = t.guardsResult),
													e)
												);
											}
										}),
										Cu(t => {
											const e = new nb(
												t.id,
												this.serializeUrl(
													t.extractedUrl
												),
												this.serializeUrl(
													t.urlAfterRedirects
												),
												t.targetSnapshot,
												!!t.guardsResult
											);
											this.triggerEvent(e);
										}),
										Mu(t => {
											if (!t.guardsResult) {
												this.resetUrlToCurrentUrlTree();
												const n = new X_(
													t.id,
													this.serializeUrl(
														t.extractedUrl
													),
													''
												);
												return (
													e.next(n), t.resolve(!1), !1
												);
											}
											return !0;
										}),
										Yv(t => {
											if (
												t.guards.canActivateChecks
													.length
											)
												return Eu(t).pipe(
													Cu(t => {
														const e = new rb(
															t.id,
															this.serializeUrl(
																t.extractedUrl
															),
															this.serializeUrl(
																t.urlAfterRedirects
															),
															t.targetSnapshot
														);
														this.triggerEvent(e);
													}),
													ym(t => {
														let n = !1;
														return Eu(t).pipe(
															((r = this
																.paramsInheritanceStrategy),
															(s = this.ngModule
																.injector),
															function (t) {
																return t.pipe(
																	B(t => {
																		const {
																			targetSnapshot: e,
																			guards: {
																				canActivateChecks: n,
																			},
																		} = t;
																		if (
																			!n.length
																		)
																			return Eu(
																				t
																			);
																		let i = 0;
																		return M(
																			n
																		).pipe(
																			xp(
																				t =>
																					(function (
																						t,
																						e,
																						n,
																						r
																					) {
																						return (function (
																							t,
																							e,
																							n,
																							r
																						) {
																							const s = Object.keys(
																								t
																							);
																							if (
																								0 ===
																								s.length
																							)
																								return Eu(
																									{}
																								);
																							const i = {};
																							return M(
																								s
																							).pipe(
																								B(
																									s =>
																										(function (
																											t,
																											e,
																											n,
																											r
																										) {
																											const s = Mv(
																												t,
																												e,
																												r
																											);
																											return Sb(
																												s.resolve
																													? s.resolve(
																															e,
																															n
																													  )
																													: s(
																															e,
																															n
																													  )
																											);
																										})(
																											t[
																												s
																											],
																											e,
																											n,
																											r
																										).pipe(
																											Cu(
																												t => {
																													i[
																														s
																													] = t;
																												}
																											)
																										)
																								),
																								M_(
																									1
																								),
																								B(
																									() =>
																										Object.keys(
																											i
																										)
																											.length ===
																										s.length
																											? Eu(
																													i
																											  )
																											: Bu
																								)
																							);
																						})(
																							t._resolve,
																							t,
																							e,
																							r
																						).pipe(
																							k(
																								e => (
																									(t._resolvedData = e),
																									(t.data = Object.assign(
																										Object.assign(
																											{},
																											t.data
																										),
																										Xb(
																											t,
																											n
																										)
																											.resolve
																									)),
																									null
																								)
																							)
																						);
																					})(
																						t.route,
																						e,
																						r,
																						s
																					)
																			),
																			Cu(
																				() =>
																					i++
																			),
																			M_(
																				1
																			),
																			B(
																				e =>
																					i ===
																					n.length
																						? Eu(
																								t
																						  )
																						: Bu
																			)
																		);
																	})
																);
															}),
															Cu({
																next: () =>
																	(n = !0),
																complete: () => {
																	if (!n) {
																		const n = new X_(
																			t.id,
																			this.serializeUrl(
																				t.extractedUrl
																			),
																			"At least one route resolver didn't emit any value."
																		);
																		e.next(
																			n
																		),
																			t.resolve(
																				!1
																			);
																	}
																},
															})
														);
														var r, s;
													}),
													Cu(t => {
														const e = new sb(
															t.id,
															this.serializeUrl(
																t.extractedUrl
															),
															this.serializeUrl(
																t.urlAfterRedirects
															),
															t.targetSnapshot
														);
														this.triggerEvent(e);
													})
												);
										}),
										Yv(t => {
											const {
												targetSnapshot: e,
												id: n,
												extractedUrl: r,
												rawUrl: s,
												extras: {
													skipLocationChange: i,
													replaceUrl: o,
												},
											} = t;
											return this.hooks.afterPreactivation(
												e,
												{
													navigationId: n,
													appliedUrlTree: r,
													rawUrlTree: s,
													skipLocationChange: !!i,
													replaceUrl: !!o,
												}
											);
										}),
										k(t => {
											const e = (function (t, e, n) {
												const r = (function t(e, n, r) {
													if (
														r &&
														e.shouldReuseRoute(
															n.value,
															r.value.snapshot
														)
													) {
														const s = r.value;
														s._futureSnapshot =
															n.value;
														const i = (function (
															e,
															n,
															r
														) {
															return n.children.map(
																n => {
																	for (const s of r.children)
																		if (
																			e.shouldReuseRoute(
																				s
																					.value
																					.snapshot,
																				n.value
																			)
																		)
																			return t(
																				e,
																				n,
																				s
																			);
																	return t(
																		e,
																		n
																	);
																}
															);
														})(e, n, r);
														return new Qb(s, i);
													}
													{
														const r = e.retrieve(
															n.value
														);
														if (r) {
															const t = r.route;
															return (
																(function t(
																	e,
																	n
																) {
																	if (
																		e.value
																			.routeConfig !==
																		n.value
																			.routeConfig
																	)
																		throw new Error(
																			'Cannot reattach ActivatedRouteSnapshot created from a different route'
																		);
																	if (
																		e
																			.children
																			.length !==
																		n
																			.children
																			.length
																	)
																		throw new Error(
																			'Cannot reattach ActivatedRouteSnapshot with a different number of children'
																		);
																	n.value._futureSnapshot =
																		e.value;
																	for (
																		let r = 0;
																		r <
																		e
																			.children
																			.length;
																		++r
																	)
																		t(
																			e
																				.children[
																				r
																			],
																			n
																				.children[
																				r
																			]
																		);
																})(n, t),
																t
															);
														}
														{
															const r = new Yb(
																	new mm(
																		(s =
																			n.value).url
																	),
																	new mm(
																		s.params
																	),
																	new mm(
																		s.queryParams
																	),
																	new mm(
																		s.fragment
																	),
																	new mm(
																		s.data
																	),
																	s.outlet,
																	s.component,
																	s
																),
																i = n.children.map(
																	n => t(e, n)
																);
															return new Qb(r, i);
														}
													}
													var s;
												})(
													t,
													e._root,
													n ? n._root : void 0
												);
												return new Gb(r, e);
											})(
												this.routeReuseStrategy,
												t.targetSnapshot,
												t.currentRouterState
											);
											return Object.assign(
												Object.assign({}, t),
												{ targetRouterState: e }
											);
										}),
										Cu(t => {
											(this.currentUrlTree =
												t.urlAfterRedirects),
												(this.rawUrlTree = this.urlHandlingStrategy.merge(
													this.currentUrlTree,
													t.rawUrl
												)),
												(this.routerState =
													t.targetRouterState),
												'deferred' ===
													this.urlUpdateStrategy &&
													(t.extras
														.skipLocationChange ||
														this.setBrowserUrl(
															this.rawUrlTree,
															!!t.extras
																.replaceUrl,
															t.id,
															t.extras.state
														),
													(this.browserUrlTree =
														t.urlAfterRedirects));
										}),
										((s = this.rootContexts),
										(i = this.routeReuseStrategy),
										(o = t => this.triggerEvent(t)),
										k(
											t => (
												new gv(
													i,
													t.targetRouterState,
													t.currentRouterState,
													o
												).activate(s),
												t
											)
										)),
										Cu({
											next() {
												n = !0;
											},
											complete() {
												n = !0;
											},
										}),
										wp(() => {
											if (!n && !r) {
												this.resetUrlToCurrentUrlTree();
												const n = new X_(
													t.id,
													this.serializeUrl(
														t.extractedUrl
													),
													`Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`
												);
												e.next(n), t.resolve(!1);
											}
											this.currentNavigation = null;
										}),
										_p(n => {
											if (
												((r = !0),
												(s = n) &&
													s.ngNavigationCancelingError)
											) {
												const r = vv(n.url);
												r ||
													((this.navigated = !0),
													this.resetStateAndUrl(
														t.currentRouterState,
														t.currentUrlTree,
														t.rawUrl
													));
												const s = new X_(
													t.id,
													this.serializeUrl(
														t.extractedUrl
													),
													n.message
												);
												e.next(s),
													r
														? setTimeout(() => {
																const e = this.urlHandlingStrategy.merge(
																	n.url,
																	this
																		.rawUrlTree
																);
																return this.scheduleNavigation(
																	e,
																	'imperative',
																	null,
																	{
																		skipLocationChange:
																			t
																				.extras
																				.skipLocationChange,
																		replaceUrl:
																			'eager' ===
																			this
																				.urlUpdateStrategy,
																	},
																	{
																		resolve:
																			t.resolve,
																		reject:
																			t.reject,
																		promise:
																			t.promise,
																	}
																);
														  }, 0)
														: t.resolve(!1);
											} else {
												this.resetStateAndUrl(
													t.currentRouterState,
													t.currentUrlTree,
													t.rawUrl
												);
												const r = new J_(
													t.id,
													this.serializeUrl(
														t.extractedUrl
													),
													n
												);
												e.next(r);
												try {
													t.resolve(
														this.errorHandler(n)
													);
												} catch (i) {
													t.reject(i);
												}
											}
											var s;
											return Bu;
										})
									);
									var s, i, o;
								})
							);
						}
						resetRootComponentType(t) {
							(this.rootComponentType = t),
								(this.routerState.root.component = this.rootComponentType);
						}
						getTransition() {
							const t = this.transitions.value;
							return (
								(t.urlAfterRedirects = this.browserUrlTree), t
							);
						}
						setTransition(t) {
							this.transitions.next(
								Object.assign(
									Object.assign({}, this.getTransition()),
									t
								)
							);
						}
						initialNavigation() {
							this.setUpLocationChangeListener(),
								0 === this.navigationId &&
									this.navigateByUrl(this.location.path(!0), {
										replaceUrl: !0,
									});
						}
						setUpLocationChangeListener() {
							this.locationSubscription ||
								(this.locationSubscription = this.location.subscribe(
									t => {
										const e = this.extractLocationChangeInfoFromEvent(
											t
										);
										this.shouldScheduleNavigation(
											this.lastLocationChangeInfo,
											e
										) &&
											setTimeout(() => {
												const {
														source: t,
														state: n,
														urlTree: r,
													} = e,
													s = { replaceUrl: !0 };
												if (n) {
													const t = Object.assign(
														{},
														n
													);
													delete t.navigationId,
														0 !==
															Object.keys(t)
																.length &&
															(s.state = t);
												}
												this.scheduleNavigation(
													r,
													t,
													n,
													s
												);
											}, 0),
											(this.lastLocationChangeInfo = e);
									}
								));
						}
						extractLocationChangeInfoFromEvent(t) {
							var e;
							return {
								source:
									'popstate' === t.type
										? 'popstate'
										: 'hashchange',
								urlTree: this.parseUrl(t.url),
								state: (
									null === (e = t.state) || void 0 === e
										? void 0
										: e.navigationId
								)
									? t.state
									: null,
								transitionId: this.getTransition().id,
							};
						}
						shouldScheduleNavigation(t, e) {
							if (!t) return !0;
							const n =
								e.urlTree.toString() === t.urlTree.toString();
							return !(
								e.transitionId === t.transitionId &&
								n &&
								(('hashchange' === e.source &&
									'popstate' === t.source) ||
									('popstate' === e.source &&
										'hashchange' === t.source))
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
							tw(t),
								(this.config = t.map(rw)),
								(this.navigated = !1),
								(this.lastSuccessfulId = -1);
						}
						ngOnDestroy() {
							this.dispose();
						}
						dispose() {
							this.locationSubscription &&
								(this.locationSubscription.unsubscribe(),
								(this.locationSubscription = void 0));
						}
						createUrlTree(t, e = {}) {
							const {
								relativeTo: n,
								queryParams: r,
								fragment: s,
								preserveQueryParams: i,
								queryParamsHandling: o,
								preserveFragment: a,
							} = e;
							kr() &&
								i &&
								console &&
								console.warn &&
								console.warn(
									'preserveQueryParams is deprecated, use queryParamsHandling instead.'
								);
							const l = n || this.routerState.root,
								c = a ? this.currentUrlTree.fragment : s;
							let u = null;
							if (o)
								switch (o) {
									case 'merge':
										u = Object.assign(
											Object.assign(
												{},
												this.currentUrlTree.queryParams
											),
											r
										);
										break;
									case 'preserve':
										u = this.currentUrlTree.queryParams;
										break;
									default:
										u = r || null;
								}
							else
								u = i
									? this.currentUrlTree.queryParams
									: r || null;
							return (
								null !== u && (u = this.removeEmptyProps(u)),
								(function (t, e, n, r, s) {
									if (0 === n.length)
										return ov(e.root, e.root, e, r, s);
									const i = (function (t) {
										if (
											'string' == typeof t[0] &&
											1 === t.length &&
											'/' === t[0]
										)
											return new av(!0, 0, t);
										let e = 0,
											n = !1;
										const r = t.reduce((t, r, s) => {
											if (
												'object' == typeof r &&
												null != r
											) {
												if (r.outlets) {
													const e = {};
													return (
														wb(
															r.outlets,
															(t, n) => {
																e[n] =
																	'string' ==
																	typeof t
																		? t.split(
																				'/'
																		  )
																		: t;
															}
														),
														[...t, { outlets: e }]
													);
												}
												if (r.segmentPath)
													return [
														...t,
														r.segmentPath,
													];
											}
											return 'string' != typeof r
												? [...t, r]
												: 0 === s
												? (r
														.split('/')
														.forEach((r, s) => {
															(0 == s &&
																'.' === r) ||
																(0 == s &&
																'' === r
																	? (n = !0)
																	: '..' === r
																	? e++
																	: '' != r &&
																	  t.push(
																			r
																	  ));
														}),
												  t)
												: [...t, r];
										}, []);
										return new av(n, e, r);
									})(n);
									if (i.toRoot())
										return ov(
											e.root,
											new Cb([], {}),
											e,
											r,
											s
										);
									const o = (function (t, e, n) {
											if (t.isAbsolute)
												return new lv(e.root, !0, 0);
											if (
												-1 === n.snapshot._lastPathIndex
											) {
												const t =
													n.snapshot._urlSegment;
												return new lv(
													t,
													t === e.root,
													0
												);
											}
											const r = iv(t.commands[0]) ? 0 : 1;
											return (function (t, e, n) {
												let r = t,
													s = e,
													i = n;
												for (; i > s; ) {
													if (
														((i -= s),
														(r = r.parent),
														!r)
													)
														throw new Error(
															"Invalid number of '../'"
														);
													s = r.segments.length;
												}
												return new lv(r, !1, s - i);
											})(
												n.snapshot._urlSegment,
												n.snapshot._lastPathIndex + r,
												t.numberOfDoubleDots
											);
										})(i, e, t),
										a = o.processChildren
											? hv(
													o.segmentGroup,
													o.index,
													i.commands
											  )
											: uv(
													o.segmentGroup,
													o.index,
													i.commands
											  );
									return ov(o.segmentGroup, a, e, r, s);
								})(l, this.currentUrlTree, t, u, c)
							);
						}
						navigateByUrl(t, e = { skipLocationChange: !1 }) {
							kr() &&
								this.isNgZoneEnabled &&
								!Rl.isInAngularZone() &&
								this.console.warn(
									"Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?"
								);
							const n = vv(t) ? t : this.parseUrl(t),
								r = this.urlHandlingStrategy.merge(
									n,
									this.rawUrlTree
								);
							return this.scheduleNavigation(
								r,
								'imperative',
								null,
								e
							);
						}
						navigate(t, e = { skipLocationChange: !1 }) {
							return (
								(function (t) {
									for (let e = 0; e < t.length; e++) {
										const n = t[e];
										if (null == n)
											throw new Error(
												`The requested path contains ${n} segment at index ${e}`
											);
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
							} catch ($w) {
								e = this.malformedUriErrorHandler(
									$w,
									this.urlSerializer,
									t
								);
							}
							return e;
						}
						isActive(t, e) {
							if (vv(t)) return Eb(this.currentUrlTree, t, e);
							const n = this.parseUrl(t);
							return Eb(this.currentUrlTree, n, e);
						}
						removeEmptyProps(t) {
							return Object.keys(t).reduce((e, n) => {
								const r = t[n];
								return null != r && (e[n] = r), e;
							}, {});
						}
						processNavigations() {
							this.navigations.subscribe(
								t => {
									(this.navigated = !0),
										(this.lastSuccessfulId = t.id),
										this.events.next(
											new Y_(
												t.id,
												this.serializeUrl(
													t.extractedUrl
												),
												this.serializeUrl(
													this.currentUrlTree
												)
											)
										),
										(this.lastSuccessfulNavigation = this.currentNavigation),
										(this.currentNavigation = null),
										t.resolve(!0);
								},
								t => {
									this.console.warn(
										'Unhandled Navigation Error: '
									);
								}
							);
						}
						scheduleNavigation(t, e, n, r, s) {
							const i = this.getTransition(),
								o =
									'imperative' !== e &&
									'imperative' ===
										(null == i ? void 0 : i.source),
								a =
									(this.lastSuccessfulId === i.id ||
									this.currentNavigation
										? i.rawUrl
										: i.urlAfterRedirects
									).toString() === t.toString();
							if (o && a) return Promise.resolve(!0);
							let l, c, u;
							s
								? ((l = s.resolve),
								  (c = s.reject),
								  (u = s.promise))
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
									extras: r,
									resolve: l,
									reject: c,
									promise: u,
									currentSnapshot: this.routerState.snapshot,
									currentRouterState: this.routerState,
								}),
								u.catch(t => Promise.reject(t))
							);
						}
						setBrowserUrl(t, e, n, r) {
							const s = this.urlSerializer.serialize(t);
							(r = r || {}),
								this.location.isCurrentPathEqualTo(s) || e
									? this.location.replaceState(
											s,
											'',
											Object.assign(
												Object.assign({}, r),
												{ navigationId: n }
											)
									  )
									: this.location.go(
											s,
											'',
											Object.assign(
												Object.assign({}, r),
												{ navigationId: n }
											)
									  );
						}
						resetStateAndUrl(t, e, n) {
							(this.routerState = t),
								(this.currentUrlTree = e),
								(this.rawUrlTree = this.urlHandlingStrategy.merge(
									this.currentUrlTree,
									n
								)),
								this.resetUrlToCurrentUrlTree();
						}
						resetUrlToCurrentUrlTree() {
							this.location.replaceState(
								this.urlSerializer.serialize(this.rawUrlTree),
								'',
								{ navigationId: this.lastSuccessfulId }
							);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(
								Gt(Fi),
								Gt(Ib),
								Gt(aw),
								Gt(Ec),
								Gt(Xi),
								Gt(Xl),
								Gt(Al),
								Gt(void 0)
							);
						}),
						(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				fw = (() => {
					class t {
						constructor(t, e, n, r, s) {
							(this.parentContexts = t),
								(this.location = e),
								(this.resolver = n),
								(this.changeDetector = s),
								(this.activated = null),
								(this._activatedRoute = null),
								(this.activateEvents = new Wa()),
								(this.deactivateEvents = new Wa()),
								(this.name = r || db),
								t.onChildOutletCreated(this.name, this);
						}
						ngOnDestroy() {
							this.parentContexts.onChildOutletDestroyed(
								this.name
							);
						}
						ngOnInit() {
							if (!this.activated) {
								const t = this.parentContexts.getContext(
									this.name
								);
								t &&
									t.route &&
									(t.attachRef
										? this.attach(t.attachRef, t.route)
										: this.activateWith(
												t.route,
												t.resolver || null
										  ));
							}
						}
						get isActivated() {
							return !!this.activated;
						}
						get component() {
							if (!this.activated)
								throw new Error('Outlet is not activated');
							return this.activated.instance;
						}
						get activatedRoute() {
							if (!this.activated)
								throw new Error('Outlet is not activated');
							return this._activatedRoute;
						}
						get activatedRouteData() {
							return this._activatedRoute
								? this._activatedRoute.snapshot.data
								: {};
						}
						detach() {
							if (!this.activated)
								throw new Error('Outlet is not activated');
							this.location.detach();
							const t = this.activated;
							return (
								(this.activated = null),
								(this._activatedRoute = null),
								t
							);
						}
						attach(t, e) {
							(this.activated = t),
								(this._activatedRoute = e),
								this.location.insert(t.hostView);
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
							if (this.isActivated)
								throw new Error(
									'Cannot activate an already activated outlet'
								);
							this._activatedRoute = t;
							const n = (e =
									e || this.resolver).resolveComponentFactory(
									t._futureSnapshot.routeConfig.component
								),
								r = this.parentContexts.getOrCreateContext(
									this.name
								).children,
								s = new pw(t, r, this.location.injector);
							(this.activated = this.location.createComponent(
								n,
								this.location.length,
								s
							)),
								this.changeDetector.markForCheck(),
								this.activateEvents.emit(
									this.activated.instance
								);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(
								mo(aw),
								mo(Da),
								mo(ua),
								go('name'),
								mo(Di)
							);
						}),
						(t.ɵdir = ve({
							type: t,
							selectors: [['router-outlet']],
							outputs: {
								activateEvents: 'activate',
								deactivateEvents: 'deactivate',
							},
							exportAs: ['outlet'],
						})),
						t
					);
				})();
			class pw {
				constructor(t, e, n) {
					(this.route = t),
						(this.childContexts = e),
						(this.parent = n);
				}
				get(t, e) {
					return t === Yb
						? this.route
						: t === aw
						? this.childContexts
						: this.parent.get(t, e);
				}
			}
			class mw {}
			class gw {
				preload(t, e) {
					return Eu(null);
				}
			}
			let yw = (() => {
					class t {
						constructor(t, e, n, r, s) {
							(this.router = t),
								(this.injector = r),
								(this.preloadingStrategy = s),
								(this.loader = new iw(
									e,
									n,
									e => t.triggerEvent(new ib(e)),
									e => t.triggerEvent(new ob(e))
								));
						}
						setUpPreloading() {
							this.subscription = this.router.events
								.pipe(
									Mu(t => t instanceof Y_),
									xp(() => this.preload())
								)
								.subscribe(() => {});
						}
						preload() {
							const t = this.injector.get(te);
							return this.processRoutes(t, this.router.config);
						}
						ngOnDestroy() {
							this.subscription &&
								this.subscription.unsubscribe();
						}
						processRoutes(t, e) {
							const n = [];
							for (const r of e)
								if (
									r.loadChildren &&
									!r.canLoad &&
									r._loadedConfig
								) {
									const t = r._loadedConfig;
									n.push(
										this.processRoutes(t.module, t.routes)
									);
								} else
									r.loadChildren && !r.canLoad
										? n.push(this.preloadConfig(t, r))
										: r.children &&
										  n.push(
												this.processRoutes(
													t,
													r.children
												)
										  );
							return M(n).pipe(
								H(),
								k(t => {})
							);
						}
						preloadConfig(t, e) {
							return this.preloadingStrategy.preload(e, () =>
								this.loader
									.load(t.injector, e)
									.pipe(
										B(
											t => (
												(e._loadedConfig = t),
												this.processRoutes(
													t.module,
													t.routes
												)
											)
										)
									)
							);
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(
								Gt(dw),
								Gt(Xl),
								Gt(Al),
								Gt(Xi),
								Gt(mw)
							);
						}),
						(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
						t
					);
				})(),
				_w = (() => {
					class t {
						constructor(t, e, n = {}) {
							(this.router = t),
								(this.viewportScroller = e),
								(this.options = n),
								(this.lastId = 0),
								(this.lastSource = 'imperative'),
								(this.restoredId = 0),
								(this.store = {}),
								(n.scrollPositionRestoration =
									n.scrollPositionRestoration || 'disabled'),
								(n.anchorScrolling =
									n.anchorScrolling || 'disabled');
						}
						init() {
							'disabled' !==
								this.options.scrollPositionRestoration &&
								this.viewportScroller.setHistoryScrollRestoration(
									'manual'
								),
								(this.routerEventsSubscription = this.createScrollEvents()),
								(this.scrollEventsSubscription = this.consumeScrollEvents());
						}
						createScrollEvents() {
							return this.router.events.subscribe(t => {
								t instanceof Z_
									? ((this.store[
											this.lastId
									  ] = this.viewportScroller.getScrollPosition()),
									  (this.lastSource = t.navigationTrigger),
									  (this.restoredId = t.restoredState
											? t.restoredState.navigationId
											: 0))
									: t instanceof Y_ &&
									  ((this.lastId = t.id),
									  this.scheduleScrollEvent(
											t,
											this.router.parseUrl(
												t.urlAfterRedirects
											).fragment
									  ));
							});
						}
						consumeScrollEvents() {
							return this.router.events.subscribe(t => {
								t instanceof hb &&
									(t.position
										? 'top' ===
										  this.options.scrollPositionRestoration
											? this.viewportScroller.scrollToPosition(
													[0, 0]
											  )
											: 'enabled' ===
													this.options
														.scrollPositionRestoration &&
											  this.viewportScroller.scrollToPosition(
													t.position
											  )
										: t.anchor &&
										  'enabled' ===
												this.options.anchorScrolling
										? this.viewportScroller.scrollToAnchor(
												t.anchor
										  )
										: 'disabled' !==
												this.options
													.scrollPositionRestoration &&
										  this.viewportScroller.scrollToPosition(
												[0, 0]
										  ));
							});
						}
						scheduleScrollEvent(t, e) {
							this.router.triggerEvent(
								new hb(
									t,
									'popstate' === this.lastSource
										? this.store[this.restoredId]
										: null,
									e
								)
							);
						}
						ngOnDestroy() {
							this.routerEventsSubscription &&
								this.routerEventsSubscription.unsubscribe(),
								this.scrollEventsSubscription &&
									this.scrollEventsSubscription.unsubscribe();
						}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)(Gt(dw), Gt(Dc), Gt(void 0));
						}),
						(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
						t
					);
				})();
			const bw = new jt('ROUTER_CONFIGURATION'),
				vw = new jt('ROUTER_FORROOT_GUARD'),
				ww = [
					Ec,
					{ provide: Ib, useClass: Ob },
					{
						provide: dw,
						useFactory: function (
							t,
							e,
							n,
							r,
							s,
							i,
							o,
							a = {},
							l,
							c
						) {
							const u = new dw(null, t, e, n, r, s, i, bb(o));
							if (
								(l && (u.urlHandlingStrategy = l),
								c && (u.routeReuseStrategy = c),
								a.errorHandler &&
									(u.errorHandler = a.errorHandler),
								a.malformedUriErrorHandler &&
									(u.malformedUriErrorHandler =
										a.malformedUriErrorHandler),
								a.enableTracing)
							) {
								const t = ac();
								u.events.subscribe(e => {
									t.logGroup(
										'Router Event: ' + e.constructor.name
									),
										t.log(e.toString()),
										t.log(e),
										t.logGroupEnd();
								});
							}
							return (
								a.onSameUrlNavigation &&
									(u.onSameUrlNavigation =
										a.onSameUrlNavigation),
								a.paramsInheritanceStrategy &&
									(u.paramsInheritanceStrategy =
										a.paramsInheritanceStrategy),
								a.urlUpdateStrategy &&
									(u.urlUpdateStrategy = a.urlUpdateStrategy),
								a.relativeLinkResolution &&
									(u.relativeLinkResolution =
										a.relativeLinkResolution),
								u
							);
						},
						deps: [
							Ib,
							aw,
							Ec,
							Xi,
							Xl,
							Al,
							sw,
							bw,
							[class {}, new st()],
							[class {}, new st()],
						],
					},
					aw,
					{
						provide: Yb,
						useFactory: function (t) {
							return t.routerState.root;
						},
						deps: [dw],
					},
					{ provide: Xl, useClass: ec },
					yw,
					gw,
					class {
						preload(t, e) {
							return e().pipe(_p(() => Eu(null)));
						}
					},
					{ provide: bw, useValue: { enableTracing: !1 } },
				];
			function Sw() {
				return new ql('Router', dw);
			}
			let Ew = (() => {
				class t {
					constructor(t, e) {}
					static forRoot(e, n) {
						return {
							ngModule: t,
							providers: [
								ww,
								Tw(e),
								{
									provide: vw,
									useFactory: kw,
									deps: [[dw, new st(), new ot()]],
								},
								{ provide: bw, useValue: n || {} },
								{
									provide: _c,
									useFactory: Cw,
									deps: [cc, [new rt(vc), new st()], bw],
								},
								{
									provide: _w,
									useFactory: xw,
									deps: [dw, Dc, bw],
								},
								{
									provide: mw,
									useExisting:
										n && n.preloadingStrategy
											? n.preloadingStrategy
											: gw,
								},
								{ provide: ql, multi: !0, useFactory: Sw },
								[
									Aw,
									{
										provide: ul,
										multi: !0,
										useFactory: Iw,
										deps: [Aw],
									},
									{ provide: Rw, useFactory: Ow, deps: [Aw] },
									{ provide: yl, multi: !0, useExisting: Rw },
								],
							],
						};
					}
					static forChild(e) {
						return { ngModule: t, providers: [Tw(e)] };
					}
				}
				return (
					(t.ɵmod = _e({ type: t })),
					(t.ɵinj = ht({
						factory: function (e) {
							return new (e || t)(Gt(vw, 8), Gt(dw, 8));
						},
					})),
					t
				);
			})();
			function xw(t, e, n) {
				return (
					n.scrollOffset && e.setOffset(n.scrollOffset),
					new _w(t, e, n)
				);
			}
			function Cw(t, e, n = {}) {
				return n.useHash ? new Sc(t, e) : new wc(t, e);
			}
			function kw(t) {
				if (t)
					throw new Error(
						'RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.'
					);
				return 'guarded';
			}
			function Tw(t) {
				return [
					{ provide: Ji, multi: !0, useValue: t },
					{ provide: sw, multi: !0, useValue: t },
				];
			}
			let Aw = (() => {
				class t {
					constructor(t) {
						(this.injector = t),
							(this.initNavigation = !1),
							(this.resultOfPreactivationDone = new E());
					}
					appInitializer() {
						return this.injector
							.get(hc, Promise.resolve(null))
							.then(() => {
								let t = null;
								const e = new Promise(e => (t = e)),
									n = this.injector.get(dw),
									r = this.injector.get(bw);
								if (
									this.isLegacyDisabled(r) ||
									this.isLegacyEnabled(r)
								)
									t(!0);
								else if ('disabled' === r.initialNavigation)
									n.setUpLocationChangeListener(), t(!0);
								else {
									if ('enabled' !== r.initialNavigation)
										throw new Error(
											`Invalid initialNavigation options: '${r.initialNavigation}'`
										);
									(n.hooks.afterPreactivation = () =>
										this.initNavigation
											? Eu(null)
											: ((this.initNavigation = !0),
											  t(!0),
											  this.resultOfPreactivationDone)),
										n.initialNavigation();
								}
								return e;
							});
					}
					bootstrapListener(t) {
						const e = this.injector.get(bw),
							n = this.injector.get(yw),
							r = this.injector.get(_w),
							s = this.injector.get(dw),
							i = this.injector.get(Zl);
						t === i.components[0] &&
							(this.isLegacyEnabled(e)
								? s.initialNavigation()
								: this.isLegacyDisabled(e) &&
								  s.setUpLocationChangeListener(),
							n.setUpPreloading(),
							r.init(),
							s.resetRootComponentType(i.componentTypes[0]),
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
						return (
							'legacy_disabled' === t.initialNavigation ||
							!1 === t.initialNavigation
						);
					}
				}
				return (
					(t.ɵfac = function (e) {
						return new (e || t)(Gt(Xi));
					}),
					(t.ɵprov = ut({ token: t, factory: t.ɵfac })),
					t
				);
			})();
			function Iw(t) {
				return t.appInitializer.bind(t);
			}
			function Ow(t) {
				return t.bootstrapListener.bind(t);
			}
			const Rw = new jt('Router Initializer'),
				Pw = ['sidenav'];
			let Nw = (() => {
					class t {
						constructor() {
							(this.faGithub = sy), (this.faLinkedinIn = iy);
						}
						changeTheme() {
							const t = document.getElementById('body');
							t.classList.contains('dark-theme')
								? (t.classList.remove('dark-theme'),
								  t.classList.add('light-theme'),
								  localStorage.setItem('theme', 'light-theme'))
								: (t.classList.remove('light-theme'),
								  t.classList.add('dark-theme'),
								  localStorage.setItem('theme', 'dark-theme'));
						}
						setTheme() {
							const t = localStorage.getItem('theme');
							t && 'dark-theme' === t && this.changeTheme();
						}
						showSidenav() {}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵcmp = pe({
							type: t,
							selectors: [['app-root']],
							viewQuery: function (t, e) {
								var n;
								1 & t && sl(Pw, !0),
									2 & t &&
										rl((n = ol())) &&
										(e.sidenav = n.first);
							},
							decls: 52,
							vars: 2,
							consts: [
								['autosize', '', 'fxFlexFill', ''],
								['fxLayout', 'column', 1, 'sidenav'],
								['sidenav', ''],
								['fxLayout', 'column'],
								['mat-button', '', 1, 'nav-item'],
								[1, 'mr-3', 'mb-1'],
								[1, 'stati18n', 's18n-about'],
								[1, 'stati18n', 's18n-experiences'],
								[1, 'stati18n', 's18n-formations'],
								[1, 'stati18n', 's18n-skills'],
								[1, 'stati18n', 's18n-portfolio'],
								[1, 'stati18n', 's18n-interets'],
								[1, 'stati18n', 's18n-contact'],
								[
									'href',
									'https://github.com/kilian-paquier',
									'target',
									'_blank',
								],
								[2, 'font-size', '1.5em', 3, 'icon'],
								[
									'href',
									'https://www.linkedin.com/in/kilian-paquier/',
									'target',
									'_blank',
								],
								[
									'value',
									'en',
									1,
									'stati18n-language-selector',
								],
								[1, 'pointer', 2, 'font-size', '1.5em'],
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
									1,
									'pointer',
									'button',
									3,
									'click',
								],
							],
							template: function (t, e) {
								if (1 & t) {
									const t = So();
									bo(0, 'mat-sidenav-container', 0),
										bo(1, 'mat-sidenav', 1, 2),
										bo(3, 'div', 3),
										bo(4, 'button', 4),
										bo(5, 'mat-icon', 5),
										Ho(6, 'search'),
										vo(),
										wo(7, 'span', 6),
										vo(),
										bo(8, 'button', 4),
										bo(9, 'mat-icon', 5),
										Ho(10, 'search'),
										vo(),
										wo(11, 'span', 7),
										vo(),
										bo(12, 'button', 4),
										bo(13, 'mat-icon', 5),
										Ho(14, 'search'),
										vo(),
										wo(15, 'span', 8),
										vo(),
										bo(16, 'button', 4),
										bo(17, 'mat-icon', 5),
										Ho(18, 'search'),
										vo(),
										wo(19, 'span', 9),
										vo(),
										bo(20, 'button', 4),
										bo(21, 'mat-icon', 5),
										Ho(22, 'search'),
										vo(),
										wo(23, 'span', 10),
										vo(),
										bo(24, 'button', 4),
										bo(25, 'mat-icon', 5),
										Ho(26, 'search'),
										vo(),
										wo(27, 'span', 11),
										vo(),
										bo(28, 'button', 4),
										bo(29, 'mat-icon', 5),
										Ho(30, 'search'),
										vo(),
										wo(31, 'span', 12),
										vo(),
										vo(),
										bo(32, 'div'),
										bo(33, 'a', 13),
										wo(34, 'fa-icon', 14),
										vo(),
										bo(35, 'a', 15),
										wo(36, 'fa-icon', 14),
										vo(),
										bo(37, 'a', 16),
										wo(38, 'i', 17),
										vo(),
										vo(),
										vo(),
										bo(39, 'mat-sidenav-content', 18),
										wo(40, 'router-outlet', 19),
										wo(41, 'router-outlet', 20),
										wo(42, 'router-outlet', 21),
										wo(43, 'router-outlet', 22),
										wo(44, 'router-outlet', 23),
										wo(45, 'router-outlet', 24),
										wo(46, 'router-outlet', 25),
										wo(47, 'router-outlet', 26),
										bo(48, 'div', 27),
										bo(49, 'button', 28),
										xo('click', function () {
											return (
												rn(t),
												((e = 2),
												(function (t, e) {
													return t[e + xe];
												})(
													Je.lFrame.contextLView,
													e
												)).toggle()
											);
											var e;
										}),
										bo(50, 'mat-icon'),
										Ho(51, 'menu'),
										vo(),
										vo(),
										vo(),
										vo(),
										vo();
								}
								2 & t &&
									(gs(34),
									yo('icon', e.faGithub),
									gs(2),
									yo('icon', e.faLinkedinIn));
							},
							directives: [ey, yg, Jg, fg, am, Xp, k_, Xg, fw],
							styles: [''],
						})),
						t
					);
				})(),
				Lw = (() => {
					class t {
						constructor() {}
						ngOnInit() {}
						openCurriculumVitae() {}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵcmp = pe({
							type: t,
							selectors: [['app-about']],
							decls: 6,
							vars: 0,
							consts: [
								[1, 'masthead', 'animated', 'fadeIn'],
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
								[
									1,
									'intro-heading',
									'text-uppercase',
									'stati18n',
									's18n-intro-lead-in',
								],
								[
									'mat-raised-button',
									'',
									'color',
									'primary',
									1,
									'mt-2',
									'about-button',
									'text-uppercase',
									'stati18n',
									's18n-see-more',
								],
							],
							template: function (t, e) {
								1 & t &&
									(bo(0, 'header', 0),
									bo(1, 'div', 1),
									bo(2, 'div', 2),
									wo(3, 'img', 3),
									wo(4, 'div', 4),
									wo(5, 'a', 5),
									vo(),
									vo(),
									vo());
							},
							directives: [lm],
							styles: [
								'.about-button[_ngcontent-%COMP%]{font-size:17px;padding:15px 30px}header.masthead[_ngcontent-%COMP%]{text-align:center;color:#fff;background-image:url(background.f92f9ed47ed146e4dc37.jpg);background-repeat:no-repeat;background-attachment:scroll;background-position:50%;background-size:cover}header.masthead[_ngcontent-%COMP%]   .intro-text[_ngcontent-%COMP%]{padding-top:150px;padding-bottom:150px}header.masthead[_ngcontent-%COMP%]   .intro-text[_ngcontent-%COMP%]   .intro-lead-in[_ngcontent-%COMP%]{font-size:22px;font-style:italic;line-height:22px;margin-bottom:25px;font-family:"Droid Serif",-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}header.masthead[_ngcontent-%COMP%]   .intro-text[_ngcontent-%COMP%]   .intro-heading[_ngcontent-%COMP%]{font-size:50px;font-weight:700;line-height:50px;margin-bottom:25px;font-family:Montserrat,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}header.masthead[_ngcontent-%COMP%]   .img-profil[_ngcontent-%COMP%]{width:50%}@media (min-width:768px){header.masthead[_ngcontent-%COMP%]   .intro-text[_ngcontent-%COMP%]{padding-top:150px;padding-bottom:150px}header.masthead[_ngcontent-%COMP%]   .intro-text[_ngcontent-%COMP%]   .intro-lead-in[_ngcontent-%COMP%]{font-size:40px;font-style:italic;line-height:40px;margin-bottom:25px;font-family:"Droid Serif",-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}header.masthead[_ngcontent-%COMP%]   .intro-text[_ngcontent-%COMP%]   .intro-heading[_ngcontent-%COMP%]{font-size:75px;font-weight:700;line-height:75px;margin-bottom:50px;font-family:Montserrat,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}header.masthead[_ngcontent-%COMP%]   .img-profil[_ngcontent-%COMP%]{width:25%}}',
							],
						})),
						t
					);
				})(),
				Dw = (() => {
					class t {
						constructor() {}
						ngOnInit() {}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵcmp = pe({
							type: t,
							selectors: [['app-contact']],
							decls: 2,
							vars: 0,
							template: function (t, e) {
								1 & t &&
									(bo(0, 'p'), Ho(1, 'contact works!'), vo());
							},
							styles: [''],
						})),
						t
					);
				})(),
				Mw = (() => {
					class t {
						constructor() {}
						ngOnInit() {}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵcmp = pe({
							type: t,
							selectors: [['app-education']],
							decls: 2,
							vars: 0,
							template: function (t, e) {
								1 & t &&
									(bo(0, 'p'),
									Ho(1, 'education works!'),
									vo());
							},
							styles: [''],
						})),
						t
					);
				})(),
				Fw = (() => {
					class t {
						constructor() {}
						ngOnInit() {}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵcmp = pe({
							type: t,
							selectors: [['app-experiences']],
							decls: 2,
							vars: 0,
							template: function (t, e) {
								1 & t &&
									(bo(0, 'p'),
									Ho(1, 'experiences works!'),
									vo());
							},
							styles: [''],
						})),
						t
					);
				})(),
				jw = (() => {
					class t {
						constructor() {}
						ngOnInit() {}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵcmp = pe({
							type: t,
							selectors: [['app-footer']],
							decls: 2,
							vars: 0,
							template: function (t, e) {
								1 & t &&
									(bo(0, 'p'), Ho(1, 'footer works!'), vo());
							},
							styles: [''],
						})),
						t
					);
				})(),
				zw = (() => {
					class t {
						constructor() {}
						ngOnInit() {}
					}
					return (
						(t.ɵfac = function (e) {
							return new (e || t)();
						}),
						(t.ɵcmp = pe({
							type: t,
							selectors: [['app-interests']],
							decls: 2,
							vars: 0,
							template: function (t, e) {
								1 & t &&
									(bo(0, 'p'),
									Ho(1, 'interests works!'),
									vo());
							},
							styles: [''],
						})),
						t
					);
				})();
			const Bw = [
				{ path: '', outlet: 'footer', component: jw },
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
							(t.ɵcmp = pe({
								type: t,
								selectors: [['app-projects']],
								decls: 2,
								vars: 0,
								template: function (t, e) {
									1 & t &&
										(bo(0, 'p'),
										Ho(1, 'projects works!'),
										vo());
								},
								styles: [''],
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
							ngOnInit() {}
						}
						return (
							(t.ɵfac = function (e) {
								return new (e || t)();
							}),
							(t.ɵcmp = pe({
								type: t,
								selectors: [['app-skills']],
								decls: 2,
								vars: 0,
								template: function (t, e) {
									1 & t &&
										(bo(0, 'p'),
										Ho(1, 'skills works!'),
										vo());
								},
								styles: [''],
							})),
							t
						);
					})(),
				},
				{ path: '', outlet: 'about', component: Lw },
				{ path: '', outlet: 'education', component: Mw },
				{ path: '', outlet: 'interests', component: zw },
				{ path: '', outlet: 'contact', component: Dw },
				{ path: '', outlet: 'experiences', component: Fw },
				{ path: '**', redirectTo: '' },
			];
			let Uw = (() => {
					class t {}
					return (
						(t.ɵmod = _e({ type: t })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)();
							},
							imports: [[Ew.forRoot(Bw)], Ew],
						})),
						t
					);
				})(),
				Vw = (() => {
					class t {}
					return (
						(t.ɵmod = _e({ type: t, bootstrap: [Nw] })),
						(t.ɵinj = ht({
							factory: function (e) {
								return new (e || t)();
							},
							providers: [],
							imports: [
								[pu, Xf, Uw, Jp, tm, cm, mp, pm, wg, ry, T_],
							],
						})),
						t
					);
				})();
			(function () {
				if (Cr)
					throw new Error(
						'Cannot enable prod mode after platform setup.'
					);
				xr = !1;
			})(),
				hu()
					.bootstrapModule(Vw)
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
