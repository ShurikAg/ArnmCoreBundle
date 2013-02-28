<?php
namespace Arnm\CoreBundle\Bundle;
/**
 * This is a base abstract implementation of a bundle info interface
 *
 * @author Alex Agulyansky <alex@iibspro.com>
 */
abstract class BundleInfo implements BundleInfoInterface
{
    /**
     * Constructor
     *
     * @param BundleInfoCollectorInterface $collector Collector object
     */
    public function __construct(BundleInfoCollectorInterface $collector)
    {
        $collector->register($this);
    }
}
