export const SUB_CATEGORY_MATERIALS = {
    // Construction Sector
    'Cement': ['Clinker', 'Gypsum', 'Fly Ash', 'Limestone', 'Silica', 'Calcined Clay', 'Polymer additives (for quick-set)'],
    'Tiles': ['Clay', 'Feldspar', 'Silica Sand', 'Quartz', 'Kaolin', 'Ceramic glaze', 'Digital ink pigments', 'Porcelain body compound'],
    'Construction Chemicals': ['Acrylic polymers', 'SBR Latex', 'Epoxy resin & hardener', 'Polyurethane', 'Cementitious powder', 'Silica fillers', 'Plasticizers', 'Waterproofing bitumen', 'Polymer modifiers'],
    'Paint': ['Acrylic binders', 'Pigments (Titanium dioxide, iron oxide)', 'Solvents', 'Resins', 'Additives', 'Emulsifiers', 'Fillers (calcium carbonate)', 'Acrylic emulsions', 'Metallic pigments', 'Texture compounds', 'Putty powder', 'Polymer binders'],
    'Plumbing': ['PVC resin', 'CPVC compound', 'UPVC compound', 'Galvanized iron', 'Brass', 'Stainless steel', 'Rubber gaskets', 'ABS plastic'],
    'Electrical': ['Copper', 'Aluminum', 'PVC insulation', 'Polycarbonate', 'Steel', 'Brass terminals', 'LED chips', 'Silicon boards'],

    // Interior Sector
    'Furniture': ['Solid wood (Teak, Sheesham, Pine)', 'Engineered wood', 'MDF / Plywood', 'Steel frames', 'Foam', 'Fabric upholstery', 'Leather / Rexine', 'Glass', 'Mild steel', 'Aluminum', 'Plywood', 'MDF', 'Fabric', 'Leatherette'],
    'Furnishing': ['Cotton fabric', 'Polyester', 'Linen', 'Velvet', 'Jute', 'Wool', 'Synthetic fibers', 'PVC backing'],
    'Hardware': ['Stainless steel', 'Brass', 'Zinc alloy', 'Aluminum', 'Iron', 'Nylon', 'Chrome plating'],
    'Plywood': ['Hardwood veneer', 'Softwood veneer', 'Phenolic resin', 'Urea-formaldehyde resin', 'MDF fiber', 'Decorative laminate sheets'],
    'Adhesive': ['Polyvinyl acetate (PVA)', 'Epoxy resin', 'Silicone polymer', 'Neoprene rubber', 'Polyurethane adhesive'],
    'Modular Furniture': ['HDHMR boards', 'MDF boards', 'Laminates', 'PVC edge banding', 'Stainless steel hardware', 'Aluminum profiles', 'Quartz / Granite tops'],
    'PVC Panelling': ['PVC compound', 'WPC (Wood Plastic Composite)', 'Calcium carbonate', 'UV coating', 'Decorative laminate film'],

    // Event & Exhibition Sector
    'Props & Flowers': ['Thermocol', 'Fiber (FRP)', 'Artificial silk', 'Plastic', 'Fabric', 'Foam board', 'Wood'],
    'Decorative Lights': ['LED chips', 'Copper wiring', 'Plastic casing', 'Aluminum housing', 'Glass crystals', 'Control drivers'],
    'Flooring': ['Carpet fiber (nylon / polyester)', 'Artificial turf fiber', 'Vinyl sheets', 'Plywood base', 'Laminated boards'],
    'Modular Stall': ['Octanorm aluminum frame', 'MDF panels', 'PVC panels', 'Flex printing', 'Acrylic sheets', 'Glass', 'Steel connectors'],
    'Digital Screen': ['LED modules', 'LCD panels', 'Circuit boards', 'Aluminum frame', 'Tempered glass', 'Plastic casing'],
    'Photography': ['DSLR / Mirrorless camera', 'Lenses', 'Lighting equipment', 'Softboxes', 'Tripods', 'Reflectors', 'Backdrop fabric'],

    // Branding Sector
    'Flex Banner': ['PVC flex material', 'Eco-solvent ink', 'UV ink', 'Vinyl', 'Eyelets (metal rings)'],
    'Acrylic Signage': ['Acrylic sheet', 'LED modules', 'Vinyl stickers', 'Aluminum composite panel (ACP)', 'Stainless steel letters', 'Backlit diffuser sheets'],
    'Visiting Card': ['Art paper', 'Textured paper', 'PVC card sheet', 'NFC chip', 'Lamination film', 'Spot UV coating', 'Foil stamping sheet'],
};

export const getMaterialsForSubCategory = (subCategoryName) => {
    if (!subCategoryName) return [];

    // Find a match based on subCategoryName
    // We can do a loose match if needed, but for now exact or partial match.
    for (const [key, materials] of Object.entries(SUB_CATEGORY_MATERIALS)) {
        if (subCategoryName.toLowerCase().includes(key.toLowerCase())) {
            return materials;
        }
    }
    return [];
};
