<?xml version='1.0'?> <!-- As XML file -->

<!--********************************************************************
Copyright 2015 D. Brian Walton

This file a customization file to work with MathBook XML.
*********************************************************************-->

<!-- Identify as a stylesheet -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:xml="http://www.w3.org/XML/1998/namespace"
    xmlns:exsl="http://exslt.org/common"
    xmlns:date="http://exslt.org/dates-and-times"
    extension-element-prefixes="exsl date"
>

<xsl:import href="/Users/waltondb/mathbook/xsl/mathbook-html.xsl" />

<xsl:param name="html.knowl.example" select="'no'" />
<xsl:param name="html.knowl.exercise" select="'no'" />

<xsl:template match="section" mode="summary-nav">
    <xsl:apply-imports />
    <xsl:variable name="num"><xsl:apply-templates select="." mode="number" /></xsl:variable>
    <xsl:variable name="url"><xsl:text>section.</xsl:text><xsl:value-of select="$num" /><xsl:text>.pdf</xsl:text></xsl:variable>
    <a href="{$url}">
        <!-- important not include codenumber span -->
        <xsl:text>PDF version of Section </xsl:text>
        <xsl:value-of select="$num" />
    </a>
</xsl:template>

</xsl:stylesheet>
