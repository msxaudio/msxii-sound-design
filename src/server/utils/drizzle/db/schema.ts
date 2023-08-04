import { pgTable, pgEnum, uniqueIndex, foreignKey, text, timestamp, integer, jsonb, index, serial, boolean, primaryKey } from "drizzle-orm/pg-core"

export const headerBoxHtype = pgEnum("HeaderBoxHType", ['DYNAMIC', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'])
export const iframeBoxTypes = pgEnum("IframeBoxTypes", ['YOUTUBE', 'INSTAGRAM', 'SOUND_CLOUD'])
export const slidesPerViewType = pgEnum("SlidesPerViewType", ['DEFAULT', 'ONE_SLIDE', 'LARGE_SLIDES'])
export const boxTypes = pgEnum("BoxTypes", ['MD', 'IMAGE', 'IFRAME', 'QUOTE', 'HEADER', 'TABS_HOLDER', 'GRID', 'SLIDER'])

export const imageBox = pgTable("ImageBox", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	boxId: text("boxId").notNull(),
	boxType: boxTypes("boxType").default('IMAGE').notNull(),
	src: text("src").notNull(),
	altText: text("altText"),
	width: integer("width"),
	height: integer("height"),
},
(table) => {
	return {
		imgBxBxIdBxTK: uniqueIndex("ImgBx_BxId_BxT_K").on(table.boxId, table.boxType),
		imhBxBxIdBtFk: foreignKey({
			columns: [table.boxId, table.boxType],
			foreignColumns: [box.id, box.type]
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const iframeBox = pgTable("IframeBox", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	boxId: text("boxId").notNull(),
	boxType: boxTypes("boxType").default('IFRAME').notNull(),
	type: iframeBoxTypes("type").notNull(),
	src: text("src").notNull(),
	title: text("title"),
},
(table) => {
	return {
		iframeBxBxIdBxTK: uniqueIndex("IframeBx_BxId_BxT_K").on(table.boxId, table.boxType),
		iframeBxBxIdBtFk: foreignKey({
			columns: [table.boxId, table.boxType],
			foreignColumns: [box.id, box.type]
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const quoteBox = pgTable("QuoteBox", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	boxId: text("boxId").notNull(),
	boxType: boxTypes("boxType").default('QUOTE').notNull(),
	cite: text("cite").notNull(),
	content: text("content").notNull(),
},
(table) => {
	return {
		quoteBxBxIdBxTK: uniqueIndex("QuoteBx_BxId_BxT_K").on(table.boxId, table.boxType),
		quoteBxBxIdBtFk: foreignKey({
			columns: [table.boxId, table.boxType],
			foreignColumns: [box.id, box.type]
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const headerBox = pgTable("HeaderBox", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	title: text("title").notNull(),
	description: text("description"),
	hType: headerBoxHtype("hType").default('DYNAMIC').notNull(),
	boxId: text("boxId").notNull(),
	boxType: boxTypes("boxType").default('HEADER').notNull(),
},
(table) => {
	return {
		headerBxBxIdBxTK: uniqueIndex("HeaderBx_BxId_BxT_K").on(table.boxId, table.boxType),
		headerBxBxIdBtFk: foreignKey({
			columns: [table.boxId, table.boxType],
			foreignColumns: [box.id, box.type]
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const css = pgTable("css", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	twVariants: jsonb("twVariants").default({}).notNull(),
	inlineStyles: jsonb("inlineStyles").default({}).notNull(),
	customClasses: text("customClasses").default('RRAY[').array(),
});

export const mdBox = pgTable("MdBox", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	boxId: text("boxId").notNull(),
	boxType: boxTypes("boxType").default('MD').notNull(),
	content: text("content").notNull(),
},
(table) => {
	return {
		mdBxBxIdBxTK: uniqueIndex("MdBx_BxId_BxT_K").on(table.boxId, table.boxType),
		mdBxBxIdBtFk: foreignKey({
			columns: [table.boxId, table.boxType],
			foreignColumns: [box.id, box.type]
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const slider = pgTable("Slider", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	boxId: text("boxId").notNull(),
	boxType: boxTypes("boxType").default('SLIDER').notNull(),
	slidesPerViewType: slidesPerViewType("slidesPerViewType").default('DEFAULT').notNull(),
},
(table) => {
	return {
		xBxIdBxTK: uniqueIndex("SliderBx_BxId_BxT_K").on(table.boxId, table.boxType),
		sliderBxBxIdBtFk: foreignKey({
			columns: [table.boxId, table.boxType],
			foreignColumns: [box.id, box.type]
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const grid = pgTable("Grid", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	boxId: text("boxId").notNull(),
	boxType: boxTypes("boxType").default('GRID').notNull(),
},
(table) => {
	return {
		xBxIdBxTK: uniqueIndex("GridBx_BxId_BxT_K").on(table.boxId, table.boxType),
		gridBxBxIdBtFk: foreignKey({
			columns: [table.boxId, table.boxType],
			foreignColumns: [box.id, box.type]
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const section = pgTable("Section", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	order: serial("order").notNull(),
	pageId: text("pageId").notNull().references(() => page.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	cssId: text("cssId").notNull().references(() => css.id, { onDelete: "restrict", onUpdate: "cascade" } ),
},
(table) => {
	return {
		orderIdx: index("Section_order_idx").on(table.order),
		pageIdIdx: index("Section_pageId_idx").on(table.pageId),
		cssIdIdx: index("Section_cssId_idx").on(table.cssId),
	}
});

export const tabs = pgTable("Tabs", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	boxId: text("boxId").notNull(),
	boxType: boxTypes("boxType").default('TABS_HOLDER').notNull(),
},
(table) => {
	return {
		bxIdBxTK: uniqueIndex("Tabs_BxId_BxT_K").on(table.boxId, table.boxType),
		tabsBxBxIdBtFk: foreignKey({
			columns: [table.boxId, table.boxType],
			foreignColumns: [box.id, box.type]
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const pageCategory = pgTable("PageCategory", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	name: text("name").notNull(),
	counter: integer("counter").default(0).notNull(),
	hasSubPages: boolean("hasSubPages").default(false).notNull(),
	isAPage: boolean("isAPage").default(false).notNull(),
});

export const image = pgTable("Image", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	src: text("src").notNull(),
	altText: text("altText"),
	width: integer("width"),
	height: integer("height"),
},
(table) => {
	return {
		srcKey: uniqueIndex("Image_src_key").on(table.src),
	}
});

export const seo = pgTable("seo", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	title: text("title").notNull(),
	description: text("description"),
});

export const page = pgTable("Page", {
	id: text("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	cssId: text("cssId").notNull().references(() => css.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	slug: text("slug"),
	pageCategoryName: text("pageCategoryName").notNull().references(() => pageCategory.name, { onDelete: "restrict", onUpdate: "cascade" } ),
	imageId: text("imageId").references(() => image.id, { onDelete: "set null", onUpdate: "cascade" } ),
	isActive: boolean("isActive").default(false).notNull(),
	seoId: text("seoId").references(() => seo.id, { onDelete: "set null", onUpdate: "cascade" } ),
},
(table) => {
	return {
		seoIdKey: uniqueIndex("Page_seoId_key").on(table.seoId),
		cssIdIdx: index("Page_cssId_idx").on(table.cssId),
		pageCategoryNameSlugKey: uniqueIndex("Page_pageCategoryName_slug_key").on(table.slug, table.pageCategoryName),
	}
});

export const boxToGrid = pgTable("BoxToGrid", {
	id: text("id").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	order: serial("order").notNull(),
	boxId: text("boxId").notNull().references(() => box.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	gridId: text("gridId").notNull().references(() => grid.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		btgIdK: uniqueIndex("BTG_id_K").on(table.id),
		btgBxIdIdx: index("BTG_BxId_idx").on(table.boxId),
		btgGridBxIdIdx: index("BTG_gridBxId_idx").on(table.gridId),
		btgOrderIdx: index("BTG_order_idx").on(table.order),
		btgPk: primaryKey(table.boxId, table.gridId)
	}
});

export const box = pgTable("Box", {
	id: text("id").notNull(),
	type: boxTypes("type").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	order: serial("order").notNull(),
	cssId: text("cssId").notNull().references(() => css.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	sectionId: text("sectionId").references(() => section.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		orderIdx: index("Box_order_idx").on(table.order),
		cssIdIdx: index("Box_cssId_idx").on(table.cssId),
		sectionIdIdx: index("Box_sectionId_idx").on(table.sectionId),
		boxPkey: primaryKey(table.id, table.type)
	}
});

export const boxToTabs = pgTable("BoxToTabs", {
	id: text("id").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	title: text("title").notNull(),
	order: serial("order").notNull(),
	boxId: text("boxId").notNull().references(() => box.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	tabsId: text("tabsId").notNull().references(() => tabs.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		btTsIdK: uniqueIndex("BTTs_id_K").on(table.id),
		btTsBxIdIdx: index("BTTs_BxId_idx").on(table.boxId),
		btTsOrderIdx: index("BTTs_order_idx").on(table.order),
		btTsTabsBxIdIdx: index("BTTs_tabsBxId_idx").on(table.tabsId),
		btTsPk: primaryKey(table.boxId, table.tabsId)
	}
});

export const boxToSlider = pgTable("BoxToSlider", {
	id: text("id").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
	title: text("title"),
	order: serial("order").notNull(),
	boxId: text("boxId").notNull().references(() => box.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	sliderId: text("sliderId").notNull().references(() => slider.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		btsIdK: uniqueIndex("BTS_id_K").on(table.id),
		btsBxIdIdx: index("BTS_BxId_idx").on(table.boxId),
		btsOrderIdx: index("BTS_order_idx").on(table.order),
		btsSliderBxIdIdx: index("BTS_sliderBxId_idx").on(table.sliderId),
		btsPk: primaryKey(table.boxId, table.sliderId)
	}
});